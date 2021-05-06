import React, { useEffect, useContext } from "react";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";

import { getQuestions } from "../../action/question";

import QuestionCell from "../QuestionCell/QuestionCell";

import "./Styles.css";

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
      {questioninfo.length > 0 ? (
        questioninfo
          .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
          .map((question, index) => (
            <QuestionCell question={question} key={index} />
          ))
      ) : (
        <div className="cellframe singlecell"> Loading...</div>
      )}
    </div>
  );
};

export default Questions;
