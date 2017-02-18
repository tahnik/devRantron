## devRant Unofficial Cross Platform Desktop Application

[![Build Status](https://travis-ci.org/tahnik/devRantFX.svg?branch=master)](https://travis-ci.org/tahnik/devRantFX)
[![codecov](https://codecov.io/gh/tahnik/devRantFX/branch/master/graph/badge.svg)](https://codecov.io/gh/tahnik/devRantFX)
[![codebeat badge](https://codebeat.co/badges/38088b9d-dd27-4a20-a386-0e13ac7e2ae4)](https://codebeat.co/projects/github-com-tahnik-devrantfx)


This is our approach to create a cross platform desktop application for [devRant.io].

#### Requirements to build this software:
    - Oracle JDK 8
#### Preferable way to work on the source code:
    - IntelliJ IDEA Java IDE
    
#### How to setup project using IntelliJ IDEA:
* Get the latest version of IntelliJ IDEA from: [IntelliJ]
* Get the latest Oracle JDK 8 from: [JDK]
* Clone this repository using:
    `git clone https://github.com/tahnik/devRantFX.git`
* Open IntelliJ IDEA
* Click on "Import Project"
* Navigate to the folder where you cloned the repository. Click Ok
* Select "Import project from external model" and select Gradle. Press next and finish.
* Once the project has been opened, from the top menu bar, click on View > Tool Windows > Gradle
* From the Gradle Projects sidebar on the right, go to devRantFX > Tasks > application
* Double click on run. It should now build the project and run the application.





[devRant.io]: <http://devrant.io>
[IntelliJ]: <https://www.jetbrains.com/idea/download/download-thanks.html>
[JDK]: <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html>
