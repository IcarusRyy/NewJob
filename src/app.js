// import { getBossJobListData } from "./plantFrom/boss/index.js"
import { getZhiLianJobListData } from "./plantFrom/zhiLian/index.js"
import { get51JobListData } from "./plantFrom/51job/index.js"
import { getLagouJobListData } from "./plantFrom/lagou/index.js"
import "./app.css"
import { createLink, createScript } from "./help.js"
;(function initializeChromeExtension() {
  const head = document.head
  const body = document.body
  const proxyJS = createScript(chrome.runtime.getURL("./proxy.js"))
  const zhiLianFirstURL = chrome.runtime.getURL("./first.js")
  const lagouOpenURL = chrome.runtime.getURL("./open.js")
  const link = createLink(chrome.runtime.getURL("./app.css"))
  head.appendChild(link)
  // 仅当URL匹配"https://sou.zhaopin.com/*"时，加载并附加FirstScript
  if (window.location.href.startsWith("https://sou.zhaopin.com/")) {
    const zhiLianFirstScript = createScript(zhiLianFirstURL)
    head.appendChild(zhiLianFirstScript)
  }
  if (window.location.href.startsWith("https://www.lagou.com/")) {
    const lagouOpenScript = createScript(lagouOpenURL)
    body.appendChild(lagouOpenScript)
  }
  if (head.firstChild) {
    head.insertBefore(proxyJS, head.firstChild)
  } else {
    head.appendChild(proxyJS)
  }

  window.addEventListener("getJobList", function (e) {
    const data = e?.detail
    if (!data) return
    const responseURL = data?.responseURL
    // boss 直聘接口
    // if (responseURL.indexOf("/search/joblist.json") !== -1) {
    //   getBossJobListData(data?.response)
    // }
    // 智联招聘接口
    if (responseURL.indexOf("/search/positions") !== -1) {
      getZhiLianJobListData(data?.response, true)
    }
    // 前程无忧接口
    if (responseURL.indexOf("/job/search-pc") !== -1) {
      get51JobListData(data?.response)
    }
    // 拉钩
    if (responseURL.indexOf("/jobs/v2/positionAjax.json") !== -1) {
      getLagouJobListData(data?.response)
    }
  })
})()
