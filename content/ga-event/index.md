---
title: "Google Analytics Event tracking setting up"
date: "2019-08-15T08:18:00+08:00"
summary: "Outline of this article：What is Google Analytic Event Tracking、3+1 elements of the GA event、GA Event can affect bounce rate、Write GA Event tracking code"
cover: ga-event.jpg
images:
  - ga-event.jpg
categories:
  - google
tags:
  - event
  - "Google Analytics"
  - report
draft: false
---

本篇中文版：[Google Analytics 事件追蹤設定](https://letswrite.tw/ga-event/)

## What is Google Analytic Event Tracking

Google Analytics Event tracking is the GA Event we often hear. Simply put,  
GA records what the user did on the page? There are records of the click count of a button, the depth of page scrolling, how many people watch the video, etc. Usually, the event page, e-commerce website are most often require GA Event.

### What are the benefits of learning GA Event?

Learning GA Event is the basic skills of advanced use of GA. When you learning the GA Event, the other two functions will follow, because these two functions are also organized and presented from the GA Event.

These two functions are:

1. Custom Dimensions
2. Ecommerce report

The use of custom dimensions is written in “[Use of GA custom dimensions,  
and understand article data under the category(Chinese)](https://letswrite.tw/ga-custom-dimension/)“.

Articles about Ecommerce report will be written in the future.

Learning GA Event is the way to actively communicate with GA. If you use GA often, you must learn.

---

## 3 + 1 elements of the GA event

GA Event has 3 necessary elements, with 1 optional element. If you are marketing to let the engineer set events, or if you are engineer wants to help the page set events, the three necessary elements ​​must be have:

- Event Category
- Event Action
- Event Label

Another option is:

- Event Value

What values ​​do categories, actions, and labels give? It depends entirely on how the website operator wants to see GA Events report. There is no need to say that there are fixed rules.

---

The following Event report demo and screenshots are all from the [demo account](https://support.google.com/analytics/answer/6367342?hl=zh-Hant) provided by Google .

The demo account is very useful, even if you don’t have your own website, you can actually see the GA data, and you can have a lot of data to use. These data are also real and come from their e-commerce website [Google Merchandise Store](https://shop.googlemerchandisestore.com/). Reports that are rarely touched, like Google Ads, can also be seen from the demo account.

It is recommended that you can start to learn the GA and you can join the demo account.

---

### Event Category

After entering GA, click on “Behavior” -&gt; “Events” -&gt; “Overview” and you will see the Events report:

{{< figure src="https://i0.wp.com/imgur.com/t8twkcc.png?ssl=1" title="GA event report, screenshot source: Google Demo Account" alt="GA event report, screenshot source: Google Demo Account" >}}

These data displayed by the report preset is the Event Category. The Event Category is a summary, which is the sum of events, so it cannot be defined casually.

It is very similar to the folder name we usually have when storing information. Will we defined casually? Not very likely, because it is difficult to find the information you need after the chaos.

In actual use, suppose that the GA Event to be placed is a promotional page with fewer pages and shorter time. Event Category can take the name of the promotion, like: 2019spring_promotion, 201908member_promotion. When you look at the report in this way, you can directly click on the Events report on this page to see the data inside.

If it is for the entire website, it will be more laborious. The entire website can have many categories, such as the direction of the navigation, the direction of the page, the direction of the ad, the direction of the product, etc. This is what the website operator and marketing have to think about.

---

### Event Action

The Event Action is the behavior of recording this event, you can see from the report of the demo account:

{{< figure src="https://i0.wp.com/imgur.com/FG9Vjyi.png?ssl=1" title="Demo Account Event Action Report" alt="Demo Account Event Action Report" >}}

More in the record is the Click events, in addition to join / remove cart, promotion click, these two are used in Ecommerce reports.

GA Event is that after the user does something on the page, the page is actively sent events to GA, so the code is used to send. So the Event Action has a lot to do with the javascript events.

There are many kinds of javascript events, you can refer to it to set up GA Event, such as:

- click
- focus / blur input
- change input value
- key\*
- mouse\*
- resize window size
- scroll window
- submit a form

This is a list of approximate, used as a reference for the action of the event, the actual use should be discussed with the engineers to see what events are set under what action.

---

### Event Label

This GA document is classified as an optional item to be filled out. In practical situation, it is recommended to fill it out.

Take a look at the GA Events report to see why you must fill it out:

{{< figure src="https://i0.wp.com/imgur.com/ikiwrA6.png?ssl=1" title="Demo Account Event Label Report" alt="Demo Account Event Label Report" >}}

Event Category, Event Action are large categories, and Event Label is small categories.

It’s like you set the following events:

- Event Category: Pokémon
- Event Action: Capture

and then? If the marketing colleague asks you about this thousand captures, which one is caught more, is Pikachu or Eevee? You will not be able to answer it because there are no records to the details.

The Event Label is a detail item that lets you record each event.

If you look at the examples given in the official documentation, you will know more about the need for Event Label:

- Category: “Videos”, Action: “Play”, Label: “Gone With the Wind”
- Category: “Videos”, Action: “Play”, Label: “Huckleberry Finn”

So refer to the example above, GA Event can be written as:

- Category: “Pokémon”, Action: “Capture”, Label: “Pikachu”
- Category: “Pokémon”, Action: “Capture”, Label: “Eevee”

In this way, when looking at the report, it is divided into events, which one has more interaction.

---

### Event Value

This is a non-required item, and the acceptable values ​​are numbers and do not accept negative numbers.

According to the official example, when someone watches the film press pause, the number of seconds to pause can be set to a value.

Or when the user adds a product to the shopping cart, the amount of the item can be set to a value.

---

## GA Event can affect bounce rate

Before entering the code of the next paragraph, it is necessary to say that GA Event will affect the bounce rate, because this will involve the parameters of the events code.

Bounce rate means that the user goes to the first page and **leaves without any interaction**.

The GA Event will be counted in the interaction, that is, even if the user enters this page, although there is no entry to other pages, there are events such as clicks, scrolls, etc., **these will be calculated as interactions and therefore are not included in the bounce rate.**

The official document also says:

> For example, suppose you have a page with a video player where the bounce rate is historically high, and you have not implemented Event measurement for the page. If you subsequently set up Event measurement for the player, you might notice a decrease in the bounce rate for that page, because Analytics will record user interaction with the player and send that interaction to the server as an additional GIF request.
>
> It’s important to keep in mind that any implementation of Event measurement that automatically executes on page load will result in a zero bounce rate for the page.
>
> <cite>Implementation considerations [Bounce Rate Impact](https://support.google.com/analytics/answer/1033068?hl=en#Implementation)</cite>

This means that if the user goes to the first page, the page is set to execute an event, such as an event that “rolls the depth is 0” or an event with “an ad exposure +1”. If the user does not enter other pages, the window will be closed and will not be counted in the bounce rate. The bounce rate of this page will be 0 because the user has an execution event.

If you want to set the event does not affect the bounce rate, even if the event is executed, then you should **set the “Non-Interaction Events” of the event to true**. This way, even if the user enters and triggers events and closes the window without going to another page, this session will be calculated at the bounce rate.

The way to set up non-interactive events will be written together with the write code into the next paragraph.

---

## Write GA Event tracking code

There are 2 ways to write the event tracking code:

1. Write code directly
2. Create events with google tag manager

Since I am a front-end engineer, writing code directly is the fastest for me. I don’t need GTM to build GA Event, so this article provides a way to write code.

Attach an official note with GTM, see this: [Google Analytics events](https://support.google.com/tagmanager/answer/6106716?hl=en)

There are two types of code writing, mainly depending on which type of GA tracking code is used: ga, gtag. This can be seen from the tracking code, like gtag will see gtag in the code:

{{< figure src="https://i0.wp.com/imgur.com/MAJ2nwB.png?ssl=1" title="gtag tracking code" alt="gtag tracking code" >}}

Now the tracking code provided by GA is all gtag. Here both ga and gtag will be written.

### Ga code

The code for the ga usage event is as follows:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
ga('send', 'event', {
  eventCategory: 'event category',
  eventAction: 'event action',
  eventLabel: 'event label',
  eventValue: 'event value'
});
{{< /highlight >}}
<!-- prettier-ignore-end -->

Can also be abbreviated as:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
ga('send', 'event', 'event category', 'event action', 'event label', 'event value');
{{< /highlight >}}
<!-- prettier-ignore-end -->

If you want to set a non-interactive event, this is the case:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
ga('send', 'event', 'event category', 'event action', 'event label', 'event value', {
  nonInteraction: true
});
{{< /highlight >}}
<!-- prettier-ignore-end -->

\* Event Value is not required and may not be written.

### Gtag code

The code for the gtag usage event is as follows:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
gtag('event', 'event action', {
  'event_category': 'event category',
  'event_label': 'event label',
  'value': 'event value'
});
{{< /highlight >}}
<!-- prettier-ignore-end -->

If you want to set a non-interactive event, this is the case:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
gtag('event', 'event action', {
  'event_category': 'event category',
  'event_label': 'event label',
  'non_interaction': true
});
{{< /highlight >}}
<!-- prettier-ignore-end -->

In addition, gtag provides Default Google Analytics Events. Default events table can be seen from the following link:

[Default Google Analytics Events](https://developers.google.com/analytics/devguides/collection/gtagjs/events#default_google_analytics_events)

\* Event values ​​are not required and may not be written.

---

## Case demonstration

Here is a case. Suppose there is a page that provides file download. The id of the download button is “btn-download”. To find out how many people clicked the download button, you can write:

<!-- prettier-ignore-start -->
{{< highlight js "linenos=inline" >}}
var btnDownload = document.getElementById('btn-download');
btnDownload.addEventListener('click', function() {
  gtag('event', 'download_click', {
    'event_category': 'download',
    'event_label': 'file name'
  });
}, false);
{{< /highlight >}}
<!-- prettier-ignore-end -->

This is the basic way to use GA Event.

If you want to know the click of the advertisement, GA has a function to convert CTR. This is one of the functions of the e-commerce report. Please refer to this:

[GA Report: Ecommerce Internal Promotion report(Chinese)](https://letswrite.tw/ga-ec-report/)

Finally, a link to the official documentation is attached: [About Events](https://support.google.com/analytics/answer/1033068?hl=en)

---

If you find this article helpful, please click on the helpful button made by myself. If you are willing to share on the social, that’s even better.
