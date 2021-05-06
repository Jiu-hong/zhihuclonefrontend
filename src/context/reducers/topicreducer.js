export const topicsReducer = (state, action) => {
  switch (action.type) {
    case "getalltopics":
      return action.payload;
    default:
      return state;
  }
};
