import { SYSTEM_IMAGE_PROMPT } from '../data/IMAGE_SYSTEM_PROMPT';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

export async function scanIngredients(base64Image: string, mimeType: string = 'image/jpeg'): Promise<string[]> {
  const requestBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_IMAGE_PROMPT }],
    },
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
          {
            text: 'Identify all food items and ingredients visible in this image. Return your response as a JSON object with a single key "ingredients" containing an array of strings.',
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          ingredients: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
        },
        required: ['ingredients'],
      },
    },
  };

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Gemini API request failed: ${response.status}`);
  }

  const data = await response.json();

  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error('No content in Gemini response');
  }

  const parsed = JSON.parse(content);
  return parsed.ingredients ?? [];
}
