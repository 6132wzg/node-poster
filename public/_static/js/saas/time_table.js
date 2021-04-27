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

  const $$1 = document.querySelector.bind(document);
  const els = [{
      el: $$1('.bg-image'), // 背景图地址
      field: 'bgUrl',
      isResource: true,
      update(el, val) {
          el.src = val;
      }
  }, {
      el: $$1('.bg-default'), // 是否是默认样式
      field: 'is_bgimage',
      update(el, val) {
          if (val === '0') {
              el.classList.add('is_default');
          }
      }
  }, {
      el: $$1('.brand-logo-img'), // logo
      field: 'brand_log',
      isResource: true,
      update(el, val) {
          el.src = val;
      }
  }, {
      el: $$1('.qrcode-img'), // 二维码图
      field: 'qrcode_url',
      isResource: true,
      update(el, val) {
          el.src = val;
      }
  }, {
      el: $$1('.shop-name'), // 店铺名称
      field: 'shop_name',
      update(el, val) {
          el.textContent = val;
      }
  }, {
      el: $$1('.range-time'), // 时间范围
      field: 'rangeTime',
      update(el, val) {
          el.textContent = val;
      }
  }, {
      el: $$1('.time_table-title'), // 课表标题
      field: 'title',
      update(el, val) {
          el.textContent = val;
      }
  }, {
      el: $$1('.table-body'), // 课表内容
      field: 'timeTableList',
      update(el, tags) {
          let list = JSON.parse(tags);
          if (Array.isArray(list)) {
              list.forEach(x => {
                  let tds = '';
                  let tdList = x.list;
                  let num = 0;
                  tdList.forEach(item => {
                      if (item.list.length > num) {
                          num = item.list.length; // 求出课最多的长度
                      }
                  });
                  tdList.forEach(y => {
                      let blocks = '';
                      for (let i = 0; i < num; i++) {
                          let courseList = y.list;
                          if (courseList[i] && courseList[i].course_name) {
                              let stars = '';
                              if (courseList[i].strength_level) {
                                  for (let a = 0; a < Number(courseList[i].strength_level); a++) {
                                      stars += `<span class='star'></span>`;
                                  }
                              }
                              blocks += `<div class='table-block'>
                                        <div class='course-name'>${courseList[i].course_name}</div>
                                        <div class='strength-level'>${stars}</div>
                                        <div class='coach-name'>${courseList[i].coach_name}</div>
                                        <div class='court-name'>${courseList[i].court_name}</div>
                                    </div>`;
                          } else {
                              blocks += `<div class='table-block'>
                                        <div class='table-block-nodata'></div>
                                     </div>`;
                          }
                      }
                      tds += `<td>${blocks}</td>`;
                  });
                  el.innerHTML += `<tr>
                        <td class='table-time'>
                            <span>${x.start}</span>
                            <div>|</div>
                            <span>${x.end}</span>
                        </td>
                        ${tds}
                    </tr>`;
              });
          }
      }
  }, {
      el: $$1('.table-body'),
      field: 'is_show_nickname',
      update(el, val) {
          if (val === '0') {
              el.classList.add('no-coach');
          }
      }
  }, {
      el: $$1('.table-body'),
      field: 'is_show_strength_level',
      update(el, val) {
          if (val === '0') {
              el.classList.add('no-strength');
          }
      }
  }, {
      el: $$1('.tips-info'),
      field: 'prompt_message',
      update(el, val) {
          el.textContent = val;
      }
  }, {
      el: $$1('.tips-title'),
      field: 'prompt_message',
      update(el, val) {
          if (!val) {
              el.style.display = 'none';
          }
      }
  }];
  new Render({
      els
  });

});
//# sourceMappingURL=time_table.js.map
