import { useEffect, useState } from "react";
import api from "../services/api";

function Education() {

    const [education, setEducation] = useState([]);

    const [degree, setDegree] = useState("");
    const [institution, setInstitution] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEducation = async () => {

        try {

            const response =
                await api.get("/education");

            setEducation(response.data);

        } catch (error) {

            console.error(error);
            setError("Failed to load education");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadEducation();
    }, []);

    const clearForm = () => {

        setDegree("");
        setInstitution("");
        setStartYear("");
        setEndYear("");
        setDescription("");
        setEditingId(null);
    };

    const saveEducation = async (e) => {

        e.preventDefault();
        setError("");

        const educationData = {
            degree,
            institution,
            startYear,
            endYear,
            description
        };

        try {

            if (editingId) {

                await api.put(
                    `/education/${editingId}`,
                    educationData
                );

            } else {

                await api.post(
                    "/education",
                    educationData
                );
            }

            clearForm();

            await loadEducation();

        } catch (error) {

            console.error(error);

            setError(
                editingId
                    ? "Failed to update education"
                    : "Failed to create education"
            );
        }
    };

    const editEducation = (item) => {

        setEditingId(item.id);

        setDegree(item.degree || "");
        setInstitution(item.institution || "");
        setStartYear(item.startYear || "");
        setEndYear(item.endYear || "");
        setDescription(item.description || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteEducation = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this education?"
        )) {
            return;
        }

        try {

            await api.delete(
                `/education/${id}`
            );

            await loadEducation();

        } catch (error) {

            console.error(error);
            setError("Failed to delete education");
        }
    };

    if (loading) {
        return <div>Loading education...</div>;
    }

    return (
        <div>

            <h1>Education</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <h2>
                {editingId
                    ? "Edit Education"
                    : "Add Education"}
            </h2>

            <form onSubmit={saveEducation}>

                <input
                    type="text"
                    placeholder="Degree"
                    value={degree}
                    onChange={(e) =>
                        setDegree(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Institution"
                    value={institution}
                    onChange={(e) =>
                        setInstitution(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Start Year"
                    value={startYear}
                    onChange={(e) =>
                        setStartYear(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="End Year"
                    value={endYear}
                    onChange={(e) =>
                        setEndYear(e.target.value)
                    }
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button type="submit">
                    {editingId
                        ? "Update Education"
                        : "Add Education"}
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

            <h2>Existing Education</h2>

            {education.length === 0 ? (

                <p>
                    No education records found.
                </p>

            ) : (

                education.map((item) => (

                    <div
                        key={item.id}
                        className="education-card"
                    >

                        <h3>
                            {item.degree}
                        </h3>

                        <p>
                            {item.institution}
                        </p>

                        <p>
                            {item.startYear}
                            {" - "}
                            {item.endYear}
                        </p>

                        <p>
                            {item.description}
                        </p>

                        <button
                            onClick={() =>
                                editEducation(item)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteEducation(item.id)
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

export default Education;