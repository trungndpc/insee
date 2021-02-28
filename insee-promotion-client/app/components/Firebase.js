import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";

var config = {
    apiKey: "AIzaSyAEC96WyRueD1Ash54kgIHJ31BqGWHHS_4",
    authDomain: "insee-nt.firebaseapp.com",
    projectId: "insee-nt",
    storageBucket: "insee-nt.appspot.com",
    messagingSenderId: "1089546471836",
    appId: "1:1089546471836:web:4275dfaa3fc5d7330a6059",
    measurementId: "G-D60ZS1G34Q"
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
        console.log("sendOTP start.....")
        let recaptcha = this.dataRecaptcha ? this.dataRecaptcha : this.recaptcha();
        console.log("sendOTP")
        firebase.auth().signInWithPhoneNumber(phone, recaptcha)
            .then(function (rs) {
                this.dataConfirmation = rs;
                callback(0)
            }.bind(this))
            .catch(function (err) {
                callback(-1)
                this.dataRecaptcha = null;
            }.bind(this).bind(this))
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
