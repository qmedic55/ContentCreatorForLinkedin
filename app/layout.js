import Script from 'next/script';

export const metadata = {
  title: 'LinkedIn Content Creator',
  description: 'AI-powered LinkedIn content assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>
        {children}
      </body>
    </html>
  );
}
