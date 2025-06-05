import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';
import Role from '../../../models/roleModel'
import bcrypt from 'bcryptjs';
export default async function handler(req, res, next) {
    if (req.method === 'POST') {
        let body = req.body;
        await connectMongo();
       let userRole, user;
       let password = bcrypt.hashSync(body.password, 8);
       User.findOne({ email: body.email }).then(async (isemail) => {
           if (null != isemail) {
               res.status(500).send({ message: "Email already exist" })
           } else {
               Role.findOne({ name: body.role }).then(async (docs) => {

                   if (null == docs) {
                       Role.findOne({ name: 'guest' }).then( async (roleid) => {
                           userRole = roleid.name; 
                           user = {
                               name: body.name,
                               email: body.email,
                               password: password,
                               createdby: body.createdby,
                               role: userRole,
                               active:false
                           }
                           let usr = await User.create(user);
                           res.status(200).send({
                               message: 'User created successfully',
                               usr
                           });
                       })

                   } else {
                       Role.findOne({ name: body.role }).then(async (role) => {
                           user = {
                               name: body.name,
                               email: body.email,
                               password: password,
                               createdby: body.createdby,
                               role: role.name,
                               active:false
                           }
                           let usr = await User.create(user);
                           res.status(200).send({
                               message: 'User register successfully! plese login to proceed',
                               usr
                           });
                       })
                   }
               });
           }
       })
    //   }
       
    } else if (req.method === 'GET') {
        connectMongo();
        User.find().then(e=>{
            res.status(200).send(e);
        })
    } else if (req.method === 'PUT') {
        res.status(200).json({ message: 'invalid method' })
    } else {
        res.status(200).json({ name: 'invalid method' })
    }

}