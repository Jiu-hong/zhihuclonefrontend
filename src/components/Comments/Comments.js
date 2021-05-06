import React, { useContext, useState } from "react";
import { createComment } from "../../action/comment";
import { commentglobalContext } from "../../context/Provider/CommentProvider";
import { userglobalContext } from "../../context/Provider/UserProvider";

import Comment from "./Comment/Comment";
import ReplyComment from "./ReplyComment/ReplyComment";

import "./Styles.css";

const Comments = ({ postid }) => {
  const { commentinfo, commentdispatch } = useContext(commentglobalContext);
  const { userinfo, userdispatch } = useContext(userglobalContext);

  const [commentContent, setCommentContent] = useState("");
  const [isCommentAnswer, setIsCommentAnswer] = useState(false);

  const comments = commentinfo.filter((comment) => comment.postid === postid);
  const createcomment = async (e) => {
    e.preventDefault();

    if (!commentContent) return;
    // postid, postData, commentdispatch
    const success = await createComment(
      postid,
      { content: commentContent, like: [] },
      commentdispatch,
      userdispatch
    );

    if (success) setCommentContent("");
  };

  return (
    <>
      <button onClick={() => setIsCommentAnswer((prev) => !prev)}>
        comments {comments.length}
      </button>
      {isCommentAnswer && (
        <div className="cmtinput">
          {userinfo && (
            <form onSubmit={createcomment}>
              <textarea
                placeholder="enter your comment1"
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
              />
              {commentContent && (
                <div className="navquestionbtng">
                  <button>submit</button>
                  <button onClick={() => setCommentContent("")}>cancel</button>
                </div>
              )}
            </form>
          )}

          {comments
            .sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
            .map(
              (comment) =>
                !comment.parentid && (
                  <div key={comment._id}>
                    <Comment comment={comment} />
                    <hr />
                    <ReplyComment
                      comments={comments}
                      parentCommentId={comment._id}
                    />
                  </div>
                )
            )}
        </div>
      )}
    </>
  );
};

export default Comments;
