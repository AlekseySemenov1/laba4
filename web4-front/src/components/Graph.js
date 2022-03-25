import React from "react";

class Graph extends React.Component {
    send = (event) => {
        let x = (event.nativeEvent.offsetX - 270) / 55;
        let y = (-event.nativeEvent.offsetY + 270) / 55;
        if (this.validate(x, y)){
            console.log("true");
        }
    }

    validate(x, y){
        return x >= -4 && x <= 4 && y >= -3 && y <= 3;
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Graph;