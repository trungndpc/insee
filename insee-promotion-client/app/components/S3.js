import React, { Component } from 'react'
import '../resources/js/aws-sdk-2.821.0.min.js'


var bucketRegion = "us-east-2";
var albumBucketName = "insee-promotion-vn";
var IdentityPoolId = "us-east-2:576f9bed-553b-46e0-b874-1b72134451bb";
var S3_INSTANCE;
const FOLDER = "upload"
class S3 extends Component {

    constructor(props) {
        super(props)
        this.init()
        this.createAlbum = this.createAlbum.bind(this)
        this.addPhoto = this.addPhoto.bind(this)
        this.addPhotos = this.addPhotos.bind(this)
        this.upload = this.upload.bind(this)
    }


    init() {
        if (!S3_INSTANCE) {
            AWS.config.update({
                region: bucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: IdentityPoolId
                })
            });

            S3_INSTANCE = new AWS.S3({
                apiVersion: "2012-10-17",
                params: { Bucket: albumBucketName }
            });
        }
    }

    upload(fileList) {
        return new Promise((resolve, reject) => {
            this.createAlbum(FOLDER, 'user', (pathFolder) => {
                let name = new Date().getTime();
                let promoise = this.addPhotos(pathFolder, fileList, name);
                promoise.then(values => {
                    resolve(values.map(value => value.Location))
                }).catch(e => {
                    reject('Đã có lỗi xảy ra trong quá trình upload');
                })
            });
        });
    }

    createAlbum(parent, name, callback) {
        console.log(name)
        name = name.trim();
        parent = parent.trim();

        var albumKey = encodeURIComponent(parent) + "/" + encodeURIComponent(name);
        S3_INSTANCE.headObject({ Key: albumKey }, function (err, data) {
            if (!err) {
                callback(albumKey)
            }
            S3_INSTANCE.putObject({ Key: albumKey }, function (err, data) {
                callback(albumKey)
            });
        });
    }

    addPhoto(albumkey, file, fileName) {
        var pathFile = albumkey + "/" + encodeURIComponent(fileName);
        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: albumBucketName,
                Key: pathFile,
                Body: file,
                ACL: "public-read"
            }
        });
        return upload.promise();
    }

    addPhotos(albumkey, files, fileName) {
        var promises = [];

        for (var i = 0; i < files.length; i++) {
            var file = files.item(i);
            var ext = file.name.split('.').pop();
            let name = fileName + "-" + i + "." + ext;
            let promise = this.addPhoto(albumkey, file, name);
            promises.push(promise);
        }
        return Promise.all(promises);
    }

    render() {
        return this.props.children;
    }
}

export default S3
