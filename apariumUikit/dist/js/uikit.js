/*! UIkit 3.21.16 | https://www.getuikit.com | (c) 2014 - 2024 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('uikit', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkit = factory());
})(this, (function () { 'use strict';

    const { hasOwnProperty, toString } = Object.prototype;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize((str) => str.replace(hyphenateRe, "-$1").toLowerCase());
    const camelizeRe = /-(\w)/g;
    const camelize = memoize(
      (str) => (str.charAt(0).toLowerCase() + str.slice(1)).replace(camelizeRe, (_, c) => c.toUpperCase())
    );
    const ucfirst = memoize((str) => str.charAt(0).toUpperCase() + str.slice(1));
    function startsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.startsWith) == null ? void 0 : _a.call(str, search);
    }
    function endsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.endsWith) == null ? void 0 : _a.call(str, search);
    }
    function includes(obj, search) {
      var _a;
      return (_a = obj == null ? void 0 : obj.includes) == null ? void 0 : _a.call(obj, search);
    }
    function findIndex(array, predicate) {
      var _a;
      return (_a = array == null ? void 0 : array.findIndex) == null ? void 0 : _a.call(array, predicate);
    }
    const { isArray, from: toArray } = Array;
    const { assign } = Object;
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function isObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isPlainObject(obj) {
      return toString.call(obj) === "[object Object]";
    }
    function isWindow(obj) {
      return isObject(obj) && obj === obj.window;
    }
    function isDocument(obj) {
      return nodeType(obj) === 9;
    }
    function isNode(obj) {
      return nodeType(obj) >= 1;
    }
    function isElement(obj) {
      return nodeType(obj) === 1;
    }
    function nodeType(obj) {
      return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }
    function isBoolean(value) {
      return typeof value === "boolean";
    }
    function isString(value) {
      return typeof value === "string";
    }
    function isNumber(value) {
      return typeof value === "number";
    }
    function isNumeric(value) {
      return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isEmpty(obj) {
      return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
    }
    function isUndefined(value) {
      return value === void 0;
    }
    function toBoolean(value) {
      return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
    }
    function toNumber(value) {
      const number = Number(value);
      return isNaN(number) ? false : number;
    }
    function toFloat(value) {
      return parseFloat(value) || 0;
    }
    function toNode(element) {
      return element && toNodes(element)[0];
    }
    function toNodes(element) {
      return isNode(element) ? [element] : Array.from(element || []).filter(isNode);
    }
    function toWindow(element) {
      if (isWindow(element)) {
        return element;
      }
      element = toNode(element);
      const document = isDocument(element) ? element : element == null ? void 0 : element.ownerDocument;
      return (document == null ? void 0 : document.defaultView) || window;
    }
    function isEqual(value, other) {
      return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, (val, key) => val === other[key]);
    }
    function swap(value, a, b) {
      return value.replace(new RegExp(`${a}|${b}`, "g"), (match) => match === a ? b : a);
    }
    function last(array) {
      return array[array.length - 1];
    }
    function each(obj, cb) {
      for (const key in obj) {
        if (false === cb(obj[key], key)) {
          return false;
        }
      }
      return true;
    }
    function sortBy(array, prop) {
      return array.slice().sort(
        ({ [prop]: propA = 0 }, { [prop]: propB = 0 }) => propA > propB ? 1 : propB > propA ? -1 : 0
      );
    }
    function sumBy(array, iteratee) {
      return array.reduce(
        (sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]),
        0
      );
    }
    function uniqueBy(array, prop) {
      const seen = /* @__PURE__ */ new Set();
      return array.filter(({ [prop]: check }) => seen.has(check) ? false : seen.add(check));
    }
    function pick(obj, props) {
      return props.reduce((res, prop) => ({ ...res, [prop]: obj[prop] }), {});
    }
    function clamp(number, min = 0, max = 1) {
      return Math.min(Math.max(toNumber(number) || 0, min), max);
    }
    function noop() {
    }
    function intersectRect(...rects) {
      return [
        ["bottom", "top"],
        ["right", "left"]
      ].every(
        ([minProp, maxProp]) => Math.min(...rects.map(({ [minProp]: min }) => min)) - Math.max(...rects.map(({ [maxProp]: max }) => max)) > 0
      );
    }
    function pointInRect(point, rect) {
      return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
    }
    function ratio(dimensions, prop, value) {
      const aProp = prop === "width" ? "height" : "width";
      return {
        [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
        [prop]: value
      };
    }
    function contain(dimensions, maxDimensions) {
      dimensions = { ...dimensions };
      for (const prop in dimensions) {
        dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    function cover$1(dimensions, maxDimensions) {
      dimensions = contain(dimensions, maxDimensions);
      for (const prop in dimensions) {
        dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    const Dimensions = { ratio, contain, cover: cover$1 };
    function getIndex(i, elements, current = 0, finite = false) {
      elements = toNodes(elements);
      const { length } = elements;
      if (!length) {
        return -1;
      }
      i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : i === "last" ? length - 1 : elements.indexOf(toNode(i));
      if (finite) {
        return clamp(i, 0, length - 1);
      }
      i %= length;
      return i < 0 ? i + length : i;
    }
    function memoize(fn) {
      const cache = /* @__PURE__ */ Object.create(null);
      return (key, ...args) => cache[key] || (cache[key] = fn(key, ...args));
    }

    function addClass(element, ...classes) {
      for (const node of toNodes(element)) {
        const add = toClasses(classes).filter((cls) => !hasClass(node, cls));
        if (add.length) {
          node.classList.add(...add);
        }
      }
    }
    function removeClass(element, ...classes) {
      for (const node of toNodes(element)) {
        const remove = toClasses(classes).filter((cls) => hasClass(node, cls));
        if (remove.length) {
          node.classList.remove(...remove);
        }
      }
    }
    function replaceClass(element, oldClass, newClass) {
      newClass = toClasses(newClass);
      oldClass = toClasses(oldClass).filter((cls) => !includes(newClass, cls));
      removeClass(element, oldClass);
      addClass(element, newClass);
    }
    function hasClass(element, cls) {
      [cls] = toClasses(cls);
      return toNodes(element).some((node) => node.classList.contains(cls));
    }
    function toggleClass(element, cls, force) {
      const classes = toClasses(cls);
      if (!isUndefined(force)) {
        force = !!force;
      }
      for (const node of toNodes(element)) {
        for (const cls2 of classes) {
          node.classList.toggle(cls2, force);
        }
      }
    }
    function toClasses(str) {
      return str ? isArray(str) ? str.map(toClasses).flat() : String(str).split(" ").filter(Boolean) : [];
    }

    function attr(element, name, value) {
      var _a;
      if (isObject(name)) {
        for (const key in name) {
          attr(element, key, name[key]);
        }
        return;
      }
      if (isUndefined(value)) {
        return (_a = toNode(element)) == null ? void 0 : _a.getAttribute(name);
      } else {
        for (const el of toNodes(element)) {
          if (isFunction(value)) {
            value = value.call(el, attr(el, name));
          }
          if (value === null) {
            removeAttr(el, name);
          } else {
            el.setAttribute(name, value);
          }
        }
      }
    }
    function hasAttr(element, name) {
      return toNodes(element).some((element2) => element2.hasAttribute(name));
    }
    function removeAttr(element, name) {
      toNodes(element).forEach((element2) => element2.removeAttribute(name));
    }
    function data(element, attribute) {
      for (const name of [attribute, `data-${attribute}`]) {
        if (hasAttr(element, name)) {
          return attr(element, name);
        }
      }
    }

    const inBrowser = typeof window !== "undefined";
    const isRtl = inBrowser && document.dir === "rtl";
    const hasTouch = inBrowser && "ontouchstart" in window;
    const hasPointerEvents = inBrowser && window.PointerEvent;
    const pointerDown$1 = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove$1 = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp$1 = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
    const pointerEnter = hasPointerEvents ? "pointerenter" : hasTouch ? "" : "mouseenter";
    const pointerLeave = hasPointerEvents ? "pointerleave" : hasTouch ? "" : "mouseleave";
    const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";

    const voidElements = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    };
    function isVoidElement(element) {
      return toNodes(element).some((element2) => voidElements[element2.tagName.toLowerCase()]);
    }
    const isVisibleFn = inBrowser && Element.prototype.checkVisibility || function() {
      return this.offsetWidth || this.offsetHeight || this.getClientRects().length;
    };
    function isVisible(element) {
      return toNodes(element).some((element2) => isVisibleFn.call(element2));
    }
    const selInput = "input,select,textarea,button";
    function isInput(element) {
      return toNodes(element).some((element2) => matches(element2, selInput));
    }
    const selFocusable = `${selInput},a[href],[tabindex]`;
    function isFocusable(element) {
      return matches(element, selFocusable);
    }
    function parent(element) {
      var _a;
      return (_a = toNode(element)) == null ? void 0 : _a.parentElement;
    }
    function filter$1(element, selector) {
      return toNodes(element).filter((element2) => matches(element2, selector));
    }
    function matches(element, selector) {
      return toNodes(element).some((element2) => element2.matches(selector));
    }
    function parents(element, selector) {
      const elements = [];
      while (element = parent(element)) {
        if (!selector || matches(element, selector)) {
          elements.push(element);
        }
      }
      return elements;
    }
    function children(element, selector) {
      element = toNode(element);
      const children2 = element ? toArray(element.children) : [];
      return selector ? filter$1(children2, selector) : children2;
    }
    function index(element, ref) {
      return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }
    function isSameSiteAnchor(el) {
      el = toNode(el);
      return el && ["origin", "pathname", "search"].every((part) => el[part] === location[part]);
    }
    function getTargetedElement(el) {
      if (isSameSiteAnchor(el)) {
        const { hash, ownerDocument } = toNode(el);
        const id = decodeURIComponent(hash).slice(1);
        return id ? ownerDocument.getElementById(id) || ownerDocument.getElementsByName(id)[0] : ownerDocument.documentElement;
      }
    }

    function query(selector, context) {
      return find(selector, getContext(selector, context));
    }
    function queryAll(selector, context) {
      return findAll(selector, getContext(selector, context));
    }
    function find(selector, context) {
      return toNode(_query(selector, toNode(context), "querySelector"));
    }
    function findAll(selector, context) {
      return toNodes(_query(selector, toNode(context), "querySelectorAll"));
    }
    function getContext(selector, context = document) {
      return isDocument(context) || parseSelector(selector).isContextSelector ? context : context.ownerDocument;
    }
    const addStarRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
    const splitSelectorRe = /(\([^)]*\)|[^,])+/g;
    const parseSelector = memoize((selector) => {
      let isContextSelector = false;
      if (!selector || !isString(selector)) {
        return {};
      }
      const selectors = [];
      for (let sel of selector.match(splitSelectorRe)) {
        sel = sel.trim().replace(addStarRe, "$1 *");
        isContextSelector || (isContextSelector = ["!", "+", "~", "-", ">"].includes(sel[0]));
        selectors.push(sel);
      }
      return {
        selector: selectors.join(","),
        selectors,
        isContextSelector
      };
    });
    const positionRe = /(\([^)]*\)|\S)*/;
    const parsePositionSelector = memoize((selector) => {
      selector = selector.slice(1).trim();
      const [position] = selector.match(positionRe);
      return [position, selector.slice(position.length + 1)];
    });
    function _query(selector, context = document, queryFn) {
      const parsed = parseSelector(selector);
      if (!parsed.isContextSelector) {
        return parsed.selector ? _doQuery(context, queryFn, parsed.selector) : selector;
      }
      selector = "";
      const isSingle = parsed.selectors.length === 1;
      for (let sel of parsed.selectors) {
        let positionSel;
        let ctx = context;
        if (sel[0] === "!") {
          [positionSel, sel] = parsePositionSelector(sel);
          ctx = context.parentElement.closest(positionSel);
          if (!sel && isSingle) {
            return ctx;
          }
        }
        if (ctx && sel[0] === "-") {
          [positionSel, sel] = parsePositionSelector(sel);
          ctx = ctx.previousElementSibling;
          ctx = matches(ctx, positionSel) ? ctx : null;
          if (!sel && isSingle) {
            return ctx;
          }
        }
        if (!ctx) {
          continue;
        }
        if (isSingle) {
          if (sel[0] === "~" || sel[0] === "+") {
            sel = `:scope > :nth-child(${index(ctx) + 1}) ${sel}`;
            ctx = ctx.parentElement;
          } else if (sel[0] === ">") {
            sel = `:scope ${sel}`;
          }
          return _doQuery(ctx, queryFn, sel);
        }
        selector += `${selector ? "," : ""}${domPath(ctx)} ${sel}`;
      }
      if (!isDocument(context)) {
        context = context.ownerDocument;
      }
      return _doQuery(context, queryFn, selector);
    }
    function _doQuery(context, queryFn, selector) {
      try {
        return context[queryFn](selector);
      } catch (e) {
        return null;
      }
    }
    function domPath(element) {
      const names = [];
      while (element.parentNode) {
        const id = attr(element, "id");
        if (id) {
          names.unshift(`#${escape(id)}`);
          break;
        } else {
          let { tagName } = element;
          if (tagName !== "HTML") {
            tagName += `:nth-child(${index(element) + 1})`;
          }
          names.unshift(tagName);
          element = element.parentNode;
        }
      }
      return names.join(" > ");
    }
    function escape(css) {
      return isString(css) ? CSS.escape(css) : "";
    }

    function on(...args) {
      let [targets, types, selector, listener, useCapture = false] = getArgs(args);
      if (listener.length > 1) {
        listener = detail(listener);
      }
      if (useCapture == null ? void 0 : useCapture.self) {
        listener = selfFilter(listener);
      }
      if (selector) {
        listener = delegate(selector, listener);
      }
      for (const type of types) {
        for (const target of targets) {
          target.addEventListener(type, listener, useCapture);
        }
      }
      return () => off(targets, types, listener, useCapture);
    }
    function off(...args) {
      let [targets, types, , listener, useCapture = false] = getArgs(args);
      for (const type of types) {
        for (const target of targets) {
          target.removeEventListener(type, listener, useCapture);
        }
      }
    }
    function once(...args) {
      const [element, types, selector, listener, useCapture = false, condition] = getArgs(args);
      const off2 = on(
        element,
        types,
        selector,
        (e) => {
          const result = !condition || condition(e);
          if (result) {
            off2();
            listener(e, result);
          }
        },
        useCapture
      );
      return off2;
    }
    function trigger(targets, event, detail2) {
      return toEventTargets(targets).every(
        (target) => target.dispatchEvent(createEvent(event, true, true, detail2))
      );
    }
    function createEvent(e, bubbles = true, cancelable = false, detail2) {
      if (isString(e)) {
        e = new CustomEvent(e, { bubbles, cancelable, detail: detail2 });
      }
      return e;
    }
    function getArgs(args) {
      args[0] = toEventTargets(args[0]);
      if (isString(args[1])) {
        args[1] = args[1].split(" ");
      }
      if (isFunction(args[2])) {
        args.splice(2, 0, false);
      }
      return args;
    }
    function delegate(selector, listener) {
      return (e) => {
        const current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().find((element) => element.contains(e.target)) : e.target.closest(selector);
        if (current) {
          e.current = current;
          listener.call(this, e);
          delete e.current;
        }
      };
    }
    function detail(listener) {
      return (e) => isArray(e.detail) ? listener(e, ...e.detail) : listener(e);
    }
    function selfFilter(listener) {
      return function(e) {
        if (e.target === e.currentTarget || e.target === e.current) {
          return listener.call(null, e);
        }
      };
    }
    function isEventTarget(target) {
      return target && "addEventListener" in target;
    }
    function toEventTarget(target) {
      return isEventTarget(target) ? target : toNode(target);
    }
    function toEventTargets(target) {
      return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
    }
    function isTouch(e) {
      return e.pointerType === "touch" || !!e.touches;
    }
    function getEventPos(e) {
      var _a, _b;
      const { clientX: x, clientY: y } = ((_a = e.touches) == null ? void 0 : _a[0]) || ((_b = e.changedTouches) == null ? void 0 : _b[0]) || e;
      return { x, y };
    }

    const cssNumber = {
      "animation-iteration-count": true,
      "column-count": true,
      "fill-opacity": true,
      "flex-grow": true,
      "flex-shrink": true,
      "font-weight": true,
      "line-height": true,
      opacity: true,
      order: true,
      orphans: true,
      "stroke-dasharray": true,
      "stroke-dashoffset": true,
      widows: true,
      "z-index": true,
      zoom: true
    };
    function css(element, property, value, priority) {
      const elements = toNodes(element);
      for (const element2 of elements) {
        if (isString(property)) {
          property = propName(property);
          if (isUndefined(value)) {
            return getComputedStyle(element2).getPropertyValue(property);
          } else {
            element2.style.setProperty(
              property,
              isNumeric(value) && !cssNumber[property] ? `${value}px` : value || isNumber(value) ? value : "",
              priority
            );
          }
        } else if (isArray(property)) {
          const props = {};
          for (const prop of property) {
            props[prop] = css(element2, prop);
          }
          return props;
        } else if (isObject(property)) {
          for (const prop in property) {
            css(element2, prop, property[prop], value);
          }
        }
      }
      return elements[0];
    }
    const propName = memoize((name) => {
      if (startsWith(name, "--")) {
        return name;
      }
      name = hyphenate(name);
      const { style } = document.documentElement;
      if (name in style) {
        return name;
      }
      for (const prefix of ["webkit", "moz"]) {
        const prefixedName = `-${prefix}-${name}`;
        if (prefixedName in style) {
          return prefixedName;
        }
      }
    });

    const clsTransition = "uk-transition";
    const transitionEnd = "transitionend";
    const transitionCanceled = "transitioncanceled";
    function transition$1(element, props, duration = 400, timing = "linear") {
      duration = Math.round(duration);
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            for (const name in props) {
              css(element2, name);
            }
            const timer = setTimeout(() => trigger(element2, transitionEnd), duration);
            once(
              element2,
              [transitionEnd, transitionCanceled],
              ({ type }) => {
                clearTimeout(timer);
                removeClass(element2, clsTransition);
                css(element2, {
                  transitionProperty: "",
                  transitionDuration: "",
                  transitionTimingFunction: ""
                });
                type === transitionCanceled ? reject() : resolve(element2);
              },
              { self: true }
            );
            addClass(element2, clsTransition);
            css(element2, {
              transitionProperty: Object.keys(props).map(propName).join(","),
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: timing,
              ...props
            });
          })
        )
      );
    }
    const Transition = {
      start: transition$1,
      async stop(element) {
        trigger(element, transitionEnd);
        await Promise.resolve();
      },
      async cancel(element) {
        trigger(element, transitionCanceled);
        await Promise.resolve();
      },
      inProgress(element) {
        return hasClass(element, clsTransition);
      }
    };
    const clsAnimation = "uk-animation";
    const animationEnd = "animationend";
    const animationCanceled = "animationcanceled";
    function animate$2(element, animation, duration = 200, origin, out) {
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            if (hasClass(element2, clsAnimation)) {
              trigger(element2, animationCanceled);
            }
            const classes = [
              animation,
              clsAnimation,
              `${clsAnimation}-${out ? "leave" : "enter"}`,
              origin && `uk-transform-origin-${origin}`,
              out && `${clsAnimation}-reverse`
            ];
            const timer = setTimeout(() => trigger(element2, animationEnd), duration);
            once(
              element2,
              [animationEnd, animationCanceled],
              ({ type }) => {
                clearTimeout(timer);
                type === animationCanceled ? reject() : resolve(element2);
                css(element2, "animationDuration", "");
                removeClass(element2, classes);
              },
              { self: true }
            );
            css(element2, "animationDuration", `${duration}ms`);
            addClass(element2, classes);
          })
        )
      );
    }
    const Animation = {
      in: animate$2,
      out(element, animation, duration, origin) {
        return animate$2(element, animation, duration, origin, true);
      },
      inProgress(element) {
        return hasClass(element, clsAnimation);
      },
      cancel(element) {
        trigger(element, animationCanceled);
      }
    };

    function ready(fn) {
      if (document.readyState !== "loading") {
        fn();
        return;
      }
      once(document, "DOMContentLoaded", fn);
    }
    function isTag(element, ...tagNames) {
      return tagNames.some((tagName) => {
        var _a;
        return ((_a = element == null ? void 0 : element.tagName) == null ? void 0 : _a.toLowerCase()) === tagName.toLowerCase();
      });
    }
    function empty(element) {
      element = $(element);
      if (element) {
        element.innerHTML = "";
      }
      return element;
    }
    function html(parent2, html2) {
      return isUndefined(html2) ? $(parent2).innerHTML : append(empty(parent2), html2);
    }
    const prepend = applyFn("prepend");
    const append = applyFn("append");
    const before = applyFn("before");
    const after = applyFn("after");
    function applyFn(fn) {
      return function(ref, element) {
        var _a;
        const nodes = toNodes(isString(element) ? fragment(element) : element);
        (_a = $(ref)) == null ? void 0 : _a[fn](...nodes);
        return unwrapSingle(nodes);
      };
    }
    function remove$1(element) {
      toNodes(element).forEach((element2) => element2.remove());
    }
    function wrapAll(element, structure) {
      structure = toNode(before(element, structure));
      while (structure.firstElementChild) {
        structure = structure.firstElementChild;
      }
      append(structure, element);
      return structure;
    }
    function wrapInner(element, structure) {
      return toNodes(
        toNodes(element).map(
          (element2) => element2.hasChildNodes() ? wrapAll(toArray(element2.childNodes), structure) : append(element2, structure)
        )
      );
    }
    function unwrap(element) {
      toNodes(element).map(parent).filter((value, index, self) => self.indexOf(value) === index).forEach((parent2) => parent2.replaceWith(...parent2.childNodes));
    }
    const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    function fragment(html2) {
      const matches = singleTagRe.exec(html2);
      if (matches) {
        return document.createElement(matches[1]);
      }
      const container = document.createElement("template");
      container.innerHTML = html2.trim();
      return unwrapSingle(container.content.childNodes);
    }
    function unwrapSingle(nodes) {
      return nodes.length > 1 ? nodes : nodes[0];
    }
    function apply(node, fn) {
      if (!isElement(node)) {
        return;
      }
      fn(node);
      node = node.firstElementChild;
      while (node) {
        apply(node, fn);
        node = node.nextElementSibling;
      }
    }
    function $(selector, context) {
      return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
    }
    function $$(selector, context) {
      return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
      return isString(str) && startsWith(str.trim(), "<");
    }

    const dirs$1 = {
      width: ["left", "right"],
      height: ["top", "bottom"]
    };
    function dimensions$1(element) {
      const rect = isElement(element) ? toNode(element).getBoundingClientRect() : { height: height(element), width: width(element), top: 0, left: 0 };
      return {
        height: rect.height,
        width: rect.width,
        top: rect.top,
        left: rect.left,
        bottom: rect.top + rect.height,
        right: rect.left + rect.width
      };
    }
    function offset(element, coordinates) {
      if (coordinates) {
        css(element, { left: 0, top: 0 });
      }
      const currentOffset = dimensions$1(element);
      if (element) {
        const { scrollY, scrollX } = toWindow(element);
        const offsetBy = { height: scrollY, width: scrollX };
        for (const dir in dirs$1) {
          for (const prop of dirs$1[dir]) {
            currentOffset[prop] += offsetBy[dir];
          }
        }
      }
      if (!coordinates) {
        return currentOffset;
      }
      for (const prop of ["left", "top"]) {
        css(element, prop, coordinates[prop] - currentOffset[prop]);
      }
    }
    function position(element) {
      let { top, left } = offset(element);
      const {
        ownerDocument: { body, documentElement },
        offsetParent
      } = toNode(element);
      let parent = offsetParent || documentElement;
      while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
        parent = parent.parentNode;
      }
      if (isElement(parent)) {
        const parentOffset = offset(parent);
        top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
        left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
      }
      return {
        top: top - toFloat(css(element, "marginTop")),
        left: left - toFloat(css(element, "marginLeft"))
      };
    }
    function offsetPosition(element) {
      element = toNode(element);
      const offset2 = [element.offsetTop, element.offsetLeft];
      while (element = element.offsetParent) {
        offset2[0] += element.offsetTop + toFloat(css(element, `borderTopWidth`));
        offset2[1] += element.offsetLeft + toFloat(css(element, `borderLeftWidth`));
        if (css(element, "position") === "fixed") {
          const win = toWindow(element);
          offset2[0] += win.scrollY;
          offset2[1] += win.scrollX;
          return offset2;
        }
      }
      return offset2;
    }
    const height = dimension("height");
    const width = dimension("width");
    function dimension(prop) {
      const propName = ucfirst(prop);
      return (element, value) => {
        if (isUndefined(value)) {
          if (isWindow(element)) {
            return element[`inner${propName}`];
          }
          if (isDocument(element)) {
            const doc = element.documentElement;
            return Math.max(doc[`offset${propName}`], doc[`scroll${propName}`]);
          }
          element = toNode(element);
          value = css(element, prop);
          value = value === "auto" ? element[`offset${propName}`] : toFloat(value) || 0;
          return value - boxModelAdjust(element, prop);
        } else {
          return css(
            element,
            prop,
            !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px"
          );
        }
      };
    }
    function boxModelAdjust(element, prop, sizing = "border-box") {
      return css(element, "boxSizing") === sizing ? sumBy(
        dirs$1[prop],
        (prop2) => toFloat(css(element, `padding-${prop2}`)) + toFloat(css(element, `border-${prop2}-width`))
      ) : 0;
    }
    function flipPosition(pos) {
      for (const dir in dirs$1) {
        for (const i in dirs$1[dir]) {
          if (dirs$1[dir][i] === pos) {
            return dirs$1[dir][1 - i];
          }
        }
      }
      return pos;
    }
    function toPx(value, property = "width", element = window, offsetDim = false) {
      if (!isString(value)) {
        return toFloat(value);
      }
      return sumBy(parseCalc(value), (value2) => {
        const unit = parseUnit(value2);
        return unit ? percent(
          unit === "vh" ? getViewportHeight() : unit === "vw" ? width(toWindow(element)) : offsetDim ? element[`offset${ucfirst(property)}`] : dimensions$1(element)[property],
          value2
        ) : value2;
      });
    }
    const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
    const parseCalc = memoize((calc) => calc.toString().replace(/\s/g, "").match(calcRe) || []);
    const unitRe$1 = /(?:v[hw]|%)$/;
    const parseUnit = memoize((str) => (str.match(unitRe$1) || [])[0]);
    function percent(base, value) {
      return base * toFloat(value) / 100;
    }
    let vh;
    let vhEl;
    function getViewportHeight() {
      if (vh) {
        return vh;
      }
      if (!vhEl) {
        vhEl = $("<div>");
        css(vhEl, {
          height: "100vh",
          position: "fixed"
        });
        on(window, "resize", () => vh = null);
      }
      append(document.body, vhEl);
      vh = vhEl.clientHeight;
      remove$1(vhEl);
      return vh;
    }

    const fastdom = { read, write, clear, flush };
    const reads = [];
    const writes = [];
    function read(task) {
      reads.push(task);
      scheduleFlush();
      return task;
    }
    function write(task) {
      writes.push(task);
      scheduleFlush();
      return task;
    }
    function clear(task) {
      remove(reads, task);
      remove(writes, task);
    }
    let scheduled = false;
    function flush() {
      runTasks(reads);
      runTasks(writes.splice(0));
      scheduled = false;
      if (reads.length || writes.length) {
        scheduleFlush();
      }
    }
    function scheduleFlush() {
      if (!scheduled) {
        scheduled = true;
        queueMicrotask(flush);
      }
    }
    function runTasks(tasks) {
      let task;
      while (task = tasks.shift()) {
        try {
          task();
        } catch (e) {
          console.error(e);
        }
      }
    }
    function remove(array, item) {
      const index = array.indexOf(item);
      return ~index && array.splice(index, 1);
    }

    class MouseTracker {
      init() {
        this.positions = [];
        let position;
        this.unbind = on(document, "mousemove", (e) => position = getEventPos(e));
        this.interval = setInterval(() => {
          if (!position) {
            return;
          }
          this.positions.push(position);
          if (this.positions.length > 5) {
            this.positions.shift();
          }
        }, 50);
      }
      cancel() {
        var _a;
        (_a = this.unbind) == null ? void 0 : _a.call(this);
        clearInterval(this.interval);
      }
      movesTo(target) {
        if (!this.positions || this.positions.length < 2) {
          return false;
        }
        const p = dimensions$1(target);
        const { left, right, top, bottom } = p;
        const [prevPosition] = this.positions;
        const position = last(this.positions);
        const path = [prevPosition, position];
        if (pointInRect(position, p)) {
          return false;
        }
        const diagonals = [
          [
            { x: left, y: top },
            { x: right, y: bottom }
          ],
          [
            { x: left, y: bottom },
            { x: right, y: top }
          ]
        ];
        return diagonals.some((diagonal) => {
          const intersection = intersect(path, diagonal);
          return intersection && pointInRect(intersection, p);
        });
      }
    }
    function intersect([{ x: x1, y: y1 }, { x: x2, y: y2 }], [{ x: x3, y: y3 }, { x: x4, y: y4 }]) {
      const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
      if (denominator === 0) {
        return false;
      }
      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      if (ua < 0) {
        return false;
      }
      return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) };
    }

    function observeIntersection(targets, cb, options = {}, { intersecting = true } = {}) {
      const observer = new IntersectionObserver(
        intersecting ? (entries, observer2) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            cb(entries, observer2);
          }
        } : cb,
        options
      );
      for (const el of toNodes(targets)) {
        observer.observe(el);
      }
      return observer;
    }
    const hasResizeObserver = inBrowser && window.ResizeObserver;
    function observeResize(targets, cb, options = { box: "border-box" }) {
      if (hasResizeObserver) {
        return observe$1(ResizeObserver, targets, cb, options);
      }
      const off = [on(window, "load resize", cb), on(document, "loadedmetadata load", cb, true)];
      return { disconnect: () => off.map((cb2) => cb2()) };
    }
    function observeViewportResize(cb) {
      return { disconnect: on([window, window.visualViewport], "resize", cb) };
    }
    function observeMutation(targets, cb, options) {
      return observe$1(MutationObserver, targets, cb, options);
    }
    function observe$1(Observer, targets, cb, options) {
      const observer = new Observer(cb);
      for (const el of toNodes(targets)) {
        observer.observe(el, options);
      }
      return observer;
    }

    function play(el) {
      if (isIFrame(el)) {
        call(el, { func: "playVideo", method: "play" });
      }
      if (isHTML5(el)) {
        el.play().catch(noop);
      }
    }
    function pause(el) {
      if (isIFrame(el)) {
        call(el, { func: "pauseVideo", method: "pause" });
      }
      if (isHTML5(el)) {
        el.pause();
      }
    }
    function mute(el) {
      if (isIFrame(el)) {
        call(el, { func: "mute", method: "setVolume", value: 0 });
      }
      if (isHTML5(el)) {
        el.muted = true;
      }
    }
    function isHTML5(el) {
      return isTag(el, "video");
    }
    function isIFrame(el) {
      return isTag(el, "iframe") && (isYoutube(el) || isVimeo(el));
    }
    function isYoutube(el) {
      return !!el.src.match(
        /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/
      );
    }
    function isVimeo(el) {
      return !!el.src.match(/vimeo\.com\/video\/.*/);
    }
    async function call(el, cmd) {
      await enableApi(el);
      post(el, cmd);
    }
    function post(el, cmd) {
      el.contentWindow.postMessage(JSON.stringify({ event: "command", ...cmd }), "*");
    }
    const stateKey = "_ukPlayer";
    let counter = 0;
    function enableApi(el) {
      if (el[stateKey]) {
        return el[stateKey];
      }
      const youtube = isYoutube(el);
      const vimeo = isVimeo(el);
      const id = ++counter;
      let poller;
      return el[stateKey] = new Promise((resolve) => {
        youtube && once(el, "load", () => {
          const listener = () => post(el, { event: "listening", id });
          poller = setInterval(listener, 100);
          listener();
        });
        once(window, "message", resolve, false, ({ data }) => {
          try {
            data = JSON.parse(data);
            return youtube && (data == null ? void 0 : data.id) === id && data.event === "onReady" || vimeo && Number(data == null ? void 0 : data.player_id) === id;
          } catch (e) {
          }
        });
        el.src = `${el.src}${includes(el.src, "?") ? "&" : "?"}${youtube ? "enablejsapi=1" : `api=1&player_id=${id}`}`;
      }).then(() => clearInterval(poller));
    }

    function isInView(element, offsetTop = 0, offsetLeft = 0) {
      if (!isVisible(element)) {
        return false;
      }
      return intersectRect(
        ...overflowParents(element).map((parent2) => {
          const { top, left, bottom, right } = offsetViewport(parent2);
          return {
            top: top - offsetTop,
            left: left - offsetLeft,
            bottom: bottom + offsetTop,
            right: right + offsetLeft
          };
        }).concat(offset(element))
      );
    }
    function scrollIntoView(element, { offset: offsetBy = 0 } = {}) {
      const parents2 = isVisible(element) ? scrollParents(element, false, ["hidden"]) : [];
      return parents2.reduce(
        (fn, scrollElement, i) => {
          const { scrollTop, scrollHeight, offsetHeight } = scrollElement;
          const viewport = offsetViewport(scrollElement);
          const maxScroll = scrollHeight - viewport.height;
          const { height: elHeight, top: elTop } = parents2[i - 1] ? offsetViewport(parents2[i - 1]) : offset(element);
          let top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
          if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
            top += offsetBy;
          } else {
            offsetBy = 0;
          }
          if (top > maxScroll) {
            offsetBy -= top - maxScroll;
            top = maxScroll;
          } else if (top < 0) {
            offsetBy -= top;
            top = 0;
          }
          return () => scrollTo(scrollElement, top - scrollTop, element, maxScroll).then(fn);
        },
        () => Promise.resolve()
      )();
      function scrollTo(element2, top, targetEl, maxScroll) {
        return new Promise((resolve) => {
          const scroll = element2.scrollTop;
          const duration = getDuration(Math.abs(top));
          const start = Date.now();
          const isScrollingElement = scrollingElement(element2) === element2;
          const targetTop = offset(targetEl).top + (isScrollingElement ? 0 : scroll);
          let prev = 0;
          let frames = 15;
          (function step() {
            const percent = ease(clamp((Date.now() - start) / duration));
            let diff = 0;
            if (parents2[0] === element2 && scroll + top < maxScroll) {
              diff = offset(targetEl).top + (isScrollingElement ? 0 : element2.scrollTop) - targetTop - dimensions$1(getCoveringElement(targetEl)).height;
            }
            if (css(element2, "scrollBehavior") !== "auto") {
              css(element2, "scrollBehavior", "auto");
            }
            element2.scrollTop = scroll + (top + diff) * percent;
            css(element2, "scrollBehavior", "");
            if (percent === 1 && (prev === diff || !frames--)) {
              resolve();
            } else {
              prev = diff;
              requestAnimationFrame(step);
            }
          })();
        });
      }
      function getDuration(dist) {
        return 40 * Math.pow(dist, 0.375);
      }
      function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      }
    }
    function scrolledOver(element, startOffset = 0, endOffset = 0) {
      if (!isVisible(element)) {
        return 0;
      }
      const scrollElement = scrollParent(element, true);
      const { scrollHeight, scrollTop } = scrollElement;
      const { height: viewportHeight } = offsetViewport(scrollElement);
      const maxScroll = scrollHeight - viewportHeight;
      const elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
      const start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
      const end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
      return start < end ? clamp((scrollTop - start) / (end - start)) : 1;
    }
    function scrollParents(element, scrollable = false, props = []) {
      const scrollEl = scrollingElement(element);
      let ancestors = parents(element).reverse();
      ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
      const fixedIndex = findIndex(ancestors, (el) => css(el, "position") === "fixed");
      if (~fixedIndex) {
        ancestors = ancestors.slice(fixedIndex);
      }
      return [scrollEl].concat(
        ancestors.filter(
          (parent2) => css(parent2, "overflow").split(" ").some((prop) => includes(["auto", "scroll", ...props], prop)) && (!scrollable || parent2.scrollHeight > offsetViewport(parent2).height)
        )
      ).reverse();
    }
    function scrollParent(...args) {
      return scrollParents(...args)[0];
    }
    function overflowParents(element) {
      return scrollParents(element, false, ["hidden", "clip"]);
    }
    function offsetViewport(scrollElement) {
      const window = toWindow(scrollElement);
      const documentScrollingElement = scrollingElement(scrollElement);
      const useWindow = !isNode(scrollElement) || scrollElement.contains(documentScrollingElement);
      if (useWindow && window.visualViewport) {
        let { height, width, scale, pageTop: top, pageLeft: left } = window.visualViewport;
        height = Math.round(height * scale);
        width = Math.round(width * scale);
        return { height, width, top, left, bottom: top + height, right: left + width };
      }
      let rect = offset(useWindow ? window : scrollElement);
      if (css(scrollElement, "display") === "inline") {
        return rect;
      }
      const { body, documentElement } = window.document;
      const viewportElement = useWindow ? documentScrollingElement === documentElement || // In quirks mode the scrolling element is body, even though the viewport is html
      documentScrollingElement.clientHeight < body.clientHeight ? documentScrollingElement : body : scrollElement;
      for (let [prop, dir, start, end] of [
        ["width", "x", "left", "right"],
        ["height", "y", "top", "bottom"]
      ]) {
        const subpixel = rect[prop] % 1;
        rect[start] += toFloat(css(viewportElement, `border-${start}-width`));
        rect[prop] = rect[dir] = viewportElement[`client${ucfirst(prop)}`] - (subpixel ? subpixel < 0.5 ? -subpixel : 1 - subpixel : 0);
        rect[end] = rect[prop] + rect[start];
      }
      return rect;
    }
    function getCoveringElement(target) {
      const { left, width, top } = dimensions$1(target);
      for (const position of top ? [0, top] : [0]) {
        let coverEl;
        for (const el of toWindow(target).document.elementsFromPoint(left + width / 2, position)) {
          if (!el.contains(target) && // If e.g. Offcanvas is not yet closed
          !hasClass(el, "uk-togglable-leave") && (hasPosition(el, "fixed") && zIndex(
            parents(target).reverse().find(
              (parent2) => !parent2.contains(el) && !hasPosition(parent2, "static")
            )
          ) < zIndex(el) || hasPosition(el, "sticky") && parent(el).contains(target)) && (!coverEl || dimensions$1(coverEl).height < dimensions$1(el).height)) {
            coverEl = el;
          }
        }
        if (coverEl) {
          return coverEl;
        }
      }
    }
    function zIndex(element) {
      return toFloat(css(element, "zIndex"));
    }
    function hasPosition(element, position) {
      return css(element, "position") === position;
    }
    function scrollingElement(element) {
      return toWindow(element).document.scrollingElement;
    }

    const dirs = [
      ["width", "x", "left", "right"],
      ["height", "y", "top", "bottom"]
    ];
    function positionAt(element, target, options) {
      options = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        placement: [],
        ...options
      };
      if (!isArray(target)) {
        target = [target, target];
      }
      offset(element, getPosition(element, target, options));
    }
    function getPosition(element, target, options) {
      const position = attachTo(element, target, options);
      const { boundary, viewportOffset = 0, placement } = options;
      let offsetPosition = position;
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const viewport = getViewport$2(element, target[i], viewportOffset, boundary, i);
        if (isWithin(position, viewport, i)) {
          continue;
        }
        let offsetBy = 0;
        if (placement[i] === "flip") {
          const attach = options.attach.target[i];
          if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
            continue;
          }
          offsetBy = flip(element, target, options, i)[start] - position[start];
          const scrollArea = getScrollArea(element, target[i], viewportOffset, i);
          if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
            if (isWithin(position, scrollArea, i)) {
              continue;
            }
            if (options.recursion) {
              return false;
            }
            const newPos = flipAxis(element, target, options);
            if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
              return newPos;
            }
            continue;
          }
        } else if (placement[i] === "shift") {
          const targetDim = offset(target[i]);
          const { offset: elOffset } = options;
          offsetBy = clamp(
            clamp(position[start], viewport[start], viewport[end] - position[prop]),
            targetDim[start] - position[prop] + elOffset[i],
            targetDim[end] - elOffset[i]
          ) - position[start];
        }
        offsetPosition = applyOffset(offsetPosition, offsetBy, i);
      }
      return offsetPosition;
    }
    function attachTo(element, target, options) {
      let { attach, offset: offsetBy } = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        ...options
      };
      let elOffset = offset(element);
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
        elOffset = applyOffset(
          elOffset,
          targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i],
          i
        );
      }
      return elOffset;
    }
    function applyOffset(position, offset2, i) {
      const [, dir, start, end] = dirs[i];
      const newPos = { ...position };
      newPos[start] = position[dir] = position[start] + offset2;
      newPos[end] += offset2;
      return newPos;
    }
    function moveBy(attach, end, dim) {
      return attach === "center" ? dim / 2 : attach === end ? dim : 0;
    }
    function getViewport$2(element, target, viewportOffset, boundary, i) {
      let viewport = getIntersectionArea(...commonScrollParents(element, target).map(offsetViewport));
      if (viewportOffset) {
        viewport[dirs[i][2]] += viewportOffset;
        viewport[dirs[i][3]] -= viewportOffset;
      }
      if (boundary) {
        viewport = getIntersectionArea(
          viewport,
          offset(isArray(boundary) ? boundary[i] : boundary)
        );
      }
      return viewport;
    }
    function getScrollArea(element, target, viewportOffset, i) {
      const [prop, axis, start, end] = dirs[i];
      const [scrollElement] = commonScrollParents(element, target);
      const viewport = offsetViewport(scrollElement);
      if (["auto", "scroll"].includes(css(scrollElement, `overflow-${axis}`))) {
        viewport[start] -= scrollElement[`scroll${ucfirst(start)}`];
        viewport[end] = viewport[start] + scrollElement[`scroll${ucfirst(prop)}`];
      }
      viewport[start] += viewportOffset;
      viewport[end] -= viewportOffset;
      return viewport;
    }
    function commonScrollParents(element, target) {
      return overflowParents(target).filter((parent) => parent.contains(element));
    }
    function getIntersectionArea(...rects) {
      let area = {};
      for (const rect of rects) {
        for (const [, , start, end] of dirs) {
          area[start] = Math.max(area[start] || 0, rect[start]);
          area[end] = Math.min(...[area[end], rect[end]].filter(Boolean));
        }
      }
      return area;
    }
    function isWithin(positionA, positionB, i) {
      const [, , start, end] = dirs[i];
      return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
    }
    function flip(element, target, { offset: offset2, attach }, i) {
      return attachTo(element, target, {
        attach: {
          element: flipAttach(attach.element, i),
          target: flipAttach(attach.target, i)
        },
        offset: flipOffset(offset2, i)
      });
    }
    function flipAxis(element, target, options) {
      return getPosition(element, target, {
        ...options,
        attach: {
          element: options.attach.element.map(flipAttachAxis).reverse(),
          target: options.attach.target.map(flipAttachAxis).reverse()
        },
        offset: options.offset.reverse(),
        placement: options.placement.reverse(),
        recursion: true
      });
    }
    function flipAttach(attach, i) {
      const newAttach = [...attach];
      const index = dirs[i].indexOf(attach[i]);
      if (~index) {
        newAttach[i] = dirs[i][1 - index % 2 + 2];
      }
      return newAttach;
    }
    function flipAttachAxis(prop) {
      for (let i = 0; i < dirs.length; i++) {
        const index = dirs[i].indexOf(prop);
        if (~index) {
          return dirs[1 - i][index % 2 + 2];
        }
      }
    }
    function flipOffset(offset2, i) {
      offset2 = [...offset2];
      offset2[i] *= -1;
      return offset2;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $: $,
        $$: $$,
        Animation: Animation,
        Dimensions: Dimensions,
        MouseTracker: MouseTracker,
        Transition: Transition,
        addClass: addClass,
        after: after,
        append: append,
        apply: apply,
        assign: assign,
        attr: attr,
        before: before,
        boxModelAdjust: boxModelAdjust,
        camelize: camelize,
        children: children,
        clamp: clamp,
        createEvent: createEvent,
        css: css,
        data: data,
        dimensions: dimensions$1,
        each: each,
        empty: empty,
        endsWith: endsWith,
        escape: escape,
        fastdom: fastdom,
        filter: filter$1,
        find: find,
        findAll: findAll,
        findIndex: findIndex,
        flipPosition: flipPosition,
        fragment: fragment,
        getCoveringElement: getCoveringElement,
        getEventPos: getEventPos,
        getIndex: getIndex,
        getTargetedElement: getTargetedElement,
        hasAttr: hasAttr,
        hasClass: hasClass,
        hasOwn: hasOwn,
        hasTouch: hasTouch,
        height: height,
        html: html,
        hyphenate: hyphenate,
        inBrowser: inBrowser,
        includes: includes,
        index: index,
        intersectRect: intersectRect,
        isArray: isArray,
        isBoolean: isBoolean,
        isDocument: isDocument,
        isElement: isElement,
        isEmpty: isEmpty,
        isEqual: isEqual,
        isFocusable: isFocusable,
        isFunction: isFunction,
        isInView: isInView,
        isInput: isInput,
        isNode: isNode,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isRtl: isRtl,
        isSameSiteAnchor: isSameSiteAnchor,
        isString: isString,
        isTag: isTag,
        isTouch: isTouch,
        isUndefined: isUndefined,
        isVisible: isVisible,
        isVoidElement: isVoidElement,
        isWindow: isWindow,
        last: last,
        matches: matches,
        memoize: memoize,
        mute: mute,
        noop: noop,
        observeIntersection: observeIntersection,
        observeMutation: observeMutation,
        observeResize: observeResize,
        observeViewportResize: observeViewportResize,
        off: off,
        offset: offset,
        offsetPosition: offsetPosition,
        offsetViewport: offsetViewport,
        on: on,
        once: once,
        overflowParents: overflowParents,
        parent: parent,
        parents: parents,
        pause: pause,
        pick: pick,
        play: play,
        pointInRect: pointInRect,
        pointerCancel: pointerCancel,
        pointerDown: pointerDown$1,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerMove: pointerMove$1,
        pointerUp: pointerUp$1,
        position: position,
        positionAt: positionAt,
        prepend: prepend,
        propName: propName,
        query: query,
        queryAll: queryAll,
        ready: ready,
        remove: remove$1,
        removeAttr: removeAttr,
        removeClass: removeClass,
        replaceClass: replaceClass,
        scrollIntoView: scrollIntoView,
        scrollParent: scrollParent,
        scrollParents: scrollParents,
        scrolledOver: scrolledOver,
        selFocusable: selFocusable,
        selInput: selInput,
        sortBy: sortBy,
        startsWith: startsWith,
        sumBy: sumBy,
        swap: swap,
        toArray: toArray,
        toBoolean: toBoolean,
        toEventTargets: toEventTargets,
        toFloat: toFloat,
        toNode: toNode,
        toNodes: toNodes,
        toNumber: toNumber,
        toPx: toPx,
        toWindow: toWindow,
        toggleClass: toggleClass,
        trigger: trigger,
        ucfirst: ucfirst,
        uniqueBy: uniqueBy,
        unwrap: unwrap,
        width: width,
        wrapAll: wrapAll,
        wrapInner: wrapInner
    });

    var Class = {
      connected() {
        addClass(this.$el, this.$options.id);
      }
    };

    const units = ["days", "hours", "minutes", "seconds"];
    var countdown = {
      mixins: [Class],
      props: {
        date: String,
        clsWrapper: String,
        role: String
      },
      data: {
        date: "",
        clsWrapper: ".uk-countdown-%unit%",
        role: "timer"
      },
      connected() {
        attr(this.$el, "role", this.role);
        this.date = toFloat(Date.parse(this.$props.date));
        this.end = false;
        this.start();
      },
      disconnected() {
        this.stop();
      },
      events: {
        name: "visibilitychange",
        el: () => document,
        handler() {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        }
      },
      methods: {
        start() {
          this.stop();
          this.update();
          if (!this.timer) {
            trigger(this.$el, "countdownstart");
            this.timer = setInterval(this.update, 1e3);
          }
        },
        stop() {
          if (this.timer) {
            clearInterval(this.timer);
            trigger(this.$el, "countdownstop");
            this.timer = null;
          }
        },
        update() {
          const timespan = getTimeSpan(this.date);
          if (!timespan.total) {
            this.stop();
            if (!this.end) {
              trigger(this.$el, "countdownend");
              this.end = true;
            }
          }
          for (const unit of units) {
            const el = $(this.clsWrapper.replace("%unit%", unit), this.$el);
            if (!el) {
              continue;
            }
            let digits = Math.trunc(timespan[unit]).toString().padStart(2, "0");
            if (el.textContent !== digits) {
              digits = digits.split("");
              if (digits.length !== el.children.length) {
                html(el, digits.map(() => "<span></span>").join(""));
              }
              digits.forEach((digit, i) => el.children[i].textContent = digit);
            }
          }
        }
      }
    };
    function getTimeSpan(date) {
      const total = Math.max(0, date - Date.now()) / 1e3;
      return {
        total,
        seconds: total % 60,
        minutes: total / 60 % 60,
        hours: total / 60 / 60 % 24,
        days: total / 60 / 60 / 24
      };
    }

    const strats = {};
    strats.events = strats.watch = strats.observe = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
      return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
      return sortBy(
        concatStrat(parentVal, isFunction(childVal) ? { read: childVal } : childVal),
        "order"
      );
    };
    strats.props = function(parentVal, childVal) {
      if (isArray(childVal)) {
        const value = {};
        for (const key of childVal) {
          value[key] = String;
        }
        childVal = value;
      }
      return strats.methods(parentVal, childVal);
    };
    strats.computed = strats.methods = function(parentVal, childVal) {
      return childVal ? parentVal ? { ...parentVal, ...childVal } : childVal : parentVal;
    };
    strats.i18n = strats.data = function(parentVal, childVal, vm) {
      if (!vm) {
        if (!childVal) {
          return parentVal;
        }
        if (!parentVal) {
          return childVal;
        }
        return function(vm2) {
          return mergeFnData(parentVal, childVal, vm2);
        };
      }
      return mergeFnData(parentVal, childVal, vm);
    };
    function mergeFnData(parentVal, childVal, vm) {
      return strats.computed(
        isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal,
        isFunction(childVal) ? childVal.call(vm, vm) : childVal
      );
    }
    function concatStrat(parentVal, childVal) {
      parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
      return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    }
    function defaultStrat(parentVal, childVal) {
      return isUndefined(childVal) ? parentVal : childVal;
    }
    function mergeOptions(parent, child, vm) {
      const options = {};
      if (isFunction(child)) {
        child = child.options;
      }
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (const mixin of child.mixins) {
          parent = mergeOptions(parent, mixin, vm);
        }
      }
      for (const key in parent) {
        mergeKey(key);
      }
      for (const key in child) {
        if (!hasOwn(parent, key)) {
          mergeKey(key);
        }
      }
      function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
      }
      return options;
    }
    function parseOptions(options, args = []) {
      try {
        return options ? startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? { [args[0]]: options } : options.split(";").reduce((options2, option) => {
          const [key, value] = option.split(/:(.*)/);
          if (key && !isUndefined(value)) {
            options2[key.trim()] = value.trim();
          }
          return options2;
        }, {}) : {};
      } catch (e) {
        return {};
      }
    }
    function coerce$1(type, value) {
      if (type === Boolean) {
        return toBoolean(value);
      } else if (type === Number) {
        return toNumber(value);
      } else if (type === "list") {
        return toList(value);
      } else if (type === Object && isString(value)) {
        return parseOptions(value);
      }
      return type ? type(value) : value;
    }
    const listRe = /,(?![^(]*\))/;
    function toList(value) {
      return isArray(value) ? value : isString(value) ? value.split(listRe).map((value2) => isNumeric(value2) ? toNumber(value2) : toBoolean(value2.trim())) : [value];
    }

    function initUpdates(instance) {
      instance._data = {};
      instance._updates = [...instance.$options.update || []];
      instance._disconnect.push(() => instance._updates = instance._data = null);
    }
    function prependUpdate(instance, update) {
      instance._updates.unshift(update);
    }
    function callUpdate(instance, e = "update") {
      if (!instance._connected) {
        return;
      }
      if (!instance._updates.length) {
        return;
      }
      if (!instance._queued) {
        instance._queued = /* @__PURE__ */ new Set();
        fastdom.read(() => {
          if (instance._connected) {
            runUpdates(instance, instance._queued);
          }
          instance._queued = null;
        });
      }
      instance._queued.add(e.type || e);
    }
    function runUpdates(instance, types) {
      for (const { read, write, events = [] } of instance._updates) {
        if (!types.has("update") && !events.some((type) => types.has(type))) {
          continue;
        }
        let result;
        if (read) {
          result = read.call(instance, instance._data, types);
          if (result && isPlainObject(result)) {
            assign(instance._data, result);
          }
        }
        if (write && result !== false) {
          fastdom.write(() => {
            if (instance._connected) {
              write.call(instance, instance._data, types);
            }
          });
        }
      }
    }

    function resize(options) {
      return observe(observeResize, options, "resize");
    }
    function intersection(options) {
      return observe(observeIntersection, options);
    }
    function mutation(options) {
      return observe(observeMutation, options);
    }
    function lazyload(options = {}) {
      return intersection({
        handler: function(entries, observer) {
          const { targets = this.$el, preload = 5 } = options;
          for (const el of toNodes(isFunction(targets) ? targets(this) : targets)) {
            $$('[loading="lazy"]', el).slice(0, preload - 1).forEach((el2) => removeAttr(el2, "loading"));
          }
          for (const el of entries.filter(({ isIntersecting }) => isIntersecting).map(({ target }) => target)) {
            observer.unobserve(el);
          }
        },
        ...options
      });
    }
    function viewport(options) {
      return observe((target, handler) => observeViewportResize(handler), options, "resize");
    }
    function scroll$1(options) {
      return observe(
        (target, handler) => ({
          disconnect: on(toScrollTargets(target), "scroll", handler, { passive: true })
        }),
        options,
        "scroll"
      );
    }
    function swipe(options) {
      return {
        observe(target, handler) {
          return {
            observe: noop,
            unobserve: noop,
            disconnect: on(target, pointerDown$1, handler, { passive: true })
          };
        },
        handler(e) {
          if (!isTouch(e)) {
            return;
          }
          const pos = getEventPos(e);
          const target = "tagName" in e.target ? e.target : parent(e.target);
          once(document, `${pointerUp$1} ${pointerCancel} scroll`, (e2) => {
            const { x, y } = getEventPos(e2);
            if (e2.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
              setTimeout(() => {
                trigger(target, "swipe");
                trigger(target, `swipe${swipeDirection(pos.x, pos.y, x, y)}`);
              });
            }
          });
        },
        ...options
      };
    }
    function observe(observe2, options, emit) {
      return {
        observe: observe2,
        handler() {
          callUpdate(this, emit);
        },
        ...options
      };
    }
    function swipeDirection(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
    }
    function toScrollTargets(elements) {
      return toNodes(elements).map((node) => {
        const { ownerDocument } = node;
        const parent2 = scrollParent(node, true);
        return parent2 === ownerDocument.scrollingElement ? ownerDocument : parent2;
      });
    }

    var Margin = {
      props: {
        margin: String,
        firstColumn: Boolean
      },
      data: {
        margin: "uk-margin-small-top",
        firstColumn: "uk-first-column"
      },
      observe: [
        mutation({
          options: {
            childList: true
          }
        }),
        mutation({
          options: {
            attributes: true,
            attributeFilter: ["style"]
          },
          target: ({ $el }) => [$el, ...children($el)]
        }),
        resize({
          target: ({ $el }) => [$el, ...children($el)]
        })
      ],
      update: {
        read() {
          return {
            rows: getRows(children(this.$el))
          };
        },
        write({ rows }) {
          for (const row of rows) {
            for (const el of row) {
              toggleClass(el, this.margin, rows[0] !== row);
              toggleClass(el, this.firstColumn, row[isRtl ? row.length - 1 : 0] === el);
            }
          }
        },
        events: ["resize"]
      }
    };
    function getRows(elements) {
      const sorted = [[]];
      const withOffset = elements.some(
        (el, i) => i && elements[i - 1].offsetParent !== el.offsetParent
      );
      for (const el of elements) {
        if (!isVisible(el)) {
          continue;
        }
        const offset = getOffset(el, withOffset);
        for (let i = sorted.length - 1; i >= 0; i--) {
          const current = sorted[i];
          if (!current[0]) {
            current.push(el);
            break;
          }
          const offsetCurrent = getOffset(current[0], withOffset);
          if (offset.top >= offsetCurrent.bottom - 1 && offset.top !== offsetCurrent.top) {
            sorted.push([el]);
            break;
          }
          if (offset.bottom - 1 > offsetCurrent.top || offset.top === offsetCurrent.top) {
            let j = current.length - 1;
            for (; j >= 0; j--) {
              const offsetCurrent2 = getOffset(current[j], withOffset);
              if (offset.left >= offsetCurrent2.left) {
                break;
              }
            }
            current.splice(j + 1, 0, el);
            break;
          }
          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }
      return sorted;
    }
    function getOffset(element, offset = false) {
      let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;
      if (offset) {
        [offsetTop, offsetLeft] = offsetPosition(element);
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth
      };
    }

    async function slide(action, target, duration) {
      await awaitFrame();
      let nodes = children(target);
      const currentProps = nodes.map((el) => getProps$1(el, true));
      const targetProps = { ...css(target, ["height", "padding"]), display: "block" };
      const targets = nodes.concat(target);
      await Promise.all(targets.map(Transition.cancel));
      css(targets, "transitionProperty", "none");
      await action();
      nodes = nodes.concat(children(target).filter((el) => !includes(nodes, el)));
      await Promise.resolve();
      css(targets, "transitionProperty", "");
      const targetStyle = attr(target, "style");
      const targetPropsTo = css(target, ["height", "padding"]);
      const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);
      const attrsTo = nodes.map((el) => ({ style: attr(el, "style") }));
      nodes.forEach((el, i) => propsFrom[i] && css(el, propsFrom[i]));
      css(target, targetProps);
      trigger(target, "scroll");
      await awaitFrame();
      const transitions = nodes.map((el, i) => parent(el) === target && Transition.start(el, propsTo[i], duration, "ease")).concat(Transition.start(target, targetPropsTo, duration, "ease"));
      try {
        await Promise.all(transitions);
        nodes.forEach((el, i) => {
          attr(el, attrsTo[i]);
          if (parent(el) === target) {
            css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
          }
        });
        attr(target, "style", targetStyle);
      } catch (e) {
        attr(nodes, "style", "");
        resetProps(target, targetProps);
      }
    }
    function getProps$1(el, opacity) {
      const zIndex = css(el, "zIndex");
      return isVisible(el) ? {
        display: "",
        opacity: opacity ? css(el, "opacity") : "0",
        pointerEvents: "none",
        position: "absolute",
        zIndex: zIndex === "auto" ? index(el) : zIndex,
        ...getPositionWithMargin(el)
      } : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
      const propsTo = nodes.map(
        (el, i) => parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : { opacity: 0 } : { opacity: isVisible(el) ? 1 : 0 } : false
      );
      const propsFrom = propsTo.map((props, i) => {
        const from = parent(nodes[i]) === target && (currentProps[i] || getProps$1(nodes[i]));
        if (!from) {
          return false;
        }
        if (!props) {
          delete from.opacity;
        } else if (!("opacity" in props)) {
          const { opacity } = from;
          if (opacity % 1) {
            props.opacity = 1;
          } else {
            delete from.opacity;
          }
        }
        return from;
      });
      return [propsTo, propsFrom];
    }
    function resetProps(el, props) {
      for (const prop in props) {
        css(el, prop, "");
      }
    }
    function getPositionWithMargin(el) {
      const { height, width } = dimensions$1(el);
      return {
        height,
        width,
        transform: "",
        ...position(el),
        ...css(el, ["marginTop", "marginLeft"])
      };
    }
    function awaitFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    const clsLeave = "uk-transition-leave";
    const clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger = 0) {
      const index = transitionIndex(target, true);
      const propsIn = { opacity: 1 };
      const propsOut = { opacity: 0 };
      const wrapIndexFn = (fn) => () => index === transitionIndex(target) ? fn() : Promise.reject();
      const leaveFn = wrapIndexFn(async () => {
        addClass(target, clsLeave);
        await Promise.all(
          getTransitionNodes(target).map(
            (child, i) => new Promise(
              (resolve) => setTimeout(
                () => Transition.start(child, propsOut, duration / 2, "ease").then(
                  resolve
                ),
                i * stagger
              )
            )
          )
        );
        removeClass(target, clsLeave);
      });
      const enterFn = wrapIndexFn(async () => {
        const oldHeight = height(target);
        addClass(target, clsEnter);
        action();
        css(children(target), { opacity: 0 });
        await awaitFrame();
        const nodes = children(target);
        const newHeight = height(target);
        css(target, "alignContent", "flex-start");
        height(target, oldHeight);
        const transitionNodes = getTransitionNodes(target);
        css(nodes, propsOut);
        const transitions = transitionNodes.map(async (child, i) => {
          await awaitTimeout(i * stagger);
          await Transition.start(child, propsIn, duration / 2, "ease");
        });
        if (oldHeight !== newHeight) {
          transitions.push(
            Transition.start(
              target,
              { height: newHeight },
              duration / 2 + transitionNodes.length * stagger,
              "ease"
            )
          );
        }
        await Promise.all(transitions).then(() => {
          removeClass(target, clsEnter);
          if (index === transitionIndex(target)) {
            css(target, { height: "", alignContent: "" });
            css(nodes, { opacity: "" });
            delete target.dataset.transition;
          }
        });
      });
      return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
      if (next) {
        target.dataset.transition = 1 + transitionIndex(target);
      }
      return toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
      return Promise.all(
        children(target).filter(Transition.inProgress).map(
          (el) => new Promise((resolve) => once(el, "transitionend transitioncanceled", resolve))
        )
      );
    }
    function getTransitionNodes(target) {
      return getRows(children(target)).flat().filter(isVisible);
    }
    function awaitTimeout(timeout) {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    var Animate = {
      props: {
        duration: Number,
        animation: Boolean
      },
      data: {
        duration: 150,
        animation: "slide"
      },
      methods: {
        animate(action, target = this.$el) {
          const name = this.animation;
          const animationFn = name === "fade" ? fade : name === "delayed-fade" ? (...args) => fade(...args, 40) : name ? slide : () => {
            action();
            return Promise.resolve();
          };
          return animationFn(action, target, this.duration).catch(noop);
        }
      }
    };

    const keyMap = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    var filter = {
      mixins: [Animate],
      args: "target",
      props: {
        target: String,
        selActive: Boolean
      },
      data: {
        target: "",
        selActive: false,
        attrItem: "uk-filter-control",
        cls: "uk-active",
        duration: 250
      },
      computed: {
        children: ({ target }, $el) => $$(`${target} > *`, $el),
        toggles: ({ attrItem }, $el) => $$(`[${attrItem}],[data-${attrItem}]`, $el)
      },
      watch: {
        toggles(toggles) {
          this.updateState();
          const actives = $$(this.selActive, this.$el);
          for (const toggle of toggles) {
            if (this.selActive !== false) {
              toggleClass(toggle, this.cls, includes(actives, toggle));
            }
            const button = findButton(toggle);
            if (isTag(button, "a")) {
              attr(button, "role", "button");
            }
          }
        },
        children(list, prev) {
          if (prev) {
            this.updateState();
          }
        }
      },
      events: {
        name: "click keydown",
        delegate: ({ attrItem }) => `[${attrItem}],[data-${attrItem}]`,
        handler(e) {
          if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
            return;
          }
          if (e.target.closest("a,button")) {
            e.preventDefault();
            this.apply(e.current);
          }
        }
      },
      methods: {
        apply(el) {
          const prevState = this.getState();
          const newState = mergeState(el, this.attrItem, this.getState());
          if (!isEqualState(prevState, newState)) {
            this.setState(newState);
          }
        },
        getState() {
          return this.toggles.filter((item) => hasClass(item, this.cls)).reduce((state, el) => mergeState(el, this.attrItem, state), {
            filter: { "": "" },
            sort: []
          });
        },
        async setState(state, animate = true) {
          state = { filter: { "": "" }, sort: [], ...state };
          trigger(this.$el, "beforeFilter", [this, state]);
          for (const toggle of this.toggles) {
            toggleClass(toggle, this.cls, matchFilter(toggle, this.attrItem, state));
          }
          await Promise.all(
            $$(this.target, this.$el).map((target) => {
              const filterFn = () => applyState(state, target, children(target));
              return animate ? this.animate(filterFn, target) : filterFn();
            })
          );
          trigger(this.$el, "afterFilter", [this]);
        },
        updateState() {
          fastdom.write(() => this.setState(this.getState(), false));
        }
      }
    };
    function getFilter(el, attr2) {
      return parseOptions(data(el, attr2), ["filter"]);
    }
    function isEqualState(stateA, stateB) {
      return ["filter", "sort"].every((prop) => isEqual(stateA[prop], stateB[prop]));
    }
    function applyState(state, target, children) {
      for (const el of children) {
        css(
          el,
          "display",
          Object.values(state.filter).every((selector) => !selector || matches(el, selector)) ? "" : "none"
        );
      }
      const [sort, order] = state.sort;
      if (sort) {
        const sorted = sortItems(children, sort, order);
        if (!isEqual(sorted, children)) {
          append(target, sorted);
        }
      }
    }
    function mergeState(el, attr2, state) {
      const { filter, group, sort, order = "asc" } = getFilter(el, attr2);
      if (filter || isUndefined(sort)) {
        if (group) {
          if (filter) {
            delete state.filter[""];
            state.filter[group] = filter;
          } else {
            delete state.filter[group];
            if (isEmpty(state.filter) || "" in state.filter) {
              state.filter = { "": filter || "" };
            }
          }
        } else {
          state.filter = { "": filter || "" };
        }
      }
      if (!isUndefined(sort)) {
        state.sort = [sort, order];
      }
      return state;
    }
    function matchFilter(el, attr2, { filter: stateFilter = { "": "" }, sort: [stateSort, stateOrder] }) {
      const { filter = "", group = "", sort, order = "asc" } = getFilter(el, attr2);
      return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
    }
    function sortItems(nodes, sort, order) {
      return [...nodes].sort(
        (a, b) => data(a, sort).localeCompare(data(b, sort), void 0, { numeric: true }) * (order === "asc" || -1)
      );
    }
    function findButton(el) {
      return $("a,button", el) || el;
    }

    var img = {
      args: "dataSrc",
      props: {
        dataSrc: String,
        sources: String,
        margin: String,
        target: String,
        loading: String
      },
      data: {
        dataSrc: "",
        sources: false,
        margin: "50%",
        target: false,
        loading: "lazy"
      },
      connected() {
        if (this.loading !== "lazy") {
          this.load();
        } else if (isImg(this.$el)) {
          this.$el.loading = "lazy";
          setSrcAttrs(this.$el);
        }
      },
      disconnected() {
        if (this.img) {
          this.img.onload = "";
        }
        delete this.img;
      },
      observe: intersection({
        handler(entries, observer) {
          this.load();
          observer.disconnect();
        },
        options: ({ margin }) => ({ rootMargin: margin }),
        filter: ({ loading }) => loading === "lazy",
        target: ({ $el, $props }) => $props.target ? [$el, ...queryAll($props.target, $el)] : $el
      }),
      methods: {
        load() {
          if (this.img) {
            return this.img;
          }
          const image = isImg(this.$el) ? this.$el : getImageFromElement(this.$el, this.dataSrc, this.sources);
          removeAttr(image, "loading");
          setSrcAttrs(this.$el, image.currentSrc);
          return this.img = image;
        }
      }
    };
    function setSrcAttrs(el, src) {
      if (isImg(el)) {
        const parentNode = parent(el);
        const elements = isTag(parentNode, "picture") ? children(parentNode) : [el];
        elements.forEach((el2) => setSourceProps(el2, el2));
      } else if (src) {
        const change = !includes(el.style.backgroundImage, src);
        if (change) {
          css(el, "backgroundImage", `url(${escape(src)})`);
          trigger(el, createEvent("load", false));
        }
      }
    }
    const srcProps = ["data-src", "data-srcset", "sizes"];
    function setSourceProps(sourceEl, targetEl) {
      for (const prop of srcProps) {
        const value = data(sourceEl, prop);
        if (value) {
          attr(targetEl, prop.replace(/data-/g, ""), value);
        }
      }
    }
    function getImageFromElement(el, src, sources) {
      const img = new Image();
      wrapInPicture(img, sources);
      setSourceProps(el, img);
      img.onload = () => setSrcAttrs(el, img.currentSrc);
      attr(img, "src", src);
      return img;
    }
    function wrapInPicture(img, sources) {
      sources = parseSources(sources);
      if (sources.length) {
        const picture = fragment("<picture>");
        for (const attrs of sources) {
          const source = fragment("<source>");
          attr(source, attrs);
          append(picture, source);
        }
        append(picture, img);
      }
    }
    function parseSources(sources) {
      if (!sources) {
        return [];
      }
      if (startsWith(sources, "[")) {
        try {
          sources = JSON.parse(sources);
        } catch (e) {
          sources = [];
        }
      } else {
        sources = parseOptions(sources);
      }
      if (!isArray(sources)) {
        sources = [sources];
      }
      return sources.filter((source) => !isEmpty(source));
    }
    function isImg(el) {
      return isTag(el, "img");
    }

    let prevented;
    function preventBackgroundScroll(el) {
      const off = on(
        el,
        "touchstart",
        (e) => {
          if (e.targetTouches.length !== 1 || matches(e.target, 'input[type="range"')) {
            return;
          }
          let prev = getEventPos(e).y;
          const offMove = on(
            el,
            "touchmove",
            (e2) => {
              const pos = getEventPos(e2).y;
              if (pos === prev) {
                return;
              }
              prev = pos;
              if (!scrollParents(e2.target).some((scrollParent) => {
                if (!el.contains(scrollParent)) {
                  return false;
                }
                let { scrollHeight, clientHeight } = scrollParent;
                return clientHeight < scrollHeight;
              })) {
                e2.preventDefault();
              }
            },
            { passive: false }
          );
          once(el, "scroll touchend touchcanel", offMove, { capture: true });
        },
        { passive: true }
      );
      if (prevented) {
        return off;
      }
      prevented = true;
      const { scrollingElement } = document;
      css(scrollingElement, {
        overflowY: CSS.supports("overflow", "clip") ? "clip" : "hidden",
        touchAction: "none",
        paddingRight: width(window) - scrollingElement.clientWidth || ""
      });
      return () => {
        prevented = false;
        off();
        css(scrollingElement, { overflowY: "", touchAction: "", paddingRight: "" });
      };
    }

    var Container = {
      props: {
        container: Boolean
      },
      data: {
        container: true
      },
      computed: {
        container({ container }) {
          return container === true && this.$container || container && $(container);
        }
      }
    };

    var Position = {
      props: {
        pos: String,
        offset: Boolean,
        flip: Boolean,
        shift: Boolean,
        inset: Boolean
      },
      data: {
        pos: `bottom-${isRtl ? "right" : "left"}`,
        offset: false,
        flip: true,
        shift: true,
        inset: false
      },
      connected() {
        this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
        [this.dir, this.align] = this.pos;
        this.axis = includes(["top", "bottom"], this.dir) ? "y" : "x";
      },
      methods: {
        positionAt(element, target, boundary) {
          let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
          const placement = [this.flip && "flip", this.shift && "shift"];
          const attach = {
            element: [this.inset ? this.dir : flipPosition(this.dir), this.align],
            target: [this.dir, this.align]
          };
          if (this.axis === "y") {
            for (const prop in attach) {
              attach[prop].reverse();
            }
            offset.reverse();
            placement.reverse();
          }
          const restoreScrollPosition = storeScrollPosition(element);
          const elDim = dimensions$1(element);
          css(element, { top: -elDim.height, left: -elDim.width });
          positionAt(element, target, {
            attach,
            offset,
            boundary,
            placement,
            viewportOffset: this.getViewportOffset(element)
          });
          restoreScrollPosition();
        },
        getPositionOffset(element = this.$el) {
          return toPx(
            this.offset === false ? css(element, "--uk-position-offset") : this.offset,
            this.axis === "x" ? "width" : "height",
            element
          ) * (includes(["left", "top"], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
        },
        getShiftOffset(element = this.$el) {
          return this.align === "center" ? 0 : toPx(
            css(element, "--uk-position-shift-offset"),
            this.axis === "y" ? "width" : "height",
            element
          ) * (includes(["left", "top"], this.align) ? 1 : -1);
        },
        getViewportOffset(element) {
          return toPx(css(element, "--uk-position-viewport-offset"));
        }
      }
    };
    function storeScrollPosition(element) {
      const scrollElement = scrollParent(element);
      const { scrollTop } = scrollElement;
      return () => {
        if (scrollTop !== scrollElement.scrollTop) {
          scrollElement.scrollTop = scrollTop;
        }
      };
    }

    var Togglable = {
      props: {
        cls: Boolean,
        animation: "list",
        duration: Number,
        velocity: Number,
        origin: String,
        transition: String
      },
      data: {
        cls: false,
        animation: [false],
        duration: 200,
        velocity: 0.2,
        origin: false,
        transition: "ease",
        clsEnter: "uk-togglable-enter",
        clsLeave: "uk-togglable-leave"
      },
      computed: {
        hasAnimation: ({ animation }) => !!animation[0],
        hasTransition: ({ animation }) => ["slide", "reveal"].some((transition) => startsWith(animation[0], transition))
      },
      methods: {
        async toggleElement(targets, toggle, animate) {
          try {
            await Promise.all(
              toNodes(targets).map((el) => {
                const show = isBoolean(toggle) ? toggle : !this.isToggled(el);
                if (!trigger(el, `before${show ? "show" : "hide"}`, [this])) {
                  return Promise.reject();
                }
                const promise = (isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                const cls = show ? this.clsEnter : this.clsLeave;
                addClass(el, cls);
                trigger(el, show ? "show" : "hide", [this]);
                const done = () => {
                  var _a;
                  removeClass(el, cls);
                  trigger(el, show ? "shown" : "hidden", [this]);
                  if (show) {
                    const restoreScrollPosition = storeScrollPosition(el);
                    (_a = $$("[autofocus]", el).find(isVisible)) == null ? void 0 : _a.focus();
                    restoreScrollPosition();
                  }
                };
                return promise ? promise.then(done, () => {
                  removeClass(el, cls);
                  return Promise.reject();
                }) : done();
              })
            );
            return true;
          } catch (e) {
            return false;
          }
        },
        isToggled(el = this.$el) {
          el = toNode(el);
          return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(" ")[0]) : isVisible(el);
        },
        _toggle(el, toggled) {
          if (!el) {
            return;
          }
          toggled = Boolean(toggled);
          let changed;
          if (this.cls) {
            changed = includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
            changed && toggleClass(el, this.cls, includes(this.cls, " ") ? void 0 : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }
          if (changed) {
            trigger(el, "toggled", [toggled, this]);
          }
        }
      }
    };
    function toggleInstant(el, show, { _toggle }) {
      Animation.cancel(el);
      Transition.cancel(el);
      return _toggle(el, show);
    }
    async function toggleTransition(el, show, { animation, duration, velocity, transition, _toggle }) {
      var _a;
      const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
      const dirs = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      const dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
      const end = dir[1] === startProp;
      const props = ["width", "height"];
      const dimProp = props[dirs.indexOf(dir)];
      const marginProp = `margin-${dir[0]}`;
      const marginStartProp = `margin-${startProp}`;
      let currentDim = dimensions$1(el)[dimProp];
      const inProgress = Transition.inProgress(el);
      await Transition.cancel(el);
      if (show) {
        _toggle(el, true);
      }
      const prevProps = Object.fromEntries(
        [
          "padding",
          "border",
          "width",
          "height",
          "minWidth",
          "minHeight",
          "overflowY",
          "overflowX",
          marginProp,
          marginStartProp
        ].map((key) => [key, el.style[key]])
      );
      const dim = dimensions$1(el);
      const currentMargin = toFloat(css(el, marginProp));
      const marginStart = toFloat(css(el, marginStartProp));
      const endDim = dim[dimProp] + marginStart;
      if (!inProgress && !show) {
        currentDim += marginStart;
      }
      const [wrapper] = wrapInner(el, "<div>");
      css(wrapper, {
        boxSizing: "border-box",
        height: dim.height,
        width: dim.width,
        ...css(el, [
          "overflow",
          "padding",
          "borderTop",
          "borderRight",
          "borderBottom",
          "borderLeft",
          "borderImage",
          marginStartProp
        ])
      });
      css(el, {
        padding: 0,
        border: 0,
        minWidth: 0,
        minHeight: 0,
        [marginStartProp]: 0,
        width: dim.width,
        height: dim.height,
        overflow: "hidden",
        [dimProp]: currentDim
      });
      const percent = currentDim / endDim;
      duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
      const endProps = { [dimProp]: show ? endDim : 0 };
      if (end) {
        css(el, marginProp, endDim - currentDim + currentMargin);
        endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
      }
      if (!end ^ mode === "reveal") {
        css(wrapper, marginProp, -endDim + currentDim);
        Transition.start(wrapper, { [marginProp]: show ? 0 : -endDim }, duration, transition);
      }
      try {
        await Transition.start(el, endProps, duration, transition);
      } finally {
        css(el, prevProps);
        unwrap(wrapper.firstChild);
        if (!show) {
          _toggle(el, false);
        }
      }
    }
    function toggleAnimation(el, show, cmp) {
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return Animation.in(el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
        () => _toggle(el, false)
      );
    }

    const active$1 = [];
    var Modal = {
      mixins: [Class, Container, Togglable],
      props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean,
        role: String
      },
      data: {
        cls: "uk-open",
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false,
        role: "dialog"
      },
      computed: {
        panel: ({ selPanel }, $el) => $(selPanel, $el),
        transitionElement() {
          return this.panel;
        }
      },
      connected() {
        attr(this.panel || this.$el, "role", this.role);
        if (this.overlay) {
          attr(this.panel || this.$el, "aria-modal", true);
        }
      },
      beforeDisconnect() {
        if (includes(active$1, this)) {
          this.toggleElement(this.$el, false, false);
        }
      },
      events: [
        {
          name: "click",
          delegate: ({ selClose }) => `${selClose},a[href*="#"]`,
          handler(e) {
            const { current, defaultPrevented } = e;
            const { hash } = current;
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !this.$el.contains($(hash))) {
              this.hide();
            } else if (matches(current, this.selClose)) {
              e.preventDefault();
              this.hide();
            }
          }
        },
        {
          name: "toggle",
          self: true,
          handler(e) {
            if (e.defaultPrevented) {
              return;
            }
            e.preventDefault();
            if (this.isToggled() === includes(active$1, this)) {
              this.toggle();
            }
          }
        },
        {
          name: "beforeshow",
          self: true,
          handler(e) {
            if (includes(active$1, this)) {
              return false;
            }
            if (!this.stack && active$1.length) {
              Promise.all(active$1.map((modal) => modal.hide())).then(this.show);
              e.preventDefault();
            } else {
              active$1.push(this);
            }
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (this.stack) {
              css(this.$el, "zIndex", toFloat(css(this.$el, "zIndex")) + active$1.length);
            }
            const handlers = [
              this.overlay && preventBackgroundFocus(this),
              this.overlay && preventBackgroundScroll(this.$el),
              this.bgClose && listenForBackgroundClose$1(this),
              this.escClose && listenForEscClose$1(this)
            ];
            once(
              this.$el,
              "hidden",
              () => handlers.forEach((handler) => handler && handler()),
              { self: true }
            );
            addClass(document.documentElement, this.clsPage);
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            if (!isFocusable(this.$el)) {
              attr(this.$el, "tabindex", "-1");
            }
            if (!matches(this.$el, ":focus-within")) {
              this.$el.focus();
            }
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            if (includes(active$1, this)) {
              active$1.splice(active$1.indexOf(this), 1);
            }
            css(this.$el, "zIndex", "");
            if (!active$1.some((modal) => modal.clsPage === this.clsPage)) {
              removeClass(document.documentElement, this.clsPage);
            }
          }
        }
      ],
      methods: {
        toggle() {
          return this.isToggled() ? this.hide() : this.show();
        },
        show() {
          if (this.container && parent(this.$el) !== this.container) {
            append(this.container, this.$el);
            return new Promise(
              (resolve) => requestAnimationFrame(() => this.show().then(resolve))
            );
          }
          return this.toggleElement(this.$el, true, animate$1);
        },
        hide() {
          return this.toggleElement(this.$el, false, animate$1);
        }
      }
    };
    function animate$1(el, show, { transitionElement, _toggle }) {
      return new Promise(
        (resolve, reject) => once(el, "show hide", () => {
          var _a;
          (_a = el._reject) == null ? void 0 : _a.call(el);
          el._reject = reject;
          _toggle(el, show);
          const off = once(
            transitionElement,
            "transitionstart",
            () => {
              once(transitionElement, "transitionend transitioncancel", resolve, {
                self: true
              });
              clearTimeout(timer);
            },
            { self: true }
          );
          const timer = setTimeout(
            () => {
              off();
              resolve();
            },
            toMs(css(transitionElement, "transitionDuration"))
          );
        })
      ).then(() => delete el._reject);
    }
    function toMs(time) {
      return time ? endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3 : 0;
    }
    function preventBackgroundFocus(modal) {
      return on(document, "focusin", (e) => {
        if (last(active$1) === modal && !modal.$el.contains(e.target)) {
          modal.$el.focus();
        }
      });
    }
    function listenForBackgroundClose$1(modal) {
      return on(document, pointerDown$1, ({ target }) => {
        if (last(active$1) !== modal || modal.overlay && !modal.$el.contains(target) || !modal.panel || modal.panel.contains(target)) {
          return;
        }
        once(
          document,
          `${pointerUp$1} ${pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
              modal.hide();
            }
          },
          true
        );
      });
    }
    function listenForEscClose$1(modal) {
      return on(document, "keydown", (e) => {
        if (e.keyCode === 27 && last(active$1) === modal) {
          modal.hide();
        }
      });
    }

    var Animations$2 = {
      slide: {
        show(dir) {
          return [{ transform: translate(dir * -100) }, { transform: translate() }];
        },
        percent(current) {
          return translated(current);
        },
        translate(percent, dir) {
          return [
            { transform: translate(dir * -100 * percent) },
            { transform: translate(dir * 100 * (1 - percent)) }
          ];
        }
      }
    };
    function translated(el) {
      return Math.abs(new DOMMatrix(css(el, "transform")).m41 / el.offsetWidth);
    }
    function translate(value = 0, unit = "%") {
      return value ? `translate3d(${value + unit}, 0, 0)` : "";
    }

    function Transitioner$1(prev, next, dir, { animation, easing }) {
      const { percent, translate, show = noop } = animation;
      const props = show(dir);
      const { promise, resolve } = withResolvers();
      return {
        dir,
        show(duration, percent2 = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * clamp(percent2, -1, 1));
          this.translate(percent2);
          triggerUpdate(next, "itemin", { percent: percent2, duration, timing, dir });
          triggerUpdate(prev, "itemout", { percent: 1 - percent2, duration, timing, dir });
          Promise.all([
            Transition.start(next, props[1], duration, timing),
            Transition.start(prev, props[0], duration, timing)
          ]).then(() => {
            this.reset();
            resolve();
          }, noop);
          return promise;
        },
        cancel() {
          return Transition.cancel([next, prev]);
        },
        reset() {
          for (const prop in props[0]) {
            css([next, prev], prop, "");
          }
        },
        async forward(duration, percent2 = this.percent()) {
          await this.cancel();
          return this.show(duration, percent2, true);
        },
        translate(percent2) {
          this.reset();
          const props2 = translate(percent2, dir);
          css(next, props2[1]);
          css(prev, props2[0]);
          triggerUpdate(next, "itemtranslatein", { percent: percent2, dir });
          triggerUpdate(prev, "itemtranslateout", { percent: 1 - percent2, dir });
        },
        percent() {
          return percent(prev || next, next, dir);
        },
        getDistance() {
          return prev == null ? void 0 : prev.offsetWidth;
        }
      };
    }
    function triggerUpdate(el, type, data) {
      trigger(el, createEvent(type, false, false, data));
    }
    function withResolvers() {
      let resolve;
      return { promise: new Promise((res) => resolve = res), resolve };
    }

    var I18n = {
      props: {
        i18n: Object
      },
      data: {
        i18n: null
      },
      methods: {
        t(key, ...params) {
          var _a, _b, _c;
          let i = 0;
          return ((_c = ((_a = this.i18n) == null ? void 0 : _a[key]) || ((_b = this.$options.i18n) == null ? void 0 : _b[key])) == null ? void 0 : _c.replace(
            /%s/g,
            () => params[i++] || ""
          )) || "";
        }
      }
    };

    var SliderAutoplay = {
      props: {
        autoplay: Boolean,
        autoplayInterval: Number,
        pauseOnHover: Boolean
      },
      data: {
        autoplay: false,
        autoplayInterval: 7e3,
        pauseOnHover: true
      },
      connected() {
        attr(this.list, "aria-live", this.autoplay ? "off" : "polite");
        this.autoplay && this.startAutoplay();
      },
      disconnected() {
        this.stopAutoplay();
      },
      update() {
        attr(this.slides, "tabindex", "-1");
      },
      events: [
        {
          name: "visibilitychange",
          el: () => document,
          filter: ({ autoplay }) => autoplay,
          handler() {
            if (document.hidden) {
              this.stopAutoplay();
            } else {
              this.startAutoplay();
            }
          }
        }
      ],
      methods: {
        startAutoplay() {
          this.stopAutoplay();
          this.interval = setInterval(() => {
            if (!(this.stack.length || this.draggable && matches(this.$el, ":focus-within") && !matches(this.$el, ":focus") || this.pauseOnHover && matches(this.$el, ":hover"))) {
              this.show("next");
            }
          }, this.autoplayInterval);
        },
        stopAutoplay() {
          clearInterval(this.interval);
        }
      }
    };

    const pointerOptions = { passive: false, capture: true };
    const pointerUpOptions = { passive: true, capture: true };
    const pointerDown = "touchstart mousedown";
    const pointerMove = "touchmove mousemove";
    const pointerUp = "touchend touchcancel mouseup click input scroll";
    var SliderDrag = {
      props: {
        draggable: Boolean
      },
      data: {
        draggable: true,
        threshold: 10
      },
      created() {
        for (const key of ["start", "move", "end"]) {
          const fn = this[key];
          this[key] = (e) => {
            const pos = getEventPos(e).x * (isRtl ? -1 : 1);
            this.prevPos = pos === this.pos ? this.prevPos : this.pos;
            this.pos = pos;
            fn(e);
          };
        }
      },
      events: [
        {
          name: pointerDown,
          passive: true,
          delegate: ({ selList }) => `${selList} > *`,
          handler(e) {
            if (!this.draggable || this.parallax || !isTouch(e) && hasSelectableText(e.target) || e.target.closest(selInput) || e.button > 0 || this.length < 2) {
              return;
            }
            this.start(e);
          }
        },
        {
          name: "dragstart",
          handler(e) {
            e.preventDefault();
          }
        },
        {
          // iOS workaround for slider stopping if swiping fast
          name: pointerMove,
          el: ({ list }) => list,
          handler: noop,
          ...pointerOptions
        }
      ],
      methods: {
        start() {
          this.drag = this.pos;
          if (this._transitioner) {
            this.percent = this._transitioner.percent();
            this.drag += this._transitioner.getDistance() * this.percent * this.dir;
            this._transitioner.cancel();
            this._transitioner.translate(this.percent);
            this.dragging = true;
            this.stack = [];
          } else {
            this.prevIndex = this.index;
          }
          on(document, pointerMove, this.move, pointerOptions);
          on(document, pointerUp, this.end, pointerUpOptions);
          css(this.list, "userSelect", "none");
        },
        move(e) {
          const distance = this.pos - this.drag;
          if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
            return;
          }
          e.cancelable && e.preventDefault();
          this.dragging = true;
          this.dir = distance < 0 ? 1 : -1;
          let { slides, prevIndex } = this;
          let dis = Math.abs(distance);
          let nextIndex = this.getIndex(prevIndex + this.dir);
          let width = getDistance.call(this, prevIndex, nextIndex);
          while (nextIndex !== prevIndex && dis > width) {
            this.drag -= width * this.dir;
            prevIndex = nextIndex;
            dis -= width;
            nextIndex = this.getIndex(prevIndex + this.dir);
            width = getDistance.call(this, prevIndex, nextIndex);
          }
          this.percent = dis / width;
          const prev = slides[prevIndex];
          const next = slides[nextIndex];
          const changed = this.index !== nextIndex;
          const edge = prevIndex === nextIndex;
          let itemShown;
          for (const i of [this.index, this.prevIndex]) {
            if (!includes([nextIndex, prevIndex], i)) {
              trigger(slides[i], "itemhidden", [this]);
              if (edge) {
                itemShown = true;
                this.prevIndex = prevIndex;
              }
            }
          }
          if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
            trigger(slides[this.index], "itemshown", [this]);
          }
          if (changed) {
            this.prevIndex = prevIndex;
            this.index = nextIndex;
            if (!edge) {
              trigger(prev, "beforeitemhide", [this]);
              trigger(prev, "itemhide", [this]);
            }
            trigger(next, "beforeitemshow", [this]);
            trigger(next, "itemshow", [this]);
          }
          this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
        },
        end() {
          off(document, pointerMove, this.move, pointerOptions);
          off(document, pointerUp, this.end, pointerUpOptions);
          if (this.dragging) {
            setTimeout(on(this.list, "click", (e) => e.preventDefault(), pointerOptions));
            this.dragging = null;
            if (this.index === this.prevIndex) {
              this.percent = 1 - this.percent;
              this.dir *= -1;
              this._show(false, this.index, true);
              this._transitioner = null;
            } else {
              const dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
              this.index = dirChange ? this.index : this.prevIndex;
              if (dirChange) {
                trigger(this.slides[this.prevIndex], "itemhidden", [this]);
                trigger(this.slides[this.index], "itemshown", [this]);
                this.percent = 1 - this.percent;
              }
              this.show(
                this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? "next" : "previous",
                true
              );
            }
          }
          css(this.list, { userSelect: "" });
          this.drag = this.percent = null;
        }
      }
    };
    function getDistance(prev, next) {
      return this._getTransitioner(prev, prev !== next && next).getDistance() || this.slides[prev].offsetWidth;
    }
    function hasSelectableText(el) {
      return css(el, "userSelect") !== "none" && toArray(el.childNodes).some((el2) => el2.nodeType === 3 && el2.textContent.trim());
    }

    function initWatches(instance) {
      instance._watches = [];
      for (const watches of instance.$options.watch || []) {
        for (const [name, watch] of Object.entries(watches)) {
          registerWatch(instance, watch, name);
        }
      }
      instance._initial = true;
    }
    function registerWatch(instance, watch, name) {
      instance._watches.push({
        name,
        ...isPlainObject(watch) ? watch : { handler: watch }
      });
    }
    function runWatches(instance, values) {
      for (const { name, handler, immediate = true } of instance._watches) {
        if (instance._initial && immediate || hasOwn(values, name) && !isEqual(values[name], instance[name])) {
          handler.call(instance, instance[name], values[name]);
        }
      }
      instance._initial = false;
    }

    function initComputed(instance) {
      const { computed } = instance.$options;
      instance._computed = {};
      if (computed) {
        for (const key in computed) {
          registerComputed(instance, key, computed[key]);
        }
      }
    }
    const mutationOptions = { subtree: true, childList: true };
    function registerComputed(instance, key, cb) {
      instance._hasComputed = true;
      Object.defineProperty(instance, key, {
        enumerable: true,
        get() {
          const { _computed, $props, $el } = instance;
          if (!hasOwn(_computed, key)) {
            _computed[key] = (cb.get || cb).call(instance, $props, $el);
            if (cb.observe && instance._computedObserver) {
              const selector = cb.observe.call(instance, $props);
              instance._computedObserver.observe(
                ["~", "+", "-"].includes(selector[0]) ? $el.parentElement : $el.getRootNode(),
                mutationOptions
              );
            }
          }
          return _computed[key];
        },
        set(value) {
          const { _computed } = instance;
          _computed[key] = cb.set ? cb.set.call(instance, value) : value;
          if (isUndefined(_computed[key])) {
            delete _computed[key];
          }
        }
      });
    }
    function initComputedUpdates(instance) {
      if (!instance._hasComputed) {
        return;
      }
      prependUpdate(instance, {
        read: () => runWatches(instance, resetComputed(instance)),
        events: ["resize", "computed"]
      });
      instance._computedObserver = observeMutation(
        instance.$el,
        () => callUpdate(instance, "computed"),
        mutationOptions
      );
      instance._disconnect.push(() => {
        instance._computedObserver.disconnect();
        instance._computedObserver = null;
        resetComputed(instance);
      });
    }
    function resetComputed(instance) {
      const values = { ...instance._computed };
      instance._computed = {};
      return values;
    }

    function initEvents(instance) {
      for (const event of instance.$options.events || []) {
        if (hasOwn(event, "handler")) {
          registerEvent(instance, event);
        } else {
          for (const key in event) {
            registerEvent(instance, { name: key, handler: event[key] });
          }
        }
      }
    }
    function registerEvent(instance, { name, el, handler, capture, passive, delegate, filter, self }) {
      if (filter && !filter.call(instance, instance)) {
        return;
      }
      instance._disconnect.push(
        on(
          el ? el.call(instance, instance) : instance.$el,
          name,
          delegate == null ? void 0 : delegate.call(instance, instance),
          handler.bind(instance),
          {
            passive,
            capture,
            self
          }
        )
      );
    }

    function initObservers(instance) {
      for (const observer of instance.$options.observe || []) {
        registerObservable(instance, observer);
      }
    }
    function registerObservable(instance, observable) {
      let { observe, target = instance.$el, handler, options, filter, args } = observable;
      if (filter && !filter.call(instance, instance)) {
        return;
      }
      const key = `_observe${instance._disconnect.length}`;
      if (isFunction(target) && !hasOwn(instance, key)) {
        registerComputed(instance, key, () => {
          const targets2 = target.call(instance, instance);
          return isArray(targets2) ? toNodes(targets2) : targets2;
        });
      }
      handler = isString(handler) ? instance[handler] : handler.bind(instance);
      if (isFunction(options)) {
        options = options.call(instance, instance);
      }
      const targets = hasOwn(instance, key) ? instance[key] : target;
      const observer = observe(targets, handler, options, args);
      if (isFunction(target) && isArray(instance[key])) {
        registerWatch(
          instance,
          { handler: updateTargets(observer, options), immediate: false },
          key
        );
      }
      instance._disconnect.push(() => observer.disconnect());
    }
    function updateTargets(observer, options) {
      return (targets, prev) => {
        for (const target of prev) {
          if (!includes(targets, target)) {
            if (observer.unobserve) {
              observer.unobserve(target);
            } else if (observer.observe) {
              observer.disconnect();
            }
          }
        }
        for (const target of targets) {
          if (!includes(prev, target) || !observer.unobserve) {
            observer.observe(target, options);
          }
        }
      };
    }

    function initProps(instance) {
      const { $options, $props } = instance;
      const props = getProps($options);
      assign($props, props);
      const { computed, methods } = $options;
      for (let key in $props) {
        if (key in props && (!computed || !hasOwn(computed, key)) && (!methods || !hasOwn(methods, key))) {
          instance[key] = $props[key];
        }
      }
    }
    function getProps(opts) {
      const data$1 = {};
      const { args = [], props = {}, el, id } = opts;
      if (!props) {
        return data$1;
      }
      for (const key in props) {
        const prop = hyphenate(key);
        let value = data(el, prop);
        if (isUndefined(value)) {
          continue;
        }
        value = props[key] === Boolean && value === "" ? true : coerce$1(props[key], value);
        if (prop === "target" && startsWith(value, "_")) {
          continue;
        }
        data$1[key] = value;
      }
      const options = parseOptions(data(el, id), args);
      for (const key in options) {
        const prop = camelize(key);
        if (!isUndefined(props[prop])) {
          data$1[prop] = coerce$1(props[prop], options[key]);
        }
      }
      return data$1;
    }
    const getAttributes = memoize((id, props) => {
      const attributes = Object.keys(props);
      const filter = attributes.concat(id).map((key) => [hyphenate(key), `data-${hyphenate(key)}`]).flat();
      return { attributes, filter };
    });
    function initPropsObserver(instance) {
      const { $options, $props } = instance;
      const { id, props, el } = $options;
      if (!props) {
        return;
      }
      const { attributes, filter } = getAttributes(id, props);
      const observer = new MutationObserver((records) => {
        const data = getProps($options);
        if (records.some(({ attributeName }) => {
          const prop = attributeName.replace("data-", "");
          return (prop === id ? attributes : [camelize(prop), camelize(attributeName)]).some(
            (prop2) => !isUndefined(data[prop2]) && data[prop2] !== $props[prop2]
          );
        })) {
          instance.$reset();
        }
      });
      observer.observe(el, {
        attributes: true,
        attributeFilter: filter
      });
      instance._disconnect.push(() => observer.disconnect());
    }

    function callHook(instance, hook) {
      var _a;
      (_a = instance.$options[hook]) == null ? void 0 : _a.forEach((handler) => handler.call(instance));
    }
    function callConnected(instance) {
      if (instance._connected) {
        return;
      }
      initProps(instance);
      callHook(instance, "beforeConnect");
      instance._connected = true;
      instance._disconnect = [];
      initEvents(instance);
      initUpdates(instance);
      initWatches(instance);
      initObservers(instance);
      initPropsObserver(instance);
      initComputedUpdates(instance);
      callHook(instance, "connected");
      callUpdate(instance);
    }
    function callDisconnected(instance) {
      if (!instance._connected) {
        return;
      }
      callHook(instance, "beforeDisconnect");
      instance._disconnect.forEach((off) => off());
      instance._disconnect = null;
      callHook(instance, "disconnected");
      instance._connected = false;
    }

    let uid = 0;
    function init$1(instance, options = {}) {
      options.data = normalizeData(options, instance.constructor.options);
      instance.$options = mergeOptions(instance.constructor.options, options, instance);
      instance.$props = {};
      instance._uid = uid++;
      initData(instance);
      initMethods(instance);
      initComputed(instance);
      callHook(instance, "created");
      if (options.el) {
        instance.$mount(options.el);
      }
    }
    function initData(instance) {
      const { data = {} } = instance.$options;
      for (const key in data) {
        instance.$props[key] = instance[key] = data[key];
      }
    }
    function initMethods(instance) {
      const { methods } = instance.$options;
      if (methods) {
        for (const key in methods) {
          instance[key] = methods[key].bind(instance);
        }
      }
    }
    function normalizeData({ data = {} }, { args = [], props = {} }) {
      if (isArray(data)) {
        data = data.slice(0, args.length).reduce((data2, value, index) => {
          if (isPlainObject(value)) {
            assign(data2, value);
          } else {
            data2[args[index]] = value;
          }
          return data2;
        }, {});
      }
      for (const key in data) {
        if (isUndefined(data[key])) {
          delete data[key];
        } else if (props[key]) {
          data[key] = coerce$1(props[key], data[key]);
        }
      }
      return data;
    }

    const App = function(options) {
      init$1(this, options);
    };
    App.util = util;
    App.options = {};
    App.version = "3.21.16";

    const PREFIX = "uk-";
    const DATA = "__uikit__";
    const components$2 = {};
    function component(name, options) {
      var _a, _b;
      const id = PREFIX + hyphenate(name);
      if (!options) {
        if (!components$2[id].options) {
          components$2[id] = App.extend(components$2[id]);
        }
        return components$2[id];
      }
      name = camelize(name);
      App[name] = (element, data) => createComponent(name, element, data);
      const opt = (_a = options.options) != null ? _a : { ...options };
      opt.id = id;
      opt.name = name;
      (_b = opt.install) == null ? void 0 : _b.call(opt, App, opt, name);
      if (App._initialized && !opt.functional) {
        requestAnimationFrame(() => createComponent(name, `[${id}],[data-${id}]`));
      }
      return components$2[id] = opt;
    }
    function createComponent(name, element, data, ...args) {
      const Component = component(name);
      return Component.options.functional ? new Component({ data: isPlainObject(element) ? element : [element, data, ...args] }) : element ? $$(element).map(init)[0] : init();
      function init(element2) {
        const instance = getComponent(element2, name);
        if (instance) {
          if (data) {
            instance.$destroy();
          } else {
            return instance;
          }
        }
        return new Component({ el: element2, data });
      }
    }
    function getComponents(element) {
      return (element == null ? void 0 : element[DATA]) || {};
    }
    function getComponent(element, name) {
      return getComponents(element)[name];
    }
    function attachToElement(element, instance) {
      if (!element[DATA]) {
        element[DATA] = {};
      }
      element[DATA][instance.$options.name] = instance;
    }
    function detachFromElement(element, instance) {
      var _a;
      (_a = element[DATA]) == null ? true : delete _a[instance.$options.name];
      if (isEmpty(element[DATA])) {
        delete element[DATA];
      }
    }

    function globalApi(App) {
      App.component = component;
      App.getComponents = getComponents;
      App.getComponent = getComponent;
      App.update = update;
      App.use = function(plugin) {
        if (plugin.installed) {
          return;
        }
        plugin.call(null, this);
        plugin.installed = true;
        return this;
      };
      App.mixin = function(mixin, component2) {
        component2 = (isString(component2) ? this.component(component2) : component2) || this;
        component2.options = mergeOptions(component2.options, mixin);
      };
      App.extend = function(options) {
        options || (options = {});
        const Super = this;
        const Sub = function UIkitComponent(options2) {
          init$1(this, options2);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);
        Sub.super = Super;
        Sub.extend = Super.extend;
        return Sub;
      };
      let container;
      Object.defineProperty(App, "container", {
        get() {
          return container || document.body;
        },
        set(element) {
          container = $(element);
        }
      });
    }
    function update(element, e) {
      element = element ? toNode(element) : document.body;
      for (const parentEl of parents(element).reverse()) {
        updateElement(parentEl, e);
      }
      apply(element, (element2) => updateElement(element2, e));
    }
    function updateElement(element, e) {
      const components = getComponents(element);
      for (const name in components) {
        callUpdate(components[name], e);
      }
    }

    function instanceApi(App) {
      App.prototype.$mount = function(el) {
        const instance = this;
        attachToElement(el, instance);
        instance.$options.el = el;
        if (el.isConnected) {
          callConnected(instance);
        }
      };
      App.prototype.$destroy = function(removeEl = false) {
        const instance = this;
        const { el } = instance.$options;
        if (el) {
          callDisconnected(instance);
        }
        callHook(instance, "destroy");
        detachFromElement(el, instance);
        if (removeEl) {
          remove$1(instance.$el);
        }
      };
      App.prototype.$create = createComponent;
      App.prototype.$emit = function(e) {
        callUpdate(this, e);
      };
      App.prototype.$update = function(element = this.$el, e) {
        update(element, e);
      };
      App.prototype.$reset = function() {
        callDisconnected(this);
        callConnected(this);
      };
      App.prototype.$getComponent = getComponent;
      Object.defineProperties(App.prototype, {
        $el: {
          get() {
            return this.$options.el;
          }
        },
        $container: Object.getOwnPropertyDescriptor(App, "container")
      });
    }
    let id = 1;
    function generateId(instance, el = null) {
      return (el == null ? void 0 : el.id) || `${instance.$options.id}-${id++}`;
    }

    var SliderNav = {
      i18n: {
        next: "Next slide",
        previous: "Previous slide",
        slideX: "Slide %s",
        slideLabel: "%s of %s",
        role: "String"
      },
      data: {
        selNav: false,
        role: "region"
      },
      computed: {
        nav: ({ selNav }, $el) => $(selNav, $el),
        navChildren() {
          return children(this.nav);
        },
        selNavItem: ({ attrItem }) => `[${attrItem}],[data-${attrItem}]`,
        navItems(_, $el) {
          return $$(this.selNavItem, $el);
        }
      },
      watch: {
        nav(nav, prev) {
          attr(nav, "role", "tablist");
          this.padNavitems();
          if (prev) {
            this.$emit();
          }
        },
        list(list) {
          if (isTag(list, "ul")) {
            attr(list, "role", "presentation");
          }
        },
        navChildren(children2) {
          attr(children2, "role", "presentation");
          this.padNavitems();
          this.updateNav();
        },
        navItems(items) {
          for (const el of items) {
            const cmd = data(el, this.attrItem);
            const button = $("a,button", el) || el;
            let ariaLabel;
            let ariaControls = null;
            if (isNumeric(cmd)) {
              const item = toNumber(cmd);
              const slide = this.slides[item];
              if (slide) {
                if (!slide.id) {
                  slide.id = generateId(this, slide);
                }
                ariaControls = slide.id;
              }
              ariaLabel = this.t("slideX", toFloat(cmd) + 1);
              attr(button, "role", "tab");
            } else {
              if (this.list) {
                if (!this.list.id) {
                  this.list.id = generateId(this, this.list);
                }
                ariaControls = this.list.id;
              }
              ariaLabel = this.t(cmd);
            }
            attr(button, {
              "aria-controls": ariaControls,
              "aria-label": attr(button, "aria-label") || ariaLabel
            });
          }
        },
        slides(slides) {
          slides.forEach(
            (slide, i) => attr(slide, {
              role: this.nav ? "tabpanel" : "group",
              "aria-label": this.t("slideLabel", i + 1, this.length),
              "aria-roledescription": this.nav ? null : "slide"
            })
          );
          this.padNavitems();
        }
      },
      connected() {
        attr(this.$el, {
          role: this.role,
          "aria-roledescription": "carousel"
        });
      },
      update: [
        {
          write() {
            this.navItems.concat(this.nav).forEach((el) => el && (el.hidden = !this.maxIndex));
            this.updateNav();
          },
          events: ["resize"]
        }
      ],
      events: [
        {
          name: "click keydown",
          delegate: ({ selNavItem }) => selNavItem,
          filter: ({ parallax }) => !parallax,
          handler(e) {
            if (e.target.closest("a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              this.show(data(e.current, this.attrItem));
            }
          }
        },
        {
          name: "itemshow",
          handler() {
            this.updateNav();
          }
        },
        {
          name: "keydown",
          delegate: ({ selNavItem }) => selNavItem,
          filter: ({ parallax }) => !parallax,
          handler(e) {
            const { current, keyCode } = e;
            const cmd = data(current, this.attrItem);
            if (!isNumeric(cmd)) {
              return;
            }
            let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT ? "previous" : keyCode === keyMap.RIGHT ? "next" : -1;
            if (~i) {
              e.preventDefault();
              this.show(i);
            }
          }
        }
      ],
      methods: {
        updateNav() {
          const index = this.getValidIndex();
          for (const el of this.navItems) {
            const cmd = data(el, this.attrItem);
            const button = $("a,button", el) || el;
            if (isNumeric(cmd)) {
              const item = toNumber(cmd);
              const active = item === index;
              toggleClass(el, this.clsActive, active);
              toggleClass(button, "uk-disabled", !!this.parallax);
              attr(button, {
                "aria-selected": active,
                tabindex: active && !this.parallax ? null : -1
              });
              if (active && button && matches(parent(el), ":focus-within")) {
                button.focus();
              }
            } else {
              toggleClass(
                el,
                "uk-invisible",
                this.finite && (cmd === "previous" && index === 0 || cmd === "next" && index >= this.maxIndex)
              );
            }
          }
        },
        padNavitems() {
          if (!this.nav) {
            return;
          }
          const children2 = [];
          for (let i = 0; i < this.length; i++) {
            const attr2 = `${this.attrItem}="${i}"`;
            children2[i] = this.navChildren.findLast((el) => el.matches(`[${attr2}]`)) || $(`<li ${attr2}><a href></a></li>`);
          }
          if (!isEqual(children2, this.navChildren)) {
            html(this.nav, children2);
          }
        }
      }
    };

    const easeOutQuad = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    const easeOutQuart = "cubic-bezier(0.165, 0.84, 0.44, 1)";
    var Slider = {
      mixins: [SliderAutoplay, SliderDrag, SliderNav, I18n],
      props: {
        clsActivated: String,
        easing: String,
        index: Number,
        finite: Boolean,
        velocity: Number
      },
      data: () => ({
        easing: "ease",
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: "uk-active",
        clsActivated: "",
        clsEnter: "uk-slide-enter",
        clsLeave: "uk-slide-leave",
        clsSlideActive: "uk-slide-active",
        Transitioner: false,
        transitionOptions: {}
      }),
      connected() {
        this.prevIndex = -1;
        this.index = this.getValidIndex(this.$props.index);
        this.stack = [];
      },
      disconnected() {
        removeClass(this.slides, this.clsActive);
      },
      computed: {
        duration: ({ velocity }, $el) => speedUp($el.offsetWidth / velocity),
        list: ({ selList }, $el) => $(selList, $el),
        maxIndex() {
          return this.length - 1;
        },
        slides() {
          return children(this.list);
        },
        length() {
          return this.slides.length;
        }
      },
      watch: {
        slides(slides, prev) {
          if (prev) {
            this.$emit();
          }
        }
      },
      events: {
        itemshow({ target }) {
          addClass(target, this.clsEnter, this.clsSlideActive);
        },
        itemshown({ target }) {
          removeClass(target, this.clsEnter);
        },
        itemhide({ target }) {
          addClass(target, this.clsLeave);
        },
        itemhidden({ target }) {
          removeClass(target, this.clsLeave, this.clsSlideActive);
        }
      },
      methods: {
        async show(index, force = false) {
          var _a;
          if (this.dragging || !this.length || this.parallax) {
            return;
          }
          const { stack } = this;
          const queueIndex = force ? 0 : stack.length;
          const reset = () => {
            stack.splice(queueIndex, 1);
            if (stack.length) {
              this.show(stack.shift(), true);
            }
          };
          stack[force ? "unshift" : "push"](index);
          if (!force && stack.length > 1) {
            if (stack.length === 2) {
              (_a = this._transitioner) == null ? void 0 : _a.forward(Math.min(this.duration, 200));
            }
            return;
          }
          const prevIndex = this.getIndex(this.index);
          const prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
          const nextIndex = this.getIndex(index, this.index);
          const next = this.slides[nextIndex];
          if (prev === next) {
            reset();
            return;
          }
          this.dir = getDirection(index, prevIndex);
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          if (prev && !trigger(prev, "beforeitemhide", [this]) || !trigger(next, "beforeitemshow", [this, prev])) {
            this.index = this.prevIndex;
            reset();
            return;
          }
          prev && trigger(prev, "itemhide", [this]);
          trigger(next, "itemshow", [this]);
          await this._show(prev, next, force);
          prev && trigger(prev, "itemhidden", [this]);
          trigger(next, "itemshown", [this]);
          stack.shift();
          this._transitioner = null;
          if (stack.length) {
            requestAnimationFrame(() => stack.length && this.show(stack.shift(), true));
          }
        },
        getIndex(index = this.index, prev = this.index) {
          return clamp(
            getIndex(index, this.slides, prev, this.finite),
            0,
            Math.max(0, this.maxIndex)
          );
        },
        getValidIndex(index = this.index, prevIndex = this.prevIndex) {
          return this.getIndex(index, prevIndex);
        },
        async _show(prev, next, force) {
          this._transitioner = this._getTransitioner(prev, next, this.dir, {
            easing: force ? next.offsetWidth < 600 ? easeOutQuad : easeOutQuart : this.easing,
            ...this.transitionOptions
          });
          if (!force && !prev) {
            this._translate(1);
            return;
          }
          const { length } = this.stack;
          return this._transitioner[length > 1 ? "forward" : "show"](
            length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration,
            this.percent
          );
        },
        _translate(percent, prev = this.prevIndex, next = this.index) {
          const transitioner = this._getTransitioner(prev === next ? false : prev, next);
          transitioner.translate(percent);
          return transitioner;
        },
        _getTransitioner(prev = this.prevIndex, next = this.index, dir = this.dir || 1, options = this.transitionOptions) {
          return new this.Transitioner(
            isNumber(prev) ? this.slides[prev] : prev,
            isNumber(next) ? this.slides[next] : next,
            dir * (isRtl ? -1 : 1),
            options
          );
        }
      }
    };
    function getDirection(index, prevIndex) {
      return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
    }
    function speedUp(x) {
      return 0.5 * x + 300;
    }

    var Slideshow = {
      mixins: [Slider],
      props: {
        animation: String
      },
      data: {
        animation: "slide",
        clsActivated: "uk-transition-active",
        Animations: Animations$2,
        Transitioner: Transitioner$1
      },
      computed: {
        animation({ animation, Animations: Animations2 }) {
          return { ...Animations2[animation] || Animations2.slide, name: animation };
        },
        transitionOptions() {
          return { animation: this.animation };
        }
      },
      observe: resize(),
      events: {
        itemshow({ target }) {
          addClass(target, this.clsActive);
        },
        itemshown({ target }) {
          addClass(target, this.clsActivated);
        },
        itemhidden({ target }) {
          removeClass(target, this.clsActive, this.clsActivated);
        }
      }
    };

    var Animations$1 = {
      ...Animations$2,
      fade: {
        show() {
          return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent, zIndex: 0 }, { zIndex: -1 }];
        }
      },
      scale: {
        show() {
          return [{ opacity: 0, transform: scale3d(1 + 0.5), zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 + 0.5 * percent), zIndex: 0 },
            { zIndex: -1 }
          ];
        }
      },
      pull: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ] : [
            { transform: translate(-100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ];
        },
        percent(current, next, dir) {
          return dir < 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(30 * percent), zIndex: -1 },
            { transform: translate(-100 * (1 - percent)), zIndex: 0 }
          ] : [
            { transform: translate(-percent * 100), zIndex: 0 },
            { transform: translate(30 * (1 - percent)), zIndex: -1 }
          ];
        }
      },
      push: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ] : [
            { transform: translate(-30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ];
        },
        percent(current, next, dir) {
          return dir > 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(percent * 100), zIndex: 0 },
            { transform: translate(-30 * (1 - percent)), zIndex: -1 }
          ] : [
            { transform: translate(-30 * percent), zIndex: -1 },
            { transform: translate(100 * (1 - percent)), zIndex: 0 }
          ];
        }
      }
    };
    function scale3d(value) {
      return `scale3d(${value}, ${value}, 1)`;
    }

    var Animations = {
      ...Animations$2,
      fade: {
        show() {
          return [{ opacity: 0 }, { opacity: 1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent }, { opacity: percent }];
        }
      },
      scale: {
        show() {
          return [
            { opacity: 0, transform: scale3d(1 - 0.2) },
            { opacity: 1, transform: scale3d(1) }
          ];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 - 0.2 * percent) },
            { opacity: percent, transform: scale3d(1 - 0.2 + 0.2 * percent) }
          ];
        }
      }
    };

    var LightboxPanel = {
      i18n: {
        counter: "%s / %s"
      },
      mixins: [Modal, Slideshow],
      functional: true,
      props: {
        counter: Boolean,
        preload: Number,
        nav: Boolean,
        slidenav: Boolean,
        delayControls: Number,
        videoAutoplay: Boolean,
        template: String
      },
      data: () => ({
        counter: false,
        preload: 1,
        nav: false,
        slidenav: true,
        delayControls: 3e3,
        videoAutoplay: false,
        items: [],
        cls: "uk-open",
        clsPage: "uk-lightbox-page",
        clsFit: "uk-lightbox-items-fit",
        clsZoom: "uk-lightbox-zoom",
        attrItem: "uk-lightbox-item",
        selList: ".uk-lightbox-items",
        selClose: ".uk-close-large",
        selNav: ".uk-lightbox-thumbnav, .uk-lightbox-dotnav",
        selCaption: ".uk-lightbox-caption",
        selCounter: ".uk-lightbox-counter",
        pauseOnHover: false,
        velocity: 2,
        Animations,
        template: `<div class="uk-lightbox uk-overflow-hidden"> <div class="uk-lightbox-items"></div> <div class="uk-position-top-right uk-position-small uk-transition-fade" uk-inverse> <button class="uk-lightbox-close uk-close-large" type="button" uk-close></button> </div> <div class="uk-lightbox-slidenav uk-position-center-left uk-position-medium uk-transition-fade" uk-inverse> <a href uk-slidenav-previous uk-lightbox-item="previous"></a> </div> <div class="uk-lightbox-slidenav uk-position-center-right uk-position-medium uk-transition-fade" uk-inverse> <a href uk-slidenav-next uk-lightbox-item="next"></a> </div> <div class="uk-position-center-right uk-position-medium uk-transition-fade" uk-inverse style="max-height: 90vh; overflow: auto;"> <ul class="uk-lightbox-thumbnav uk-lightbox-thumbnav-vertical uk-thumbnav uk-thumbnav-vertical"></ul> <ul class="uk-lightbox-dotnav uk-dotnav uk-dotnav-vertical"></ul> </div> <div class="uk-lightbox-counter uk-text-large uk-position-top-left uk-position-small uk-transition-fade" uk-inverse></div> <div class="uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>`
      }),
      created() {
        let $el = $(this.template);
        if (isTag($el, "template")) {
          $el = fragment(html($el));
        }
        const list = $(this.selList, $el);
        const navType = this.$props.nav;
        remove$1($$(this.selNav, $el).filter((el) => !matches(el, `.uk-${navType}`)));
        for (const [i, item] of this.items.entries()) {
          append(list, "<div>");
          if (navType === "thumbnav") {
            wrapAll(
              toThumbnavItem(item, this.videoAutoplay),
              append($(this.selNav, $el), `<li uk-lightbox-item="${i}"><a href></a></li>`)
            );
          }
        }
        if (!this.slidenav) {
          remove$1($$(".uk-lightbox-slidenav", $el));
        }
        if (!this.counter) {
          remove$1($(this.selCounter, $el));
        }
        addClass(list, this.c