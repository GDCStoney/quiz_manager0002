import axios from "axios";

import authHeader from "./auth-header";


const API_BASE_URL = "http://localhost:8080/api/quizzes/";
const API_QUESTIONS_URL = '/questions';

class QuestionService {

    fetchQuestionList(quizId) {
        return axios({
            method: 'get',
            url: API_BASE_URL + quizId + API_QUESTIONS_URL,
            headers: authHeader()
        });
    }
}

export default new QuestionService();