import React, { useContext } from "react";

import AnswerCellwithQuestion from "../../AnswerCell/AnswerCellwithQuestion";

import { answerglobalContext } from "../../../context/Provider/AnswerProvider";

import "./Styles.css";

const Likeanswers = ({ personid }) => {
  const { answerinfo } = useContext(answerglobalContext);

  const likeanswers = answerinfo.filter((answer) =>
    answer.like.includes(personid)
  );

  return (
    <div>
      {likeanswers.length > 0 ? (
        likeanswers
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((answer, index) => (
            <AnswerCellwithQuestion answer={answer} key={index} />
          ))
      ) : (
        <div className="cellframe">No like answers</div>
      )}
    </div>
  );
};

export default Likeanswers;
