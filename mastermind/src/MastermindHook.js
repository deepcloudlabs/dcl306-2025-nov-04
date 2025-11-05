/*
   Component: 1. Stateless -> function
              2. Stateful -> Class, function with React Hooks: useState

 */
import React, {useEffect} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import createSecret, {createMove} from "./utils/mastermind-util";
import InputText from "./components/common/input-text";
import Badge from "./components/common/badge";
import Button from "./components/common/button";
import Table from "./components/common/table";

const initialSecret = createSecret(3);
export default function MastermindHook() {
    let [secret, setSecret] = React.useState(initialSecret);
    let [guess, setGuess] = React.useState(123);
    let [level, setLevel] = React.useState(3);
    let [lives, setLives] = React.useState(3);
    let [moves, setMoves] = React.useState([]);
    let [maxMoves, setMaxMoves] = React.useState(10);
    let [maxCounter, setMaxCounter] = React.useState(90);
    let [counter, setCounter] = React.useState(90);


    useEffect( () => {
        const timerId = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1);
            setCounter(counter + 1);
            setCounter(counter + 1);
            if (counter <= 0) {
                if(lives === 0){
                    //TODO: player loses: routing
                    return;
                } else {
                    setLives(prevLives => prevLives - 1);
                    nextState.moves = [];
                    nextState.counter = nextState.timeout;
                    nextState.secret = createSecret(nextState.level);
                }
            }
            this.setState(nextState);
        }, 1_000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    handleGuessChange = (event) => {
        this.setState({guess: Number(event.target.value)});
    }

    play = () => {
        let nextState = {...this.state};
        // let nextState = window.structuredClone(this.state);
        if (this.state.guess === this.state.secret) {
            nextState.level++;
            if (nextState.level > 10) {
                //TODO: player wins: routing
                return;
            }
            nextState.moves = [];
            nextState.timeout += 10;
            nextState.lives++;
            nextState.counter = nextState.timeout;
            nextState.secret = createSecret(nextState.level);
        } else {
            let move = createMove(this.state.guess, this.state.secret);
            nextState.moves = [...this.state.moves, move];
            if (nextState.moves.length > nextState.maxMoves) {
                if (nextState.lives === 0) {
                    //TODO: player loses: routing
                    return;
                } else {
                    nextState.lives--;
                    nextState.moves = [];
                    nextState.counter = nextState.timeout;
                    nextState.secret = createSecret(nextState.level);
                }
            }
        }
        this.setState(nextState);
    }

    render() {
        const movesTable =
            <Table columns={["Guess", "Perfect Match", "Partial Match", "Evaluation"]}
                   fields={["guess", "perfectMatch", "partialMatch", "message"]}
                   items={this.state["moves"]}
                   keyField={"guess"}
            />;

        return ( // View
            <Container>
                <Card title={"Game Console"}>
                    <Badge label={"Level"}
                           value={this.state["level"]}
                           color={"bg-success"}/>
                    <Badge label={"Secret"}
                           value={this.state["secret"]}
                           color={"bg-success"}/>
                    <Badge label={"Lives"}
                           value={this.state["lives"]}
                           color={"bg-warning"}/>
                    <Badge label={"Counter"}
                           value={this.state["counter"]}
                           color={"bg-danger"}/>
                    <Badge label={"Moves"}
                           value={this.state["maxMoves"] - this.state["moves"].length}
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
                    {
                        this.state["moves"].length > 0 && movesTable
                    }
                </Card>
            </Container>
        );
    }
}

export default Mastermind;
