/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import React, { ChangeEvent, Dispatch } from "react";
import { useParams } from "react-router-dom";
// Assets
import logoImage from "../assets/images/logo.svg";
import emptyQuestions from "../assets/images/empty-questions.svg";

// Hooks
import { useRoom } from "../hooks/useRoom";

// Component
import Avatar from "@mui/material/Avatar";
import { Button } from "../components/Button";
import { QuestionComponent } from "../components/QuestionComponent";
import { CodeCopyComponent } from "../components/CodeCopyComponent";

// interfaces
type roomParams = { id: string };
import { IQuestionQuery } from "../interfaces/IQuestion";

// CSS
import "./styles/Room.scss";

export function Room() {
  const { id: roomId } = useParams<roomParams>();
  const {
    userState,
    questionInputState,
    roomData,
    databaseIterractionsFuncs,
    auth,
  } = useRoom(roomId);

  const { signInWithGoogle } = auth;
  const [questionInputUntyped, setQuestionInputUntyped] = questionInputState;

  const questionInput = questionInputUntyped as string;
  const setQuestionInput = setQuestionInputUntyped as Dispatch<string>;

  const { likeQuestionHandler, sendQuestionHandler } =
    databaseIterractionsFuncs;

  function questionChagerHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    setQuestionInput(value);
  }

  return (
    <section>
      <nav>
        <div>
          <img src={logoImage} alt="icon" />
        </div>
        <div>
          <div>
            <CodeCopyComponent code={roomId as string} />
          </div>
        </div>
      </nav>
      <div className="mainRoom">
        <div className="mainRoom__container">
          <div>
            <div className="mainRoom__containerTitle">
              <h2>{roomData ? roomData.title : "Carregando.."}</h2>
              {roomData && roomData.questions.length > 0 && (
                <span>{roomData.questions.length} Perguntas</span>
              )}
            </div>
            <div className="mainRoom__container__questionTextArea">
              <textarea
                name="question"
                id="question"
                rows={10}
                placeholder="Oque voçe quer perguntar ?"
                onChange={questionChagerHandler}
                value={questionInput}
              />
              <br />
              <br />
              <div className="mainRoom__container__questionTextArea__ButtonArea">
                {userState ? (
                  <div className="mainRoom__container__questionTextArea__ButtonArea__userInfo">
                    {userState ? (
                      <>
                        <Avatar alt="Remy Sharp" src={userState.avatar} />
                        <span>{userState.name}</span>
                      </>
                    ) : (
                      <h2>Carregando usuário</h2>
                    )}
                  </div>
                ) : (
                  <span>
                    Para enviar uma pergunta,
                    <b onClick={signInWithGoogle}>faça seu login</b>.
                    <br />
                  </span>
                )}

                <Button
                  color="white"
                  backgroundColor="#835AFD"
                  events={{
                    onClick: sendQuestionHandler,
                  }}
                >
                  Enviar Pergunta
                </Button>
              </div>
            </div>
          </div>
          <div className="mainRoom__container__questions">
            {roomData && roomData.questions.length != 0 ? (
              roomData.questions.map((question: IQuestionQuery) => {
                const hasLikes = question.likes;
                const likes = hasLikes ? Object.values(question.likes) : [];

                const currentUserLike = likes.find(
                  (like) => like.userID === userState?.id,
                );

                const likedByCurrentUser =
                  currentUserLike != undefined || false;

                return (
                  <div key={question.id}>
                    <QuestionComponent
                      author={question.author}
                      likesMount={likes.length}
                      likedByCurrentUser={likedByCurrentUser}
                      likeClickEventFunc={(e) =>
                        likeQuestionHandler(
                          e,
                          likedByCurrentUser,
                          question.id as string,
                        )
                      }
                    >
                      {question.content}
                    </QuestionComponent>
                  </div>
                );
              })
            ) : (
              <div className="mainRoom__container__noQuestionImageArea">
                <img src={emptyQuestions} alt="no questions" />
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
    </section>
  );
}
