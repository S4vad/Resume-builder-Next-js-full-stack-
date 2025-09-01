import Button from "@/components/Button";
import React from "react";
import { RiFileUploadLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <div className="">
      <div className="flex justify-end p-5">
        <div>
        <h1>My Resumes</h1>
        </div>
        <Button className="hover:scale-105  active:scale-95   transform transition-transform duration-200 ease-in-out">
          Create New <RiFileUploadLine />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
