import React, {Component} from "react";
import QuizList from "../App/Quizzes/QuizList";

export default class ManagerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        }
    }

    render() {
        return (
            <div className="container">
                <QuizList />
            </div>
        )
    }
}