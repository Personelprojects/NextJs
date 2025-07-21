import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});

export async function POST(req: Request){
    try{


        const {mainContract, options} = await req.json();
        const client = await pool.connect();
        try{
            await client.query('BEGIN');
            const contractInsert = `
            INSERT INTO contracts (date, statergy, index, expiry, amount_required, net_points, total_points)
            VALUES ($1, $2,$3, $4, $5, $6,$7) RETURNING id
            `;
            const contractvalues = [
                mainContract.date,
                mainContract.statergy,
                mainContract.index,
                mainContract.expiry,
                mainContract.amount_required === '' ? 0:Number(mainContract.amount_required),
                mainContract.net_points === '' ? 0 : Number(mainContract.net_points),
                mainContract.total_points === '' ? 0 : Number(mainContract.total_points),
            ];

            const { rows: [{ id }] } = await client.query(contractInsert, contractvalues);
            if(options && options.length > 0){
                const optionInsert = `
                    INSERT INTO options (
                        contract_id, option_type, strike_price, order_type, price, profit_points, ltp
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                `;
                for(const opt of options){
                    await client.query(optionInsert, [
                        id,
                        opt.option_type,
                        opt.strike_price === '' ? 0 : Number(opt.strike_price),
                        opt.order_type,
                        opt.price === '' ? 0 : Number(opt.price),
                        opt.profit_points === '' ? 0 : Number(opt.profit_points),
                        opt.ltp === '' ? 0 : Number(opt.ltp),
                    ]);
                }
            }
            await client.query('COMMIT');
            return NextResponse.json(
                {
                    success: true
                },{
                    status: 201
                }
            );
        }
        catch(err){
            await client.query('ROLLBACK');
            throw err;
        }
        finally{
            client.release();
        }
    }
    catch(error){
        console.error('Failed to save contract:',error);
        return NextResponse.json({
            success: false, error: 'Failed to save contract'
        },{
            status: 500
        });
    }
}