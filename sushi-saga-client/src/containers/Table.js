import React, { Fragment } from "react";
import AddMoney from "../components/AddMoneyForm";

const Table = (props) => {
    const renderPlates = (array) => {
        return array.map((x, index) => {
            return <div key={index} className="empty-plate" style={{ top: -7 * index }} />;
        });
    };

    return (
        <Fragment>
            <h1 className="remaining">You have: ${props.wallet} remaining!</h1>
            <AddMoney addMoney={props.addMoney} />
            <div className="table">
                <div className="stack">{renderPlates(props.emptyPlates)}</div>
            </div>
        </Fragment>
    );
};

export default Table;
