import React, { useState, useEffect } from 'react';
import { MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface SkillsSelectProps {
  selectedSkills: string[];
  onSkillsChange: (selectedSkills: string[]) => void; 
}

const SkillsSelect: React.FC<SkillsSelectProps> = ({ selectedSkills, onSkillsChange }) => { 
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Django',
    'TypeScript',
    'SQL'
  ];

  const [selected, setSelected] = useState<string[]>(selectedSkills);

  useEffect(() => {
    setSelected(selectedSkills); 
  }, [selectedSkills]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedSkills = event.target.value as string[];
    setSelected(selectedSkills);
    onSkillsChange(selectedSkills);
  };

  return (
    <FormControl sx={{ height: '48px', width: "450px" }}>
      <InputLabel id="skills-label" style={{ cursor: 'pointer' }}></InputLabel>
      <Select
        labelId="skills-label"
        id="skills-select"
        multiple
        value={selected}
        onChange={handleChange}
        inputProps={{
          name: 'skills',
          id: 'skills-select',
        }}
        renderValue={(selected) => (selected as string[]).join(', ')}
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
