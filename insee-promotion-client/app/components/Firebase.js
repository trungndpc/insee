import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
const config = {
    apiKey: "AIzaSyAs4x1pmuienHn21ulZ4zuhweTFt4ujCEI",
    authDomain: "insee-1ce3f.firebaseapp.com",
    projectId: "insee-1ce3f",
    storageBucket: "insee-1ce3f.appspot.com",
    messagingSenderId: "471532250212",
    appId: "1:471532250212:web:a6607b67a18dccb0a56b71",
    measurementId: "G-72T8VS69CZ"
};
var isInitFirbase = false;

export default class Firebase extends React.Component {
    constructor(props) {
        super(props)
        if (!isInitFirbase) {
            firebase.initializeApp(config);
            firebase.auth().languageCode = 'vi';
            isInitFirbase = true;
        }
        this.dataRecaptcha = null;
        this.dataConfirmation = null;

        this.recaptcha = this.recaptcha.bind(this)
        this.sendOTP = this.sendOTP.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount() {
        this.recaptcha();
    }

    recaptcha() {
        const RECAPTCHA_VERIFIER = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        });
        this.dataRecaptcha = RECAPTCHA_VERIFIER;
        return RECAPTCHA_VERIFIER;
    }

    sendOTP(phone, callback) {
        let recaptcha = this.dataRecaptcha ? this.dataRecaptcha : this.recaptcha();
        firebase.auth().signInWithPhoneNumber(phone, recaptcha)
            .then(function (rs) {
                this.dataConfirmation = rs;
                callback(0)
            }.bind(this))
            .catch(function (err) {
                callback(-1)
            }.bind(this))
    }

    confirm(smsCode, callback) {
        this.dataConfirmation.confirm(smsCode)
            .then(function (result) {
                callback(0, result)
            }).catch(function (error) {
                callback(-1, null)
            });
    }

    render() {
        return (
            <div>
                <div id="recaptcha-container"></div>
            </div>
        )
    }
}
