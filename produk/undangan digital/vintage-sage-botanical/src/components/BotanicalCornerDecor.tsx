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
        <div className="absolute -top-3 -left-3 w-32 sm:w-40 pointer-events-none z-20 animate-sway-tl origin-top-left filter drop-shadow-md">
          <img
            src="./assets/TEMA-01-BUNGA-01-e1721804047720-1-2.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain select-none"
          />
        </div>
      )}

      {/* Top Right Botanical Branch / Flower Cluster */}
      {showTop && (
        <div className="absolute -top-3 -right-3 w-32 sm:w-40 pointer-events-none z-20 animate-sway-tr origin-top-right filter drop-shadow-md">
          <img
            src="./assets/TEMA-01-BUNGA-02-e1721804129842-1-2.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain select-none"
          />
        </div>
      )}

      {/* Mid Left Foliage */}
      {showMid && (
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-24 sm:w-32 pointer-events-none z-20 animate-sway-bl origin-left filter drop-shadow-sm">
          <img
            src="./assets/TEMA-01-BUNGA-04-e1721804205400-1-2.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain select-none"
          />
        </div>
      )}

      {/* Mid Right Foliage */}
      {showMid && (
        <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-24 sm:w-32 pointer-events-none z-20 animate-sway-br origin-right filter drop-shadow-sm">
          <img
            src="./assets/TEMA-01-BUNGA-03-e1721804270463-1-2.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain select-none"
          />
        </div>
      )}

      {/* Bottom Left Botanical Flower Cluster (Full, organic, uncropped bouquet) */}
      {showBottom && (
        <div className="absolute -bottom-3 -left-3 w-32 sm:w-40 pointer-events-none z-20 animate-sway-bl origin-bottom-left filter drop-shadow-md">
          <img
            src="./assets/TEMA-01-BUNGA-01-bawah-e1721804781634-1-2.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain select-none"
          />
        </div>
      )}

      {/* Bottom Right Botanical Flower Cluster (Full, organic, uncropped bouquet) */}
      {showBottom && (
        <div className="absolute -bottom-3 -right-3 w-32 sm:w-40 pointer-events-none z-20 animate-sway-br origin-bottom-right filter drop-shadow-md">
          <img
            src="./assets/TEMA-01-BUNGA-02bawah-e1721804937768-1-2.webp"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto object-contain select-none"
          />
        </div>
      )}
    </>
  );
};
