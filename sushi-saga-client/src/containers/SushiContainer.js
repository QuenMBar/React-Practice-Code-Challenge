import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = (props) => {
    return (
        <Fragment>
            <div className="belt">
                {props.fourPieces.map((onePiece) => (
                    <Sushi eatMe={props.eatMe} key={onePiece.id} info={onePiece} />
                ))}
                <MoreButton show={props.show} />
            </div>
        </Fragment>
    );
};

export default SushiContainer;
