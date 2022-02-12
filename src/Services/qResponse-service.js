import axios from "axios";

import authHeader from "./auth-header";


const API_BASE_URL = "http://localhost:8080/api/quizzes/";
const API_QUESTIONS_URL = '/questions/';
const API_QRESPONSES_URL = '/qresponses';

class QResponseService {
    fetchQResponseList(quizId, questionId) {
        return axios({
            method: 'get',
            url: API_BASE_URL + quizId + API_QUESTIONS_URL + questionId + API_QRESPONSES_URL,
            headers: authHeader()
        });
    }
}

export default new QResponseService();