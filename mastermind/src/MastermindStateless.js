/*
   Component: 1. Stateless -> function
              2. Stateful -> Class, function with React Hooks: useState

 */
import Container from "./components/common/container";
import Card from "./components/common/card";
import InputText from "./components/common/input-text";
import Badge from "./components/common/badge";
import Button from "./components/common/button";
import Table from "./components/common/table";
import {useContext, useEffect} from "react";
import {MastermindContext} from "./providers/mastermind-provider";

export default function MastermindStateless() {
    const {mastermind, dispatchMastermind} = useContext(MastermindContext);
    const movesTable =
        <Table columns={["Guess", "Perfect Match", "Partial Match", "Evaluation"]}
               fields={["guess", "perfectMatch", "partialMatch", "message"]}
               items={mastermind.moves}
               keyField={"guess"}
        />;

    function handleGuessChange(event){
        dispatchMastermind({type: "GUESS_CHANGED", payload: Number(event.target.value)});
    }

    function play(){
        dispatchMastermind({type: "PLAY"});
    }

    useEffect(() => {
        const timer = setInterval(() => {
            dispatchMastermind({type: "TIME_CHANGED"});
        }, 1_000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    return ( // View
        <Container>
            <Card title={"Game Console"}>
                <Badge label={"Level"}
                       value={mastermind.level}
                       color={"bg-success"}/>
                <Badge label={"Secret"}
                       value={mastermind.secret}
                       color={"bg-success"}/>
                <Badge label={"Lives"}
                       value={mastermind.lives}
                       color={"bg-warning"}/>
                <Badge label={"Counter"}
                       value={mastermind.counter}
                       color={"bg-danger"}/>
                <Badge label={"Moves"}
                       value={mastermind.maxMoves - mastermind.moves.length}
                       color={"bg-primary"}/>
                <InputText type={"text"}
                           name={"guess"}
                           label={"Guess"}
                           placeholder={"Enter your guess"}
                           onChange={handleGuessChange}
                           value={mastermind.guess}>
                    <Button label={"Play"} color={"success"}
                            click={play}></Button>
                </InputText>
                {
                    mastermind.moves.length > 0 && movesTable
                }
            </Card>
        </Container>
    );
}
