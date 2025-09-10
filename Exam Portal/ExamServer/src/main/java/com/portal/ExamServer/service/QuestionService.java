package com.portal.ExamServer.service;

import com.portal.ExamServer.model.exam.Question;
import com.portal.ExamServer.model.exam.Quiz;

import java.util.Set;

public interface QuestionService {

    public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public Question getQuestion(Long questionId);

    public Set<Question> getQuestions();

    public void deleteQuestion(Long questionId);

    public Set<Question> getQuestionsOfQuiz(Quiz Quiz);

}
