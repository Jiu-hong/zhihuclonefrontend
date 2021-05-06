const initialState = "";

export const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return "";
    default:
      return initialState;
  }
};

export const personReducer = (state, action) => {
  switch (action.type) {
    case "getperson":
      if (state.find((e) => e._id === action.payload._id)) {
        return [
          ...state.filter((e) => e._id !== action.payload._id),
          action.payload,
        ];
      } else {
        return [...state, action.payload];
      }

    case "updateperson":
      return state.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );

    case "getfollowers":
      return action.payload;

    case "getfollowings":
      return action.payload;

    default:
      return state;
  }
};

export const answersReducer = (state, action) => {
  switch (action.type) {
    case "getallanswers":
      return action.payload;
    case "getanswersbycreator":
      return action.payload;
    case "getanswersbylike":
      return action.payload;
    case "create":
      return [...state, action.payload];
    case "delete":
      return state.filter((e) => action.payload !== e._id);
    case "update":
      return state.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );

    default:
      return state;
  }
};

export const questionsReducer = (state, action) => {
  switch (action.type) {
    case "getallquestions":
      return action.payload;

    case "getcentainquestion":
      return [action.payload];
    case "create":
      return [...state, action.payload];
    case "delete":
      return state.filter((e) => e._id !== action.payload);
    case "update":
      return state.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
    default:
      return state;
  }
};

export const commentReducer = (state, action) => {
  switch (action.type) {
    case "getcertaincomments":
      if (
        action.payload[0] &&
        state.find((e) => e.postid === action.payload[0].postid)
      ) {
        return [
          ...state.filter((s) => s.postid !== action.payload[0].postid),
          ...action.payload,
        ];
      } else {
        return [...state, ...action.payload];
      }

    case "getall":
      return action.payload;
    case "create":
      return [...state, action.payload];
    case "update":
      return state.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
    case "delete":
      return state.filter((e) => e._id !== action.payload);
    default:
      return state;
  }
};
