import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select-box";
import {useState} from "react";
import io from "socket.io-client";
import Table from "./components/common/table";
import {Line} from "react-chartjs-2";
import {chartOptions, initialChartData} from "./chart-utils";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip);

// {symbol: "BTCUSDT", price: "112278.29000000", quantity: "0.00016000", timestamp: 1760184367509}
function Algotrader() {
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [trades, setTrades] = useState([]);
    const [isMonitoring, setMonitoring] = useState(false);
    const [windowSize, setWindowSize] = useState(10);
    const [chartData, setChartData] = useState(initialChartData);

    const handleSymbolChange = /* TODO: implement this*/ undefined;
    const handleWindowSizeChange = /* TODO: implement this*/ undefined;
    const monitoringButton = /* TODO: implement this*/ undefined;

    return (
        <Container>
            <Card title={"Market Data"}>
                <SelectBox label={"Symbol"}
                           options={symbols}
                           value={symbol}
                           id={"symbol"}
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
                <Table fields={["sequence", "price", "quantity", "volume", "timestamp"]}
                       items={trades}
                       keyField={"sequence"}
                       column_names={["Sequence", "Price", "Quantity", "Volume", "Timestamp"]}/>
            </Card>
        </Container>
    );
}

export default Algotrader;
