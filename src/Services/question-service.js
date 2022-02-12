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

    addQuestion(question) {
        return axios({
            method: 'post',
            url: API_BASE_URL + question.quizId + API_QUESTIONS_URL,
            data: { questionText: question.questionText },
            headers: authHeader()
        });
    }

    updateQuestion(question) {
        return axios({
            method: 'put',
            url: API_BASE_URL + question.quizId + API_QUESTIONS_URL + "/" + question.questionId,
            data: { questionText: question.questionText },
            headers: authHeader()
        });
    }

    deleteQuestion(question) {
        return axios({
            method: 'delete',
            url: API_BASE_URL + question.quizId + API_QUESTIONS_URL + "/" + question.questionId,
            headers: authHeader()
        });
    }
}

export default new QuestionService();