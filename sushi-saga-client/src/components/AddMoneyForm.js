import React from "react";

const AddMoney = (props) => {
    return (
        <form className="addMoney" onSubmit={props.addMoney}>
            <input type="text" name="money" pattern="^\d{1,}$"></input>
            <button type="submit">Add Money</button>
        </form>
    );
};

export default AddMoney;
