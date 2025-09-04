import "./globals.css";
import AuthProvider from "../app/providers/Session-provider";
import ReduxProvider from "@/components/ReduxProvider";
import SessionSync from "@/components/SessionSync";
import Navbar from "@/components/Nav";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReduxProvider>
            <SessionSync />
            <Toaster position="top-center" reverseOrder={true} />
            <Navbar />
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
