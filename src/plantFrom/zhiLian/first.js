import { createPublishTimeTag, createZhiLianTagParentEle } from "./index"
// 在页面第一次打开时处理职位列表
;(function firstOpenZhiLianPage() {
  const initialData = window.__INITIAL_STATE__ || {}
  const positionList = initialData.positionList || []

  // 如果职位列表为空，则不执行任何操作
  if (positionList.length === 0) return

  positionList.forEach((item, index) => {
    // 获取职位对应的DOM元素
    const positionElement = document.querySelector(
      `.positionlist__list > *:nth-child(${index + 1})`
    )

    if (positionElement) {
      const parent = createZhiLianTagParentEle()
      const firstPublishTag = createPublishTimeTag(item.firstPublishTime, true)
      parent.appendChild(firstPublishTag)
      const timeTag = createPublishTimeTag(item.publishTime)
      parent.appendChild(timeTag)
      positionElement.appendChild(parent)
    }
  })
})()
