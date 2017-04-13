[![appveyor-badge]][appveyor-url]
[![travis-badge]][travis-url]
[![GitHub issues](https://img.shields.io/github/issues/tahnik/devRantron.svg)](https://github.com/tahnik/devRantron/issues)
[![GitHub stars](https://img.shields.io/github/stars/tahnik/devRantron.svg)](https://github.com/tahnik/devRantron/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/tahnik/devRantron/master/LICENSE)
[![Github All Releases](https://img.shields.io/github/downloads/tahnik/devRantron/total.svg)](https://github.com/tahnik/devRantron/releases)
[![David](https://img.shields.io/david/tahnik/devRantron.svg)](https://github.com/tahnik/devRantron)
[![node](http://img.shields.io/badge/node-7.x-brightgreen.svg)](https://nodejs.org/en/)
[![Code Climate](https://codeclimate.com/github/tahnik/devRantron/badges/gpa.svg)](https://codeclimate.com/github/tahnik/devRantron)
[![GitHub contributors](https://img.shields.io/github/contributors/tahnik/devRantron.svg)](https://github.com/tahnik/devRantron/graphs/contributors)
[![slack](https://img.shields.io/badge/slack-devRantron-blue.svg)](https://devrantron.slack.com/)
## devRant Unofficial Cross Platform Desktop Application

Here is the initial sketch we made for our app:
### Home Screen
![devRantFX mockup 1](http://imgur.com/tWUzRO5.png)
### Collapsible sidebar
![devRantFX mockup 2](http://imgur.com/tlLhm0t.png)
### Single Rant
![devRantFX mockup 3](http://imgur.com/V2gpdae.png)
### Post rant
![devRantFX mockup 4](http://imgur.com/hF9STj7.png)

This is our approach to create a cross platform desktop application for [devRant.io].

#### Requirements to build this software:
    - NodeJS v7.7.3
#### Preferable editor to work on the source code:
    - Visual Studio Code

#### How to setup project using IntelliJ IDEA:
- Install NodeJS from here: https://nodejs.org/en/
- Clone this repository using:
    `git clone https://github.com/tahnik/devRantron.git`
- cd into downloaded directory
- Install dependencies
    ```bash
    npm install
    ```
- To run in production mode:

    ```bash
    npm run prod
    ```

- To run in development with hot reloading, type the following into a terminal:

    ```bash
    npm run dev
    ```

    The command will start two processes. One process will create a `webpack-dev-server` that will watch and reload the bundle as you edit and will make it available at `http://localhost:8080`.
    The second process will run the electron app in development mode, meaning that it will open up devtools with React and Redux devtools initialized.
- To run test:

    ```bash
    npm run test
    ```

[devRant.io]: <http://devrant.io>
[appveyor-badge]: https://img.shields.io/appveyor/ci/tahnik/devRantron/master.svg
[appveyor-url]: https://ci.appveyor.com/project/tahnik/devrantron
[travis-badge]: https://img.shields.io/travis/tahnik/devRantron.svg
[travis-url]: https://travis-ci.org/tahnik/devRantron
