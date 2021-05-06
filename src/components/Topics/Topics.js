import React, { useContext } from "react";
import { topicglobalContext } from "../../context/Provider/TopicProvider";
import { Link } from "react-router-dom";

import "./Styles.css";

const Topics = () => {
  const { topicinfo } = useContext(topicglobalContext);

  return (
    <div>
      {topicinfo.map((topic) => (
        <div key={topic._id} className="cellframe">
          <Link to={`/topic/${topic._id}`}>{topic.name}</Link>
          <div>{topic.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
