!function(){if("function"!=typeof window.CustomEvent){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var s=document.createEvent("CustomEvent");return s.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),s}t.prototype=window.Event.prototype,window.CustomEvent=t}}(),function(){function t(t){const e=new CustomEvent(t,{detail:this});window.dispatchEvent(e)}const e=window.XMLHttpRequest;e?window.XMLHttpRequest=function(){const s=new e;["abort","error","load","loadstart","progress","timeout","loadend"].forEach((e=>{s.addEventListener(e,(function(){t.call(this,`ajax${e.charAt(0).toUpperCase()+e.slice(1)}`)}),!1)})),s.addEventListener("readystatechange",(function(){if(t.call(this,"ajaxReadyStateChange"),4===this.readyState&&200===this.status&&((e=(this.responseURL||this.url)+"").startsWith("https://www.zhipin.com/wapi/zpgeek/search/joblist.json")||e.startsWith("https://fe-api.zhaopin.com/c/i/search/positions")||e.startsWith("https://we.51job.com/api/job/search-pc")||e.startsWith("https://www.lagou.com/jobs/v2/positionAjax.json"))){const t={response:this.response,responseType:this.responseType,responseURL:this.responseURL||this.url,status:this.status,statusText:this.statusText,readyState:this.readyState,withCredentials:this.withCredentials};window.dispatchEvent(new CustomEvent("getJobList",{detail:t}))}var e}),!1);const n=s.send;s.send=function(...e){this.body=e[0],t.call(this,"ajaxSend"),n.apply(this,e)};const o=s.open;s.open=function(...e){[this.method,this.url,this.async]=e,t.call(this,"ajaxOpen"),o.apply(this,e)},s.requestHeaders={};const i=s.setRequestHeader;return s.setRequestHeader=function(t,e){this.requestHeaders[t]=e,i.call(this,t,e)},s}:console.error("XMLHttpRequest is not supported, please upgrade your browser.")}();