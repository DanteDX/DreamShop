import 'tailwindcss/tailwind.css'
import React from "react";
import 'firebase/firestore';
import 'firebase/auth';
import {FuegoProvider} from "@nandorojo/swr-firestore";
import {firebaseConfig} from "@/config/firebaseConfig";
import FirebaseProvider from "@/components/wrappers/firebaseProvider";
import { Fuego } from "@/scripts/fuego";

const fuego = new Fuego(firebaseConfig);

function App({ Component, pageProps }) {
  return(
    <FuegoProvider fuego={fuego}>
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </FuegoProvider>
  )
}

export default App;
