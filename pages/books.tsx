import React, { useState } from "react";
import db from "@/scripts/firestoreAdmin";
import { fuego, useDocument, useCollection } from "@nandorojo/swr-firestore";

type eachBook = {
  newBookId: string;
  newBookName: string;
  newBookGenre: string;
  newBookWriter: string;
  readerMinimumAge: number;
};

export default function Books() {
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
  const { set: addNewbook } = useDocument(`books/${state.newBookId}`, {
    listen: true
  });
  return (
    <div>
      {allBooks ? <p>Books exists</p> : <p>Books don't exist yet</p>}
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
      <input
        id="readerMinimumAge"
        type="number"
        placeholder="readerMinimumAge"
        value={state.readerMinimumAge}
        onChange={(e) => {
          setState((stat) => ({
            ...state,
            readerMinimumAge: Number(e.target.value),
          }));
        }}
      />
      <button
        onClick={async (e) => {
          await Promise.all([
            addNewbook(state),
            setState((state) => defaultState)
          ]);
        }}
      >
        ADD NEW BOOK
      </button>
    </div>
  );
}
