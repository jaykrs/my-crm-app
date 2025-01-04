import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo'; 
import Opportunity from '../model/opportunityModel';
import config from '../config/auth.config'; 

// POST: Create a new opportunity
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

      // Create a new opportunity
      const newOpportunity = new Opportunity({
        LeadID: body.LeadID,
        AccountID: body.AccountID,
        SalesStage: body.SalesStage,
        ExpectedRevenue: body.ExpectedRevenue,
        CloseDate: body.CloseDate,
        AssignedTo: body.AssignedTo,
      });

      await newOpportunity.save();

      return NextResponse.json(
        { success: true, message: "Opportunity created successfully!", data: newOpportunity },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating opportunity:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// PUT: Update an existing opportunity
export async function PUT(req) {
  const url = new URL(req.url);
  const OpportunityID = url.searchParams.get("OpportunityID");

  if (req.method === 'PUT') {
    try {
      if (!OpportunityID) {
        return NextResponse.json({ message: "OpportunityID not provided!" }, { status: 400 });
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

      // Update the opportunity
      const updatedOpportunity = await Opportunity.findOneAndUpdate(
        { OpportunityID },
        {
          LeadID: body.LeadID,
          AccountID: body.AccountID,
          SalesStage: body.SalesStage,
          ExpectedRevenue: body.ExpectedRevenue,
          CloseDate: body.CloseDate,
          AssignedTo: body.AssignedTo,
        },
        { new: true } // Return the updated document
      );

      if (!updatedOpportunity) {
        return NextResponse.json({ message: "Opportunity not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Opportunity updated successfully!", data: updatedOpportunity },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating opportunity:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// GET: Retrieve opportunity(s)
export async function GET(req) {
  const url = new URL(req.url);
  const OpportunityID = url.searchParams.get("OpportunityID");

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
      if (OpportunityID) {
        // Fetch a specific opportunity
        result = await Opportunity.findOne({ OpportunityID });
      } else {
        // Fetch all opportunities
        result = await Opportunity.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No opportunities found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving opportunities:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// DELETE: Remove an existing opportunity
export async function DELETE(req) {
  const url = new URL(req.url);
  const OpportunityID = url.searchParams.get("OpportunityID");

  if (req.method === 'DELETE') {
    try {
      if (!OpportunityID) {
        return NextResponse.json({ message: "OpportunityID not provided!" }, { status: 400 });
      }

      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedOpportunity = await Opportunity.findOneAndDelete({ OpportunityID });

      if (!deletedOpportunity) {
        return NextResponse.json({ message: "Opportunity not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Opportunity deleted successfully!" },
        { status: 200 }
      );
    } catch (error)      {
      console.error('Error deleting opportunity:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
