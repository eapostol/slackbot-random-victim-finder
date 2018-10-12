# README &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](#license)  

This application was created to randomly select a student in class using a custom Slack slash command followed up with the class type. Chosen names will be removed from the database eliminating the possibilty of reselecting the same person. 

To initialize enter, `/victim reset`. This action will repopulate the database with _all_ names for _all_ cohorts. This should be done when the names have been exhausted or when the list needs to be rebuilt.

To randomly select a name enter, `/victim mw`, `/victim tth` or `/victim sat` and voilà!

<img src="https://media.giphy.com/media/5vUN4Nlv5pEp0mrDU7/giphy.gif" alt="screenshot of chosen student" width="60%"/>

## Table of Contents

- [Installation](#installation)
- [Implementation](#implementation)
- [Technology](#technology)
- [License](#license)

## Installation

To run locally download to your local machine and run the following commands:

```sh
$ npm install
$ nodemon index.js
```
Set up within Slack is still required (i.e. slash command, interactive message, db).

Hosting on Heroku using the free tier may result in a slight response delay while the server spins up.

<sub>Note to self: command to view the log within Heroku is `heroku logs --source app` or `heroku logs --tail` (realtime).</sub>


## Implementation

To use this within your own Slack workspace the following elements will require attention:

* Hosting. This application is hosted on Heroku using their [free tier](https://www.heroku.com/pricing). Continue using Heroku or any hosting service of your liking.
* mLab. Create a new deployement and Users then update the URI. 
* Cohort session. This app was built for two different cohorts (Monday/Wednesday & Tuesday/Thursday) that meet on Saturday in a combined session. If your schedule differs the following files will require session names (i.e. mw, tth, sat) to be updated, removed and/or added:
	* [Victim.js](./models/Victim.js). Update model names as needed. 
	* [anotherVictim.js](./options/anotherVictim.js). Update `callback_id` and exports names as needed. 
	* [mwClass.js](./options/mwClass.js). Update with the names of your students.
	* [tthClass.js](./options/tthClass.js). Update with the names of your students. If the file is to be removed or more is to be added, update the `victims.js` require statement as well. 

	<img src="./assets/screenshots/require.png" alt="victims.js require statement" width="60%"/> 

	* [victims.js](./routes/api/victims.js). Be aware the use of 'mw', 'tth', and 'sat' and where those values should be updated. Making changes to any of the earlier mentioned files will directly affect this file.
* Slack Integration. Create a [new app](https://api.slack.com/apps) and develop it in your Slack workspace.
	* Basic Information. Fill in the App Name, Short Description and Background Color. Included in the assets folder is an [image file](./assets/crosshairs.jpeg) that can be used for the app icon. 
	* Interactive Components. Turn this on. The Request URL should point back to your server with `/api/victims/` appended to the end. 
	* Slash Commands. Create a new command using `/victim`. This can be updated to your liking. The Request URL should point back to your server but with `/api/victims/` appended to the end. Give your app a short description and any usage hint(s) (e.g. "Use `/victim mw`, `/victim tth`, `/victim sat` or `/victim reset`")
	* OAuth Tokens & Redirect URLs. Include the following Scopes: `commands`. Then click the Install App to Workspace button. No need to copy the access token.   
* Key. Be sure to update the [key](./config/keys_prod.js) accordingly with the mLab URI.
* [index.js](./index.js). Update the require path if changing the route structure. 

## Technology

Languages, libraries, applications and packages used:

- [JavaScript (ES6)](http://es6-features.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Heroku](https://www.heroku.com/)
- [MongoDB (mLab)](https://mlab.com/)

## License

MIT License

Copyright (c) 2018 Mike Yamato

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.