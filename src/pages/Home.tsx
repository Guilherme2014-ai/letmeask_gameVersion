/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import React, { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Interfaces
import { IUser } from "../interfaces/IUser";

// Assets
import ilustratorImage from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";

// Context
import { GetAuthContext } from "../context/AuthContext";

// Components
import { Button } from "../components/Button";
import { Room } from "../modules/Room";

// Interface
import { IGetAuthContextType } from "../interfaces/IGetAuthContextType";
// CSS
import "./styles/pageAuth.scss";

export function Home() {
  const { userState, signInWithGoogle } =
    GetAuthContext() as IGetAuthContextType;
  const [roomInput, setRoomInput] = useState("");
  const navigate = useNavigate();

  async function signInWithGoogleHandler() {
    const user = await signInWithGoogle();

    if (user) navigate("/room/create");
  }

  async function joinRoomHandler(e: MouseEvent<HTMLButtonElement>) {
    try {
      e.preventDefault();
      const isEmpty = roomInput.trim() == "";

      if (isEmpty) {
        alert("Tá vázio !");
        return;
      }

      const room = new Room();
      const exists = await room.roomExists(roomInput);

      if (!exists) {
        alert("Room does not exists !");
        return;
      }

      const hasBeenClosed = await room.hasBeenClosed(roomInput);

      if (hasBeenClosed) {
        alert("This room have been closed ;-;");
        return;
      }

      navigate(`room/${roomInput}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div id="pageAuth">
      <aside>
        <img src={ilustratorImage} alt="image" />
        <strong>Crie Salas de QA &amp; ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="pageAuth--mainContent">
          <img src={logoImage} alt="letmeask" />
          {!userState && (
            <>
              <Button
                backgroundColor="#ea4335"
                color="#f8f8f8"
                events={{
                  onClick: signInWithGoogleHandler,
                }}
              >
                <img src={googleIconImage} alt="Logo do Google" />
                Crie sua Sala com o Google
              </Button>
              <div className="pageAuth--mainContent__divider">
                Ou Entre em uma Sala
              </div>
            </>
          )}
          <form>
            <input
              type="text"
              placeholder="Digite o Código da Sala"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
            />
            <Button
              events={{
                onClick: (e) => joinRoomHandler(e),
              }}
              backgroundColor="#835AFD"
            >
              Entrar na Sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
