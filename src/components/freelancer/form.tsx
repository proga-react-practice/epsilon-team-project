import React, { useState } from 'react';
import { TextField, Button, InputLabel, FormGroup, Box, Typography } from '@mui/material';  
import { Freelancer } from './Freelancer';
import SkillsSelect from './SkillSelect'; 

interface Props {
  setFreelancers: React.Dispatch<React.SetStateAction<Freelancer[]>>;
}

const RegistrationForm: React.FC<Props> = ({ setFreelancers }) => {
  const [formData, setFormData] = useState<Freelancer>({
    firstName: '',
    lastName: '',
    age: 0,
    skills: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    firstName: '',
    lastName: '',
    age: '',
    skills: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name.';
    } else if (!/^[\p{L}\s]+$/u.test(formData.firstName)) {
      newErrors.firstName = 'First name should contain only letters.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name.';
    } else if (!/^[\p{L}\s]+$/u.test(formData.lastName)) {
      newErrors.lastName = 'Last name should contain only letters.';
    }

    if (formData.age < 18) {
      newErrors.age = 'You must be at least 18 years old to register.';
    } else if (formData.age > 80) {
      newErrors.age = 'Age cannot exceed 80 years.';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFreelancers((prevFreelancers) => [...prevFreelancers, formData]);
      setFormData({
        firstName: '',
        lastName: '',
        age: 0,
        skills: [],
      });
    }
  };

  const handleClearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: 0,
      skills: [],
    });
    setErrors({
      firstName: '',
      lastName: '',
      age: '',
      skills: '',
    });
  };
  
  return (
    <Box sx={{mt:'10%',width:'50%'}} color="secondary"> 
      <Typography style={{ fontSize: '40px', marginBottom: '18px', fontFamily:'Montserrat',marginLeft:'-18px'}} color="primary"><strong>Freelancer Registration</strong></Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box sx={{mb:'16px'}} >
            <InputLabel htmlFor="firstName" sx={{fontFamily:'Montserrat'}}>First Name:</InputLabel>
            <TextField type="text" sx={{width:"450px"}} id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required /><br></br>
            {errors.firstName && <ErrorMessage message={errors.firstName} />}
          </Box>
          <Box sx={{mb:'12px'}}>
            <InputLabel htmlFor="lastName" sx={{fontFamily:'Montserrat'}}>Last Name:</InputLabel>
            <TextField type="text" sx={{width:"450px",}} id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required /><br></br>
            {errors.lastName && <ErrorMessage message={errors.lastName} />}
          </Box>
          <Box sx={{mb:'12px'}}>
            <InputLabel htmlFor="age" sx={{fontFamily:'Montserrat'}}>Age:</InputLabel>
            <TextField type="number" sx={{width:"450px"}} id="age" name="age" value={formData.age} onChange={handleInputChange} required /><br></br>
            {errors.age && <ErrorMessage message={errors.age}/>}
          </Box>
          <InputLabel htmlFor="skills" sx={{fontFamily:'Montserrat'}}>Skills:</InputLabel>
          <SkillsSelect
            selectedSkills={formData.skills}
            onChange={(skills) => setFormData({ ...formData, skills })}
          />
          {errors.skills && <ErrorMessage message={errors.skills} />}
          <Button sx={{mt:'36px', height:'48px',width:"450px",color:'white',fontSize:'16px',fontFamily:'Montserrat'}} type="submit" variant="contained" color="primary">Register</Button>
          <Button sx={{mt:'12px', height:'48px',width:"450px", color:'white',fontSize:'16px',fontFamily:'Montserrat'}} type="button" onClick={handleClearForm} variant="contained" color="primary">Clear</Button>
        </FormGroup> 
      </form>
    </Box>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>{message}</Typography>
);

export default RegistrationForm;
