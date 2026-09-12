{ lib
, fetchFromGitHub
, makeWrapper
, makeDesktopItem
, copyDesktopItems
, mkYarnPackage
, electron
, imagemagick
}:

mkYarnPackage rec {
  pname = "todo-desktop";
  version = "10.0.0";
  executableName = pname;

  src = fetchFromGitHub {
    owner = "fildunsky";
    repo = "opensource-todo";
    rev = "v${version}";
    # Update after each release: nix flake prefetch <tarball url>
    sha256 = lib.fakeSha256;
  };

  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
  yarnNix = ./yarn.nix;

  ELECTRON_SKIP_BINARY_DOWNLOAD = "1";

  nativeBuildInputs = [
    makeWrapper
    copyDesktopItems
    imagemagick
  ];

  postBuild = ''
    pushd deps/todo-desktop

    yarn --offline run electron-builder \
      --dir \
      -c.electronDist=${electron}/lib/electron \
      -c.electronVersion=${electron.version}

    popd
  '';

  installPhase = ''
    runHook preInstall

    # resources
    mkdir -p "$out/share/lib/todo-desktop"
    cp -r ./deps/todo-desktop/dist/*-unpacked/{locales,resources{,.pak}} "$out/share/lib/todo-desktop"

    # icons - the source icon is 1080x1080, which is not a hicolor size, so
    # render one correctly sized PNG per hicolor directory (referenced by the
    # desktop item's Icon=todo-desktop).
    for size in 16 24 32 48 64 72 96 128 192 256 512; do
      magick ./deps/todo-desktop/static/Icon.png -resize "''${size}x''${size}" todo-$size.png
      install -Dm644 todo-$size.png "$out/share/icons/hicolor/''${size}x''${size}/apps/todo-desktop.png"
    done

    # executable wrapper
    makeWrapper '${electron}/bin/electron' "$out/bin/${executableName}" \
      --add-flags "$out/share/lib/todo-desktop/resources/app.asar" \
      --add-flags "\''${NIXOS_OZONE_WL:+\''${WAYLAND_DISPLAY:+--ozone-platform-hint=auto --enable-features=WaylandWindowDecorations}}" \
      --inherit-argv0

    runHook postInstall
  '';
  # Do not attempt generating a tarball for contents again.
  # note: `doDist = false;` does not work.
  distPhase = "true";

  desktopItems = [
    (makeDesktopItem {
      name = pname;
      exec = pname;
      icon = pname;
      desktopName = "Opensource ToDo";
      genericName = "Microsoft To-Do Client";
      comment = meta.description;
      categories = [ "Office" ];
      startupWMClass = pname;
    })
  ];

  meta = with lib; {
    description = "Opensource ToDo - an unofficial, open source Microsoft To-Do desktop app (fork of Kuro / Ao)";
    homepage = "https://github.com/fildunsky/opensource-todo";
    license = licenses.mit;
    mainProgram = executableName;
    maintainers = with maintainers; [ ChaosAttractor ];
    inherit (electron.meta) platforms;
  };
}
