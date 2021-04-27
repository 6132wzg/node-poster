import Render from "../plugins/render";

const els = [
  // 海报参数
  {
    el: document.querySelector(`#avatar`),
    field: "avatar",
    isResource: true,
    update(el, value) {
      el.src = value;
    },
  },
  {
    el: document.querySelector(`#nickname`),
    field: "nickname",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    },
  },
  {
    el: document.querySelector(`#currentdate`),
    field: "current_date",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    },
  },
  {
    el: document.querySelector(`#differ_days`),
    field: "differ_days",
    isResource: false,
    update(el, value) {
      el.textContent = `对比${value}天前`;
    },
  },
  {
    el: document.querySelector(`#description`),
    field: "description",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    },
  },
  {
    el: document.querySelector(`#logo`),
    field: "logo",
    isResource: true,
    update(el, value) {
      el.src = value;
    },
  },
  {
    el: document.querySelector(`#shop_name`),
    field: "shop_name",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    },
  },
  {
    el: document.querySelector(`#qrcode`),
    field: "qrcode",
    isResource: true,
    update(el, value) {
      el.src = value;
    },
  },
  {
    el: document.querySelector(`#indicators`),
    field: "indicators",
    isResource: false,
    update(el, indicators) {
      console.log("indicators", typeof indicator);
      if (Array.isArray(indicators)) {
        let innerHtmlStr = "";
        let statusStrMap = {
          2: '增加',
          3: '减少'
        }
        indicators = indicators.splice(0, 6);
        indicators.forEach((indicator) => {
          innerHtmlStr += `<div class="st-physicaltest__content-indicator">
            <div class="st-physicaltest__content-indicator-name">${
              indicator.item_name
            }${indicator.status === 1 ? '' : statusStrMap[indicator.status]}</div>`;
          if (indicator.status !== 1) {
            innerHtmlStr += `<div class="st-physicaltest__content-indicator-content">
            <div class="st-physicaltest__content-indicator-content-value">${
              indicator.change_value
            }</div>
            <div class="st-physicaltest__content-indicator-content-unit">${
              indicator.item_unit
            }</div>
          </div>`
          } else {
            innerHtmlStr += `
            <div class="st-physicaltest__content-indicator-content">
              <div class="st-physicaltest__content-indicator-content-value">--</div>
            </div>`
          }
          innerHtmlStr += `</div>`
        });
        el.innerHTML = innerHtmlStr;
      }
    },
  },
];

new Render({
  els,
});
