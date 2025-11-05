/*
   Component: 1. Stateless -> function
              2. Stateful -> Class, function with React Hooks: useState

 */
import React, {useEffect, useTransition} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import createSecret, {createMove} from "./utils/mastermind-util";
import InputText from "./components/common/input-text";
import Badge from "./components/common/badge";
import Button from "./components/common/button";
import Table from "./components/common/table";

const initialSecret = createSecret(3);

export default function MastermindHook() {
    //region define states using useState()
    let [secret, setSecret] = React.useState(initialSecret);
    let [guess, setGuess] = React.useState(123);
    let [level, setLevel] = React.useState(3);
    let [lives, setLives] = React.useState(3);
    let [moves, setMoves] = React.useState([]);
    let [maxMoves, setMaxMoves] = React.useState(10);
    let [maxCounter, setMaxCounter] = React.useState(90);
    let [counter, setCounter] = React.useState(10);
    //endregion

    //region action methods
    function countDown() {
        setCounter(prevCounter => prevCounter - 1);
        if (counter <= 0) {
            if (lives === 0) {
                //TODO: player loses: routing
                return;
            } else {
                setLives(prevLives => prevLives - 1);
                setMoves([]);
                setCounter(maxCounter);
                setSecret(createSecret(level));
            }
        }
    }

    function handleGuessChange(event) {
        setGuess(Number(event.target.value));
    }

    function play() {
        if (guess === secret) {
            setLevel(prevLevel => prevLevel + 1);
            if (level === 10) {
                //TODO: player wins: routing
                return;
            }
            setMoves([]);
            setMaxCounter(prevMaxCount => prevMaxCount + 10);
            setLives(prevLives => prevLives + 1);
            setCounter(maxCounter + 10);
            setSecret(createSecret(level + 1));
        } else {
            let move = createMove(guess, secret);
            setMoves(prevMoves => [...prevMoves, move]);
            if (moves.length >= maxMoves) {
                if (lives === 0) {
                    //TODO: player loses: routing
                    return;
                } else {
                    setLives(prevLives => prevLives - 1);
                    setMoves([]);
                    setCounter(maxCounter);
                    setSecret(createSecret(level));
                }
            }
        }
    }

    //endregion

    useEffect(() => {
        const timerId = setInterval(countDown, 1_000);
        return () => {
            clearInterval(timerId);
        };
    });


    const movesTable =
        <Table columns={["Guess", "Perfect Match", "Partial Match", "Evaluation"]}
               fields={["guess", "perfectMatch", "partialMatch", "message"]}
               items={moves}
               keyField={"guess"}
        />;

    return ( // View
        <Container>
            <Card title={"Game Console"}>
                <Badge label={"Level"}
                       value={level}
                       color={"bg-success"}/>
                <Badge label={"Secret"}
                       value={secret}
                       color={"bg-success"}/>
                <Badge label={"Lives"}
                       value={lives}
                       color={"bg-warning"}/>
                <Badge label={"Counter"}
                       value={counter}
                       color={"bg-danger"}/>
                <Badge label={"Moves"}
                       value={maxMoves - moves.length}
                       color={"bg-primary"}/>
                <InputText type={"text"}
                           name={"guess"}
                           label={"Guess"}
                           placeholder={"Enter your guess"}
                           onChange={handleGuessChange}
                           value={guess}>
                    <Button label={"Play"} color={"success"}
                            click={play}></Button>
                </InputText>
                {
                    moves.length > 0 && movesTable
                }
            </Card>
        </Container>
    );
}
