import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const firestore = admin.firestore();

export const onUserStatusChange = functions.database
    .ref("/ponasasa/doctors/{uid}/isOnline")
    .onUpdate(async (change, context) => {
        // Get the data written to Realtime Database
        const isOnline = change.after.val();

        // Get a reference to the Firestore document
        const userStatusFirestoreRef = firestore.doc(`doctors/${context.params.uid}`);

        console.log(`Doctor Status ==> : ${isOnline}`);

        // Update the values on Firestore
        return userStatusFirestoreRef.update({
            isOnline: isOnline,
            //   last_seen: Date.now(),
        });
    });


  // // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
//   });
