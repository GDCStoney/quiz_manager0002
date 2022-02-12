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

    addQResponse(qResponse) {
        return axios({
            method: 'post',
            url: API_BASE_URL + qResponse.quizId + API_QUESTIONS_URL + qResponse.questionId + API_QRESPONSES_URL,
            data: { responseText: qResponse.responseText, correctAnswer: qResponse.correctAnswer },
            headers: authHeader()
        });
    }

    updateQResponse(qResponse) {
        return axios({
            method: 'put',
            url: API_BASE_URL + qResponse.quizId + API_QUESTIONS_URL + qResponse.questionId + API_QRESPONSES_URL + "/" + qResponse.qResponseId,
            data: { responseText: qResponse.responseText, correctAnswer: qResponse.correctAnswer },
            headers: authHeader()
        });
    }

    deleteQResponse(qResponse) {
        return axios({
            method: 'delete',
            url: API_BASE_URL + qResponse.quizId + API_QUESTIONS_URL + qResponse.questionId + API_QRESPONSES_URL + "/" + qResponse.qResponseId,
            headers: authHeader()
        });
    }
}

export default new QResponseService();