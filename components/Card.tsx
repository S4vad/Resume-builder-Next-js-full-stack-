import { useState } from "react";
import {
  FileText,
  Edit,
  Trash2,
  Clock,
  Calendar,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FolderOpen,
  Globe,
  Heart,
} from "lucide-react";
import { ScaleLoader } from "react-spinners";

interface Props {
  title: string;
  createdAt: string;
  isLoading: boolean;
  updatedAt: string;
  onDelete: () => void;
  completion: number;
  sectionDetails?: {
    [key: string]: {
      completed: number;
      total: number;
      percentage: number;
    };
  };
}

export const ResumeSummaryCard = ({
  title,
  createdAt,
  updatedAt,
  onDelete,
  isLoading,
  completion,
  sectionDetails,
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
    if (completion >= 90)
      return {
        color: "bg-emerald-500",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        label: "Complete",
        textColor: "text-emerald-700",
        gradientFrom: "from-emerald-500",
        gradientTo: "to-emerald-600",
      };
    if (completion >= 70)
      return {
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        label: "Almost Done",
        textColor: "text-blue-700",
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-600",
      };
    if (completion >= 40)
      return {
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        label: "In Progress",
        textColor: "text-amber-700",
        gradientFrom: "from-amber-500",
        gradientTo: "to-amber-600",
      };
    return {
      color: "bg-gray-400",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      label: "Getting Started",
      textColor: "text-gray-600",
      gradientFrom: "from-violet-500",
      gradientTo: "to-purple-500",
    };
  };

  const progress = getProgressConfig();

  // Define the main sections with proper mapping and icons
  const sections = [
    {
      name: "Personal",
      key: "personal",
      icon: User,
      completed: (sectionDetails?.personal?.percentage || 0) >= 75,
    },
    {
      name: "Contact",
      key: "contact",
      icon: Globe,
      completed: (sectionDetails?.contact?.percentage || 0) >= 75,
    },
    {
      name: "Experience",
      key: "experience",
      icon: Briefcase,
      completed: (sectionDetails?.experience?.percentage || 0) >= 75,
    },
    {
      name: "Education",
      key: "education",
      icon: GraduationCap,
      completed: (sectionDetails?.education?.percentage || 0) >= 75,
    },
    {
      name: "Skills",
      key: "skills",
      icon: Code,
      completed: (sectionDetails?.skills?.percentage || 0) >= 75,
    },
    {
      name: "Projects",
      key: "projects",
      icon: FolderOpen,
      completed: (sectionDetails?.projects?.percentage || 0) >= 75,
    },
    {
      name: "Certificates",
      key: "certifications",
      icon: Award,
      completed: (sectionDetails?.certifications?.percentage || 0) >= 75,
    },
    {
      name: "Additional",
      key: "additional",
      icon: Heart,
      completed: (sectionDetails?.additional?.percentage || 0) >= 75,
    },
  ];

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDelete) onDelete();
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const completedSections = sections.filter(
    (section) => section.completed
  ).length;

  if (isLoading) {
    return (
      <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <ScaleLoader color="#8b5cf6" height={35} width={4} />
          <div className="text-purple-600 font-medium">Loading Resume...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/30 hover:border-gray-300 hover:-translate-y-2 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${progress.gradientFrom} ${progress.gradientTo} rounded-xl flex items-center justify-center shadow-lg shadow-gray-200`}
          >
            <FileText size={20} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate mb-2 group-hover:text-gray-700 transition-colors">
              {title}
            </h3>

            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${progress.color}`}></div>
              <span className={`text-sm font-medium ${progress.textColor}`}>
                {progress.label}
              </span>
            </div>

            <div className="text-xs text-gray-500">
              {completedSections} of {sections.length} sections completed
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={14}
              className={progress.textColor.replace("text-", "text-")}
            />
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>
          </div>
          <span className="text-sm font-bold text-gray-900">{completion}%</span>
        </div>

        {/* Main Progress Bar */}
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4 shadow-inner">
          <div
            className={`h-full bg-gradient-to-r ${progress.gradientFrom} ${progress.gradientTo} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${completion}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {sections.slice(0, 8).map((section) => {
            const IconComponent = section.icon;
            const sectionPercentage =
              sectionDetails?.[section.key]?.percentage || 0;

            return (
              <div
                key={section.key}
                className="flex flex-col items-center group/section relative"
                title={`${section.name}: ${sectionPercentage}% complete`}
              >
                <div
                  className={`w-full h-1.5 rounded-full mb-2 transition-all duration-300 ${
                    section.completed
                      ? `${progress.color} shadow-sm`
                      : sectionPercentage > 0
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  }`}
                >
                  {!section.completed && sectionPercentage > 0 && (
                    <div
                      className={`h-full ${progress.color} rounded-full transition-all duration-500`}
                      style={{ width: `${sectionPercentage}%` }}
                    />
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <IconComponent
                    size={12}
                    className={`mb-1 transition-colors duration-200 ${
                      section.completed
                        ? progress.textColor
                        : sectionPercentage > 0
                        ? "text-gray-400"
                        : "text-gray-300"
                    }`}
                  />
                  <span className="text-[9px] text-gray-500 text-center leading-tight">
                    {section.name}
                  </span>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/section:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {sectionPercentage}%
                </div>
              </div>
            );
          })}
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
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <button
          onClick={handleEditClick}
          className="w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-500 hover:border-emerald-300 hover:shadow-lg hover:scale-110 transition-all duration-200"
          title="Edit Resume"
        >
          <Edit size={14} />
        </button>

        <button
          onClick={handleDeleteClick}
          className="w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-300 hover:shadow-lg hover:scale-110 transition-all duration-200"
          title="Delete Resume"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Completion Badge */}
      <div
        className={`absolute top-4 left-4 px-2 py-1 bg-gradient-to-r ${
          progress.gradientFrom
        } ${
          progress.gradientTo
        } rounded-lg text-white text-xs font-bold transition-all duration-300 shadow-md ${
          isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        {completion}%
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-violet-500 to-purple-600"></div>
    </div>
  );
};
