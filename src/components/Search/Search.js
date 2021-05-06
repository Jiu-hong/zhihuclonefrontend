import React, { useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import { searchglobalContext } from "../../context/Provider/SearchProvider";
import { getAllforSearch } from "../../action/search";

import "./Styles.css";

const Search = () => {
  const { searchinfo, searchdispatch } = useContext(searchglobalContext);

  const { content } = useLocation();

  const query = new URLSearchParams(content);

  const searchContent = query.get("search")?.toLowerCase();

  const getall = async () => {
    await getAllforSearch(searchContent, searchdispatch);
  };

  useEffect(() => {
    getall();
  }, [searchContent]);

  const answerTemplate = (answer) => {
    return (
      <div key={answer._id} className="cellframe">
        <div className="schtopic">ANSWER</div>
        {answer.anonymous ? (
          <div className="creator">creator: Anonymous</div>
        ) : (
          <>
            <div className="creator">
              <Link to={`/profile/${answer.creator._id}`} className="sqlink">
                creator:{answer.creator.name}
              </Link>
            </div>
            <div className="creator creatordescription">
              creator description:{answer.creator.description}
            </div>
          </>
        )}
        <div className="acqquestion">
          question:{" "}
          <Link to={`/${answer.question._id}`} className="sqlink">
            {answer.question.content}
          </Link>
        </div>
        <div className="cellcontent">
          content: <strong>{answer.content}</strong>{" "}
        </div>
        <div>
          topic:
          {answer.topic?.map((t, index) => (
            <Link key={index} to={`/topic/${t._id}`} className="sqlink">
              <span>[{t.name}] </span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const questionTemplate = (question) => {
    return (
      <div key={question._id} className="cellframe">
        QUESTION
        <div className="cellcontent">
          <Link to={`/${question._id}`} className="sqlink">
            {" "}
            <strong>{question.content}</strong>
          </Link>
        </div>
        <div className="schtopic">
          topic:
          {question.topic?.map((t, index) => (
            <Link key={index} to={`/topic/${t._id}`} className="sqlink">
              <span>[{t.name}] </span>
            </Link>
          ))}
        </div>
        {question.anonymous ? (
          <div className="creator">creator: Anonymous</div>
        ) : (
          <>
            <Link to={`/profile/${question.creator._id}`} className="sqlink">
              <div className="creator">
                creator name: {question.creator.name}
              </div>{" "}
            </Link>
            <div className="creator">
              creator description: {question.creator.description}
            </div>
          </>
        )}
      </div>
    );
  };

  const personTemplate = (person) => {
    return (
      <div key={person._id} className="cellframe">
        <div className="schtopic">USER</div>
        <Link to={`/profile/${person._id}`} className="sqlink">
          <div className="creator">
            name: <strong>{person.name}</strong>
          </div>
        </Link>
        <div className="creator">description: {person.description}</div>
      </div>
    );
  };

  const topicTemplate = (content) => {
    return (
      <div key={content._id} className="cellframe">
        <div className="schtopic">TOPIC</div>
        <Link to={`/topic/${content._id}`}>
          <div className="schtopic">
            <strong>{content.name}</strong>
          </div>
        </Link>
        <div>{content.description}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="cellframe">
        {" "}
        {searchinfo.length} result(s) for "{searchContent}".
      </div>
      {searchinfo
        ?.sort((a, b) => new Date(b.update_date) - new Date(a.update_date))
        .map((content) => {
          if (content?.question) {
            /*  answer*/
            return answerTemplate(content);
          } else if (content.email) {
            /* person */
            return personTemplate(content);
          } else if (content.follow) {
            /* question */
            return questionTemplate(content);
          } else {
            return topicTemplate(content);
          }
        })}
    </div>
  );
};

export default Search;
