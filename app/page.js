'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initChatKit = async () => {
      // Wait for ChatKit script to load
      while (!window.customElements.get('openai-chatkit')) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const chatkit = document.createElement('openai-chatkit');
      chatkit.style.height = '100%';
      chatkit.style.width = '100%';
      chatkit.style.display = 'block';

      chatkit.setOptions({
        api: {
          async getClientSecret() {
            const res = await fetch('/api/chatkit/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.error) {
              console.error('Session error:', data.error);
              throw new Error(data.error);
            }
            return data.client_secret;
          },
        },
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(chatkit);
      }
    };

    initChatKit();
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100vh', width: '100vw' }}>
      <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading chat...</p>
    </div>
  );
}
