import React from 'react';

interface BotanicalFrameProps {
  className?: string;
  showDividers?: boolean;
}

export const BotanicalFrame: React.FC<BotanicalFrameProps> = ({ className = '', showDividers = false }) => {
  return (
    <>
      {/* Top Left Leaf Corner */}
      <img
        src="./images/bunga_top_left.webp"
        alt="Botanical top left leaf"
        className="absolute top-0 left-0 w-28 sm:w-40 md:w-48 opacity-80 pointer-events-none z-10 animate-sway"
      />

      {/* Top Right Leaf Corner */}
      <img
        src="./images/bunga_top_right.webp"
        alt="Botanical top right leaf"
        className="absolute top-0 right-0 w-28 sm:w-40 md:w-48 opacity-80 pointer-events-none z-10 animate-sway-reverse"
      />

      {/* Bottom Left Leaf Corner */}
      <img
        src="./images/bunga_bottom_left.webp"
        alt="Botanical bottom left leaf"
        className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-44 opacity-85 pointer-events-none z-10 animate-sway-reverse"
      />

      {/* Bottom Right Leaf Corner */}
      <img
        src="./images/bunga_bottom_right.webp"
        alt="Botanical bottom right leaf"
        className="absolute bottom-0 right-0 w-24 sm:w-36 md:w-44 opacity-85 pointer-events-none z-10 animate-sway"
      />
    </>
  );
};

export const BotanicalDivider: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8 pointer-events-none px-4">
      <img
        src="./images/bunga_divider.webp"
        alt="Floral botanical divider"
        className="w-48 sm:w-64 max-w-full object-contain filter drop-shadow-sm opacity-90 animate-pulse"
      />
    </div>
  );
};
