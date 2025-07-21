import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool(
    {
        user:process.env.PG_USER,
        host:process.env.PG_HOST,
        database:process.env.PG_DATABASE,
        password:process.env.PG_PASSWORD,
        port:Number(process.env.PG_PORT),
    }
);


export async function POST(request:Request){
    try{
        const { content } = await request.json();
        if(!content || typeof content !== 'string'){
            return NextResponse.json(
                {
                    message:'Invalid note Content'
                },
                {
                    status:400
                }
            );
        }
        const client = await pool.connect();
        const insertQuery = 'INSERT INTO notes (content) VALUES ($1) RETURNING id,created_at';
        const result = await client.query(insertQuery,[content]);
        client.release();

        return NextResponse.json(
            {
                message:'Notes Saved',note: result.rows[0]
            },
            {
                status: 201
            }
        );
    }
    catch(error){
        return NextResponse.json(
            {
                message:'Failed to save note',error:String(error)
            },
            {
                status:500
            }
        );
    }
}