const GEMINI_CHAT_KEY = process.env.EXPO_PUBLIC_GEMINI_CHAT_API_KEY;
const GEMINI_CHAT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_CHAT_KEY}`;

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface RecipeHistory {
  name: string;
  ingredients: string[];
  instructions: string[];
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  recipeHistory: RecipeHistory[],
  currentRecipe?: RecipeHistory,
): Promise<string> {
  const recipeContext = recipeHistory
    .map(
      (r, i) =>
        `Recipe ${i + 1}: ${r.name}
     Ingredients: ${r.ingredients.join(", ")}
     Instructions: ${r.instructions.join(" ")}`,
    )
    .join("\n\n");

  const systemPrompt = currentRecipe
    ? `You are a cooking assistant specifically for the recipe "${currentRecipe.name}".
     Ingredients: ${currentRecipe.ingredients.join(", ")}.
     Instructions: ${currentRecipe.instructions.join(" ")}.
     
     Only answer questions about this specific recipe.
     Help with:
     - Ingredient measurements and substitutions
     - Clarifying cooking steps
     - Cooking techniques for this recipe
     - Timing and temperature questions
     Be concise and helpful.`
    : `You are a personal cooking assistant for the Leftover app.
     You have access to the user's 5 most recent recipes:
     
     ${recipeContext}
     
     You can:
     - Answer questions about any recipe in their history
     - Compare recipes
     - Suggest ingredient substitutions
     - Help with cooking techniques
     Be concise and helpful.`;

  const requestBody = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
  };

  const response = await fetch(GEMINI_CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini chat error:", errorText);
    throw new Error(`Gemini chat failed: ${response.status}`);
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Sorry, I could not respond."
  );
}
