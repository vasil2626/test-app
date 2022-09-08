import axios from "axios";

const instace = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export default instace;
