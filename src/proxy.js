function isReqEnvironment(url) {
  return (
    url.startsWith("https://www.zhipin.com/wapi/zpgeek/search/joblist.json") ||
    url.startsWith("https://fe-api.zhaopin.com/c/i/search/positions") ||
    url.startsWith("https://we.51job.com/api/job/search-pc") ||
    url.startsWith("https://www.lagou.com/jobs/v2/positionAjax.json")
  )
}
// 对旧版浏览器 兼容自定义事件， 使用document.createEvent，并添加到window
;(function () {
  if (typeof window.CustomEvent !== "function") {
    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      }
      var evt = document.createEvent("CustomEvent")
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      return evt
    }
    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
  }
})()
// 事件触发器
;(function () {
  function ajaxEventTrigger(type) {
    const event = new CustomEvent(type, { detail: this })
    window.dispatchEvent(event)
  }

  const oldXHR = window.XMLHttpRequest
  if (!oldXHR) {
    console.error(
      "XMLHttpRequest is not supported, please upgrade your browser."
    )
    return
  }

  function enhanceXHR() {
    const xhr = new oldXHR()

    // Enhance XHR with event triggers
    ;[
      "abort",
      "error",
      "load",
      "loadstart",
      "progress",
      "timeout",
      "loadend",
    ].forEach((event) => {
      xhr.addEventListener(
        event,
        function () {
          ajaxEventTrigger.call(
            this,
            `ajax${event.charAt(0).toUpperCase() + event.slice(1)}`
          )
        },
        false
      )
    })

    // Enhance XHR with ready state change event
    xhr.addEventListener(
      "readystatechange",
      function () {
        ajaxEventTrigger.call(this, "ajaxReadyStateChange")
        if (this.readyState === 4 && this.status === 200) {
          // 检查URL是否为目标URL
          if (isReqEnvironment((this.responseURL || this.url) + "")) {
            const data = {
              response: this.response,
              responseType: this.responseType,
              responseURL: this.responseURL || this.url,
              status: this.status,
              statusText: this.statusText,
              readyState: this.readyState,
              withCredentials: this.withCredentials,
            }
            // 当请求的URL精确匹配时，触发getJobList事件
            window.dispatchEvent(
              new CustomEvent("getJobList", { detail: data })
            )
          }
        }
      },
      false
    )

    // Override send method
    const originalSend = xhr.send
    xhr.send = function (...args) {
      this.body = args[0]
      ajaxEventTrigger.call(this, "ajaxSend")
      originalSend.apply(this, args)
    }

    // Override open method
    const originalOpen = xhr.open
    xhr.open = function (...args) {
      ;[this.method, this.url, this.async] = args
      ajaxEventTrigger.call(this, "ajaxOpen")
      originalOpen.apply(this, args)
    }

    // Override setRequestHeader
    xhr.requestHeaders = {}
    const originalSetRequestHeader = xhr.setRequestHeader
    xhr.setRequestHeader = function (name, value) {
      this.requestHeaders[name] = value
      originalSetRequestHeader.call(this, name, value)
    }

    return xhr
  }

  window.XMLHttpRequest = enhanceXHR
})()
