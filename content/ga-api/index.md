---
title: "Integrating Multi-Site Google Analytics Data Using Google Apps Script"
date: "2025-05-09T08:18:00+08:00"
summary: "This tutorial walks through how to consolidate Google Analytics data from multiple sites using Google Apps Script and the Google Analytics Data API, enabling easy, centralized reporting."
cover: ga-api.jpg
images:
  - ga-api.jpg
categories:
  - google
tags:
  - GA4
draft: false
---

本篇中文版：[使用 Google Apps Script 串接 Google Analytics API，整合多站數據](https://www.letswrite.tw/ga-api/)

## What This Guide Solves

If your company operates multiple websites, checking their Google Analytics (GA) data typically means opening several browser windows side by side—a pretty tedious process.

But with the GA API, engineers can fetch data from each site and display it all on a single dashboard—no more juggling multiple GA accounts.

---

## Listen in: Key takeaways from Google's NotebookLM.

{{< iframe src="https://www.youtube.com/embed/BcdttM3Dnr4" width="704" height="396" >}}

---

## Step 1: Enable the GA API

### Get Your GCP Project ID

First, you need a Google Cloud Platform (GCP) project. If you don't have one, log into your Google account and create a new project.

Your project ID is shown on the [GCP Dashboard](https://console.cloud.google.com/home/dashboard):

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tnwgm6pugn5gvo5holbn.png" title="GCP Project ID" alt="GCP Project ID" >}}

### Enable the Google Analytics API

Before using the API, you’ll need to enable it in your GCP project.

In GCP, go to **APIs & Services** > **Library**:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3d4l0a8qebh0x7yva8qf.png" title="API Library in GCP" alt="API Library in GCP" >}}

Search for **Google Analytics Data API**, then click into the result and hit **Enable**:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bf4sisheo2kbhbi1t3d3.png" title="Search and enable Google Analytics Data API" alt="Search and enable Google Analytics Data API" >}}

---

## Step 2: Get Your GA Property ID

In your GA Admin panel, click on "Property Settings":

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdgdhzr9hrr4kwtq9toq.png" title="GA Admin Interface" alt="GA Admin Interface" >}}

You’ll find your property ID in the top right corner:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qmtqfkwr9vibke74l1vp.png" title="GA Property ID" alt="GA Property ID" >}}

---

## Step 3: Write the Script in Google Apps Script

If you're using the same Google account for both the GA property and Apps Script, you can skip OAuth authentication—super handy!

### Create a New Project in Google Apps Script

Go to [Google Apps Script](https://script.google.com/home) and create a new project:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nhuz67idyycexdz6101y.png" title="New GAS Project" alt="New GAS Project" >}}

Paste in the following code to get started.

### Example 1: Total Page Views & Active Users

```javascript {linenos=table,anchorlinenos=true}
function getGA4Data() {
  var apiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

  var payload = {
    dateRanges: [
      {
        startDate: startDate,
        endDate: "today",
      },
    ],
    metrics: [
      { name: "screenPageViews" }, // 瀏覽數
      { name: "activeUsers" }, // 活躍用戶數
    ],
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var data = JSON.parse(response.getContentText());

  // 檢查回應中是否有 rows 資料
  if (data.rows && data.rows.length > 0) {
    // 取得瀏覽數和活躍用戶數
    var screenPageViews = data.rows[0].metricValues[0].value;
    var activeUsers = data.rows[0].metricValues[1].value;

    // 回傳資料
    return {
      totalPageViews: screenPageViews,
      activeUsers: activeUsers,
    };
  } else {
    // 若無符合資料，則回傳 0 作為預設值
    return {
      totalPageViews: 0,
      activeUsers: 0,
    };
  }
}
```

### Example 2: Page Views for Specific Page Titles

Filter by titles that end with, say, "Member Center":

```javascript {linenos=table,anchorlinenos=true}
var propertyId = "xxxxxx";  // 替換成 GA 的資源編號
var startDate = "2025-01-01", // 替換成想要從哪一天開始抓的日期
var pageTitle = "會員中心"; // 替換成想要篩選的頁面標題文字

function getGA4DataPage() {

  var apiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

  var payload = {
    "dateRanges": [{
      "startDate": startDate,
      "endDate": "today"
    }],
    "metrics": [
      { "name": "screenPageViews" }, // 瀏覽數
      { "name": "activeUsers" } // 活躍用戶數
    ],
    "dimensionFilter": {
      "filter": {
        "fieldName": "unifiedScreenName",
        "stringFilter": {
          "value": pageTitle,
          "matchType": "ENDS_WITH"
        }
      }
    }
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + ScriptApp.getOAuthToken()
    },
    "muteHttpExceptions": true,
    "payload": JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var data = JSON.parse(response.getContentText());

  if (data.rows && data.rows.length > 0) {
    var screenPageViews = data.rows[0].metricValues[0].value;
    var activeUsers = data.rows[0].metricValues[1].value;
    return {
      "totalPageViews": screenPageViews,
      "activeUsers": activeUsers
    };
  } else {
    return {
      "totalPageViews": 0,
      "activeUsers": 0
    };
  }
}
```

### Example 3: Realtime Active Users

```javascript {linenos=table,anchorlinenos=true}
var propertyId = "xxxxxx"; // 替換成 GA 的資源編號
function getGA4RealtimeData() {
  var apiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`;

  var payload = {
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var data = JSON.parse(response.getContentText());

  // 取得即時人數
  return data.rows[0].metricValues[0].value;
}
```

### Example 4: Realtime Users on a Specific Page

```javascript {linenos=table,anchorlinenos=true}
var propertyId = "xxxxxx"; // 替換成 GA 的資源編號
var pageTitle = "會員中心"; // 替換成想要篩選的頁面標題文字

function getGA4RealtimeDataPage() {
  var apiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`;

  // 在 payload 中新增 dimensions 和 dimensionFilter
  var payload = {
    metrics: [
      {
        name: "activeUsers",
      },
    ],
    dimensions: [
      {
        name: "unifiedScreenName",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "unifiedScreenName",
        stringFilter: {
          value: pageTitle,
          matchType: "ENDS_WITH",
        },
      },
    },
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var data = JSON.parse(response.getContentText());

  var totalActiveUsers = 0;

  // 累加所有匹配頁面的人數
  if (data.rows && data.rows.length > 0) {
    data.rows.forEach(function (row) {
      totalActiveUsers += parseInt(row.metricValues[0].value, 10);
    });
  }

  return totalActiveUsers.toString(); // 返回所有匹配頁面的總人數
}
```

---

## Step 4: Handling API Calls Based on Parameters

Add logic to respond to different requests based on a `type` parameter:

```javascript {linenos=table,anchorlinenos=true}
// 回應錯誤訊息
function createErrorResponse(message, code) {
  var errorResponse = {
    success: false,
    error: message,
    code: code || 400,
    timestamp: new Date().toISOString(),
  };
  var jsonOutput = ContentService.createTextOutput(
    JSON.stringify(errorResponse)
  );
  jsonOutput.setMimeType(ContentService.MimeType.JSON);
  return jsonOutput;
}

// 處理 POST
function doPost(e) {
  // 確認有傳入內容
  if (!e.postData || !e.postData.contents) {
    return createErrorResponse("無效請求：未收到 POST 資料。" + e.postData);
  }

  // 將 POST 資料解析成 JSON
  var requestData;
  try {
    requestData = JSON.parse(e.postData.contents);
  } catch (error) {
    return createErrorResponse("JSON 格式無效。");
  }

  // 檢查是否有 type 參數
  if (!requestData.type) {
    return createErrorResponse("缺少「type」參數。");
  }

  var output;

  // 根據 type 參數執行不同的邏輯
  switch (requestData.type) {
    // 瀏覽量、活躍人數
    case "data":
      var reportData = getGA4Data();
      output = {
        totalPageViews: reportData.totalPageViews,
        activeUsers: reportData.activeUsers,
      };
      break;
    // 瀏覽量、活躍人數：指定頁面標題
    case "dataPage":
      var reportData = getGA4DataPage();
      output = {
        totalPageViews: reportData.totalPageViews,
        activeUsers: reportData.activeUsers,
      };
      break;
    // 即時人數
    case "realtimeData":
      var reportData = getGA4RealtimeData();
      output = {
        activeUsers: reportData,
      };
      break;
    // 即時人數：指定頁面標題
    case "realtimeDataPage":
      var reportData = getGA4RealtimeDataPage();
      output = {
        activeUsers: reportData,
      };
      break;
    default:
      return createErrorResponse("type 錯誤");
  }

  // 回傳 JSON 格式的結果
  var jsonOutput = ContentService.createTextOutput(JSON.stringify(output));
  jsonOutput.setMimeType(ContentService.MimeType.JSON);
  return jsonOutput;
}
```

---

## Step 5: Link Your Script to GCP

In the left sidebar, go to **Project Settings** and scroll down to link your GCP project using the ID from earlier:

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kuci6d7crvapdd85bwyl.png" title="Link to GCP Project" alt="Link to GCP Project" >}}

---

## Step 6: Deploy the Script

To make your script accessible via API:

1. Click **Deploy** > **Manage Deployments**.
2. Choose **Web App** as the deployment type.
3. Set access to **Anyone**.

Once deployed, you’ll get a public URL—this is your API endpoint.

---

## Step 7: Fix Permissions If Needed

If your response always returns `0`, it’s likely a permissions issue.

1. Go to **Project Settings** and check the box to show `appsscript.json`.
2. Add these scopes:

```json {linenos=table,anchorlinenos=true}
"oauthScopes": [
"https://www.googleapis.com/auth/script.external_request",
"https://www.googleapis.com/auth/analytics.readonly"
]
```

Redeploy and approve all permission prompts. You’re good to go!

---

## Full Source Code

You can find the full code here:
[Complete Script on GitHub Gist](https://gist.github.com/letswritetw/5bcebc7b1b4d405f4459fe8a871d4f2c.js)
{{< iframe src="https://gist.github.com/letswritetw/5bcebc7b1b4d405f4459fe8a871d4f2c.js" >}}

---

Translated by ChatGPT.
