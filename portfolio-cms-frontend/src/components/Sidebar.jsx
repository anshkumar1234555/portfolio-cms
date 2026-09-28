import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <h2>Portfolio CMS</h2>

            <nav>

                <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                </button>

                <button onClick={() => navigate("/projects")}>
                    Projects
                </button>

                <button onClick={() => navigate("/skills")}>
                    Skills
                </button>

                <button onClick={() => navigate("/experiences")}>
                    Experience
                </button>

                <button onClick={() => navigate("/education")}>
                    Education
                </button>

                <button onClick={() => navigate("/certifications")}>
                    Certifications
                </button>

                <button onClick={() => navigate("/blog")}>
                    Blog
                </button>

                <button onClick={() => navigate("/messages")}>
                    Messages
                </button>

            </nav>

            <button
                className="logout-button"
                onClick={logout}
            >
                Logout
            </button>

        </aside>
    );
}

export default Sidebar;