// Packages
import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'

const checkValidToken = () => {
    let localToken = localStorage.getItem("x-auth-token-word-puzzle-admin");
    let cookieToken = Cookies.get("Elzzup-Word-Drow");
    if(!localToken || !cookieToken){
        return false
    }
    localToken = localToken.substring(0, localToken.length - 13)
    localToken = localToken.substring(7)
    cookieToken = cookieToken.substring(0, cookieToken.length - 10)
    cookieToken = cookieToken.substring(12)

    if(localToken === cookieToken){
        return localToken;
    } else {
        return <Redirect to="/login" />
    }
};

export default checkValidToken;
