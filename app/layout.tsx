import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';

export const metadata: Metadata = {
  title: 'Ultra Decision Engine',
  description: 'Evaluate the marginal value of your next activity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
