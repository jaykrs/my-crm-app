import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo'; 
import Lead from '../model/leadModel';
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
      const newLead = new Lead({
        Source: body.Source,
        Description: body.Description,
        Subject: body.Subject,
        ContactInformation: {
          Name: body.ContactInformation.Name,
          Phone: body.ContactInformation.Phone,
          Email: body.ContactInformation.Email,
          Address: body.ContactInformation.Address,
        },
        CompanyInformation: {
          CompanyName: body.CompanyInformation.CompanyName,
          Industry: body.CompanyInformation.Industry,
          Revenue: body.CompanyInformation.Revenue,
        },
        Status: body.Status || 'New',
        AssignedTo: body.AssignedTo,
      });

      await newLead.save();

      return NextResponse.json(
        { success: true, message: "Lead created successfully!", data: newLead },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// PUT: Update an existing lead
export async function PUT(req) {
  const url = new URL(req.url);
  const LeadID = url.searchParams.get("LeadID");

  if (req.method === 'PUT') {
    try {
      if (!LeadID) {
        return NextResponse.json({ message: "LeadID not provided!" }, { status: 400 });
      }
      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      // Parse the request body
      const body = await req.json();

      // Update the lead
      const updatedLead = await Lead.findOneAndUpdate(
        { LeadID },
        {
          Source: body.Source,
          ContactInformation: {
            Name: body.ContactInformation?.Name,
            Phone: body.ContactInformation?.Phone,
            Email: body.ContactInformation?.Email,
            Address: body.ContactInformation?.Address,
          },
          CompanyInformation: {
            CompanyName: body.CompanyInformation?.CompanyName,
            Industry: body.CompanyInformation?.Industry,
            Revenue: body.CompanyInformation?.Revenue,
          },
          Status: body.Status,
          AssignedTo: body.AssignedTo,
        },
        { new: true } // Return the updated document
      );

      if (!updatedLead) {
        return NextResponse.json({ message: "Lead not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Lead updated successfully!", data: updatedLead },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// GET: Retrieve lead(s)
export async function GET(req) {
  const url = new URL(req.url);
  const LeadID = url.searchParams.get("LeadID");
  const AssignedTo = url.searchParams.get("AssignedTo");
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
      if (LeadID) {
        // Fetch a specific lead
        result = await Lead.findOne({ LeadID });
      } 
      if (AssignedTo) {
        // Fetch a specific lead
        result = await Lead.find({ "AssignedTo" : AssignedTo });
      }
      else {
        // Fetch all leads
        result = await Lead.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No leads found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving leads:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// DELETE: Remove an existing lead
export async function DELETE(req) {
  const url = new URL(req.url);
  const LeadID = url.searchParams.get("LeadID");

  if (req.method === 'DELETE') {
    try {
      if (!LeadID) {
        return NextResponse.json({ message: "LeadID not provided!" }, { status: 400 });
      }
      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedLead = await Lead.findOneAndDelete({ LeadID });

      if (!deletedLead) {
        return NextResponse.json({ message: "Lead not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Lead deleted successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
