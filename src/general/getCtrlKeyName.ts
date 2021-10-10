function isMac() {
  return navigator.platform.indexOf('Mac') > -1
}

function getCtrlKeyName() {
  if (isMac()) {
    return 'Cmd'
  }

  return 'Ctrl'
}

export default getCtrlKeyName
