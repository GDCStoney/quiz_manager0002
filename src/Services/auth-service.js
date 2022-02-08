import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
    register(roleId, firstName, lastName, email, password) {
        return axios.post(API_URL + "users/register", {
            roleId,
            firstName,
            lastName,
            email,
            password
        });
    }

    login(email, password) {
        return axios.post(API_URL + "users/login", {
            email,
            password
        }).then (
            response => {
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            }
        );
    }
}

export default new AuthService();