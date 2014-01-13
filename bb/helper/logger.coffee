class Fishing_Helper_Logger

  log: (msg, obj) =>
    unless Fishing.Constants.loggingOn
      return
    if Fishing.Helper.Utils.isUndefined obj
      console.log msg
    else
      console.log msg, obj

  error: (msg, obj) =>
    unless Fishing.Constants.loggingOn
      return
    if Fishing.Helper.Utils.isUndefined obj
      console.error msg
    else
      console.error msg, obj

Fishing.Helper.Logger = new Fishing_Helper_Logger()

window.flLog = Fishing.Helper.Logger.log
window.flError = Fishing.Helper.Logger.error