import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select-box";
import {useCallback, useEffect, useMemo, useState, useTransition} from "react";
import io from "socket.io-client";
import Table from "./components/common/table";
import {Line} from "react-chartjs-2";
import {chartOptions, initialChartData} from "./chart-utils";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import Button from "./components/common/button";
import Badge from "./components/common/badge";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip);

// {symbol: "BTCUSDT", price: "112278.29000000", quantity: "0.00016000", timestamp: 1760184367509}
function Algotrader() {
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [trades, setTrades] = useState([]);
    const [totalVolumes, setTotalVolumes] = useState(0);
    const [isMonitoring, setMonitoring] = useState(false);
    const [windowSize, setWindowSize] = useState(100);
    const [chartData, setChartData] = useState(initialChartData);
    const socket = useMemo( () => io("ws://127.0.0.1:5555") , []);
    useEffect( () => {
       socket.on("ticker", trade => {
           if (!isMonitoring) return;
           //if (Number(trade.volume) < 5000) return;
           setTrades(prevTrades => {
               let nextTrades = [...prevTrades, trade];
               if (nextTrades.length > windowSize){
                   nextTrades.splice(0,nextTrades.length-windowSize);
               }
               return nextTrades;
           });
           setChartData(prevChartData => {
               const nextChartData = {...prevChartData};
               nextChartData.labels = [...prevChartData.labels, trade.sequence];
               if (nextChartData.labels.length > windowSize) {
                   nextChartData.labels.splice(0, nextChartData.labels.length - windowSize);
               }
               nextChartData.datasets= [...prevChartData.datasets];
               nextChartData.datasets[0].data = [...prevChartData.datasets[0].data, Number(trade.price)];
               if (nextChartData.datasets[0].data.length > windowSize) {
                   nextChartData.datasets[0].data.splice(0, nextChartData.datasets[0].data.length - windowSize);
               }
               return nextChartData;
           });
       });
       return () => {
           socket.off("ticker");
       }
    }, [isMonitoring,windowSize]);
    const handleSymbolChange = useCallback(
        e => setSymbol(e.target.value)
        , []);
    const handleWindowSizeChange = useCallback(
        e => setWindowSize(e.target.value)
        , []);
    const monitoringButton = useMemo(() => <>
        {!isMonitoring &&
            <Button click={() => setMonitoring(true)} color={"btn-success"} label={"Start Monitoring"}></Button>}
        {isMonitoring &&
            <Button click={() => setMonitoring(false)} color={"btn-danger"} label={"Stop Monitoring"}></Button>}
    </>, [isMonitoring]);

    const [isPending, startTransition] = useTransition();

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
        if(trades && trades.length > 0 )
        setTotalVolumes(trades.reduce((acc,{volume})=>acc+Number(volume),0));
    }, [trades]);
    return (
        <Container>
            <Card title={"Market Data"}>
                <SelectBox label={"Symbol"}
                           options={symbols}
                           value={symbol}
                           id={"symbol"}
                           isPending={isPending}
                           change={e => setSymbol(e.target.value)}/>
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
