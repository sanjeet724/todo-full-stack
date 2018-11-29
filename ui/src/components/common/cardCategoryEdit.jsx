import React from 'react';

const CardCategoryEdit = ({ defaultCategory, categoryChanged }) => {
    return (
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend input-group-sm">
                <label className="input-group-text" htmlFor="inputGroupSelect01">New category</label>
            </div>
            <select className="custom-select custom-select-sm"
                id="inputGroupSelect01"
                onChange={(e) => categoryChanged(e.currentTarget.value)}>
                <option defaultValue>{defaultCategory}</option>
                <option value="Shopping">Shopping</option>
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Home">Home</option>
                <option value="Personal">Personal</option>
                <option value="Interview">Interview</option>
            </select>
        </div>
    );
}

export default CardCategoryEdit; 