import React from "react";
import { HeightsContext } from "../App";

export const useHeights = () => {
  return React.useContext(HeightsContext);
};
