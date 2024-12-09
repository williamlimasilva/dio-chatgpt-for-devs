import "./styles/App.css";
import "./styles/reset.css";
import { useState, useRef, useEffect } from "react";

import { makeRequest } from "./api/api";
import SideMenu from "./components/side-menu/SideMenu";
import ChatMessage from "./components/chat-message/ChatMessage";
import Avatar from "./assets/avatar";

function App() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            user: "gpt",
            message: [
                <div key="initial-message" className="initial-gpt-message">
                    <Avatar className="gpt-avatar" />
                    <span>Olá! Como posso te ajudar hoje?</span>
                </div>
            ],
        },
    ]);
    const chatLogRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom whenever chatLog changes
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!input.trim()) return; // Prevent sending empty messages

        const currentInput = input; // Capture current input before clearing
        setInput(""); // Clear input immediately

        // Add user message
        const userMessage = {
            user: "me",
            message: currentInput
        };

        // Send request and add GPT response
        try {
            let response = await makeRequest({ prompt: currentInput });
            const gptMessage = {
                user: "gpt",
                message: response.data.split("\n").map((line, index) => <p key={index}>{line}</p>)
            };
            
            setChatLog(prevLog => [...prevLog, userMessage, gptMessage]);
        } catch (error) {
            console.error("Error fetching GPT response:", error);
            const errorMessage = {
                user: "gpt",
                message: "Desculpe, ocorreu um erro ao processar sua solicitação."
            };
            setChatLog(prevLog => [...prevLog, userMessage, errorMessage]);
        }
    }

    return (
        <div className="App">
            <SideMenu />

            <section className="chatbox">
                <div 
                    ref={chatLogRef} 
                    className="chat-log"
                >
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </div>

                <div className="chat-input-holder">
                    <form onSubmit={handleSubmit} className="chat-input-form">
                        <input
                            type="text"
                            className="chat-input-textarea"
                            placeholder="Digite sua mensagem"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="chat-send-button"
                            disabled={!input.trim()}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default App;
