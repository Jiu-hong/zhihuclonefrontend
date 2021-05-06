import React from "react";
import ReactDOM from "react-dom";

// import { Provider } from "./context/Provider";
import { AnswerProvider } from "./context/Provider/AnswerProvider";
import { UserProvider } from "./context/Provider/UserProvider";

import { CommentProvider } from "./context/Provider/CommentProvider";
import { PersonProvider } from "./context/Provider/PersonProvider";
import { QuestionProvider } from "./context/Provider/QuestionProvider";
import { SearchProvider } from "./context/Provider/SearchProvider";
import { TopicProvider } from "./context/Provider/TopicProvider";
import { ErrorProvider } from "./context/Provider/ErrorProvider";

import App from "./App";

ReactDOM.render(
  <ErrorProvider>
    <UserProvider>
      <CommentProvider>
        <PersonProvider>
          <QuestionProvider>
            <SearchProvider>
              <TopicProvider>
                <AnswerProvider>
                  <App />
                </AnswerProvider>
              </TopicProvider>
            </SearchProvider>
          </QuestionProvider>
        </PersonProvider>
      </CommentProvider>
    </UserProvider>
  </ErrorProvider>,
  document.getElementById("root")
);
