import React, { useContext } from "react";
import QuestionCell from "../../QuestionCell/QuestionCell";
import { questionglobalContext } from "../../../context/Provider/QuestionProvider";

import "./Styles.css";

const Followquestions = ({ personid }) => {
  const { questioninfo } = useContext(questionglobalContext);

  const followquestions = questioninfo.filter((question) =>
    question.follow.includes(personid)
  );

  return (
    <div>
      {followquestions.length > 0 ? (
        followquestions
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((question, index) => (
            <QuestionCell question={question} key={index} />
          ))
      ) : (
        <div className="cellframe">No follow questions</div>
      )}
    </div>
  );
};

export default Followquestions;
