import React from "react";

import AnswerCellwithQuestion from "../../AnswerCell/AnswerCellwithQuestion";

import "./Styles.css";

const Answer = ({ answer, person }) => {
  return (
    <>
      {person && (
        <div className="cellframe">
          <AnswerCellwithQuestion answer={answer} person={person} />
        </div>
      )}
    </>
  );
};

export default Answer;
