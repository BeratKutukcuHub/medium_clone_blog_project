import { type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

export const ChangeToComponentOrTo = ({children,change,or}:{
    children:JSX.Element,
    change:"login"|"nologin",
    or:string}) => {
    const user = useSelector((user : RootState) => user.user).user;

    if (user === undefined) return null;
    if(change === "login") {
      return user ? children : <Navigate to={or}/>;
    } else {
      return !user ? children : <Navigate to={or}/>;
    }
}