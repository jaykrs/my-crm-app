import { NextResponse } from 'next/server';
import connectMongo from "../utils/connectMongo";
import Contact from '../model/contactModel';
import config from '../../../lib/config';


export async function POST(req) {
  if (req.method === 'POST') {
    try {
      await connectMongo();

      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const body = await req.json();

      const newContact = new Contact({
        CustomerID: body.CustomerID,
        ContactType: body.ContactType,
        ContactDetails: body.ContactDetails,
        PreferredContactMethod: body.PreferredContactMethod || false,
      });

      await newContact.save();

      return NextResponse.json(
        { success: true, message: "Contact created successfully!", data: newContact },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating contact:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(req) {
  const url = new URL(req.url);
  const ContactID = url.searchParams.get("ContactID");

  if (req.method === 'PUT') {
    try {
      if (!ContactID) {
        return NextResponse.json({ message: "ContactID not provided!" }, { status: 400 });
      }

      await connectMongo();

      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const body = await req.json();

      const updatedContact = await Contact.findOneAndUpdate(
        { ContactID },
        {
          CustomerID: body.CustomerID,
          ContactType: body.ContactType,
          ContactDetails: body.ContactDetails,
          PreferredContactMethod: body.PreferredContactMethod,
          updatedAt: Date.now(),
        },
        { new: true } 
      );

      if (!updatedContact) {
        return NextResponse.json({ message: "Contact not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Contact updated successfully!", data: updatedContact },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating contact:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function GET(req) {
  const url = new URL(req.url);
  const ContactID = url.searchParams.get("ContactID");
  const CustomerID = url.searchParams.get("CustomerID");

  if (req.method === 'GET') {
    try {
      await connectMongo();

      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      let result;
      if (ContactID) {
        // Fetch a specific contact
        result = await Contact.findOne({ ContactID });
      } else if (CustomerID) {
        // Fetch all contacts for a specific customer
        result = await Contact.find({ CustomerID });
      } else {
        // Fetch all contacts
        result = await Contact.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No contacts found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving contacts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
