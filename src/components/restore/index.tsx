import React, { useEffect, useState } from "react";
import { Irestore } from "./model"

const Restore: React.FC<Irestore> = ({ datas, close, isRestored, deleteRestore }) => {

    const [data, setData] = useState<any>()

    const handleClose = (): void => {
        close(false)
    }

    const handleDelete = (el: boolean) => {

        deleteRestore(el)

    }

    const handleRestore = (data: object): void => {
        isRestored(data)
        deleteRestore(data)
    }

    useEffect(() => {
        setData([...datas])
    }, [datas])

    return (
        <div className="popup">
            <div className="popup-window">
                <div className="popup_head">
                    <span className="poup_title">Restore</span>
                    <span className="poup_close" onClick={handleClose}>X</span>
                </div>
                <div className="popup-content">
                    <div className="restore_item">
                        {
                            data?.map((item: any, ind: number) => {
                                return (
                                    <ul className="lists" key={ind}>
                                        <li className="list-items">
                                            <div>{item.date}</div>
                                            <div>{item.value}</div>
                                            <button onClick={() => handleDelete(item)}>delete</button>
                                            <button onClick={() => handleRestore(item)}>restore</button>
                                        </li>


                                    </ul>
                                )
                            })
                        }
                    </div>

                    <div className="button_wrapper">
                        <button className="popup_buttons cancel" onClick={() => handleClose()}>Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Restore;