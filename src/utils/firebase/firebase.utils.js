import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs

} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDgInAOEKUOnm_AIaj0AhAd5pt8GDMJCs8',

  authDomain: 'store-firebase-5c8b7.firebaseapp.com',

  projectId: 'store-firebase-5c8b7',

  storageBucket: 'store-firebase-5c8b7.appspot.com',

  messagingSenderId: '425458943615',

  appId: '1:425458943615:web:5970fcc9dbaaf45227a14a',
}

const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup =()=>signInWithPopup(auth,provider)
export const signInWithGoogleRedirect =()=>signInWithRedirect(auth,provider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach(object =>{
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef,object)
   })


    await batch.commit()
    console.log('done ');
  
}
export const getCategoriesAndDocuments = async ()=> {
  const collectionRef = collection(db,'categories')
  const q = query(collectionRef)


  const querySnapshot = await getDocs(q)
  
 const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
   const {title,items} = docSnapshot.data()
   acc[title.toLowerCase()] = items;
   return acc
 },{})
return categoryMap
}


export const createUserDocumentFromAuth = async(userAuth,additionalInformation={})=>{

  if(!userAuth) return

  const userDocRef = doc(db,'users',userAuth.uid)

  const userSnapShot = await getDoc(userDocRef)


 if(!userSnapShot.exists()) {
   const {displayName, email} = userAuth;
   const createdAt = new Date()


   try {
     await setDoc(userDocRef,{

       displayName,
       email,
       createdAt,
       ...additionalInformation
     })
   } catch (error) {
     console.log(error);
     
   }
 }

 return userDocRef;
}

export const createAuthUserWithEmailAndPassword =async (email, password) => {
  if(!email || !password) return

   return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser =async()=> await signOut(auth)

export const onAuthStateChangedListener = (callback)=>onAuthStateChanged(auth,callback)