const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ key: functions.config().google.translate.api_key });

admin.initializeApp();

exports.onWriteTranslation = functions
    .region('europe-west1')
    .firestore
    .document('users/{userId}/translations/{translationId}')
    .onCreate(async (snap) => {
        const from = (snap.data() || {}).en;
        if (!from) return;
        let [translations] = await translate.translate(from, 'de');
        translations = Array.isArray(translations) ? translations : [translations];
        if (translations.length) {
            return admin.firestore().doc(snap.ref.path).update('de', translations[0]);
        }
    });
