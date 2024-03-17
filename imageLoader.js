export default function AWSImageLoader({ src, width, quality }) {
  const url = new URL(src, process.env.IMAGE_URL).href;
  return `${url}?w=${width}&q=${quality || 75}`;
}
