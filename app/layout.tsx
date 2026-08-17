import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { DemoSwitcher } from "@/components/ui/DemoSwitcher";

export const metadata: Metadata = {
  title: "Aura Crest Academy - School Management Portal",
  description: "Unified Portal for Parents, Teachers, and Administration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F8FA] text-[#111827] min-h-screen antialiased">
        <AuthProvider>
          <DemoSwitcher />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
