import React, { useContext } from "react";
import QuestionCell from "../../QuestionCell/QuestionCell";

import { questionglobalContext } from "../../../context/Provider/QuestionProvider";

import "./Styles.css";

const Myquestions = ({ personid }) => {
  const { questioninfo } = useContext(questionglobalContext);

  const ownquestions = questioninfo.filter(
    (question) => question.creator._id === personid
  );

  return (
    <div>
      {ownquestions.length > 0 ? (
        ownquestions
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((question, index) => (
            <QuestionCell question={question} key={index} />
          ))
      ) : (
        <div className="cellframe">No asking questions</div>
      )}
    </div>
  );
};

export default Myquestions;
