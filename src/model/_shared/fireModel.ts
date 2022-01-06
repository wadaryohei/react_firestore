import firebase from './firebase'

//----------------------------------
// type
//----------------------------------
type FireModelType = {
  baseReference: (modelName: ModelType) => firebase.firestore.CollectionReference
}

type ModelType = 'profiles' | 'posts' | 'socials' | 'followers' | 'followings' | 'following'

//----------------------------------
// class
//----------------------------------
class FireModel implements FireModelType {
  /**
   * modelのバージョンを返す
   */
  private modelVersion(): string {
    return 'v1'
  }

  /**
   * rootのコレクション名を受け取ってバージョンと合わせたパスを返す
   */
  private modelPath(modelName: ModelType): string {
    return `${modelName}/${this.modelVersion()}`
  }

  /**
   * firestoreのベースRefを返す
   */
  public baseReference(modelName: ModelType): firebase.firestore.CollectionReference {
    return firebase.firestore().doc(this.modelPath(modelName)).collection('users')
  }
}

export default FireModel
