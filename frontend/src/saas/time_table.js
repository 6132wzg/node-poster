import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
    {
        el: $('.bg-image'), // 背景图地址
        field: 'bgUrl',
        isResource: true,
        update(el, val) {
            el.src = val
        }
    },
    {
        el: $('.bg-default'), // 是否是默认样式
        field: 'is_bgimage',
        update(el, val) {
            if (val === '0') {
                el.classList.add('is_default')
            }
        }
    },
    {
        el: $('.brand-logo-img'), // logo
        field: 'brand_log',
        isResource: true,
        update(el, val) {
            el.src = val
        }
    },
    {
        el: $('.qrcode-img'), // 二维码图
        field: 'qrcode_url',
        isResource: true,
        update(el, val) {
            el.src = val
        }
    },
    {
        el: $('.shop-name'), // 店铺名称
        field: 'shop_name',
        update(el, val) {
            el.textContent = val
        }
    },
    {
        el: $('.range-time'), // 时间范围
        field: 'rangeTime',
        update(el, val) {
            el.textContent = val
        }
    },
    {
        el: $('.time_table-title'), // 课表标题
        field: 'title',
        update(el, val) {
            el.textContent = val
        }
    },
    {
        el: $('.table-body'), // 课表内容
        field: 'timeTableList',
        update(el, tags) {
            let list = JSON.parse(tags)
            if (Array.isArray(list)) {
                list.forEach(x => {
                    let tds = ''
                    let tdList = x.list
                    let num = 0
                    tdList.forEach(item => {
                        if (item.list.length > num) {
                            num = item.list.length // 求出课最多的长度
                        }
                    })
                    tdList.forEach(y => {
                        let blocks = ''
                        for (let i = 0; i < num; i++) {
                            let courseList = y.list
                            if (courseList[i] && courseList[i].course_name) {
                                let stars = ''
                                if (courseList[i].strength_level) {
                                    for (let a = 0; a < Number(courseList[i].strength_level); a++) {
                                        stars += `<span class='star'></span>`
                                    }
                                }
                                blocks +=
                                    `<div class='table-block'>
                                        <div class='course-name'>${courseList[i].course_name}</div>
                                        <div class='strength-level'>${stars}</div>
                                        <div class='coach-name'>${courseList[i].coach_name}</div>
                                        <div class='court-name'>${courseList[i].court_name}</div>
                                    </div>`
                            } else {
                                blocks +=
                                    `<div class='table-block'>
                                        <div class='table-block-nodata'></div>
                                     </div>`
                            }
                        }
                        tds += `<td>${blocks}</td>`
                    })
                    el.innerHTML +=
                        `<tr>
                        <td class='table-time'>
                            <span>${x.start}</span>
                            <div>|</div>
                            <span>${x.end}</span>
                        </td>
                        ${tds}
                    </tr>`
                })
            }
        }
    },
    {
        el: $('.table-body'),
        field: 'is_show_nickname',
        update(el, val) {
            if(val === '0') {
                el.classList.add('no-coach')
            }
        }
    },
    {
        el: $('.table-body'),
        field: 'is_show_strength_level',
        update(el, val) {
            if(val === '0') {
                el.classList.add('no-strength')
            }
        }
    },
    {
        el: $('.tips-info'),
        field: 'prompt_message',
        update(el, val) {
            el.textContent = val
        }
    },
    {
        el: $('.tips-title'),
        field: 'prompt_message',
        update(el, val) {
            if(!val) {
                el.style.display = 'none'
            }
        }
    }   
]
new Render({
    els
})
