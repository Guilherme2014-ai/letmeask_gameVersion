/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import React from "react";
import { useParams } from "react-router-dom";
import { idUniqueV2 } from "id-unique-protocol";

// Libs
import { remove, update } from "firebase/database";

// Assets
import logoImage from "../assets/images/logo.svg";
import emptyQuestions from "../assets/images/empty-questions.svg";

// Hooks
import { useRoom } from "../hooks/useRoom";

// Component
import { Button } from "../components/Button";
import { CodeCopyComponent } from "../components/CodeCopyComponent";
import { QuestionComponent } from "../components/QuestionComponent";

// interfaces
type roomParams = { id: string };
import { IQuestionQuery } from "../interfaces/IQuestion";

// CSS
import "./styles/Room.scss";

export function AdminRoom() {
  const { id: roomId } = useParams<roomParams>();
  const { roomData, references } = useRoom(roomId);
  const { getQuestionReference, roomReference } = references;

  // Função presente sómente na pagina de ADM
  async function deleteLikeClickEventFunc(
    e: React.MouseEvent,
    questionID: string,
  ) {
    const questionReference = getQuestionReference(questionID);
    const deleteMessage = window.confirm(
      "Tem certeza que você deseja excluir esta pergunta?",
    );

    if (deleteMessage) await remove(questionReference);
  }
  async function setAnswerQuestion(questionID: string) {
    try {
      const questionReference = references.getQuestionReference(questionID);
      await update(questionReference, {
        isAnswered: true,
      });
    } catch (e) {
      console.error(e);
    }
  }
  async function setHighlightQuestion(questionID: string) {
    try {
      const questionReference = references.getQuestionReference(questionID);
      await update(questionReference, {
        isHighlighted: true,
      });
    } catch (e) {
      console.error(e);
    }
  }
  async function closeRoomHanldler() {
    try {
      await update(roomReference, {
        closedAt: new Date(),
      });
    } catch (e) {
      console.error("Something went wrong !");
    }
  }

  return (
    <section>
      <nav>
        <div>
          <img src={logoImage} alt="icon" />
        </div>
        <div>
          <div className="roomActions">
            <CodeCopyComponent code={roomId as string} />
            <Button
              backgroundColor="#835AFD"
              color="#835AFD"
              events={{
                onClick: async () => await closeRoomHanldler(),
              }}
              isOutlined
            >
              Fechar Sala
            </Button>
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
          </div>
          <div className="mainRoom__container__questions">
            {roomData && roomData.questions.length != 0 ? (
              roomData.questions.map((question: IQuestionQuery) => {
                return (
                  <div key={idUniqueV2()}>
                    <QuestionComponent
                      author={question.author}
                      adminPage
                      likesMount={0}
                      isAnswered={question.isAnswered}
                      isHighlighted={question.isHighlighted}
                      setAnswerQuestionClickEventFunc={() =>
                        setAnswerQuestion(question.id)
                      }
                      setHighlightQuestion={() =>
                        setHighlightQuestion(question.id)
                      }
                      deleteLikeClickEventFunc={(e) =>
                        deleteLikeClickEventFunc(e, question.id as string)
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

/*
{roomData && roomData.questions.length != 0 ? (
              roomData.questions.map((question: IQuestion) => {
                return <h1>{question.content}</h1>;
              })
            ) : (
              <h1>nada</h1>
            )}
*/
