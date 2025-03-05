import { Expenditure } from '@/lib/hooks/Expenditure';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';

type ExpendituresContextType = {
    expenditures: Expenditure[];
    counties: String[];
};
  
const ExpendituresContext = createContext<ExpendituresContextType | undefined>(undefined);
  
export const ExpendituresProvider = ({ children }: { children: ReactNode }) => {
    const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
    const [counties, setCounties] = useState<String[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/texas-expenditures-by-county.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch expenditure data');
                }
                const result = await response.json();

                // Get the counties
                let allTheCounties: String[] = [];
                result.data.forEach((obj: any) => {
                    if (allTheCounties.length == 0 || allTheCounties[allTheCounties.length - 1] != obj[10]) {
                        allTheCounties.push(obj[10]);
                    }
                });
                allTheCounties =[...new Set(allTheCounties)].sort();
                setCounties(allTheCounties);

                // Transform from the gross source data
                const transformed: Expenditure[] = result.data.map((x: any) => {
                    const output: Expenditure = {
                        agencyName: x[14],
                        county: x[10],
                        category: x[11],
                        amount: x[12]
                    }

                    return output;
                });
                setExpenditures(transformed);
            }
            catch (err) {
                // TODO: Do something reasonable
                console.log('err', err);
            }
        }
        fetchStats();
    }, []);

    return (
        <ExpendituresContext.Provider value={{ expenditures, counties }}>
          {children}
        </ExpendituresContext.Provider>
    );
};

export const useExpenditures = () => {
    const context = useContext(ExpendituresContext);
    if (context === undefined) {
        throw new Error("useExpenditures must be used within a TasksProvider");
    }
    return context;
};