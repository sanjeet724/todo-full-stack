import React from 'react';

const InputWithLabel = (props) => {
    const { type, id, label, placeholder, error, handleChange, value, disabled } = props;
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <input type={type}
                className="form-control form-input"
                id={id}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                disabled={disabled}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default InputWithLabel;
