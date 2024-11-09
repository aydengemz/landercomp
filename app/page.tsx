"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './components/alert';
import { Card, CardContent } from './components/card';
import { Button } from './components/button';

const names = [
  'Sarah M.', 'John D.', 'Emma W.', 'Michael R.', 'Lisa K.',
  'David P.', 'Anna S.', 'James L.', 'Maria G.', 'Robert T.'
];

interface ProgressStepProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ number, title, isActive, isCompleted }) => (
  <motion.div
    className="flex items-center mb-2 justify-center w-full" // Reduced mb-3 to mb-2 for less vertical space
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.25, delay: number * 0.08 }}
  >
    <motion.div
      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3
        ${isCompleted ? 'bg-green-400' : isActive ? 'bg-green-500' : 'bg-gray-800'}
        text-white font-bold text-base sm:text-lg shadow-md`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isCompleted ? '✓' : number}
    </motion.div>
    <span className={`${isCompleted ? 'text-green-400' : isActive ? 'text-green-500' : 'text-gray-300'} text-lg sm:text-xl font-semibold flex-1`}>
      {title}
    </span>
  </motion.div>
);

const CountdownTimer = () => {
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
    <motion.div className="flex items-center justify-center space-x-2 text-green-400 mb-4 bg-gray-800 p-3 rounded-lg"> {/* Reduced mb-5 to mb-4 */}
      <Clock className="w-5 h-5" />
      <span className="text-lg font-bold">
        {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </span>
      <span>remaining</span>
    </motion.div>
  );
};

const AffiliateButton = () => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative">
    <motion.div
      className="absolute -inset-1 bg-gradient-to-r from-green-400/40 to-green-600/40 rounded-lg blur-lg"
      animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
    <a href="https://glstrck.com/aff_c?offer_id=1145&aff_id=11848" target="_blank" rel="noopener noreferrer">
      <Button className="relative z-10 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-5 px-14 rounded-full text-lg flex items-center gap-2 shadow-lg hover:from-green-500 hover:to-green-700"> {/* Adjusted py-4 to py-3 */}
        Claim Cash Now
        <ExternalLink className="w-6 h-6" />
      </Button>
    </a>
  </motion.div>
);

const RecentWinner = () => {
  const [visible, setVisible] = useState(true);
  const [currentName, setCurrentName] = useState(names[0]);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Debug: Log to ensure handleResize is triggered
      console.log('Window resized, showAlert:', window.innerHeight > 600);
      setShowAlert(window.innerHeight > 600);
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
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!showAlert) {
    console.log('showAlert is false, alert will not be rendered.');
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed top-4 inset-x-0 mx-auto max-w-xs text-white"
        >
          <Alert className="w-full max-w-xs bg-gray-800 shadow-md text-sm sm:text-base p-4 rounded-lg backdrop-blur">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              <AlertDescription className="font-medium">
                <span className="text-green-400 font-semibold">{currentName}</span> just received $750! 💸
              </AlertDescription>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-black">
      <RecentWinner />
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div
          className="absolute inset-0 bg-[url(`data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E`)] opacity-20"
        ></div>
      </div>

      <div className="w-full min-h-screen flex flex-col items-center justify-center p-3 sm:p-6"> {/* Reduced p-4 and sm:p-8 */}
        <motion.div className="w-full max-w-md flex flex-col items-center gap-2"> {/* Reduced gap-4 to gap-2 */}
          <div className="mb-3 w-28 sm:w-32 md:w-40 rounded-full overflow-hidden shadow-lg p-2"> {/* Reduced mb-4 to mb-3 */}
            <img
              src="https://raw.githubusercontent.com/aydengemz/landerTemp/refs/heads/main/app/%24.png"
              alt="Cash App Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative text-center w-full max-w-xs py-2"> {/* Reduced py-4 to py-2 */}
            <h1 className="relative z-10 text-3xl font-bold text-green-400 mb-2"> {/* Reduced mb-1 to mb-2 */}
              Get $750 Cash!
            </h1>
          </div>

          <CountdownTimer />

          <Card className="w-full bg-gray-800/90 rounded-xl mb-5 border-gray-700"> {/* Reduced mb-6 to mb-5 */}
            <CardContent className="p-5"> {/* Reduced p-6 to p-5 */}
              <h2 className="text-2xl font-bold text-white mb-3 text-center"> {/* Reduced mb-4 to mb-3 */}
                3 Simple Steps
              </h2>
              <ProgressStep number={1} title="Enter Basic Info" isActive={false} isCompleted={false} />
              <ProgressStep number={2} title="Complete Recommended Deals" isActive={false} isCompleted={false} />
              <ProgressStep number={3} title="Receive Your $750" isActive={false} isCompleted={false} />
            </CardContent>
          </Card>

          <AffiliateButton />
        </motion.div>
      </div>
    </div>
  );
}
