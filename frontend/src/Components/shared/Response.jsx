import React from "react";

const Response = ({ message, status }) => {
  return (
    <div
      role="alert"
      className={"alert " + (status ? "alert-success" : "alert-error")}
    >
      <span>{message}</span>
    </div>
  );
};

export default Response;
