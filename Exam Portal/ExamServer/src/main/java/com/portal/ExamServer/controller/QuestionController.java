package com.portal.ExamServer.controller;

import com.portal.ExamServer.model.exam.Question;
import com.portal.ExamServer.model.exam.Quiz;
import com.portal.ExamServer.service.QuestionService;
import com.portal.ExamServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @GetMapping("/")
    public ResponseEntity<?> questions(){ return ResponseEntity.ok(this.questionService.getQuestions());
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestion(@PathVariable("questionId") Long questionId){
        return ResponseEntity.ok(this.questionService.getQuestion(questionId));
    }

    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId){
//        Quiz quiz = new Quiz();
//        quiz.setqId(quizId);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return  ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getListOfQuestions();

        List<Question> list = new ArrayList<>(questions);
        if(list.size() > Integer.parseInt(quiz.getNoOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.getNoOfQuestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("quizId") Long quizId){


        Quiz quiz = new Quiz();
        quiz.setqId(quizId);
        Set<Question> questions = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questions);

    }

}
