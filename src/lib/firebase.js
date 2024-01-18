import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, orderBy, limit, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2PzPgJY5EhXghiw-4fNRXLJ--UWldXeo",
  authDomain: "nexus-c7f81.firebaseapp.com",
  projectId: "nexus-c7f81",
  storageBucket: "nexus-c7f81.appspot.com",
  messagingSenderId: "518607628076",
  appId: "1:518607628076:web:f44354bceb9c4df62fee89",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      userToDB(result.user).then(() => {
        fetch(`/api/setuser?id=${result.user.uid}`).then(() => {
          window.location.reload();
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function signOutWithGoogle() {
  signOut(auth)
    .then(() => {
      fetch(`/api/setuser`).then(() => {
        window.location.reload();
      });
    })
    .catch((error) => {});
}

export async function userToDB(user) {
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
}

export async function getUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function loadMockUsers() {
  const response = await fetch("MOCK_USERS.json");
  const data = await response.json();

  for (const user of data) {
    const docRef = doc(db, "users", `${user.uid}`);
    await setDoc(docRef, user);
  }
}

export async function findUserByEmail(email) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let users = [];

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });

  return users;
}

export async function findUserByName(name) {
  console.log(name);
  const userRef = collection(db, "users");
  const q = query(userRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);

  let users = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });

  return users;
}

export async function followUser(uid, followingUid) {
  const docRef = doc(db, "following", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const following = docSnap.data().following;
    following.push(followingUid);
    await setDoc(docRef, { following: following });
  } else {
    await setDoc(docRef, { following: [followingUid] });
  }
}

export async function loadMockPosts() {
  const response = await fetch("MOCK_POSTS.json");
  const data = await response.json();

  for (const post of data) {
    // get username for each post
    post.username = await getUsername(`${post.uid}`);
    addDoc(collection(db, "posts"), post);
  }
}

export async function getTrendingPosts() {
  const postRef = collection(db, "posts");
  const q = query(postRef, orderBy("likes", "desc"), limit(10));
  const querySnapshot = await getDocs(q);

  const posts = [];

  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  //   //   get username for each post
  //   for (const post of posts) {
  //     post.username = await getUsername(`${post.uid}`);
  //     console.log(post.username);
  //   }

  return posts;
}

export async function getUsername(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().name;
  } else {
    return null;
  }
}

export async function getUserPosts(uid) {
  console.log(uid);
  const postRef = collection(db, "posts");
  const q = query(postRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const posts = [];

  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  return posts;
}

export async function newPost(post) {
  addDoc(collection(db, "posts"), post);
}

export async function getFollowingPosts(uid) {
  const docRef = doc(db, "following", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const following = docSnap.data().following;
    const postRef = collection(db, "posts");
    const q = query(postRef, where("uid", "in", following));
    const querySnapshot = await getDocs(q);

    const posts = [];

    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });

    return posts;
  } else {
    return [];
  }
}
