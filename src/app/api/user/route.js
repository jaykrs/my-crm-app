import connectMongo from '../utils/connectMongo';
import {  NextResponse } from 'next/server';
import User from '../model/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';

export async function POST(req) {
  const body = await req.json(); 
  if (req.method === 'POST') {
    try {
      await connectMongo();
      const { email, password } = body;

      const result = await authentication(email, password);

      return NextResponse.json(result);
    } catch (error) {
      console.error('Error during authentication:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } 
  // if(req.method === 'POST' && body.type === "signup") {
  //   try {
  //     await connectMongo();
  //     const { email, password, role, active } = body;
  //     if (!email || !password) {
  //       return NextResponse.json(
  //         { message: 'Email and password are required' },
  //         { status: 400 }
  //       );
  //     }
  //     const existingUser = await User.findOne({ email });
  //     if (existingUser) {
  //       return NextResponse.json(
  //         { message: 'Email already registered' },
  //         { status: 400 }
  //       );
  //     }
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const newUser = new User({
  //       email,
  //       password: hashedPassword,
  //       role: role || 'user', 
  //       active: active !== undefined ? active : true,
  //     });
  //     await newUser.save();

  //     return NextResponse.json(
  //       { message: 'User registered successfully' },
  //       { status: 201 }
  //     );
  //   } catch (error) {
  //     console.error('Error during signup:', error);
  //     return NextResponse.json(
  //       { message: 'Internal Server Error' },
  //       { status: 500 }
  //     );
  //   }
  // }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

async function authentication(email, password) {
  if (!email || !password) {
    return { message: 'Email and password are required', status: 400 };
  }

  try {
    const isemail = await User.findOne({ email });

    if (!isemail) {
      return { message: "Email Doesn't Exist", status: 404 };
    }

    const isPasswordValid = bcrypt.compareSync(password, isemail.password);
    if (!isPasswordValid) {
      return { message: 'Invalid password', status: 401 };
    }

    if (!isemail.active) {
      return { message: 'Account is not active. Please contact admin.', status: 401 };
    }

    const payload = {
      role: isemail.role,
      email: isemail.email,
    };

    const token = jwt.sign(payload, config.secret, { expiresIn: 86400 }); // 24 hours

    return {
      data: {
        message: 'Sign-in successful',
        _id: isemail._id,
        email: isemail.email,
        role: isemail.role,
        active: isemail.active,
        accessToken: token,
      },
      status: 200,
    };
  } catch (error) {
    console.error('Error during authentication:', error);
    return { message: 'Internal Server Error', status: 500 };
  }
}

