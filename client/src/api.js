import axios from "axios";

export default {
  user: {
    message: (msgdata) =>
      axios.post("/api/msg", { msgdata }).then((res) => res.data.user),
    color: () => axios.get("/api/color").then((res) => res.data),
  },
};
