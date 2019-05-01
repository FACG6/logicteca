import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

export default function Select ({ defaultValue, onChange }) {
  return (
    <select className="users__select" defaultValue={defaultValue} onChange={onChange}>
      <option id="1" value="Developer">Developer</option>
      <option id="2" value="Scrum Master">
        Scrum Master
      </option>
    </select>
  );
};

Select.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}


