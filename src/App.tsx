// Dependencies
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { AuthContext } from "./context/AuthContext";

// Interfaces
import { IUser } from "./interfaces/IUser";

// Libs
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./libs/firebase";

// Components
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewHome";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

// CSS
import "./App.scss";

function App() {
  const [userState, setUserState] = useState<IUser | string>();

  useEffect(() => {
    function loginVerifierHandler() {
      const unsubscribe = auth.onAuthStateChanged((userRecupered) => {
        // Serviço do firebase para verificar logins prévios
        if (userRecupered) {
          const user = {
            id: userRecupered.uid,
            name: userRecupered.displayName || "DEFAULT",
            avatar: userRecupered.photoURL || "DEFAULT",
          };

          setUserState(JSON.stringify(user));
        }
      });

      return unsubscribe;
    }
    const unsubscribe = loginVerifierHandler();

    return () => {
      unsubscribe();
    };
  }, [userState]);

  async function googleAuthHandler() {
    const googleAuthProvider = new GoogleAuthProvider();
    const authenticated = await signInWithPopup(auth, googleAuthProvider);

    const user = {
      id: authenticated.user.uid,
      name: authenticated.user.displayName || "DEFAULT",
      avatar: authenticated.user.photoURL || "DEFAULT",
    };

    setUserState(user);
    return user;
  }

  return (
    <Router>
      <AuthContext.Provider
        value={{
          userState:
            typeof userState == "string" ? JSON.parse(userState) : userState,
          signInWithGoogle: googleAuthHandler,
        }}
      >
        <Routes>
          <Route path="/room/create" element={<NewRoom />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/" element={<Home />} />
          <Route path="/room/admin/:id" element={<AdminRoom />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
