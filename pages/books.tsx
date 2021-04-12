import React, { useState,useEffect } from "react";
import { fuego, useDocument, useCollection } from "@nandorojo/swr-firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface eachBook{
  newBookId: string;
  newBookName: string;
  newBookGenre: string;
  newBookWriter: string;
  readerMinimumAge: number;
};

export default function Books() {
  const [user] = useAuthState(fuego.auth());
  const defaultState = {
    newBookId: "",
    newBookName: "",
    newBookGenre: "",
    newBookWriter: "",
    readerMinimumAge: 0,
  };
  const [state, setState] = useState<eachBook>(defaultState);
  const { data: allBooks } = useCollection("books", {
    listen: true
  });
  const { set: addNewBook} = useDocument(`books/${state.newBookId}`, {
    listen: true
  });

  useEffect(function(){
    console.log(allBooks);
  },[allBooks])

  //sadoasmdoisamd
  return (
    <div>
      {allBooks ? <p>Books exists{allBooks.toString()}</p> : <p>Books don't exist yet</p>}
      <br/>
      {user ? `Logged in as ${user.email}` : "No user is logged in currently"}
      <br/>
      <button onClick={async(e) =>{
        try{
          await fuego.auth().signOut();
        }catch(err){
          console.log('There was an error signing out!')
        }
      }}>
        LogOut
      </button>
      <br/>
      {/*  */}
      <input
        id="newBookName"
        type="text"
        placeholder="newBookName"
        value={state.newBookName}
        onChange={(e) => {
          setState((state) => ({
            ...state,
            newBookId: e.target.value,
            newBookName: e.target.value,
          }));
        }}
      />
      <br/>
      <input
        id="newBookGenre"
        type="text"
        placeholder="newBookGenre"
        value={state.newBookGenre}
        onChange={(e) => {
          setState((state) => ({
            ...state,
            newBookGenre: e.target.value,
          }));
        }}
      />
      <br/>
      <input
        id="newBookWriter"
        type="text"
        placeholder="newBookWriter"
        value={state.newBookWriter}
        onChange={(e) => {
          setState((state) => ({
            ...state,
            newBookWriter: e.target.value,
          }));
        }}
      />
      <br/>
      <input
        id="readerMinimumAge"
        type="number"
        placeholder="readerMinimumAge"
        value={state.readerMinimumAge}
        onChange={(e) => {
          setState((state) => ({
            ...state,
            readerMinimumAge: Number(e.target.value),
          }));
        }}
      />
      <br/>
      <button
        onClick={async (e) => {
          await Promise.all([
            // addNewBook(state),
            fuego.db.collection('books').doc(state.newBookId).set(state),
            setState(state => defaultState)
          ]);
        }}
      >
        ADD NEW BOOK
      </button>
    </div>
  );
}
