const STOP_WORDS = new Set([
  "and", "the", "with", "in", "of", "a", "an", "for", "on", "at", "to",
  "from", "by", "or", "but", "my", "your", "our", "this", "that", "these",
  "delight", "surprise", "special", "classic", "homemade", "easy", "quick",
  "simple", "style", "inspired", "fusion", "medley", "mix", "blend",
  "savory", "hearty", "creamy", "crispy", "spicy", "fresh", "light",
]);



export function getRecipeImageUrl(recipeName: string, size = 400): string {

  const seed = recipeName
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    
  return `https://loremflickr.com/${size}/${size}/food,dish?lock=${seed}`;

}