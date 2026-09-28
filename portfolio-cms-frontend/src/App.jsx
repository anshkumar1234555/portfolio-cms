import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Certifications from "./pages/Certifications";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import Messages from "./pages/Messages";
import Home from "./pages/Home";

function App() {

    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC PORTFOLIO */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        token
                            ? <Dashboard />
                            : <Navigate to="/login" />
                    }
                />

                {/* PROJECTS */}
                <Route
                    path="/projects"
                    element={
                        token
                            ? <Projects />
                            : <Navigate to="/login" />
                    }
                />

                {/* SKILLS */}
                <Route
                    path="/skills"
                    element={
                        token
                            ? <Skills />
                            : <Navigate to="/login" />
                    }
                />

                {/* EXPERIENCE */}
                <Route
                    path="/experiences"
                    element={
                        token
                            ? <Experience />
                            : <Navigate to="/login" />
                    }
                />

                {/* EDUCATION */}
                <Route
                    path="/education"
                    element={
                        token
                            ? <Education />
                            : <Navigate to="/login" />
                    }
                />

                {/* CERTIFICATIONS */}
                <Route
                    path="/certifications"
                    element={
                        token
                            ? <Certifications />
                            : <Navigate to="/login" />
                    }
                />

                {/* BLOG */}
                <Route
                    path="/blog"
                    element={
                        token
                            ? <Blog />
                            : <Navigate to="/login" />
                    }
                />

                {/* MESSAGES */}
                <Route
                    path="/messages"
                    element={
                        token
                            ? <Messages />
                            : <Navigate to="/login" />
                    }
                />

                {/* UNKNOWN */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={
                                token
                                    ? "/dashboard"
                                    : "/"
                            }
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;