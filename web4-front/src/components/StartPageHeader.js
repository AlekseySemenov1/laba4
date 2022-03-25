import React from "react";

class StartPageHeader extends React.Component {
    render() {
        return (
            <div id="header">
                <div id="LabTitle">
                    <span>Лабораторная работа №4</span>
                </div>
                <ul id="linkRow">
                    <li className="headerElement">
                        <a href="https://se.ifmo.ru/courses/web#labs">SE.IFMO.RU</a>
                    </li>
                    <li className="headerElement">
                        <a href="https://github.com/AlekseySemenov1/WebSemestr3">Ссылка на github</a>
                    </li>
                    <li className="headerElement">
                        <a href="https://docs.google.com/spreadsheets/d/148tsdbIgCsHCHWiAtN3T1RA5vrvwnLc4LWTqHinwGYM/edit#gid=1659727672">Google
                            Журнал</a>
                    </li>
                    <li className="headerElement">
                        <a>Об авторе</a>
                        <ul className="info">
                            <li>Семенов Алексей Олегович </li>
                            <li>Группа: P3214 </li>
                            <li>Вариант: 29166 </li>
                        </ul>
                    </li>
                </ul>
            </div>);
    }
}

export default StartPageHeader;