import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/Firebase.init'
import { useState } from 'react';

const auth= getAuth(app)

function App() {
  const googleProvider =new GoogleAuthProvider()
  const githubProvider =new GithubAuthProvider()
  const [user,setUser]=useState({})
  const googleLogIn= ()=>{
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      const user =result.user
      setUser(user)
      console.log(user)
    })
    .catch(error =>{
      console.log('error:',error)
    })
  }
  const googleLogOut =()=>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })
    .catch(error=>{
      setUser({})
    })
  }
  const githubLogIn =()=>{
    signInWithPopup(auth,githubProvider)
    .then(result => {
      const user =result.user
      setUser(user)
      console.log(user)
    })
    .catch(error =>{
      console.log('error:',error)
    })
  }
  const githubLogOut =()=>{
    signOut(auth)
    .then( ()=>{
      setUser({})
    })
    .catch(error=>{
      setUser({})
    })
  }
  return (
    <div className="App">
    {
      user.email? 
      <>
        <button onClick={googleLogOut}>Google Sign Out</button>
        <br />
        <button onClick={githubLogOut}> Github Sign out</button>
      </>
      :
        
        <>
          <button onClick={googleLogIn}>Google Sign In</button>
          <br />
          <button onClick={githubLogIn}>Github Sign In</button>
        </>
    }
    <br /><br />
    {
      user.uid && <>
        <h3>user: {user.displayName}</h3>
        <p>email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </>
    }
    </div>
  );
}

export default App;
