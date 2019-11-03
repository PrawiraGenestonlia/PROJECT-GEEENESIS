<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD026 -->
<!-- markdownlint-disable MD033 -->
<h1 align="center"><a href="https://github.com/PrawiraGenestonlia/PROJECT-GEEENESIS">PROJECT GEEENESIS</a></h1>
<p align="center">
<a href="https://github.com/PrawiraGenestonlia/PROJECT-GEEENESIS"><img alt="Lisence" src="https://img.shields.io/badge/license-MIT-blue.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/node"><img alt="Node Version" src="https://img.shields.io/npm/v/node.svg" height="20"/></a>
<a href="https://github.com/PrawiraGenestonlia/PROJECT-GEEENESIS/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/PrawiraGenestonlia/PROJECT-GEEENESIS.svg" height="20"/></a>
<a href="https://github.com/PrawiraGenestonlia/graphs/commit-activity"><img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/></a>
</p>

PROJECT GEEENESIS is an one-stop solution to better integrate Nanyang Technological University - School of Electrical and Electronic Engineering Freshmen into university life. This repository consists of:

* **client-admins:** A desktop web-app, built using React, is used by admins to set authentication role, editting of information, and most importantly file management.
* **client-mentors:** A progressive web-app (also known as HTML5 app), built using React, is used by mentors to interact and see the profile of their mentees.
* **client-students:** A progressive web-app (also known as HTML5 app), built using React, is used by students as the main platform to better integrate them into university life.
* **server-api-endpoint:** A server that serves the three clients above, built using Express (Node.js) and MongoDB (NoSQL) and hosted on digitalocean (Ubuntu 18.04 LTS).

## Installation

### Prerequisite:

* git
  
```console
sudo apt install git-all
```

* node

```console
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs
```

* nodemon

```console
npm install -g nodemon
```

### Project Geeenesis:

(development)

```console
git clone https://github.com/PrawiraGenestonlia/PROJECT-GEEENESIS
cd PROJECT-GEEENESIS
npm run install
npm start
```

(production)

```console
(to be added)
```

## Project Timeline and Progress

[Click here to view project timeline and progess](timeline.md)  
[Click here to view total productive time spent](timespent.md)

## Functionality

### _Pre-univeristy (information)_

* Information on EEE (Academics)
* Information on Student Body

### _Student Bodies_

* Dynamic information (editable through web)
* Add events (and external registration link)
* Consolidated calendar of events

### _Mentoring System_

* Mentor information
* Mentee information (events participated)
* Chatting platform
* Create calendar item
* "Feedback" on their relationship

### _Buddy System (KIV)_

* Assignment of buddies (matching algorithm)

## References

[Click here to view references](references.md)
