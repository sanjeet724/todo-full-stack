import React from 'react';

const CardTitleEdit = ({ titleChanged, titleError, placeholder }) => {
    return (
        <div className="mb-3">
            <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">New title</span>
                </div>
                <input type="text"
                    className="form-control"
                    aria-label="Small"
                    placeholder={placeholder}
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => titleChanged(e.currentTarget.value)}
                />
            </div>
            {titleError && <div className="alert alert-danger">{titleError}</div>}
        </div>
    );
}

export default CardTitleEdit;