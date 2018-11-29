import React from 'react';
import DropDownButton from './common/dropDownButton';

const ActionMenu = ({ onSort, disabled }) => {
    return (
        <div className="dropdown task-menu">
            <button className="btn btn-secondary btn-sm dropdown-toggle font-weight-bold"
                disabled={disabled}
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Sort by
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <DropDownButton label={"Category"} type={"category"} handleClick={onSort} />
                <DropDownButton label={"Completed"} type={"status"} handleClick={onSort} />
            </div>
        </div >
    );
}

export default ActionMenu;