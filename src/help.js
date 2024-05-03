export function createScript(src) {
  const script = document.createElement("script")
  script.setAttribute("src", src)
  return script
}

export function createLink(href) {
  const link = document.createElement("link")
  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")

  // 注意这里需要配置 manifest 的 web_accessible_resources 字段，否则无法加载
  link.setAttribute("href", href)
  link.setAttribute("crossorigin", "anonymous")
  return link
}
