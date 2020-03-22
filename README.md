# Fireabse Example

This demo application is intended to demonstrate the use of [serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) in relation to a Web application. The app uses the services Authorization, Firestore, Functions and Hosting from [Google Firebase](https://firebase.google.com/).

The app is a simple translator that can translate German into English and can be reached [here](https://ulss-firebase-example.web.app/).

The use of a single page application framework like Angular or React was deliberately avoided in order to make the demonstration as simple as possible.

![Animation of the demo app](https://ulss-firebase-example.web.app/images/translator.gif)

## Requirements

* [Google Firebase Account](https://console.firebase.google.com/)
* [NPM](https://www.npmjs.com/)
* [Firebase CLI](https://firebase.google.com/docs/cli)

## Setup

To install the app, you have to set up a Firebase project and make adjustments in the code.

### Firebase Setup

1. Navigation to the [Firebase Console](https://console.firebase.google.com/), click on Add Project and go through the wizard.
2. Navigation to "Authentication" in the menu on the left side and activate the login method "anonymous"
3. Navigation to "Database" and selection of "Firestore". In the popup that appears, any region can be selected. It is important that later the cloud functions are hosted in the same region to avoid high latencies.
4. Navigation to project settings by clicking on the gear wheel. There you have to add a web app in the lower part of the screen. After going through the wizard you can view the configuration for the app by clicking on "CDN". It is needed later to initialize the app.

### Project Setup

1. Open `web/js/translator.js` and insert the Firebase data according to your Firebase project (line 21-27).
2. Open `.firebaserc` and insert your project name.
3. Open `functions/index.js` and insert your Firebase Function region (line 9). 
4. Enable the Cloud Translation API in the Google Cloud Console and copy the API Key.
5. Add the API Key to your Cloud Function config by running ```firebase functions:config:set google.translate.api_key="YOUR_API_KEY"```

### Run the Project

Just open the `index.html` file in your browser.

### Deploy

Run ```firebase deploy``` in the root of the directory in order to deploy the functions, the web-app and the rules. 
