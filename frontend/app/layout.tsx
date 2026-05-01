import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DineFlow',
  description: 'Saas Restaurant Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
