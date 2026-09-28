import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {

    const [projects, setProjects] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProjects = async () => {

        try {

            const response =
                await api.get("/projects");

            setProjects(response.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load projects");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        loadProjects();

    }, []);

    const clearForm = () => {

        setTitle("");
        setDescription("");
        setTechStack("");
        setImageUrl("");
        setGithubUrl("");
        setLiveUrl("");
        setEditingId(null);
    };

    const saveProject = async (e) => {

        e.preventDefault();

        setError("");

        const projectData = {
            title,
            description,
            techStack,
            imageUrl,
            githubUrl,
            liveUrl
        };

        try {

            if (editingId) {

                await api.put(
                    `/projects/${editingId}`,
                    projectData
                );

            } else {

                await api.post(
                    "/projects",
                    projectData
                );
            }

            clearForm();

            await loadProjects();

        } catch (error) {

            console.error(error);

            setError(
                editingId
                    ? "Failed to update project"
                    : "Failed to create project"
            );
        }
    };

    const editProject = (project) => {

        setEditingId(project.id);

        setTitle(project.title || "");
        setDescription(project.description || "");
        setTechStack(project.techStack || "");
        setImageUrl(project.imageUrl || "");
        setGithubUrl(project.githubUrl || "");
        setLiveUrl(project.liveUrl || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteProject = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this project?"
        )) {
            return;
        }

        try {

            await api.delete(
                `/projects/${id}`
            );

            await loadProjects();

        } catch (error) {

            console.error(error);

            setError(
                "Failed to delete project"
            );
        }
    };

    if (loading) {

        return (
            <div>
                Loading projects...
            </div>
        );
    }

    return (
        <div>

            <h1>Projects</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {/* FORM */}

            <h2>
                {editingId
                    ? "Edit Project"
                    : "Add Project"}
            </h2>

            <form onSubmit={saveProject}>

                <input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Tech Stack"
                    value={techStack}
                    onChange={(e) =>
                        setTechStack(e.target.value)
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

                <input
                    type="text"
                    placeholder="GitHub URL"
                    value={githubUrl}
                    onChange={(e) =>
                        setGithubUrl(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Live URL"
                    value={liveUrl}
                    onChange={(e) =>
                        setLiveUrl(e.target.value)
                    }
                />

                <button type="submit">

                    {editingId
                        ? "Update Project"
                        : "Add Project"}

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

            {/* PROJECT LIST */}

            <h2>
                Existing Projects
            </h2>

            {projects.length === 0 ? (

                <p>
                    No projects found.
                </p>

            ) : (

                projects.map((project) => (

                    <div
                        key={project.id}
                        className="project-card"
                    >

                        <h3>
                            {project.title}
                        </h3>

                        <p>
                            {project.description}
                        </p>

                        <p>
                            <strong>
                                Tech Stack:
                            </strong>{" "}
                            {project.techStack}
                        </p>

                        {project.githubUrl && (

                            <p>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                            </p>

                        )}

                        {project.liveUrl && (

                            <p>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Live Project
                                </a>
                            </p>

                        )}

                        <button
                            onClick={() =>
                                editProject(project)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteProject(project.id)
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

export default Projects;