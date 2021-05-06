import React, { useState, useEffect } from "react";
import Comment from "../Comment/Comment";

import "./Styles.css";

const ReplyComment = ({ comments, parentCommentId }) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(true);

  useEffect(() => {
    let commentnumber = 0;

    comments.forEach((comment) => {
      if (comment.parentid === parentCommentId) {
        commentnumber++;
      }
    });

    setChildCommentNumber(commentnumber);
  }, [JSON.stringify(comments)]);

  const handleChange = () => {
    setOpenReplyComments((prev) => !prev);
  };
  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleChange}
          className="morecomments"
        >
          {openReplyComments
            ? `Hide ${childCommentNumber} comment(s)`
            : `View ${childCommentNumber} comment(s)`}
        </p>
      )}

      {openReplyComments &&
        comments.map(
          (comment) =>
            comment.parentid === parentCommentId && (
              <div
                key={comment._id}
                style={{ marginLeft: "20px", width: "80%" }}
              >
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
  );
};

export default ReplyComment;
