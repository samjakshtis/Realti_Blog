"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import MainLayout from "@/components/layout/MainLayout"

interface LocationData {
    city: string
    state: string
    medianHomePrice: number
    medianRent: number
}

const RentVsBuyCalculator = () => {
    const [location, setLocation] = useState<LocationData | null>(null)
    const [homePrice, setHomePrice] = useState(1000000)
    const [monthlyRent, setMonthlyRent] = useState(2000)
    const [downPayment, setDownPayment] = useState(20)
    const [interestRate, setInterestRate] = useState(3.5)
    const [propertyTaxRate, setPropertyTaxRate] = useState(1.5)
    const [yearsToStay, setYearsToStay] = useState(7)
    const [annualRentIncrease, setAnnualRentIncrease] = useState(3)
    const [annualHomeAppreciation, setAnnualHomeAppreciation] = useState(3)
    const [annualHomeMaintenance, setAnnualHomeMaintenance] = useState(3)
    const [annualHomeInsurance, setAnnualHomeInsurance] = useState((homePrice * 0.5) / 100)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [homePrice, monthlyRent, downPayment, interestRate, propertyTaxRate, yearsToStay, annualRentIncrease, annualHomeAppreciation])

    // Calculate the total principal paid over the term using a simple amortization loop
    const calculateAmortization = (loanAmount: number, interestRate: number, years: number) => {
        const monthlyInterestRate = interestRate / 100 / 12
        const numberOfPayments = years * 12
        const monthlyPayment =
            monthlyInterestRate > 0
                ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
                : loanAmount / numberOfPayments

        let remainingLoan = loanAmount
        let totalPrincipalPaid = 0

        for (let i = 0; i < numberOfPayments; i++) {
            const interestPayment = remainingLoan * monthlyInterestRate
            const principalPayment = monthlyPayment - interestPayment
            totalPrincipalPaid += principalPayment
            remainingLoan -= principalPayment
        }

        return totalPrincipalPaid
    }

    const calculateMonthlyMortgage = (loanAmount: number, interestRate: number, years: number) => {
        const monthlyInterestRate = interestRate / 100 / 12
        const numberOfPayments = years * 12
        return monthlyInterestRate > 0
            ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
            : loanAmount / numberOfPayments
    }

    const calculateCosts = () => {
        // Loan amount after down payment
        const loanAmount = homePrice * (1 - downPayment / 100)
        const totalPrincipalPaid = calculateAmortization(loanAmount, interestRate, yearsToStay)

        // Fixed monthly mortgage payment (doesn't change over time)
        const monthlyInterestRate = interestRate / 100 / 12
        const numberOfPayments = yearsToStay * 12
        const monthlyMortgage =
            monthlyInterestRate > 0
                ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
                : loanAmount / numberOfPayments

        let totalRentCost = 0
        let totalBuyCost = 0
        let data = []

        for (let year = 1; year <= yearsToStay; year++) {
            // Exponential growth for rent: apply an annual increase rate.
            const annualRent = monthlyRent * 12 * Math.pow(1 + annualRentIncrease / 100, year - 1)
            totalRentCost += annualRent

            // Update home value based on annual home appreciation
            const homeValue = homePrice * Math.pow(1 + annualHomeAppreciation / 100, year)
            // For buying costs, assume that while the mortgage payment remains fixed,
            // property taxes and insurance scale with the appreciated home value.
            const annualMortgageCost = monthlyMortgage * 12 // constant
            const annualPropertyTax = (homeValue * propertyTaxRate) / 100
            const annualInsurance = (homeValue * 0.5) / 100 // using a fixed 0.5% rate
            const annualOwnershipCost = annualMortgageCost + annualPropertyTax + annualInsurance

            totalBuyCost += annualOwnershipCost

            // Calculate equity using a simplified amortization ratio.
            // This represents the principal paid proportionally, plus home appreciation.
            const equity = homeValue - (loanAmount - (totalPrincipalPaid * (year / yearsToStay)))

            data.push({
                year,
                rent: Math.round(totalRentCost),
                buy: Math.round(totalBuyCost - equity), // net cost after accounting for equity
                equity: Math.round(equity),
                netBuyCost: Math.round(totalBuyCost - equity),
            })
        }

        // Determine the crossover point at the final year.
        const finalData = data[data.length - 1]
        const rentTotal = finalData.rent
        const netBuyTotal = finalData.netBuyCost

        setVerdict(netBuyTotal < rentTotal ? "buy" : "rent")
        setChartData(data)
    }

    const formatDollar = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
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
                                onChange={(e) => setHomePrice(Number(e.target.value.replace(/[^0-9.-]+/g, "")))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="monthlyRent">Monthly Rent</Label>
                            <Input
                                id="monthlyRent"
                                type="text"
                                value={formatDollar(monthlyRent)}
                                onChange={(e) => setMonthlyRent(Number(e.target.value.replace(/[^0-9.-]+/g, "")))}
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
                            <Label htmlFor="annualHomeMaintenance">Annual Home Maintenance (%)</Label>
                            <Slider
                                id="annualHomeMaintenance"
                                min={0}
                                max={10}
                                step={0.1}
                                value={[annualHomeMaintenance]}
                                onValueChange={(value) => setAnnualHomeMaintenance(value[0])}
                            />
                            <span className="text-sm text-gray-500">{annualHomeMaintenance}%</span>
                        </div>
                        <div>
                            <Label htmlFor="annualHomeInsurance">Annual Home Insurance ($)</Label>
                            <Slider
                                id="annualHomeInsurance"
                                min={0}
                                max={5000}
                                step={1}
                                value={[annualHomeInsurance]}
                                onValueChange={(value) => setAnnualHomeInsurance(value[0])}
                            />
                            <span className="text-sm text-gray-500">{formatDollar(annualHomeInsurance)}</span>
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
                        <div>
                            <Label htmlFor="annualRentIncrease">Annual Rent Increase (%)</Label>
                            <Slider
                                id="annualRentIncrease"
                                min={0}
                                max={10}
                                step={0.1}
                                value={[annualRentIncrease]}
                                onValueChange={(value) => setAnnualRentIncrease(value[0])}
                            />
                            <span className="text-sm text-gray-500">{annualRentIncrease}%</span>
                        </div>
                        <div>
                            <Label htmlFor="annualHomeAppreciation">Annual Home Appreciation (%)</Label>
                            <Slider
                                id="annualHomeAppreciation"
                                min={0}
                                max={10}
                                step={0.1}
                                value={[annualHomeAppreciation]}
                                onValueChange={(value) => setAnnualHomeAppreciation(value[0])}
                            />
                            <span className="text-sm text-gray-500">{annualHomeAppreciation}%</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                        <div className="h-96 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 45 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="year"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        label={{
                                            value: "Years",
                                            position: "bottom",
                                            offset: 10,
                                        }}
                                    />
                                    <YAxis
                                        // label={{
                                        //     value: "Cost ($)",
                                        //     angle: -90,
                                        //     position: "insideLeft",
                                        //     offset: -20,
                                        // }}
                                        tickFormatter={(value) => formatDollar(value)}
                                    />
                                    <Tooltip formatter={(value, name) => [formatDollar(value as number), name]} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line type="monotone" dataKey="rent" stroke="#E80458" name="Total Rent Cost" />
                                    <Line type="monotone" dataKey="buy" stroke="#FF4D00" name="Net Buy Cost" />
                                    <Line type="monotone" dataKey="equity" stroke="#5900B3" name="Home Equity" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-96 w-full">
                            {chartData.length > 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-center mb-4">
                                        Based on your inputs, it makes more sense to{" "}
                                        <span className="text-primary uppercase">{verdict}</span>
                                    </h3>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <LineChart
                                            data={chartData.map((data) => ({
                                                year: data.year,
                                                rent: data.rent,
                                                buy: data.buy, // net cost after equity
                                            }))}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 45 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="year"
                                                angle={-45}
                                                textAnchor="end"
                                                height={60}
                                                label={{
                                                    value: "Years",
                                                    position: "bottom",
                                                    offset: 10,
                                                }}
                                            />
                                            <YAxis
                                                // label={{
                                                //     value: "Total Net Cost ($)",
                                                //     angle: -90,
                                                //     position: "insideLeft",
                                                //     offset: -5,
                                                // }}
                                                tickFormatter={(value) => formatDollar(value)}
                                            />
                                            <Tooltip formatter={(value, name) => [formatDollar(value as number), name]} />
                                            <Legend verticalAlign="top" height={36} />
                                            <Line type="monotone" dataKey="rent" stroke="#E80458" name="Total Rent Cost" strokeWidth={2} />
                                            <Line type="monotone" dataKey="buy" stroke="#FF4D00" name="Net Buy Cost" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </>
                            )}
                        </div>
                    </div>

                    {/* New Table for Metrics */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Metric</th>
                                    <th className="py-2 px-4 border-b">Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td className="py-2 px-4 border-b">Down Payment</td>
                                    <td className="py-2 px-4 border-b">{formatDollar(homePrice * (downPayment / 100))}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">Monthly Mortgage Payment</td>
                                    <td className="py-2 px-4 border-b">{formatDollar(calculateMonthlyMortgage(homePrice * (1 - downPayment / 100), interestRate, yearsToStay))}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">Monthly Rent Payment</td>
                                    <td className="py-2 px-4 border-b">{formatDollar(monthlyRent)}</td>
                                </tr>
                                {/* Add more metrics as needed */}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Understanding the Calculations</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-primary">Cost Components</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Mortgage Payment</h4>
                                        <p className="text-gray-600">
                                            Calculated using the loan amount, interest rate, and term. This remains constant, but other costs increase over time.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Property Taxes & Insurance</h4>
                                        <p className="text-gray-600">
                                            Based on the appreciated home value (growing exponentially), these costs increase each year.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Rent</h4>
                                        <p className="text-gray-600">
                                            Rent increases annually at the rate specified by the Annual Rent Increase slider.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-primary">Understanding the Graph</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Total Rent Cost (Pink Line)</h4>
                                        <p className="text-gray-600">Cumulative rental payments, growing exponentially based on rent inflation.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Net Buy Cost (Orange Line)</h4>
                                        <p className="text-gray-600">
                                            Total homeownership expenses minus the accumulated equity. As equity builds, this net cost decreases.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Home Equity (Purple Line)</h4>
                                        <p className="text-gray-600">
                                            The growing value of the home (including principal paydown and appreciation) over time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> This calculator provides estimates based on general assumptions. Market conditions, maintenance costs, and other factors may affect actual costs. Always consult financial and real estate professionals before making any housing decisions.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </MainLayout>
    )
}

export default RentVsBuyCalculator
