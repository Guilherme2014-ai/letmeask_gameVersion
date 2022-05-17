// Dependencies
import React from "react";

// Assets
import copyImg from "../assets/images/copy.svg";

// CSS
import "./style/CodeCopy.scss";

export function CodeCopyComponent({ code }: { code: string }) {
  function copyCodeHandler() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="codeCopy" onClick={copyCodeHandler}>
      <div>
        <img src={copyImg} alt="copySVG" />
      </div>
      <span>Sala: {code}</span>
    </button>
  );
}
