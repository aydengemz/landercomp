// Import required libraries and icons
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Users, Gift, Clock, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './components/alert';
import { Card, CardContent } from './components/card';
import { Button } from './components/button';

// Define a list of names for demonstration
const names = [
  'Sarah M.', 'John D.', 'Emma W.', 'Michael R.', 'Lisa K.',
  'David P.', 'Anna S.', 'James L.', 'Maria G.', 'Robert T.'
];

// Progress Step Component
interface ProgressStepProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ number, title, isActive, isCompleted }) => (
  <motion.div
    className="flex items-center mb-3 justify-center w-full"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.25, delay: number * 0.08 }}
  >
    <motion.div
      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3
        ${isCompleted ? 'bg-green-500' : isActive ? 'bg-red-600' : 'bg-gray-300'}
        text-white font-bold text-base sm:text-lg shadow-md`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isCompleted ? '✓' : number}
    </motion.div>
    <span className={`${isCompleted ? 'text-green-500' : isActive ? 'text-red-600' : 'text-gray-600'} text-lg sm:text-xl font-semibold flex-1`}>
      {title}
    </span>
  </motion.div>
);

// Countdown Timer Component
const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            return prev;
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="flex items-center justify-center space-x-2 text-red-600 mb-5 bg-red-50 p-3 rounded-lg">
      <Clock className="w-5 h-5" />
      <span className="text-lg font-bold">
        {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </span>
      <span>remaining</span>
    </motion.div>
  );
};

// Affiliate Button Component
const AffiliateButton = () => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative">
    <motion.div
      className="absolute -inset-1 bg-gradient-to-r from-red-400/40 to-red-600/40 rounded-lg blur-lg"
      animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
    <a href="https://t.afftrackr.com/?lnwk=7oalGrDCjNa2UPlyLbn9tclGWbHYmNUQvQJDRoz7h5U%3d&s1=" target="_blank" rel="noopener noreferrer">
      <Button className="relative z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-4 px-8 rounded-full text-lg flex items-center gap-2 shadow-lg hover:from-red-600 hover:to-pink-700">
        Get Your Gift Card Now
        <ExternalLink className="w-6 h-6" />
      </Button>
    </a>
  </motion.div>
);

// Recent Winner Component
const RecentWinner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [currentName, setCurrentName] = useState(names[0]);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowAlert(window.innerHeight > 750);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentName(names[Math.floor(Math.random() * names.length)]);
        setVisible(true);
      }, 400); // Slight delay for smoother transition
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!showAlert) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-4 inset-x-0 mx-auto max-w-xs text-black"
        >
          <Alert className="w-full max-w-xs bg-white shadow-md text-sm sm:text-base p-4 rounded-lg backdrop-blur">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-red-600" />
              <AlertDescription className="font-medium">
                <span className="text-red-600 font-semibold">{currentName}</span> claimed a gift card! 🎉
              </AlertDescription>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Online Users Component
const OnlineUsers: React.FC = () => {
  const [userCount, setUserCount] = useState(234);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="fixed top-4 right-2 sm:right-4 bg-white/95 p-2.5 sm:p-3 rounded-lg shadow-md border border-red-100/50 backdrop-blur-sm flex items-center space-x-2">
      <Users className="w-5 h-5 text-red-500" />
      <span className="font-medium text-gray-800 text-sm sm:text-base">{userCount} online now</span>
    </motion.div>
  );
};

// Home Component - Main Page Layout
export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <RecentWinner />
      <div className="fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80"
          alt="Background"
          className="w-full h-full object-cover brightness-[0.6] blur-md scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent"></div>
      </div>

      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <motion.div className="w-full max-w-md flex flex-col items-center gap-4">
          <div className="mb-4 w-28 sm:w-32 md:w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img src="https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg" alt="Logo" />
          </div>

          <div className="relative text-center w-full max-w-xs py-4">
            <div className="absolute inset-0 to-transparent rounded-md"></div>
            <h1 className="relative z-10 text-3xl font-bold text-red-600 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
              Win a $750 Gift Card!
            </h1>
            <p className="relative z-10 text-lg text-white font-medium">Exclusive Holiday Season Offer</p>
          </div>

          <CountdownTimer />

          <Card className="w-full bg-white/90 rounded-xl mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Steps to Claim</h2>
              <ProgressStep number={1} title="Enter Email + Basic Info" isActive={currentStep === 1} isCompleted={currentStep > 1} />
              <ProgressStep number={2} title="Complete Recommended Deals" isActive={currentStep === 2} isCompleted={currentStep > 2} />
              <ProgressStep number={3} title="Get Your $750 Gift Card" isActive={currentStep === 3} isCompleted={currentStep > 3} />
            </CardContent>
          </Card>

          <AffiliateButton />
        </motion.div>
      </div>
    </div>
  );
}
