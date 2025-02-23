import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo'; 
import Template from '../model/templateModel';
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
     if(body.temName === "" || body.userName === ""){
        return NextResponse.json({message:  body.userName ==="" && body.temName === ""? "Template Name and userName not found!" : body.userName ==="" ? "UserName not found!": "Template Name not found!"},{status:401})
     }
      // Create a new opportunity
      const newTem = new Template({
        temName: body.temName,
        temCode: body.temCode,
        userName: body.userName
      });

      await newTem.save();

      return NextResponse.json(
        { success: true, message: "Template created successfully!", data: newTem },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// PUT: Update an existing opportunity
export async function PUT(req) {
  const url = new URL(req.url);
  const temID = url.searchParams.get("temID");

  if (req.method === 'PUT') {
    try {
      if (!temID) {
        return NextResponse.json({ message: "template ID not provided!" }, { status: 400 });
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
      const updatedTem = await Template.findOneAndUpdate(
        { temID },
        {
          temName:body.temName,
          temCode:body.temCode
        },
        { new: true } // Return the updated document
      );

      if (!updatedTem) {
        return NextResponse.json({ message: "Template not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Template updated successfully!", data: updatedOpportunity },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// GET: Retrieve opportunity(s)
export async function GET(req) {
  const url = new URL(req.url);
  const temID = url.searchParams.get("temID");

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
      if (temID) {
        // Fetch a specific opportunity
        result = await Template.findOne({ temID });
      } else {
        // Fetch all opportunities
        result = await Template.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No template found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// DELETE: Remove an existing opportunity
export async function DELETE(req) {
  const url = new URL(req.url);
  const temID = url.searchParams.get("temID");

  if (req.method === 'DELETE') {
    try {
      if (!temID) {
        return NextResponse.json({ message: "Template ID not provided!" }, { status: 400 });
      }

      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedTem = await Template.findOneAndDelete({ temID });

      if (!deletedTem) {
        return NextResponse.json({ message: "Template not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Template deleted successfully!" },
        { status: 200 }
      );
    } catch (error)      {
      console.error('Error deleting template:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
