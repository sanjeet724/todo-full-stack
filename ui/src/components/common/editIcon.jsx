import React from 'react';

const EditIcon = ({ tooltip, handleClick, target }) => {
    return (
        <i className="fas fa-pen-square edit-icon card-icon"
            title={tooltip}
            onClick={() => handleClick(target)}
        />
    );
}

export default EditIcon;


