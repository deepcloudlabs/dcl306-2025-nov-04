const symbols = require("./symbols.json");
async function get_tickers() {
    let tickers = [];
    console.log("BEFORE THE FOR LOOP");
    for (const symbol of symbols){
        let ticker = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
            .then( res => res.json());
        console.log(ticker);
        tickers.push(ticker);
    }
    console.log("AFTER THE FOR LOOP");
    return tickers;
}

get_tickers().then(tickers => console.log(tickers));
