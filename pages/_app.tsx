import '../styles/globals.css'
import React from "react";
import 'firebase/firestore';
import 'firebase/auth';
import {Fuego, FuegoProvider} from "@nandorojo/swr-firestore";
import {firebaseConfig} from "@/config/firebaseConfig";
import FirebaseProvider from "@/components/wrappers/firebaseProvider";

const fuego = new Fuego(firebaseConfig);

function App({ Component, pageProps }) {
  <FuegoProvider fuego={fuego}>
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  </FuegoProvider>
}

export default App;
