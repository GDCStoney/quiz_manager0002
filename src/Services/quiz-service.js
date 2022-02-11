import axios from "axios";

import authHeader from "./auth-header";


const API_URL = "http://localhost:8080/api/quizzes";

class QuizService {

    getQuizList() {
        return axios({
            method: 'get',
            url: API_URL,
            headers: authHeader()
            });
    }
}

export default new QuizService();