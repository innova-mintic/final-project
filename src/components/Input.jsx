import React from 'react';

const Input = ({ label, name, defaultValue, type, required,disabled,className='input'}) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span className='flex flex-col items-center justify-center'>{label}</span>
      <input
        required={required}
        type={type }
        name={name}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </label>
  );
};

export default Input;

