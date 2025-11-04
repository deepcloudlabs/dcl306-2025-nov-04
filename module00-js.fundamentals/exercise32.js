const symbols = require("./symbols.json");

async function get_tickers(start=0,length=3000) {
    let tickers = [];
    console.log("BEFORE THE FOR LOOP");
    for (const symbol of symbols.slice(start,start+length)){
        let ticker = fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
            .then( res => res.json());
        tickers.push(ticker);
    }
    console.log("AFTER THE FOR LOOP");
    return Promise.all(tickers);
}

get_tickers(1,200).then(tickers => console.log(tickers));
