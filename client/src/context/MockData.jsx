import React, { createContext, useContext, useState } from 'react';

const initialCurrentUser = {
  name: "Alex",
  currentStreak: 5,
};

const initialRecommendedResources = [
  {
    id: 1,
    title: "10-Minute Morning Meditation",
    type: "audio",
    duration: "10 mins",
    category: "Mindfulness",
  },
  {
    id: 2,
    title: "Deep Breathing for Anxiety",
    type: "video",
    duration: "5 mins",
    category: "Breathing Exercise",
  },
  {
    id: 3,
    title: "Journal Prompt: Gratitude",
    type: "text",
    duration: "15 mins",
    category: "Journaling",
  },
];

const CalmifyContext = createContext();

export const useCalmify = () => {
  return useContext(CalmifyContext);
};

export const MockDataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [recommendedResources, setRecommendedResources] = useState(initialRecommendedResources);

  const value = {
    currentUser,
    setCurrentUser,
    recommendedResources,
    setRecommendedResources,
  };

  return (
    <CalmifyContext.Provider value={value}>
      {children}
    </CalmifyContext.Provider>
  );
};
