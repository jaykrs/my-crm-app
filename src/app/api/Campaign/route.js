import { NextResponse } from 'next/server';
import connectMongo from "../utils/connectMongo"; 
import Campaign from '../model/campaignModel';
import { config } from '../config/auth.config';

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

      const newCampaign = new Campaign({
        CampaignName: body.CampaignName,
        StartDate: body.StartDate,
        EndDate: body.EndDate,
        Budget: body.Budget,
        TargetAudience: body.TargetAudience,
        Channels: body.Channels,
        Results: body.Results,
      });

      await newCampaign.save();

      return NextResponse.json(
        { success: true, message: "Campaign created successfully!", data: newCampaign },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating campaign:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(req) {
  const url = new URL(req.url);
  const CampaignID = url.searchParams.get("CampaignID");

  if (req.method === 'PUT') {
    try {
      if (!CampaignID) {
        return NextResponse.json({ message: "CampaignID not provided!" }, { status: 400 });
      }

      await connectMongo();

      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const body = await req.json();

      const updatedCampaign = await Campaign.findOneAndUpdate(
        { CampaignID },
        {
          CampaignName: body.CampaignName,
          StartDate: body.StartDate,
          EndDate: body.EndDate,
          Budget: body.Budget,
          TargetAudience: body.TargetAudience,
          Channels: body.Channels,
          Results: body.Results,
        },
        { new: true } 
      );

      if (!updatedCampaign) {
        return NextResponse.json({ message: "Campaign not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Campaign updated successfully!", data: updatedCampaign },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating campaign:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function GET(req) {
  const url = new URL(req.url);
  const CampaignID = url.searchParams.get("CampaignID");

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
      if (CampaignID) {
        result = await Campaign.findOne({ CampaignID });
      } else {
        result = await Campaign.find();
      }

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return NextResponse.json({ message: "No campaigns found!" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving campaigns:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const CampaignID = url.searchParams.get("CampaignID");

  if (req.method === 'DELETE') {
    try {
      if (!CampaignID) {
        return NextResponse.json({ message: "CampaignID not provided!" }, { status: 400 });
      }

      await connectMongo();

      let token = req.headers.get("authorization");
      if (!token) {
        return NextResponse.json({ message: "Token not found!" }, { status: 401 });
      }
      token = token.split(" ")[1];
      config.verifyToken(token, config.secret);

      const deletedCampaign = await Campaign.findOneAndDelete({ CampaignID });

      if (!deletedCampaign) {
        return NextResponse.json({ message: "Campaign not found!" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, message: "Campaign deleted successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
