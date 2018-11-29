import React from 'react';

const DropDownButton = (props) => {
    const { label, type, handleClick } = props;
    return (
        <button className="dropdown-item btn-sm"
            type="button"
            onClick={() => handleClick(type)}>{label}</button>
    );
}

export default DropDownButton;