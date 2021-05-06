import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { personglobalContext } from "../../context/Provider/PersonProvider";
import { answerglobalContext } from "../../context/Provider/AnswerProvider";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";
import { commentglobalContext } from "../../context/Provider/CommentProvider";

import { getAllforPerson } from "../../action/person";
import ProfileNav from "./ProfileNav/ProfileNav";

import "./Styles.css";

const Profile = () => {
  const { personid } = useParams();

  const { personinfo, persondispatch } = useContext(personglobalContext);
  const { answerdispatch } = useContext(answerglobalContext);
  const { questiondispatch } = useContext(questionglobalContext);
  const { commentdispatch } = useContext(commentglobalContext);

  const person = personinfo.find((p) => p._id == personid);
  console.log("personinfo:", personinfo);
  console.log("personid:", personid);

  useEffect(() => {
    getAllforPerson(
      personid,
      answerdispatch,
      questiondispatch,
      persondispatch,
      commentdispatch
    );
  }, []);

  return (
    <div>
      {person ? (
        <ProfileNav person={person} personid={personid} />
      ) : (
        <div className="cellframe singlecell">Loading...</div>
      )}
    </div>
  );
};

export default Profile;
