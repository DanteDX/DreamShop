import '../styles/globals.css'
import React from "react";
import 'firebase/firestore';
import 'firebase/auth';
import {Fuego, FuegoProvider} from "@nandorojo/swr-firestore";
import {firebaseConfig} from "../config/firebaseConfig";

const fuego = new Fuego(firebaseConfig);

function MyApp({ Component, pageProps }) {
  <FuegoProvider fuego={fuego}>
    <Component {...pageProps} />
  </FuegoProvider>
}

export default MyApp
