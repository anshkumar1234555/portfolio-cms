import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadStats = async () => {

            try {

                const response =
                    await api.get("/dashboard/stats");

                setStats(response.data);

            } catch (error) {

                console.error(error);

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    localStorage.removeItem("role");

                    navigate("/login");

                    return;
                }

                setError(
                    "Failed to load dashboard"
                );

            } finally {

                setLoading(false);
            }
        };

        loadStats();

    }, [navigate]);

    if (loading) {

        return (
            <div className="dashboard-layout">

                <Sidebar />

                <main className="dashboard">

                    <h2>
                        Loading dashboard...
                    </h2>

                </main>

            </div>
        );
    }

    if (error) {

        return (
            <div className="dashboard-layout">

                <Sidebar />

                <main className="dashboard">

                    <h2 className="error">
                        {error}
                    </h2>

                </main>

            </div>
        );
    }

    return (
        <div className="dashboard-layout">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <main className="dashboard">

                <header className="dashboard-header">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Welcome to your Portfolio CMS
                        </p>

                    </div>

                </header>

                {/* OVERVIEW */}

                <section>

                    <h2>
                        Overview
                    </h2>

                    <div className="stats-grid">

                        {/* PROJECTS */}

                        <div className="stat-card">

                            <h3>
                                Projects
                            </h3>

                            <p>
                                {stats.projects}
                            </p>

                        </div>

                        {/* SKILLS */}

                        <div className="stat-card">

                            <h3>
                                Skills
                            </h3>

                            <p>
                                {stats.skills}
                            </p>

                        </div>

                        {/* EXPERIENCE */}

                        <div className="stat-card">

                            <h3>
                                Experience
                            </h3>

                            <p>
                                {stats.experiences}
                            </p>

                        </div>

                        {/* EDUCATION */}

                        <div className="stat-card">

                            <h3>
                                Education
                            </h3>

                            <p>
                                {stats.education}
                            </p>

                        </div>

                        {/* CERTIFICATIONS */}

                        <div className="stat-card">

                            <h3>
                                Certifications
                            </h3>

                            <p>
                                {stats.certifications}
                            </p>

                        </div>

                        {/* BLOG */}

                        <div className="stat-card">

                            <h3>
                                Blog Posts
                            </h3>

                            <p>
                                {stats.blogPosts}
                            </p>

                        </div>

                        {/* MESSAGES */}

                        <div className="stat-card">

                            <h3>
                                Messages
                            </h3>

                            <p>
                                {stats.messages}
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;