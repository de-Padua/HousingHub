import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  reload,
} from "firebase/auth";
import { app, db, storage } from "./Firebase.tsx";
import Cookies from "universal-cookie";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

type Inputs = {
  title: string;
  description: string;
  images: string[];
  cep: string;
  bairro: string;
  endereço: string;
  estado: string;
  tamanho: number;
  tipo: string;
  valor: string;
  desc: string;
  id: string;
};
type ContextT = {
  userData: newuser;
  postSend: boolean;
  createUser: (data: formData) => Promise<any>;
  loginUser: (data: UserCredential) => Promise<any>;
  logout: () => Promise<void>;
  addNewPost: (
    post: Inputs,
    post_id: string,
    expectedLength: number
  ) => Promise<unknown>;
  checkPagesToAddNewItem: () => Promise<any>;
  uploadImages: (
    images: Blob,
    post_id: string,
    post: Inputs,
    expectedLengh: number
  ) => Promise<unknown>;
  getURL: (post_id: string, expectedLength: number, post: Inputs) => void;
  userId: string | null;
  setPostToFalse: () => void;
  getDocsFromDB: () => Promise<any>;
  addUsertoDB: (data: formData) => Promise<any>;
  addPostToDBUser: (post_id: Inputs) => void;
  getPost: (id: string | null) => Promise<any>;
  deletePostFromDB: (id: string) => Promise<any>;
  getUserProfile: (id: string) => Promise<any>;
  user: object | null;
  addFavToUserDb: (
    id: string,
    fav: { fav_id: string; favTitle: string }
  ) => boolean ;
  deleteFav:(id:string) => void;
};

type formData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  id: string;
};
type newuser = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  notifications: object[] | never[];
  posts_id: Inputs[] | [];
  id: string;
  favorites?: object[];
};
type Props = {
  children: JSX.Element;
};
type UserCredential = {
  email: string;
  password: string;
  id: string;
};
type UserUID = string | null;
const Context = createContext<ContextT | null>(null);

const cookies = new Cookies();

