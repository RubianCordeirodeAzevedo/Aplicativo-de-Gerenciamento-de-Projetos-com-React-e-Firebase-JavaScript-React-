import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Login from './components/Login';
import firebase from 'firebase/app';
import 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      setUser(result.user);
    });
  };

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <div className="App">
      {user ? (
        <>
          <h1>Welcome {user.displayName}</h1>
          <button onClick={handleLogout}>Logout</button>
          <ProjectForm />
          <ProjectList />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
