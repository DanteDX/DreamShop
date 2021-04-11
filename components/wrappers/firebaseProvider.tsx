import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/performance";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

import {firebaseConfig} from "@/config/firebaseConfig";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const FirebaseContext = createContext({});

export default function FirebaseProvider({ children }) {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      perf: firebase.performance(),
      analytics: firebase.analytics()
    });
  }, []);

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
}