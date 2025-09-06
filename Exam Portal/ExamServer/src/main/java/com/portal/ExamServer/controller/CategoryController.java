package com.portal.ExamServer.controller;

import com.portal.ExamServer.model.exam.Category;
import com.portal.ExamServer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //add category
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category category1 = this.categoryService.addCategory(category);
        return new ResponseEntity<>(category1, HttpStatus.OK);
    }

    //get category
    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategory(@PathVariable("categoryId") Long categoryId){
        Category savedCategory = this.categoryService.getCategory(categoryId);
        return ResponseEntity.ok(savedCategory);
    }

    //get all categories
    @GetMapping("/")
    public ResponseEntity<?> getAllCategories(){
        return  ResponseEntity.ok(this.categoryService.getCategories());
    }


    //update category
    @PutMapping("/")
    public ResponseEntity<?> updateCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.updateCategory(category));
    }

    //deleting category
    @DeleteMapping("/{categoryId}")
    public void deleteCatogery(@PathVariable("categoryId") Long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }

}
