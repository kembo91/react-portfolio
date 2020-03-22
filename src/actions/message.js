import { USER_SENT_MESSAGE } from "../types";
import api from "../api";

export const userSentMessage = user => ({
  type: USER_SENT_MESSAGE,
  user
});

export const message = msgdata => dispatch =>
  api.user.message(msgdata).then(user => dispatch(userSentMessage(user)));
