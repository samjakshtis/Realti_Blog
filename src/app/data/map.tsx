import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for demonstration
const sampleData = {
    California: [{ name: 'Metric1', value: 400 }, { name: 'Metric2', value: 300 }],
    Texas: [{ name: 'Metric1', value: 200 }, { name: 'Metric2', value: 100 }],
    NewYork: [{ name: 'Metric1', value: 200 }, { name: 'Metric2', value: 100 }],
    Florida: [{ name: 'Metric1', value: 200 }, { name: 'Metric2', value: 100 }],
    Illinois: [{ name: 'Metric1', value: 200 }, { name: 'Metric2', value: 100 }],
    Pennsylvania: [{ name: 'Metric1', value: 200 }, { name: 'Metric2', value: 100 }],
};

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";


// Define a type for the state keys
type StateKeys = keyof typeof sampleData;

interface GraphData {
    title: string;
    seriesId: string;
    data: any[];
}

const MapWithGraphs = () => {
    const [selectedState, setSelectedState] = useState<StateKeys | null>(null);
    const [selectedFips, setSelectedFips] = useState<string | null>(null);
    const [countyGraphs, setCountyGraphs] = useState<GraphData[]>([]);
    const [stateGraphs, setStateGraphs] = useState<GraphData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Define the series we want to fetch
    const seriesList = [
        { id: 'MEDLISPRI', title: 'Median List Price' },
        { id: 'AVELISPRI', title: 'Average List Price' },
        { id: 'MEDLISPRIPERSQUFEE', title: 'Median List Price Per Square Foot' },
        { id: 'MEDDAYONMAR', title: 'Median Days on Market' },
        { id: 'NEWLISCOU', title: 'New Listings' },
        { id: 'TOTLISCOU', title: 'Total Listings' },
    ];

    const fetchFredData = async (fipsCode: string, stateCode: string) => {
        setIsLoading(true);
        try {
            const countyPromises = seriesList.map(async (series) => {
                const response = await fetch(`/api/fred-data?fips_code=${fipsCode}&is_state=false&series_id=${series.id}`);
                const result = await response.json();
                return {
                    title: series.title,
                    seriesId: series.id,
                    data: result.observations ? result.observations.sort((a: any, b: any) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    ) : []
                };
            });

            const statePromises = seriesList.map(async (series) => {
                const response = await fetch(`/api/fred-data?fips_code=${stateCode}&is_state=true&series_id=${series.id}`);
                const result = await response.json();
                return {
                    title: series.title,
                    seriesId: series.id,
                    data: result.observations ? result.observations.sort((a: any, b: any) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    ) : []
                };
            });

            const countyResults = await Promise.all(countyPromises);
            const stateResults = await Promise.all(statePromises);

            setCountyGraphs(countyResults);
            setStateGraphs(stateResults);
        } catch (error) {
            console.error('Error fetching FRED data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStateClick = (countyName: string, fipsCode: string) => {
        const cleanFips = fipsCode.replace(/\D/g, '');
        const stateCode = cleanFips.slice(0, 2); // Extract the first two digits for state

        // Map FIPS state codes to state names (you can expand this list)
        const fipsToState: { [key: string]: string } = {
            '01': 'Alabama', '02': 'Alaska', '04': 'Arizona', '05': 'Arkansas',
            '06': 'California', '08': 'Colorado', '09': 'Connecticut', '10': 'Delaware',
            '12': 'Florida', '13': 'Georgia', '15': 'Hawaii', '16': 'Idaho',
            '17': 'Illinois', '18': 'Indiana', '19': 'Iowa', '20': 'Kansas',
            '21': 'Kentucky', '22': 'Louisiana', '23': 'Maine', '24': 'Maryland',
            '25': 'Massachusetts', '26': 'Michigan', '27': 'Minnesota', '28': 'Mississippi',
            '29': 'Missouri', '30': 'Montana', '31': 'Nebraska', '32': 'Nevada',
            '33': 'New Hampshire', '34': 'New Jersey', '35': 'New Mexico', '36': 'New York',
            '37': 'North Carolina', '38': 'North Dakota', '39': 'Ohio', '40': 'Oklahoma',
            '41': 'Oregon', '42': 'Pennsylvania', '44': 'Rhode Island', '45': 'South Carolina',
            '46': 'South Dakota', '47': 'Tennessee', '48': 'Texas', '49': 'Utah',
            '50': 'Vermont', '51': 'Virginia', '53': 'Washington', '54': 'West Virginia',
            '55': 'Wisconsin', '56': 'Wyoming'
        };

        const stateName = fipsToState[stateCode] || 'Unknown State';

        setSelectedState(stateName as StateKeys); // Set state name instead of county
        setSelectedFips(cleanFips);
        fetchFredData(cleanFips, stateCode);
    };

    return (
        <div className="flex flex-col items-center space-y-8">
            <h2 className="text-2xl font-bold">Click on a County and See Insights</h2>
            <h3 className="text-sm text-gray-500">Click on a County and See Insights for the county and state. Some counties are not available.</h3>

            {/* Map Section */}
            <div className="flex flex-col items-center justify-center w-2/3 h-2/3">
                <ComposableMap projection="geoAlbersUsa">
                    <Geographies geography={geoUrl}>
                        {({ geographies }: { geographies: any }) =>
                            geographies.map((geo: any) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#EEE"
                                    onClick={() => handleStateClick(geo.properties.name, geo.id)}
                                    style={{
                                        default: { fill: "#ffffff", stroke: "#000000", strokeWidth: geo.properties.level === 'state' ? 1 : 0.5 },
                                        hover: {
                                            fill: "#FF4D00", stroke: "#000", strokeWidth: geo.properties.level === 'state' ? 1 : 0.5
                                        },
                                        pressed: { fill: "#FF4D00", stroke: "#000", strokeWidth: geo.properties.level === 'state' ? 1 : 0 }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </div>

            {/* Data Section */}
            {selectedState && selectedFips && (
                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* County Graphs Column */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-4">{selectedState} County Data</h2>
                            {countyGraphs.map((graph, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4">{graph.title}</h3>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-64">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height={450}>
                                            <LineChart data={graph.data}>
                                                <XAxis
                                                    dataKey="date"
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={80}
                                                />
                                                <YAxis
                                                    domain={[0, Math.max(...graph.data.map((d: any) => parseFloat(d.value))) + 100]}
                                                />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#FF4D00"
                                                    name={`County ${graph.title}`}
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* State Graphs Column */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-4">{selectedState} Data</h2>
                            {stateGraphs.map((graph, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4">{graph.title}</h3>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-64">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height={450}>
                                            <LineChart data={graph.data}>
                                                <XAxis
                                                    dataKey="date"
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={80}
                                                />
                                                <YAxis
                                                    domain={[0, Math.max(...graph.data.map((d: any) => parseFloat(d.value))) + 100]}
                                                />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#5900B3"
                                                    name={`State ${graph.title}`}
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapWithGraphs;
