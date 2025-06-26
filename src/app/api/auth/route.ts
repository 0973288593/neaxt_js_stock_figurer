// import  { NextApiRequest, NextApiResponse } from "next";
import { NextRequest , NextResponse } from 'next/server'
import { serialize }  from "cookie" 

const  SECRET_REY = 'secrest13'
const VALID_USER = {
    username: 'admin',
    password: 1234
}
type VALID_USER = {
  username: string
  password: number
}



export async function POST(req: NextRequest, res : NextResponse) {
    
    if (req.method === 'POST'){
        const body = await req.json();
        const { username , password } = body
        console.log(username,password)
        if ( username === VALID_USER.username && password === VALID_USER.password) {
            const token = 'fake-jwt-token'
             console.log(req.method)
            
            // res.setHeader(
            //     'Set-Cookie',
            //     serialize('token', token , {
            //         path: '/',
            //         httpOnly: true,
            //         maxAge: 60 * 60,
            //     })
            // );
            return new Response(JSON.stringify(VALID_USER), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
    });
}


