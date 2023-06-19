import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import * as path from "path";

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, "..", "config", "serviceAccountKey.json")
  ),
});

@Injectable()
export class FirebaseService {
  constructor() {}

  async sendPushNotification(
    token: string,
    title: string,
    body: string,
    data: any
  ) {
    const message = {
      notification: {
        title,
        body,
      },
      data,
      token,
    };

    try {
      await firebase.messaging().send(message);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
