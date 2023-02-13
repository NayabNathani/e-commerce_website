import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/listProduct.css"


const ListProduct = ()=>{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    },[])

    const getProducts= async ()=>{
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }
    
    const deleteProd = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: "Delete",

        });
        result = await result.json();
        if(result){
            getProducts();
            alert('Record Deleted');
        }
    };

    return(
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>S/No </li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <button className="deletProduct-btn" onClick={()=>deleteProd(item._id)} >Delete</button>
                    <Link className="updateProduct-btn" to={"/update/"+item._id}>Update</Link>
                </li>
            </ul>
                )
            }
        </div>

    )

}

export default ListProduct;