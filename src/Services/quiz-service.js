import axios from "axios";

import authHeader from "./auth-header";


const API_URL = "http://localhost:8080/api/quizzes";

class QuizService {

    fetchQuizList() {
        return axios({
            method: 'get',
            url: API_URL,
            headers: authHeader()
            });
    }

    addQuiz(quiz) {
        return axios({
            method: 'post',
            url: API_URL,
            data: { name: quiz.name, description: quiz.description },
            headers: authHeader()
        });
    }

    updateQuiz(quiz) {
        return axios({
            method: 'put',
            url: API_URL + "/" + quiz.quizId,
            data: { name: quiz.name, description: quiz.description },
            headers: authHeader()
        });
    }

    deleteQuiz(quiz) {
        return axios({
            method: 'delete',
            url: API_URL + "/" + quiz.quizId,
            headers: authHeader()
        });
    }
}

export default new QuizService();