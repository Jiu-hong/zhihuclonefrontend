import React, { useContext } from "react";
import Person from "./Person";
import { personglobalContext } from "../../../context/Provider/PersonProvider";

import "./Styles.css";

const Following = ({ person }) => {
  const { personinfo } = useContext(personglobalContext);

  const followings = personinfo.filter((p) =>
    p.followers.find((e) => e._id === person._id)
  );
  return (
    <div>
      {followings.length > 0 ? (
        followings.map((following, index) => (
          <Person person={following} key={index} />
        ))
      ) : (
        <div className="cellframe">No followings</div>
      )}
    </div>
  );
};

export default Following;
