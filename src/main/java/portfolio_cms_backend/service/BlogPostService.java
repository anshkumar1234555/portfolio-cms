package portfolio_cms_backend.service;

import portfolio_cms_backend.model.BlogPost;
import portfolio_cms_backend.repository.BlogPostRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    // CREATE
    public BlogPost createBlogPost(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }

    // GET ALL
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    // GET BY ID
    public BlogPost getBlogPostById(Long id) {

        return blogPostRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Blog post not found")
                );
    }

    // UPDATE
    public BlogPost updateBlogPost(
            Long id,
            BlogPost blogPost) {

        BlogPost existingBlogPost =
                blogPostRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Blog post not found"
                                )
                        );

        existingBlogPost.setTitle(
                blogPost.getTitle()
        );

        existingBlogPost.setContent(
                blogPost.getContent()
        );

        existingBlogPost.setPublishedDate(
                blogPost.getPublishedDate()
        );

        existingBlogPost.setImageUrl(
                blogPost.getImageUrl()
        );

        return blogPostRepository.save(existingBlogPost);
    }

    // DELETE
    public void deleteBlogPost(Long id) {

        if (!blogPostRepository.existsById(id)) {
            throw new RuntimeException("Blog post not found");
        }

        blogPostRepository.deleteById(id);
    }
}