import { createLagouTagParentEle, createCreateTimeTag } from "./index.js"
function openLagouPage() {
  const initialData = window.__NEXT_DATA__ || {}
  const result =
    initialData.props.pageProps.initData.content.positionResult.result || []
  // 如果职位列表数据为空，则不执行任何操作
  if (result.length === 0) return
  // const container = document.querySelector(`#jobList > *:nth-child(1)`)
  // result.forEach((item, index) => {
  //   // 获取职位对应的DOM元素
  //   const parentElement = container.children[index]
  //   if (parentElement) {
  //     // Make sure parentElement exists before appending
  //     const createTag = createCreateTimeTag(item.createTime)
  //     parentElement.appendChild(createTag)
  //   }
  // })
  try {
    result.forEach((item, index) => {
      const grandchildElement = document.querySelector(
        `#jobList > *:first-child > *:nth-child(${index + 1})`
      )
      if (grandchildElement) {
        const parent = createLagouTagParentEle()
        if (item.createTime) {
          const createTag = createCreateTimeTag(item.createTime, true)
          parent.appendChild(createTag)
        }
        if (item.formatUpdateTime) {
          const updateTag = createCreateTimeTag(item.formatUpdateTime)
          parent.appendChild(updateTag)
        }
        grandchildElement.appendChild(parent)
      }
    })
  } catch (err) {
    console.log(err, "lagou err")
  }
}

// 延迟执行代码的函数
export function delayOpenLagouPage() {
  setTimeout(openLagouPage, 2000)
}

// 页面加载完成后调用delayOpenLagouPage
window.addEventListener("load", (event) => {
  delayOpenLagouPage()
  // openLagouPage()
})
