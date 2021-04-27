import "../polyfills/promise";
import router from "./router";
import { computedEl } from "./utils";

class Render {
  constructor({ els = [] } = {}) {
    this.els = els;
    this.query = router.query() || {}
    if(this.query.json) {
      let jsonQuery = {}
      try {
        jsonQuery = JSON.parse(this.query.json) || {}
      } catch (error) {
        console.log(error)
      }
      this.query = Object.assign(this.query, jsonQuery)
    }
    if (+this.query.isSaveFile) {
      let fileHash = this.query.hash
      let request = new XMLHttpRequest();
      request.open("get", `${window.location.origin}/resource/${fileHash}.json`);
      request.send(null);
      request.onload = ()=>{
        if (request.status == 200) {
            this.query = JSON.parse(request.responseText);
            this.init();
        }
      }
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
      const obj = {}
      if (item.refField && item.refField.length) {
        item.refField.map( key => {
          obj[key] = this.query[key];
        })
      }
      if (value) {
        item.update ? item.update(el, value, obj) : computedEl(el, value, obj);
      }
    });

    const preloadResources = this.els
      .filter(item => item.isResource)
      .map(item => {
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
    Promise.all(preloadResources)
      .then(() => {
        this._appendLoadEl();
      })
      // TODO: 给一个失败的图片
      .catch(e => {
        this._appendLoadEl();
      });
  }
}

export default Render;
