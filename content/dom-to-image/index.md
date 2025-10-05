---
title: "Simple Webpage Screenshot Functionality - DOM to Image"
date: "2023-02-25T08:18:00+08:00"
summary: "This article explores the DOM to Image package, which can be used by frontend developers to capture webpage screenshots. It provides a step-by-step guide to using the package, including tips on configuring the parameters for the captured image. Additionally, the author shares an Easter egg about generative AI."
cover: dom-to-image.jpg
images:
  - dom-to-image.jpg
categories:
  - front-end
tags:
  - Webpage Screenshot
  - Dom-to-image
  - JavaScript Package
  - Generative AI
draft: false
---

## Problem to be solved

This article was translated by Notion AI. Here is the link to the original Chinese version:

[https://www.letswrite.tw/dom-to-image/](https://www.letswrite.tw/dom-to-image/)

Last September, August wrote an article titled "Simple Webpage Screenshot Function - html2canvas, Canvas2image". At that time, I thought that this was the ultimate package for frontend developers in the area of webpage screenshot (Really?). However, lately, when I need to use this screenshot and download function in his work, I realized that the actual situation was different as the webpage was more complex than the demo. As a result, some parts of the webpage in the saved image were misaligned.

[https://www.letswrite.tw/web-to-image/](https://www.letswrite.tw/web-to-image/)

I was at a loss because I had to create another version of CSS for the screenshot state of the webpage, which took some extra time.

Recently, I had another project that required the use of screenshot and download function. I found that there was also a case of running out of space. I frowned and thought that the situation was not simple, so he asked ChatGPT if there were any alternative tools. The conversation is shown in the image below:

{{< figure src="https://i0.wp.com/dev-to-uploads.s3.amazonaws.com/uploads/articles/7hols67fmvh9czy8ut7e.png?w=840&ssl=1" title="with ChatGPT" alt="with ChatGPT" >}}

Just tried the dom-to-image mentioned in the article and found out that it doesn't cause any layout issues and the downloaded image file size is significantly smaller.

However, I still encountered some problems during the process, so I decided to write a screenshot function for this package to serve as a quick guide for those who want to use it without encountering any pitfalls.

At the end of this article, there is also an Easter egg about the impact of generative AI that I recently discovered. Be sure to check it out!

Here's the final demo at the end of this article:

[https://letswritetw.github.io/letswrite-dom-to-image/](https://letswritetw.github.io/letswrite-dom-to-image/)

---

## Installing DOM to Image

DOM to Image: [https://github.com/tsayen/dom-to-image](https://github.com/tsayen/dom-to-image)

The installation process is the same as for any JavaScript package. You can either directly reference the CDN or use the npm package.

**CDN**

```html {linenos=table,anchorlinenos=true}
<script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"></script>
```

**npm package**

Install package first:

```bash {linenos=table,anchorlinenos=true}
$ npm install dom-to-image
# 或
$ yarn add dom-to-image
```

JS import：

```javascript {linenos=table,anchorlinenos=true}
import domtoimage from "dom-to-image";
```

---

## Using Dom to Image

Dom to Image can be used to save images in JPEG, PNG, and SVG formats.

Since I did not actually use SVG, we will not be using it here.

The following demonstrates how to save an image as a PNG file.

```javascript {linenos=table,anchorlinenos=true}
// Fetch a specified div and generate a base64 format image.
// The reason for repeating twice will be explained in the following paragraph of notes.
const el = document.getElementById("xxx");
const config = {
  quality: 1,
  style: { filter: "grayscale(100%)" },
};

const dataUriTemp = await domtoimage
  .toPng(el, captureConfig)
  .then((dataUrl) => dataUrl);
const dataUri = await domtoimage
  .toPng(el, captureConfig)
  .then((dataUrl) => dataUrl);

// download image
const link = document.createElement("a");
const filename = "Demo.png";
link.download = filename;
link.href = dataUri;
link.click();
```

If you want to save it as JPEG, change `toPng` to `toJpeg` in the code, and also remember to change the file extension to `*.jpeg`.

The `config` in the code is a parameter that can be passed in. Here, we demonstrate changing the `quality` and `style`.

Since `style` is set to `filter: grayscale(100%)`, the downloaded image will be in grayscale.

If it's a page for an event, adding a `style` before taking a screenshot can be a fun way to do it.

Available parameters are as follows:

- filter: can filter out specified tags. The official documentation uses it to filter out SVG tags.
- bgcolor: specify the background color.
- width, height: specify the width and height.
- style: can add additional style.
- quality: image quality, with a value of 0-1, 1 being the highest, default is 1.
- cacheBust: whether to clear cache, true is yes, false is no, default is false.
- imagePlaceholder: if the image in the div cannot be obtained, what placeholder image to use. According to the documentation, it should be filled with Base64.

---

## Notes

After spending a morning troubleshooting, August has finally discovered 2 things to be aware of when operating on a mobile device, otherwise the images generated by Dom-to-Image will result in blank spaces in the div where the images are:

- Images have `position: relative`.
- When executing `domtoimage.toJpeg(targetId, [config])`, the first image will be blank, but starting from the second time it will be normal, so...although it's very stupid, in order to maintain peace in the mobile world, please execute it twice. That's why the sample code writes `dataUriTemp` first, and then another `dataUri`.

In addition, there is another situation that will cause the downloaded image to be incomplete, which is when the `div` that is captured itself has `max-width: xxx; margin: 0 auto;` written in it. Writing `max-width` will cause DOM to Image to write a limited width when capturing the image, but because the image capture does not center the image, the captured image will start from the far left, causing the right side to be cropped.

---

## Demo and Source Code

The source code for this post is available on GitHub, and a demo has been generated using GitHub Pages. Please feel free to use it, but we hope that you will share this post or give it a star on GitHub before doing so. Your small action is a great encouragement to our site.

Source Code: [https://github.com/letswritetw/letswrite-dom-to-image](https://github.com/letswritetw/letswrite-dom-to-image)

Demo: [https://letswritetw.github.io/letswrite-dom-to-image/](https://letswritetw.github.io/letswrite-dom-to-image/)

---

## Article Generated by Notion AI

Actually, when August started writing this article, he was amazed by the generative AI.

Just a few days ago, August had applied for the AI feature on Notion, so when he opened Notion today, after typing the title of this article, an option "Ask AI to write" popped up. Out of curiosity, he clicked it... and the AI wrote this several hundred-word article on DOM to Image introduction and application, although in English.

Well, since AI can do the writing, why not let it do all the writing ~~~

After using ChatGPT, August wondered if he should still insist on writing learning notes?

Because in the future, people will increasingly ask AI first, and then Google if they can't get the answer.

So, even if he insists on writing, it is only for AI to learn, right? There will be fewer and fewer real human beings visiting the website.

Is it still necessary to manage it? Apart from the reason of "it can be used as a portfolio for future job interviews," August can't think of any other reasons to continue writing.

Anyway, below is the article written by Notion AI, which has been modified by August to translate it from English to Chinese and adjust the wording.

You can compare the above few paragraphs of August's real text with the following paragraphs generated by AI. In the future, to save time and energy, August will gradually use the text provided by AI to write articles.

---

DOM to Image is a very useful tool for creating screen captures of web pages. It allows users to quickly and easily capture a snapshot of a web page by clicking a button and then save and share the results with friends or colleagues.

This note provides a simple tutorial on how to use DOM to Image to create a basic web page screenshot feature.

The first step is to reference the DOM to Image JS in the HTML page. This can be easily accomplished by referencing the CDN in the HTML:

```html {linenos=table,anchorlinenos=true}
<script src="https://unpkg.com/dom-to-image@2.6.0/dist/dom-to-image.min.js"></script>
```

After referencing a CDN, we still need to create a function that allows us to capture a screenshot.

This function takes an HTML element as a parameter and returns a Promise that resolves to an image.

Here's an example of how to use `domtoimage.toPng()` to accomplish this:

```javascript {linenos=table,anchorlinenos=true}
function captureScreenshot(element) {
  return new Promise((resolve, reject) => {
    domtoimage
      .toPng(element)
      .then((dataUrl) => {
        resolve(dataUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
```

After creating a function, executing the function allows easy retrieval of a screen capture from HTML:

```javascript {linenos=table,anchorlinenos=true}
captureScreenshot(document.getElementById("element-id"));
```

Here's how! With just a few lines of code, you can now use the powerful DOM to Image to create a simple web page screenshot feature.

When we need to quickly grab a screen capture of a webpage, this tool can save time and hassle, making it an invaluable tool for anyone who uses the web.
