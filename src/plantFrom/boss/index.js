import dayjs from "dayjs"

export async function getBossJobListData(responseText) {
  try {
    const data = JSON.parse(responseText)
    const jobList = data?.zpData?.jobList || []
    const jobListContainer = await waitUntilJobListRendered()
    jobList.length && updateJobListItemsWithTime(jobList, jobListContainer)
  } catch (err) {
    console.error("reason：", err)
  }
}

function waitUntilJobListRendered() {
  return new Promise((resolve, reject) => {
    const jobResultContainer = document.querySelector(".search-job-result")
    if (!jobResultContainer) {
      return reject(new Error("未找到职位列表的容器"))
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.classList && node.classList.contains("job-list-box")) {
            observer.disconnect()
            return resolve(node)
          }
        }
      }
    })

    observer.observe(jobResultContainer, {
      childList: true,
    })
  })
}

function updateJobListItemsWithTime(jobList, jobListContainer) {
  jobList.forEach((job) => {
    const listItem = jobListContainer.querySelector(
      `[ka="search_list_${job.itemId}"]`
    )
    if (listItem) {
      const lastModifyTimeTag = createLastModifyTimeTag(job.lastModifyTime)
      listItem.appendChild(lastModifyTimeTag)
    }
  })
}

function createLastModifyTimeTag(timeStamp) {
  const timeString = dayjs(timeStamp).format("YYYY-MM-DD HH:mm:ss")
  const timeTag = document.createElement("div")
  timeTag.classList.add("boosLastTime")

  // 计算时间差
  const now = dayjs()
  const modifyTime = dayjs(timeStamp)
  const differenceInDays = now.diff(modifyTime, "day")

  // 设置背景色
  if (differenceInDays <= 14) {
    timeTag.style.background = "rgb(4, 197, 165)" // 绿色，距今两周内
  } else if (differenceInDays > 14 && differenceInDays <= 45) {
    timeTag.style.background = "#F0AD4E" // 暗橙色，两周到一个半月
  } else {
    timeTag.style.background = "red" // 红色，超过一个半月
  }

  // 计算已经过去的时间
  const dayPassed = dayjs().diff(modifyTime, 'day');

  timeTag.textContent = `${timeString}(已经过去了${dayPassed}天)`
  return timeTag
}
