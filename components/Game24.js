// components/Game24.js
import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const suits = ['♠', '♥', '♣', '♦'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const Card = ({ rank, suit, isAnimating }) => {
  const isRed = suit === '♥' || suit === '♦';
  
  return (
    <div className={`transition-all duration-500 transform ${
      isAnimating ? 'rotate-y-180 scale-50 opacity-0' : 'rotate-y-0 scale-100 opacity-100'
    }`}>
      <div className="w-32 h-48 flex flex-col items-center justify-center text-4xl border-2 rounded-xl bg-white shadow-md">
        <div className={`${isRed ? 'text-red-500' : 'text-black'}`}>
          <div className="text-2xl mb-2">{rank}</div>
          <div className="text-4xl">{suit}</div>
        </div>
      </div>
    </div>
  );
};

const generateRandomCard = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  const value = rank === 'A' ? 1 : 
                rank === 'J' ? 11 :
                rank === 'Q' ? 12 :
                rank === 'K' ? 13 :
                parseInt(rank);
  return { suit, rank, value };
};

const getSolverUrl = (cards) => {
  const baseUrl = 'http://24solver.us-west-2.elasticbeanstalk.com/';
  const params = cards
    .map((card, index) => `n${index + 1}=${card.value}`)
    .join('&');
  return `${baseUrl}?${params}`;
};

const Game24 = () => {
  const [cards, setCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const shuffleCards = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const newCards = Array(4).fill(null).map(() => generateRandomCard());
      setCards(newCards);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 500);
  };

  const openSolver = () => {
    const url = getSolverUrl(cards);
    window.open(url, '_blank');
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">24 Game</h1>
        
        <div className="bg-blue-500 border-l-4 border-blue-800 text-white p-4 mb-6">
          <p>
            Try to make 24 using these four numbers with basic arithmetic (+, -, ×, ÷).
            You must use each number exactly once. You can use parentheses.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {cards.map((card, index) => (
            <Card 
              key={index} 
              rank={card.rank} 
              suit={card.suit} 
              isAnimating={isAnimating}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={shuffleCards}
            disabled={isAnimating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            New Cards
          </button>
          
          <button 
            onClick={openSolver}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
          >
            Show Solutions
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game24;