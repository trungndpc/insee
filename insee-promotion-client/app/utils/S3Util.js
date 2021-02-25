var bucketRegion = "us-east-2";
var albumBucketName = "insee-promotion-vn";
var IdentityPoolId = "us-east-2:576f9bed-553b-46e0-b874-1b72134451bb";

var s3;
export default class S3Util {

  static init() {
    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    s3 = new AWS.S3({
      apiVersion: "2012-10-17",
      params: { Bucket: albumBucketName }
    });
  }

  static createAlbum(parent, name, callback) {
    console.log(name)
    name = name.trim();
    parent = parent.trim();

    var albumKey = encodeURIComponent(parent) + "/" + encodeURIComponent(name);
    s3.headObject({ Key: albumKey }, function (err, data) {
      if (!err) {
        callback(albumKey)
      }
      s3.putObject({ Key: albumKey }, function (err, data) {
        callback(albumKey)
      });
    });
  }

  static addPhoto(albumkey, file, fileName) {
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

  static addPhotos(albumkey, files, fileName) {
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




}