import axios from "axios";


export default axios.create({
    baseURL: "https://dkucan-001-site1.atempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});