import { kebabCase, pick } from 'lodash';
// omit,

const computedStyle = (el, style = '') => {
    let str = style
    if (Object.keys(style).length) {
        str = ''
        Object.keys(style).forEach((key) => {
            str += `${kebabCase(key)}: ${style[key]};`
        });
    }
    el.style.cssText = str
}

const computedElProps = (el, val) => {
    const props = pick(val, ['textContent', 'src', 'link', 'href', 'content', 'rel', 'class', 'name'])
    Object.keys(props).forEach((key) => {
        el[key] = props[key]
    });
}

const computedEl = (el, val, obj) => {
    if (!el) {
        let parentEl = val && val.parent ? $(val.parent) : $("#app")
        el = document.createElement(val.tagName || 'div');
        parentEl.append(el)
    }
    computedStyle(el, val.style)
    computedElProps(el, val)
}

export {
    computedStyle,
    computedElProps,
    computedEl
}