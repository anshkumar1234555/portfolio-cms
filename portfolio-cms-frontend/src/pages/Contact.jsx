import { useState } from "react";
import api from "../services/api";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setStatus("");

        try {

            await api.post("/messages", form);

            setStatus("Message sent successfully! 🎉");

            setForm({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (error) {

            console.error(error);

            setStatus(
                "Failed to send message. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <section id="contact">

            <h2>Contact Me</h2>

            <p className="contact-intro">
                Have a project, opportunity, or question?
                Feel free to get in touch.
            </p>

            <form
                className="contact-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    rows="6"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Sending..."
                        : "Send Message"}
                </button>

                {status && (
                    <p className="contact-status">
                        {status}
                    </p>
                )}

            </form>

        </section>
    );
}

export default Contact;