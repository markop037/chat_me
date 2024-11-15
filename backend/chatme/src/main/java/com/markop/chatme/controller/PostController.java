package com.markop.chatme.controller;

import com.markop.chatme.model.Post;
import com.markop.chatme.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        Post savedPost =postService.createPost(post);
        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/all")
    public List<Post> getAllPosts(){
        return postService.getAllPosts();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok("Post deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/like/{id}")
    public void likePost(@PathVariable int id, @RequestBody int likes){
        postService.updateLikes(id, likes);
    }
}
