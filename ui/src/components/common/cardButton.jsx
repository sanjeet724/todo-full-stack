import React from 'react';

const CardButton = (props) => {
    const { cssClasses, label, handleClick, target, disabled } = props;
    return (
        <button type="button"
            className={cssClasses}
            disabled={disabled}
            onClick={() => handleClick(target)}>{label}</button>
    );
}

export default CardButton;