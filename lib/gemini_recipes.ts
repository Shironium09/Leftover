const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  prep_time: number;
}

export interface Preferences {
  meal_type: string;
  diet_type: string;
  prep_time: number;
  spice_level: string;
  cuisine_type: string;
}

export async function generateRecipes(
  ingredients: string[],
  preferences: Preferences,
): Promise<Recipe[]> {
  const requestBody = {
    systemInstruction: {
      parts: [
        {
          text: `You are a professional chef. Generate exactly 5 creative recipes based on the provided ingredients and preferences. Only use the ingredients provided. Be specific with measurements in instructions.`,
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            text: `
            Available ingredients: ${ingredients.join(", ")}
            Meal type: ${preferences.meal_type}
            Diet type: ${preferences.diet_type}
            Max prep time: ${preferences.prep_time} minutes
            Spice level: ${preferences.spice_level}
            Cuisine: ${preferences.cuisine_type}
            
            Generate 5 recipes.
          `,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            ingredients: {
              type: "ARRAY",
              items: { type: "STRING" },
            },
            instructions: {
              type: "ARRAY",
              items: { type: "STRING" },
            },
            prep_time: { type: "NUMBER" },
          },
          required: ["name", "ingredients", "instructions", "prep_time"],
        },
      },
    },
  };

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini recipes error:", errorText);
    throw new Error(`Gemini recipe generation failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error("No content in Gemini response");
  }

  return JSON.parse(content) ?? [];
}
