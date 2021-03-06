const _formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(_formatNumber).join('/')} ${[
    hour,
    minute,
    second,
  ]
    .map(_formatNumber)
    .join(':')}`
}

/**
 * 删除字符串两边的斜线（包括正斜线 / 和反斜线 \）
 * @param {string} str 待处理的字符串
 * @param {Object} [option]            - 参数
 * @param {Object} [option.left=true]  - 是否删除左端的斜线
 * @param {Object} [option.right=true] - 是否删除右端的斜线
 * @example _trimSlash('/foo/bar/', { left: false }) => '/foo/bar'
 * @returns {string} 处理后的字符串
 */
const _trimSlash = (str, option) => {
  const op = {
    left: (option && option.left) || true,
    right: (option && option.right) || true,
  }
  const trimLeft = op.left ? '^[\\/\\\\]+' : ''
  const trimRight = op.right ? '[\\/\\\\]+$' : ''
  const reg = new RegExp(`${trimLeft}|${trimRight}`, 'g')

  return str.replace(reg, '')
}

/**
 * 处理 URL 路径
 * @param {string} base      - 基础 URL
 * @param  {...string} paths - 路径
 * @example urlResolve('https://github.com/v1/', '/signup/') => 'https://github.com/v1/signup/'
 * @returns {string}
 */
const urlResolve = (base, ...paths) => {
  let result = `${_trimSlash(base, { left: false })}/`

  for (const path of paths) {
    result += `${_trimSlash(path)}`
  }

  return result
}

/**
 * 获取 WXML 节点相关信息
 * 见：https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {Object} option
 * @param {Object} option.ctx      - 上下文
 * @param {string} option.selector - 选择器
 * @param {Object} option.fields   - 指定获取的属性
 * @param {Object} option.ret      - 返回值
 * @returns
 */
const getDomInfo = ({ ctx, selector, fields = {}, ret }) => {
  ctx
    .createSelectorQuery()
    .select(selector)
    .fields(
      {
        dataset: true,
        ...fields,
      },
      function (res) {
        Object.assign(ret, res)
      },
    )
    .exec()
}

/**
 * 将函数 Promise 化（如果函数已经是 Promise，则直接返回）
 * @param {Function} func - 函数
 * @returns {Promise}
 */
const promisify = (func) => {
  if (func instanceof Promise) {
    return func
  }

  return (option = {}) => {
    return new Promise((resolve, reject) => {
      const funcRet = func({
        ...option,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        },
      })

      if (option.signal) {
        if (typeof funcRet.abort === 'function') {
          option.signal.abort = () => funcRet.abort()
        }
      }
    })
  }
}

export { formatTime, urlResolve, getDomInfo, promisify }
