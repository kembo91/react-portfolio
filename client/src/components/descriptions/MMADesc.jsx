import React from "react";

const MMADesc = () => {
  return (
    <div>
      <p>
        My current work-in-progress project:
        <a href="http://www.mmapredict.online">MMA predict</a>
      </p>
      <p>
        This website's main idea is to give people who bet on MMA fights a tool
        to make more educated decisions supported by data
      </p>
      <p>
        User first gives his prediction on a fight, which is being stored in an
        OLAP database alongside many others. And then user can see different
        aggregated statistics on how other people view the outcome of a fight in
        question
      </p>
      <p>
        I used one of material-ui dashboard templates as a base of a website,
        but design question is up in the air
      </p>
      <p>
        This website is not finished. I'm focused on backend code at the moment,
        but still deployed it to showcase the idea.
      </p>
      <p>Technologies:</p>
      <p>
        React, Redux, Material-ui, Clickhouse DB, Golang backend, Docker for
        deployment
      </p>
    </div>
  );
};

export default MMADesc;
