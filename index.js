// Generated by CoffeeScript 1.10.0
(function() {
  "use strict";
  var AUTO, Date, FUNCTION, NUMBER, OBJECT, Object, Phaser, RegExp, WHITE, aqua, blue, colorForValue, colors, defaultOptions, defaults, formatValue, fuchsia, gray, isArray, lime, orange, purple, red, silver, white, yellow;

  Date = this.Date, Object = this.Object, Phaser = this.Phaser, RegExp = this.RegExp;

  isArray = Array.isArray;

  AUTO = "auto";

  FUNCTION = "function";

  NUMBER = "number";

  OBJECT = "object";

  WHITE = "white";

  aqua = "#7fdbff";

  blue = "#0074d9";

  fuchsia = "#f012be";

  gray = "#666666";

  lime = "#01ff70";

  orange = "#ff851b";

  purple = "#b10dc9";

  red = "#ff4136";

  silver = "#aaaaaa";

  white = "#ffffff";

  yellow = "#ffdc00";

  colors = {
    boolean: orange,
    date: purple,
    "default": white,
    "function": blue,
    nan: red,
    "null": silver,
    number: yellow,
    regexp: fuchsia,
    special: aqua,
    string: lime,
    undefined: gray
  };

  defaultOptions = {
    color: WHITE,
    filter: null,
    keys: null,
    label: null,
    precision: 2,
    sort: false
  };

  colorForValue = function(val) {
    var typ;
    typ = typeof val;
    switch (false) {
      case val !== null:
        return colors["null"];
      case val === val:
        return colors.nan;
      case !(val instanceof Date):
        return colors.date;
      case !(val instanceof RegExp):
        return colors.regexp;
      case !(typ === OBJECT && val.constructor !== Object):
        return colors.special;
      default:
        return colors[typ] || colors["default"];
    }
  };

  defaults = function(target) {
    var key, val;
    for (key in defaultOptions) {
      val = defaultOptions[key];
      if (!(key in target)) {
        target[key] = val;
      }
    }
    return target;
  };

  formatValue = function(val, precision) {
    var ref, typ;
    typ = typeof val;
    switch (false) {
      case !isArray(val):
        return "(" + val.length + ")";
      case typ !== NUMBER:
        if (val % 1) {
          return val.toFixed(precision);
        } else {
          return val;
        }
      case !(val instanceof Date):
      case !(val instanceof RegExp):
        return val.toString();
      case !(typ === OBJECT && (val != null ? (ref = val.constructor) != null ? ref.name : void 0 : void 0)):
        return val.constructor.name;
      case typeof val !== FUNCTION:
        return "[Function]";
      case !(val != null ? val.toString : void 0):
        return val.toString();
      default:
        return val;
    }
  };

  Phaser.Utils.Debug.prototype.object = function(obj, x, y, options) {
    var color, colorize, currentColor, filter, i, key, keys, label, len, precision, val;
    if (options == null) {
      options = {};
    }
    options = defaults(options);
    color = options.color, filter = options.filter, keys = options.keys, label = options.label, precision = options.precision;
    currentColor = this.currentColor;
    if (color === AUTO) {
      color = null;
      colorize = true;
    }
    if (color == null) {
      color = WHITE;
    }
    if (!keys) {
      keys = Object.keys(obj);
    }
    if (options.sort) {
      keys.sort();
    }
    this.start(x, y, color);
    if (label) {
      this.line(label);
    }
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      val = obj[key];
      if (filter && !filter(val, key)) {
        continue;
      }
      this.currentColor = (colorize && colorForValue(val)) || color;
      this.line(key + ": " + (formatValue(val, precision)));
    }
    this.stop();
    this.currentColor = currentColor;
  };

}).call(this);
