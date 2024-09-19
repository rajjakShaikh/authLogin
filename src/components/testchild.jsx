import React from "react";
import { memo } from "react";

function Testchild({ todo, newtestmemo }) {
  console.log("render testchild", todo);
  console.log(newtestmemo);
  // console.log("child comp userData", userData);
  return (
    <div>
      <h2> hello testchild</h2>
    </div>
  );
}

export default memo(Testchild);
