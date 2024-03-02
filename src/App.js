import React, { useEffect } from "react";

import "./App.css";
import { HomeScreen } from "./screen/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginScreen } from "./screen/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { ProfileScreen } from "./screen/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        ///Logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route
            exact
            path="/"
            element={user ? <HomeScreen /> : <LoginScreen />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
