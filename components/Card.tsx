import { useState } from "react";
import { FileText, Edit, Trash2, Clock, Calendar, TrendingUp } from "lucide-react";

interface Props {
  title: string;
  createdAt: string;
  updatedAt: string;
  onSelect: () => void;
  onDelete: () => void;
  completion: number;
}

export const ResumeSummaryCard = ({
  title,
  createdAt,
  updatedAt,
  onSelect,
  onDelete,
  completion,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedCreatedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const getProgressConfig = () => {
    if (completion >= 90) return {
      color: "bg-green-500",
      label: "Complete",
      textColor: "text-green-700"
    };
    if (completion >= 70) return {
      color: "bg-blue-500", 
      label: "Almost Done",
      textColor: "text-blue-700"
    };
    if (completion >= 40) return {
      color: "bg-amber-500",
      label: "In Progress", 
      textColor: "text-amber-700"
    };
    return {
      color: "bg-gray-400",
      label: "Getting Started",
      textColor: "text-gray-600"
    };
  };

  const progress = getProgressConfig();

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDelete) onDelete();
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect();
  };

  const sections = [
    { name: "Profile", completed: completion >= 25 },
    { name: "Experience", completed: completion >= 50 },
    { name: "Skills", completed: completion >= 75 },
    { name: "Education", completed: completion >= 100 }
  ];

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 hover:border-gray-300 hover:-translate-y-1"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <FileText size={18} className="text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate mb-1 group-hover:text-gray-700 transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${progress.color}`}></div>
              <span className={`text-sm font-medium ${progress.textColor}`}>
                {progress.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Progress</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{completion}%</span>
        </div>
        
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full ${progress.color} transition-all duration-700 ease-out rounded-full`}
            style={{ width: `${completion}%` }}
          />
        </div>

        {/* Sections Status */}
        <div className="flex gap-1">
          {sections.map((section, index) => (
            <div
              key={section.name}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                section.completed ? progress.color : "bg-gray-200"
              }`}
              title={section.name}
            />
          ))}
        </div>
      </div>

      {/* Footer Information */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>Created {formattedCreatedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>Updated {formattedUpdatedDate}</span>
        </div>
      </div>

      {/* Hover Actions */}
      <div
        className={`absolute top-4 right-4 flex gap-2 transition-all duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handleEditClick}
          className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-400 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
          title="Edit Resume"
        >
          <Edit size={14} />
        </button>
        
        <button
          onClick={handleDeleteClick}
          className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all duration-200"
          title="Delete Resume"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Completion Badge */}
      <div className={`absolute top-4 left-4 px-2 py-1 ${progress.color} rounded-md text-white text-xs font-medium transition-all duration-200 ${isHovered ? "opacity-0" : "opacity-100"}`}>
        {completion}%
      </div>
    </div>
  );
};