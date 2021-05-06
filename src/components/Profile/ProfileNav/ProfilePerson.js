import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { personglobalContext } from "../../../context/Provider/PersonProvider";
import { userglobalContext } from "../../../context/Provider/UserProvider";
import { followUser } from "../../../action/user";

import "./Styles.css";

const ProfilePerson = ({ person }) => {
  const { persondispatch } = useContext(personglobalContext);

  const { userinfo, userdispatch } = useContext(userglobalContext);

  const followuser = async () => {
    await followUser({ followid: person._id }, persondispatch, userdispatch);
  };

  return (
    <div className="profile">
      <div>PROFILE</div>
      <Link className="creator sqlink" to={`/profile/${person._id}`}>
        name: {person.name}
      </Link>

      <button
        disabled={!userinfo}
        className={
          person.followers?.find((a) => a._id === userinfo?._id)
            ? "followactive"
            : null
        }
        onClick={followuser}
      >
        <strong>
          {" "}
          {person.followers?.find((a) => a._id === userinfo?._id)
            ? "Following"
            : "Follow"}
        </strong>
      </button>
      <div className="creator ">description: {person.description}</div>
    </div>
  );
};

export default ProfilePerson;
