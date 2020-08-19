export function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  console.log(index)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function _normalizeTreeData (source, id, parentId, children, key = 0) {
  /* eslint-disable */
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[id] === child[parentId])
    branchArr.length > 0 ? father[children] = branchArr : ''
    return father[parentId] === key
  })
  /* eslint-enable */
}

export function debounce (func, delay = 500) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate (row) {
  if (row) {
    return row.includes('0001-01-01') ? '' : row
  }
}
