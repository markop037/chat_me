package com.markop.chatme.service;

import com.markop.chatme.model.Post;
import com.markop.chatme.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post){
        return postRepository.save(post);
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public void deletePost(int id){
        postRepository.deleteById(id);
    }

    public void updateLikes(int post_id, int likes){
        Post post = postRepository.findById(post_id).orElse(null);
        if(post != null){
            post.setLikes(likes);
            postRepository.save(post);
        }
    }

}
