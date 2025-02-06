"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from "recharts"
import MainLayout from "@/components/layout/MainLayout"

interface LocationData {
    city: string
    state: string
    medianHomePrice: number
    medianRent: number
}

const RentVsBuyCalculator = () => {
    const [location, setLocation] = useState<LocationData | null>(null)
    const [homePrice, setHomePrice] = useState(4000000)
    const [monthlyRent, setMonthlyRent] = useState(2000)
    const [downPayment, setDownPayment] = useState(20)
    const [interestRate, setInterestRate] = useState(3.5)
    const [propertyTaxRate, setPropertyTaxRate] = useState(1.5)
    const [yearsToStay, setYearsToStay] = useState(7)
    const [chartData, setChartData] = useState<any[]>([])
    const [verdict, setVerdict] = useState<string>("")

    useEffect(() => {
        // Get user's location and fetch real estate data
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const response = await fetch(`/api/location-data?lat=${latitude}&lon=${longitude}`)
                    const data: LocationData = await response.json()
                    console.log(data)
                    setLocation(data)
                    setHomePrice(data.medianHomePrice)
                    setMonthlyRent(data.medianRent)
                } catch (error) {
                    console.error("Error fetching location data:", error)
                }
            })
        }
    }, [])

    useEffect(() => {
        calculateCosts()
    }, [homePrice, monthlyRent, downPayment, interestRate, propertyTaxRate, yearsToStay])

    const calculateCosts = () => {
        const loanAmount = homePrice * (1 - downPayment / 100)
        const monthlyInterestRate = interestRate / 100 / 12
        const numberOfPayments = yearsToStay * 12

        const monthlyMortgage =
            (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

        const monthlyPropertyTax = (homePrice * propertyTaxRate) / 100 / 12
        const monthlyInsurance = (homePrice * 0.5) / 100 / 12 // Assuming 0.5% annual insurance rate

        const monthlyOwnershipCost = monthlyMortgage + monthlyPropertyTax + monthlyInsurance

        const data = []
        let totalRentCost = 0
        let totalBuyCost = 0

        for (let year = 1; year <= yearsToStay; year++) {
            totalRentCost += monthlyRent * 12
            totalBuyCost += monthlyOwnershipCost * 12

            // Assuming 3% annual appreciation for the home
            const homeValue = homePrice * Math.pow(1.03, year)
            const equity = homeValue - loanAmount + monthlyMortgage * 12 * year * 0.7 // Assuming 70% of mortgage payment goes to principal

            data.push({
                year,
                rent: Math.round(totalRentCost),
                buy: Math.round(totalBuyCost),
                equity: Math.round(equity),
            })
        }

        // Add verdict calculation at the end
        const finalData = data[data.length - 1]
        const rentTotal = finalData.rent
        const buyTotal = finalData.buy
        console.log(buyTotal, rentTotal)
        setVerdict(buyTotal < rentTotal ? "buy" : "rent")

        setChartData(data)
    }

    const formatDollar = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value)
    }

    return (
        <MainLayout>
            <Card className="w-full max-w-7xl mx-auto mb-10">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Rent vs. Buy Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                    {location && (
                        <p className="text-center mb-4">
                            Showing data for {location.city}, {location.state}
                        </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label htmlFor="homePrice">Home Price</Label>
                            <Input
                                id="homePrice"
                                type="text"
                                value={formatDollar(homePrice)}
                                onChange={(e) => setHomePrice(Number(e.target.value.replace(/[^0-9.-]+/g, '')))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="monthlyRent">Monthly Rent</Label>
                            <Input
                                id="monthlyRent"
                                type="text"
                                value={formatDollar(monthlyRent)}
                                onChange={(e) => setMonthlyRent(Number(e.target.value.replace(/[^0-9.-]+/g, '')))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="downPayment">Down Payment (%)</Label>
                            <Slider
                                id="downPayment"
                                min={0}
                                max={100}
                                step={1}
                                value={[downPayment]}
                                onValueChange={(value) => setDownPayment(value[0])}
                            />
                            <span className="text-sm text-gray-500">{downPayment}%</span>
                        </div>
                        <div>
                            <Label htmlFor="interestRate">Interest Rate (%)</Label>
                            <Slider
                                id="interestRate"
                                min={0}
                                max={10}
                                step={0.1}
                                value={[interestRate]}
                                onValueChange={(value) => setInterestRate(value[0])}
                            />
                            <span className="text-sm text-gray-500">{interestRate}%</span>
                        </div>
                        <div>
                            <Label htmlFor="propertyTaxRate">Property Tax Rate (%)</Label>
                            <Slider
                                id="propertyTaxRate"
                                min={0}
                                max={5}
                                step={0.1}
                                value={[propertyTaxRate]}
                                onValueChange={(value) => setPropertyTaxRate(value[0])}
                            />
                            <span className="text-sm text-gray-500">{propertyTaxRate}%</span>
                        </div>
                        <div>
                            <Label htmlFor="yearsToStay">Years to Stay</Label>
                            <Slider
                                id="yearsToStay"
                                min={1}
                                max={30}
                                step={1}
                                value={[yearsToStay]}
                                onValueChange={(value) => setYearsToStay(value[0])}
                            />
                            <span className="text-sm text-gray-500">{yearsToStay} years</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                        <div className="h-96 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="year"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        label={{
                                            value: 'Years',
                                            position: 'bottom',
                                            offset: 10
                                        }}
                                    />
                                    <YAxis
                                        label={{
                                            value: 'Cost ($)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: -5
                                        }}
                                        tickFormatter={(value) => formatDollar(value)}
                                    />
                                    <Tooltip formatter={(value, name) => [formatDollar(value as number), name]} />
                                    <Legend />
                                    <Line type="monotone" dataKey="rent" stroke="#E80458" name="Total Rent Cost" />
                                    <Line type="monotone" dataKey="buy" stroke="#FF4D00" name="Total Buy Cost" />
                                    <Line type="monotone" dataKey="equity" stroke="#5900B3" name="Home Equity" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-96 w-full">
                            {chartData.length > 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-center mb-4">
                                        Based on your inputs, it makes more sense to{' '}
                                        <span className="text-primary uppercase">{verdict}</span>
                                    </h3>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <LineChart
                                            data={chartData.map(data => ({
                                                year: data.year,
                                                rent: data.rent,
                                                buy: data.buy // Net cost after equity
                                            }))}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="year"
                                                angle={-45}
                                                textAnchor="end"
                                                height={60}
                                                label={{
                                                    value: 'Years',
                                                    position: 'bottom',
                                                    offset: 10
                                                }}
                                            />
                                            <YAxis
                                                label={{
                                                    value: 'Total Net Cost ($)',
                                                    angle: -90,
                                                    position: 'insideLeft',
                                                    offset: -5
                                                }}
                                                tickFormatter={(value) => formatDollar(value)}
                                            />
                                            <Tooltip formatter={(value, name) => [formatDollar(value as number), name]} />
                                            <Legend />
                                            <Line type="monotone" dataKey="rent" stroke="#E80458" name="Total Rent Cost" strokeWidth={2} />
                                            <Line type="monotone" dataKey="buy" stroke="#FF4D00" name="Net Buy Cost" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Understanding the Calculations</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-primary">Cost Components</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Monthly Mortgage Payment</h4>
                                        <p className="text-gray-600">Calculated using the loan amount, interest rate, and loan term. This represents your primary monthly obligation when buying.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Property Taxes & Insurance</h4>
                                        <p className="text-gray-600">Annual property taxes (based on local rates) and homeowner's insurance (estimated at 0.5% of home value annually) are included in monthly costs.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Home Appreciation</h4>
                                        <p className="text-gray-600">We assume a conservative 3% annual home appreciation rate to calculate future home value and equity.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-primary">Understanding the Graph</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Total Rent Cost (Pink Line)</h4>
                                        <p className="text-gray-600">Shows cumulative rental payments over time, helping you visualize long-term rental expenses.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Total Buy Cost (Orange Line)</h4>
                                        <p className="text-gray-600">Represents the total cost of homeownership, including mortgage, taxes, and insurance payments.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Home Equity (Purple Line)</h4>
                                        <p className="text-gray-600">Shows the building of wealth through principal payments and home appreciation over time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> This calculator provides estimates based on the information entered and general assumptions. Market conditions, maintenance costs, and other factors may affect actual costs. Always consult with financial and real estate professionals before making housing decisions.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </MainLayout>
    )
}

export default RentVsBuyCalculator

