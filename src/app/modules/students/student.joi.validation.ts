import Joi from "joi";


const JoiValidationSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .required()
      .messages({
        'string.min': 'First name must be at least 3 characters long',
        'string.max': 'First name must not be longer than 20 characters',
        'string.pattern.base': '{#label} must contain only alphabetic characters',
        'any.required': 'First name is required',
      }),
    middleName: Joi.string().trim().allow(''),
    lastName: Joi.string()
      .min(5)
      .max(20)
      .trim()
      .required()
      .messages({
        'string.min': 'Last name must be at least 5 characters long',
        'string.max': 'Last name must not be longer than 20 characters',
        'any.required': 'Last name is required',
      }),
  });
  
  // Joi validation for Gardian
  const gardianSchema = Joi.object({
    fatherName: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Father name is required',
      }),
    fatherOccupation: Joi.string().trim().required().messages({
      'any.required': 'Father occupation is required',
    }),
    fatherContactNo: Joi.string().trim().required().messages({
      'any.required': 'Father contact number is required',
    }),
    motherName: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Mother name is required',
      }),
    motherOccupation: Joi.string().trim().required().messages({
      'any.required': 'Mother occupation is required',
    }),
    motherContactNo: Joi.string().trim().required().messages({
      'any.required': 'Mother contact number is required',
    }),
  });
  
  // Joi validation for LocalGuardian
  const localGuardianSchema = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Local guardian name is required',
      }),
    occupation: Joi.string().trim().required().messages({
      'any.required': 'Local guardian occupation is required',
    }),
    contactNo: Joi.string().trim().required().messages({
      'any.required': 'Local guardian contact number is required',
    }),
    address: Joi.string().trim().required().messages({
      'any.required': 'Local guardian address is required',
    }),
  });
  
  // Joi validation for Student
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const StudentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'ID is required',
    }),
    name: JoiValidationSchema.required().messages({
      'any.required': 'Name is required',
    }),
    gender: Joi.string()
      .valid('male', 'female', 'others')
      .required()
      .messages({
        'any.only': '{#label} must be one of [male, female, others]',
        'any.required': 'Gender is required',
      }),
    dateOfBirth: Joi.string(),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': '{#label} is not a valid email format',
        'any.required': 'Email is required',
      }),
    contactNo: Joi.string().required().messages({
      'any.required': 'Contact number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'any.required': 'Emergency contact number is required',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .messages({
        'any.only': '{#label} must be a valid blood group',
      }),
    presentAddress: Joi.string().required().messages({
      'any.required': 'Present address is required',
    }),
    permanentAddress: Joi.string().required().messages({
      'any.required': 'Permanent address is required',
    }),
    gurdian: gardianSchema.required().messages({
      'any.required': "Guardian's information is required",
    }),
    localGuardian: localGuardianSchema.required().messages({
      'any.required': "Local guardian's information is required",
    }),
    profileImg: Joi.string().allow(''),
    isActive: Joi.string().valid('active', 'blocked').messages({
      'any.only': '{#label} must be one of [active, blocked]',
    }),
  });


  export default JoiValidationSchema;