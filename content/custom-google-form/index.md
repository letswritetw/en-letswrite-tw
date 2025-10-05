---
title: "Fully customizable Google Forms"
date: "2019-08-21T08:18:00+08:00"
summary: "Before writing an article on how to use google excel as a database, this first writes how to use google forms as a form on the web page."
cover: custom-google-form.jpg
images:
  - custom-google-form.jpg
categories:
  - google
tags:
  - click
  - data
  - form
  - input
draft: false
---

本篇中文版：[完全客製 Google 表單，美化表單樣式](https://letswrite.tw/custom-google-form/)

## Google Forms is very convenient, but it can be used better

We usually use the google form: enter the google drive, add a google form, and then use its WYSIWYG UI to create a form and use.

Of course, this is the quickest way, but it is less design.

Even if google forms uses the material design in the UI, you can upload the key vision of the by yourself, which is not comparable to the designer’s design.

I often have problems with data storage recently. Free database in addition to firebase, if you just want to save simple fields, google excel is a good choice.

Before writing an article on how to use google excel as a database, this first writes how to use google forms as a form on the web page.

This article will use the “Contact Us” form as an example.

Tools used in this article:

- form contents：[Google Forms](https://www.google.com/forms/about/)
- form style：[Skeleton](http://getskeleton.com/)

---

## Design the required fields and create them with Google Forms

In web page, we often use these material in form:

- input
- radio
- select
- textarea

So, the demo form use those fields:

- name (input)
- gender (radio)
- category (select)
- question (textarea)

Google forms basically don’t need teaching, but pay attention to:

**Regardless of whether the field is input or radio, select, or textarea, you should select the format of “short answer” when creating the form.**

Because in the end, values are passed to google excel, so the value of each field is actually obtain by the form of the web page, instead of being obtained through google forms.

What we get from google forms is the url of the action and the name of each input.

This is the demo form：

{{< iframe src="https://docs.google.com/forms/d/e/1FAIpQLScxpBiexGfPha5_vq1fos2r_9dl1QfkCJBvHWHRIbgwudOHaQ/viewform?embedded=true" width="640" height="800" >}}

After the form is finished, remember to go to the **responses** and click **create spreadsheet** to create a google excel to see if the data is actually coming in.

---

## Take the necessary information from google forms

The form on the web page, if you want to be able to pass data to the back-end, you need 2 things:

- POST url
- field name

Google forms will have these two things after the form is created. You can find them on the form with the DevTools.

### find POST url

You right-click an element on the form page and select **Inspect** to jump into the **Elements** panel. If you use Windows system, you can press **F12** directly.

{{< figure src="https://i0.wp.com/i.imgur.com/8ypIQ8o.png?ssl=1" title="elements panel" alt="elements panel" >}}

On the left is the page of the original form, and on the right is the code.

Randomly click on the code, you will see the number of selected lines become blue background:

{{< figure src="https://i0.wp.com/i.imgur.com/j6WzGXN.png?ssl=1" title="blue background block is the code of your select" alt="blue background block is the code of your select" >}}

Then, if you are using a Windows system, press **ctrl + F**, if it is Mac, **cmd + F**, and you will see the search input:

{{< figure src="https://i0.wp.com/i.imgur.com/yF0jBxI.jpg?ssl=1" title="open search input" alt="open search input" >}}

Type **&lt;form** in the search input and in the search results you will see some code with a yellow background.

{{< figure src="https://i0.wp.com/i.imgur.com/MoavM2u.jpg?ssl=1" title="art of search “&lt;form”" alt="art of search “&lt;form”" >}}

From the code starting with **&lt;form** , you can see the **action** tag, which has a url value. It is the POST URL and we need to copy it.

The POST url like this:

```text {linenos=table,anchorlinenos=true}
https://docs.google.com/forms/d/e/1FAIpQLScxpBiexGfPha5_vq1fos2r_9dl1QfkCJBvHWHRIbgwudOHaQ/formResponse
```

### find fields name

First, click the button labeled "1" in the image below, then move the mouse to the name of the form until the position at the beginning of “input” is displayed, left-click.

{{< figure src="https://i0.wp.com/i.imgur.com/ebA1eko.jpg?ssl=1" title="find input code" alt="find input code" >}}

After left-click, you will see the part of the code on the element panel, and there is a code width light blue background:

{{< figure src="https://i0.wp.com/i.imgur.com/6xBCLcK.jpg?ssl=1" title="The selected input is highlighted" alt="The selected input is highlighted" >}}

The input code is：

```html {linenos=table,anchorlinenos=true}
<input
  type="text"
  class="quantumWizTextinputPaperinputInput exportInput"
  jsname="YPqjbf"
  autocomplete="off"
  tabindex="0"
  aria-label="name"
  aria-describedby="i.desc.2087285872 i.err.2087285872"
  name="entry.2065974955"
  value=""
  dir="auto"
  data-initial-dir="auto"
  data-initial-value=""
  aria-invalid="false"
/>
```

The **name** is our need tag:

```html {linenos=table,anchorlinenos=true}
name="entry.2065974955"
```

The other three items are handled in the same way, all we need **name** are as follow：

- name：entry.2065974955
- gender：entry.1310259066
- category：entry.896842914
- question：entry.1857722787

Now we have POST url, fields name, and we can totally custom our form.

---

## Build a web page form

This post use Skeleton to build a simple form, and the demo is as follow:

{{< figure src="https://i0.wp.com/i.imgur.com/3UCsaft.png?ssl=1" title="custom form demo" alt="custom form demo" >}}

Although in the stage of making google forms, each question is a short answer type, but in the custom form, you can distinguish between input, radio, select, and textarea. As long as you can catch the value and post it, you can be sure that the data is received.

---

## Custom form + Google Forms value

We have POST url、google form fields name、custom form, the next step is set google form fields name to our custom form’s name.

The google form fields name are correspond to the fields in google excel. There are two ways to set name fields:

The first way: we use the normal form method, we set the action URL and each input name, when we click the submit button, the browser will handle the submit function.

This is an example of the first way, remember to replace the url and each input name:

{{< gist letswritetw 70c2531bfe0f8fb8ffddff8026909787 >}}

The second way is use AJAX, we POST google forms url dirctly, and the data’s key is input name.

This article is mainly about writing the second way.

---

## POST to Google Forms

These information are get from google form:

- url：https://docs.google.com/forms/d/e/1FAIpQLScxpBiexGfPha5\_vq1fos2r\_9dl1QfkCJBvHWHRIbgwudOHaQ/formResponse
- Name name：entry.2065974955
- Gender name：entry.1310259066
- Category name：entry.896842914
- Question name：entry.1857722787

We can use them to code html and js.

### HTML

{{< gist letswritetw 4485ed7f7f6c112008fc8c0be1d2bfc0 >}}

### JS

The part of js, we get each input value and AJAX to google form.

Usually for the form, it will verify whether the columns are empty or verify that the format is correct. But this article is mainly about how to customize the form, so I gave up the verification part. If input value is empty, I will send “no set”.

{{< gist letswritetw 59983a6a406f97f1de52143fa14d6db6 >}}

The data’s key is the name which we get from google form’s name.

The POST url is the action value which we get from google form’s action.

Finally, we can test whether the data is successfully entered into the google excel.

We fill the form and click confirm button:

{{< figure src="https://i0.wp.com/i.imgur.com/FWAK3ac.png?ssl=1" title="fill the form" alt="fill the form" >}}

Then we open response google excel and we can see that the data came in successfully !

{{< figure src="https://i0.wp.com/i.imgur.com/H1SooVm.png?ssl=1" title="google excel save data successfully" alt="google excel save data successfully" >}}

The source code used in this article is here, welcome to download and use:

<https://github.com/letswritetw/letswrite-customize-google-form-en>

And the test web page is here: [Customize google form demo](https://letswritetw.github.io/letswrite-customize-google-form-en/)

Here you can see if the data has been sent：[response google excel](https://docs.google.com/spreadsheets/d/1HYd0OwuDYZKsRptbsgQrkJ3SMKJyV26SYZn49cuEa-Q/edit?usp=sharing)

---

If you find this article helpful, please click on the LIKE button made by myself. If you are willing to share on the social, that’s even better.
