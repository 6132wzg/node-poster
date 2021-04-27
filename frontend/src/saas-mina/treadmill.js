import Render from "../plugins/render";

const els = [
  // 海报参数
  {
    el: document.querySelector(`#avatar`),
    field: "avatar",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  {
    el: document.querySelector(`#echart`),
    field: "chartUrl",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  {
    el: document.querySelector(`#line`),
    field: "map",
    isResource: true,
    update(el, value) {
      let href = value ==='1' ? '' : value;
      el.src = href
    }
  },
  {
    el: document.querySelector(`#code`),
    field: "codeUrl",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  {
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
  },
  {
    el: document.querySelector(`#address`),
    field: "shopName",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#completionDegree1`),
    field: "completionDegree",
    isResource: false,
    update(el, value) {
      el.textContent = value;
      document.getElementById("completionNum").textContent = value + "%";
      document.getElementById("progressValue").style.width = value + "%";
      if (+value < 50) {
        document.querySelector(`.st-progress__wrapper`).className =
          "st-progress__wrapper st-progress__color-blue";
      }
    }
  },
  {
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
  },
  {
    el: document.querySelector(`.target_value`),
    field: "targetValue",
    isResource: false,
    update(el, value) {
      document.querySelectorAll(".target_value").forEach(item => {
        item.textContent = value;
      });
    }
  },
  {
    el: document.querySelector(`#length`),
    field: "length",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#duration`),
    field: "duration",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#distance1`),
    field: "distance",
    isResource: false,
    update(el, value) {
      el.textContent = value;
      document.getElementById("distance2").innerHTML = value;
      document.getElementById("distance3").innerHTML = value;
    }
  },
  {
    el: document.querySelector(`#kcal`),
    field: "kcal",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#speed`),
    field: "speed",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#mp-name`),
    field: "mpName",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#date`),
    field: "date",
    isResource: false,
    update(el, value) {
      el.textContent = value;
    }
  },
  {
    el: document.querySelector(`#header_date1`),
    field: "date",
    isResource: false,
    update(el, value) {
      console.log(value);
      el.textContent = value;
      document.getElementById("header_date2").innerHTML = value;
      document.getElementById("header_date3").innerHTML = value;
    }
  }
];

new Render({
  els
});
