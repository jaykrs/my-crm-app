
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
   
    return NextResponse.json({ "name":"jay" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}