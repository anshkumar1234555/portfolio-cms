package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.BlogPost;
import portfolio_cms_backend.service.BlogPostService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/blog")
@CrossOrigin(origins = "*")
public class PublicBlogPostController {

    private final BlogPostService blogPostService;

    public PublicBlogPostController(
            BlogPostService blogPostService) {

        this.blogPostService = blogPostService;
    }

    // GET ALL PUBLIC BLOG POSTS
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {

        return ResponseEntity.ok(
                blogPostService.getAllBlogPosts()
        );
    }

    // GET PUBLIC BLOG POST BY ID
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                blogPostService.getBlogPostById(id)
        );
    }
}