// https://www.reddit.com/r/pixijs/comments/5nkr3t/background_image_cover/
export default function(
  containerWidth,
  containerHeight,
  imageWidth,
  imageHeight
) {
  const containerRatio = containerWidth / containerHeight;
  const imageRatio = imageWidth / imageHeight;

  if (containerRatio > imageRatio) {
    return {
      height: imageHeight / (imageWidth / containerWidth),
      width: containerWidth,
      x: 0,
      y: (containerHeight - imageHeight / (imageWidth / containerWidth)) / 2
    };
  } else {
    return {
      width: imageWidth / (imageHeight / containerHeight),
      height: containerHeight,
      y: 0,
      x: (containerWidth - imageWidth / (imageHeight / containerHeight)) / 2
    };
	}
	
}
