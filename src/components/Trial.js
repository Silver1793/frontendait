import { useEffect, useState } from "react";
import axios from "axios";

function Trial() {
  const [x, setX] = useState("");
  useEffect(() => {
    console.log("here");

    axios.get("http://localhost:6001/words").then(function (response) {
      setX(response.data);
    });
  }, []);
  return <div>{x}</div>;
}

export default Trial;
