// Client-side image helpers. Only import from client components.

export function readAsDataURL(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not decode image'));
    img.src = src;
  });
}

/**
 * Downscale and re-encode an image to a JPEG that's safe to send through API
 * routes (well under serverless body limits) and optimal for Claude vision
 * (~1568px). Re-encoding via canvas also strips EXIF/GPS metadata, which keeps
 * location data out of stored photos and outgoing emails.
 *
 * Falls back to the original file if the browser can't decode it (e.g. HEIC on
 * some browsers).
 */
export async function downscaleImage(
  file: File,
  maxDim = 1600,
  quality = 0.85
): Promise<{ file: File; dataUrl: string }> {
  const originalDataUrl = await readAsDataURL(file);

  try {
    const img = await loadImage(originalDataUrl);
    let { width, height } = img;
    const longest = Math.max(width, height);

    if (longest > maxDim) {
      const scale = maxDim / longest;
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return { file, dataUrl: originalDataUrl };

    ctx.drawImage(img, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);

    const blob = await (await fetch(dataUrl)).blob();
    const name = file.name.replace(/\.[^.]+$/, '') || 'photo';
    const out = new File([blob], `${name}.jpg`, { type: 'image/jpeg' });

    return { file: out, dataUrl };
  } catch {
    // Could not decode/resize — use the original so the user isn't blocked.
    return { file, dataUrl: originalDataUrl };
  }
}
