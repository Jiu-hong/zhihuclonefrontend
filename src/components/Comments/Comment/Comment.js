import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  createComment,
  likeComment,
  updateComment,
  deleteComment,
} from "../../../action/comment";
import { commentglobalContext } from "../../../context/Provider/CommentProvider";
import { userglobalContext } from "../../../context/Provider/UserProvider";

import AutoHeightTextarea from "../../AutoHeightTextarea/AutoHeightTextarea";
import "./Styles.css";

const Comment = ({ comment }) => {
  const [commentContent, setCommentContent] = useState("");
  const [commentUpdContent, setCommentUpdContent] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const { commentdispatch } = useContext(commentglobalContext);
  const { userinfo, userdispatch } = useContext(userglobalContext);
  const [reply, setReply] = useState(false);

  const createcomment = async (e) => {
    e.preventDefault(e);

    if (!commentContent) return;
    // postid, postData, commentdispatch
    const success = await createComment(
      comment.postid,
      { parentid: comment._id, content: commentContent, like: [] },
      commentdispatch,
      userdispatch
    );

    if (success) {
      setCommentContent("");
      setReply(false);
    }
  };

  const deletecomment = async () => {
    // commentid, commentdispatch
    await deleteComment(comment._id, commentdispatch, userdispatch);
  };

  const likecomment = async () => {
    // commentid, commentdispatch
    await likeComment(comment._id, commentdispatch, userdispatch);
  };

  const updatecomment = async () => {
    // e.preventDefault();

    if (!commentUpdContent) return;

    const success = await updateComment(
      comment._id,
      { content: commentUpdContent },
      commentdispatch,
      userdispatch
    );

    if (success) {
      setCommentUpdContent("");
      setIsUpdate(false);
    }
  };

  return (
    <div className="cmtframe">
      <Link to={`/profile/${comment.creator._id}`} className="sqlink">
        <div className="creator">creator: {comment.creator.name}</div>
      </Link>
      <div className="creator creatordescription">
        creator description: {comment.creator.description}
      </div>
      {isUpdate ? (
        <div className="cellcontent">
          <AutoHeightTextarea
            defaultValue={comment.content}
            content={commentUpdContent}
            setContent={setCommentUpdContent}
          />

          <div className="navquestionbtng">
            <button onClick={updatecomment}>submit</button>
            <button
              onClick={() => {
                // setCommentUpdContent("");
                setIsUpdate(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="cmtcontent cellcontent"> {comment.content}</div>
          <div className="acqeditg">
            {userinfo && userinfo._id === comment.creator._id && (
              <>
                <button
                  className="acqedit"
                  onClick={() => setIsUpdate((prev) => !prev)}
                >
                  update
                </button>
                <button className="acqedit" onClick={deletecomment}>
                  delete
                </button>
              </>
            )}
          </div>
        </>
      )}

      <button
        onClick={() => setReply((prev) => !prev)}
        disabled={!userinfo}
        className="replybutton"
      >
        reply
      </button>
      <button
        onClick={likecomment}
        disabled={!userinfo}
        className={
          comment?.like?.find((a) => a === userinfo?._id)
            ? "likebutton likeactive"
            : "likebutton"
        }
      >
        like {comment.like.length}
      </button>

      <div className="cmtinput">
        {reply && (
          <form onSubmit={createcomment}>
            <textarea
              // rows="3"
              placeholder={`reply to ${comment.creator.name}`}
              onChange={(e) => setCommentContent(() => e.target.value)}
              value={commentContent}
            />

            <div className="navquestionbtng">
              <button>submit</button>
              <button
                onClick={() => {
                  setCommentContent("");
                  setReply(false);
                }}
              >
                cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Comment;
