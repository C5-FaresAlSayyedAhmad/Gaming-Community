import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import axios from "axios";

//===============================================================

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");


  //===============================================================

  const getAllCategpries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/category"

      );

      if (res.data.success) {
    
        setCategories(res.data.category);
        setMessage("");
        setShow(true);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };


  //===============================================================

  useEffect(() => {
    getAllCategpries();
  }, []);

  //===============================================================

  return (
    <div className="categories">
      <br />
      {show &&
        categories.map((category, index) => (
          <div key={index} className="subCategory">        
            <Link className="linkSubCategory" to={`/category/${category._id}/games`}>
              <div className="line">
                <div className="imageSubCategory">
                  <img
                    src={`${category.image}`}
                    alt={`${category.title}`}
                    width="100"
                    height="100"
                  ></img>
                </div>
                <div className="title" >
                  <p className="subCategoryName" id={`t${index}`}>{category.title}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Categories;
