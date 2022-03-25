import React from "react";
import AnswerTable from "../components/AnswerTable";
import axios from "axios";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: null,
            y: "2",
            z: null,
            XCheckedId: null,
            RCheckedId: null,
            errorMessage: "",
            table: [],
        }
    }

    componentDidMount() {
        let login = localStorage.getItem("login");
        axios({
            method: "POST",
            url: "http://localhost:21460/web4/checker",
            data: "login=" + login,
        })
            .then(response => {
                this.setState({table: response.data})
            })
            .catch(error => {
                if (error.response === undefined) {
                    this.setState({errorMessage: "Ошибка при подключении к серверу"});
                }
            })
    }

    XInput = (event) => {
        if (this.state.XCheckedId !== null) {
            if (event.target.id !== this.state.XCheckedId) {
                this.setState({errorMessage: "Вы можете выбрать только одно значение x"});
                event.target.checked = false;
            } else {
                this.setState({XCheckedId: null});
                this.setState({errorMessage: ""});
                this.setState({x: null});
            }
        } else {
            this.setState({XCheckedId: event.target.id});
            this.setState({x: event.target.value});
            this.setState({errorMessage: ""});
        }
    }

    RInput = (event) => {
        if (event.target.value <= 0) {
            event.target.checked = false;
            this.setState({errorMessage: "Вы не можете выбрать отрицательное значение радиуса"});
            return;
        }
        if (this.state.RCheckedId !== null) {
            if (event.target.id !== this.state.RCheckedId) {
                this.setState({errorMessage: "Вы можете выбрать только одно значение радиуса"});
                event.target.checked = false;
            } else {
                this.setState({RCheckedId: null});
                this.setState({r: null});
                this.clearFigure();
                this.setState({errorMessage: ""});
            }
        } else {
            this.setState({RCheckedId: event.target.id});
            this.setState({r: event.target.value});
            this.setState({errorMessage: ""});
            this.setFigure(event.target.value);
        }
    }

    validate(x, y, r) {
        if (x >= -4 && x <= 4) {
            if (y >= -3 && y <= 3) {
                if (r > 0) {
                    this.setState({errorMessage: ""});
                    return true;
                }
                this.setState({errorMessage: "Выберите значение радиуса"});
                return false;
            }
            this.setState({errorMessage: "Значение Y должно быть в диапазоне от -3 до 3"});
            return false;
        }
        this.setState({errorMessage: "Значение X должно быть в диапазоне от -4 до 4"});
        return false;
    }

    YInputValidate = (event) => {
        let y = event.target.value;
        if (y === "") {
            this.setState({errorMessage: "Не указана координата Y"});
            this.setState({y: ""});
            return false;
        } else if (y <= 3 && y >= -3) {
            this.setState({errorMessage: ""});
            this.setState({y: y});
            return true;
        } else if (y === "-") {
            this.setState({y: ""});
        } else {
            this.setState({errorMessage: "Недопустимое значение Y. Значение Y должно быть в диапазоне от -3 до 3"});
            this.setState({y: ""});
            return false;
        }
    }

    setFigure(r) {
        let triangle = document.getElementById("triangle");
        triangle.setAttribute("points", "270,270 " + (270 - 55 * r / 2) + ",270 270," + (270 + 55 * r / 2) + " 270,270");
        let rectangle = document.getElementById("rectangle");
        rectangle.setAttribute("points", "270,270 " + (270 - 55 * r) + ",270 " + (270 - 55 * r) + "," + (270 - 55 * r) + " 270," + (270 - 55 * r) + " 270,270");
        let curve = document.getElementById("curve");
        curve.setAttribute("d", "M270," + (270 + 55 * r) + " L270," + (270 + 55 * r) + " L270,270 L" + (270 + 55 * r) + ",270 A" + (55 * r) + "," + (55 * r) + " 0 0,1 270," + (270 + 55 * r));
    }

    clearFigure() {
        let triangle = document.getElementById("triangle");
        triangle.setAttribute("points", "");
        let rectangle = document.getElementById("rectangle");
        rectangle.setAttribute("points", "");
        let curve = document.getElementById("curve");
        curve.setAttribute("d", "");
    }

    exit() {
        localStorage.removeItem("login");
        window.location = "/";
    }

    submitForm = (event) => {
        event.preventDefault();
        let x = this.state.x;
        let y = this.state.y;
        let r = this.state.r;
        if (x !== null) {
            if (y !== "") {
                if (this.validate(x, y, r)) {
                    this.sendRequest(x, y, r);
                }
            } else
                this.setState({errorMessage: "Введите корректное значение Y"});
        } else
            this.setState({errorMessage: "Выберите значение X"});
    }

    submitPoint = (event) => {
        let x = ((event.nativeEvent.offsetX - 270) / 55).toFixed(3);
        let y = ((-event.nativeEvent.offsetY + 270) / 55).toFixed(3);
        let r = this.state.r;
        if (this.validate(x, y, r)) {
            this.sendRequest(x, y, r);
        }
    }

    sendRequest(x, y, r) {
        axios({
            method: "POST",
            url: "http://localhost:21460/web4/checker",
            data: "x=" + x + "&y=" + y + "&r=" + r + "&login=" + localStorage.getItem("login"),
        })
            .then(response => {
                this.setState({table: response.data})
            })
            .catch(error => {
                if (error.response === undefined) {
                    this.setState({errorMessage: "Ошибка при подключении к серверу"});
                }
            })

    }

    getDataTable = () => {
        console.log("qwertyui")
        axios({
            method: "GET",
            url: "http://localhost:21460/web4/checker",
            data: "login=" + localStorage.getItem("login"),
        })
            .then(response => {
                console.log(response.data);
                this.setState({table: response.data})
            })
            .catch(error => {
                if (error.response === undefined) {
                    this.setState({errorMessage: "Ошибка при подключении к серверу"});
                }
            })
    }

    clearDataTable = () => {
        axios({
            method: "POST",
            url: "http://localhost:21460/web4/clear",
            data: "login=" + localStorage.getItem("login"),
        })
            .then(response => {
                this.setState({table: response.data});
            })
    }

    render() {
        if (localStorage.getItem("login") === null || localStorage.getItem("login") === undefined) {
            window.location = "/"
        }


        return (
            <div>
                <div id={"PictureBlock"}>
                    <svg id="Picture" onClick={this.submitPoint}>
                        <line x1="20" y1="270" x2="520" y2="270" stroke="black"/>
                        <line x1="270" y1="20" x2="270" y2="520" stroke="black"/>
                        <polygon points="520,270 505,260 505,280 520,270" stroke="black"/>
                        <polygon points="270,20 260,35 280,35 270,20" stroke="black"/>
                        <circle r="5" cx="270" cy="270"/>
                        <circle id="point" r="5" cx="270" cy="270" visibility="hidden"/>

                        <line x1="325" y1="265" x2="325" y2="275" stroke="black"/>
                        <line x1="380" y1="265" x2="380" y2="275" stroke="black"/>
                        <line x1="435" y1="265" x2="435" y2="275" stroke="black"/>
                        <line x1="490" y1="265" x2="490" y2="275" stroke="black"/>

                        <line x1="215" y1="265" x2="215" y2="275" stroke="black"/>
                        <line x1="160" y1="265" x2="160" y2="275" stroke="black"/>
                        <line x1="105" y1="265" x2="105" y2="275" stroke="black"/>
                        <line x1="50" y1="265" x2="50" y2="275" stroke="black"/>

                        <line x1="265" y1="325" x2="275" y2="325" stroke="black"/>
                        <line x1="265" y1="380" x2="275" y2="380" stroke="black"/>
                        <line x1="265" y1="435" x2="275" y2="435" stroke="black"/>
                        <line x1="265" y1="490" x2="275" y2="490" stroke="black"/>

                        <line x1="265" y1="215" x2="275" y2="215" stroke="black"/>
                        <line x1="265" y1="160" x2="275" y2="160" stroke="black"/>
                        <line x1="265" y1="105" x2="275" y2="105" stroke="black"/>
                        <line x1="265" y1="50" x2="275" y2="50" stroke="black"/>

                        <text x="320" y="290" fontWeight="bolder">1</text>
                        <text x="375" y="290" fontWeight="bolder">2</text>
                        <text x="430" y="290" fontWeight="bolder">3</text>
                        <text x="485" y="290" fontWeight="bolder">4</text>

                        <text x="205" y="290" fontWeight="bolder">-1</text>
                        <text x="150" y="290" fontWeight="bolder">-2</text>
                        <text x="95" y="290" fontWeight="bolder">-3</text>
                        <text x="40" y="290" fontWeight="bolder">-4</text>

                        <text x="280" y="220" fontWeight="bolder">1</text>
                        <text x="280" y="165" fontWeight="bolder">2</text>
                        <text x="280" y="110" fontWeight="bolder">3</text>
                        <text x="280" y="55" fontWeight="bolder">4</text>

                        <text x="280" y="330" fontWeight="bolder">-1</text>
                        <text x="280" y="385" fontWeight="bolder">-2</text>
                        <text x="280" y="440" fontWeight="bolder">-3</text>
                        <text x="280" y="495" fontWeight="bolder">-4</text>

                        <polygon id="triangle" points="" fill="blue" fillOpacity="0.4"/>
                        <polygon id="rectangle" points="" fill="blue"
                                 fillOpacity="0.4"/>
                        <path id="curve" d="" fill="blue"
                              fillOpacity="0.4"/>
                        {this.state.table.map((point) => {
                            let x = point.x * 55 + 270;
                            let y = -point.y * 55 + 270;
                            let color;
                            if (point.result) {
                                color = "green"
                            } else {
                                color = "red"
                            }
                            return (
                                <circle key={point.id} className={"graphPoints"} cx={x} cy={y} fill={color} r={"5"}/>
                            )
                        })}
                    </svg>
                </div>
                <form id={"Points"} onSubmit={this.submitForm}>
                    <div id={"InputsBlock"}>
                        <div>
                            <table id={"MessageTable"}>
                                <th>
                                    <text id={"ErrorMessage"}>{this.state.errorMessage}</text>
                                </th>
                            </table>
                        </div>
                        <div>
                            <table className="XCoordinateTable">
                                <tr>
                                    <th colSpan="3">
                                        <label className="textLabel">Coordinate X</label>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="checkbox1" className="checkboxLabel">-4</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox1" name="x1" value="-4"
                                               onClick={this.XInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox2" className="checkboxLabel">-3</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox2" name="x2" value="-3"
                                               onClick={this.XInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox3" className="checkboxLabel">-2</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox3" name="x3" value="-2"
                                               onClick={this.XInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="checkbox4" className="checkboxLabel">-1</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox4" name="x4" value="-1"
                                               onClick={this.XInput}/>
                                    </td>
                                    <td><label htmlFor="checkbox5" className="checkboxLabel">0</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox5" name="x5" value="0"
                                               onClick={this.XInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox6" className="checkboxLabel">1</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox6" name="x6" value="1"
                                               onClick={this.XInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="checkbox7" className="checkboxLabel">2</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox7" name="x7" value="2"
                                               onClick={this.XInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox8" className="checkboxLabel">3</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox8" name="x8" value="3"
                                               onClick={this.XInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox9" className="checkboxLabel">4</label>
                                        <input type="checkbox" className="XCheckbox" id="checkbox9" name="x9" value="4"
                                               onClick={this.XInput}/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <table className={"YCoordinateTable"}>
                                <tr>
                                    <th>
                                        <label className="textLabel">Coordinate Y</label>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <input id={"YInput"} type={"text"} maxLength={10} defaultValue={2}
                                               onChange={this.YInputValidate}/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <table className="RadTable">
                                <tr>
                                    <th colSpan="3">
                                        <label className="textLabel">R:</label>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="checkbox1r" className="checkboxLabel">-4</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox1r" name="r1"
                                               value="-4" onClick={this.RInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox2r" className="checkboxLabel">-3</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox2r" name="r2"
                                               value="-3" onClick={this.RInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox3r" className="checkboxLabel">-2</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox3r" name="r3"
                                               value="-2" onClick={this.RInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="checkbox4r" className="checkboxLabel">-1</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox4r" name="r4"
                                               value="-1" onClick={this.RInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox5r" className="checkboxLabel">0</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox5r" name="r5" value="0"
                                               onClick={this.RInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox6r" className="checkboxLabel">1</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox6r" name="r6" value="1"
                                               onClick={this.RInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="checkbox7r" className="checkboxLabel">2</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox7r" name="r7" value="2"
                                               onClick={this.RInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox8r" className="checkboxLabel">3</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox8r" name="r8" value="3"
                                               onClick={this.RInput}/>
                                    </td>
                                    <td>
                                        <label htmlFor="checkbox9r" className="checkboxLabel">4</label>
                                        <input type="checkbox" className="RCheckbox" id="checkbox9r" name="r9" value="4"
                                               onClick={this.RInput}/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <table id={"ButtonsTable"}>
                                <tr>
                                    <td>
                                        <input type={"submit"} value={"Отправить"} id={"SubmitBut"}/>
                                    </td>
                                    <td>
                                        <input type={"button"} value={"Очистить таблицу"} id={"ClearBut"}
                                               onClick={this.clearDataTable}/>
                                    </td>
                                    <td>
                                        <input type={"button"} value={"Выйти"} id={"Exit"} onClick={this.exit}/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
                <table id={"AnswerTable"} onLoadStart={this.getDataTable}>
                    <tr>
                        <th colSpan={4}>
                            Answer Table
                        </th>
                    </tr>
                    <tr>
                        <td>
                            X:
                        </td>
                        <td>
                            Y:
                        </td>
                        <td>
                            R:
                        </td>
                        <td>
                            Result
                        </td>
                    </tr>
                    {this.state.table.map((point) => {
                        return (
                            <tr key={point.id}>
                                <td>
                                    {point.x.toFixed(3)}
                                </td>
                                <td>
                                    {point.y.toFixed(3)}
                                </td>
                                <td>
                                    {point.r.toFixed(1)}
                                </td>
                                <td>
                                    {point.result.toString()}
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}

export default MainPage;