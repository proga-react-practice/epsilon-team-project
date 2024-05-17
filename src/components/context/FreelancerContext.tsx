import { createContext, useState, ReactNode, useContext } from 'react';
import { Freelancer } from '../freelancer/Freelancer';

interface FreelancerContextValue {
  freelancers: Freelancer[];
  registerFreelancer: (freelancer: Freelancer) => void;
  deleteFreelancer: (index: number) => void;
  updateFreelancer: (updatedFreelancers: Freelancer[] | Freelancer, index?: number) => void;
  
}

export const FreelancerContext = createContext<FreelancerContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useFreelancerContext = () => {
  const context = useContext(FreelancerContext);
  if (!context) {
    throw new Error('useFreelancerContext must be used within a FreelancerProvider');
  }
  return context;
};

export const FreelancerProvider = ({ children }: { children: ReactNode }) => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  const registerFreelancer = (freelancer: Freelancer) => {
    setFreelancers((prevFreelancers) => [...prevFreelancers, freelancer]);
  };

  const deleteFreelancer = (index: number) => {
    setFreelancers((prevFreelancers) => prevFreelancers.filter((_, i) => i !== index));
  };

  const updateFreelancer = (updatedFreelancers: Freelancer[] | Freelancer, index?: number) => {
    if (Array.isArray(updatedFreelancers)) {
      setFreelancers(updatedFreelancers);
    } else {
      setFreelancers((prevFreelancers) => {
        const updatedFreelancersList = [...prevFreelancers];
        if (index !== undefined) {
          updatedFreelancersList[index] = updatedFreelancers;
        }
        return updatedFreelancersList;
      });
    }
  };

  const value = { freelancers, registerFreelancer, deleteFreelancer, updateFreelancer };

  return <FreelancerContext.Provider value={value}>{children}</FreelancerContext.Provider>;
};