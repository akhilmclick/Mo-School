import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { DemoSwitcher } from "@/components/ui/DemoSwitcher";

export const metadata: Metadata = {
  title: "Mo-School - School Management Portal",
  description: "Unified Portal for Parents, Teachers, and Administration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#F7F8FA] dark:bg-[#0B0F17] text-[#111827] dark:text-[#F8FAFC] min-h-screen antialiased transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <DemoSwitcher />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

