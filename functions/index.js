const functions = require('firebase-functions');
const cors = require("cors")({origin: true});
const admin = require("firebase-admin");
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {
  projectId:"rncourse-1514244841127",
  keyFilename:"rnplaces.json"
}
const gcs = require("@google-cloud/storage")(gcconfig)
admin.initializeApp({
  credential: admin.credential.cert(
    require("./rnplaces.json")
  )
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    console.log(request.headers)
    if(
      !request.headers.authorization || 
      !request.headers.authorization.startsWith("Bearer "))
      {
        console.log("No Token Present")
        response.status(403).json({error: "Unauthorized"})
        return;
    }
    let idToken; 
    idToken = request.headers.authorization.split("Bearer ")[1];
    admin.auth().verifyIdToken(idToken).then( decdedToken => {
      const body = JSON.parse(request.body);
      fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err=>{
        return response.status(500).json({error:err});
      });
      const bucket = gcs.bucket("rncourse-1514244841127.appspot.com")
      const uuid = UUID();
      bucket.upload("/tmp/uploaded-image.jpg",{
        uploadType: "media",
        destination: "/places" + uuid + ".jpg",
        metadata:{
          metadata:{
            contentType: "image/jpeg",
            firebaseStorageDownloadTokens: uuid
          }
        }
      }, (err, file)=>{
         if(!err){
           response.status(201).json({
             imageUrl: "https://firebasestorage.googleapis.com/v0/b/"+ 
             bucket.name + 
             "/o/"+
             encodeURIComponent(file.name)+
             "?alt=media&token="+
             uuid,
             imagePath: "/places" + uuid + ".jpg"
           })
         }else{
           console.log(err)
           response.status(500).json({error: err});
         }
      })
    }).catch( error =>{
      console.log("token is invalid")
      response.status(403).json({error: "Unauthorized"})
      return;
    })
  });
});


exports.deleteImage = functions.database.ref("/places/{placeId}").onDelete(
  event => {
    const placeData = event.data.previous.val();
    const imagePath = placeData.imagePath;
    const bucket = gcs.bucket("rncourse-1514244841127.appspot.com")
    return bucket.file(imagePath).delete()
  }
)