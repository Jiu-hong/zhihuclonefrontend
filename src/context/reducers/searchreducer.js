export const searchReducer = (state, action) => {
  switch (action.type) {
    case "getallforsearch":
      return action.payload; ///get all answer

    default:
      return state;
  }
};
