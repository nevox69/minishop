import React from "react";

const BrokenComponent = () => {
  const obj = undefined;
  return <div>{obj.name}</div>;
};

export default BrokenComponent;
