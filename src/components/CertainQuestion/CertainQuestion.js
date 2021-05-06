import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { getQuestionAndAnswers } from "../../action/qandas";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";
import { answerglobalContext } from "../../context/Provider/AnswerProvider";
import { personglobalContext } from "../../context/Provider/PersonProvider";
import { commentglobalContext } from "../../context/Provider/CommentProvider";

import AnswerCell from "../AnswerCell/AnswerCell";

import QuestionCell from "../QuestionCell/QuestionCell";

import "./Styles.css";

const CertainQuestion = () => {
  const { questionid } = useParams();

  const { questioninfo, questiondispatch } = useContext(questionglobalContext);
  const { answerinfo, answerdispatch } = useContext(answerglobalContext);

  const { persondispatch } = useContext(personglobalContext);
  const { commentdispatch } = useContext(commentglobalContext);

  useEffect(() => {
    getQuestionAndAnswers(
      questionid,
      answerdispatch,
      questiondispatch,
      persondispatch,
      commentdispatch
    );
  }, [questionid]);

  const certainquestion = questioninfo.filter(
    (question) => question._id === questionid
  );

  return (
    <div>
      <div>
        {certainquestion.length === 1 &&
          certainquestion.map((question) => (
            <QuestionCell question={question} key={question?._id} />
          ))}
      </div>
      <br />
      <div className="cellframe answercount">
        {answerinfo.length} answer(s) for this question.
      </div>
      {certainquestion.length === 1 &&
        answerinfo.length > 0 &&
        answerinfo
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((answer) => <AnswerCell answer={answer} key={answer._id} />)}
    </div>
  );
};

export default CertainQuestion;
