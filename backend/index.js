const express= require("express");
const cors = require('cors')
require('./db/config');
const User = require("./db/User");
const app = express();
const Product = require("./db/Product");
app.use(express.json());
app.use(cors( ));

//SIGNUP API
app.post("/register", async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

//LOGIN API
app.post("/login", async (req,resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        //console.log(user);
        if(user){
            resp.send(user);
        }else{
            resp.send({result:"No User Found"});
        }
    }else{
        resp.send({result:"No User Found"});
    }

})

//Add Product API
app.post("/add-product", async(req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

})

//List Product API
app.get("/products", async(req,resp)=>{
    let products = await Product.find();
    if(products.length > 0){
        resp.send(products);
    }else{
        resp.send({result: "No product found!!!"});
    }
});

//delete Product API
app.delete("/product/:id",async (req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
    console.log("result deleted");

});

//Update/Find Product API

app.get("/product/:id",async(req,resp)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
            resp.send({result: "NO OBJ FOUND!!"});
    }
})

app.put("/product/:id",async(req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    resp.send(result)
})


app.listen(5000);
