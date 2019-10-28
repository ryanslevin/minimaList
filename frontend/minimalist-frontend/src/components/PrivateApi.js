import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently, user } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const userId = user.sub.replace('|', "");

      const requestBody = JSON.stringify({
        userId: userId,
        description: "Make the post api work",
        isComplete: false
    })

      await fetch("http://localhost:8080/api/task", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: requestBody
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
    </>
  );
};

export default ExternalApi;