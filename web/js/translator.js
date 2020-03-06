
let translateButton;
let copyResultButton;
let textInput;
let history;
let resultContainer;

let userId;
let firebaseAuth;
let firebaseFirestore;

function initDom() {
  translateButton = document.getElementById('translateButton');
  copyResultButton = document.getElementById('copyResultButton');
  textInput = document.getElementById('textInput');
  history = document.getElementById('history');
  resultContainer = document.getElementById('result');
}

function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAxILgXvd8ygEbnf1MtJ7mPpbMd_LpAzc8",
    authDomain: "ulss-firebase-example.firebaseapp.com",
    databaseURL: "https://ulss-firebase-example.firebaseio.com",
    projectId: "ulss-firebase-example",
    storageBucket: "ulss-firebase-example.appspot.com",
    messagingSenderId: "236935176202",
    appId: "1:236935176202:web:cf240e4b95dbc95b2e7ff3"
  };
  firebase.initializeApp(firebaseConfig);

  firebaseAuth = firebase.auth();
  firebaseFirestore = firebase.firestore();

  firebaseAuth.signInAnonymously()
    .then(function (auth) {
      userId = auth.user.uid;
      getTranslations();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getTranslations() {
  firebaseFirestore
    .collection('users')
    .doc(userId)
    .collection('translations')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      translateButton.removeAttribute('disabled');
      history.innerHTML = '';
      let index = 0;
      querySnapshot.forEach(function (doc) {
        if (index === 0) {
          textInput.value = doc.data().en;
          resultContainer.innerHTML = doc.data().de || '';
        } else {
          history.innerHTML += '<tr><td>' + doc.data().en + '</td><td>' + doc.data().de + '</td></tr>'
        }
        index++;
      });
    });
}

function translateButtonClicked() {
  translateButton.setAttribute('disabled', '');
  const text = (textInput.value || '').trim();
  if (!text || !userId) return;
  const translation = {
    en: text,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  };
  firebaseFirestore.collection('users').doc(userId).collection('translations').add(translation).catch();
}

function checkButtonState() {
  if ((textInput.value || '').trim()) {
    translateButton.removeAttribute('disabled');
  } else {
    translateButton.setAttribute('disabled', '');
    resultContainer.innerHTML = 'result will be displayed here…';
  }
}

function copyTranslation() {
  resultContainer.removeAttribute('disabled');
  resultContainer.select();
  document.execCommand('copy');
  resultContainer.setAttribute('disabled', '');
}

document.addEventListener('DOMContentLoaded', function () {
  initDom();
  initFirebase();
  translateButton.addEventListener('click', translateButtonClicked);
  copyResultButton.addEventListener('click', copyTranslation);
});
