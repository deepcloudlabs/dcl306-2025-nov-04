export const chartOptions = {
    responsive: false,
    animation: false,
    maintainAspectRatio: true,
    scales: {
        y: {
            type: 'linear',
            position: 'left',
            stack: 'demo',
            stackWeight: 2
        }
    },
    plugins: {
        legend: {position: 'top'},
        title: {display: true, text: 'BINANCE Market Data'}
    }
};

export const initialChartData = {
    labels: [],
    datasets: [
        {
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};