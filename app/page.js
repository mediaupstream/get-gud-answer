"use client"

import { useState, useRef, useEffect } from 'react';

const answers = [
  'Yes, definitely!',
  'No, that won’t work.',
  'Maybe, try again later.',
  'I’m not sure, let me think about it.',
  `¯\\_(ツ)_/¯`,
  'Absolutely, without a doubt!',
  'Not in this lifetime.',
  'Well, that depends on how what you mean',
  `¯\\_(ツ)_/¯`,
  'You probably don’t want to hear this, but no.',
  `¯\\_(ツ)_/¯`,
  'Yes, but only on Tuesdays.',
  'Ask again in 5 minutes.',
  'My heart says no.',
  `¯\\_(ツ)_/¯`,
  'Sorry, I didn’t quite get that. Can you repeat?',
  'Hmm, unclear. Maybe try a coin flip?',
  'cat',
  'I don’t have an answer for you.',
  'If you say so...',
  'The answer lies within you.',
  'Why are you even asking?',
  'Good question! I have no idea.',
  'cat',
  `¯\\_(ツ)_/¯`,
  'Let me get back to you on that.',
  'It’s possible, but highly improbable.',
  'I’d say about 50/50.',
  'Can you rephrase that?',
  'cat',
  'Nah, not feeling it.',
  'Ask yourself: is it really important?',
  'Yup!',
  'nope',
  '...are you sure you want to know?',
  'The stars say yes',
  'My sources say no.',
  'I wouldn’t bet on it.',
  'Might as well flip a coin.',
  '🤷‍♂️',
  'In another reality, yes.',
  'cat',
  'cat',
  'Technically, yes. Practically, no.',
  `¯\\_(ツ)_/¯`,
  'Calculating... Still no.',
  'Only if you ask nicely.',
  'Hmmm... Not sure I want to answer that.',
  'I wouldn’t count on it.',
  'Yes, and no. Simultaneously.',
  'You already know the answer.',
  'cat',
  'cat',
  'It’s complicated.',
  'Are you sure you want to ask me that?',
  'I don’t know, you tell me!',
  'The future is unclear. Try later.',
  'Ask a human, maybe?',
  'Let’s just say... it’s possible.',
  'Be careful what you wish for.',
  'I’ll answer, but you won’t like it.',
  'Yes, but it’s a secret.',
  'Not in a million years.',
  'cat',
  'cat',
  'I’m afraid I cannot do that.',
  'No answer for you today.',
  'Definitely, without hesitation!',
  `¯\\_(ツ)_/¯`,
  'It’s more complicated than you think.',
  'Sure, why not?',
  'Do you really need an answer?',
  'Yes... unless it rains.',
  'Only on weekends.',
  `¯\\_(ツ)_/¯`,
  'Sure, just don’t tell anyone.',
  'No, but it’s a nice thought.',
  'I wouldn’t say yes, but I also wouldn’t say no.',,
  'I don’t have enough data to answer that.',
  'This isn’t going to go the way you think.',
  'Is it really that important?',
  'Let me think... No.',
  'Why not?',
];

function randomCat() {
  const w = Math.max(150, Math.round(Math.random() * 400))
  const h = Math.max(150, Math.round(Math.random() * 400))
  return `https://placecats.com/${w}/${h}`
}


export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue || isThinking) return;
    
    const userMessage = inputValue;
    setMessages([...messages, { question: userMessage, answer: null }]);
    setInputValue('');
    setIsThinking(true);

    const thinkTime = Math.max(20, Math.random() * 1000);
    setTimeout(() => {
      let randomAnswer = answers[Math.floor(Math.random() * answers.length)];

      if (randomAnswer === 'cat') {
        randomAnswer = randomCat();
      }
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { ...msg, answer: randomAnswer } : msg
        )
      );
      setIsThinking(false);
    }, thinkTime);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Get gud answer</h1>
        <div className="flex flex-col space-y-4 mb-6 overflow-y-auto max-h-[80vh]">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col mb-4">
              <div className="text-right mb-1 text-lg">
              <span className="bg-green-50 px-8 p-3 rounded-lg leading-6">
                {msg.question}
              </span>
              </div>
              {msg.answer ? (
                <div className="rounded-lg p-3 text-lg leading-6">
                  {msg.answer.startsWith('http') ? (<img className="rounded-lg" src={msg.answer} />) : msg.answer}
                </div>
              ) : (
                <div className="rounded-lg p-3 text-lg leading-6 italic">
                  Thinking...
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg text-lg leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me sum stuf..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 text-lg leading-6"
            disabled={isThinking}
          >
            Asks
          </button>
        </form>
      </div>
    </div>
  );
}
