import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { createAnswer } from "../../action/answer";
import {
  followQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../action/question";

import { answerglobalContext } from "../../context/Provider/AnswerProvider";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";

import { userglobalContext } from "../../context/Provider/UserProvider";
import Comments from "../Comments/Comments";
import AutoHeightTextarea from "../AutoHeightTextarea/AutoHeightTextarea";

import "./Styles.css";

const QuestionCell = ({ question }) => {
  const [isAnswer, setIsAnswer] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [readMore, setReadMore] = useState(true);

  const [aswcontent, setAswcontent] = useState("");
  const [qstcontent, setQstcontent] = useState("");

  const history = useHistory();

  const { answerdispatch } = useContext(answerglobalContext);
  const { questiondispatch } = useContext(questionglobalContext);

  const { userinfo, userdispatch } = useContext(userglobalContext);

  const switchAnswer = () => {
    setIsAnswer((prev) => !prev);
  };

  const createanswer = async () => {
    // e.preventDefault();

    if (!aswcontent) return;

    const success = await createAnswer(
      question._id,
      { content: aswcontent, topic: question.topic, like: [], anonymous },
      answerdispatch,
      userdispatch
    );

    if (success) {
      setAswcontent("");
      setIsAnswer(false);

      history.push(`/${question._id}`);
    }
  };

  const followquestion = async () => {
    await followQuestion(question._id, questiondispatch, userdispatch);
  };

  const updatequestion = async () => {
    // e.preventDefault();
    if (!qstcontent) return;

    const success = await updateQuestion(
      question._id,
      { content: qstcontent },
      questiondispatch,
      userdispatch
    );

    if (success) {
      setQstcontent("");
      setIsUpdate(false);
    }
  };

  const deletequestion = async () => {
    await deleteQuestion(question._id, questiondispatch, userdispatch);
  };

  const readMoreTemplate = (content) => {
    return (
      <div>
        {readMore ? (
          <div className="cellcontent">
            <Link to={`/${question._id}`} className="sqlink">
              {content.split(" ").length < 50 ? (
                <span>{content.substring(0, 400)} </span>
              ) : (
                <span>{content.split(" ").slice(0, 50).join(" ")} </span>
              )}
            </Link>

            <button
              className="readbtn"
              onClick={() => setReadMore((prev) => !prev)}
            >
              ... readmore
            </button>
          </div>
        ) : (
          <div className="cellcontent">
            <Link to={`/${question._id}`} className="sqlink">
              <span>{content} </span>
            </Link>
            <button
              className="readbtn"
              onClick={() => setReadMore((prev) => !prev)}
            >
              readless
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cellframe">
      {question ? (
        <div>
          <button
            onClick={followquestion}
            disabled={!userinfo}
            className={
              question?.follow?.find((a) => a === userinfo?._id)
                ? "followactive"
                : null
            }
          >
            <strong>
              {question.follow?.find((a) => a === userinfo?._id)
                ? `Following . ${question.follow.length}`
                : `Follow . ${question.follow.length}`}
            </strong>
          </button>
          <div className="cellcontent">
            {isUpdate ? (
              <>
                <AutoHeightTextarea
                  defaultValue={question.content}
                  content={qstcontent}
                  setContent={setQstcontent}
                />
                <div className="navquestionbtng">
                  <button onClick={() => setIsUpdate(false)}>cancel</button>
                  <button onClick={updatequestion}>submit</button>
                </div>
              </>
            ) : (
              <strong>
                {question.content.split(" ").length > 50 ||
                question.content.length > 500 ? (
                  readMoreTemplate(question.content)
                ) : (
                  <Link to={`/${question._id}`} className="sqlink">
                    {question.content}
                  </Link>
                )}
              </strong>
            )}
            <div className="acqeditg">
              {userinfo && userinfo._id === question.creator._id && (
                <>
                  <button
                    onClick={() => setIsUpdate((prev) => !prev)}
                    className="acqedit"
                  >
                    update
                  </button>
                  <button onClick={deletequestion} className="acqedit">
                    delete
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="qctopic">
            TOPIC:
            {question.topic?.map((t, index) => (
              <Link key={index} to={`/topic/${t._id}`} className="sqlink">
                <span>[{t.name}] </span>
              </Link>
            ))}
          </div>
          {question.anonymous ? (
            <div className="creator creatordescription">creator: Anonymous</div>
          ) : (
            <>
              <Link
                to={`/profile/${question.creator._id}`}
                className="creator sqlink"
              >
                creator name: <strong>{question.creator.name}</strong>
              </Link>
              <div className="creator creatordescription">
                creator description:{" "}
                <strong>{question.creator.description}</strong>
              </div>
            </>
          )}
          <button
            onClick={switchAnswer}
            disabled={!userinfo}
            className="answerbutton"
          >
            answer
          </button>

          <Comments postid={question._id} />
          {isAnswer && (
            <>
              <div className="cellcontent answerinquestion">
                <button
                  onClick={() => setAnonymous((prev) => !prev)}
                  className={anonymous ? "anonymousbtn active" : "anonymousbtn"}
                >
                  anonymous
                </button>
                <textarea
                  rows="5"
                  placeholder="enter answer..."
                  onChange={(e) => setAswcontent(e.target.value)}
                ></textarea>

                <div className="navquestionbtng">
                  <button onClick={switchAnswer}>cancel</button>
                  <button onClick={createanswer}>submit</button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>The question is not found</div>
      )}
    </div>
  );
};

export default QuestionCell;
