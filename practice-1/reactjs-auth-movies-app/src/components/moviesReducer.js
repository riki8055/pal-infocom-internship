export const initialState = {
  errors: {},
};

export function moviesReducer(state, action) {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
