import { Expenditure } from './lib/hooks/Expenditure';
import { useExpenditures } from './lib/hooks/use-texas-expenditures';
import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select"
import { useState } from 'react';
import { useCopilotReadable } from '@copilotkit/react-core';


export default function Expenditures() {

    const { expenditures, counties } = useExpenditures();
    const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
    const [currentExpenditures, setCurrentExpenditures] = useState<Expenditure[]>([]);

    const onSelectChanged = (value: string) => {
        setSelectedCounty(value);

        setCurrentExpenditures(expenditures.filter(x => x.county === value));
    }

    const stringifiedData = JSON.stringify(currentExpenditures.map(x => { return {
        agencyName: x.agencyName,
        category: x.category,
        amount: x.amount
    }}));

    useCopilotReadable({
        description: "The state of the todo list",
        value: stringifiedData,
    });

    let expenditureCountDisplay = null;
    if (selectedCounty != null) {
        expenditureCountDisplay = <p className="my-5">Total expenditures for the selected county: <b>{currentExpenditures.length}</b></p>
    }

    const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let table = null;
    if (currentExpenditures.length > 0) {
        table = <table>
            <thead>
                <tr>
                    <th className="py-3">Agency Name</th>
                    <th>County</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>

            {currentExpenditures.map((x: Expenditure, i: number) => (
                <tr key={i}>
                    <td className="px-4">{x.agencyName}</td>
                    <td className="px-4">{x.county}</td>
                    <td className="px-4">{x.category}</td>
                    <td className="px-4">{moneyFormatter.format(x.amount)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    }

    return (
        <>
            <h1 className='text-2xl'>Texas Expenditures by County</h1>

            <Select onValueChange={onSelectChanged}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose a county" />
                </SelectTrigger>
                <SelectContent>
                    {counties.map((county: String, i: number) => {
                        return (
                            <SelectItem key={i} value={county} selected={selectedCounty === county}>
                                {county}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>

            {expenditureCountDisplay}

            {table}
        </>
    )
}