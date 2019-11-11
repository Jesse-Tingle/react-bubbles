import React, { useState, useEffect } from "react";
import api from "../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  useEffect(() => {
    api()
      .get('/api/colors')
      .then(res => {
        console.log('res.data', res.data)
        updateColors(res.data)
      })
      .catch(err => {

      })
  }, [editing])

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    api()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('saveEdit res', res)
      })
      .catch(err => {
        console.log('saveEdit err', err)
      
      })    
      setEditing(false)
    };

    const deleteColor = color => {
      // make a delete request to delete this color
      if (window.confirm("Are you SURE you want to DELETE this color?")) {
  
        api()
          .delete(`/api/colors/${color.id}`)
          .then(result => {
            console.log(`Color number ${color.id} deleted`);
            let newColors = colors.filter(clr => clr.id !== color.id);
            updateColors(newColors)
          })
          .catch(err => {
            console.log(err)
          })
      }
    };

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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
