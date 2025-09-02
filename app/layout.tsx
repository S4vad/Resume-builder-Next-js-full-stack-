import "./globals.css";
import AuthProvider from "../app/providers/Session-provider";
import ReduxProvider from "@/components/ReduxProvider";
import SessionSync from "@/components/SessionSync";

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
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
