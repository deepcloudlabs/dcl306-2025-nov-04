import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select-box";
import {useCallback, useEffect, useMemo, useState,useRef} from "react";
import React from "react";
import io from "socket.io-client";
import Table from "./components/common/table";
import {Line} from "react-chartjs-2";
import {chartOptions, initialChartData} from "./chart-utils";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import Button from "./components/common/button";
import Badge from "./components/common/badge";

const SOCKET_URL = "ws://127.0.0.1:5555";

const toNumber = (val) => {
    const n = typeof val === "number" ? val : Number(val);
    return Number.isFinite(n) ? n : 0;
};

const clampWindow = (arr, max) => (arr.length <= max ? arr : arr.slice(arr.length - max));

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip);

// {symbol: "BTCUSDT", price: "112278.29000000", quantity: "0.00016000", timestamp: 1760184367509}
function Algotrader() {
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [trades, setTrades] = useState([]);
    const [totalVolumes, setTotalVolumes] = useState(0);
    const [isMonitoring, setMonitoring] = useState(false);
    const [windowSize, setWindowSize] = useState(100);
    const socket = useMemo(() => io(SOCKET_URL), []);

    const windowSizeRef = useRef(windowSize);
    useEffect(() => {
        windowSizeRef.current = windowSize;
    }, [windowSize]);

    const socketRef = useRef(socket);

    useEffect(() => {
        if (!isMonitoring) return;

        const socket = io(SOCKET_URL, {
            transports: ["websocket"], // prefer WS in case polling is disabled on the server
            autoConnect: true,
        });
        socketRef.current = socket;

        const onTicker = (trade) => {
            // Shape expected: { symbol, price, quantity, volume?, sequence, timestamp }
            setTrades((prev) => {
                return clampWindow([...prev, trade], windowSizeRef.current);
            });
        };

        socket.on("ticker", onTicker);

        return () => {
            socket.off("ticker", onTicker);
            socket.disconnect();
            socketRef.current = null;
        };
    }, [isMonitoring]);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch("https://api.binance.com/api/v3/ticker/price", {
                    signal: controller.signal,
                });
                const tickers = await res.json();
                if (ignore) return;

                // sort, filter, map — price is a string in Binance API
                startTransition(() => {
                    const sorted = [...tickers].sort((a, b) => a.symbol.localeCompare(b.symbol));
                    const retrieved = sorted
                        .filter(({price}) => toNumber(price) > 100)
                        .map(({symbol}) => symbol);
                    setSymbols(retrieved);
                });
            } catch (e) {
                if (e.name !== "AbortError") {
                    console.error("Failed to load tickers:", e);
                }
            }
        })();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, []);

    const chartData = useMemo(() => {
        const labels = trades.map((t) => t.sequence ?? t.timestamp ?? "");
        const prices = trades.map((t) => toNumber(t["price"]));
        // keep any visual config from initialChartData, only replace labels and data
        const first = initialChartData.datasets?.[0] ?? {label: "Price", data: []};
        return {
            ...initialChartData,
            labels,
            datasets: [
                {
                    ...first,
                    data: prices,
                },
            ],
        };
    }, [trades]);

    const handleSymbolChange = useCallback(
        e => setSymbol(e.target.value)
        , []);

    const handleWindowSizeChange = useCallback((e) => {
        const n = toNumber(e.target.value);
        setWindowSize(n > 0 ? n : 1);
        // Also trim current trades to avoid sudden long arrays
        setTrades((prev) => clampWindow(prev, n > 0 ? n : 1));
    }, []);

    const handleStartStop = useCallback(() => {
        setMonitoring((prev) => !prev);
    }, []);


    const monitoringButton = useMemo(
        () =>
            !isMonitoring ? (
                <Button
                    click={handleStartStop}
                    color={"btn-success"}
                    label={"Start Monitoring"}
                    disabled={!symbol}
                />
            ) : (
                <Button click={handleStartStop} color={"btn-danger"} label={"Stop Monitoring"}/>
            ),
        [isMonitoring, handleStartStop, symbol]
    );

    const [isPending, startTransition] = React.useTransition();

    useEffect(() => {
        fetch('https://api.binance.com/api/v3/ticker/price')
            .then(res => res.json())
            .then(tickers => {
                startTransition(() => {
                    tickers.sort((t1, t2) => t2.symbol.localeCompare(t1.symbol));
                    const retrieved_symbols = tickers.filter(({price}) => price > 100)
                        .map(({symbol}) => symbol);
                    setSymbols(retrieved_symbols);
                });
            });
    }, []);
    useEffect(() => {
        if (trades && trades.length > 0)
            setTotalVolumes(trades.reduce((acc, {volume}) => acc + Number(volume), 0).toFixed(2));
    }, [trades]);

    return (
        <Container>
            <Card title={"Market Data"}>
                <SelectBox label={"Symbol"}
                           options={symbols}
                           value={symbol}
                           id={"symbol"}
                           isPending={isPending}
                           change={handleSymbolChange}/>
                <SelectBox label={"Window Size"}
                           options={[10, 25, 50, 100]}
                           value={windowSize}
                           id={"windowSize"}
                           change={handleWindowSizeChange}/>
                {monitoringButton}
            </Card>
            <p></p>
            <Card title={"Market Chart"}>
                <Line data={chartData}
                      width={1080}
                      height={720}
                      options={chartOptions}/>
            </Card>
            <p></p>
            <Card title={"Trades Data"}>
                <Badge displayOnly={false}
                       label={"Total Volume"}
                       value={totalVolumes}
                       isVisible={isMonitoring}
                       color={"bg-primary"}/>
                <Table fields={["sequence", "price", "quantity", "volume", "timestamp"]}
                       items={trades}
                       keyField={"sequence"}
                       column_names={["Sequence", "Price", "Quantity", "Volume", "Timestamp"]}/>
            </Card>
        </Container>
    );
}

export default Algotrader;
