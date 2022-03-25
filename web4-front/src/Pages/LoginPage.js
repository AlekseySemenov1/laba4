import React from "react";
import StartPageHeader from "../components/StartPageHeader";
import LoginForm from "../components/LoginForm";

class LoginPage extends React.Component{
    render() {
        if (localStorage.getItem("login") !== null && localStorage.getItem("login") !== undefined && localStorage.getItem("login") !=="") {
            window.location = "/main"
        }
        return(
            <div>
                <StartPageHeader/>
                <LoginForm/>
            </div>
        )
    }
}

export default LoginPage;