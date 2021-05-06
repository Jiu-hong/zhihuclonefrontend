import React, { useContext } from "react";

import AnswerCellwithQuestion from "../../AnswerCell/AnswerCellwithQuestion";
import { answerglobalContext } from "../../../context/Provider/AnswerProvider";

import "./Styles.css";

const Myanswers = ({ personid }) => {
  const { answerinfo } = useContext(answerglobalContext);

  const ownanswers = answerinfo.filter(
    (answer) => answer.creator._id === personid
  );

  return (
    <div>
      {ownanswers.length > 0 ? (
        ownanswers
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((answer, index) => (
            <AnswerCellwithQuestion answer={answer} key={index} />
          ))
      ) : (
        <div className="cellframe">No answers</div>
      )}
    </div>
  );
};

export default Myanswers;
