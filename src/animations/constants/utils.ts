interface ColorKey {
  k: number[];
}

interface Item {
  c?: ColorKey;
}

interface Shape {
  it?: Item[];
}

interface Layer {
  shapes?: Shape[];
}

interface AnimationData {
  layers: Layer[];
}

export const updateLottieColor = (
  animationData: AnimationData,
  color: [number, number, number],
): AnimationData => {
  animationData.layers.forEach((layer) => {
    if (layer.shapes) {
      layer.shapes.forEach((shape) => {
        if (shape.it) {
          shape.it.forEach((item) => {
            if (item.c) {
              // Update color to the provided RGB value
              item.c.k = [
                color[0] / 255, // Red
                color[1] / 255, // Green
                color[2] / 255, // Blue
                1, // Opacity (1 for fully opaque)
              ];
            }
          });
        }
      });
    }
  });
  return animationData;
};
