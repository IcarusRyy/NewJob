import { getBossJobListData } from "./plantFrom/boss/index.js"

import "./app.css"
import { createLink, createScript } from "./help.js"
;(function () {
  const head = document.head
  const proxyJS = createScript(chrome.runtime.getURL("./proxy.js"))

  const link = createLink(chrome.runtime.getURL("./app.css"))
  head.appendChild(link)

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
    if (responseURL.indexOf("/search/joblist.json") !== -1) {
      getBossJobListData(data?.response)
    }
  })
})()
