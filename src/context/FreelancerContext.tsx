import  { createContext, useState, ReactNode } from 'react';
import { Freelancer } from '../components/freelancer/Freelancer';

export const FreelancerContext = createContext<{
  freelancers: Freelancer[];
  registerFreelancer: (freelancer: Freelancer) => void;
} | null>(null);

export const FreelancerProvider = ({ children }: { children: ReactNode }) => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  const registerFreelancer = (freelancer: Freelancer) => {
    setFreelancers((prevFreelancers) => [...prevFreelancers, freelancer]);
  };

  const value = { freelancers, registerFreelancer };

  return (
    <FreelancerContext.Provider value={value}>
      {children}
    </FreelancerContext.Provider>
  );
};