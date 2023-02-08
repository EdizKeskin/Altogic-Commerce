import React from "react";
import { FormattedMessage } from "react-intl";
import SessionItem from "./SessionItem";

function SessionsTable(props) {
  return (
    <>
      {props.sessions !== null ? (
        props.sessions.map((session) => {
          return <SessionItem session={session} key={session.token} />;
        })
      ) : (
        <p>
          <FormattedMessage id="no_sessions" />
        </p>
      )}
    </>
  );
}

export default SessionsTable;
