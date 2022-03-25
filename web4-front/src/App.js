import './App.css';
import './styles/StartPageHeaderStyle.css';
import './styles/LoginFormStyle.css';
import './styles/PointFormStyle.css'
import './styles/GraphStyle.css'
import './styles/AnswerTableStyle.css';
import './styles/MessageFrameStyle.css'
import {Route, Routes} from 'react-router';
import {BrowserRouter} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";


function App() {
    return (
        <div id={"main"}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                    <Route path={"/main"} element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
