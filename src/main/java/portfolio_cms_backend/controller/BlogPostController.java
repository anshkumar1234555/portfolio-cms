package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.BlogPost;
import portfolio_cms_backend.service.BlogPostService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogPostController {

    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(
            @RequestBody BlogPost blogPost) {

        return ResponseEntity.ok(
                blogPostService.createBlogPost(blogPost)
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {

        return ResponseEntity.ok(
                blogPostService.getAllBlogPosts()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                blogPostService.getBlogPostById(id)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(
            @PathVariable Long id,
            @RequestBody BlogPost blogPost) {

        return ResponseEntity.ok(
                blogPostService.updateBlogPost(
                        id,
                        blogPost
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(
            @PathVariable Long id) {

        blogPostService.deleteBlogPost(id);

        return ResponseEntity.noContent().build();
    }
}