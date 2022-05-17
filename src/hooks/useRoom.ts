// Reutilizando Código

/* eslint-disable @typescript-eslint/no-unused-vars */

// Dependencies
import {
  DataSnapshot,
  onValue,
  push,
  query,
  ref,
  remove,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAuthContext } from "../context/AuthContext";
import { IGetAuthContextType } from "../interfaces/IGetAuthContextType";
import { IQuestionInsert } from "../interfaces/IQuestion";
import { IRoomQuery } from "../interfaces/IRoomQuery";
import { database } from "../libs/firebase";

export function useRoom(roomId: string | undefined) {
  const { userState, signInWithGoogle } =
    GetAuthContext() as IGetAuthContextType;
  const [stringfiedRoomData, setStringfiedRoomData] = useState("");

  const [questionInput, setQuestionInput] = useState<string>("");

  const navigate = useNavigate();

  const questionsRoomReference = ref(database, `rooms/${roomId}/questions`);
  const roomReference = ref(database, `rooms/${roomId}`);
  const getQuestionReference = (questionID: string) =>
    ref(database, `rooms/${roomId}/questions/${questionID}`);
  const getLikeReference = (questionID: string) =>
    ref(database, `rooms/${roomId}/questions/${questionID}/likes`);

  useEffect(() => {
    const unsubscribe = setRoomData();

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  const question: IQuestionInsert = {
    author: {
      name: userState?.name as string,
      avatar: userState?.avatar as string,
    },
    content: questionInput,
    isHighlighted: false,
    isAnswered: false,
  };

  function setRoomData() {
    const queryTest = query(roomReference);

    // Listener realtime de informações
    return onValue(queryTest, (snapshot) => {
      userQuickerHandler(snapshot);
      const questionsSnapshot: IRoomQuery = snapshot.val();

      const parsedQuestions = Object.entries(questionsSnapshot.questions).map(
        (entrie) => {
          const [key, value] = entrie;
          value.id = key;
          return value;
        },
      );

      questionsSnapshot.questions = parsedQuestions;

      setStringfiedRoomData(JSON.stringify(questionsSnapshot));
    });
  }

  async function sendQuestionHandler() {
    if (questionInput.trim() == "") {
      console.error("O Campo não pode ser vazio.");
      return;
    }
    if (!userState) {
      console.error("Você precisa estar logado.");
      return;
    }

    setQuestionInput("");

    await push(questionsRoomReference, question);
  }
  async function likeQuestionHandler(
    e: React.MouseEvent,
    likedByCurrentUser: boolean,
    key: string,
  ): Promise<void | undefined> {
    const likeReference = getLikeReference(key);

    if (!likedByCurrentUser) {
      await push(likeReference, {
        userID: userState?.id,
      });
    } else {
      await remove(likeReference);
    }
  }
  function userQuickerHandler(roomSnapshot: DataSnapshot) {
    const closed = roomSnapshot.child("closedAt").exists();

    if (closed) {
      alert("The room was closed !");
      navigate("/");
    }
  }

  const roomData: IRoomQuery =
    JSON.parse(stringfiedRoomData || "[]").length != 0
      ? JSON.parse(stringfiedRoomData || "[]")
      : null;

  return {
    references: {
      roomReference,
      getQuestionReference,
    },
    databaseIterractionsFuncs: {
      sendQuestionHandler,
      likeQuestionHandler,
    },
    auth: {
      signInWithGoogle,
    },
    questionInputState: [questionInput, setQuestionInput],
    roomData,
    userState,
  };
}
