import "./globals.css";
import AuthProvider from "../app/providers/Session-provider";
import ReduxProvider from "@/components/ReduxProvider";
import SessionSync from "@/components/SessionSync";
import Navbar from "@/components/Nav";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "ElevateCV",
  description: "This is my resume builder site",
  icons: {
    icon: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="px-2 sm:px-0">
        <AuthProvider>
          <ReduxProvider>
            <SessionSync />
            <Toaster position="top-center" reverseOrder={true} />
            <AuthGuard>
              <Navbar />
              {children}
            </AuthGuard>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