export const ContextProvider = ({ children }: Props) => {
  const auth = getAuth(app);
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [userId, setUserId] = useState<UserUID>(null);
  const [useIdDB, setUserIdDb] = useState<string | null>(null);
  const [postSend, setPostSend] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [user, setUser] = useState<object | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/auth.user
        setUserId(user.uid);
        setUserEmail(user.email);
        setUser(user);
        cookies.set("userSection", JSON.stringify(user.refreshToken), {
          path: "/",
        });
        cookies.set("id", JSON.stringify(user.uid), {
          path: "/",
        });

        // ...
      } else {
        setUserId(null);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [user]);
  const createUser = async (data: formData) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password).then(
      () => {
        if (auth !== null) {
          const tstxt = { ...data, id: auth.currentUser.uid };
          addUsertoDB(tstxt);
        }
      }
    );
  };
  const loginUser = (data: UserCredential) => {
    return signInWithEmailAndPassword(auth, data.email, data.password).then(
      () => getUserData(userId!)
      
    );
  };
  const logout = () => {
    return signOut(auth).then(()=>{
      location.reload()
    })

  };

  const getUserData = async (id: string) => {
    const userRef = doc(db, "users", id);
    const query = await getDoc(userRef);

    if (query.exists()) {
      setUserData(query.data());
    }
  };
  const checkPagesToAddNewItem = () => {
    const postsRef = collection(db, "pages");
    return getDocs(postsRef);
  };
  const addPostToDBUser = (newpost: Inputs) => {
    const array = [...userData.posts_id];
    array.unshift(newpost);

    if (userData !== null) {
      const userRef = doc(db, "users", userData.id);
      updateDoc(userRef, { posts_id: array }).then(() => {
        getUserData(userData.id);
        addNewNotification({
          title: "Anúncio disponível",
          desc: "Seu anúncio já está disponível e pode ser acessado",
          id: newpost.id,
          tipe: "success",
        });
      });
    }
  };
  const addNewNotification = (notification: object) => {
    const notifications_att = [...userData.notifications, notification];

    if (userData !== null) {
      const userRef = doc(db, "users", userData.id);
      updateDoc(userRef, { notifications: notifications_att }).then(() => {
        getUserData(userData.id);
      });
    }
  };
  const getURL = (post_id: string, expectedLengh: number, post: Inputs) => {
    const imageRef = ref(storage, `${post_id}/`);

    const test: Inputs = { ...post, images: [] };

    listAll(imageRef).then((resp) => {
      resp.items.map((item) => {
        getDownloadURL(item)
          .then((x) => {
            setImagesURL((prev) => [...prev, x]);
            test.images.push(x);
          })
          .then(() => {
            if (test.images.length === expectedLengh) {
              addNewPost(test, post_id).then();
            } else {
              return;
            }
          });
      });
    });
  };
  const uploadImages = (
    images: Blob,
    post_id: string,
    post: Inputs,
    expectedLengh: number
  ) => {
    const imagesRef = ref(
      storage,
      `${post_id}/${Math.floor(Math.random() * 100000000)}`
    );
    return uploadBytes(imagesRef, images).then(() => {
      setTimeout(() => {
        getURL(post_id, expectedLengh, post);
      }, 500);
    });
  };

  const addNewPost = (post: Inputs, post_id: string) => {
    const postRef = doc(db, "posts", post_id);
    return setDoc(postRef, post).then(() => {
      setPostSend(true);
      addPostToDBUser(post);
    });
  };
  const setPostToFalse = () => {
    setPostSend(false);
  };
  const getDocsFromDB = () => {
    const docs = collection(db, "posts");
    return getDocs(docs);
  };
  const addUsertoDB = (data: formData) => {
    const newUserObject: newuser = { ...data, notifications: [], posts_id: [],favorites:[] };
    const userRef = doc(db, "users", data.id);
    return setDoc(userRef, newUserObject).then(() => {
      getUserData(data.id);
    });
  };
  const getPost = async (id: string | null) => {
    if (id !== null) {
      const postRef = doc(db, "posts", id);
      const query = await getDoc(postRef);
      if (query.exists()) {
        return query.data();
      }
    }
  };

  const deletePostFromDB = (id: string) => {
    const postRef = doc(db, "posts", id);
    return deleteDoc(postRef).then(() => {
      updateUserProfile(id);
    });
  };
  const getUserProfile = async (id: string) => {
    const userProfileRef = doc(db, "users", id);
    const query = await getDoc(userProfileRef);
    if (query.exists()) {
      return query.data();
    }
  };
  const updateUserProfile = (id: string) => {
    const array = userData.posts_id.filter((oldId: Inputs) => {
      return oldId.id !== id;
    });

    if (userData !== null) {
      const userRef = doc(db, "users", userData.id);
      updateDoc(userRef, { posts_id: array }).then(() => {
        getUserData(userData.id);
        addNewNotification({
          title: "Anúncio excluido",
          desc: "Seu anúncio foi excluido com sucesso e não pode ser acessado",
          id: "Anúncio excluido",
          tipe: "danger",
        });
      });
    }
  };
  const addFavToUserDb = (
    id: string,
    fav: { fav_id: string; favTitle: string }
  ):boolean => {
    const array = [...userData.favorites];
    
    const found = array.find(item =>{
      return item.fav_id === fav.fav_id
    })

    if(!found) {
      const items_fav = [...userData.favorites,fav]
      if (userData !== null) {
      const userRef = doc(db, "users", userData.id);
      updateDoc(userRef, { favorites: items_fav, merge: true }).then(() => {
        getUserData(userData.id);
        addNewNotification({
          title: "Anúncio adicionado aos favoritos",
          desc: "O anúncio foi adicionado aos favoritos ",
          id: "Novo item em favoritos",
          tipe: "primary",
        });
      });
      
    }
    return true
    }
    else{
    return false
    }
    
  };

  const deleteFav = (id:string) => {
    const array = [...userData.favorites]
    const found = array.find(i =>{
      return i.fav_id === id
    })
    if(found){
      const newArray = array.filter(i =>{
        return i.fav_id !== id
      })
      const userRef = doc(db, "users", userData.id);
      updateDoc(userRef, { favorites: newArray, merge: true }).then(() => {
        getUserData(userData.id);
        addNewNotification({
          title: "Anúncio adicionado aos favoritos",
          desc: "O anúncio foi adicionado aos favoritos ",
          id: "Novo item em favoritos",
          tipe: "primary",
        });
      });

    }
  }
  
  return (
    <Context.Provider
      value={{
        deleteFav,
        addFavToUserDb,
        deletePostFromDB,
        addPostToDBUser,
        createUser,
        loginUser,
        userId,
        logout,
        checkPagesToAddNewItem,
        addNewPost,
        uploadImages,
        getURL,
        postSend,
        setPostToFalse,
        addUsertoDB,
        getDocsFromDB,
        getPost,
        userData,
        getUserProfile,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextF = () => {
  return useContext(Context);
};
