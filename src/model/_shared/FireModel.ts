import firebase from './firebase'

//----------------------------------
// type
//----------------------------------
export interface FireModelType {
  getCollectionDatas: () => Promise<
    firebase.firestore.QuerySnapshot | undefined
  >
  getDocumentDatas: () => Promise<
    firebase.firestore.DocumentSnapshot | undefined
  >
  getSubCollectionDatas: () => Promise<
    firebase.firestore.QuerySnapshot | undefined
  >
}

//----------------------------------
// class
//----------------------------------
export class FireModel implements FireModelType {
  //----------------------------------
  // member
  //----------------------------------
  private refPath: string[]
  private fireCollectionDB: firebase.firestore.CollectionReference | null = null
  private fireDocumentDB: firebase.firestore.DocumentReference | null = null
  private fireSubCollectionDB: firebase.firestore.CollectionReference | null = null

  //----------------------------------
  // init
  //----------------------------------
  constructor(refPath: string) {
    this.refPath = refPath.split('/')
    this.splitPath(this.refPath)
  }

  //----------------------------------
  // methdos
  //----------------------------------
  private splitPath(refPath: string[]) {
    switch (refPath.length) {
      // ① RootCollectionのRef
      case 1:
        this.fireCollectionDB = firebase.firestore().collection(refPath[0])
        break

      // ② RootCollection内の特定のDocumentRef
      case 2:
        this.fireDocumentDB = firebase
          .firestore()
          .collection(refPath[0])
          .doc(refPath[1])
        break

      // ③ 特定のDocumentRef以下のSubCollectionRef
      case 3:
        this.fireSubCollectionDB = firebase
          .firestore()
          .collection(refPath[0])
          .doc(refPath[1])
          .collection(refPath[2])
        break
    }
  }

  /**
   * コレクション内のドキュメントデータを全件取得
   */
  public async getCollectionDatas(): Promise<
    firebase.firestore.QuerySnapshot | undefined
  > {
    return await this.fireCollectionDB?.get()
  }

  /**
   * コレクション内の特定のドキュメントデータを取得
   */
  public async getDocumentDatas(): Promise<
    firebase.firestore.DocumentSnapshot | undefined
  > {
    return await this.fireDocumentDB?.get()
  }

  /**
   * 特定のサブコレクションのドキュメントデータを全件取得
   */
  public async getSubCollectionDatas(): Promise<
    firebase.firestore.QuerySnapshot | undefined
  > {
    return await this.fireSubCollectionDB?.get()
  }
}
