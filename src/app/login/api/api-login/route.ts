import { NextResponse } from "next/server";

export async function GET() {
  return Response.json({ data: '88888' })

}
export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "1234") {
    const res = NextResponse.json({
      success: true,
    });

    res.cookies.set("token", "123456", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 ชั่วโมง
    });

    return res;
  }

  return NextResponse.json(
    {
      success: false,
    },
    {
      status: 401,
    }
  );
}