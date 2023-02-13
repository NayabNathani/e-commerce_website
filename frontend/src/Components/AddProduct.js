import React, {useState} from 'react'
import './Css/addProduct.css'

const AddProduct= ()=> {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async()=>{


      if(!name || !price || !category || !company){
        setError(true);
        return false;
    }

        //console.log(name,price,category,company)
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        //console.log(userId);
        let result = await fetch('http://localhost:5000/add-product',{
            method: 'post',
            body: JSON.stringify({name,price,category,userId, company}),
            headers: {"Content-Type": "application/json"}
        })

        result = await result.json();
        console.log(result)
    }

  return (
    <div className='product'>

        <input type='text' placeholder='Enter Product Name' className='inputbox' 
        onChange={(e)=>{setName(e.target.value)}} value={name}  />{error && !name && <span className='invalid-input'>Missing Name Field</span>}


        <input type='text' placeholder='Enter Product Price' className='inputbox' 
        onChange={(e)=>{setPrice(e.target.value)}} value={price}    />{error && !price && <span className='invalid-input'>Missing Price Field</span>}


        <input type='text' placeholder='Enter Product Catefory' className='inputbox' 
        onChange={(e)=>{setCategory(e.target.value)}} value={category}  />{error && !category && <span className='invalid-input'>Missing Category Field</span>}


        <input type='text' placeholder='Enter Product Comany' className='inputbox' 
        onChange={(e)=>{setCompany(e.target.value)}} value={company} />{error && !company && <span className='invalid-input'>Missing Company Field</span>}


        <button onClick={addProduct} className='addProduct-btn'>Add Product</button>
    </div>
  )
}

export default AddProduct