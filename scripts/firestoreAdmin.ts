import { privateKey, databaseURL } from "../config/privateKey";
import * as admin from "firebase-admin";

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: privateKey["project_id"],
      privateKey: privateKey["private_key"].replace(/\\n/g, "\n"),
      clientEmail: privateKey["client_email"]
    }),
    databaseURL
  })
}catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error("Admin initialization failed",err.stack)
  }
}

export default admin.firestore();
