import * as functions from "firebase-functions";

import axios from "axios";
import cors from "cors";
import type {ProductI} from "./types/types";
import admin from "firebase-admin";
const setCors = cors({origin: true});

// The Firebase Admin SDK to access Firestore.

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.getProducts = functions.https.onRequest(async (req, res) => {
  setCors(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed",
      });
    }
    try {
      const response = await axios.get(
          `${process.env.PRINTIFY_API_URL}/
          shops/${process.env.PRINTIFY_SHOP_ID}/products.json`,
          {
            headers: {
              "Authorization": `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
              "Content-Type": "application/json;charset=utf-8",
              "User-Agent": "Node.js",
            },
          }
      );

      return res.status(200).json(response.data);
    } catch (error: any) {
      functions.logger.error(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  });
});

exports.getProductById = functions.https.onRequest(async (req, res) => {
  setCors(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed",
      });
    }
    try {
      const response = await axios.get(
          `${process.env.PRINTIFY_API_URL}/
          shops/${process.env.PRINTIFY_SHOP_ID}/products.json`,
          {
            headers: {
              "Authorization": `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
              "Content-Type": "application/json",
              "User-Agent": "Node.js",
            },
          }
      );

      const result: ProductI[] = response.data.data.find(
          (p: ProductI) =>
            p.id === req.query.id && !p.is_locked && p.visible
      );
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({message: "Product not found"});
    } catch (error:any) {
      functions.logger.error(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  });
});


// Grab the text parameter.
// const original = req.query.text;
// Push the new message into Firestore using the Firebase Admin SDK.

// const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
// Send back a message that we've successfully written the message

// Listens for new messages added to
// /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore
    .document("/messages/{documentId}")
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log(
          "Uppercasing",
          context.params.documentId,
          original
      );

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing
      // asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });
