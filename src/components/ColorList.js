import React, { useState, useEffect } from "react";
import {Route, NavLink, useHistory, useParams } from 'react-router-dom';
import axios from "axios";

import EditMenu from "./EditMenu";


const initialColor = {
  color: "",
  code: { hex: "" }
};

function ColorList({colors, updateColors}) {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();
  const { push } = useHistory();

  // useEffect(() =>{
  //   axios.get() 
  //     .then(res=>{

  //     })
  //   }
  // })

  const editColor = color => {
    setEditing(false);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

  };

  const deleteColor = color => {
    axios.delete(`http://localhost:5000/api/colors/${id}`)
    .then(res => {
      color.updateColors(res.data);
      push('/colors')
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.