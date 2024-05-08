import dayjs from "dayjs"

export function createLagouTagParentEle() {
  // 创建标签父元素
  const tagParentEle = document.createElement("div")
  tagParentEle.classList.add("lagouTagParent")
  return tagParentEle
}

export function createCreateTimeTag(publishTime, isCreate = false) {
  // 创建时间标签元素
  const timeTag = document.createElement("div")
  // 直接使用传入的时间字符串，因为它已经是所需的格式
  const now = dayjs()
  const differenceInDays = now.diff(publishTime, "day")
  // 根据时间差异设定背景颜色
  let color
  if (differenceInDays <= 14) {
    color = "rgb(71, 200, 171)" // 两周以内
  } else if (differenceInDays <= 45) {
    color = "#F0AD4E" // 两周至一个半月
  } else {
    color = "red" // 超过一个半月
  }
  if (isCreate) {
    timeTag.style.color = color
    timeTag.style.padding = "2px"
    timeTag.style.fontWeight = 700
    timeTag.style.border = `1px solid ${color}`
  } else {
    timeTag.style.background = color
    timeTag.style.marginLeft = "20px"
  }

  timeTag.textContent = `${
    isCreate ? "createTime" : "formatUpdateTime"
  }：${publishTime} (已经过去了${differenceInDays}天)` // 设置时间文本内容

  return timeTag
}

export function getLagouJobListData(responseText) {
  setTimeout(() => {
    try {
      const data = JSON.parse(responseText)

      // 等待职位列表渲染完成后，更新列表项与时间标签
      waitUntilJobListRendered().then((node) => {
        const listItems = getListByNode(node)
        updateJobListItemsWithTime(
          data?.content?.positionResult?.result || [],
          listItems
        )
      })
    } catch (err) {
      console.error("解析拉钩招聘列表数据失败", err)
    }
  }, 2000)
}
function getListByNode(node) {
  // 获取node节点的所有子节点作为列表项
  return [...node.children]
}
function waitUntilJobListRendered() {
  return new Promise((resolve, reject) => {
    const container = document.querySelector(`#jobList > *:nth-child(1)`)
    if (!container) {
      return reject(new Error("找不到职位列表容器"))
    }

    return resolve(container)
  })
}

function updateJobListItemsWithTime(list, listItems) {
  listItems.forEach((listItem, index) => {
    const item = list[index]
    if (item && listItem) {
      const parent = createLagouTagParentEle()
      if (item.createTime) {
        const createTag = createCreateTimeTag(item.createTime, true)
        parent.appendChild(createTag)
      }
      if (item.formatUpdateTime) {
        const updateTag = createCreateTimeTag(item.formatUpdateTime)
        parent.appendChild(updateTag)
      }
      listItem.appendChild(parent)
    }
  })
}
