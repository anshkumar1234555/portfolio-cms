import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
    // ==========================================
    // STATES
    // ==========================================
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [certifications, setCertifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [contactStatus, setContactStatus] = useState("");
    const [sending, setSending] = useState(false);

    // ==========================================
    // LOAD PUBLIC PORTFOLIO DATA
    // ==========================================
    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    projectsResponse,
                    skillsResponse,
                    experiencesResponse,
                    educationResponse,
                    certificationsResponse
                ] = await Promise.all([
                    api.get("/public/projects"),
                    api.get("/public/skills"),
                    api.get("/public/experiences"),
                    api.get("/public/education"),
                    api.get("/public/certifications")
                ]);

                setProjects(projectsResponse.data);
                setSkills(skillsResponse.data);
                setExperiences(experiencesResponse.data);
                setEducation(educationResponse.data);
                setCertifications(certificationsResponse.data);
            } catch (error) {
                console.error("Failed to load portfolio data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ==========================================
    // CONTACT INPUT
    // ==========================================
    const handleContactChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    // ==========================================
    // SEND CONTACT MESSAGE
    // ==========================================
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setContactStatus("");

        try {
            await api.post("/public/contact", contactForm);
            setContactStatus("Message sent successfully! 🎉");
            setContactForm({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            console.error("Contact error:", error);
            setContactStatus("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================
    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "22px",
                    fontWeight: "600"
                }}
            >
                Loading portfolio...
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================
    return (
        <div className="portfolio">
            {/* ==========================================
                NAVBAR
            ========================================== */}
            <nav className="portfolio-navbar">
                <h2>Ansh.dev</h2>
                <div>
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                    <a href="#education">Education</a>
                    <a href="#certifications">Certifications</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            {/* ==========================================
                HERO
            ========================================== */}
            <section id="home" className="hero-section">
                <div>
                    <p>👋 Hello, I'm</p>
                    <h1>Ansh Kumar Singh</h1>
                    <h2>Java Backend Developer</h2>
                    <p>
                        I build backend applications, REST APIs and full-stack
                        applications using Java, Spring Boot, PostgreSQL and React.
                    </p>
                    <a href="#projects">View My Projects</a>
                </div>
            </section>

            {/* ==========================================
                ABOUT
            ========================================== */}
            <section id="about">
                <h2>About Me</h2>
                <p>
                    I am a Computer Science Engineering graduate interested in backend
                    development, software engineering and AI-powered applications.
                    I enjoy building practical applications using Java, Spring Boot, REST APIs,
                    PostgreSQL, JWT authentication and React.
                    I focus on writing clean, maintainable and practical software while
                    continuously improving my development and system design skills.
                </p>
            </section>

            {/* ==========================================
                SKILLS
            ========================================== */}
            <section id="skills">
                <h2>Skills</h2>
                <div>
                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <div key={skill.id}>
                                <h3>{skill.name}</h3>
                                {skill.category && <p>Category: {skill.category}</p>}
                                {skill.level && <p>Level: {skill.level}</p>}
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>Java</h3>
                            <p>Backend Development</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                EXPERIENCE
            ========================================== */}
            <section id="experience">
                <h2>Experience</h2>
                <div>
                    {experiences.length > 0 ? (
                        experiences.map((experience) => (
                            <div key={experience.id}>
                                <h3>{experience.position || experience.role}</h3>
                                <h4>{experience.company}</h4>
                                <p>
                                    {experience.startDate} - {experience.endDate || "Present"}
                                </p>
                                <p>{experience.description}</p>
                                {experience.techStack && (
                                    <p>
                                        <strong>Tech Stack:</strong> {experience.techStack}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>Experience</h3>
                            <p>Professional experience will appear here.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                PROJECTS
            ========================================== */}
            <section id="projects">
                <h2>Projects</h2>
                <div>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                {project.techStack && (
                                    <p>
                                        <strong>Tech Stack:</strong> {project.techStack}
                                    </p>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        GitHub
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>Projects</h3>
                            <p>Projects will appear here.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                EDUCATION
            ========================================== */}
            <section id="education">
                <h2>Education</h2>
                <div>
                    {education.length > 0 ? (
                        education.map((edu) => (
                            <div key={edu.id}>
                                <h3>{edu.degree}</h3>
                                <h4>{edu.institution}</h4>
                                <p>
                                    {edu.startDate} - {edu.endDate || "Present"}
                                </p>
                                {edu.grade && <p>Grade: {edu.grade}</p>}
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>Computer Science Engineering</h3>
                            <p>Bachelor's Degree</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                CERTIFICATIONS
            ========================================== */}
            <section id="certifications">
                <h2>Certifications</h2>
                <div>
                    {certifications.length > 0 ? (
                        certifications.map((cert) => (
                            <div key={cert.id}>
                                <h3>{cert.title || cert.name}</h3>
                                <h4>{cert.issuer}</h4>
                                {cert.issueDate && <p>Issued: {cert.issueDate}</p>}
                                {cert.credentialUrl && (
                                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                                        View Credential
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>Certifications</h3>
                            <p>Certifications will appear here.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                CONTACT
            ========================================== */}
            <section id="contact">
                <h2>Contact Me</h2>
                <form onSubmit={handleContactSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        required
                    />
                    <button type="submit" disabled={sending}>
                        {sending ? "Sending..." : "Send Message"}
                    </button>
                    {contactStatus && <p>{contactStatus}</p>}
                </form>
            </section>
        </div>
    );
}

export default Home;