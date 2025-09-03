# EL5 BTC - Tinder-Style Card App

A modern Next.js 14 application featuring a Tinder-style swipeable card interface with Bitcoin-themed navigation.

## Features

- 🃏 **Tinder-Style Cards**: Smooth swipeable card stack with realistic animations
- 📱 **Mobile-First**: Optimized for mobile with touch gestures
- 🖥️ **Desktop Support**: Keyboard navigation and button controls
- 🔄 **Loop Navigation**: Cards automatically cycle back to the beginning
- 🎨 **Clean Design**: Minimal black/white design with Tailwind CSS
- ⚡ **Modern Stack**: Next.js 14 with App Router, TypeScript, and Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Mobile
- Swipe cards left or right with your finger
- Use the bottom navigation to switch between Bitcoin and About tabs

### Desktop
- Use left/right arrow keys to navigate cards
- Click the navigation buttons below the cards
- Click the reset button to return to the first card

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main Bitcoin page
├── components/
│   ├── ui/
│   │   └── button.tsx        # shadcn/ui Button component
│   ├── BottomNav.tsx         # Bottom navigation bar
│   └── SwipeCard.tsx         # Individual swipeable card
├── lib/
│   └── utils.ts              # Utility functions
├── public/
│   └── cards/                # Card images (card1.png - card10.png)
└── README.md
```

## Card Images

The app loads card images from `/public/cards/` directory. Currently supports:
- `card1.png` through `card10.png`
- Images are optimized with Next.js Image component
- Responsive loading with proper sizing

## Customization

### Adding More Cards
1. Add new images to `/public/cards/` following the naming pattern `cardX.png`
2. Update the `generateCards()` function in `app/page.tsx` to include the new range

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Customize the color scheme in `tailwind.config.js`

## Build for Production

```bash
npm run build
npm start
```

## License

This project is for demonstration purposes.
