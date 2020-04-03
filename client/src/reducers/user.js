import { USER_SENT_MESSAGE } from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_SENT_MESSAGE:
      return action.user;
    default:
      return state;
  }
}
