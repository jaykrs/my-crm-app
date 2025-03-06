import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo'; 
import Recipient from '../model/recipientModel';
import config from '../config/auth.config'; 
await connectMongo();
// POST: Create a new lead
export async function POST(req) {
  if (req.method === 'POST') {
    try {
      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      // Parse the request body
      const body = await req.json();

      // Create a new lead
      const newRecipient = new Recipient({
        name: body.name,
        email: body.email,
        phone: body.phone ? body.phone : '',
        category: body.category ? body.category : "",
        city: body.city? body.city : "",
        tag: body.tag? body.tag: "",
        additionalData: body.additionalData? body.additionalData : ""
      });

      await newRecipient.save();

      return NextResponse.json(
        { success: true, message: "Recipient created successfully!", data: newRecipient },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating Recipient:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// PUT: Update an existing lead
export async function PUT(req) {
  const url = new URL(req.url);
  const recipientID = url.searchParams.get("id");
  const body = await req.json();
  if (req.method === 'PUT') {
    try {
      if (!recipientID) {
        return NextResponse.json({ message: "recipientID not provided!" }, { status: 400 });
      }
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);
      const updatedRecipient = await Recipient.findOneAndUpdate(
        { recipientID },
        {
            name: body.name ,
            phone: body.phone,
            category: body.category ,
            city: body.city,
            tag: body.tag,
            additionalData: body.additionalData
        },
        { new: true }
      );

      if (!updatedRecipient) {
        return NextResponse.json({ message: "Data not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Recipient updated successfully!", data: updatedRecipient },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating Recipient:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// GET: Retrieve lead(s)
export async function GET(req) {
  const url = new URL(req.url);
  const recipientID = url.searchParams.get("id");
  if (req.method === 'GET') {
    try {
      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      let result;
      if (recipientID) {
        result = await Recipient.findOne({ recipientID });
      }
      else {
        result = await Recipient.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "Data not found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// DELETE: Remove an existing lead
export async function DELETE(req) {
  const url = new URL(req.url);
  const recipientID = url.searchParams.get("id");

  if (req.method === 'DELETE') {
    try {
      if (!recipientID) {
        return NextResponse.json({ message: "recipientID not provided!" }, { status: 400 });
      }
      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedRecipient = await Recipient.findOneAndDelete({ recipientID });

      if (!deletedRecipient) {
        return NextResponse.json({ message: "Data not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Record deleted successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
