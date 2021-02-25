
const firebaseConfig = {
    apiKey: "AIzaSyAs4x1pmuienHn21ulZ4zuhweTFt4ujCEI",
    authDomain: "insee-1ce3f.firebaseapp.com",
    projectId: "insee-1ce3f",
    storageBucket: "insee-1ce3f.appspot.com",
    messagingSenderId: "471532250212",
    appId: "1:471532250212:web:a6607b67a18dccb0a56b71",
    measurementId: "G-72T8VS69CZ"
};

export default class FirebaseUtil {

    static init() {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().languageCode = 'vi';
    }

    static recaptcha() {
        return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function (response) {
            }
        });
    }

    static sendSMS(recaptchaVerifier, phone, callback) {
        firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
            .then(function (confirmationResult) {
                callback(0, confirmationResult);
            }).catch(function (error) {
                console.log(error)
                callback(-1, null);
            });
    }

    static confirm(smsCode, confirmationResult, success, faild) {
        confirmationResult.confirm(smsCode).then(function (result) {
            success(result);
        }).catch(function (error) {
            faild(error)
            console.log("[firebase_confirm] error: " + error);
        });
    }

}

