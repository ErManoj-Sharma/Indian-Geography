import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Indian Geography & Maps | States, Rivers, Mountains & More",
  description:
    "Discover detailed information about Indian geography including states, rivers, mountains, and physical features. Interactive maps and educational resources to explore India’s diverse landscape.",
  keywords: [
    "Indian Geography",
    "India Maps",
    "States of India",
    "Rivers of India",
    "Mountains in India",
    "Indian physical features",
    "Geography of India",
    "Indian topography",
    "India map learning",
    "interactive maps India"
  ],
  openGraph: {
    title: "Explore Indian Geography & Maps | States, Rivers, Mountains & More",
    description:
      "Dive into interactive maps and learn about the diverse geography of India including states, rivers, mountains, and more.",
    url: "https://yourdomain.com",
    type: "website",
    locale: "en_IN",
    siteName: "Indian Geography & Maps",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Geography & Maps Overview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator:"Manoj Sharma",
    title: "Explore Indian Geography & Maps | States, Rivers, Mountains & More",
    description:
      "Learn about India's geography using detailed maps and visual guides. Perfect for students and enthusiasts.",
    images: ["https://yourdomain.com/images/twitter-card.jpg"]
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
