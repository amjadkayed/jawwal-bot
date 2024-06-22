import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new speechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            console.log('Voice recognition activated');
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            setText(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error', event.error);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    const toggleListening = () => setIsListening(prevState => !prevState);

    return (
        <div>
            <button onClick={toggleListening}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <p>Text: {text}</p>
        </div>
    );
};

export default SpeechToText;
