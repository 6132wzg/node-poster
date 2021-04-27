define(['qs', 'lodash'], function (qs, lodash) { 'use strict';

  function __$styleInject(css) {
      if (!css) return;

      if (typeof window == 'undefined') return;
      var style = document.createElement('style');
      style.setAttribute('media', 'screen');

      style.innerHTML = css;
      document.head.appendChild(style);
      return css;
  }

  qs = qs && qs.hasOwnProperty('default') ? qs['default'] : qs;

  // extend Promise finally
  window.Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
      throw reason;
    }));
  };

  const router = {
    query() {
      let search = document.location.search;
      if (search[0] === '?') {
        search = search.slice(1);
      }
      if (!search) {
        return {};
      }
      return qs.parse(search);
    }
  };

  // omit,

  const computedStyle = (el, style = '') => {
      let str = style;
      if (Object.keys(style).length) {
          str = '';
          Object.keys(style).forEach(key => {
              str += `${lodash.kebabCase(key)}: ${style[key]};`;
          });
      }
      el.style.cssText = str;
  };

  const computedElProps = (el, val) => {
      const props = lodash.pick(val, ['textContent', 'src', 'link', 'href', 'content', 'rel', 'class', 'name']);
      Object.keys(props).forEach(key => {
          el[key] = props[key];
      });
  };

  const computedEl = (el, val, obj) => {
      if (!el) {
          let parentEl = val && val.parent ? $(val.parent) : $("#app");
          el = document.createElement(val.tagName || 'div');
          parentEl.append(el);
      }
      computedStyle(el, val.style);
      computedElProps(el, val);
  };

  class Render {
    constructor({ els = [] } = {}) {
      this.els = els;
      this.query = router.query() || {};
      if (this.query.json) {
        let jsonQuery = {};
        try {
          jsonQuery = JSON.parse(this.query.json) || {};
        } catch (error) {
          console.log(error);
        }
        this.query = Object.assign(this.query, jsonQuery);
      }
      if (+this.query.isSaveFile) {
        let fileHash = this.query.hash;
        let request = new XMLHttpRequest();
        request.open("get", `${window.location.origin}/resource/${fileHash}.json`);
        request.send(null);
        request.onload = () => {
          if (request.status == 200) {
            this.query = JSON.parse(request.responseText);
            this.init();
          }
        };
      } else {
        this.init();
      }
    }
    _makePreloadTask(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          resolve();
        };
        img.onerror = e => {
          reject(e);
        };
      });
    }
    _appendLoadEl() {
      const div = document.createElement("div");
      div.id = "load";
      document.body.appendChild(div);
      console.log("海报渲染完毕!");
    }
    init() {
      this.els.forEach(item => {
        const el = item.el;
        const value = this.query[item.field];
        const obj = {};
        if (item.refField && item.refField.length) {
          item.refField.map(key => {
            obj[key] = this.query[key];
          });
        }
        if (value) {
          item.update ? item.update(el, value, obj) : computedEl(el, value, obj);
        }
      });

      const preloadResources = this.els.filter(item => item.isResource).map(item => {
        let src = this.query[item.field];
        if (item.resourceAttr && typeof item.resourceAttr === "function") {
          src = item.resourceAttr(item.el);
        }
        if (src) {
          console.log("resource item.field", item.field, "src-->", src);
          return this._makePreloadTask(src);
        }
      });
      // TODO: Promise.all 策略? 继续渲染错误图 error专用占用图?
      Promise.all(preloadResources).then(() => {
        this._appendLoadEl();
      })
      // TODO: 给一个失败的图片
      .catch(e => {
        this._appendLoadEl();
      });
    }
  }

  const els = [
  // 海报参数
  {
    el: document.querySelector(`#avatar`),
    field: "avatar",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  }, {
    el: document.querySelector(`#echart`),
    field: "chartUrl",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  }, {
    el: document.querySelector(`#line`),
    field: "map",
    isResource: true,
    update(el, value) {
      let href = value === '1' ? '' : value;
      el.src = href;
    }
  }, {
    el: document.querySelector(`#code`),
    field: "codeUrl",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  }, {
    el: document.querySelector(`#nickname`),
    field: "nickname",
    isResource: false,
    update(el, value) {
      if (value.length <= 4) {
        document.getElementById("nickname").style.textAlign = "center";
      } else {
        document.getElementById("nickname").style.textAlign = "right";
      }
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#address`),
    field: "shopName",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#completionDegree1`),
    field: "completionDegree",
    isResource: false,
    update(el, value) {
      el.textContent = value;
      document.getElementById("completionNum").textContent = value + "%";
      document.getElementById("progressValue").style.width = value + "%";
      if (+value < 50) {
        document.querySelector(`.st-progress__wrapper`).className = "st-progress__wrapper st-progress__color-blue";
      }
    }
  }, {
    el: document.querySelector(`#progress`),
    field: "motionType",
    isResource: false,
    update(el, value) {
      if (value === "2") {
        document.getElementById("box_run").style.display = "none";
        document.getElementById("box_map").style.display = "none";
        document.getElementById("cover_map").style.display = "none";
        document.getElementById("progress").style.display = "block";
        document.getElementById("spacer").style.display = "block";
        document.getElementById("box_target").style.display = "block";
      } else if (value === "1") {
        document.getElementById("box_run").style.display = "block";
        document.getElementById("box_map").style.display = "none";
        document.getElementById("cover_map").style.display = "none";
        document.getElementById("progress").style.display = "none";
        document.getElementById("spacer").style.display = "none";
        document.getElementById("box_target").style.display = "none";
      } else if (value === "3") {
        document.getElementById("box_run").style.display = "none";
        document.getElementById("box_map").style.display = "block";
        document.getElementById("cover_map").style.display = "block";
        document.getElementById("progress").style.display = "none";
        document.getElementById("spacer").style.display = "none";
        document.getElementById("box_target").style.display = "none";
      }
    }
  },
  // 目标类型
  {
    el: document.querySelector(`#target_type`),
    field: "targetType",
    isResource: false,
    update(el, value) {
      if (value === "1") {
        el.textContent = "距离目标";
      } else if (value === "2") {
        el.textContent = "时间目标";
      } else if (value === "3") {
        el.textContent = "热量目标";
      }
    }
  },
  // 目标类型--header
  {
    el: document.querySelector(`#box_target-title`),
    field: "targetType",
    isResource: false,
    update(el, value) {
      if (value === "1") {
        el.textContent = "距离目标";
      } else if (value === "2") {
        el.textContent = "时间目标";
      } else if (value === "3") {
        el.textContent = "热量目标";
      }
    }
  }, {
    el: document.querySelector(`.target_value`),
    field: "targetValue",
    isResource: false,
    update(el, value) {
      document.querySelectorAll(".target_value").forEach(item => {
        item.textContent = value;
      });
    }
  }, {
    el: document.querySelector(`#length`),
    field: "length",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#duration`),
    field: "duration",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#distance1`),
    field: "distance",
    isResource: false,
    update(el, value) {
      el.textContent = value;
      document.getElementById("distance2").innerHTML = value;
      document.getElementById("distance3").innerHTML = value;
    }
  }, {
    el: document.querySelector(`#kcal`),
    field: "kcal",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#speed`),
    field: "speed",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#mp-name`),
    field: "mpName",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#date`),
    field: "date",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  }, {
    el: document.querySelector(`#header_date1`),
    field: "date",
    isResource: false,
    update(el, value) {
      console.log(value);
      el.textContent = value;
      document.getElementById("header_date2").innerHTML = value;
      document.getElementById("header_date3").innerHTML = value;
    }
  }];

  new Render({
    els
  });

});
//# sourceMappingURL=treadmill.js.map
