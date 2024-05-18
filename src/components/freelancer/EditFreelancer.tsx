import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel, FormGroup, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SkillsSelect from '../freelancer/SkillSelect';
import { Freelancer } from './Freelancer';
import { useForm } from 'react-hook-form';

interface EditFreelancerDialogProps {
  open: boolean;
  freelancer: Freelancer | null;
  onClose: () => void;
  onSave: (updatedFreelancer: Freelancer) => void;
}

const EditFreelancerDialog: React.FC<EditFreelancerDialogProps> = ({ open, freelancer, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Freelancer>({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 0,
      skills: [],
    },
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    if (freelancer) {
      reset(freelancer);
      setSelectedSkills(freelancer.skills);
    }
  }, [freelancer, reset]);

  const handleSubmitForm = (data: Freelancer) => {
    onSave(data);
  };

  const handleCancel = () => {
    onClose();
  };

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>{message}</Typography>
  );

  return (
    <Dialog open={open} onClose={handleCancel} PaperProps={{ sx: { width: '80%' } }}>
      <DialogTitle sx={{fontSize: '40px', fontFamily: 'Montserrat', fontWeight:'600' }} color="primary">Edit Freelancer</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }} color="secondary">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormGroup>
              <Box sx={{ mb: '2%' }}>
                <InputLabel htmlFor="firstName" sx={{ fontFamily: 'Montserrat' }}>First Name:</InputLabel>
                <TextField type="text" sx={{ width: "100%" }} id="firstName" {...register('firstName', { required: 'Please enter your first name.', pattern: { value: /^[\p{L}\s]+$/u, message: 'First name should contain only letters.' }, minLength: { value: 2, message: 'First name should be at least 2 characters long.' }, maxLength: { value: 50, message: 'First name cannot exceed 50 characters.' } })} /><br></br>
                {errors.firstName && errors.firstName.message && <ErrorMessage message={errors.firstName.message} />}
              </Box>
              <Box sx={{ mb: '2%' }}>
                <InputLabel htmlFor="lastName" sx={{ fontFamily: 'Montserrat' }}>Last Name:</InputLabel>
                <TextField type="text" sx={{ width: "100%" }} id="lastName" {...register('lastName', { required: 'Please enter your last name.', pattern: { value: /^[\p{L}\s]+$/u, message: 'Last name should contain only letters.' }, minLength: { value: 2, message: 'Last name should be at least 2 characters long.' }, maxLength: { value: 50, message: 'Last name cannot exceed 50 characters.' } })} /><br></br>
                {errors.lastName && errors.lastName.message && <ErrorMessage message={errors.lastName.message} />}
              </Box>
              <Box sx={{ mb: '2%' }}>
                <InputLabel htmlFor="age" sx={{ fontFamily: 'Montserrat' }}>Age:</InputLabel>
                <TextField type="number" sx={{ width: "100%" }} id="age" {...register('age', { required: 'Please enter your age.', min: { value: 18, message: 'You must be at least 18 years old to register.' }, max: { value: 80, message: 'Age cannot exceed 80 years.' } })} /><br></br>
                {errors.age && errors.age.message && <ErrorMessage message={errors.age.message} />}
              </Box>
              <InputLabel htmlFor="skills" sx={{ fontFamily: 'Montserrat' }}>Skills:</InputLabel>
              <SkillsSelect
                selectedSkills={selectedSkills}
                onSkillsChange={(skills) => {
                  setSelectedSkills(skills);
                  setValue('skills', skills);
                }}
                {...register('skills', { required: 'Please select at least one skill.' })}
              />
              {errors.skills && errors.skills.message && <ErrorMessage message={errors.skills.message} />}
            </FormGroup>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleSubmitForm)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFreelancerDialog;
