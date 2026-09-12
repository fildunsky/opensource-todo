<p align="center">
<img src="https://raw.githubusercontent.com/fildunsky/opensource-todo/master/static/Icon.png" width="300" />
</p>

# Opensource ToDo

English | [Русский](readme.ru.md)

An unofficial, featureful, open source, community-driven, free Microsoft To-Do desktop app for Linux (with a Windows installer built by CI).

Opensource ToDo continues [Kuro](https://github.com/davidsmorais/kuro) by [David Morais](https://davidmorais.com), which itself continued [Ao](https://github.com/klaussinani/ao) by [Klaus Sinani](https://github.com/klaussinani). Both projects went quiet; this fork keeps the app working and adds what its users asked for. All credit for the original work, the logo and the icons goes to them - see [Credits](#credits).

## Features

- Wraps the Microsoft To-Do web app in a proper desktop window: tray icon, launch on start, launch minimized, global shortcuts (X11), always on top, single instance
- **Per-list themes** - seven colours (solid or light) or eight scenes, per list and for My Day, picked in a pane that slides in like To-Do's own settings pane
- **Follow List Colors** - the list view and its sidebar entry follow the colour palette To-Do assigns to the list
- **Follow System Theme** - light and dark follow the OS; **Custom theme** with editable colours
- **Settings window** with native controls (general, appearance, shortcuts) plus the editable `todo.json`
- **Localization** - English and Russian for menus, tray and dialogs; the chosen language is applied to the To-Do web app itself
- Reopen the last open list on launch, zoom 50-300%, keyboard shortcuts for everything (see `Help > Keyboard Shortcuts`)
- Update check against GitHub Releases
- Native Wayland (Electron 44): crisp HiDPI scaling, correct app icon and notification attribution

## Installation

Download your distribution's package from the [releases page](https://github.com/fildunsky/opensource-todo/releases/latest): `.deb`, `.rpm`, `.pacman`, `.AppImage`, `.snap`, `.flatpak`, or the Windows installer. Every push to `master` is also built by GitHub Actions; the packages are attached to the workflow run as artifacts.

```
sudo apt install ./todo-desktop_<version>_amd64.deb
```

The executable is `todo-desktop`.

### Coming from Kuro

Opensource ToDo keeps its profile in `~/.config/Opensource ToDo/` (XDG base directory). On the first start it copies the Kuro profile from `~/.config/Kuro/` if there is one - settings, list themes, window state and shortcuts come along. You will have to sign in to your Microsoft account once more: Chromium encrypts the web session with a key tied to the application's name. A `~/.kuro.json` from very old versions is migrated as well.

### Wayland

Electron 44 picks native Wayland automatically on a Wayland session. To force a backend:

```
ELECTRON_OZONE_PLATFORM_HINT=x11 todo-desktop
```

Global shortcuts only work on X11.

## Settings

`File > Settings…` opens the settings window. Advanced values (custom theme colours, keyboard shortcuts) live in `~/.config/Opensource ToDo/todo.json`, which the window can open in your editor. See [contributing.md](contributing.md) for translations and [docs/build-instructions](docs/build-instructions/index.md) for building the packages yourself.

## Keyboard shortcuts

`Help > Keyboard Shortcuts` shows the current bindings; they are configurable in the settings window. Defaults on Linux/Windows use `Ctrl`, on macOS `Cmd`.

## Bugs, questions and feature requests

Open an [issue](https://github.com/fildunsky/opensource-todo/issues/new/choose) or a pull request.

## Credits

- [Ao](https://github.com/klaussinani/ao) - the original Electron wrapper for Microsoft To-Do, by Klaus Sinani (MIT)
- [Kuro](https://github.com/davidsmorais/kuro) - Ao's continuation, the logo, the icons, the themes and packaging, by David Morais and contributors (MIT); Kuro's [devlog](docs/devlog.md) is kept for history
- Nix packaging by [LostAttractor](https://github.com/LostAttractor), AUR package of Kuro by [Reverier-Xu](https://github.com/Reverier-Xu)

Microsoft To-Do is a trademark of Microsoft Corporation. This project is not affiliated with or endorsed by Microsoft.

## License

[MIT](license.md) - copyright Klaus Sinani (Ao), David Morais (Kuro) and the Opensource ToDo contributors.
