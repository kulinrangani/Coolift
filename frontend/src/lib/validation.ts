import * as yup from 'yup';

export const setRowSchema = yup.object({
  weight: yup
    .number()
    .typeError('Weight must be a valid number')
    .required('Weight is required')
    .min(0.25, 'Weight must be at least 0.25 kg')
    .max(500, 'Weight cannot exceed 500 kg'),
  reps: yup
    .number()
    .typeError('Reps must be a valid number')
    .required('Reps are required')
    .integer('Reps must be a whole number')
    .min(1, 'Reps must be at least 1')
    .max(100, 'Reps cannot exceed 100'),
});

export const bodyWeightSchema = yup.object({
  weight: yup
    .number()
    .typeError('Weight must be a valid number')
    .required('Weight is required')
    .min(20, 'Weight must be at least 20 kg')
    .max(300, 'Weight cannot exceed 300 kg'),
  date: yup.string().required('Date is required'),
  note: yup.string().optional(),
});

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateSetRow(weight: number | '', reps: number | ''): ValidationResult {
  if (weight === '' || reps === '') {
    return { isValid: false, error: 'Weight and reps are required' };
  }

  try {
    setRowSchema.validateSync({ weight, reps }, { abortEarly: true });
    return { isValid: true };
  } catch (err: any) {
    return { isValid: false, error: err.message };
  }
}

export function validateBodyWeight(weight: number | '', date?: string): ValidationResult {
  if (weight === '') {
    return { isValid: false, error: 'Weight is required' };
  }

  try {
    bodyWeightSchema.validateSync({ weight, date }, { abortEarly: true });
    return { isValid: true };
  } catch (err: any) {
    return { isValid: false, error: err.message };
  }
}
