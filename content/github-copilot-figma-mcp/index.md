---
title: "How to Speed Up Front-End Layouts with GitHub Copilot + Figma MCP"
date: "2025-05-02T08:18:00+08:00"
summary: "This hands-on guide explores how to use GitHub Copilot's Agent Mode with Figma's MCP integration to quickly generate HTML and CSS from Figma designs using AI. While not perfect, the results are surprisingly usable for simple layouts and could save front-end developers a lot of time."
cover: github-copilot-figma-mcp.jpg
images:
  - github-copilot-figma-mcp.jpg
categories:
  - ai
tags:
  - Copilot
  - CSS
  - GitHub
  - HTML
  - MCP
draft: false
---

本篇中文版：[GitHub Copilot + Figma MCP Server 實戰：用 AI 快速切版教學](https://www.letswrite.tw/github-copilot-figma-mcp/)

## The Problem We're Solving

Lately, I've been exploring MCP and came across a thread where someone tested using Figma MCP for layout generation. I figured, why not try it myself?

After some experimentation, I confirmed that yes—it works, at least for simple design mockups. There were a few formatting glitches, but overall the output was usable.

Even at this early stage, it's impressive. With more development, this tool could seriously reduce the time front-end developers spend on layout work—freeing them up for more impactful tasks.

Of course, that assumes clients know exactly what they want. Otherwise, tweaking layouts with AI might be more time-consuming than just coding them manually. 😅

---

## Listen in: Key takeaways from Google's NotebookLM.

{{< iframe src="https://www.youtube.com/embed/KNBc3scRWKQ" width="704" height="396" >}}

---

## What You’ll Need

To try this out using Figma MCP, here’s what you’ll need:

- [Filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)

And for the demo, I used a shared community design from Figma:

- [Responsive Landing Page Design](https://www.figma.com/community/file/1222060007934600841)

Note: You’ll need a paid GitHub Copilot plan to use Agent Mode. It’s gradually rolling out to VS Code, but if you don’t have it yet, follow the docs here: [Use agent mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)

---

## Getting a Figma Access Token

You can get your access token from Figma’s web app, but since you'll need a link from the Desktop version for it to work, I suggest downloading Figma Desktop here: [Figma downloads](https://www.figma.com/downloads/).

Once installed and logged in:

1. Click your profile picture
2. Go to **Settings > Security**
3. Under **Personal Access Tokens**, click **Generate new token**

Save the token—you’ll need it soon.

---

## Setting Up Figma MCP in VS Code

### Install Filesystem

To let the Agent read and write local files, install the MCP Filesystem module.

1. Open VS Code
2. Press `Shift + Cmd + P`
3. Type `mcp`, select **“MCP: Add Server” > “NPM Package”**
4. Enter `@modelcontextprotocol/server-filesystem` and press Enter
5. Approve the permission prompt

Then, choose a folder to give MCP access to (don’t pick your entire root directory—for security, use a dedicated folder instead).

### Install Figma MCP

1. Press `Cmd + P` in VS Code to open the search
2. Find `settings.json` (this is your global settings file)

Assuming Filesystem is already installed, you’ll see an `mcp` section. Add this block at the same level:

<!-- prettier-ignore-start -->
{{< highlight json "linenos=inline" >}}
"Framelink Figma MCP": {
  "command": "npx",
  "args": [
    "-y",
    "figma-developer-mcp",
    "--figma-api-key=Figma_access_token",
    "--stdio"
  ]
}
{{< /highlight >}}
<!-- prettier-ignore-end -->

Replace `Figma_access_token` with the token you generated earlier.

---

## Copy the Figma Design Link

Important: You must copy the design link from the Figma Desktop app, or the MCP will fail authorization.

Right-click the section you want the Agent to work on:

**Right-click > Copy/Paste as > Copy link to selection**

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gn7betf2dhmoxlxqrksr.png" title="Copy link in Figma" alt="Copy link in Figma" >}}

---

## Using GitHub Copilot Agent Mode in VS Code

Switch GitHub Copilot to Agent Mode:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tuc2pu656un66bquxftw.png" title="Agent mode in VS Code" alt="Agent mode in VS Code" >}}

Then enter the following prompt:

> Please generate HTML and CSS based on the design below. Convert all images to PNG and save them in the img folder:
> `{Figma Design Link}`

Replace `{Figma Design Link}` with the link you copied earlier.

Once you hit enter, Copilot Agent will prompt for some permissions. Approve them all, and it’ll generate your HTML, CSS, and image files.

We ask it to convert everything to PNG because, based on August’s tests, SVG files often fail to load or render incorrectly. PNGs are more reliable in this workflow.

Here’s a video of the Agent in action:

{{< iframe src="https://www.youtube.com/embed/c0jDjPptmek" width="704" height="396" >}}

And here’s the final output:
<https://letswritetw.github.io/Figma-Context-MCP/>

Source code:
<https://github.com/letswritetw/Figma-Context-MCP/tree/main/docs>

Besides some weird image behavior, everything else worked decently. A front-end dev could clean it up and use it as a base for production.

---

## Final Thoughts

Right now, Figma MCP still has quirks. But think about it—how long has it been since ChatGPT went viral? In such a short time, MCP has already reached this level. Give it a little more time, and it’ll be a real time-saver.

Will AI replace front-end developers? Not anytime soon. Development is about more than slicing designs—it's about solving real problems.

You still need experience to meet client needs, communicate with designers, negotiate API specs with back-end devs, and work with PMs (sometimes argue with them 😅). AI can't replace that level of insight—yet.

But if AI can give us a quick mockup to show a client or use for internal discussions, that’s already a huge win.

My mindset: Don’t treat AI as competition—see it as your ever-reliable assistant that never gets tired.

Which is why the name “Copilot” is just perfect.

---

Translated by ChatGPT.
