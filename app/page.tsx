import SwipeDeck from "@/components/SwipeDeck";

export default function Page() {
  const cards = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    src: `/cards/card${i}.png`,
    title: `Card ${i}`,
  }));

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-80px)] max-w-md flex-col items-center px-0 pt-4 pb-12">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">EL5 Bitcoin</h1>
      </div>

      <div className="w-full flex-1 flex items-center justify-center">
        <SwipeDeck cards={cards} height={600} />
      </div>

      {/* <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
          <span className="block mb-1">
            <span className="md:hidden">Drag with your thumb to swipe cards.</span>
            <span className="hidden md:inline">Drag with your mouse or use arrow keys.</span>
          </span>
          <span className="block">Cards automatically loop back to the beginning.</span>
        </p>
      </div> */}
    </main>
  );
}
