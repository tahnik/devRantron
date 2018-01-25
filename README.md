[![appveyor-badge]][appveyor-url]
[![travis-badge]][travis-url]
[![Code Climate](https://codeclimate.com/github/tahnik/devRantron/badges/gpa.svg)](https://codeclimate.com/github/tahnik/devRantron)
[![Github All Releases](https://img.shields.io/github/downloads/tahnik/devRantron/total.svg)](https://github.com/tahnik/devRantron/releases)
[![node](http://img.shields.io/badge/node-8.x-brightgreen.svg)](https://nodejs.org/en/)
[![GitHub contributors](https://img.shields.io/github/contributors/tahnik/devRantron.svg)](https://github.com/tahnik/devRantron/graphs/contributors)
[![slack](https://img.shields.io/badge/slack-devRantron-blue.svg)](https://devrantron.slack.com/)
## Unofficial devRant Cross Platform Desktop Application
![devRantron Banner](https://i.imgur.com/dMWxH4x.png)

devRantron is now in public version! Download the latest release by going to [devrantron.com](https://devrantron.com)!
Available for Windows, macOS, and Linux.

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

This is our approach to create a cross platform desktop application for [devRant.io].

#### Requirements to build this software:
    - NodeJS v^8.1.0
#### Preferable editor to work on the source code:
    - Visual Studio Code

#### How to setup the project:
- Install NodeJS from here: https://nodejs.org/en/
- Clone this repository using:
    `git clone https://github.com/tahnik/devRantron.git`
- cd into downloaded directory
- Install dependencies
    ```bash
    npm install
    ```

- To run in development with hot reloading, type the following into a terminal:

    ```bash
    npm run dev
    ```

    The command will start two processes. One process will create a `webpack-dev-server` that will watch and reload the bundle as you edit and will make it available at `http://localhost:8080`.
    The second process will run the electron app in development mode, meaning that it will open up devtools with React and Redux devtools initialized.

[devRant.io]: <http://devrant.io>
[appveyor-badge]: https://img.shields.io/appveyor/ci/tahnik/devRantron/master.svg
[appveyor-url]: https://ci.appveyor.com/project/tahnik/devrantron
[travis-badge]: https://img.shields.io/travis/tahnik/devRantron/master.svg
[travis-url]: https://travis-ci.org/tahnik/devRantron
