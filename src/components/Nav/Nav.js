import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { topicglobalContext } from "../../context/Provider/TopicProvider";
import { questionglobalContext } from "../../context/Provider/QuestionProvider";
import { userglobalContext } from "../../context/Provider/UserProvider";

import { logout } from "../../action/user";
import { createQuestion } from "../../action/question";
import { getAllTopics } from "../../action/topic";

// import AutoHeightTextarea from "../AutoHeightTextarea/AutoHeightTextarea";

import "./rootStyles.css";
import "./Styles.css";
import "../AnswerCell/Styles.css";

const Nav = () => {
  const [isQuestion, setIsQuestion] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [navShow, setNavShow] = useState(false);

  const textareaRef = useRef(null);

  const initialChosen = {
    home: false,
    topics: false,
    questions: false,
    profile: false,
    addquestion: false,
    about: false,
  };
  const [chosen, setChosen] = useState(initialChosen);

  const [groups, setGroups] = useState({ checkedItems: new Map() });

  const { topicinfo, topicdispatch } = useContext(topicglobalContext);

  const { questiondispatch } = useContext(questionglobalContext);

  const { userinfo, userdispatch } = useContext(userglobalContext);

  const history = useHistory();

  useEffect(() => {
    const getalltop = async () => {
      await getAllTopics(topicdispatch);
    };

    getalltop();
  }, []);

  useEffect(() => {
    const profile = localStorage.getItem("profile");

    if (profile) {
      const { result } = JSON.parse(profile);

      userdispatch({
        type: "login",
        payload: result,
      });
    }
  }, []);

  const addQuestion = async () => {
    /**check content */
    if (!questionContent) return;
    /**check content */

    /**check topic */
    const array = Array.from(groups.checkedItems);
    const values = Array.from(groups.checkedItems.values());
    if (array.length === 0 || values.every((v) => v === false)) return;
    /**check topic */

    let topic = [];
    groups.checkedItems.forEach((value, key) => {
      if (value) topic.push(key);
    });

    const success = await createQuestion(
      { content: questionContent, topic, follow: [], anonymous },
      questiondispatch,
      userdispatch
    );

    if (success) {
      setQuestionContent("");
      setIsQuestion(false);

      setAnonymous(false);
      setGroups({
        checkedItems: new Map(),
      });
      history.push("/questions");
    }
  };

  const handleLogout = () => {
    logout(userdispatch);
    setNavShow((prev) => !prev);
  };

  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );

  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setGroups((prevgroups) => ({
      checkedItems: prevgroups.checkedItems.set(item, isChecked),
    }));
  };

  useEffect(() => {
    textareaRef.current.style.height = "20px";
    const scrollHeight =
      textareaRef.current.scrollHeight > "280"
        ? "280"
        : textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [questionContent]);

  return (
    <>
      <nav className="verticalnav">
        {!navShow && (
          <button
            className="navbutton"
            id="hamburger"
            onClick={() => setNavShow((prev) => !prev)}
          >
            <i className="fas fa-bars fa-lg"></i>
          </button>
        )}

        <ul className={navShow ? "navul show" : "navul"}>
          <button className="clsbtn" onClick={() => setNavShow(false)}>
            x
          </button>
          <Link
            to="/"
            onClick={() => {
              setChosen({ ...initialChosen, home: true });
              setNavShow((prev) => !prev);
            }}
            className={chosen.home ? "sqlink navlinkactive " : "sqlink"}
          >
            <li className={chosen.home ? " liactive " : null}>Home</li>
          </Link>

          <Link
            to="/topics"
            onClick={() => {
              setChosen({ ...initialChosen, topics: true });
              setNavShow((prev) => !prev);
            }}
            className={chosen.topics ? "navlinkactive sqlink" : "sqlink"}
          >
            <li className={chosen.topics ? " liactive " : null}>topics</li>
          </Link>

          <Link
            to="/questions"
            onClick={() => {
              setChosen({ ...initialChosen, questions: true });
              setNavShow((prev) => !prev);
            }}
            className={chosen.questions ? "navlinkactive sqlink" : "sqlink"}
          >
            <li className={chosen.questions ? " liactive " : null}>
              questions
            </li>
          </Link>

          {userinfo ? (
            <>
              <Link
                to={`/profile/${userinfo._id}`}
                onClick={() => {
                  setChosen({ ...initialChosen, profile: true });
                  setNavShow((prev) => !prev);
                }}
                className={chosen.profile ? "navlinkactive sqlink" : "sqlink"}
              >
                <li className={chosen.profile ? " liactive " : null}>
                  {/* Hello {userinfo.name} */}
                  my profile
                </li>
              </Link>
              <div className={chosen.addquestion ? "navlinkactive " : null}>
                <li
                  onClick={() => {
                    setIsQuestion((prev) => !prev);
                    setChosen({ ...initialChosen, addquestion: true });
                    setNavShow((prev) => !prev);
                  }}
                  className={chosen.addquestion ? " liactive" : null}
                >
                  add question
                </li>
              </div>
              <li onClick={handleLogout}>logout</li>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="sqlink"
                onClick={() => {
                  setNavShow((prev) => !prev);
                }}
              >
                <li>login</li>
              </Link>
            </>
          )}

          <Link
            to="/about"
            onClick={() => {
              setChosen({ ...initialChosen, about: true });
              setNavShow((prev) => !prev);
            }}
            className={chosen.about ? "navlinkactive sqlink" : "sqlink"}
          >
            <li className={chosen.about ? " liactive " : null}>about</li>
          </Link>
        </ul>
        <span className="navsearch ">
          <input
            className="navsearchinput"
            type="text"
            placeholder="search..."
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          />

          <button
            className={searchContent ? "navsearchbtn" : "hide"}
            onClick={() => setSearchContent("")}
          >
            <Link
              className="sqlink"
              to={{
                pathname: "/search",
                content: `?search=${searchContent}`,
              }}
            >
              <i className="fas fa-search">{`${searchContent}`}</i>
            </Link>
          </button>
        </span>
      </nav>
      <nav className="horizontalnav">
        <ul className="navul">
          <Link
            to="/"
            onClick={() => {
              setChosen({ ...initialChosen, home: true });
            }}
            className={chosen.home ? "sqlink navlinkactive " : "sqlink"}
          >
            <li className={chosen.home ? " liactive " : null}>Home</li>
          </Link>

          <Link
            to="/topics"
            onClick={() => {
              setChosen({ ...initialChosen, topics: true });
            }}
            className={chosen.topics ? "navlinkactive sqlink" : "sqlink"}
          >
            <li className={chosen.topics ? " liactive " : null}>topics</li>
          </Link>

          <Link
            to="/questions"
            onClick={() => {
              setChosen({ ...initialChosen, questions: true });
            }}
            className={chosen.questions ? "navlinkactive sqlink" : "sqlink"}
          >
            <li className={chosen.questions ? " liactive " : null}>
              questions
            </li>
          </Link>

          {userinfo ? (
            <>
              <Link
                to={`/profile/${userinfo._id}`}
                onClick={() => {
                  setChosen({ ...initialChosen, profile: true });
                }}
                className={chosen.profile ? "navlinkactive sqlink" : "sqlink"}
              >
                <li
                  className={chosen.profile ? " liactive username" : "username"}
                >
                  my profile
                </li>
              </Link>
              <div className={chosen.addquestion ? "navlinkactive " : null}>
                <li
                  onClick={() => {
                    setIsQuestion((prev) => !prev);
                    setChosen({ ...initialChosen, addquestion: true });
                  }}
                  className={chosen.addquestion ? " liactive" : null}
                >
                  add question
                </li>
              </div>
              <li onClick={handleLogout}>logout</li>
            </>
          ) : (
            <>
              <Link to="/login" className="sqlink">
                <li>login</li>
              </Link>
            </>
          )}

          <Link
            to="/about"
            onClick={() => {
              setChosen({ ...initialChosen, about: true });
            }}
            className={chosen.about ? "navlinkactive sqlink" : "sqlink"}
          >
            <li className={chosen.about ? " liactive " : null}>about</li>
          </Link>
        </ul>
        <span className="navsearch ">
          <input
            className="navsearchinput"
            type="text"
            placeholder="search..."
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          />

          <button
            className={searchContent ? "navsearchbtn" : "hide"}
            onClick={() => setSearchContent("")}
          >
            <Link
              className="sqlink"
              to={{
                pathname: "/search",
                content: `?search=${searchContent}`,
              }}
            >
              <i className="fas fa-search">{`${searchContent}`}</i>
            </Link>
          </button>
        </span>
      </nav>

      <div className={isQuestion ? "questionModel qshow" : "questionModel "}>
        <div className="navquestion">
          <button
            onClick={() => setAnonymous((prev) => !prev)}
            className={
              anonymous ? "navquestionanyms active" : "navquestionanyms"
            }
          >
            anonymous
          </button>
          <div className="navtopics">
            {topicinfo.map((topic, index) => (
              <div key={index}>
                <label htmlFor="name">
                  {topic.name}
                  <Checkbox
                    name={topic._id}
                    onChange={handleChange}
                    value={topic._id}
                    checked={groups?.checkedItems?.get(topic._id)}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="navquestionform">
            <textarea
              ref={textareaRef}
              rows="5"
              onChange={(e) => setQuestionContent(e.target.value)}
              value={questionContent}
              placeholder="enter your question"
            ></textarea>

            <div className="navquestionbtng">
              <button className="navquestionbtn" onClick={addQuestion}>
                submit
              </button>
              <button
                className="navquestionbtn"
                onClick={() => {
                  setIsQuestion(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
