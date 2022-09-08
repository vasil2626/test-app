import React from "react";
import { Ilist } from "../model";

const Cards: React.FC<any> = ({ data }) => {

    return (
        <>
            <div className="list_items_card" key={data.id}>
                <div className="list_item_userId">iser id :{data.userId}</div>
                <hr />
                <span className="list_item_title">{data.title}</span>
            </div>
        </>
    )
}

export default Cards