import { Bitcoin, Smartphone, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
            <Bitcoin className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EL5 BTC Cards</h1>
          <p className="text-lg text-gray-600">A Tinder-style card browsing experience</p>
        </div>

        {/* Description */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About This App</h2>
            <p className="text-gray-600 mb-4">This is a modern card browsing application built with Next.js 14, featuring a Tinder-style swipeable interface. Browse through a collection of cards with smooth animations and intuitive controls.</p>
            <p className="text-gray-600">The app is designed with a mobile-first approach but works seamlessly on desktop devices with keyboard navigation and button controls.</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Touch Gestures</h3>
                  <p className="text-sm text-gray-600">Swipe left or right on mobile devices to browse cards</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex gap-1 mt-1">
                  <ArrowLeft className="w-5 h-5 text-green-500" />
                  <ArrowRight className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Keyboard Navigation</h3>
                  <p className="text-sm text-gray-600">Use left and right arrow keys on desktop</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Loop Navigation</h3>
                  <p className="text-sm text-gray-600">Cards automatically loop back to the beginning</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Built With</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Framework</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• React 18</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Styling</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui</li>
                  <li>• Framer Motion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Mobile:</strong> Swipe cards left or right with your finger
              </p>
              <p>
                <strong>Desktop:</strong> Use arrow keys or click the navigation buttons
              </p>
              <p>
                <strong>Reset:</strong> Click the reset button to return to the first card
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
