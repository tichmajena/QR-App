import admin from "firebase-admin";
import * as serviceAccount from "$lib/akribosqrapp-firebase-adminsdk-tsrk4-5c0761eab8.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
