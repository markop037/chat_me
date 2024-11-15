package com.markop.chatme.service;

import com.markop.chatme.model.Comment;
import com.markop.chatme.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments(){
        return commentRepository.findAll();
    }

    public void deleteComment(int id){
        commentRepository.deleteById(id);
    }

}
