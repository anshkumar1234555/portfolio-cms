import { useEffect, useState } from "react";
import api from "../services/api";

function Experience() {

    const [experiences, setExperiences] = useState([]);

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadExperiences = async () => {

        try {

            const response =
                await api.get("/experiences");

            setExperiences(response.data);

        } catch (error) {

            console.error(error);
            setError("Failed to load experiences");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    const clearForm = () => {

        setCompany("");
        setPosition("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setTechStack("");
        setEditingId(null);
    };

    const saveExperience = async (e) => {

        e.preventDefault();
        setError("");

        const experienceData = {
            company,
            position,
            startDate,
            endDate,
            description,
            techStack
        };

        try {

            if (editingId) {

                await api.put(
                    `/experiences/${editingId}`,
                    experienceData
                );

            } else {

                await api.post(
                    "/experiences",
                    experienceData
                );
            }

            clearForm();

            await loadExperiences();

        } catch (error) {

            console.error(error);

            setError(
                editingId
                    ? "Failed to update experience"
                    : "Failed to create experience"
            );
        }
    };

    const editExperience = (experience) => {

        setEditingId(experience.id);

        setCompany(experience.company || "");
        setPosition(experience.position || "");
        setStartDate(experience.startDate || "");
        setEndDate(experience.endDate || "");
        setDescription(experience.description || "");
        setTechStack(experience.techStack || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteExperience = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this experience?"
        )) {
            return;
        }

        try {

            await api.delete(
                `/experiences/${id}`
            );

            await loadExperiences();

        } catch (error) {

            console.error(error);
            setError("Failed to delete experience");
        }
    };

    if (loading) {
        return <div>Loading experiences...</div>;
    }

    return (
        <div>

            <h1>Experience</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <h2>
                {editingId
                    ? "Edit Experience"
                    : "Add Experience"}
            </h2>

            <form onSubmit={saveExperience}>

                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) =>
                        setCompany(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) =>
                        setPosition(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) =>
                        setStartDate(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) =>
                        setEndDate(e.target.value)
                    }
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

                <button type="submit">
                    {editingId
                        ? "Update Experience"
                        : "Add Experience"}
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

            <h2>Existing Experience</h2>

            {experiences.length === 0 ? (

                <p>
                    No experience records found.
                </p>

            ) : (

                experiences.map((experience) => (

                    <div
                        key={experience.id}
                        className="experience-card"
                    >

                        <h3>
                            {experience.position}
                        </h3>

                        <h4>
                            {experience.company}
                        </h4>

                        <p>
                            {experience.startDate}
                            {" - "}
                            {experience.endDate || "Present"}
                        </p>

                        <p>
                            {experience.description}
                        </p>

                        <p>
                            <strong>
                                Tech Stack:
                            </strong>{" "}
                            {experience.techStack}
                        </p>

                        <button
                            onClick={() =>
                                editExperience(experience)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteExperience(
                                    experience.id
                                )
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

export default Experience;