import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Fall of Vecna - Treasure Hunt',
  description: 'A Stranger Things themed treasure hunt experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}

