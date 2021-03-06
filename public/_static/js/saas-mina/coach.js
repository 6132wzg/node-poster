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
      console.log("??????????????????!");
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
      // TODO: Promise.all ??????? ????????????????????? error????????????????
      Promise.all(preloadResources).then(() => {
        this._appendLoadEl();
      })
      // TODO: ????????????????????????
      .catch(e => {
        this._appendLoadEl();
      });
    }
  }

  const els = [
  // ????????????
  {
    el: document.querySelector(`.poster-coach__bg`),
    field: 'coach_bg',
    isResource: true,
    resourceAttr: el => {
      return el.src;
    }
  },
  // logo
  {
    el: document.querySelector(`.logo-name__logo`),
    field: 'shop_logo',
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  // ????????????
  {
    el: document.querySelector(`.poster-coach__qrcode`),
    field: 'qrcode',
    update(el, value) {
      el.src = value;
    },
    isResource: true
  },
  // ????????????
  {
    el: document.querySelector(`.logo-name__name`),
    field: 'shop_name',
    update(el, value) {
      el.textContent = value;
    }
  },
  // ????????????
  {
    el: document.querySelector(`.info__avatar`),
    field: 'coach_avatar',
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  // ????????????
  {
    el: document.querySelector(`.info__coach-name`),
    field: 'coach_name',
    update(el, value) {
      el.textContent = value;
    }
  },
  // ????????????
  {
    el: document.querySelector(`.info__coach-level`),
    field: 'coach_level',
    update(el, value) {
      el.textContent = value;
    }
  },
  // ????????????
  {
    el: document.querySelector(`.info__coach-number`),
    field: 'teached_number',
    update(el, value) {
      el.textContent = value;
    }
  },
  // ????????????
  {
    el: document.querySelector(`.info__coach-feature`),
    field: 'coach_tag',
    update(el, tags) {
      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          el.innerHTML += `<li class="feature__item">${tag}</li>`;
        });
      }
    }
  }];

  new Render({
    els
  });

});
//# sourceMappingURL=coach.js.map
