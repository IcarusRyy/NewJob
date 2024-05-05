import dayjs from "dayjs"

export function createPublishTimeTag(publishTime) {
  // 创建时间标签元素
  const timeTag = document.createElement("div")
  timeTag.classList.add("zhiLianPublishTime")

  // 直接使用传入的时间字符串，因为它已经是所需的格式
  const now = dayjs()
  const differenceInDays = now.diff(publishTime, "day")

  // 根据时间差异设定背景颜色
  let backgroundColor
  if (differenceInDays <= 14) {
    backgroundColor = "rgb(66, 110, 255)" // 两周以内
  } else if (differenceInDays <= 45) {
    backgroundColor = "#F0AD4E" // 两周至一个半月
  } else {
    backgroundColor = "red" // 超过一个半月
  }
  timeTag.style.background = backgroundColor
  timeTag.textContent = `最后发布时间：${publishTime}` // 设置时间文本内容

  return timeTag
}

export function getZhiLianJobListData(responseText) {
  try {
    const data = JSON.parse(responseText)

    // 等待职位列表渲染完成后，更新列表项与时间标签
    waitUntilJobListRendered().then((node) => {
      const listItems = getListByNode(node)
      updateJobListItemsWithTime(data?.data?.list || [], listItems)
    })
  } catch (err) {
    console.error("解析智联招聘列表数据失败", err)
  }
}

function getListByNode(node) {
  // 获取node节点的所有子节点作为列表项
  return [...node.children]
}

function waitUntilJobListRendered() {
  return new Promise((resolve, reject) => {
    const container = document.querySelector(".positionlist")

    if (!container) {
      return reject(new Error("找不到职位列表容器"))
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          resolve(container)
          observer.disconnect()
          return
        }
      }
    })

    observer.observe(container, { childList: true })
  })
}

function updateJobListItemsWithTime(list, listItems) {
  listItems.forEach((listItem, index) => {
    const item = list[index]

    if (item && listItem) {
      const timeTag = createPublishTimeTag(item.firstPublishTime)
      listItem.appendChild(timeTag)
    }
  })
}
