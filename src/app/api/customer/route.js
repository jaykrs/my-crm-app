import connectMongo from '../utils/connectMongo';
import { NextResponse } from 'next/server';
import Customer from '../model/customerModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';


export async function POST(req) {
    const body = await req.json();
    if (req.method === 'POST') {
        try {
            await connectMongo();
            let token = req.headers.get("authorization");
            if (!token) {
                return NextResponse.json({ message: "Token not found!" })
            }
            token = token.split(" ")[1];
            config.verifyToken(token, config.secret);

          const newCustomer =   new Customer({
                "FirstName": body.FirstName,
                "LastName": body.LastName,
                "Company": body.Company,
                "JobTitle": body.JobTitle,
                "ContactInformation": {
                    "Phone": body.ContactInformation.Phone,
                    "Email": body.ContactInformation.Email,
                    "Address": body.ContactInformation.Address
                },
                "Demographics": {
                    "Age": body.ContactInformation.Age,
                    "Gender": body.Gender,
                    "Location": body.Location
                },
                "Industry": body.Industry,
                "Notes": body.Notes,
                "CommunicationNotes": body.CommunicationNotes
            })

            newCustomer.save();


            return NextResponse.json({ success: true, message: "Customer register successfully!",data:newCustomer }, { status: 201 });
        } catch (error) {
            console.error('Error during authentication:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
export async function PUT(req) {
    const url = new URL(req.url);
    const CustomerID = url.searchParams.get("CustomerID");
    const body = await req.json();
    if (req.method === 'PUT') {
        try {
            if (!CustomerID) {
                return NextResponse.json({ message: "CustomerID Not found!" })
            }
            await connectMongo();
            let token = req.headers.get("authorization");
            if (!token) {
                return NextResponse.json({ message: "Token not found!" })
            }
            token = token.split(" ")[1];
            config.verifyToken(token, config.secret);


            const updatedCustomer = await Customer.findOneAndUpdate(
                { CustomerID: CustomerID },
                {
                    FirstName: body.FirstName,
                    LastName: body.LastName,
                    Company: body.Company,
                    JobTitle: body.JobTitle,
                    ContactInformation: {
                        Phone: body.ContactInformation?.Phone,
                        Email: body.ContactInformation?.Email,
                        Address: body.ContactInformation?.Address,
                    },
                    Demographics: {
                        Age: body.Demographics?.Age,
                        Gender: body.Demographics?.Gender,
                        Location: body.Demographics?.Location,
                    },
                    Industry: body.Industry,
                    Notes: body.Notes,
                    CommunicationNotes: body.CommunicationNotes,
                },
                { new: true, upsert: true }
            );

            return NextResponse.json({ success: true, message: "Customer table updated successfully!" }, { status: 200 });
        } catch (error) {
            console.error('Error during authentication:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
export async function GET(req) {
    const url = new URL(req.url);
    const CustomerID = url.searchParams.get("CustomerID");
    if (req.method === 'GET') {
        try {
            await connectMongo();
            let token = req.headers.get("authorization");
            if (!token) {
                return NextResponse.json({ message: "Token not found!" })
            }
            token = token.split(" ")[1];
            config.verifyToken(token, config.secret);
            let result;
            if (CustomerID) {
                 result = await Customer.findOne({ CustomerID: CustomerID });
            } else {
                 result = await Customer.find();
            }
            return NextResponse.json({ success: true, data: result }, { status: 200 });
        } catch (error) {
            console.error('Error during authentication:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

