"use client";
import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Palette,
  ArrowRight,
  Play,
  Users,
  Award,
  Globe,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const templates = [
  {
    id: 1,
    name: "Modern Resume",
    imagePath: "/Resume1.png",
    color: "from-blue-500 to-purple-500",
    description: "Clean and modern design perfect for tech professionals",
  },
  {
    id: 2,
    name: "Classic Resume",
    imagePath: "/Resume2.png",

    color: "from-gray-700 to-gray-900",
    description: "Traditional layout ideal for corporate positions",
  },
  {
    id: 3,
    name: "Creative Resume",
    imagePath: "/Resume3.png",
    color: "from-purple-500 to-pink-500",
    description: "Eye-catching design for creative professionals",
  },
];

export default function Home() {
  const route = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              ATS-friendly Resume Builder
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Create Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Professional Resume
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Build stunning resumes in minutes with our intuitive instant Download. Choose from professional templates and see your changes
              in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => route.push("/auth/login")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group cursor-pointer"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Try Live Demo
              </button>
              <button
                onClick={() => route.push("/auth/login")}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Templates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ElevateCV?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create a standout resume
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Preview</h3>
              <p className="text-gray-600">
                See your resume update instantly as you type. No more guessing
                what the final result will look like.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Beautiful Templates
              </h3>
              <p className="text-gray-600">
                Choose from professionally designed templates that make your
                resume stand out from the crowd.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">One-Click Download</h3>
              <p className="text-gray-600">
                Download your resume as a high-quality PDF with a single click.
                Perfect formatting guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-xl text-gray-600">
              Professional templates designed to impress recruiters
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? "ring-4 ring-blue-500 scale-105"
                    : "hover:shadow-xl"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${template.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {template.name}
                  </h3>
                  <div className="h-[33rem] overflow-hidden rounded-lg">
                    <Image
                      src={template.imagePath}
                      alt={template.name}
                      unoptimized
                      width={300}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    {template.description}
                  </p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">5K+</span>
              </div>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <FileText className="w-8 h-8 text-purple-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">10K+</span>
              </div>
              <p className="text-gray-600">Resumes Created</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Award className="w-8 h-8 text-green-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">95%</span>
              </div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Globe className="w-8 h-8 text-orange-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">10+</span>
              </div>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who&apos;ve elevated their careers
            with ElevateCV
          </p>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center cursor-pointer"
            onClick={() => route.push("/auth/login")}
          >
            Start Building Now
            <ArrowRight className="w-6 h-6 ml-2" />
          </button>
          <p className="text-gray-400 mt-4">
            No credit card required • Free templates included
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ElevateCV</span>
              </div>
              <p className="text-gray-400 mb-4">
                Create professional resumes that get you hired. Fast, easy, and
                beautiful.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cover Letter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resume Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>
              &copy; 2025 ElevateCV. All rights reserved.Made with ❤️ by{" "}
              <Link href="http://savad.me" className="text-violet-500 hover:underline cursor-pointer hover:text-violet-400  ">Savad </Link>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
