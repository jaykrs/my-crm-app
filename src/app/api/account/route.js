import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo'; 
import Account from '../model/accountModel';
import config from '../config/auth.config'; 

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

      const newAccount = new Account({
        AccountName: body.AccountName,
        Industry: body.Industry,
        Revenue: body.Revenue,
        Address: body.Address,
        Website: body.Website,
        CustomerID: body.CustomerID,
      });

      await newAccount.save();

      return NextResponse.json(
        { success: true, message: "Account created successfully!", data: newAccount },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating account:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// PUT: Update an existing account
export async function PUT(req) {
  const url = new URL(req.url);
  const AccountID = url.searchParams.get("AccountID");

  if (req.method === 'PUT') {
    try {
      if (!AccountID) {
        return NextResponse.json({ message: "AccountID not provided!" }, { status: 400 });
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

      // Update the account
      const updatedAccount = await Account.findOneAndUpdate(
        { AccountID },
        {
          AccountName: body.AccountName,
          Industry: body.Industry,
          Revenue: body.Revenue,
          Address: body.Address,
          Website: body.Website,
          CustomerID: body.CustomerID,
        },
        { new: true } // Return the updated document
      );

      if (!updatedAccount) {
        return NextResponse.json({ message: "Account not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Account updated successfully!", data: updatedAccount },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating account:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// GET: Retrieve account(s)
export async function GET(req) {
  const url = new URL(req.url);
  const AccountID = url.searchParams.get("AccountID");

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
      if (AccountID) {
        // Fetch a specific account
        result = await Account.findOne({ AccountID });
      } else {
        // Fetch all accounts
        result = await Account.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No accounts found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving accounts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

// DELETE: Remove an existing account
export async function DELETE(req) {
  const url = new URL(req.url);
  const AccountID = url.searchParams.get("AccountID");

  if (req.method === 'DELETE') {
    try {
      if (!AccountID) {
        return NextResponse.json({ message: "AccountID not provided!" }, { status: 400 });
      }

      await connectMongo();

      // Verify the token
      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedAccount = await Account.findOneAndDelete({ AccountID });

      if (!deletedAccount) {
        return NextResponse.json({ message: "Account not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Account deleted successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting account:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
