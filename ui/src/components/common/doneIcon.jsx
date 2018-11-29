import React from 'react';

const DoneIcon = (props) => {
    return (
        <i className="fas fa-check-circle card-icon"
            title={props.tooltip}
        />
    );
}

export default DoneIcon;

