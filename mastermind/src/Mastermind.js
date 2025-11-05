/*
   Component: 1. Stateless -> function
              2. Stateful -> Class, function with React Hooks: useState

 */
import React from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import createSecret, {createMove} from "./utils/mastermind-util";
import InputText from "./components/common/input-text";
import Badge from "./components/common/badge";
import Button from "./components/common/button";
import Table from "./components/common/table";

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
        }, 1_000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleGuessChange = (event) => {
        this.setState({guess: Number(event.target.value)});
    }

    play = () => {
        let nextState = {...this.state};
        // let nextState = window.structuredClone(this.state);
        if (this.state.guess === this.state.secret) {
            nextState.level++;
            nextState.moves = [];
            nextState.timeout += 10;
            nextState.lives++;
            nextState.counter = nextState.timeout;
            nextState.secret = createSecret(nextState.level);
        } else {
            let move = createMove(this.state.guess,this.state.secret);
            nextState.moves = [...this.state.moves, move];
        }
        this.setState(nextState);
    }

    render() {
        return ( // View
            <Container>
                <Card title={"Game Console"}>
                    <Badge label={"Level"}
                           value={this.state["level"]}
                           color={"bg-success"}/>
                    <Badge label={"Lives"}
                           value={this.state["lives"]}
                           color={"bg-warning"}/>
                    <Badge label={"Counter"}
                           value={this.state["counter"]}
                           color={"bg-danger"}/>
                    <Badge label={"Moves"}
                           value={this.state["maxMoves"]-this.state["moves"].length}
                           color={"bg-primary"}/>
                    <InputText type={"text"}
                               name={"guess"}
                               label={"Guess"}
                               placeholder={"Enter your guess"}
                               onChange={this.handleGuessChange}
                               value={this.state["guess"]}>
                        <Button label={"Play"} color={"success"}
                                click={this.play}></Button>
                    </InputText>
                    <Table columns={["Guess","Perfect Match", "Partial Match","Evaluation"]}
                           fields={["guess","perfectMatch","partialMatch","message"]}
                           items={this.state["moves"]}
                           keyField={"guess"}
                    />
                </Card>
            </Container>
        );
    }
}

export default Mastermind;
