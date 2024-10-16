import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute user={user} path="/" exact component={() => (
          <>
            <h1>Welcome {user?.displayName || user?.email}</h1>
            <ProjectForm user={user} />
            <ProjectList user={user} />
          </>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
