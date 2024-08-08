import React from 'react';

function TimeDrop_Edit({ value, onChange, name, options }) {
  return (
    <div className="custom-dropdown">
      <select
        className="dropdown-select"
        value={value}
        onChange={onChange}
        name={name}>
        <option value="">시간 선택</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeDrop_Edit;
