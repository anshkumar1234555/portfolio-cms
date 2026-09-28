import { useEffect, useState } from "react";
import api from "../services/api";

function Messages() {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadMessages = async () => {

        try {

            const response =
                await api.get("/messages");

            setMessages(response.data);

        } catch (error) {

            console.error(error);
            setError("Failed to load messages");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const deleteMessage = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this message?"
        )) {
            return;
        }

        try {

            await api.delete(`/messages/${id}`);

            await loadMessages();

        } catch (error) {

            console.error(error);
            setError("Failed to delete message");
        }
    };

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div>

            <h1>Contact Messages</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {messages.length === 0 ? (

                <p>No messages found.</p>

            ) : (

                messages.map((message) => (

                    <div
                        key={message.id}
                        className="message-card"
                    >

                        <h3>
                            {message.name}
                        </h3>

                        <p>
                            <strong>Email:</strong>{" "}
                            {message.email}
                        </p>

                        <p>
                            <strong>Message:</strong>
                        </p>

                        <p>
                            {message.message}
                        </p>

                        <button
                            onClick={() =>
                                deleteMessage(message.id)
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

export default Messages;