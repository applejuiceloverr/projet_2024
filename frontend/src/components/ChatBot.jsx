import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InvaderIcon from '../assets/invader.png'; // Ensure the correct path to the image

const Chatbox = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Welcome to your AI assistant, how can I help you?' }
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const chatboxRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/chatbot/predict/', {
                message: input
            });
            const botMessage = { sender: 'bot', text: response.data.answer };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { sender: 'bot', text: "Something went wrong! Please try again." };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
        
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="chatbot bg-[#282A35] text-white rounded-lg shadow-lg p-4 w-full max-w-lg mx-auto">
                    <header className="flex justify-between items-center border-b border-[#00df9a] pb-2 mb-4">
                        <h2 className="text-xl font-bold text-[#00df9a]">Chatbot</h2>
                        <span className="close-btn material-symbols-outlined cursor-pointer" onClick={toggleChatbox}>close</span>
                    </header>
                    <div className="bg-[#282A35] rounded-b-lg shadow-lg">
                        <ul className="chatbox h-64 overflow-y-auto p-4" ref={chatboxRef}>
                            {messages.map((msg, index) => (
                                <li key={index} className={`chat mb-2 flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                    {msg.sender === 'bot' && (
                                        <img src={InvaderIcon} alt="AI Icon" className="mr-2 w-8 h-8 self-center"/>
                                    )}
                                    <p className={`inline-block max-w-xs ${msg.sender === 'bot' ? 'bg-gray-100 text-black' : 'bg-[#00df9a] text-white'} p-2 rounded`}>
                                        {msg.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="chat-input flex p-4">
                            <textarea
                                className="flex-grow border rounded p-2 mr-2 text-black"
                                placeholder="Your Message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                spellCheck="false"
                                required
                            ></textarea>
                            <span id="send-btn" className="material-symbols-rounded text-[#00df9a] cursor-pointer" onClick={handleSend}>send</span>
                        </div>
                    </div>
                </div>
            )}
            <button
                className="chatbot-toggler fixed bottom-4 right-4 bg-[#00df9a] text-white py-3 px-5 rounded-full shadow-lg focus:outline-none transform hover:scale-105 transition-transform duration-200 flex items-center"
                onClick={toggleChatbox}
            >
                <span className="text-lg">Chatbot</span>
            </button>
        </div>
    );
};

export default Chatbox;
