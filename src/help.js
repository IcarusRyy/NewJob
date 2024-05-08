export function createScript(src) {
  return Object.assign(document.createElement("script"), { src, defer: true })
}

export function createLink(href) {
  return Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    type: "text/css",
    href,
    crossorigin: "anonymous",
  })
}
