/*
  Collection: Collection of Key/Value pairs 
  Document: Key - How you will access this data later. Usually username
  Data: Value - JSON object of data you want to store
*/
function writeDocument(db, collection, document, data, cb) {
    try {
      db.collection(collection).doc(document).set(data).then((writeResult) =>
        cb(data));
    } catch (err) {
      cb({ error: "Write Error" });
    }
  }
  
  /*
    Collection: Collection of Key/Value pairs
    Document: Key - How you plan to access this data
    cb: callback function since reading data is asynchronous
  */
  function readDocument(db, collection, document, cb) {
    db.collection(collection).doc(document).get().then((doc) =>
      cb(doc.data())
    ).catch(err => {
      console.log(err);
      cb({ error: "Read Document Error" })
    });
  }
  
  function readCollection(db, collection, cb) {
    db.collection(collection).get().then((col) =>
      cb(col.docs)
    ).catch(err => {
      cb({ error: "Read Collection Error" })
    });
  }
  
  function readCollectionWhere(db, collection, wc, cb) {
    db.collection(collection).where(wc[0], wc[1], wc[2]).get().then((col) =>
      cb(col.docs)
    ).catch(err => {
      cb({ error: "Read Collection Error" })
    });
  }
  
  function updateDocument(db, collection, document, data, cb) {
    db.collection(collection).doc(document).update(data).then((writeResult) =>
      cb(data)
    ).catch(err => {
      cb({ error: "Update Document Error" })
    });
  }
  
  async function addToDocumentField(db, admin, collection, document, key, value) {
    const docRef = db.collection(collection).doc(document);
    let payload = {}
    payload[key] = admin.firestore.FieldValue.arrayUnion(value);
    const unionRes = await docRef.update(payload);
    return unionRes;
  }
  
  async function removeFromDocumentField(db, admin, collection, document, key, value) {
    const docRef = db.collection(collection).doc(document);
    let payload = {}
    payload[key] = admin.firestore.FieldValue.arrayRemove(value);
    const unionRes = await docRef.update(payload);
    return unionRes;
  }
  
  
  module.exports = {
    writeDocument,
    readDocument,
    readCollection,
    readCollectionWhere,
    updateDocument,
    addToDocumentField,
    removeFromDocumentField
  };