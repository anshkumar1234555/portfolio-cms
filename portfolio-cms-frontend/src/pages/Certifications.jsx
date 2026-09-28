import { useEffect, useState } from "react";
import api from "../services/api";

function Certifications() {

    const [certifications, setCertifications] = useState([]);

    const [title, setTitle] = useState("");
    const [issuer, setIssuer] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [credentialUrl, setCredentialUrl] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCertifications = async () => {

        try {

            const response =
                await api.get("/certifications");

            setCertifications(response.data);

        } catch (error) {

            console.error(error);
            setError("Failed to load certifications");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadCertifications();
    }, []);

    const clearForm = () => {

        setTitle("");
        setIssuer("");
        setIssueDate("");
        setCredentialUrl("");
        setEditingId(null);
    };

    const saveCertification = async (e) => {

        e.preventDefault();
        setError("");

        const certificationData = {
            title,
            issuer,
            issueDate,
            credentialUrl
        };

        try {

            if (editingId) {

                await api.put(
                    `/certifications/${editingId}`,
                    certificationData
                );

            } else {

                await api.post(
                    "/certifications",
                    certificationData
                );
            }

            clearForm();

            await loadCertifications();

        } catch (error) {

            console.error(error);

            setError(
                editingId
                    ? "Failed to update certification"
                    : "Failed to create certification"
            );
        }
    };

    const editCertification = (certification) => {

        setEditingId(certification.id);

        setTitle(certification.title || "");
        setIssuer(certification.issuer || "");
        setIssueDate(certification.issueDate || "");
        setCredentialUrl(
            certification.credentialUrl || ""
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteCertification = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this certification?"
        )) {
            return;
        }

        try {

            await api.delete(
                `/certifications/${id}`
            );

            await loadCertifications();

        } catch (error) {

            console.error(error);
            setError("Failed to delete certification");
        }
    };

    if (loading) {
        return <div>Loading certifications...</div>;
    }

    return (
        <div>

            <h1>Certifications</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <h2>
                {editingId
                    ? "Edit Certification"
                    : "Add Certification"}
            </h2>

            <form onSubmit={saveCertification}>

                <input
                    type="text"
                    placeholder="Certification Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Issuer"
                    value={issuer}
                    onChange={(e) =>
                        setIssuer(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Issue Date"
                    value={issueDate}
                    onChange={(e) =>
                        setIssueDate(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Credential URL"
                    value={credentialUrl}
                    onChange={(e) =>
                        setCredentialUrl(e.target.value)
                    }
                />

                <button type="submit">
                    {editingId
                        ? "Update Certification"
                        : "Add Certification"}
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

            <h2>Existing Certifications</h2>

            {certifications.length === 0 ? (

                <p>
                    No certifications found.
                </p>

            ) : (

                certifications.map((certification) => (

                    <div
                        key={certification.id}
                        className="certification-card"
                    >

                        <h3>
                            {certification.title}
                        </h3>

                        <p>
                            Issuer: {certification.issuer}
                        </p>

                        <p>
                            Issue Date:{" "}
                            {certification.issueDate}
                        </p>

                        {certification.credentialUrl && (

                            <p>
                                <a
                                    href={
                                        certification.credentialUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Credential
                                </a>
                            </p>

                        )}

                        <button
                            onClick={() =>
                                editCertification(
                                    certification
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteCertification(
                                    certification.id
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

export default Certifications;