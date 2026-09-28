import { useEffect, useState } from "react";
import api from "../services/api";

function Blog() {

    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPosts = async () => {

        try {

            const response =
                await api.get("/blog");

            setPosts(response.data);

        } catch (error) {

            console.error(error);
            setError("Failed to load blog posts");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const clearForm = () => {

        setTitle("");
        setContent("");
        setPublishedDate("");
        setImageUrl("");
        setEditingId(null);
    };

    const savePost = async (e) => {

        e.preventDefault();
        setError("");

        const postData = {
            title,
            content,
            publishedDate,
            imageUrl
        };

        try {

            if (editingId) {

                await api.put(
                    `/blog/${editingId}`,
                    postData
                );

            } else {

                await api.post(
                    "/blog",
                    postData
                );
            }

            clearForm();

            await loadPosts();

        } catch (error) {

            console.error(error);

            setError(
                editingId
                    ? "Failed to update blog post"
                    : "Failed to create blog post"
            );
        }
    };

    const editPost = (post) => {

        setEditingId(post.id);

        setTitle(post.title || "");
        setContent(post.content || "");
        setPublishedDate(
            post.publishedDate || ""
        );
        setImageUrl(post.imageUrl || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deletePost = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this blog post?"
        )) {
            return;
        }

        try {

            await api.delete(`/blog/${id}`);

            await loadPosts();

        } catch (error) {

            console.error(error);
            setError("Failed to delete blog post");
        }
    };

    if (loading) {
        return <div>Loading blog posts...</div>;
    }

    return (
        <div>

            <h1>Blog</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <h2>
                {editingId
                    ? "Edit Blog Post"
                    : "Add Blog Post"}
            </h2>

            <form onSubmit={savePost}>

                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />

                <textarea
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    required
                    rows="8"
                />

                <input
                    type="date"
                    value={publishedDate}
                    onChange={(e) =>
                        setPublishedDate(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) =>
                        setImageUrl(e.target.value)
                    }
                />

                <button type="submit">
                    {editingId
                        ? "Update Blog Post"
                        : "Add Blog Post"}
                </button>

                {editingId && (

                    <button
                        type="button"
                        onClick={clearForm}
                    >
                        Cancel
                    </button>

                )}

            </form>

            <h2>
                Existing Blog Posts
            </h2>

            {posts.length === 0 ? (

                <p>
                    No blog posts found.
                </p>

            ) : (

                posts.map((post) => (

                    <div
                        key={post.id}
                        className="blog-card"
                    >

                        <h3>
                            {post.title}
                        </h3>

                        <p>
                            {post.content}
                        </p>

                        <p>
                            Published:{" "}
                            {post.publishedDate}
                        </p>

                        {post.imageUrl && (

                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                width="200"
                            />

                        )}

                        <br />

                        <button
                            onClick={() =>
                                editPost(post)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deletePost(post.id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default Blog;