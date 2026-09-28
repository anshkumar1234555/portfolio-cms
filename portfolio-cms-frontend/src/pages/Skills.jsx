import { useEffect, useState } from "react";
import api from "../services/api";

function Skills() {

    const [skills, setSkills] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadSkills = async () => {
        try {
            const response = await api.get("/skills");
            setSkills(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const clearForm = () => {
        setName("");
        setCategory("");
        setLevel("");
        setEditingId(null);
    };

    const saveSkill = async (e) => {

        e.preventDefault();
        setError("");

        const skillData = {
            name,
            category,
            level
        };

        try {

            if (editingId) {

                await api.put(
                    `/skills/${editingId}`,
                    skillData
                );

            } else {

                await api.post(
                    "/skills",
                    skillData
                );
            }

            clearForm();
            await loadSkills();

        } catch (error) {

            console.error(error);

            setError(
                editingId
                    ? "Failed to update skill"
                    : "Failed to create skill"
            );
        }
    };

    const editSkill = (skill) => {

        setEditingId(skill.id);

        setName(skill.name || "");
        setCategory(skill.category || "");
        setLevel(skill.level || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteSkill = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this skill?"
        )) {
            return;
        }

        try {

            await api.delete(`/skills/${id}`);

            await loadSkills();

        } catch (error) {

            console.error(error);
            setError("Failed to delete skill");
        }
    };

    if (loading) {
        return <div>Loading skills...</div>;
    }

    return (
        <div>

            <h1>Skills</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <h2>
                {editingId
                    ? "Edit Skill"
                    : "Add Skill"}
            </h2>

            <form onSubmit={saveSkill}>

                <input
                    type="text"
                    placeholder="Skill Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Level"
                    value={level}
                    onChange={(e) =>
                        setLevel(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    {editingId
                        ? "Update Skill"
                        : "Add Skill"}
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

            <h2>Existing Skills</h2>

            {skills.length === 0 ? (

                <p>No skills found.</p>

            ) : (

                skills.map((skill) => (

                    <div
                        key={skill.id}
                        className="skill-card"
                    >

                        <h3>
                            {skill.name}
                        </h3>

                        <p>
                            Category: {skill.category}
                        </p>

                        <p>
                            Level: {skill.level}
                        </p>

                        <button
                            onClick={() =>
                                editSkill(skill)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteSkill(skill.id)
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

export default Skills;