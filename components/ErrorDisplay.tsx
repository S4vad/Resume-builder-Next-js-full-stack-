import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  errors: string[];
  showErrors: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors, showErrors }) => {
  if (!showErrors || errors.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="text-red-500" size={20} />
        <span className="text-red-700 font-medium">
          Please fix the following errors:
        </span>
      </div>
      <ul className="list-disc list-inside text-red-600 space-y-1">
        {errors.map((error, index) => (
          <li key={index} className="text-sm">{error}</li>
        ))}
      </ul>
    </div>
  );
};