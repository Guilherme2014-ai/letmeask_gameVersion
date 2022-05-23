/* eslint-disable @typescript-eslint/no-explicit-any */
// Dependencies
import React from "react";

// Assets
import deleteSVG from "../assets/images/delete.svg";
import answerSVG from "../assets/images/answer.svg";
import checkSVG from "../assets/images/check.svg";
import likeSVG from "../assets/images/like.svg";

// Components
import { Avatar } from "@mui/material";

// CSS
import "./style/QuestionComponent.scss";

export function QuestionComponent({
  children,
  author,
  adminPage = false,
  likesMount,
  likedByCurrentUser = false,
  isHighlighted = false,
  isAnswered = false,
  deleteLikeClickEventFunc,
  setAnswerQuestionClickEventFunc,
  setHighlightQuestion,
  likeClickEventFunc,
}: {
  children: any;
  author: { name: string; avatar: string };
  likesMount: number;
  adminPage?: boolean;
  likedByCurrentUser?: boolean;
  isAnswered?: boolean;
  isHighlighted?: boolean; // #835AFD
  setAnswerQuestionClickEventFunc?: (
    e: React.MouseEvent,
    ...params: any
  ) => void;
  setHighlightQuestion?: (e: React.MouseEvent, ...params: any) => void;
  likeClickEventFunc?: (e: React.MouseEvent, ...params: any) => void;
  deleteLikeClickEventFunc?: (e: React.MouseEvent, ...params: any) => void;
}) {
  // -webkit-mask: url(logo.svg) no-repeat center;
  // mask: url(logo.svg) no-repeat center;

  function classNameHandler() {
    if (isHighlighted || isAnswered) {
      if (isHighlighted && isAnswered) return " --isAnswered";

      return isAnswered ? " --isAnswered" : " --isHighlighted";
    }
    return "";
  }

  return (
    <div className="question">
      <div className={`questionArea${classNameHandler()}`}>
        <p>{children}</p>
        <div className="questionArea__footerInfos">
          <div className="questionArea__userInfo">
            <Avatar alt="Remy Sharp" src={author.avatar} />
            <span>{author.name}</span>
          </div>
          {adminPage ? (
            <div className="questionArea__adminOptionsArea">
              <div>
                <img
                  src={checkSVG}
                  alt="answered"
                  onClick={setAnswerQuestionClickEventFunc}
                />
              </div>
              <div>
                <img
                  src={answerSVG}
                  alt="highlight"
                  onClick={setHighlightQuestion}
                />
              </div>
              <div onClick={deleteLikeClickEventFunc}>
                <img src={deleteSVG} alt="delete" />
              </div>
            </div>
          ) : (
            <div className="questionArea__likeArea">
              <span>{likesMount}</span>
              <div
                className="questionArea__likeArea__logo"
                onClick={likeClickEventFunc}
                style={{
                  backgroundColor: likedByCurrentUser
                    ? "chartreuse"
                    : "#737380",
                  WebkitMask: `url(${likeSVG})`,
                  mask: `url(${likeSVG}) no-repeat center`,
                  width: "24px",
                  height: "24px",
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
