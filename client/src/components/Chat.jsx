import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Chat() {
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/history/${patientId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMessages(res.data);
      } catch (err) {
        setError('Failed to fetch chat history');
      }
    };
    fetchHistory();

    const room = `${patientId}-${localStorage.getItem('userId')}`; // Unique room for patient-doctor
    socket.emit('join', { userId: localStorage.getItem('userId'), room });

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off('message');
  }, [patientId]);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        room: `${patientId}-${localStorage.getItem('userId')}`,
        message: input,
        sender: 'doctor',
        patientId,
        doctorId: localStorage.getItem('userId'),
      };
      socket.emit('sendMessage', message);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with Patient</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === 'doctor' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;