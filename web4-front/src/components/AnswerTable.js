import React from "react";

class AnswerTable extends React.Component{


    render() {
        return(
            <table id={"AnswerTable"}>
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
            </table>
        )
    }
}

export default AnswerTable;