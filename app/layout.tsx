export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Ghiblify Me</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-pink-50 text-gray-900">{children}</body>
    </html>
  );
}