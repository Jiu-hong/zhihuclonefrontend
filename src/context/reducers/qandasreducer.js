export const qandasReducer = (state, action) => {
  switch (action.type) {
    case "getqandas":
      return action.payload; ///get all answer

    default:
      return state;
  }
};
