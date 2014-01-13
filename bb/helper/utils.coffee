class Fishing_Helper_Utils

  capitalize: (s) ->
    s[0].toUpperCase() + s.slice(1)

  stringToFunction: (str) ->
    arr = str.split '.'
    fn = window
    for i in [0...arr.length]
      fn = fn[arr[i]]
    fn

  isUndefined: (input) =>
    if typeof input is 'undefined'
      true
    else
      false

Fishing.Helper.Utils = new Fishing_Helper_Utils()