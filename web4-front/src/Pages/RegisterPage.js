import React from "react";
import StartPageHeader from "../components/StartPageHeader";
import RegisterForm from "../components/RegisterForm";

class RegisterPage extends React.Component{
    render() {
        if (localStorage.getItem("login") !== null && localStorage.getItem("login") !== undefined && localStorage.getItem("login") !=="") {
            window.location = "/main"
        }
        return(
            <div>
                <StartPageHeader/>
                <RegisterForm/>
            </div>
        )
    }
}

export default RegisterPage;