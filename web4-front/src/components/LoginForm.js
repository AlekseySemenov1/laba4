import React from "react";
import axios from "axios";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            errorMessage: "",
        }
    }

    loginInput = (event) => {
        this.setState({login: event.target.value});
    }

    passwordInput = (event) => {
        this.setState({password: event.target.value});
    }

    sendForm = (event) => {
        event.preventDefault();
        let login = this.state.login;
        let password = this.state.password;
        if (this.validateForm(login, password)) {
            axios({
                method: "POST",
                url: "http://localhost:21460/web4/login",
                data: "login=" + login + "&password=" + password,
            })
                .then(response => {
                    localStorage.setItem("login", login);
                    console.log(localStorage.getItem("login"));
                    window.location.pathname = "/main";
                })
                .catch(error => {
                    if (error.response === undefined){
                        this.setState({errorMessage: "Ошибка при подключении к серверу"});
                        return;
                    }
                    if (error.response.status === 401){
                        this.setState({errorMessage: "Неправильный логин или пароль"})
                    }
                })
        }

    }

    validateForm = (login, password) => {
        if (login === "" || password === ""){
            this.setState({errorMessage: "Пустой логин или пароль"});
            return false;
        } else if (login.length <= 5 || password.length <= 5) {
            this.setState({errorMessage: "Длина логина и пароля должна быть больше 5"});
            return false;
        } else {
            this.setState({errorMessage: ""});
            return true;
        }
    }

    render() {
        return (
            <form className={"loginForm"}>
                <text id={"ErrorMessage"}>{this.state.errorMessage}</text>
                <div className={"login"}>
                    <text>Введите логин</text>
                    <input className={"formInput"} type={"text"} placeholder={"Введите логин"} required={true}
                           onChange={this.loginInput}/>
                </div>
                <div className={"login"}>
                    <text>Введите пароль</text>
                    <input className={"formInput"} type={"password"} placeholder={"Введите пароль"} required={true}
                           onChange={this.passwordInput}/>
                </div>
                <div className={"login"}>
                    <div className={"ButtonBlock"}>
                        <input id={"Submit"} type={"submit"} value={"Войти"} onClick={this.sendForm}/>
                    </div>
                    <div className={"ButtonBlock"}>
                        <a href={"/register"}>Регистрация</a>
                    </div>
                </div>
            </form>
        )
    }
}

export default LoginForm;