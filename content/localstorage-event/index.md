---
title: "Detecting localStorage Changes on the Same Page"
date: "2025-05-20T08:18:00+08:00"
summary: "Learn how to track changes to localStorage within the same tab using CustomEvent and method overrides."
cover: localstorage-event.webp
images:
  - localstorage-event.webp
categories:
  - front-end
tags:
  - Storage
  - event
draft: false
---

本篇中文版：[監聽 localStorage 事件：如何在同一頁面內偵測變更](https://www.letswrite.tw/localstorage-event/)

## Problem We’re Trying to Solve

Sometimes, we store information in the browser using mechanisms like [Cookies](https://www.letswrite.tw/client-storage-cookie/), [Local Storage](https://www.letswrite.tw/client-storage-local/), or [IndexedDB](https://www.letswrite.tw/client-storage-idb/).

By default, the native `storage` event for Local Storage is designed to work across tabs or windows:

```javascript {linenos=table,anchorlinenos=true}
window.addEventListener("storage", () => {});
```

But what if we want to detect changes **within the same page**? In that case, we need to manually override the `localStorage` methods.

---

## Listen in: Key takeaways from Google's NotebookLM.

{{< iframe src="https://www.youtube.com/embed/O_jQRARVr60" width="704" height="396" >}}

---

## Listening for localStorage Events

We can override methods like `setItem` on `Storage.prototype`, and use [CustomEvent](https://www.letswrite.tw/custom-event/) to trigger our own change events.

```javascript {linenos=table,anchorlinenos=true}
// Save original methods
Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype._removeItem = Storage.prototype.removeItem;
Storage.prototype._clear = Storage.prototype.clear;

// Override setItem
Storage.prototype.setItem = function (key, value) {
  const oldValue = this._getItem(key);
  this._setItem(key, value);

  const evt = new CustomEvent("storagechange", {
    detail: {
      type: "set",
      key: key,
      newValue: value,
      oldValue: oldValue,
    },
  });
  window.dispatchEvent(evt);
};

// Override getItem
Storage.prototype.getItem = function (key) {
  const value = this._getItem(key);

  const evt = new CustomEvent("storagechange", {
    detail: {
      type: "get",
      key: key,
      value: value,
    },
  });
  window.dispatchEvent(evt);

  return value;
};

// Override removeItem
Storage.prototype.removeItem = function (key) {
  const oldValue = this._getItem(key);
  this._removeItem(key);

  const evt = new CustomEvent("storagechange", {
    detail: {
      type: "remove",
      key: key,
      oldValue: oldValue,
    },
  });
  window.dispatchEvent(evt);
};

// Override clear
Storage.prototype.clear = function () {
  this._clear();

  const evt = new CustomEvent("storagechange", {
    detail: {
      type: "clear",
    },
  });
  window.dispatchEvent(evt);
};

// Listen for events
window.addEventListener("storagechange", (e) => {
  console.log("LocalStorage changed:", e.detail);
});
```

---

Translated by ChatGPT.
