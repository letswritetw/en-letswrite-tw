---
title: "How to Set Up a Local LLM with Ollama + Ngrok for Remote Access"
date: "2025-05-30T08:18:00+08:00"
summary: "This guide walks you through setting up a local LLM on a Mac mini using Ollama and enabling remote access with Ngrok. It’s a simple, secure way to use AI tools without sending your data to the cloud."
cover: ollama-ngrok.webp
images:
  - ollama-ngrok.webp
categories:
  - ai
tags:
  - API
  - Ngrok
  - Ollama
  - LLM
draft: false
---

本篇中文版：[使用 Ollama + Ngrok 搭建本地 LLM，遠端存取 AI 模型教學](https://www.letswrite.tw/ollama-ngrok/)

## What This Guide Solves

AI tools like ChatGPT are super handy, but there’s always that concern your work data might be used as training material. The recent buzz around DeepSeek and its bans in several countries highlights these security worries.

I recently got a new Mac mini and decided to set up a local LLM (Large Language Model) for work. Once installed, I needed remote access too. After several failed attempts with NAT port forwarding, I opted for a much simpler method—Ngrok.

---

## Listen in: Key takeaways from Google's NotebookLM.

{{< iframe src="https://www.youtube.com/embed/WuSR8VkZ7rY" width="704" height="396" >}}

---

## Installing and Using Ollama

Official site: [https://ollama.com/](https://ollama.com/)

Just click "Download" to install it.

Once installed, you can download models like Llama, Phi, Gemma, and Mistral—most open-source ones are available here:

[https://ollama.com/search](https://ollama.com/search)

For reference, I'm using a Mac mini with:

- 10-core CPU
- 10-core GPU
- 16GB unified memory

Running Phi-4 14B is smooth, but larger models like Mistral Small3 22B tend to lag.

Downloading a model is easy: find it on the site, copy the terminal command, and run it.

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8w72szkj46brzh3v2oed.png" title="Ollama model download interface" alt="Ollama model download interface" >}}

**Key Ollama commands:**

- `ollama serve` – Start the Ollama server
- `ollama run` – Run a model
- `ollama list` – List all models
- `ollama rm` – Remove a model
- `ollama create` – Create a model from a Modelfile
- `ollama show` – Show model info
- `ollama stop` – Stop a running model
- `ollama pull` – Pull a model from Ollama
- `ollama push` – Push a model to Ollama
- `ollama ps` – Show running models
- `ollama cp` – Copy a model
- `ollama help` – Show help info

You'll most often use the first four.

Once your model is ready, you’ll see a basic chat interface:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cx9lis3fsn3qynaeo84k.jpg" title="Chat interface" alt="Chat interface" >}}

Type `/bye` to exit.

Since I needed remote access for my work computer, I used the API mode. Luckily, Ollama enables API usage by default.

### Using the API

Docs: [https://github.com/ollama/ollama/blob/main/docs/api.md](https://github.com/ollama/ollama/blob/main/docs/api.md)

**POST Endpoint:**

`http://localhost:11434/api/generate`

**Common parameters:**

- `model` (required): model name
- `prompt`: input prompt
- `suffix`: text to append to response
- `images`: Base64-encoded image list (for multimodal models like Llava)
- `format`: response format (`json` or JSON schema)
- `options`: model parameters like temperature
- `system`: overrides system message in Modelfile
- `template`: overrides prompt template in Modelfile
- `stream`: set to false to return a single object instead of a stream
- `raw`: set to true to disable prompt formatting
- `keep_alive`: how long to keep model in memory (default: 5 min)

Here’s a basic test using Postman:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d655skif0r7qrqr7cozc.png" title="Postman test" alt="Postman test" >}}

If you get a response, it’s working!

---

## Installing and Using Ngrok

What’s Ngrok? Imagine you’ve got a “secret base” at home (your computer or server), but your coworkers—stuck in the office—can’t visit. Ngrok creates a magical tunnel that links your “secret base” to the web so they can connect from anywhere.

In plain terms: it turns your localhost into a public URL.

Official site: [https://ngrok.com/](https://ngrok.com/)

Sign up, and you’ll see several installation methods:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fmj4dadmt0i8oiy6vmyd.png" title="Ngrok installation options" alt="Ngrok installation options" >}}

This guide shows the MacOS method. After choosing MacOS, the site will show you the install commands:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mput4w4l61qlvkk9ini8.png" title="Ngrok install for MacOS" alt="Ngrok install for MacOS" >}}

- First command: install Ngrok
- Second command: set your auth token (needed to use Ngrok services)

Then run this command to tunnel Ollama's local API (port 11434):

<!-- prettier-ignore-start -->
{{< highlight shell "linenos=inline" >}}
ngrok http 11434 --host-header="localhost:11434"
{{< /highlight >}}
<!-- prettier-ignore-end -->

This command works perfectly in my testing.

Your terminal should show something like this:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vbtichghaarpbyd7b11b.png" title="Ngrok running" alt="Ngrok running" >}}

The key line is the one labeled **Forwarding**:

<!-- prettier-ignore-start -->
{{< highlight shell "linenos=inline" >}}
https://fb55-118-233-2-60.ngrok-free.app -> http://localhost:11434
{{< /highlight >}}
<!-- prettier-ignore-end -->

This means your local `localhost:11434` is now publicly accessible via `https://fb55-118-233-2-60.ngrok-free.app`.

Now just update your Postman test with this new URL:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h2p33d7wc020cuz6sin8.png" title="Postman with Ngrok URL" alt="Postman with Ngrok URL" >}}

Success! You can now access your LLM API from your office.

One heads-up: Ngrok's free plan gives you a different public URL each time. For a consistent URL, you’ll need a paid plan.

Personally, I'm fine with the free version—works great for me!

---

Translated by ChatGPT.
