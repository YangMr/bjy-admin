const tinycolor = require("tinycolor2");
const ThemeKey = "AdminTheme";

let hueStep = 2;
let saturationStep = 16;
let saturationStep2 = 5;
let brightnessStep1 = 5;
let brightnessStep2 = 15;
let lightColorCount = 5;
let darkColorCount = 4;

let getHue = function (hsv, i, isLight) {
  let hue;
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
  } else {
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return Math.round(hue);
};
let getSaturation = function (hsv, i, isLight) {
  let saturation;
  if (isLight) {
    saturation = Math.round(hsv.s * 100) - saturationStep * i;
  } else if (i == darkColorCount) {
    saturation = Math.round(hsv.s * 100) + saturationStep;
  } else {
    saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
  }
  if (saturation > 100) {
    saturation = 100;
  }
  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }
  if (saturation < 6) {
    saturation = 6;
  }
  return Math.round(saturation);
};
let getValue = function (hsv, i, isLight) {
  if (isLight) {
    return Math.round(hsv.v * 100) + brightnessStep1 * i;
  }
  return Math.round(hsv.v * 100) - brightnessStep2 * i;
};

function colorPalette(color, index) {
  let isLight = index <= 6;
  let hsv = tinycolor(color).toHsv();
  let i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  }).toHexString();
}

function hexToRgb(color) {
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);
  return { r, g, b };
}

