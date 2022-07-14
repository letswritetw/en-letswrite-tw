---
title: 'How to use Google Sheets as a database'
date: '2019-08-22T20:26:54+00:00'
summary: 'In this article, I will write how to use Google Sheets as a database, and I will create a simple member list page to demonstrate.'
cover: google-excel-db.jpg
categories:
  - google
tags:
  - data
  - excel
  - sheet
---

本篇中文版：[如何用Google Excel當作資料庫](https://letswrite.tw/google-excel-db/)

<div class="ez-toc-v2_0_27 counter-hierarchy counter-numeric" id="ez-toc-container"><div class="ez-toc-title-container">Outline of this article

<span class="ez-toc-title-toggle">[<label aria-label="Table of Content" for="item"></label><input id="item" type="checkbox"></input>](#)</span></div><nav>- [Resources used in this article](https://en.letswrite.tw/google-excel-db/#resources-used-in-this-article "Resources used in this article")
- [Create a Google Sheet](https://en.letswrite.tw/google-excel-db/#create-a-google-sheet "Create a Google Sheet")
- [Publish Google Sheet to the web](https://en.letswrite.tw/google-excel-db/#publish-google-sheet-to-the-web "Publish Google Sheet to the web")
- [Create a member list page](https://en.letswrite.tw/google-excel-db/#create-a-member-list-page "Create a member list page")
- [AJAX Google Sheet data](https://en.letswrite.tw/google-excel-db/#ajax-google-sheet-data "AJAX Google Sheet data")

</nav></div>## <span class="ez-toc-section" id="resources-used-in-this-article"></span>Resources used in this article<span class="ez-toc-section-end"></span>

The previous article, [Fully customizable Google Forms](https://letswrite.tw/custom-google-form-en/), is about how to use Google Forms as a web form and how to send data to Google Sheets.

In this article, I will write how to use Google Sheets as a database, and I will create a simple member list page to demonstrate.

These tools are used in this article:

- database: [Google Sheets](https://www.google.com/sheets/about/)
- data sample: [uinames.com](https://uinames.com/)
- css framework: [Skeleton](http://getskeleton.com/)
- source code: [Github](https://github.com/auguston/letswrite-google-excel-db-en)

- - - - - -

## <span class="ez-toc-section" id="create-a-google-sheet"></span>Create a Google Sheet<span class="ez-toc-section-end"></span>

On the google drive, press **New**, select **Google Sheets** and you will be taken to a new google sheet.

The data here comes from unnames.com, I chose four fields:

- name
- thumbnail
- email
- birthday

The following are fake members information compiled:

<div class="wp-block-image"><figure class="aligncenter">![sample memeber data](https://i0.wp.com/imgur.com/wmLG3nH.png?ssl=1)<figcaption>sample memeber data</figcaption></figure></div>- - - - - -

## <span class="ez-toc-section" id="publish-google-sheet-to-the-web"></span>Publish Google Sheet to the web<span class="ez-toc-section-end"></span>

This is the easiest and most important step, only the published google sheet will let us AJAX.

First, click on **File** in the top left corner, and you’ll see the **Publish to the web** option:

<div class="wp-block-image"><figure class="aligncenter">![File -> Publish to the web](https://i0.wp.com/imgur.com/IclGEWf.png?ssl=1)<figcaption>File -&gt; Publish to the web</figcaption></figure></div>After clicking **Publish to the web**, a modal will appear asking for the scope of the release.

<div class="wp-block-image"><figure class="aligncenter">![select the scope of the release](https://i0.wp.com/imgur.com/R6TxtWw.png?ssl=1)<figcaption>select the scope of the release</figcaption></figure></div>Because this sheet has only one sheet, so I select **Entire Document**.

Then click **Publish** and you will see the modal of successful publishing.

<div class="wp-block-image"><figure class="aligncenter">![publish success](https://i0.wp.com/imgur.com/ZJi00Ty.png?ssl=1)<figcaption>publish success</figcaption></figure></div>- - - - - -

## <span class="ez-toc-section" id="create-a-member-list-page"></span>Create a member list page<span class="ez-toc-section-end"></span>

The next step is create a page to display the data we catch from the google sheet.

Finally I create a page like this:

<div class="wp-block-image"><figure class="aligncenter">![demo1 not render data yet](https://i0.wp.com/i.imgur.com/kv8BuAQ.png?ssl=1)<figcaption>demo1 not render data yet</figcaption></figure></div>We have page and the data, all we have to do is AJAX google sheet and render the data on the page.

- - - - - -

## <span class="ez-toc-section" id="ajax-google-sheet-data"></span>AJAX Google Sheet data<span class="ez-toc-section-end"></span>

In fact, when we publish the google sheet, it’s easy to AJAX the data. All we need is the request URL.

The structure of the request google sheet url is like this:

```
<pre class="wp-block-code">```
https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json
```
```

There are two elements that should be replaced here: **excel\_id**, **sheet**.

The **sheet** is … yeah, the sheet like excel sheet. We can only GET one at a time.

The **excel\_id** is depending on the url, the google sheet url looks like this:

```
<pre class="wp-block-code">```
https://docs.google.com/spreadsheets/d/{excel_id}/edit#gid=0
```
```

So, the URL for my demo google sheet like this is:

```
<pre class="wp-block-code">```
https://docs.google.com/spreadsheets/d/1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ/edit#gid=0
```
```

The **excel\_id** is**: 1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ**

After we put the excel id, sheet into the URL, we can get this:

```
<pre class="wp-block-code">```
https://spreadsheets.google.com/feeds/list/1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ/1/public/values?alt=json
```
```

Finaly, we use the url to AJAX. I am using jQuery to handle GET method:

```
<pre class="wp-block-code">```
$.get('https://spreadsheets.google.com/feeds/list/1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ/1/public/values?alt=json', function(data) {
  console.log(data);
});
```
```

The result of console.log:

<div class="wp-block-image"><figure class="aligncenter">![original data](https://i0.wp.com/i.imgur.com/Xy23mhu.png?ssl=1)<figcaption>original data</figcaption></figure></div>The next step is to organize the data and use the for loop to render the data:

<script src="https://gist.github.com/auguston/dba9ddda2f8471cd9de6593188f068f9.js"></script>I use console.table to convert an array to a table:

<div class="wp-block-image"><figure class="aligncenter">![result of data](https://i0.wp.com/imgur.com/aaTvKXa.png?ssl=1)<figcaption>result of data</figcaption></figure></div>Finally, the data is rendered by using for loop into the page. The result is as follows:

<div class="wp-block-image"><figure class="aligncenter">![findal page](https://i0.wp.com/imgur.com/cswA8TP.png?ssl=1)<figcaption>findal page</figcaption></figure></div>I don’t know why, it looks like a dating web sites. XD~

Here is the source code used in this article. Welcome to use:

<https://github.com/auguston/letswrite-google-excel-db-en>

- - - - - -

If you find this article helpful, please click on the helpful button made by myself. If you are willing to share on the social, that’s even better.