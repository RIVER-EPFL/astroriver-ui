
import Plot from 'react-plotly.js';


export const HighFrequencyPlot = () => {
    // Generate 100 data points over 2 years
    const startDate = new Date('2024-01-01'); // Start date
    const endDate = new Date('2026-01-01'); // End date
    const interval = (endDate - startDate) / 99; // Calculate interval between each point

    // Generate time series data with evenly spaced timestamps and random values for demonstration
    const timeSeriesData = Array.from({ length: 100 }, (_, index) => {
        const timestamp = new Date(startDate.getTime() + index * interval).toISOString().split('T')[0];
        const value = Math.random() * 100; // Random value for demonstration
        return { timestamp, value };
    });

    // Extract x and y values from time series data
    const xValues = timeSeriesData.map(dataPoint => dataPoint.timestamp);
    const yValues = timeSeriesData.map(dataPoint => dataPoint.value);

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'blue' }, // Customize marker color if needed
                },
            ]}
            layout={{
                width: 1000, height: 400, title: 'Sensor high frequency time series',
                xaxis: {
                    rangeselector: {
                        buttons: [
                            {
                                count: 1,
                                label: '1m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {
                                count: 6,
                                label: '6m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            { step: 'all' }
                        ]
                    },
                    rangeslider: { range: [startDate, endDate] },
                    range: ["2024-01-01", "2024-06-01"],
                    type: 'date'
                }
            }}

        />
    )
}

export default HighFrequencyPlot;