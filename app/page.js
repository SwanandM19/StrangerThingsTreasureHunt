import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fall of Vecna - Treasure Hunt',
  description: 'A Stranger Things themed treasure hunt experience',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <p>hello this is the landing page</p>
        {children}
      </body>
    </html>
  );
}
