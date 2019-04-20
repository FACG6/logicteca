import React from 'react';
import './style.css'

export default ({ defaultValue, onChange }) => {
  return (
    <select className="users__select" defaultValue={defaultValue} onChange={onChange}>
      <option id="1" value="developer">Developer</option>
      <option id="2" value="scrum master">
        Scrum Master
      </option>
    </select>
  );
};
