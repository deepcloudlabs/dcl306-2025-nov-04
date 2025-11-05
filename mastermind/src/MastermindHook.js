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
import {useNavigate} from "react-router";

const initialSecret = createSecret(3);

const stateAsJson = localStorage.getItem("mastermind-v1");

function getStateFromLocalStorage(item_name,default_value) {
    if (stateAsJson) {
       return JSON.parse(stateAsJson)[item_name];
    }
    return default_value;
}

export default function MastermindHook() {
    //region define states using useState()
    let [secret, setSecret] = React.useState(()=>{
        return getStateFromLocalStorage("secret",initialSecret);
    });
    let [guess, setGuess] = React.useState(()=>{
        return getStateFromLocalStorage("guess",123);
    });
    let [level, setLevel] = React.useState(3);
    let [lives, setLives] = React.useState(3);
    let [moves, setMoves] = React.useState([]);
    let [maxMoves, setMaxMoves] = React.useState(10);
    let [maxCounter, setMaxCounter] = React.useState(90);
    let [counter, setCounter] = React.useState(10);
    //endregion

    //region action methods
    function countDown() {
        setCounter(prevCounter => {
            // console.log(`inside countDown(): counter: ${prevCounter}`);
            return prevCounter - 1;}
        );
    }

    function handleGuessChange(event) {
        setGuess(Number(event.target.value));
    }

    function play() {
        if (guess === secret) {
            setLevel(prevLevel => prevLevel + 1);
            if (level === 10) {
                navigate("/wins");
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
                    navigate("/loses");
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
    const navigate = useNavigate();

    //endregion

    useEffect(() => {
        //console.log("timer's initialization in useEffect()....");
        const timerId = setInterval(countDown, 1_000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        //console.log(`counter is updated => useEffect()...:${counter}`);
        if (counter <= 0) {
            if (lives === 0) {
                navigate("/loses");
                return;
            } else {
                setLives(prevLives => prevLives - 1);
                setMoves([]);
                setCounter(maxCounter);
                setSecret(createSecret(level));
            }
        }
    }, [counter]);

    useEffect(() => {
        const stateAsJson = localStorage.getItem("mastermind-v1");
        if (stateAsJson) {
            const state = JSON.parse(stateAsJson);
            setLevel(state.level);
            //setSecret(state.secret);
            setLives(state.lives);
            //setGuess(state.guess);
            setCounter(state.counter);
            setMoves(state.moves);
            setMaxMoves(state.maxMoves);
            setMaxCounter(state.maxCounter);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("mastermind-v1",JSON.stringify({
            level,secret,lives,moves,guess,counter,maxMoves,maxCounter
        }));
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
