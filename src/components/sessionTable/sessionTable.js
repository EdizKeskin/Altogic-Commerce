import React from "react";
import SessionItem from "./sessionItem";

function SessionsTable(props) {
  return (
    <>
      {props.sessions !== null ? (
        props.sessions.map((session) => {
          return <SessionItem session={session} key={session.token} />;
        })
      ) : (
        <p>There is no active session right now!</p>
      )}
    </>
  );
}

export default SessionsTable;
