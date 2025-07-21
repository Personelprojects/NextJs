import type { NextApiRequest,NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT)
});

export async function GET(){
    try{
        const client = await pool.connect();
        const result = await client.query("SELECT NOW()");
        client.release();
        return NextResponse.json({
            connected:true,
            time: result.rows[0].now
        });
    }
    catch(error){
        return NextResponse.json({
            connected:false,
            error:String(error)
        },{status:500});
    }
}