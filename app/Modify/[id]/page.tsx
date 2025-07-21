'use client';


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Contract = {
  id: number;
  date: string;
  statergy: string;
  index: string;
  expiry: string;
  amount_required: number;
  net_points: number;
  total_points: number;
};

type Option = {
    id: number;
    contract_id: number;
    option_type: string;
    strike_price: number;
    order_type: string;
    price: number;
    profit_points: number;
    ltp: number;
};


export default function ModifyPage(){
    const { id } = useParams();
    const [ contract, setContract ] = useState<Contract | null>(null);
    const [ options,setOptions ] = useState<Option[]>([]);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/contracts/${id}`)
        .then(res => res.json())
        .then(data => {
            setContract(data.contract);
            setOptions(data.options);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, [id]);

    if(loading) return <div>Loading...</div>
    if(!contract) return <div>Contract Not Found.</div>


    return (
        <div>
            <h2>Edit the Open Positions</h2>
            <div>
                <div>
                    Date:- {contract.date}
                </div>
                <div>
                    Statergy:- {contract.statergy}
                </div>
                <div>
                    Index:- {contract.index}
                </div>
                <div>
                    Expiry:- {contract.expiry}
                </div>
                <div>
                    Amount Required: {contract.amount_required}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Option Type</th>
                            <th>Strike Price</th>
                            <th>Order Type</th>
                            <th>Price</th>
                            <th>Profit Points</th>
                            <th>Last Traded Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {options.length ? (
                            options.map(option => (
                                <tr key={option.id}>
                                    <td>{option.option_type}</td>
                                    <td>{option.strike_price}</td>
                                    <td>{option.order_type}</td>
                                    <td>{option.price}</td>
                                    <td>{option.profit_points}</td>
                                    <td>{option.ltp}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No Options</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div>Net Points: {contract.net_points}</div>
                <div>Current Points: {contract.total_points}</div>
            </div>
        </div>
    );
}