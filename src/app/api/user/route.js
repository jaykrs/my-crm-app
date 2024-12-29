import connectMongo from '../utils/connectMongo';
import {  NextResponse } from 'next/server';
import User from '../model/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';



export async function POST(request) {

  if (request.method === 'POST') {
   let body = await request.json();
    await connectMongo();
    console.log('emailid',body.email);
    let result = await authentication(body.email , body.password);

    
    console.log(result);
    NextResponse.json({result}, { status: 200 })
    
  }
    
}


async function authentication(email , password) {
    if(email){
      let role;
      User.findOne({email:email}).then(async (isemail)=>{
       role = isemail.role;
       if(null == isemail){
        return NextResponse.json({ "message":"Email Doesn't Exist" }, { status: 404 })
       }
     const isPasswordValid =   bcrypt.compareSync(password, isemail.password);
     
     if(!isPasswordValid){
       return NextResponse.json({ "accessToken":null, "message" : "invalid password!" }, { status: 401 })
     }
     if(!isemail.active){
       return NextResponse.json({ "accessToken":null, "message" : "Seems your account is not active! please contact admin" }, { status: 401 })
      }
     else { 
     let payload = {
       role :isemail.role,
       email : isemail.email
     }
     const token = jwt.sign(payload, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    console.log(token);
    const result = { data : {
      message: 'signin successfully',
      _id: isemail._id,
      email: isemail.email,
      role: role,
      active: isemail.active,
      accessToken: token
    }}
    
    return result;
  }
});
    }}