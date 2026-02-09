import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const TetrisBackground = () => (
  <div className="tetris-container">
    <div className="tetris-wrapper">
      <DotLottieReact
        src={"bg.lottie"}
        loop
        autoplay
        style={{
          willChange: 'transform',
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  </div>
);