import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface SkillsSelectProps {
  selectedSkills: string[];
  onChange: (selectedSkills: string[]) => void;
}

const SkillsSelect: React.FC<SkillsSelectProps> = ({ selectedSkills, onChange }) => {
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Django',
    'Delfi',
    'SQL'
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FormControl sx={{height:'48px',width:"450px"}}>
      <InputLabel id="skills-label" onClick={toggleOpen} style={{ cursor: 'pointer' }}></InputLabel>
      <Select
        labelId="skills-label"
        id="skills-select"
        multiple
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)} 
        value={selectedSkills}
        onChange={(e) => onChange(e.target.value as string[])}
        inputProps={{
          name: 'skills',
          id: 'skills-select',
        }}
      >
        {skills.map((skill, index) => (
          <MenuItem key={index} value={skill}>
            {skill}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SkillsSelect;
