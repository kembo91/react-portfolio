import { USER_SENT_MESSAGE } from "../types";

const initialState = {
  msgStatus: false,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_SENT_MESSAGE:
      const newState = { ...state, msgStatus: true };
      return newState;
    default:
      return state;
  }
}
