---
title: 'Progressive Image Loading like Medium'
date: '2019-10-07T13:53:50+00:00'
summary: 'Outline of this article: Three ways to progressive images loading, Three steps of Medium Progressive Images Loading, Code Part, Test page loading time'
cover: medium-lazyload.jpg
categories:
    - front-end
tags:
    - image
    - medium
    - progressive
---

本篇中文版：[像Medium的漸近式圖片加載](https://letswrite.tw/medium-lazyload/)

<div class="ez-toc-v2_0_27 counter-hierarchy counter-numeric" id="ez-toc-container"><div class="ez-toc-title-container">Outline of this article

<span class="ez-toc-title-toggle">[<label aria-label="Table of Content" for="item"></label><input id="item" type="checkbox"></input>](#)</span></div><nav>- [Three ways to progressive images loading](https://en.letswrite.tw/medium-lazyload/#three-ways-to-progressive-images-loading "Three ways to progressive images loading")
- [Three steps of Medium Progressive Images Loading](https://en.letswrite.tw/medium-lazyload/#three-steps-of-medium-progressive-images-loading "Three steps of Medium Progressive Images Loading")
- [Code Part](https://en.letswrite.tw/medium-lazyload/#code-part "Code Part")
    - [HTML / CSS](https://en.letswrite.tw/medium-lazyload/#html-css "HTML / CSS")
    - [JavaScript](https://en.letswrite.tw/medium-lazyload/#javascript "JavaScript")
- [Test page loading time](https://en.letswrite.tw/medium-lazyload/#test-page-loading-time "Test page loading time")

</nav></div>## <span class="ez-toc-section" id="three-ways-to-progressive-images-loading"></span>Three ways to progressive images loading<span class="ez-toc-section-end"></span>

The first time I knew the Medium was three years ago. I was amazed when I saw their progressive loading effect.

At the time, I just thought the technique was difficult because I was not familiar with JavaScript at the time.

Recently, I have often found information in Medium, which reminds me of the technology they have.

After three years, I probably know how Medium achieves progressive images effects, and I found an article that introduced progressive images loading:

[Page Load Optimization by Progressive Image Loading (like Medium)](https://blog.botreetechnologies.com/page-load-optimization-by-progressive-image-loading-like-medium-1d0f94744a4d)

There are 3 ways to progressive loading images:

1. Lazy Loading: Delay loading of images in long web pages. Images outside of viewport won’t be loaded before user scrolls to them.
2. Medium Progressive Image Loading: Display an empty placeholder and fill it with a small, low-quality image. When user scrolls to the placeholder, javascript replaces it with the desired high quality image
3. Facebook’s 200 bytes Technique

What’s even more amazing is that the article tested the two methods of lazy load and medium progressive image loading. The loading speed of medium is faster.

- - - - - -

## <span class="ez-toc-section" id="three-steps-of-medium-progressive-images-loading"></span>Three steps of Medium Progressive Images Loading<span class="ez-toc-section-end"></span>

Medium Progressive Images Loading looks complicated, but if we think a while, it’s simple, just three steps:

1. We save another image that width is less than 10px and has a quality down to 10%. Then use the image to replace the src of the img.
2. We create a function about listening to window scrolling. When user scroll to the image block, function will replaces it with the original image. In this post, I will use a plugin: **waypoints**.
3. After loading the original image, we set its opacity to 0 and then append it to the placeholder. Then use setTimout 50ms and change opacity to 1, which gives the image a fade in + fade out effect.

This is the three steps I thought of, and we’ll move on to the code part.

- - - - - -

## <span class="ez-toc-section" id="code-part"></span>Code Part<span class="ez-toc-section-end"></span>

### <span class="ez-toc-section" id="html-css"></span>HTML / CSS<span class="ez-toc-section-end"></span>

Low-quality image, I use photoshop to deal with it.

But how do we make the low-quality image can fill div? I use a CSS feature:

[Vertical padding is relative to element’s width not height.](https://medium.com/@peedutuisk/lesser-known-css-quirks-oddities-and-advanced-tips-css-is-awesome-8ee3d16295bb)

In short, when both units of padding-top and padding-bottom are %, then it refers to the width of the div instead of height.

For example, the [Bootstrap Responsive Embed](https://getbootstrap.com/docs/3.3/components/#responsive-embed) is use this feature to make iframe RWD.

The following is the html of image block div:

<script src="https://gist.github.com/auguston/4e839fabcaf7b39383498cf73dc8afb2.js"></script>Here is the SASS that I let the background-image fill the div:

<script src="https://gist.github.com/auguston/1fc830f2d3537ebe048eb4165f785b70.js"></script>Because the background-image is directly inline html, so I only deal with size and postion.

It is important to note that height should be set to 0.

16:9, 4:3, both them are computed by (9/16) \* 100, (3/4) \* 100. If your image out of those sizes, use js to get the width and height of the div and mathematically calculate: (height/width) \* 100.

### <span class="ez-toc-section" id="javascript"></span>JavaScript<span class="ez-toc-section-end"></span>

I use jQuery and ES6 to code JavaScript:

<script src="https://gist.github.com/auguston/084f07341d6bae554ba9b90c413f1bbc.js"></script>First, I deal width free size images which means it doesn’t belong to 16:9 || 4:3. But we need back-end IT to render the width and height of image to data-width and data-height.

Second, I use [waypoint](http://imakewebthings.com/waypoints/) to listen to each image scrolled to the window.

To prevent the image trigger function every time when user scrolling, it will be canceled by adding destroy() at the end.

Third, I create a image object, and then apped it to div.

The source code I published on Github:

[auguston/medium-lazy-load](https://github.com/auguston/letswrite-medium-lazyload)

Demo page is here:

[Progressive image loading like Medium demo](https://auguston.github.io/letswrite-medium-lazyload/)

- - - - - -

## <span class="ez-toc-section" id="test-page-loading-time"></span>Test page loading time<span class="ez-toc-section-end"></span>

I tested the page load time with **[pindom](https://www.pingdom.com/)**  and found it to be really fast.

This result is not use any lazy load speed, 4.57s:

<div class="wp-block-image"><figure class="aligncenter">![not use any lazy load speed](https://i0.wp.com/miro.medium.com/max/978/1*LAemH0TlNiv1VkBqPivQeg.png?ssl=1)<figcaption>not use any lazy load speed</figcaption></figure></div>This result is using progressive image loading, down to 2.02s:

<div class="wp-block-image"><figure class="aligncenter">![using progressive image loading](https://i0.wp.com/miro.medium.com/max/987/1*5pP5v3uHblxKA9aqhzZarQ.png?ssl=1)<figcaption>using progressive image loading</figcaption></figure></div>Finally, we know that progressive image loading helps speed up page loading and further improve SEO.

- - - - - -

If you find this article helpful, please click on the helpful button made by myself. If you are willing to share on the social, that’s even better.