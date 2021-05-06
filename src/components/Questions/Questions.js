import React, { useEffect, useContext } from "react";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";

import { getQuestions } from "../../action/question";

import QuestionCell from "../QuestionCell/QuestionCell";

const Questions = () => {
  const { questioninfo, questiondispatch } = useContext(questionglobalContext);

  useEffect(() => {
    const getall = async () => {
      await getQuestions(questiondispatch);
    };
    getall();
    // }, [JSON.stringify(questioninfo)]);
  }, []);

  return (
    <div>
      {questioninfo
        .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
        .map((question, index) => (
          <QuestionCell question={question} key={index} />
        ))}
    </div>
  );
};

export default Questions;
