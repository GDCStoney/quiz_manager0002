import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
    register(roleId, firstName, lastName, email, password) {
        return axios.post(API_URL + "users/register", {
            roleId;
            firstName,
            lastName,
            email,
            password
        });
    }
}

export default new AuthService();