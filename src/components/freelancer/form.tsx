import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  InputLabel,
  FormGroup,
  Box,
  Typography,
} from "@mui/material";
import SkillsSelect from "./FreelancerCards/SkillSelect";
import { Freelancer } from "./utils/Freelancer";

interface RegistrationFormProps {
  initialValues?: Freelancer;
  onSubmit: (data: Freelancer) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Freelancer>({
    defaultValues: initialValues,
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialValues?.skills || []
  );

  const handleSubmitForm = (data: Freelancer) => {
    onSubmit(data);
    reset({
      firstName: "",
      lastName: "",
      age: 0,
      skills: [],
    });
    setSelectedSkills([]);
  };

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
      {message}
    </Typography>
  );

  return (
    <Box sx={{ mt: "5%", width: "100%" }} color="secondary">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormGroup>
          <Box sx={{ mb: "2%" }}>
            <InputLabel htmlFor="firstName" sx={{ fontFamily: "Montserrat" }}>
              First Name:
            </InputLabel>
            <TextField
              type="text"
              sx={{ width: "100%" }}
              id="firstName"
              {...register("firstName", {
                required: "Please enter your first name.",
                pattern: {
                  value: /^[\p{L}\s]+$/u,
                  message: "First name should contain only letters.",
                },
                minLength: {
                  value: 2,
                  message: "First name should be at least 2 characters long.",
                },
                maxLength: {
                  value: 50,
                  message: "First name cannot exceed 50 characters.",
                },
              })}
            />
            <br></br>
            {errors.firstName && errors.firstName.message && (
              <ErrorMessage message={errors.firstName.message} />
            )}
          </Box>
          <Box sx={{ mb: "2%" }}>
            <InputLabel htmlFor="lastName" sx={{ fontFamily: "Montserrat" }}>
              Last Name:
            </InputLabel>
            <TextField
              type="text"
              sx={{ width: "100%" }}
              id="lastName"
              {...register("lastName", {
                required: "Please enter your last name.",
                pattern: {
                  value: /^[\p{L}\s]+$/u,
                  message: "Last name should contain only letters.",
                },
                minLength: {
                  value: 2,
                  message: "Last name should be at least 2 characters long.",
                },
                maxLength: {
                  value: 50,
                  message: "Last name cannot exceed 50 characters.",
                },
              })}
            />
            <br></br>
            {errors.lastName && errors.lastName.message && (
              <ErrorMessage message={errors.lastName.message} />
            )}
          </Box>
          <Box sx={{ mb: "2%" }}>
            <InputLabel htmlFor="age" sx={{ fontFamily: "Montserrat" }}>
              Age:
            </InputLabel>
            <TextField
              type="number"
              sx={{ width: "100%" }}
              id="age"
              {...register("age", {
                required: "Please enter your age.",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old to register.",
                },
                max: { value: 80, message: "Age cannot exceed 80 years." },
              })}
            />
            <br></br>
            {errors.age && errors.age.message && (
              <ErrorMessage message={errors.age.message} />
            )}
          </Box>
          <InputLabel htmlFor="skills" sx={{ fontFamily: "Montserrat" }}>
            Skills:
          </InputLabel>
          <SkillsSelect
            selectedSkills={selectedSkills}
            onSkillsChange={(skills) => {
              setSelectedSkills(skills);
              setValue("skills", skills);
            }}
            {...register("skills", {
              required: "Please select at least one skill.",
            })}
          />
          {errors.skills && errors.skills.message && (
            <ErrorMessage message={errors.skills.message} />
          )}
          <Button
            sx={{
              mt: "8%",
              width: "100%",
              height: "48px",
              color: "white",
              fontSize: "16px",
              fontFamily: "Montserrat",
            }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
          <Button
            sx={{
              mt: "3%",
              width: "100%",
              height: "48px",
              color: "white",
              fontSize: "16px",
              fontFamily: "Montserrat",
            }}
            type="button"
            onClick={() => {
              reset({ firstName: "", lastName: "", age: 0, skills: [] });
              setSelectedSkills([]);
            }}
            variant="contained"
            color="primary"
          >
            Clear
          </Button>
        </FormGroup>
      </form>
    </Box>
  );
};

export default RegistrationForm;
