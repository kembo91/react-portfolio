import axios from "axios";

export default {
  user: {
    message: msgdata =>
      axios.post("/api/msg", { msgdata }).then(res => res.data.user)
  }
};
