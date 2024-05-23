import React, { createContext, useState, ReactNode } from 'react';
import { Project } from '../customer/Utils';

interface ProposalContextValue {
  proposals: { [freelancerId: string]: Project[] };
  addProposal: (freelancerId: string, proposal: Project) => void;
  removeProposal: (freelancerId: string, proposalIndex: number) => void;
}

export const ProposalContext = createContext<ProposalContextValue | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [proposals, setProposals] = useState<{ [freelancerId: string]: Project[] }>({});

  const addProposal = (freelancerId: string, proposal: Project) => {
    setProposals((prevProposals) => {
      if (!prevProposals[freelancerId]) {
        return {
          ...prevProposals,
          [freelancerId]: [proposal],
        };
      }
  
      return {
        ...prevProposals,
        [freelancerId]: [...prevProposals[freelancerId], proposal],
      };
    });
  };

  const removeProposal = (freelancerId: string, proposalIndex: number) => {
    setProposals((prevProposals) => ({
      ...prevProposals,
      [freelancerId]: prevProposals[freelancerId].filter((_, index) => index !== proposalIndex),
    }));
  };
  

  const value = { proposals, addProposal, removeProposal };

  return <ProposalContext.Provider value={value}>{children}</ProposalContext.Provider>;
};