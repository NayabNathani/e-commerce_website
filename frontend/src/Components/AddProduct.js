import React, {useState} from 'react'
import './Css/addProduct.css'

const AddProduct= ()=> {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');

    const addProduct = async()=>{
        //console.log(name,price,category,company)
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        //console.log(userId);
        let result = await fetch('http://localhost:5000/add-product',{
            method: 'post',
            body: JSON.stringify({name,price,category,userId, company}),
            headers: {"Content-Type": "application/json"}
        })

        result = await result.json();
        //console.log(result)
    }

  return (
    <div className='product'>

        <input type='text' placeholder='Enter Product Name' className='inputbox' 
        onChange={(e)=>{setName(e.target.value)}} value={name}  />
        <input type='text' placeholder='Enter Product Price' className='inputbox' 
        onChange={(e)=>{setPrice(e.target.value)}} value={price}    />
        <input type='text' placeholder='Enter Product Catefory' className='inputbox' 
        onChange={(e)=>{setCategory(e.target.value)}} value={category}  />
        <input type='text' placeholder='Enter Product Comany' className='inputbox' 
        onChange={(e)=>{setCompany(e.target.value)}} value={company} />
        <button onClick={addProduct} className='addProduct-btn'>Add Product</button>
    </div>
  )
}

export default AddProduct