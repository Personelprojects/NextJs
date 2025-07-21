import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});



export async function GET(){
    try{
        const client = await pool.connect();
        try{
            const contracts = await client.query(`
                SELECT id, date, statergy, index, expiry, amount_required, net_points, total_points
                FROM contracts
                WHERE total_points = 0
                ORDER BY created_at DESC
                `);
            return NextResponse.json(
                contracts.rows
            );
        }
        finally{
            client.release();
        }
    }
    catch(error){
        return NextResponse.json({
            error: 'Internal Server Error',
        },{
            status: 500
        }
    );
    }
}