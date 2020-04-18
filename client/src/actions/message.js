import { USER_SENT_MESSAGE } from "../types";
import api from "../api";

export const userSentMessage = () => ({
  type: USER_SENT_MESSAGE,
});

export const message = (msgdata) => (dispatch) =>
  api.user.message(msgdata).then(() => dispatch(userSentMessage()));
