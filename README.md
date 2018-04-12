![devRantron Banner](https://i.imgur.com/dMWxH4x.png)
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)

[![appveyor-badge]][appveyor-url]
[![travis-badge]][travis-url]
[![code-climate-badge]][code-climate-url]
[![github-total-downloads-badge]][github-total-downloads-url]
[![github-contributors-badge]][github-contributors-url]
[![slack-badge]][slack-url]

> Unofficial devRant desktop client.

Works on Linux, MacOS and Windows.

## Features

### Login with devRant Account
![Imgur](https://i.imgur.com/Tf1T1BR.png)
### View Rants and Make Comments
![Imgur](https://i.imgur.com/zGVFdqV.png)
### Post Rants and Pick Emojis!
![Imgur](https://i.imgur.com/FxJJ3jn.png)
### Get Real Time notifications
![Imgur](https://i.imgur.com/1XO7f4b.png)
### Make Your Custom View!
![Imgur](https://i.imgur.com/XFQC2aO.png)
### View Profiles
![Imgur](https://i.imgur.com/oPTZQLs.png)

> This is our approach to create a cross platform desktop application for [devRant.com].

## Installation

Pre-compiled builds can be found on the latest [release](https://github.com/tahnik/devRantron/releases/latest) page.
Additionally on macOS, `brew` can be used to install devRantron:

```
$ brew cask install devrantron
```

## Contribute

### How to setup the project

```bash
$ git clone https://github.com/tahnik/devRantron.git
$ cd devRantron
$ npm install
$ npm run dev
```

The `dev` script entry will start two processes. One process will create a `webpack-dev-server` that will watch and reload the bundle as you edit and will make it available at `http://localhost:8080`.
The second process will run the electron app in development mode, meaning that it will open up devtools with React and Redux devtools initialized.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/5113257?v=4" width="100px;"/><br /><sub><b>SirWindfield</b></sub>](https://github.com/SirWindfield)<br />[💻](https://github.com/tahnik/devRantron/commits?author=SirWindfield "Code") [📖](https://github.com/tahnik/devRantron/commits?author=SirWindfield "Documentation") [🚇](#infra-SirWindfield "Infrastructure (Hosting, Build-Tools, etc)") [📦](#platform-SirWindfield "Packaging/porting to new platform") [🔧](#tool-SirWindfield "Tools") | [<img src="https://avatars0.githubusercontent.com/u/9964210?v=4" width="100px;"/><br /><sub><b>Tahnik Mustasin</b></sub>](http://www.tahnik.com)<br />[💻](https://github.com/tahnik/devRantron/commits?author=tahnik "Code") [📖](https://github.com/tahnik/devRantron/commits?author=tahnik "Documentation") [📦](#platform-tahnik "Packaging/porting to new platform") [🔧](#tool-tahnik "Tools") | [<img src="https://avatars1.githubusercontent.com/u/16632409?v=4" width="100px;"/><br /><sub><b>Hampus Lundqvist</b></sub>](https://mobooru.me)<br />[💻](https://github.com/tahnik/devRantron/commits?author=RekkyRek "Code") [🎨](#design-RekkyRek "Design") [📖](https://github.com/tahnik/devRantron/commits?author=RekkyRek "Documentation") [📦](#platform-RekkyRek "Packaging/porting to new platform") [🔧](#tool-RekkyRek "Tools") | [<img src="https://avatars2.githubusercontent.com/u/4673812?v=4" width="100px;"/><br /><sub><b>David Refoua</b></sub>](http://www.Refoua.me)<br />[💻](https://github.com/tahnik/devRantron/commits?author=DRSDavidSoft "Code") | [<img src="https://avatars0.githubusercontent.com/u/25971070?v=4" width="100px;"/><br /><sub><b>cozyplanes</b></sub>](http://cozyplanes.github.io)<br />[📖](https://github.com/tahnik/devRantron/commits?author=cozyplanes "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/7362366?v=4" width="100px;"/><br /><sub><b>Saurabh</b></sub>](http://blog.cryf.in)<br />[💻](https://github.com/tahnik/devRantron/commits?author=tkshnwesper "Code") | [<img src="https://avatars1.githubusercontent.com/u/6199593?v=4" width="100px;"/><br /><sub><b>Dacexi</b></sub>](https://github.com/Dacexi)<br />[💻](https://github.com/tahnik/devRantron/commits?author=Dacexi "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

[appveyor-badge]: https://img.shields.io/appveyor/ci/tahnik/devRantron/master.svg
[appveyor-url]: https://ci.appveyor.com/project/tahnik/devrantron

[code-climate-badge]: https://codeclimate.com/github/tahnik/devRantron/badges/gpa.svg
[code-climate-url]: https://codeclimate.com/github/tahnik/devRantron

[devRant.com]: <http://devrant.com>

[github-contributors-badge]: https://img.shields.io/github/contributors/tahnik/devRantron.svg
[github-contributors-url]: https://github.com/tahnik/devRantron/graphs/contributors

[github-total-downloads-badge]: https://img.shields.io/github/downloads/tahnik/devRantron/total.svg
[github-total-downloads-url]: https://github.com/tahnik/devRantron/releases

[slack-badge]: https://img.shields.io/badge/slack-devRantron-blue.svg
[slack-url]: https://devrantron.slack.com/

[travis-badge]: https://img.shields.io/travis/tahnik/devRantron/master.svg
[travis-url]: https://travis-ci.org/tahnik/devRantron
