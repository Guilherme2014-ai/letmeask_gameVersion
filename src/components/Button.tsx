/* eslint-disable @typescript-eslint/no-explicit-any */
// Dependencies
import React, { ButtonHTMLAttributes } from "react";

// CSS
import "./style/Button.scss";

export function Button({
  id,
  color,
  backgroundColor,
  padding,
  children,
  events,
  isOutlined = false,
}: {
  color?: string;
  backgroundColor?: string;
  children?: any;
  padding?: string;
  id?: string;
  events?: ButtonHTMLAttributes<HTMLButtonElement>;
  isOutlined?: boolean;
}) {
  const preStyle = () => {
    if (isOutlined)
      return {
        border: `1px solid ${backgroundColor}`,
        backgroundColor: "#FFF",
      };

    return {
      border: "none",
      backgroundColor: `${backgroundColor}`,
    };
  };

  return (
    <button
      id={id}
      className="button"
      {...events}
      style={{
        cursor: "pointer",
        color: color || "white",
        padding: padding || "12px",
        ...preStyle(),
      }}
    >
      {children}
    </button>
  );
}
