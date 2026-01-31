"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function MeshGradientBg({
  className = "",
  colors = ["#e0eaff", "#ff4de7", "#ff0088"],
  distortion = 1,
  swirl = 1,
  grainMixer = 0,
  grainOverlay = 0,
  speed = 0.5,
  scale = 0.8,
  ...rest
}) {
  return (
    <div
      className={`fixed inset-0 -z-10 ${className}`}
      {...rest}
    >
      <MeshGradient
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        speed={speed}
        style={{ width: "100%", height: "100%" }}
        // Performance tuning (optional)
        minPixelRatio={1.5}
        maxPixelCount={1800000}
      />
    </div>
  );
}