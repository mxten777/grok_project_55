// functions/syncSearchIndex.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.syncSearchIndex = functions.firestore.document('books/{bookId}').onWrite((change, context) => {
  // Sync search index logic
});