import React from "react";
import { UserContext } from "../App";

export const useAuth = () => {
  return React.useContext(UserContext);
};
