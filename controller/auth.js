const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Users} = require('../models')

async function signUp(req,res){
	const name = req.body.name;
	const email = req.body.email;
	const password = bcrypt.hashSync(req.body.password, 8);

	try{
		const user = await Users.create({name,email,password})
	 
		res.send({msg :'User has been created successfully',user})
	}catch(err){
		res.status(500).send({msg : 'Internal Server error'})
	}


	
}

async function signIn(req,res){
	const name = req.body.name;
	const password = req.body.password;

	try{
		const user = await Users.findOne({
			where : {
				name : name
			}
		})
		if(user){
			const validPassword = bcrypt.compareSync(password,user.password)
			if(!validPassword){
				res.status(400).send({msg : 'Username/password is not correct'})	
			}

			
		}else{
			res.status(400).send({msg : 'Username/password is not correct'})	
		}
	}catch(err){
		res.status(500).send({msg : 'Internal Server Error', err})
	}
}

async function getAllUsers(req, res){
try{
	   const result = await Users.findAll();
	   res.send(result)
	}
	catch(err){
	   res.status(500).send({msg: 'Internal server error'})
	}
   }


async function updateUser(req, res){
    const name= req.params.name;
 try{
     const result = await Users.findOne({
         where : {
             name : name
         }
     })
     if(result){
        result.name = req.body.name;
        result.email = req.body.email;

        result.save()
        
        res.send({msg: 'user got updated', updateUser: result})
     } else{
        console.log('err in getting username', err)
			res.status(400).send({msg : 'username does not exist'})
     }
 }
 catch(err){
     console.log('err in updating user or email',err)
     res.send(500).send({msg: 'Internal server error'})
 }

}

   

module.exports = {signUp, signIn, getAllUsers,updateUser}