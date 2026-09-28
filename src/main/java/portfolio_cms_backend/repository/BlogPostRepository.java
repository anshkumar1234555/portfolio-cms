package portfolio_cms_backend.repository;

import portfolio_cms_backend.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository
        extends JpaRepository<BlogPost, Long> {
}