import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rochester Real Beer Expo Unofficial Search Page",
  description: "Unofficial Search page for Rochester Real Beer Expo 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="text-center pb-5">
          Created and Designed by{" "}
          <Link
            className="font-medium text-sky-900 hover:text-sky-600"
            href="https://www.nikzprojects.com"
          >
            NikZProjects
          </Link>
        </div>
      </body>
    </html>
  );
}
