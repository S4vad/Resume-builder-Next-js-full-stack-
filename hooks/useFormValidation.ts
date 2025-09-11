import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { validateFormStep } from '@/lib/formValidation';
import { calculateResumeCompletion } from '@/lib/completionCalculator';
import { updateProgression } from '@/store/slices/resumeSlice';

export const useFormValidation = (formType: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const resume = useAppSelector((state) => state.resume);
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const validation = validateFormStep(formType, resume);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setShowErrors(true);
      return false;
    }
    
    setErrors([]);
    setShowErrors(false);
    return true;
  };

  const validateAndUpdateProgress = () => {
    const isValid = validateForm();
    
    if (isValid) {
      // Calculate and update completion percentage
      const completion = calculateResumeCompletion(resume);
      dispatch(updateProgression(completion.percentage));
    }
    
    return isValid;
  };

  const clearErrors = () => {
    setErrors([]);
    setShowErrors(false);
  };

  return {
    errors,
    showErrors,
    validateForm,
    validateAndUpdateProgress,
    clearErrors
  };
};