function setTheme(color) {
  let rgb = hexToRgb(color);
  let theme = `
                html {
                  --primary: ${color};
                  --primary-light: rgba(${rgb.r},${rgb.g},${rgb.b}, 0.1);
                  --primary-light2: rgba(${rgb.r},${rgb.g},${rgb.b}, 0.2);
                  --primary-light5: rgba(${rgb.r},${rgb.g},${rgb.b}, 0.5);
                  --primary-light8: rgba(${rgb.r},${rgb.g},${rgb.b}, 0.8);
                  --primary-1: ${colorPalette(color, 1)};
                  --primary-2: ${colorPalette(color, 2)};
                  --primary-3: ${colorPalette(color, 3)};
                  --primary-4: ${colorPalette(color, 4)};
                  --primary-5: ${colorPalette(color, 5)};
                  --primary-6: ${colorPalette(color, 6)};
                  --primary-7: ${colorPalette(color, 7)};
                }

                .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
                .ivu-modal .ivu-btn-text,
                .main .ivu-btn-text,
                .ivu-btn-default:hover,
                .ivu-select-item-selected,
                .ivu-select-item-selected:hover,
                .ivu-page-item-active a,
                .ivu-page-item-active:hover a,
                .ivu-menu-item:hover,
                .ivu-menu-submenu-title:hover,
                .ivu-tabs-nav .ivu-tabs-tab-active,
                .ivu-tabs-tab:hover,
                .ivu-page-item:hover a,
                .ivu-page-next:hover a, 
                .ivu-page-prev:hover a {
                    color: var(--primary) !important;
                }

                .ivu-btn-primary,
                .ivu-checkbox-checked .ivu-checkbox-inner,
                .ivu-radio-inner:after,
                .title::before,
                .ivu-tabs-ink-bar,
                .ivu-date-picker-cells-cell-today em:after {
                    background: var(--primary) !important;
                    background-color: var(--primary) !important;
                }

                .ivu-checkbox-checked.ivu-checkbox-disabled .ivu-checkbox-inner {
                  background: var(--primary-light5) !important;
                  border-color: transparent !important;
                }
                .ivu-checkbox-checked.ivu-checkbox-disabled .ivu-checkbox-inner::after {
                  border-color: #fff;
                }

                .ivu-date-picker-cells-cell:not(.ivu-date-picker-cells-cell-selected):hover em {
                    background: var(--primary-light) !important;
                    background-color: var(--primary-light) !important;
                }

                .ivu-date-picker-cells-cell-range:before {
                    background: var(--primary-1) !important;
                }

                .ivu-btn-default:hover,
                .ivu-input:focus,
                .ivu-input:hover,
                .ivu-btn-primary,
                .ivu-select-visible .ivu-select-selection,
                .ivu-select-selection:hover,
                .ivu-select-selection:focus,
                .ivu-page-item-active,
                .ivu-checkbox-checked .ivu-checkbox-inner,
                .ivu-radio-checked .ivu-radio-inner,
                .ivu-date-picker-focused input,
                .ivu-page-next:hover, 
                .ivu-page-prev:hover,
                .ivu-page-options-elevator input:focus,
                .ivu-color-picker-default:hover .ivu-input,
                .ivu-color-picker-focused,
                .el-cascader:not(.is-disabled):hover .el-input__inner {
                    border-color: var(--primary) !important;
                }

                .ivu-btn-primary:hover {
                    background: var(--primary-5) !important;
                    background-color: var(--primary-5) !important;
                    border-color: var(--primary-5) !important;
                }

                .ivu-btn-primary:focus,
                .ivu-btn-default:focus {
                    box-shadow: 0 0 0 2px var(--primary-light2) !important;
                }

                .ivu-date-picker-cells-focused em {
                    box-shadow: 0 0 0 1px var(--primary) inset !important;
                }

                .ivu-checkbox-focus {
                    box-shadow: 0 0 0 2px var(--primary-light2) !important;
                }

                .ivu-btn[disabled] {
                    color: #c5c8ce !important;
                    background-color: #f7f7f7 !important;
                    border-color: #dcdee2 !important;
                }

                .ivu-btn.ivu-btn-text[disabled] {
                    color: #c5c8ce !important;
                    background-color: rgba(0, 0, 0, 0) !important;
                    border-color: rgba(0, 0, 0, 0) !important;
                }

                tr.ivu-table-row-hover td {
                    background-color: var(--primary-1) !important;
                }

                .ivu-btn-ghost:not(.ivu-btn-success) {
                    color: #fff !important;
                    background: 0 0 !important;
                }

                .ivu-btn-ghost.ivu-btn-primary {
                    color: var(--primary) !important;
                }

                .ivu-btn-ghost.ivu-btn-primary:hover {
                    background: var(--primary-1) !important;
                    background-color: var(--primary-1) !important;
                }

                .ivu-radio-group-button .ivu-radio-wrapper-checked {
                    color: var(--primary) !important;
                    border-color: var(--primary) !important;
                    box-shadow: -1px 0 0 0 var(--primary);
                }

                .ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus {
                    box-shadow: -1px 0 0 0 var(--primary), 0 0 0 2px var(--primary-light2);
                }

                .ivu-radio-group-button .ivu-radio-wrapper:hover {
                    color: var(--primary);
                }

                .ivu-radio-group-button .ivu-radio-wrapper-checked:before {
                    background: var(--primary);
                }
                
                .ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus:after {
                    background: var(--primary-light2);
                }

                .ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus:first-child,
                .ivu-radio-focus,
                .ivu-input:focus,
                .ivu-select-visible .ivu-select-selection,
                .ivu-date-picker-focused input,
                .ivu-input-number-focused,
                .ivu-input-number:focus,
                .ivu-page-options-elevator input:focus {
                    box-shadow: 0 0 0 2px var(--primary-light2);
                }

                .el-cascader .el-input .el-input__inner:focus,
                .el-cascader .el-input.is-focus .el-input__inner,
                .el-checkbox__inner:hover,
                .ivu-input-number:hover,
                .ivu-input-number:focus,
                .ivu-input-number-focused,
                .ivu-page-item:hover {
                    border-color: var(--primary);
                }
                
                .ivu-cascader-menu .ivu-cascader-menu-item-active {
                    color: var(--primary);
                }

                .ivu-date-picker-cells-cell-selected em, 
                .ivu-date-picker-cells-cell-selected:hover em {
                    background: var(--primary);
                }

                .ivu-btn-text:hover,
                .ivu-page-options-elevator input:hover {
                    color: var(--primary-5);
                }

                .ivu-page-options-elevator input:hover {
                    border-color: var(--primary-5);
                }

                .ivu-time-picker-cells-cell-selected, 
                .ivu-time-picker-cells-cell-selected:hover,
                .el-cascader-node.in-active-path, 
                .el-cascader-node.is-selectable.in-checked-path, 
                .el-cascader-node.is-active {
                    color: var(--primary);
                }
                
                .el-checkbox__input.is-checked .el-checkbox__inner {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }

                a.ivu-btn-primary {
                    color: white!important;
                }
                `;
  let style = document.getElementById("themeStyle");
  if (!style) {
    style = document.createElement("style");
    style.id = "themeStyle";
    document.head.appendChild(style);
  }
  style.innerHTML = theme;

  localStorage.setItem(ThemeKey, color);
}

function initTheme() {
  let theme = localStorage.getItem(ThemeKey);
  theme = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  if (theme) {
    setTheme(theme);
  }
}

export { colorPalette, hexToRgb, setTheme, initTheme };
