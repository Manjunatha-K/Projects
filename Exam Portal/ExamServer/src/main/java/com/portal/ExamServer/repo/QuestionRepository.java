package com.portal.ExamServer.repo;

import com.portal.ExamServer.model.exam.Category;
import com.portal.ExamServer.model.exam.Question;
import com.portal.ExamServer.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    Set<Question> findByQuiz(Quiz quiz);
}
