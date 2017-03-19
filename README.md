## devRant Unofficial Cross Platform Desktop Application

Here is the initial sketch we made for our app:
### Home Screen
![devRantFX mockup 1](http://imgur.com/tWUzRO5)
### Collapsible sidebar
![devRantFX mockup 2](http://imgur.com/tlLhm0t)
### Single Rant
![devRantFX mockup 3](http://imgur.com/V2gpdae)
### Post rant
![devRantFX mockup 4](http://imgur.com/hF9STj7)

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
- To run in production mode:

    ```bash
    npm run prod
    ```

- To run in development with hot reloading, open two terminal.
In the first terminal run 

    ```bash
    npm run hot
    ```
    
    In the second terminal run 
    
    ```bash
    npm run dev
    ```
    
    The first commands creates a webpack dev server which will watch and reload the bundle as you edit and will it available at https://localhost:8080.
    The second command will run the electron app in development mode. So it will open up devtools with React and Redux devtools initialized.
- To run test:

    ```bash
    npm test
    ```

[devRant.io]: <http://devrant.io>