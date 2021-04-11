import { privateKey, databaseURL } from "../config/privateKey";
import * as admin from "firebase-admin";

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL
  })
}catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error("Admin initialization failed",err.stack)
  }
}

export default admin.firestore();
