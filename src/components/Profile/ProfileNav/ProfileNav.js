import React, { useEffect, useState } from "react";
import Myquestions from "./Myquestions";
import Myanswers from "./Myanswers";
import Followquestions from "./Followquestions";
import Likeanswers from "./Likeanswers";
import Followers from "./Followers";
import Following from "./Following";
import ProfilePerson from "./ProfilePerson";

import "./Styles.css";

const ProfileNav = ({ person, personid }) => {
  const [flag, setFlag] = useState({
    myquestions: true,
    myanswers: false,
    followquestions: false,
    likeanswers: false,
    followers: false,
    following: false,
  });

  const initalFlag = {
    myquestions: false,
    myanswers: false,
    followquestions: false,
    likeanswers: false,
    followers: false,
    following: false,
  };

  useEffect(() => {
    setFlag({ ...initalFlag, myquestions: true });
  }, [personid]);

  return (
    <div>
      <div className="cellframe">
        <ProfilePerson personid={personid} person={person} />
        <div className="profilebtng">
          <button
            className={flag.myquestions ? "profilebtn active" : "profilebtn"}
            onClick={() => setFlag({ ...initalFlag, myquestions: true })}
          >
            questions
          </button>

          <button
            className={flag.myanswers ? "profilebtn active" : "profilebtn"}
            onClick={() => setFlag({ ...initalFlag, myanswers: true })}
          >
            answers
          </button>

          <button
            className={
              flag.followquestions ? "profilebtn active" : "profilebtn"
            }
            onClick={() => setFlag({ ...initalFlag, followquestions: true })}
          >
            follow questions
          </button>

          <button
            className={flag.likeanswers ? "profilebtn active" : "profilebtn"}
            onClick={() => setFlag({ ...initalFlag, likeanswers: true })}
          >
            like answers
          </button>

          <button
            className={flag.followers ? "profilebtn active" : "profilebtn"}
            onClick={() => setFlag({ ...initalFlag, followers: true })}
          >
            followers
          </button>

          <button
            className={flag.following ? "profilebtn active" : "profilebtn"}
            onClick={() => setFlag({ ...initalFlag, following: true })}
          >
            following
          </button>
        </div>
      </div>
      {person && (
        <div>
          {flag.myquestions && <Myquestions personid={personid} />}
          {flag.myanswers && <Myanswers personid={personid} />}
          {flag.followquestions && <Followquestions personid={personid} />}
          {flag.likeanswers && <Likeanswers personid={personid} />}
          {flag.followers && <Followers person={person} />}
          {flag.following && <Following person={person} />}
        </div>
      )}
    </div>
  );
};

export default ProfileNav;
