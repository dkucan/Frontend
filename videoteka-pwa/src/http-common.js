import axios from "axios";


export default axios.create({
    baseURL: "http://dkucan-001-site1.atempurl.com/swagger/",
    headers: {
        "Content-Type": "application/json"
    }
});