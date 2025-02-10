import { z } from 'zod';

// Zod schema for TUserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .trim()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .trim()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: 'Last name cannot be more than 20 characters' }),
});

// Zod schema for TLocalUser (Create)
const createLocalUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    localUser: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be one of: male, female, other',
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
          invalid_type_error: 'Date of birth must be a string',
        })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: 'Date of birth must be a valid date',
        }),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email({ message: 'Invalid email address' }),
      contactNo: z.string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact number must be a string',
      }),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});

// Zod schema for TLocalUser (Update)
const updateLocalUserValidationSchema = z.object({
  body: z.object({
    localUser: z.object({
      id: z.string().optional(),
      user: z.string().optional(),
      name: UserNameValidationSchema.partial().optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: 'Date of birth must be a valid date',
        })
        .optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z.string().optional(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const LocalUserValidation = {
  createLocalUserValidationSchema,
  updateLocalUserValidationSchema,
};
