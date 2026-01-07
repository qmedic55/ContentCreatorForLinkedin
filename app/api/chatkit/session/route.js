import { NextResponse } from 'next/server';

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const workflowId = process.env.VITE_CHATKIT_WORKFLOW_ID;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
  }

  if (!workflowId) {
    return NextResponse.json({ error: 'Missing workflow ID' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: crypto.randomUUID(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Failed to create session' }, { status: response.status });
    }

    return NextResponse.json({ client_secret: data.client_secret });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
