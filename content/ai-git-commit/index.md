---
title: "Automate Your Git Commit Messages with AI"
date: "2025-06-12T08:18:00+08:00"
summary: "Tired of writing Git commit messages? This guide shows how to use the OpenAI API with a simple Node.js script to generate clear, useful commit messages instantly—with minimal setup and very low cost."
cover: ai-git-commit.jpg
images:
  - ai-git-commit.jpg
categories:
  - ai
tags:
  - API
  - Node.js
  - OpenAI
draft: false
---

本篇中文版：[使用 AI 自動生成 Git Commit 訊息](https://www.letswrite.tw/ai-git-commit/)

---

## What This Post Is About

After finishing some code—like fixing a bug or adding a new feature—writing Git commit messages can feel like a chore. Most of the time, we just jot down something quick that only makes sense to us at that moment. But when we need to revisit a past update, it becomes a time-consuming scavenger hunt to figure out which commit changed what.

That kind of mental effort? Let’s hand it over to AI.

August used the OpenAI API with the budget-friendly `gpt-4o-mini` model to instantly generate commit messages. Since it uses the API, there's a small cost involved, but with `gpt-4o-mini` being so affordable, even heavy usage might cost less than \$1 a month.

If you’ve stumbled upon this post, chances are you’ve been coding for a while and are looking to save time on writing commit messages. This post keeps things simple—no deep dives into setup. Instead, we’ll just drop the essentials and link to more detailed guides if you need them.

---

## Listen in: Key takeaways from Google's NotebookLM.

{{< iframe src="https://www.youtube.com/embed/gcq9VC4aWF4" width="704" height="396" >}}

---

## What You Need: OpenAI API Key

To have AI write your commit messages, you’ll need an OpenAI API key.

Just a heads-up: using AI isn’t free, but choosing the right model makes it super cost-effective.

We’ve covered how to get the key in previous posts, so here’s a link to that section:

[CodiumAI PR-Agent: AI-Powered Code Reviews on GitLab](https://www.letswrite.tw/gitlab-ai-code-review/#openai-api-key)

---

## What You Need: Install Node.js

You probably already have Node.js installed—most frontend devs do. But if not, you can grab it from the official site:

[https://nodejs.org/en](https://nodejs.org/en)

After installing, run the following in your terminal to check if it worked:

<!-- prettier-ignore-start -->
{{< highlight bash "linenos=inline" >}}
node -v
npm -v
{{< /highlight >}}
<!-- prettier-ignore-end -->

---

## Install Required Packages

To call the OpenAI API, you’ll need two packages: `axios` and `dotenv`.

- `axios`: Handles HTTP requests and supports promises and interceptors.
- `dotenv`: Loads environment variables from a `.env` file, which keeps your secrets safe.

Install them using npm:

<!-- prettier-ignore-start -->
{{< highlight bash "linenos=inline" >}}
npm install -D axios dotenv
{{< /highlight >}}
<!-- prettier-ignore-end -->

---

## Create a `.env` File

The `.env` file is where you’ll store your OpenAI API key. Since the key grants access to your account, keeping it private is important.

Your `.env` should look like this:

<!-- prettier-ignore-start -->
{{< highlight text "linenos=inline" >}}
OPEN_API_KEY_COMMIT=your-openai-api-key
{{< /highlight >}}
<!-- prettier-ignore-end -->

Make sure you don’t commit this file to your repo unless it’s a private project or hosted on a private Git server.

---

## Add `commit.cjs` Script

This is the script that uses the OpenAI API to generate commit messages.

August tested a few prompts and landed on one that works well, but feel free to tweak it. If you come up with a better one, share it!

Here's the script link:

{{< gist letswritetw c6485bc3ada935b1170b53d283c9e218 >}}

The script skips over files with `.min.` in the name. If you want to skip additional files or folders, you can modify the filter, like so:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
.filter(file => file && !file.includes('.min.') && !file.startsWith('docs/') && file.trim() !== '');
{{< /highlight >}}
<!-- prettier-ignore-end -->

---

## How to Use It

Once your code changes are staged with `git add`, just open a terminal in your project folder and run:

<!-- prettier-ignore-start -->
{{< highlight bash "linenos=inline" >}}
node commit.cjs
{{< /highlight >}}
<!-- prettier-ignore-end -->

After a few seconds (depending on how many files changed), you’ll get a commit message back from OpenAI.

Here’s an example of what it looks like:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d8z5duw4g8dvzanawhaj.png" title="Example of an AI-generated Git commit message with a Summary and Description." alt="Example of an AI-generated Git commit message with a Summary and Description." >}}

It gives you two parts: a short summary and a more detailed, bullet-style description.

Since different Git tools display commit messages differently—some only show the summary while others like Fork allow both—you can pick whichever works best for you.

---

Translated by ChatGPT.
