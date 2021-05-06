import React, { useContext } from "react";
import Person from "./Person";
import { personglobalContext } from "../../../context/Provider/PersonProvider";

import "./Styles.css";

const Followers = ({ person }) => {
  const { personinfo } = useContext(personglobalContext);

  const followers = personinfo.filter((p) =>
    p.followings.find((e) => e._id === person._id)
  );

  return (
    <div>
      {followers.length > 0 ? (
        followers.map((follower, index) => (
          <Person person={follower} key={index} />
        ))
      ) : (
        <div className="cellframe">No followers</div>
      )}
    </div>
  );
};

export default Followers;
