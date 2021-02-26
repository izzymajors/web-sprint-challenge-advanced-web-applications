import React, { useEffect, useState } from "react";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
 import { axiosWithAuth } from "./axiosWithAuth";

 const BubblePage = () => {
  const [colorList, setColorList] = useState([]);



  
 



  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    axiosWithAuth()
    .get("/colors")
    .then(res => {
      setColorList(res.data);
       console.log(res)
    }).catch((err) => console.log(err))
  }, []);

  if(!colorList) {
    return <h2>Loading color data...</h2>
  }
 

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
