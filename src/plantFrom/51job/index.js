import dayjs from "dayjs"

export function get51JobListData(responseText) {
  try {
    const data = JSON.parse(responseText)
    waitUntilJobListRendered().then((node) => {
      const listItems = getListByNode(node)
      updateJobListItemsWithTime(data.resultbody.job.items || [], listItems)
    })
  } catch (err) {
    console.error("解析前程无忧招聘列表数据失败", err)
  }
}

function getListByNode(node) {
  // 获取node节点的所有子节点作为列表项
  return [...node.children]
}

function waitUntilJobListRendered() {
  return new Promise((resolve, reject) => {
    const container = document.querySelector(".joblist")
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

export function createUpdateDateTimeTag(publishTime) {
  // 创建时间标签元素
  const timeTag = document.createElement("div")
  timeTag.classList.add("jobUpdateDateTimeTag")
  // 直接使用传入的时间字符串，因为它已经是所需的格式
  const now = dayjs()
  const differenceInDays = now.diff(publishTime, "day")

  // 根据时间差异设定背景颜色
  let color
  if (differenceInDays <= 14) {
    color = "rgb(55, 196, 149)" // 两周以内
  } else if (differenceInDays <= 45) {
    color = "#F0AD4E" // 两周至一个半月
  } else {
    color = "red" // 超过一个半月
  }
  timeTag.style.background = color
  timeTag.textContent =
    `最后更新时间：${publishTime}` + `(已经过去了${differenceInDays}天)` // 设置时间文本内容
  return timeTag
}

function updateJobListItemsWithTime(list, listItems) {
  listItems.forEach((listItem, index) => {
    const item = list[index]
    if (item && listItem) {
      const timeTag = createUpdateDateTimeTag(item.updateDateTime)
      listItem.appendChild(timeTag)
    }
  })
}
