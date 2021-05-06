import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteAnswer, updateAnswer, likeAnswer } from "../../action/answer";
import { followPerson } from "../../action/person";

import { answerglobalContext } from "../../context/Provider/AnswerProvider";
import { userglobalContext } from "../../context/Provider/UserProvider";
import { personglobalContext } from "../../context/Provider/PersonProvider";

import Comments from "../Comments/Comments";
import AutoHeightTextarea from "../AutoHeightTextarea/AutoHeightTextarea";

import "./Styles.css";

const AnswerCell = ({ answer }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [aswcontent, setAswcontent] = useState("");
  const [readMore, setReadMore] = useState(true);

  const { answerdispatch } = useContext(answerglobalContext);

  const { userinfo, userdispatch } = useContext(userglobalContext);

  const { personinfo, persondispatch } = useContext(personglobalContext);

  const person = personinfo.find((p) => p._id === answer.creator._id);

  const switchUpdate = () => {
    setIsUpdate((prev) => !prev);
  };

  const updateanswer = async () => {
    if (!aswcontent) return;

    const success = await updateAnswer(
      answer._id,
      { content: aswcontent },
      answerdispatch,
      userdispatch
    );

    if (success) {
      setAswcontent("");
      setIsUpdate(false);
    }
  };

  const likeanswer = async () => {
    await likeAnswer(answer._id, answerdispatch, userdispatch);
  };

  const deleteanswer = async () => {
    //deleteAnser = async (answerid, answerdispatch)
    await deleteAnswer(answer._id, answerdispatch, userdispatch);
  };

  const followperson = async () => {
    await followPerson(
      { followid: answer.creator._id },
      persondispatch,
      userdispatch
    );
  };

  const readMoreTemplate = (content) => {
    return (
      <div>
        {readMore ? (
          <div className="cellcontent">
            {content.split(" ").length < 50 ? (
              <span>{content.substring(0, 400)} </span>
            ) : (
              <span>{content.split(" ").slice(0, 50).join(" ")} </span>
            )}
            <button
              className="readbtn"
              onClick={() => setReadMore((prev) => !prev)}
            >
              ... read more
            </button>
          </div>
        ) : (
          <div className="cellcontent">
            <span>{content} </span>
            <button
              className="readbtn"
              onClick={() => setReadMore((prev) => !prev)}
            >
              read less
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {person && (
        <div className="cellframe">
          <div className="acframe">
            {answer.anonymous ? (
              <div className="creator creatordescription">
                creator: Anonymous
              </div>
            ) : (
              <>
                <div>
                  <Link
                    to={`/profile/${answer.creator._id}`}
                    className="creator sqlink"
                  >
                    creator:{answer.creator.name}
                  </Link>

                  {userinfo && userinfo._id !== answer.creator._id && (
                    <button
                      onClick={followperson}
                      disabled={!userinfo}
                      className={
                        person.followers?.find((a) => a._id === userinfo?._id)
                          ? "followactive"
                          : null
                      }
                    >
                      <strong>
                        {" "}
                        {person.followers?.find((a) => a._id === userinfo?._id)
                          ? "Following"
                          : "Follow"}
                      </strong>
                    </button>
                  )}
                </div>
                <div className="creator creatordescription">
                  creator description:{answer.creator.description}
                </div>
              </>
            )}

            {isUpdate ? (
              <div className="cellcontent">
                <AutoHeightTextarea
                  defaultValue={answer.content}
                  content={aswcontent}
                  setContent={setAswcontent}
                />
                <div className="navquestionbtng">
                  <button onClick={switchUpdate}>cancel</button>
                  <button onClick={updateanswer}>submit</button>
                </div>
              </div>
            ) : answer.content.split(" ").length > 50 ||
              answer.content.length > 500 ? (
              readMoreTemplate(answer.content)
            ) : (
              <div className="cellcontent"> {answer.content}</div>
            )}

            <div className="acqeditg">
              {userinfo && userinfo._id === answer.creator._id && (
                <>
                  <button onClick={switchUpdate} className="acqedit">
                    update
                  </button>
                  <button onClick={deleteanswer} className="acqedit">
                    delete
                  </button>
                </>
              )}
            </div>

            <button
              onClick={likeanswer}
              disabled={!userinfo}
              className={
                answer?.like?.find((a) => a === userinfo?._id)
                  ? "likebutton likeactive"
                  : "likebutton"
              }
            >
              like {answer.like.length}
            </button>

            <Comments postid={answer._id} />
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerCell;
