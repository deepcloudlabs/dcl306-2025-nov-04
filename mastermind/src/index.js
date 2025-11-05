import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import MastermindHook from "./MastermindHook";
import {BrowserRouter, Route, Routes} from "react-router";
import PlayerWins from "./components/use-cases/player-wins";
import PlayerLoses from "./components/use-cases/player-loses";
import MastermindProvider from "./providers/mastermind-provider";

const routing = <Routes>
    <Route path="/" element={<MastermindProvider/>}  exact/>
    <Route path="/wins" element={<PlayerWins/>}/>
    <Route path="/loses" element={<PlayerLoses/>}/>
</Routes>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {routing}
    </BrowserRouter>
);
