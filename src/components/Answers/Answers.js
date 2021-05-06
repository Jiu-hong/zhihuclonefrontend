import React, { useEffect, useContext } from "react";
import AnswerCellwithQuestion from "../AnswerCell/AnswerCellwithQuestion";

import { answerglobalContext } from "../../context/Provider/AnswerProvider";
import { personglobalContext } from "../../context/Provider/PersonProvider";
import { commentglobalContext } from "../../context/Provider/CommentProvider";

import { getAnswersWithCreatorsComments } from "../../action/answer";

const Answers = () => {
  const { answerinfo, answerdispatch } = useContext(answerglobalContext);
  const { persondispatch } = useContext(personglobalContext);
  const { commentdispatch } = useContext(commentglobalContext);

  useEffect(() => {
    const getall = async () => {
      await getAnswersWithCreatorsComments(
        answerdispatch,
        persondispatch,
        commentdispatch
      );
    };

    getall();
  }, []);

  return (
    <div>
      {answerinfo.length > 0 &&
        answerinfo
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((answer) => {
            return <AnswerCellwithQuestion answer={answer} key={answer._id} />;
          })}
    </div>
  );
};

export default Answers;
