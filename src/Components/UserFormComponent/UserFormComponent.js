import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Select,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles.css";

 function UserFormComponent() {
    const { handleSubmit, control, register, reset, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const onSubmit = (data, e) => {
    setSubmittedData(data);
    e.target.reset(); 
  };

  return (
    <div className="form-container">
      <h3>User Details :-</h3>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <VStack spacing="4">
          <FormControl className="form-control" isInvalid={errors.firstName}>
            <FormLabel htmlFor="firstName" >First Name:</FormLabel>
            <Input className="input" type="text" id="firstName" placeholder="enter your first name" {...register("firstName", { required: true })} />
            {errors.firstName && <Text className="error-message">First Name is required</Text>}
          </FormControl>

          <FormControl className="form-control" isInvalid={errors.lastName}>
            <FormLabel htmlFor="lastName" >Last Name:</FormLabel>
            <Input className="input" type="text" id="lastName" placeholder="enter your last name"{...register("lastName", { required: true })} />
            {errors.lastName && <Text className="error-message">Last Name is required</Text>}
          </FormControl>

          <FormControl className="form-control" isInvalid={errors.gender}>
            <FormLabel htmlFor="gender">Gender:</FormLabel>
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="Male" className="input">
                  
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              )}
            />
            {errors.gender && <Text className="error-message" >Gender is required</Text>}
          </FormControl>

          <FormControl className="form-control" isInvalid={errors.dob}>
            <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
            <Input type="date" id="dob" className="input" {...register("dob", { required: true })} />
            {errors.dob && <Text className="error-message">Date of Birth is required</Text>}
          </FormControl>

          <VStack spacing="4" align="start">
            <Text >Tech Stack:</Text>
            {fields.map((field, index) => (
              <div key={field.id} className="form-control" style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl isInvalid={errors?.skills?.[index]?.name}>
                  <Input
                    type="text" placeholder="enter your tech skills" className="input"
                    {...register(`skills.${index}.name`, { required: true })}
                    defaultValue={field.name}
                  />
                  {index > 0 && (
                    <Button type="button" className="input" onClick={() => remove(index)}>Remove</Button>
                  )}
                  {errors?.skills?.[index]?.name && <Text className="error-message">Skill is required</Text>}
                </FormControl>
              </div>
            ))}
            <Button className="input"
              onClick={() => {
                append("");
              }}
              leftIcon={<AiOutlinePlus />}
            >
              
            </Button>
          </VStack>

          <Button type="submit" colorScheme="blue" className="input">Submit</Button>
        </VStack>
      </form>

      {submittedData && (
        <Box mt="4">
          <Text fontSize="lg" fontWeight="bold">Submitted Data :-</Text>
          <Text>First Name: {submittedData.firstName}</Text>
          <Text>Last Name: {submittedData.lastName}</Text>
          <Text>Gender: {submittedData.gender}</Text>
          <Text>Date of Birth: {submittedData.dob}</Text>
          <Text>Skills: {submittedData.skills.map(skill => skill.name).join(", ")}</Text>
        </Box>
      )}
    </div>
  );
}

export default UserFormComponent