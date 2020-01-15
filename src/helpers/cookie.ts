const cookie = {
  read(name: string): string | null {
    // 通过正则去获取cookie分成了三部分，第一是前半部分的处理，后来是中间部分的处理。
    // (^|;\\s)(`${name}`)=([^;]*)
    // let reg = new RegExp(' (^|;\\s)*(' + name +') = ([^;]*)')
    let reg = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    const match = document.cookie.match(reg)
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie

// 以后还可以进行扩展进写write的方法。
