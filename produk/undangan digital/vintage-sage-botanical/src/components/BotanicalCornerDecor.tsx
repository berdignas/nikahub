import React from 'react';

interface BotanicalCornerDecorProps {
  showTop?: boolean;
  showBottom?: boolean;
  showMid?: boolean;
}

export const BotanicalCornerDecor: React.FC<BotanicalCornerDecorProps> = ({
  showTop = true,
  showBottom = true,
  showMid = false,
}) => {
  return (
    <>
      {/* Top Left Botanical Branch / Flower Cluster */}
      {showTop && (
        <div className="absolute -top-4 -left-4 w-28 sm:w-36 pointer-events-none z-20 animate-sway-tl origin-top-left filter drop-shadow-md">
          <img
            src="./assets/bunga_top_left_clean.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Top Right Botanical Branch / Flower Cluster */}
      {showTop && (
        <div className="absolute -top-4 -right-4 w-28 sm:w-36 pointer-events-none z-20 animate-sway-tr origin-top-right filter drop-shadow-md">
          <img
            src="./assets/bunga_top_right_clean.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Mid Left Foliage */}
      {showMid && (
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-20 sm:w-28 pointer-events-none z-20 animate-sway-bl origin-left filter drop-shadow-sm">
          <img
            src="./assets/bunga_mid_left_clean.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Mid Right Foliage */}
      {showMid && (
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-20 sm:w-28 pointer-events-none z-20 animate-sway-br origin-right filter drop-shadow-sm">
          <img
            src="./assets/bunga_mid_right_clean.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Bottom Left Botanical Flower Cluster */}
      {showBottom && (
        <div className="absolute -bottom-4 -left-4 w-28 sm:w-36 pointer-events-none z-20 animate-sway-bl origin-bottom-left filter drop-shadow-md">
          <img
            src="./assets/bunga_bottom_left_clean.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Bottom Right Botanical Flower Cluster */}
      {showBottom && (
        <div className="absolute -bottom-4 -right-4 w-28 sm:w-36 pointer-events-none z-20 animate-sway-br origin-bottom-right filter drop-shadow-md">
          <img
            src="./assets/bunga_bottom_right_clean.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain"
          />
        </div>
      )}
    </>
  );
};
