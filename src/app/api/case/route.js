import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo'; 
import Case from '../model/caseModel';
import config from '../config/auth.config'; 

// POST: Create a new case
export async function POST(req) {
  if (req.method === 'POST') {
    try {
      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      // Parse the request body
      const body = await req.json();

      // Create a new case
      const newCase = new Case({
        CustomerID: body.CustomerID,
        Subject: body.Subject,
        Description: body.Description,
        Status: body.Status || 'New',
        AssignedTo: body.AssignedTo,
        Resolution: body.Resolution,
      });

      await newCase.save();

      return NextResponse.json(
        { success: true, message: "Case created successfully!", data: newCase },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating case:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// PUT: Update an existing case
export async function PUT(req) {
  const url = new URL(req.url);
  const CaseID = url.searchParams.get("CaseID");

  if (req.method === 'PUT') {
    try {
      if (!CaseID) {
        return NextResponse.json({ message: "CaseID not provided!" }, { status: 400 });
      }

      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      // Parse the request body
      const body = await req.json();

      // Update the case
      const updatedCase = await Case.findOneAndUpdate(
        { CaseID },
        {
          CustomerID: body.CustomerID,
          Subject: body.Subject,
          Description: body.Description,
          Status: body.Status,
          AssignedTo: body.AssignedTo,
          Resolution: body.Resolution,
        },
        { new: true } // Return the updated document
      );

      if (!updatedCase) {
        return NextResponse.json({ message: "Case not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Case updated successfully!", data: updatedCase },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating case:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// GET: Retrieve case(s)
export async function GET(req) {
  const url = new URL(req.url);
  const CaseID = url.searchParams.get("CaseID");

  if (req.method === 'GET') {
    try {
      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      let result;
      if (CaseID) {
        // Fetch a specific case
        result = await Case.findOne({ CaseID });
      } else {
        // Fetch all cases
        result = await Case.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No cases found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving cases:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// DELETE: Remove an existing case
export async function DELETE(req) {
  const url = new URL(req.url);
  const CaseID = url.searchParams.get("CaseID");

  if (req.method === 'DELETE') {
    try {
      if (!CaseID) {
        return NextResponse.json({ message: "CaseID not provided!" }, { status: 400 });
      }

      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedCase = await Case.findOneAndDelete({ CaseID });

      if (!deletedCase) {
        return NextResponse.json({ message: "Case not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Case deleted successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting case:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
