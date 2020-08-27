import firebase from './firebase'

class fireModel {
  /**
   * 特定のコレクション内の特定のドキュメントを取得
   */
  public static async doc(
    path: string
  ): Promise<firebase.firestore.DocumentSnapshot> {
    return await firebase
      .firestore()
      .doc(path)
      .get()
  }

  /**
   * 特定のコレクション内のドキュメントを全件取得
   */
  public static async collection(
    path: string
  ): Promise<firebase.firestore.QuerySnapshot> {
    return await firebase
      .firestore()
      .collection(path)
      .get()
  }

  /**
   * コレクションのRefを返す
   */
  public static collectionRef(
    path: string
  ): firebase.firestore.CollectionReference {
    const splitPath = path.split('/')
    return firebase.firestore().collection(splitPath[0])
  }

  /**
   * サブコレクションのRefを返す
   */
  public static subCollectionRef(
    path: string
  ): firebase.firestore.CollectionReference {
    const splitPath = path.split('/')
    return firebase
      .firestore()
      .collection(splitPath[0])
      .doc(splitPath[1])
      .collection(splitPath[2])
  }

  /**
   * コレクション内のドキュメントのRefを返す
   */
  public static docRef(path: string): firebase.firestore.DocumentReference {
    const splitPath = path.split('/')
    return firebase
      .firestore()
      .collection(splitPath[0])
      .doc(splitPath[1])
  }

  /**
   * サブコレクション内のドキュメントのRefを返す
   */
  public static subDocRef(path: string): firebase.firestore.DocumentReference {
    const splitPath = path.split('/')
    return firebase
      .firestore()
      .collection(splitPath[0])
      .doc(splitPath[1])
      .collection(splitPath[2])
      .doc(splitPath[3])
  }
}

export default fireModel
