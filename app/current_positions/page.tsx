'use client';
import { useEffect,useState } from "react";
import Link from "next/link";

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




export default function OpenPositionsPage(){
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('api/open-positions')
        .then(res => res.json())
        .then(data => {
            setContracts(data);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, []);

    if(loading) return <div>Loading...</div>;
    if(!contracts.length) return <div>No Open Positions.</div>


    return (
        <div>
            <Link href='./' className="nav-link">Home</Link>
            <h2>Edit the Open Positions</h2>
            <ul>
                {contracts.map(contract => (
                    <li key={contract.id}>
                        <Link href={`/modify/${contract.id}`}>
                            Contract #{contract.id}: {contract.statergy}, {contract.index}, {contract.date}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}