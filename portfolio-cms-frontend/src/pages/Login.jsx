import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email: email.trim(),
                    password: password
                }
            );

            console.log(
                "Login successful:",
                response.data
            );

            // Save JWT
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save email
            localStorage.setItem(
                "email",
                response.data.email
            );

            // Save role
            localStorage.setItem(
                "role",
                response.data.role
            );

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Response:",
                error.response?.data
            );

            if (error.response?.status === 401) {

                setError(
                    "Invalid email or password"
                );

            } else if (!error.response) {

                setError(
                    "Cannot connect to backend"
                );

            } else {

                setError(
                    error.response.data?.message ||
                    "Login failed"
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Portfolio CMS</h1>

                <p>Admin Login</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;