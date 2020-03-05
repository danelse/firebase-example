
let translateButton;
let textInput;
let results;

let userId;
let firebaseAuth;
let firebaseFirestore;

function initDom() {
  translateButton = document.getElementById('translateButton');
  textInput = document.getElementById('textInput');
  results = document.getElementById('results');
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
      results.innerHTML = '';

      querySnapshot.forEach(function (doc) {
        results.innerHTML += '<br />' + doc.data().en;
      });
    });
}

function translateButtonClicked() {
  const text = (textInput.value || '').trim();
  if (!text || !userId) return;
  const translation = {
    en: text,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  };
  firebaseFirestore.collection('users').doc(userId).collection('translations').add(translation).catch();
  console.log(firebaseFirestore);
}

document.addEventListener('DOMContentLoaded', function () {
  initDom();
  initFirebase();
  translateButton.addEventListener('click', translateButtonClicked);
});
