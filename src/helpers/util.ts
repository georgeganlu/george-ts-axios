// 采用url-encode的方式来处理url的方式。

export function bindURL(url: string, params?: any): string {
  // 对url的处理方式的形式。 其实以前是qs做的工作。 现在学造轮子。
  if (!params) {
    return url
  }

  // 先声明一个长的数据。来放入key=value

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    if (val === null || val === undefined) {
      return
    }

    let values = []
  })

  return ''
}
