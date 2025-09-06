package com.portal.ExamServer.repo;

import com.portal.ExamServer.model.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
