import React from "react"

const Pagination: React.FC<any> = ({ totalPost, pagination }) => {

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPost - i); i++) {
        pageNumber.push(i);
    }

    return (
        <div>
            <ul className="buttons_page">
                {pageNumber.map((item, index) => {
                    return (
                        <span key={index} >
                            <button
                                className="buttons"
                                onClick={() => pagination(item)}
                                disabled={totalPost <= pageNumber.length}
                            >
                                {item}
                            </button>
                        </span>
                    );
                })}
            </ul>
        </div>
    )
}

export default Pagination