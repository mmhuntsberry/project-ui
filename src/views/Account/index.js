import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const Account = () => {
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const URL = "https://prisma-fe-dev-assignent.vercel.app/api/users";
  const [activeUser, setActiveUser] = useState(null);
  const { value, setValue } = useContext(UserContext);
  const [err, setErr] = useState(null);

  const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { "Content-type": "application/json" } : {},
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        return data;
      })
      .catch((err) => {
        console.log("HELLO ERR", err);
        setErr({ errorMessage: err.toString() });
      });
  };

  useEffect(() => {
    // sendHttpRequest("GET", PROXY + URL).then((data) => {
    //   if (data) {
    //     data.find((user) =>
    //       user.email === value.email ? setActiveUser(user) : null
    //     );
    //   }
    // });

    console.log("activeUser".toUpperCase(), activeUser);
  }, []);
  return <div>Hello, {activeUser && activeUser.name}</div>;
};

export default Account;
