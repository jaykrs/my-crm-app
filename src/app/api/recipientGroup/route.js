import { NextResponse } from 'next/server';
import connectMongo from '../utils/connectMongo';
import RecipientGroup from '../model/recipientGroupModel';
import config from '../config/auth.config';
await connectMongo();
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
            const body = await req.json();
            const newRecipientGroup = new RecipientGroup({
                name: body.name,
                recipientList: body.recipientList,
                tag: body.tag
            });
            await newRecipientGroup.save();
            return NextResponse.json(
                { success: true, message: "RecipientGroup created successfully!", data: newRecipientGroup },
                { status: 201 }
            );
        } catch (error) {
            console.error('Error creating data:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(req) {
    const url = new URL(req.url);
    const recipientGroupID = url.searchParams.get("id");
    const body = await req.json();
    if (req.method === 'PUT') {
        try {
            if (!recipientGroupID) {
                return NextResponse.json({ message: "recipientGroupID not provided!" }, { status: 400 });
            }
            let token = req.headers.get("authorization");
            if (!token) {
                return NextResponse.json({ message: "Token not found!" }, { status: 401 });
            }
            token = token.split(" ")[1];
            config.verifyToken(token, config.secret);
            const updatedRecipient = await RecipientGroup.findOneAndUpdate(
                { recipientGroupID },
                {
                    name: body.name,
                    recipientList: body.recipientList,
                    tag: body.tag
                },
                { new: true }
            );
            if (!updatedRecipient) {
                return NextResponse.json({ message: "Data not found!" }, { status: 404 });
            }
            return NextResponse.json(
                { success: true, message: "RecipientGroup updated successfully!", data: updatedRecipient },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error updating Recipient:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function GET(req) {
    const url = new URL(req.url);
    const recipientGroupID = url.searchParams.get("id");
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
            if (recipientGroupID) {
                result = await RecipientGroup.findOne({ recipientGroupID });
            }
            else {
                result = await RecipientGroup.find();
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

export async function DELETE(req) {
    const url = new URL(req.url);
    const recipientGroupID = url.searchParams.get("id");

    if (req.method === 'DELETE') {
        try {
            if (!recipientGroupID) {
                return NextResponse.json({ message: "recipientGroupID not provided!" }, { status: 400 });
            }
            // Verify the token
            let token = req.headers.get("authorization");
            if (!token) {
                return NextResponse.json({ message: "Token not found!" }, { status: 401 });
            }
            token = token.split(" ")[1];
            config.verifyToken(token, config.secret);
            const deletedRecipient = await RecipientGroup.findOneAndDelete({ recipientGroupID });

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
