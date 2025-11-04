const binance_wss_url = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const WebSocket = require('ws');
const ws = new WebSocket(binance_wss_url);
ws.on("message", async payload => {
    const trade = JSON.parse(payload);
    console.log(trade);
});
