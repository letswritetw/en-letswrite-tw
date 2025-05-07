---
title: "If I already have node.js files, how do I deploy them to Google Cloud Platform(GCP)"
date: "2019-10-23T14:11:00+08:00"
summary: "Outline of this article：What problem is this article to solve?Introducing GCP and the UI. 5 steps to using GCP App Engine. 3 considerations."
cover: gcp-node.jpg
images:
  - gcp-node.jpg
categories:
  - google
tags:
  - GCP
  - javascript
  - node
draft: false
---

本篇中文版：[用 Google Cloud Platform (GCP) 建 Node.js 網站](https://letswrite.tw/gcp-node/)

## What problem is this article to solve?

If we use Google to search for the title of this note, we will find many articles that have already been written about how to build a website through Google Cluod Platform(GCP).

Most articles are talking about how to deploy files by creating new projects, or directly using the **hello word** files provided by GCP tutorial.

But my problem is: If I already have a node.js app or files, how do I deploy them to GCP?

After 1.5 days of study hard, August wrote this note.

---

## Introducing GCP (Google Cloud Platform) and the UI

Google Cloud Platform(GCP) , August thinks this is a server operated by Google.

After We logging in to GCP, we will see long long navigation and more and more cards. I was shocked when I saw it for the first time, because I couldn’t see the words “If you want to use node.js, click here” or “If you want to use FTP, click here” Button.

{{< figure src="https://i0.wp.com/i.imgur.com/TcFOHAj.png?ssl=1" title="GCP UI let me very scary" alt="GCP UI let me very scary" >}}

I studied for a while, then I know something: because I use firebase as database, so I can handle db in firebse, so my task is how to deploy files(node, css, img) to GCP.

The problem has shrunk, so I know I have to understand are those four parts from GCP long long navigation:

{{< figure src="https://i0.wp.com/imgur.com/FUE2wW6.png?ssl=1" title="I was so coufused when I saw those buttons" alt="I was so coufused when I saw those buttons" >}}

Seriously, I just want to have a simple host to use it, Is it complicated to have four options??

After I google and google, I finally found an article that I can understand the meaning of the three options.

[What is the difference between Google App Engine and Google Compute Engine?](https://stackoverflow.com/questions/22697049/what-is-the-difference-between-google-app-engine-and-google-compute-engine?source=post_page---------------------------)

The article doesn’t talk about the Kubernetes engine, but it doesn’t matter, as most tutorials only teach App Engine and Compute Engine.

But which one should I use it? This is my opinion:

**App Engine**: If you just want your code to work, choose it. It just like package, you put the file into GCP, and then goolgle will handle all the necessary things.

**Compute Engine**: If you are familiar with the host and know how to build the VM, choose it. Google just gives you a host, you have to install each feature yourself, but the degree of freedom is high.

Since I’m not familiar with the host and have completed the node.js files, I chose App Engine.

---

## 5 steps to using GCP App Engine

The overall process for fully deploying files is as follows:

1. install Google Cloud SDK
2. into the folder which you want to deploy, open terminal and then type: gcloud init
3. in the folder, create a new file called app.yaml, and package.json add start
4. Open the Cloud Build API for the project
5. use terminal and then type: gcloud app deploy

---

### 1 Install Google Cloud SDK

App Engine is use command to work, so we should use terimal to type command.

GCP terminal has two version: cloud and localhost.

If I choose the cloud version, I have to learn the Google Cloud language, which bothers me, so I choose the localhost version.

We need to install Google Cloud SDK to use gcloud command.

It’s the document for how to install gcloud SDK: [Installing Google Cloud SDK](https://cloud.google.com/sdk/install)

I choose **Interactive installation**, because it’s simple.

Open the terminal and type:

<!-- prettier-ignore-start -->
{{< highlight bash "linenos=inline" >}}
$ curl https://sdk.cloud.google.com | bash
{{< /highlight >}}
<!-- prettier-ignore-end -->

and answer a few questions, the system will automatically install the SDK.

In this step, I made a stupid Error. After installing the SDK, if you type **gcloud -v**, you can see the SDK version message. However, when I type it, I can’t see the message. I almost thought: “What am I doing wrong? Am I stupid?”

Finally, I found that I should restart the terminal when I installed the SDK…

When I restart the terminal and type **gcloud -v**, I can get the message! I almost cry…

{{< figure src="https://i0.wp.com/imgur.com/T1aHEdS.png?ssl=1" title="the message of SDK version" alt="the message of SDK version" >}}

If you also see this message, it means that this step is successful and we can proceed to the next step.

---

### 2 Into the folder which you want to deploy, open terminal and then type: gcloud init

Basically, this title has already written what to do in this step.

If you not run gcloud init before, you will get an error when deploying files.

When the terminal runs gcloud init, it will ask you to login google account and select the project you have in GCP.

If there is only one project to deploy to GCP, then the localhost project doesn’t need to switch.

But when there are multiple folders to deploy, you need some commands to switch.

Here’s the code which are how to switch localhost project:

{{< gist letswritetw 633ab684fb8a03ba908eced30a732b1f >}}

### 3 In the folder, create a new file called app.yaml, and package.json add start

The **app.yaml** file is necessery when you want to deploy files to GCP.

The file has written to some sever settings, but I’m not understand the language, so I offer demo file from Google:

[app.yaml](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/appengine/hello-world/standard/app.yaml?source=post_page---------------------------)

The node.js has a **package.json**, in the line of **scripts**, we need add **start** object:

{{< figure src="https://i0.wp.com/imgur.com/mxLtQLJ.png?ssl=1" title="package.json demo" alt="package.json demo" >}}

**NAME.js** should be changed to the project main javascript filename.

---

### 4 Open the Cloud Build API for the project

### 5 Use terminal and then type: gcloud app deploy

In these two steps, we usually execute 4 first and then 5.

However, because the Cloud Build API is generally difficult to find out which URL it is in, it is actually after the execution of 5, the URL of the Cloud Build API will appear in the error message that pops up. After clicking it, you can click to open it.

After the Cloud Build API is opening, you can use the terminal to type once: **gcloud app deploy**, you can deploy GCP.

These five steps are how we deploy a node.js website to the GCP.

---

## 3 considerations

This is the error August encountered while deploying the file to the GCP.

### 1 package.json，script must fillnode XXXX.js

Since I always use nodemon to develop node.js, so I fill **nodemon XXXX.js** to the **script**. When I deploy my files to GCP, a 500 error is displayed. I fixed this error after checking the logs.

### 2 .gcloudignore is so~~~ important

When we complete the `gcloud app deploy`, it will automatically create **.gcloudignore** file.

This file as same as **.gitignore** of github, so if a file name is written to it, it will not be deployed.

Therefore, the **node_modules/** can not be delete definitely.

The size of the **node_modules** file is usually so large that GCP can install the npm plugin by reading package.json. So please note that: **node_modules /** cannot be removed.

### 3 Considerations during development

In the main javascript file, we should pay attention to the port, static file location and template path:

{{< gist letswritetw c2ab553a554d3c66c9ba94f96c923201 >}}

## Conclusion and Feedback

When August saw the node.js file successfully deployed to the GCP and displayed the web page, my tears almost dripped. Because I became better than the beginning.

---

If you find this article helpful, please click on the helpful button made by myself. If you are willing to share on the social, that’s even better.
