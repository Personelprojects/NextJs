import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});


export async function GET(
    request: Request,
    {params}:{params:{id:string}}
){
    try{
        const client = await pool.connect();
        try{
            const contract = await client.query(
                'SELECT * FROM contracts WHERE id = $1',
                [params.id]
            );
            if(contract.rows.length === 0){
                return NextResponse.json(
                    {error: 'Contract not Found'},
                    { status: 404 }
                );
            }
            const options = await client.query(
                'SELECT * FROM options WHERE contract_id = $1 ORDER BY id',
                [params.id]
            );

            return NextResponse.json(
                {
                    contract: contract.rows[0],
                    options: options.rows,
                }
            );
        }
        finally{
            client.release();
        }
    }
    catch(error){
        return NextResponse.json(
            {
                error:'Internal Server Error'
            },
            {
                status: 500
            }
        );
    }
}