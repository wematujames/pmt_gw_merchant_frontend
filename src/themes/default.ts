import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  "token": {
    "colorPrimary": "#142868",
    "colorInfo": "#142868",
    "colorSuccess": "#7bc657"
  },
  "components": {
    "Table": {
      "headerBg": "rgb(37, 53, 110)",
      "headerColor": "rgb(249, 243, 243)",
      "colorBgContainer": "rgb(250, 250, 250)",
      "headerSortActiveBg": "rgb(48, 63, 115)",
      "headerSortHoverBg": "rgb(48, 63, 115)",
      "headerSplitColor": "rgb(255, 255, 255)"
    },
    "Divider": {
      "colorSplit": "rgb(20, 40, 104)",
      "margin": 10
    },
    "Typography": {
      "colorTextHeading": "rgb(20, 40, 104)"
    },
    "Button": {
      "primaryShadow": "0 1px 0 rgba(5, 145, 255, 0.1)",
      "dangerShadow": "0 1px 0 rgba(255, 38, 5, 0.06)",
      "defaultShadow": "0 1px 0 rgba(0, 0, 0, 0.02)",
      "fontWeight": 500,
      "contentFontSize": 16,
      "contentFontSizeLG": 18,
      "contentLineHeight": 1.6,
      "onlyIconSize": 20,
      "onlyIconSizeLG": 22,
      "onlyIconSizeSM": 18
    },
    "Layout": {
      "bodyBg": "rgb(238, 240, 242)",
      "footerBg": "rgb(238, 240, 242)",
      "lightSiderBg": "rgb(20, 40, 104)",
      "lightTriggerBg": "rgb(20, 40, 104)",
      "lightTriggerColor": "rgb(20, 40, 104)"
    },
    "Card": {
      "colorBorderSecondary": "rgb(229, 233, 242)",
      "borderRadiusLG": 10
    },
    "Select": {
      "optionSelectedColor": "rgba(255, 255, 255, 0.88)",
      "optionSelectedBg": "rgb(20, 40, 104)"
    },
    "Slider": {
      "trackBg": "rgb(20, 40, 104)"
    },
    "Avatar": {
      "colorTextPlaceholder": "rgb(20, 40, 104)"
    },
    "Collapse": {
      "colorTextHeading": "rgb(20, 40, 104)",
      "headerBg": "rgb(229, 233, 242)"
    },
    "List": {
      "colorTextDescription": "rgb(20, 40, 104)"
    },
    "Segmented": {
      "itemSelectedBg": "rgb(20, 40, 104)",
      "itemSelectedColor": "rgba(253, 252, 252, 0.88)"
    },
    "Statistic": {
      "colorText": "rgb(20, 40, 104)"
    },
    "Tooltip": {
      "colorBgSpotlight": "rgb(20, 40, 104)"
    },
    "Alert": {
      "colorInfoBg": "rgb(253, 253, 253)"
    }
  }
};

export default theme;