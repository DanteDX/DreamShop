import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";

interface NewUser {
  newUserEmail: string;
  newUserPassword: string;
}


export default function Auth() {
  const provider = new fuego.auth.GoogleAuthProvider();
  useEffect(function(){
    fuego.auth().getRedirectResult()
     .then(function(result){
       console.log(result.user);
     })
     .catch(function(err){
       console.log('There was an error with redirect');
       console.log(err);
     })
 },[])
  const [user,loading] = useAuthState(fuego.auth());
  const defaultState = {
    newUserEmail: "",
    newUserPassword: "",
  };
  const [state, setState] = useState<NewUser>(defaultState);
  const {data:currentUser,set:setUser} = useDocument(`users/${state.newUserEmail}`,{
    listen:true
  });
  const router = useRouter();
  if (user) {
    router.push("/books");
  }
  
  return (
    <div>
      {loading ? "user loading" : "user not loading"}
      <p>Fill out the sign up form</p>
      <input
        type="text"
        value={state.newUserEmail}
        placeholder="Enter an email"
        onChange={(e) => {
          setState((state) => ({
            ...state,
            newUserEmail: e.target.value,
          }));
        }}
      />
      <br />
      <input
        type="text"
        value={state.newUserPassword}
        placeholder="Enter a new password"
        onChange={e =>{
            setState(state =>({
                ...state,
                newUserPassword:e.target.value
            }))
        }}
      />
      <br/>
      <button onClick={async(e) =>{
          if(!currentUser){
              console.log('A user already exist with this email');
              try{
                  await fuego.auth().signInWithEmailAndPassword(state.newUserEmail,state.newUserPassword);
              }catch(err){
                  console.log('There was an error signing in');
                  setState(state => defaultState);
              }
          }else if(currentUser){
              try{
                await setUser(state);
                await fuego.auth().createUserWithEmailAndPassword(state.newUserEmail,state.newUserPassword);
              }catch(err){
                  console.log('There was an error with signing up');
                  console.log(err);
                  setState(defaultState);
              }
          }
      }}>
          ADD NEW USER
      </button>
      <button onClick={async(e) =>{
        try{
          // const result = await fuego.auth().signInWithPopup(provider);
          await fuego.auth().signInWithRedirect(provider);
          // const result = await fuego.auth().getRedirectResult();
          // console.log("Google user is", result.user);
          // console.log('credential ', result.credential);
          // console.log('token ', result.credential.accessToken);
          // console.log('User ', result.user);
        }catch(err){
          console.log('There was an error signing up with google');
          console.log(err);
        }
      }}>Sign Up With Google</button>
    </div>
  );
}
