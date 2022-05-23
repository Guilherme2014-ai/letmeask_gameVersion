// Dependencies
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Modules
import { Room } from "../modules/Room";

// Interfaces
import { IRoom } from "../interfaces/IRoomInsert";

// Context
import { GetAuthContext } from "../context/AuthContext";

// Components
import { Button } from "../components/Button";

// Assets
import ilustratorImage from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";

// CSS
import "./styles/pageAuth.scss";

export function NewRoom() {
  const navigate = useNavigate();
  const authContext = GetAuthContext();
  const [roomInput, setInputRoom] = useState("");

  function createRoomInputHandler(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputRoom(value);
  }

  async function createNewRoomHandler(event: MouseEvent<HTMLButtonElement>) {
    try {
      event.preventDefault();

      if (!authContext?.userState) {
        alert("Logar Primeiro !");
        navigate("/");
        return;
      }

      const userID = authContext?.userState?.id;

      const room = new Room();
      const roomData: IRoom = {
        authorID: userID,
        title: roomInput,
      };
      const createdRoom = await room.Create(roomData);

      const roomId = createdRoom.key;
      navigate(`/room/admin/${roomId}`);
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
          <h2>Crie uma nova Sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da Sala"
              onChange={(e) => createRoomInputHandler(e)}
            />
            <Button
              backgroundColor="chartreuse"
              events={{
                onClick: async (event) => await createNewRoomHandler(event),
              }}
            >
              Criar Sala
            </Button>
          </form>
          <span>
            Quer entrar em uma sala jã existente? <Link to="/">Entre Aqui</Link>
          </span>
        </div>
      </main>
    </div>
  );
}
