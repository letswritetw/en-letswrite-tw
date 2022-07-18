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

## Resources used in this article

The previous article, [Fully customizable Google Forms](https://letswrite.tw/custom-google-form-en/), is about how to use Google Forms as a web form and how to send data to Google Sheets.

In this article, I will write how to use Google Sheets as a database, and I will create a simple member list page to demonstrate.

These tools are used in this article:

- database: [Google Sheets](https://www.google.com/sheets/about/)
- data sample: [uinames.com](https://uinames.com/)
- css framework: [Skeleton](http://getskeleton.com/)
- source code: [Github](https://github.com/letswritetw/letswrite-google-excel-db-en)

- - - - - -

## Create a Google Sheet

On the google drive, press **New**, select **Google Sheets** and you will be taken to a new google sheet.

The data here comes from unnames.com, I chose four fields:

- name
- thumbnail
- email
- birthday

The following are fake members information compiled:

{{< figure src="https://i0.wp.com/imgur.com/wmLG3nH.png?ssl=1" title="sample memeber data" alt="sample memeber data" >}}

---

## Publish Google Sheet to the web

This is the easiest and most important step, only the published google sheet will let us AJAX.

First, click on **File** in the top left corner, and you’ll see the **Publish to the web** option:

{{< figure src="https://i0.wp.com/imgur.com/IclGEWf.png?ssl=1" title="File -> Publish to the web" alt="File -> Publish to the web" >}}

After clicking **Publish to the web**, a modal will appear asking for the scope of the release.

{{< figure src="https://i0.wp.com/imgur.com/R6TxtWw.png?ssl=1" title="select the scope of the release" alt="select the scope of the release" >}}

Because this sheet has only one sheet, so I select **Entire Document**.

Then click **Publish** and you will see the modal of successful publishing.

{{< figure src="https://i0.wp.com/imgur.com/ZJi00Ty.png?ssl=1" title="publish success" alt="publish success" >}}

---

## Create a member list page

The next step is create a page to display the data we catch from the google sheet.

Finally I create a page like this:

{{< figure src="https://i0.wp.com/i.imgur.com/kv8BuAQ.png?ssl=1" title="demo1 not render data yet" alt="demo1 not render data yet" >}}

We have page and the data, all we have to do is AJAX google sheet and render the data on the page.

---

## AJAX Google Sheet data

In fact, when we publish the google sheet, it’s easy to AJAX the data. All we need is the request URL.

The structure of the request google sheet url is like this:

{{< highlight plaintext "linenos=table,anchorlinenos=true,hl_inline=true" >}}
https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json
{{< / highlight >}}

There are two elements that should be replaced here: **excel\_id**, **sheet**.

The **sheet** is … yeah, the sheet like excel sheet. We can only GET one at a time.

The **excel\_id** is depending on the url, the google sheet url looks like this:

{{< highlight plaintext "linenos=table,anchorlinenos=true,hl_inline=true" >}}
https://docs.google.com/spreadsheets/d/{excel_id}/edit#gid=0
{{< / highlight >}}

So, the URL for my demo google sheet like this is:

{{< highlight plaintext "linenos=table,anchorlinenos=true,hl_inline=true" >}}
https://docs.google.com/spreadsheets/d/1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ/edit#gid=0
{{< / highlight >}}

The **excel\_id** is: 1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ**

After we put the excel id, sheet into the URL, we can get this:

{{< highlight plaintext "linenos=table,anchorlinenos=true,hl_inline=true" >}}
https://spreadsheets.google.com/feeds/list/1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ/1/public/values?alt=json
{{< / highlight >}}

Finaly, we use the url to AJAX. I am using jQuery to handle GET method:

{{< highlight js "linenos=table,anchorlinenos=true,hl_inline=true" >}}
fetch('https://spreadsheets.google.com/feeds/list/1IrmKHvX6tQ8zgzPC3ggD3UPu1-hQrE29nfHRs40wUJQ/1/public/values?alt=json')
  .then(res => res.json)
  .then(res => console.log(res))
{{< / highlight >}}

The result of console.log:

{{< figure src="https://i0.wp.com/i.imgur.com/Xy23mhu.png?ssl=1" title="original data" alt="original data" >}}

The next step is to organize the data and use the for loop to render the data:

{{< gist letswritetw dba9ddda2f8471cd9de6593188f068f9 >}}

I use console.table to convert an array to a table:

{{< figure src="https://i0.wp.com/imgur.com/aaTvKXa.png?ssl=1" title="result of data" alt="result of data" >}}

Finally, the data is rendered by using for loop into the page. The result is as follows:

{{< figure src="https://i0.wp.com/imgur.com/cswA8TP.png?ssl=1" title="final page" alt="final page" >}}

I don’t know why, it looks like a dating web sites. XD~

Here is the source code used in this article. Welcome to use:

<https://github.com/letswritetw/letswrite-google-excel-db-en>

- - - - - -

If you find this article helpful, please click on the helpful button made by myself. If you are willing to share on the social, that’s even better.