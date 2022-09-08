import React, { useEffect, useState } from "react"
import { fetchTodo } from "../../redux/getTodoSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
// import { Ilist } from "./model";
import Cards from "./cards";
import Pagination from "../pagination";


const ApiTodo: React.FC = () => {

    let [currentPage, setCurrentPage] = useState<number>(1);
    let [perPage] = useState<number>(15);

    const dispatch = useAppDispatch()

    const { list, loading } = useAppSelector(state => state.getTodos)

    let indexOfLast = currentPage * perPage;
    let indexOfFrst = indexOfLast - perPage;
    let currentList = list.slice(indexOfFrst, indexOfLast + currentPage);

    const pagination = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {

        dispatch(fetchTodo())

    }, [])

    return (
        <div className="list">
            {
                loading
                    ? <div className="loading">loading....</div> :
                    <>
                        <div className="cards">
                            {
                                currentList.map((items: any, ind: number) => {
                                    return (
                                        <div key={ind} className="list_items">
                                            <Cards
                                                data={items}
                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="">
                            <Pagination
                                currentPage={currentPage}
                                totalPost={currentList.length}
                                pagination={pagination}
                            />

                        </div>
                    </>


            }
        </div>
    )
}

export default ApiTodo