import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { topicglobalContext } from "../../context/Provider/TopicProvider";
import { answerglobalContext } from "../../context/Provider/AnswerProvider";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";
import { personglobalContext } from "../../context/Provider/PersonProvider";
import { commentglobalContext } from "../../context/Provider/CommentProvider";

import { getQAsbyTopic } from "../../action/qasbytopic";
import AnswerCellwithQuestion from "../../components/AnswerCell/AnswerCellwithQuestion";
import QuestionCell from "../../components/QuestionCell/QuestionCell";

import "./Styles.css";

const Topic = () => {
  const { topicid } = useParams();
  const [isAnswer, setIsAnswer] = useState(true);
  const { topicinfo } = useContext(topicglobalContext);
  const {
    answerinfo,

    answerdispatch,
  } = useContext(answerglobalContext);
  const {
    questioninfo,

    questiondispatch,
  } = useContext(questionglobalContext);

  const { persondispatch } = useContext(personglobalContext);

  const { commentdispatch } = useContext(commentglobalContext);

  const topic = topicinfo.find((f) => f._id === topicid);

  useEffect(() => {
    getQAsbyTopic(
      topicid,
      answerdispatch,
      questiondispatch,
      persondispatch,
      commentdispatch
    );
  }, [topicid]);

  return (
    <div>
      {topic && (
        <div className="cellframe ">
          <div className="topictext">{topic.name}</div>
          <div className="topictext">{topic.description}</div>
          <div className="topicbtng">
            <button
              onClick={() => setIsAnswer(true)}
              className={isAnswer ? "topicbtn active" : "topicbtn"}
            >
              answers
            </button>
            <button
              onClick={() => setIsAnswer(false)}
              className={!isAnswer ? "topicbtn active" : "topicbtn"}
            >
              questions
            </button>
          </div>
        </div>
      )}

      {isAnswer &&
        answerinfo
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((answer, index) => (
            <AnswerCellwithQuestion answer={answer} key={index} />
          ))}
      {!isAnswer &&
        questioninfo
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((question, index) => (
            <QuestionCell question={question} key={index} />
          ))}
    </div>
  );
};

export default Topic;
