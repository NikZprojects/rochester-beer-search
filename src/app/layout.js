import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unofficial Rochester Real Beer Expo Search Page",
  description: "Unofficial Search page for Rochester Real Beer Expo 2023",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="text-center pb-5">
          Created and Designed by{" "}
          <Link className="font-medium" href="https://www.nikzprojects.com">
            NikZProjects
          </Link>
        </div>
      </body>
    </html>
  );
}
