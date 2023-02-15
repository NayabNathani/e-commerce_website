const express= require("express");
const cors = require('cors')
require('./db/config');
const User = require("./db/User");
const app = express();
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const jwtKey = 'nayuEcom' 
app.use(express.json());
app.use(cors( ));

//SIGNUP API
app.post("/register", async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ user }, jwtKey,{ expiresIn: "2h" }, (err, token) => { 
        if(err){
            resp.send({result:"Something Went Wrong, Try again later!!!"});
        }
        resp.send({user , auth: token})
})
})

//LOGIN API
app.post("/login", async (req,resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        //console.log(user);
        if(user){
            Jwt.sign({ user }, jwtKey,{ expiresIn: "2h" }, (err, token) => { 
                if(err){
                    resp.send({result:"Something Went Wrong, Try again later!!!"});
                }
                resp.send({user , auth: token})
        })
            
        }else{
            resp.send({result:"No User Found"});
        }
    }else{
        resp.send({result:"No User Found"});
    }

})

//Add Product API
app.post("/add-product", verifyToken ,async(req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

})

//List Product API
app.get("/products", verifyToken ,async(req,resp)=>{
    let products = await Product.find();
    if(products.length > 0){
        resp.send(products);
    }else{
        resp.send({result: "No product found!!!"});
    }
});

//delete Product API
app.delete("/product/:id", verifyToken ,async (req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
    console.log("result deleted");

});

//Update/Find Product API

app.get("/product/:id",verifyToken ,async(req,resp)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
            resp.send({result: "NO OBJ FOUND!!"});
    }
})

app.put("/product/:id",verifyToken ,async(req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    resp.send(result)
});

//Search APi

app.get('/search/:key', verifyToken ,async(req,resp)=>{
    let result = await Product.find({
        "$or":[
            {   name:{$regex: req.params.key}  },
            {   company:{$regex: req.params.key}    },
            {   category:{$regex: req.params.key}   }
        ]
        
    });
    resp.send(result) 

});

//JWT TOKEN for all

function verifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(401).send({result : "Please Provide Valid Token!!!"})
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({result : "Please add token with header!!!"})
    }
}

app.listen(5000);
