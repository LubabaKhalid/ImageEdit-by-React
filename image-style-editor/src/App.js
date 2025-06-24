import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './Login';
import Signup from './Signup';
import Editor from './Editor'; // This will be the main editor component

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (!user) {
    return showSignup ? (
      <>
        <Signup onSignup={() => setShowSignup(false)} />
        <p onClick={() => setShowSignup(false)}>Already have an account? Login</p>
      </>
    ) : (
      <>
        <Login onLogin={() => {}} />
        <p onClick={() => setShowSignup(true)}>Don't have an account? Sign up</p>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signOut(auth)}>Logout</button>
      <Editor user={user} />
    </>
  );
}

export default App;
