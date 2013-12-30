Fishing.Util =
  capitalize: (s) ->
    s[0].toUpperCase() + s.slice(1)

  stringToFunction: (str) ->
    arr = str.split '.'

    fn = window

    for i in [0...arr.length]
      fn = fn[arr[i]]

    fn