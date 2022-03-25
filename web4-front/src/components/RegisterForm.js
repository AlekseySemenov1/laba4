import React from "react";
import axios from "axios";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            password2: "",
            errorMessage: "",
        }
    }

    loginInput = (event) => {
        this.setState({login: event.target.value});
    }

    passwordInput = (event) => {
        this.setState({password: event.target.value});
    }

    secondPasswordInput = (event) => {
        this.setState({password2: event.target.value});
    }

    sendForm = (event) => {
        event.preventDefault();
        let login = this.state.login;
        let password = this.state.password;
        let password2 = this.state.password2;
        if (this.validateForm(login, password, password2)) {
            axios({
                method: "POST",
                url: "http://localhost:21460/web4/register",
                data: "login=" + login + "&password=" + password + "&password2=" + password2,
            })
                .then(response => {
                    window.location.pathname = "/main";
                    localStorage.setItem("login", login);
                })
                .catch(error => {
                    if (error.response === undefined) {
                        this.setState({errorMessage: "Ошибка при подключении к серверу"});
                        return;
                    }
                    if (error.response.status === 401){
                        this.setState({errorMessage: "Юзер с таким логином уже существует"});
                    }
                })

        }

    }

    validateForm = (login, password, password2) => {
        if (login === "" || password === "" || password2 === "") {
            this.setState({errorMessage: "Пустой логин или пароль"});
            return false;
        } else if (login.length <= 5 || password.length <= 5 || password2.length <= 5) {
            this.setState({errorMessage: "Длина логина и пароля должна быть больше 5"});
            return false;
        } else if (password !== password2) {
            this.setState({errorMessage: "Пароли должны совпадать"});
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
                    <input className={"formInput"} type={"text"} required={true} onChange={this.loginInput}/>
                </div>
                <div className={"login"}>
                    <text>Введите пароль</text>
                    <input className={"formInput"} type={"password"} required={true} onChange={this.passwordInput}/>
                </div>
                <div className={"login"}>
                    <text>Введите пароль ещё раз</text>
                    <input className={"formInput"} type={"password"} required={true}
                           onChange={this.secondPasswordInput}/>
                </div>
                <div className={"login"}>
                    <div className={"ButtonBlock"}>
                        <input id={"Register"} type={"submit"} value={"Зарегистрироваться"} onClick={this.sendForm}/>
                    </div>
                    <div className={"ButtonBlock"}>
                        <a href={"/"}>Вход</a>
                    </div>
                </div>
            </form>
        )
    }
}

export default RegisterForm;