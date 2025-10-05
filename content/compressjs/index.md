---
title: "Automatically Compress Images to a Target Size Using Compressor.js"
date: "2025-10-05T08:18:00+08:00"
summary: "This tutorial demonstrates how to use the JavaScript library Compressor.js to automatically compress images to a specific file size (e.g., under 600KB), convert them to the modern WebP format, and enforce maximum width/height constraints. The approach uses recursive quality reduction to maintain the best image quality while ensuring the file size meets the requirement."
cover: compressjs.webp
images:
  - compressjs.webp
categories:
  - front-end
tags:
  - Image
  - Compress
  - Performance
draft: false
---

本篇中文版：[圖片壓縮：用 Compressor-js 自動調整品質壓縮至指定大小](https://www.letswrite.tw/compressjs/)

---

## What This Guide Solves

Many websites need to handle user-uploaded images—for example, profile pictures. But thanks to ever-improving smartphone cameras, photo sizes are now often several megabytes. Uploading these large images wastes time and storage.

While many online tools can compress images, most only let you set a fixed quality, without guaranteeing the final size. This guide shows how to use **Compressor.js** to:

- Automatically adjust compression quality until the file is below a target size (e.g., 600KB)
- Convert the image to WebP format
- Limit the maximum image dimensions

This ensures your images are lightweight yet still look great.

---

## Listen in: Key takeaways from Google's NotebookLM.

{{< iframe src="https://www.youtube.com/embed/GC0ZTZjbUMU" width="704" height="396" >}}

---

## Core Concept: Recursive Compression

Most tools apply compression in a single pass. This tutorial introduces a **recursive approach** using `Compressor.js`. Here’s how it works:

1. Start with the highest quality (`quality = 1.0`)
2. Check the compressed image size
3. If it's larger than 600KB, reduce the quality by 0.05 and try again
4. Repeat until the image is small enough or the quality hits a floor (e.g., 0.40)

This method helps retain image quality while ensuring the size requirement is met.

---

## Importing Compressor.js

You can include Compressor.js in your page via CDN:

```html {linenos=table,anchorlinenos=true}
<script src="https://cdn.jsdelivr.net/npm/compressorjs@1.2.1/dist/compressor.min.js"></script>
```

For more details, see the [official documentation](https://github.com/fengyuanchen/compressorjs).

---

## HTML Setup

We’ll need a file input for image upload and an image tag for previewing the result:

```html {linenos=table,anchorlinenos=true}
<input type="file" id="upload" accept="image/*" />
<img id="preview" style="max-width:300px" />
```

---

## Smart Compression Function

The heart of this tool is a recursive compression function with the following parameters:

- `file`: the original image file
- `targetSize`: max allowed size (default: 600KB)
- `floor`: minimum acceptable quality (default: 0.40)
- `step`: quality decrement per attempt (default: 0.05)

```javascript {linenos=table,anchorlinenos=true}
function compressWithFloor(
  file,
  targetSize = 600 * 1024,
  floor = 0.4,
  step = 0.05
) {
  return new Promise((resolve, reject) => {
    let q = 1.0;
    const attempt = () => {
      new Compressor(file, {
        quality: q,
        mimeType: "image/webp",
        maxWidth: 2560,
        maxHeight: 1440,
        success(blob) {
          console.log(
            `q=${q.toFixed(2)} size=${Math.round(blob.size / 1024)}KB`
          );
          if (blob.size > targetSize && q - step >= floor) {
            q = +(q - step).toFixed(2);
            attempt();
          } else {
            resolve(blob);
          }
        },
        error(err) {
          reject(err);
        },
      });
    };

    attempt();
  });
}
```

### Key Parameters

**1. Convert to WebP**

Using `mimeType: 'image/webp'` ensures all images are output in WebP format, which typically offers 25–35% better compression than JPEG at the same quality.

**2. Dimension Limits**

The `maxWidth: 2560` and `maxHeight: 1440` settings prevent images from exceeding 2K resolution. Smaller images won’t be enlarged; larger ones will be downscaled proportionally.

**3. Recursive Logic**

```javascript {linenos=table,anchorlinenos=true}
if (blob.size > targetSize && q - step >= floor) {
  q = +(q - step).toFixed(2);
  attempt();
}
```

This ensures the file is both under the size limit and not overly degraded in quality.

---

## Convert Blob to Base64

To preview or send the image (e.g., via API), convert the compressed `Blob` to Base64:

```javascript {linenos=table,anchorlinenos=true}
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onloadend = () => resolve(r.result);
    r.readAsDataURL(blob);
  });
}
```

---

## Integrating Upload & Download

This part listens for image uploads, compresses them, and triggers a download:

```javascript {linenos=table,anchorlinenos=true}
document.getElementById("upload").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
  const compressed = await compressWithFloor(file, 600 \* 1024, 0.4, 0.05);
  console.log("final size:", Math.round(compressed.size / 1024), "KB");

    const base64 = await blobToBase64(compressed);
    document.getElementById("preview").src = base64;

    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const newFileName = `${originalName}-compress.webp`;

    const link = document.createElement("a");
    link.href = base64;
    link.download = newFileName;
    link.click();

  } catch (err) {
    console.error("Compression failed:", err);
  }
});
```

### Filename Handling

The original file’s extension is stripped and replaced with `-compress.webp`. For example:

```
vacation.jpg → vacation-compress.webp
```

---

## Compression Example

Uploading a 5MB photo might produce this output:

```text {linenos=table,anchorlinenos=true}
q=1.00  size=1200KB → Too big
q=0.95  size=950KB  → Still too big
q=0.90  size=750KB  → Still too big
q=0.85  size=580KB  → Success!
final size: 580 KB
```

If quality hits 0.40 and the image is still too big, the script stops to avoid making it unrecognizably blurry.

---

## Full Example Code

The complete code, including HTML, JavaScript, and CDN links, is available in the original article. You can also view a live demo or grab the source code.

---

## Demo and Source Code

Try the image compression tool here:

**🔗 Demo:** [Live Demo](https://letswritetw.github.io/letswrite-compressjs/)
**💻 GitHub:** [GitHub Repository](https://github.com/letswritetw/letswrite-compressjs)

If you find it helpful, feel free to give it a ⭐ on GitHub!

---

Translated by ChatGPT.
