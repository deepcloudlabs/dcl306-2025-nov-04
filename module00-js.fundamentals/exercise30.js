fetch("https://api.binance.com/api/v3/ticker/price")
     .then(res => res.json())
     .then(tickers => {
         tickers.sort((t1,t2)=>t2.price-t1.price)
         tickers.forEach( ({symbol,price}) => console.log(symbol,price))
     });
