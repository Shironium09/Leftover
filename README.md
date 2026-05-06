# 🍲 Leftover

**Leftover** is a smart mobile application built with React Native and Expo, designed to help users minimize food waste by generating creative recipes from the ingredients they already have in their fridge.

## ✨ Features

- **Smart Recipe Generation**: Input your leftover ingredients and get delicious recipe suggestions instantly.
- **AI-Powered Assistant**: A friendly chatbot to help you with cooking tips, ingredient substitutions, and meal planning.
- **Ingredient Management**: Keep track of what's in your pantry and fridge to avoid double-buying.
- **Beautiful UI/UX**: A modern, premium design with a focus on ease of use and smooth transitions.
- **Fast Performance**: Optimized image rendering using `expo-image` with BlurHash placeholders.

## 🚀 Technologies

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- **Components**: 
  - `expo-image` for high-performance images.
  - Custom-built chat interface for maximum compatibility.

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS)
- npm or yarn
- Expo Go app on your [iOS](https://itunes.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/leftover.git
   cd leftover
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start -c
   ```

4. Scan the QR code with your Expo Go app to view the project on your device.

## 📂 Project Structure

- `app/`: Contains the main application routes and screens (Expo Router).
- `app/Components/`: Reusable UI components like `RecipeCard`.
- `data/`: Mock data for users, ingredients, and recipes.
- `assets/`: Static assets like logos and splash screens.
- `global.css`: Tailwind CSS configurations for NativeWind.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
