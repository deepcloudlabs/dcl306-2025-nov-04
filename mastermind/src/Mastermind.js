/*
   Component: 1. Stateless -> function
              2. Stateful -> Class, function with React Hooks: useState

 */
import React from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import createSecret from "./utils/mastermind-util";

class Mastermind extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            level: 3,
            secret: createSecret(3),
            lives: 3,
            timeout: 90,
            maxMoves: 10,
            counter: 90,
            moves: [],
            guess: 123
        }
    }


    componentDidMount() {
        this.timerId = setInterval(() => {
            let nextState = {...this.state};
            nextState.counter--;
            console.log(this.state["counter"]);
            this.setState(nextState, () => {
                console.log(this.state["counter"]);
            });
        }, 5_000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return ( // View
            <Container>
                <Card title={"Game Console"}>
                    {this.state["counter"]}
                </Card>
            </Container>
        );
    }
}

export default Mastermind;
