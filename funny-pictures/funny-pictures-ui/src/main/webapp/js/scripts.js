function mdMediaFactory($mdConstant, $mdUtil, $rootScope, $window) {
    function $mdMedia(query) {
        var validated = queriesCache.get(query);
        angular.isUndefined(validated) && (validated = queriesCache.put(query, validate(query)));
        var result = resultsCache.get(validated);
        return angular.isUndefined(result) && (result = add(validated)), result;
    }
    function validate(query) {
        return $mdConstant.MEDIA[query] || ("(" !== query.charAt(0) ? "(" + query + ")" : query);
    }
    function add(query) {
        return resultsCache.put(query, !!$window.matchMedia(query).matches);
    }
    function updateAll() {
        var keys = resultsCache.keys(), len = keys.length;
        if (len) {
            for (var i = 0; len > i; i++) add(keys[i]);
            $rootScope.$evalAsync();
        }
    }
    var queriesCache = $mdUtil.cacheFactory("$mdMedia:queries", {
        capacity: 15
    }), resultsCache = $mdUtil.cacheFactory("$mdMedia:results", {
        capacity: 15
    });
    return angular.element($window).on("resize", updateAll), $mdMedia;
}

!function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), 
        jQuery.ready();
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = jQuery.expando + Math.random();
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), 
        data = elem.getAttribute(name), "string" == typeof data) {
            try {
                data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
            } catch (e) {}
            data_user.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), 
            data_user.set(dest, udataCur));
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), 
        iframe.detach()), elemdisplay[nodeName] = display), display;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    var arr = [], slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, document = window.document, version = "2.1.1", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },
        isPlainObject: function(obj) {
            return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), 
            script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code));
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
            if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, strundefined = "undefined", MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            for (var i = 0, len = this.length; len > i; i++) if (this[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
                setDocument();
            }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
                setDocument();
            })), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 
                2 === div.getElementsByClassName("i").length;
            }), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                div.innerHTML = "<select msallowclip=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowclip^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf.call(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, 
            this[0] = elem), this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
            return matched;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; l > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))));
        }
    }), jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1))), readyList.promise(obj);
    }, jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) return 0;
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    }, Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor);
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}), unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data) cache[data] = value; else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data); else for (prop in data) cache[prop] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return void 0 === key ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), 
            void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (void 0 === key) this.cache[unlock] = {}; else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), 
                key in cache ? name = [ key, camel ] : (name = camel, name = name in cache ? [ name ] : name.match(rnotwhite) || [])), 
                i = name.length;
                for (;i--; ) delete cache[name[i]];
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]];
        }
    };
    var data_priv = new Data(), data_user = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    data_priv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                data_user.set(this, key);
            }) : access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key), void 0 !== data) return data;
                    if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                    if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data;
                } else this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = data_priv.get(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
        div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var strundefined = "undefined";
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), 
            (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur !== this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                data_priv.remove(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment;
        },
        cleanData: function(elems) {
            for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                    if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key];
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")));
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    };
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            div.innerHTML = "", docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, 
            docElem.removeChild(container);
        }
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
        container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(), pixelPositionVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), 
                boxSizingReliableVal;
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
                docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), 
                docElem.removeChild(container), ret;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), 
                void 0);
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.value = "t", input.type = "radio", support.radioValue = "t" === input.value;
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            } : function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), 
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this);
        },
        wrapInner: function(html) {
            return this.each(jQuery.isFunction(html) ? function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            } : function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key]();
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback;
        return support.cors || xhrSupported && !options.crossDomain ? {
            send: function(headers, complete) {
                var i, xhr = options.xhr(), id = ++xhrId;
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                            text: xhr.responseText
                        } : void 0, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                    if (callback) throw e;
                }
            },
            abort: function() {
                callback && callback();
            }
        } : void 0;
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function(window) {
    function noop() {}
    function defineBridget($) {
        function addOptionMethod(PluginClass) {
            PluginClass.prototype.option || (PluginClass.prototype.option = function(opts) {
                $.isPlainObject(opts) && (this.options = $.extend(!0, this.options, opts));
            });
        }
        function bridge(namespace, PluginClass) {
            $.fn[namespace] = function(options) {
                if ("string" == typeof options) {
                    for (var args = slice.call(arguments, 1), i = 0, len = this.length; len > i; i++) {
                        var elem = this[i], instance = $.data(elem, namespace);
                        if (instance) if ($.isFunction(instance[options]) && "_" !== options.charAt(0)) {
                            var returnValue = instance[options].apply(instance, args);
                            if (void 0 !== returnValue) return returnValue;
                        } else logError("no such method '" + options + "' for " + namespace + " instance"); else logError("cannot call methods on " + namespace + " prior to initialization; attempted to call '" + options + "'");
                    }
                    return this;
                }
                return this.each(function() {
                    var instance = $.data(this, namespace);
                    instance ? (instance.option(options), instance._init()) : (instance = new PluginClass(this, options), 
                    $.data(this, namespace, instance));
                });
            };
        }
        if ($) {
            var logError = "undefined" == typeof console ? noop : function(message) {
                console.error(message);
            };
            return $.bridget = function(namespace, PluginClass) {
                addOptionMethod(PluginClass), bridge(namespace, PluginClass);
            }, $.bridget;
        }
    }
    var slice = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", [ "jquery" ], defineBridget) : defineBridget("object" == typeof exports ? require("jquery") : window.jQuery);
}(window), function(window) {
    function getIEEvent(obj) {
        var event = window.event;
        return event.target = event.target || event.srcElement || obj, event;
    }
    var docElem = document.documentElement, bind = function() {};
    docElem.addEventListener ? bind = function(obj, type, fn) {
        obj.addEventListener(type, fn, !1);
    } : docElem.attachEvent && (bind = function(obj, type, fn) {
        obj[type + fn] = fn.handleEvent ? function() {
            var event = getIEEvent(obj);
            fn.handleEvent.call(fn, event);
        } : function() {
            var event = getIEEvent(obj);
            fn.call(obj, event);
        }, obj.attachEvent("on" + type, obj[type + fn]);
    });
    var unbind = function() {};
    docElem.removeEventListener ? unbind = function(obj, type, fn) {
        obj.removeEventListener(type, fn, !1);
    } : docElem.detachEvent && (unbind = function(obj, type, fn) {
        obj.detachEvent("on" + type, obj[type + fn]);
        try {
            delete obj[type + fn];
        } catch (err) {
            obj[type + fn] = void 0;
        }
    });
    var eventie = {
        bind: bind,
        unbind: unbind
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", eventie) : "object" == typeof exports ? module.exports = eventie : window.eventie = eventie;
}(this), function(window) {
    function docReady(fn) {
        "function" == typeof fn && (docReady.isReady ? fn() : queue.push(fn));
    }
    function onReady(event) {
        var isIE8NotReady = "readystatechange" === event.type && "complete" !== document.readyState;
        docReady.isReady || isIE8NotReady || trigger();
    }
    function trigger() {
        docReady.isReady = !0;
        for (var i = 0, len = queue.length; len > i; i++) {
            var fn = queue[i];
            fn();
        }
    }
    function defineDocReady(eventie) {
        return "complete" === document.readyState ? trigger() : (eventie.bind(document, "DOMContentLoaded", onReady), 
        eventie.bind(document, "readystatechange", onReady), eventie.bind(window, "load", onReady)), 
        docReady;
    }
    var document = window.document, queue = [];
    docReady.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", [ "eventie/eventie" ], defineDocReady) : "object" == typeof exports ? module.exports = defineDocReady(require("eventie")) : window.docReady = defineDocReady(window.eventie);
}(window), function() {
    function EventEmitter() {}
    function indexOfListener(listeners, listener) {
        for (var i = listeners.length; i--; ) if (listeners[i].listener === listener) return i;
        return -1;
    }
    function alias(name) {
        return function() {
            return this[name].apply(this, arguments);
        };
    }
    var proto = EventEmitter.prototype, exports = this, originalGlobalValue = exports.EventEmitter;
    proto.getListeners = function(evt) {
        var response, key, events = this._getEvents();
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) events.hasOwnProperty(key) && evt.test(key) && (response[key] = events[key]);
        } else response = events[evt] || (events[evt] = []);
        return response;
    }, proto.flattenListeners = function(listeners) {
        var i, flatListeners = [];
        for (i = 0; i < listeners.length; i += 1) flatListeners.push(listeners[i].listener);
        return flatListeners;
    }, proto.getListenersAsObject = function(evt) {
        var response, listeners = this.getListeners(evt);
        return listeners instanceof Array && (response = {}, response[evt] = listeners), 
        response || listeners;
    }, proto.addListener = function(evt, listener) {
        var key, listeners = this.getListenersAsObject(evt), listenerIsWrapped = "object" == typeof listener;
        for (key in listeners) listeners.hasOwnProperty(key) && -1 === indexOfListener(listeners[key], listener) && listeners[key].push(listenerIsWrapped ? listener : {
            listener: listener,
            once: !1
        });
        return this;
    }, proto.on = alias("addListener"), proto.addOnceListener = function(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: !0
        });
    }, proto.once = alias("addOnceListener"), proto.defineEvent = function(evt) {
        return this.getListeners(evt), this;
    }, proto.defineEvents = function(evts) {
        for (var i = 0; i < evts.length; i += 1) this.defineEvent(evts[i]);
        return this;
    }, proto.removeListener = function(evt, listener) {
        var index, key, listeners = this.getListenersAsObject(evt);
        for (key in listeners) listeners.hasOwnProperty(key) && (index = indexOfListener(listeners[key], listener), 
        -1 !== index && listeners[key].splice(index, 1));
        return this;
    }, proto.off = alias("removeListener"), proto.addListeners = function(evt, listeners) {
        return this.manipulateListeners(!1, evt, listeners);
    }, proto.removeListeners = function(evt, listeners) {
        return this.manipulateListeners(!0, evt, listeners);
    }, proto.manipulateListeners = function(remove, evt, listeners) {
        var i, value, single = remove ? this.removeListener : this.addListener, multiple = remove ? this.removeListeners : this.addListeners;
        if ("object" != typeof evt || evt instanceof RegExp) for (i = listeners.length; i--; ) single.call(this, evt, listeners[i]); else for (i in evt) evt.hasOwnProperty(i) && (value = evt[i]) && ("function" == typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
        return this;
    }, proto.removeEvent = function(evt) {
        var key, type = typeof evt, events = this._getEvents();
        if ("string" === type) delete events[evt]; else if (evt instanceof RegExp) for (key in events) events.hasOwnProperty(key) && evt.test(key) && delete events[key]; else delete this._events;
        return this;
    }, proto.removeAllListeners = alias("removeEvent"), proto.emitEvent = function(evt, args) {
        var listener, i, key, response, listeners = this.getListenersAsObject(evt);
        for (key in listeners) if (listeners.hasOwnProperty(key)) for (i = listeners[key].length; i--; ) listener = listeners[key][i], 
        listener.once === !0 && this.removeListener(evt, listener.listener), response = listener.listener.apply(this, args || []), 
        response === this._getOnceReturnValue() && this.removeListener(evt, listener.listener);
        return this;
    }, proto.trigger = alias("emitEvent"), proto.emit = function(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    }, proto.setOnceReturnValue = function(value) {
        return this._onceReturnValue = value, this;
    }, proto._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, proto._getEvents = function() {
        return this._events || (this._events = {});
    }, EventEmitter.noConflict = function() {
        return exports.EventEmitter = originalGlobalValue, EventEmitter;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return EventEmitter;
    }) : "object" == typeof module && module.exports ? module.exports = EventEmitter : exports.EventEmitter = EventEmitter;
}.call(this), function(window) {
    function getStyleProperty(propName) {
        if (propName) {
            if ("string" == typeof docElemStyle[propName]) return propName;
            propName = propName.charAt(0).toUpperCase() + propName.slice(1);
            for (var prefixed, i = 0, len = prefixes.length; len > i; i++) if (prefixed = prefixes[i] + propName, 
            "string" == typeof docElemStyle[prefixed]) return prefixed;
        }
    }
    var prefixes = "Webkit Moz ms Ms O".split(" "), docElemStyle = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return getStyleProperty;
    }) : "object" == typeof exports ? module.exports = getStyleProperty : window.getStyleProperty = getStyleProperty;
}(window), function(window) {
    function getStyleSize(value) {
        var num = parseFloat(value), isValid = -1 === value.indexOf("%") && !isNaN(num);
        return isValid && num;
    }
    function noop() {}
    function getZeroSize() {
        for (var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, i = 0, len = measurements.length; len > i; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
        }
        return size;
    }
    function defineGetSize(getStyleProperty) {
        function setup() {
            if (!isSetup) {
                isSetup = !0;
                var getComputedStyle = window.getComputedStyle;
                if (getStyle = function() {
                    var getStyleFn = getComputedStyle ? function(elem) {
                        return getComputedStyle(elem, null);
                    } : function(elem) {
                        return elem.currentStyle;
                    };
                    return function(elem) {
                        var style = getStyleFn(elem);
                        return style || logError("Style returned " + style + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
                        style;
                    };
                }(), boxSizingProp = getStyleProperty("boxSizing")) {
                    var div = document.createElement("div");
                    div.style.width = "200px", div.style.padding = "1px 2px 3px 4px", div.style.borderStyle = "solid", 
                    div.style.borderWidth = "1px 2px 3px 4px", div.style[boxSizingProp] = "border-box";
                    var body = document.body || document.documentElement;
                    body.appendChild(div);
                    var style = getStyle(div);
                    isBoxSizeOuter = 200 === getStyleSize(style.width), body.removeChild(div);
                }
            }
        }
        function getSize(elem) {
            if (setup(), "string" == typeof elem && (elem = document.querySelector(elem)), elem && "object" == typeof elem && elem.nodeType) {
                var style = getStyle(elem);
                if ("none" === style.display) return getZeroSize();
                var size = {};
                size.width = elem.offsetWidth, size.height = elem.offsetHeight;
                for (var isBorderBox = size.isBorderBox = !(!boxSizingProp || !style[boxSizingProp] || "border-box" !== style[boxSizingProp]), i = 0, len = measurements.length; len > i; i++) {
                    var measurement = measurements[i], value = style[measurement];
                    value = mungeNonPixel(elem, value);
                    var num = parseFloat(value);
                    size[measurement] = isNaN(num) ? 0 : num;
                }
                var paddingWidth = size.paddingLeft + size.paddingRight, paddingHeight = size.paddingTop + size.paddingBottom, marginWidth = size.marginLeft + size.marginRight, marginHeight = size.marginTop + size.marginBottom, borderWidth = size.borderLeftWidth + size.borderRightWidth, borderHeight = size.borderTopWidth + size.borderBottomWidth, isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter, styleWidth = getStyleSize(style.width);
                styleWidth !== !1 && (size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth));
                var styleHeight = getStyleSize(style.height);
                return styleHeight !== !1 && (size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)), 
                size.innerWidth = size.width - (paddingWidth + borderWidth), size.innerHeight = size.height - (paddingHeight + borderHeight), 
                size.outerWidth = size.width + marginWidth, size.outerHeight = size.height + marginHeight, 
                size;
            }
        }
        function mungeNonPixel(elem, value) {
            if (window.getComputedStyle || -1 === value.indexOf("%")) return value;
            var style = elem.style, left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left;
            return rsLeft && (rs.left = elem.currentStyle.left), style.left = value, value = style.pixelLeft, 
            style.left = left, rsLeft && (rs.left = rsLeft), value;
        }
        var getStyle, boxSizingProp, isBoxSizeOuter, isSetup = !1;
        return getSize;
    }
    var logError = "undefined" == typeof console ? noop : function(message) {
        console.error(message);
    }, measurements = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
    "function" == typeof define && define.amd ? define("get-size/get-size", [ "get-style-property/get-style-property" ], defineGetSize) : "object" == typeof exports ? module.exports = defineGetSize(require("desandro-get-style-property")) : window.getSize = defineGetSize(window.getStyleProperty);
}(window), function(ElemProto) {
    function match(elem, selector) {
        return elem[matchesMethod](selector);
    }
    function checkParent(elem) {
        if (!elem.parentNode) {
            var fragment = document.createDocumentFragment();
            fragment.appendChild(elem);
        }
    }
    function query(elem, selector) {
        checkParent(elem);
        for (var elems = elem.parentNode.querySelectorAll(selector), i = 0, len = elems.length; len > i; i++) if (elems[i] === elem) return !0;
        return !1;
    }
    function matchChild(elem, selector) {
        return checkParent(elem), match(elem, selector);
    }
    var matchesSelector, matchesMethod = function() {
        if (ElemProto.matchesSelector) return "matchesSelector";
        for (var prefixes = [ "webkit", "moz", "ms", "o" ], i = 0, len = prefixes.length; len > i; i++) {
            var prefix = prefixes[i], method = prefix + "MatchesSelector";
            if (ElemProto[method]) return method;
        }
    }();
    if (matchesMethod) {
        var div = document.createElement("div"), supportsOrphans = match(div, "div");
        matchesSelector = supportsOrphans ? match : matchChild;
    } else matchesSelector = query;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return matchesSelector;
    }) : "object" == typeof exports ? module.exports = matchesSelector : window.matchesSelector = matchesSelector;
}(Element.prototype), function(window) {
    function extend(a, b) {
        for (var prop in b) a[prop] = b[prop];
        return a;
    }
    function isEmptyObj(obj) {
        for (var prop in obj) return !1;
        return prop = null, !0;
    }
    function toDash(str) {
        return str.replace(/([A-Z])/g, function($1) {
            return "-" + $1.toLowerCase();
        });
    }
    function outlayerItemDefinition(EventEmitter, getSize, getStyleProperty) {
        function Item(element, layout) {
            element && (this.element = element, this.layout = layout, this.position = {
                x: 0,
                y: 0
            }, this._create());
        }
        var transitionProperty = getStyleProperty("transition"), transformProperty = getStyleProperty("transform"), supportsCSS3 = transitionProperty && transformProperty, is3d = !!getStyleProperty("perspective"), transitionEndEvent = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[transitionProperty], prefixableProperties = [ "transform", "transition", "transitionDuration", "transitionProperty" ], vendorProperties = function() {
            for (var cache = {}, i = 0, len = prefixableProperties.length; len > i; i++) {
                var prop = prefixableProperties[i], supportedProp = getStyleProperty(prop);
                supportedProp && supportedProp !== prop && (cache[prop] = supportedProp);
            }
            return cache;
        }();
        extend(Item.prototype, EventEmitter.prototype), Item.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            });
        }, Item.prototype.handleEvent = function(event) {
            var method = "on" + event.type;
            this[method] && this[method](event);
        }, Item.prototype.getSize = function() {
            this.size = getSize(this.element);
        }, Item.prototype.css = function(style) {
            var elemStyle = this.element.style;
            for (var prop in style) {
                var supportedProp = vendorProperties[prop] || prop;
                elemStyle[supportedProp] = style[prop];
            }
        }, Item.prototype.getPosition = function() {
            var style = getStyle(this.element), layoutOptions = this.layout.options, isOriginLeft = layoutOptions.isOriginLeft, isOriginTop = layoutOptions.isOriginTop, x = parseInt(style[isOriginLeft ? "left" : "right"], 10), y = parseInt(style[isOriginTop ? "top" : "bottom"], 10);
            x = isNaN(x) ? 0 : x, y = isNaN(y) ? 0 : y;
            var layoutSize = this.layout.size;
            x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight, y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom, 
            this.position.x = x, this.position.y = y;
        }, Item.prototype.layoutPosition = function() {
            var layoutSize = this.layout.size, layoutOptions = this.layout.options, style = {};
            layoutOptions.isOriginLeft ? (style.left = this.position.x + layoutSize.paddingLeft + "px", 
            style.right = "") : (style.right = this.position.x + layoutSize.paddingRight + "px", 
            style.left = ""), layoutOptions.isOriginTop ? (style.top = this.position.y + layoutSize.paddingTop + "px", 
            style.bottom = "") : (style.bottom = this.position.y + layoutSize.paddingBottom + "px", 
            style.top = ""), this.css(style), this.emitEvent("layout", [ this ]);
        };
        var translate = is3d ? function(x, y) {
            return "translate3d(" + x + "px, " + y + "px, 0)";
        } : function(x, y) {
            return "translate(" + x + "px, " + y + "px)";
        };
        Item.prototype._transitionTo = function(x, y) {
            this.getPosition();
            var curX = this.position.x, curY = this.position.y, compareX = parseInt(x, 10), compareY = parseInt(y, 10), didNotMove = compareX === this.position.x && compareY === this.position.y;
            if (this.setPosition(x, y), didNotMove && !this.isTransitioning) return void this.layoutPosition();
            var transX = x - curX, transY = y - curY, transitionStyle = {}, layoutOptions = this.layout.options;
            transX = layoutOptions.isOriginLeft ? transX : -transX, transY = layoutOptions.isOriginTop ? transY : -transY, 
            transitionStyle.transform = translate(transX, transY), this.transition({
                to: transitionStyle,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            });
        }, Item.prototype.goTo = function(x, y) {
            this.setPosition(x, y), this.layoutPosition();
        }, Item.prototype.moveTo = supportsCSS3 ? Item.prototype._transitionTo : Item.prototype.goTo, 
        Item.prototype.setPosition = function(x, y) {
            this.position.x = parseInt(x, 10), this.position.y = parseInt(y, 10);
        }, Item.prototype._nonTransition = function(args) {
            this.css(args.to), args.isCleaning && this._removeStyles(args.to);
            for (var prop in args.onTransitionEnd) args.onTransitionEnd[prop].call(this);
        }, Item.prototype._transition = function(args) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(args);
            var _transition = this._transn;
            for (var prop in args.onTransitionEnd) _transition.onEnd[prop] = args.onTransitionEnd[prop];
            for (prop in args.to) _transition.ingProperties[prop] = !0, args.isCleaning && (_transition.clean[prop] = !0);
            if (args.from) {
                this.css(args.from);
                var h = this.element.offsetHeight;
                h = null;
            }
            this.enableTransition(args.to), this.css(args.to), this.isTransitioning = !0;
        };
        var itemTransitionProperties = transformProperty && toDash(transformProperty) + ",opacity";
        Item.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: itemTransitionProperties,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(transitionEndEvent, this, !1));
        }, Item.prototype.transition = Item.prototype[transitionProperty ? "_transition" : "_nonTransition"], 
        Item.prototype.onwebkitTransitionEnd = function(event) {
            this.ontransitionend(event);
        }, Item.prototype.onotransitionend = function(event) {
            this.ontransitionend(event);
        };
        var dashedVendorProperties = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        Item.prototype.ontransitionend = function(event) {
            if (event.target === this.element) {
                var _transition = this._transn, propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
                if (delete _transition.ingProperties[propertyName], isEmptyObj(_transition.ingProperties) && this.disableTransition(), 
                propertyName in _transition.clean && (this.element.style[event.propertyName] = "", 
                delete _transition.clean[propertyName]), propertyName in _transition.onEnd) {
                    var onTransitionEnd = _transition.onEnd[propertyName];
                    onTransitionEnd.call(this), delete _transition.onEnd[propertyName];
                }
                this.emitEvent("transitionEnd", [ this ]);
            }
        }, Item.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(transitionEndEvent, this, !1), 
            this.isTransitioning = !1;
        }, Item.prototype._removeStyles = function(style) {
            var cleanStyle = {};
            for (var prop in style) cleanStyle[prop] = "";
            this.css(cleanStyle);
        };
        var cleanTransitionStyle = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return Item.prototype.removeTransitionStyles = function() {
            this.css(cleanTransitionStyle);
        }, Item.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [ this ]);
        }, Item.prototype.remove = function() {
            if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var _this = this;
            this.on("transitionEnd", function() {
                return _this.removeElem(), !0;
            }), this.hide();
        }, Item.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var options = this.layout.options;
            this.transition({
                from: options.hiddenStyle,
                to: options.visibleStyle,
                isCleaning: !0
            });
        }, Item.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var options = this.layout.options;
            this.transition({
                from: options.visibleStyle,
                to: options.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function() {
                        this.isHidden && this.css({
                            display: "none"
                        });
                    }
                }
            });
        }, Item.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            });
        }, Item;
    }
    var getComputedStyle = window.getComputedStyle, getStyle = getComputedStyle ? function(elem) {
        return getComputedStyle(elem, null);
    } : function(elem) {
        return elem.currentStyle;
    };
    "function" == typeof define && define.amd ? define("outlayer/item", [ "eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property" ], outlayerItemDefinition) : "object" == typeof exports ? module.exports = outlayerItemDefinition(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (window.Outlayer = {}, 
    window.Outlayer.Item = outlayerItemDefinition(window.EventEmitter, window.getSize, window.getStyleProperty));
}(window), function(window) {
    function extend(a, b) {
        for (var prop in b) a[prop] = b[prop];
        return a;
    }
    function isArray(obj) {
        return "[object Array]" === objToString.call(obj);
    }
    function makeArray(obj) {
        var ary = [];
        if (isArray(obj)) ary = obj; else if (obj && "number" == typeof obj.length) for (var i = 0, len = obj.length; len > i; i++) ary.push(obj[i]); else ary.push(obj);
        return ary;
    }
    function removeFrom(obj, ary) {
        var index = indexOf(ary, obj);
        -1 !== index && ary.splice(index, 1);
    }
    function toDashed(str) {
        return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
            return $1 + "-" + $2;
        }).toLowerCase();
    }
    function outlayerDefinition(eventie, docReady, EventEmitter, getSize, matchesSelector, Item) {
        function Outlayer(element, options) {
            if ("string" == typeof element && (element = document.querySelector(element)), !element || !isElement(element)) return void (console && console.error("Bad " + this.constructor.namespace + " element: " + element));
            this.element = element, this.options = extend({}, this.constructor.defaults), this.option(options);
            var id = ++GUID;
            this.element.outlayerGUID = id, instances[id] = this, this._create(), this.options.isInitLayout && this.layout();
        }
        var GUID = 0, instances = {};
        return Outlayer.namespace = "outlayer", Outlayer.Item = Item, Outlayer.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, extend(Outlayer.prototype, EventEmitter.prototype), Outlayer.prototype.option = function(opts) {
            extend(this.options, opts);
        }, Outlayer.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), extend(this.element.style, this.options.containerStyle), 
            this.options.isResizeBound && this.bindResize();
        }, Outlayer.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children);
        }, Outlayer.prototype._itemize = function(elems) {
            for (var itemElems = this._filterFindItemElements(elems), Item = this.constructor.Item, items = [], i = 0, len = itemElems.length; len > i; i++) {
                var elem = itemElems[i], item = new Item(elem, this);
                items.push(item);
            }
            return items;
        }, Outlayer.prototype._filterFindItemElements = function(elems) {
            elems = makeArray(elems);
            for (var itemSelector = this.options.itemSelector, itemElems = [], i = 0, len = elems.length; len > i; i++) {
                var elem = elems[i];
                if (isElement(elem)) if (itemSelector) {
                    matchesSelector(elem, itemSelector) && itemElems.push(elem);
                    for (var childElems = elem.querySelectorAll(itemSelector), j = 0, jLen = childElems.length; jLen > j; j++) itemElems.push(childElems[j]);
                } else itemElems.push(elem);
            }
            return itemElems;
        }, Outlayer.prototype.getItemElements = function() {
            for (var elems = [], i = 0, len = this.items.length; len > i; i++) elems.push(this.items[i].element);
            return elems;
        }, Outlayer.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var isInstant = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, isInstant), this._isLayoutInited = !0;
        }, Outlayer.prototype._init = Outlayer.prototype.layout, Outlayer.prototype._resetLayout = function() {
            this.getSize();
        }, Outlayer.prototype.getSize = function() {
            this.size = getSize(this.element);
        }, Outlayer.prototype._getMeasurement = function(measurement, size) {
            var elem, option = this.options[measurement];
            option ? ("string" == typeof option ? elem = this.element.querySelector(option) : isElement(option) && (elem = option), 
            this[measurement] = elem ? getSize(elem)[size] : option) : this[measurement] = 0;
        }, Outlayer.prototype.layoutItems = function(items, isInstant) {
            items = this._getItemsForLayout(items), this._layoutItems(items, isInstant), this._postLayout();
        }, Outlayer.prototype._getItemsForLayout = function(items) {
            for (var layoutItems = [], i = 0, len = items.length; len > i; i++) {
                var item = items[i];
                item.isIgnored || layoutItems.push(item);
            }
            return layoutItems;
        }, Outlayer.prototype._layoutItems = function(items, isInstant) {
            function onItemsLayout() {
                _this.emitEvent("layoutComplete", [ _this, items ]);
            }
            var _this = this;
            if (!items || !items.length) return void onItemsLayout();
            this._itemsOn(items, "layout", onItemsLayout);
            for (var queue = [], i = 0, len = items.length; len > i; i++) {
                var item = items[i], position = this._getItemLayoutPosition(item);
                position.item = item, position.isInstant = isInstant || item.isLayoutInstant, queue.push(position);
            }
            this._processLayoutQueue(queue);
        }, Outlayer.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            };
        }, Outlayer.prototype._processLayoutQueue = function(queue) {
            for (var i = 0, len = queue.length; len > i; i++) {
                var obj = queue[i];
                this._positionItem(obj.item, obj.x, obj.y, obj.isInstant);
            }
        }, Outlayer.prototype._positionItem = function(item, x, y, isInstant) {
            isInstant ? item.goTo(x, y) : item.moveTo(x, y);
        }, Outlayer.prototype._postLayout = function() {
            this.resizeContainer();
        }, Outlayer.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var size = this._getContainerSize();
                size && (this._setContainerMeasure(size.width, !0), this._setContainerMeasure(size.height, !1));
            }
        }, Outlayer.prototype._getContainerSize = noop, Outlayer.prototype._setContainerMeasure = function(measure, isWidth) {
            if (void 0 !== measure) {
                var elemSize = this.size;
                elemSize.isBorderBox && (measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth), 
                measure = Math.max(measure, 0), this.element.style[isWidth ? "width" : "height"] = measure + "px";
            }
        }, Outlayer.prototype._itemsOn = function(items, eventName, callback) {
            function tick() {
                return doneCount++, doneCount === count && callback.call(_this), !0;
            }
            for (var doneCount = 0, count = items.length, _this = this, i = 0, len = items.length; len > i; i++) {
                var item = items[i];
                item.on(eventName, tick);
            }
        }, Outlayer.prototype.ignore = function(elem) {
            var item = this.getItem(elem);
            item && (item.isIgnored = !0);
        }, Outlayer.prototype.unignore = function(elem) {
            var item = this.getItem(elem);
            item && delete item.isIgnored;
        }, Outlayer.prototype.stamp = function(elems) {
            if (elems = this._find(elems)) {
                this.stamps = this.stamps.concat(elems);
                for (var i = 0, len = elems.length; len > i; i++) {
                    var elem = elems[i];
                    this.ignore(elem);
                }
            }
        }, Outlayer.prototype.unstamp = function(elems) {
            if (elems = this._find(elems)) for (var i = 0, len = elems.length; len > i; i++) {
                var elem = elems[i];
                removeFrom(elem, this.stamps), this.unignore(elem);
            }
        }, Outlayer.prototype._find = function(elems) {
            return elems ? ("string" == typeof elems && (elems = this.element.querySelectorAll(elems)), 
            elems = makeArray(elems)) : void 0;
        }, Outlayer.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var i = 0, len = this.stamps.length; len > i; i++) {
                    var stamp = this.stamps[i];
                    this._manageStamp(stamp);
                }
            }
        }, Outlayer.prototype._getBoundingRect = function() {
            var boundingRect = this.element.getBoundingClientRect(), size = this.size;
            this._boundingRect = {
                left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
                top: boundingRect.top + size.paddingTop + size.borderTopWidth,
                right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
                bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
            };
        }, Outlayer.prototype._manageStamp = noop, Outlayer.prototype._getElementOffset = function(elem) {
            var boundingRect = elem.getBoundingClientRect(), thisRect = this._boundingRect, size = getSize(elem), offset = {
                left: boundingRect.left - thisRect.left - size.marginLeft,
                top: boundingRect.top - thisRect.top - size.marginTop,
                right: thisRect.right - boundingRect.right - size.marginRight,
                bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
            };
            return offset;
        }, Outlayer.prototype.handleEvent = function(event) {
            var method = "on" + event.type;
            this[method] && this[method](event);
        }, Outlayer.prototype.bindResize = function() {
            this.isResizeBound || (eventie.bind(window, "resize", this), this.isResizeBound = !0);
        }, Outlayer.prototype.unbindResize = function() {
            this.isResizeBound && eventie.unbind(window, "resize", this), this.isResizeBound = !1;
        }, Outlayer.prototype.onresize = function() {
            function delayed() {
                _this.resize(), delete _this.resizeTimeout;
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var _this = this;
            this.resizeTimeout = setTimeout(delayed, 100);
        }, Outlayer.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout();
        }, Outlayer.prototype.needsResizeLayout = function() {
            var size = getSize(this.element), hasSizes = this.size && size;
            return hasSizes && size.innerWidth !== this.size.innerWidth;
        }, Outlayer.prototype.addItems = function(elems) {
            var items = this._itemize(elems);
            return items.length && (this.items = this.items.concat(items)), items;
        }, Outlayer.prototype.appended = function(elems) {
            var items = this.addItems(elems);
            items.length && (this.layoutItems(items, !0), this.reveal(items));
        }, Outlayer.prototype.prepended = function(elems) {
            var items = this._itemize(elems);
            if (items.length) {
                var previousItems = this.items.slice(0);
                this.items = items.concat(previousItems), this._resetLayout(), this._manageStamps(), 
                this.layoutItems(items, !0), this.reveal(items), this.layoutItems(previousItems);
            }
        }, Outlayer.prototype.reveal = function(items) {
            var len = items && items.length;
            if (len) for (var i = 0; len > i; i++) {
                var item = items[i];
                item.reveal();
            }
        }, Outlayer.prototype.hide = function(items) {
            var len = items && items.length;
            if (len) for (var i = 0; len > i; i++) {
                var item = items[i];
                item.hide();
            }
        }, Outlayer.prototype.getItem = function(elem) {
            for (var i = 0, len = this.items.length; len > i; i++) {
                var item = this.items[i];
                if (item.element === elem) return item;
            }
        }, Outlayer.prototype.getItems = function(elems) {
            if (elems && elems.length) {
                for (var items = [], i = 0, len = elems.length; len > i; i++) {
                    var elem = elems[i], item = this.getItem(elem);
                    item && items.push(item);
                }
                return items;
            }
        }, Outlayer.prototype.remove = function(elems) {
            elems = makeArray(elems);
            var removeItems = this.getItems(elems);
            if (removeItems && removeItems.length) {
                this._itemsOn(removeItems, "remove", function() {
                    this.emitEvent("removeComplete", [ this, removeItems ]);
                });
                for (var i = 0, len = removeItems.length; len > i; i++) {
                    var item = removeItems[i];
                    item.remove(), removeFrom(item, this.items);
                }
            }
        }, Outlayer.prototype.destroy = function() {
            var style = this.element.style;
            style.height = "", style.position = "", style.width = "";
            for (var i = 0, len = this.items.length; len > i; i++) {
                var item = this.items[i];
                item.destroy();
            }
            this.unbindResize();
            var id = this.element.outlayerGUID;
            delete instances[id], delete this.element.outlayerGUID, jQuery && jQuery.removeData(this.element, this.constructor.namespace);
        }, Outlayer.data = function(elem) {
            var id = elem && elem.outlayerGUID;
            return id && instances[id];
        }, Outlayer.create = function(namespace, options) {
            function Layout() {
                Outlayer.apply(this, arguments);
            }
            return Object.create ? Layout.prototype = Object.create(Outlayer.prototype) : extend(Layout.prototype, Outlayer.prototype), 
            Layout.prototype.constructor = Layout, Layout.defaults = extend({}, Outlayer.defaults), 
            extend(Layout.defaults, options), Layout.prototype.settings = {}, Layout.namespace = namespace, 
            Layout.data = Outlayer.data, Layout.Item = function() {
                Item.apply(this, arguments);
            }, Layout.Item.prototype = new Item(), docReady(function() {
                for (var dashedNamespace = toDashed(namespace), elems = document.querySelectorAll(".js-" + dashedNamespace), dataAttr = "data-" + dashedNamespace + "-options", i = 0, len = elems.length; len > i; i++) {
                    var options, elem = elems[i], attr = elem.getAttribute(dataAttr);
                    try {
                        options = attr && JSON.parse(attr);
                    } catch (error) {
                        console && console.error("Error parsing " + dataAttr + " on " + elem.nodeName.toLowerCase() + (elem.id ? "#" + elem.id : "") + ": " + error);
                        continue;
                    }
                    var instance = new Layout(elem, options);
                    jQuery && jQuery.data(elem, namespace, instance);
                }
            }), jQuery && jQuery.bridget && jQuery.bridget(namespace, Layout), Layout;
        }, Outlayer.Item = Item, Outlayer;
    }
    var document = window.document, console = window.console, jQuery = window.jQuery, noop = function() {}, objToString = Object.prototype.toString, isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(obj) {
        return obj instanceof HTMLElement;
    } : function(obj) {
        return obj && "object" == typeof obj && 1 === obj.nodeType && "string" == typeof obj.nodeName;
    }, indexOf = Array.prototype.indexOf ? function(ary, obj) {
        return ary.indexOf(obj);
    } : function(ary, obj) {
        for (var i = 0, len = ary.length; len > i; i++) if (ary[i] === obj) return i;
        return -1;
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item" ], outlayerDefinition) : "object" == typeof exports ? module.exports = outlayerDefinition(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : window.Outlayer = outlayerDefinition(window.eventie, window.docReady, window.EventEmitter, window.getSize, window.matchesSelector, window.Outlayer.Item);
}(window), function(window) {
    function masonryDefinition(Outlayer, getSize) {
        var Masonry = Outlayer.create("masonry");
        return Masonry.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
            this.measureColumns();
            var i = this.cols;
            for (this.colYs = []; i--; ) this.colYs.push(0);
            this.maxY = 0;
        }, Masonry.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var firstItem = this.items[0], firstItemElem = firstItem && firstItem.element;
                this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth;
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), 
            this.cols = Math.max(this.cols, 1);
        }, Masonry.prototype.getContainerWidth = function() {
            var container = this.options.isFitWidth ? this.element.parentNode : this.element, size = getSize(container);
            this.containerWidth = size && size.innerWidth;
        }, Masonry.prototype._getItemLayoutPosition = function(item) {
            item.getSize();
            var remainder = item.size.outerWidth % this.columnWidth, mathMethod = remainder && 1 > remainder ? "round" : "ceil", colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
            colSpan = Math.min(colSpan, this.cols);
            for (var colGroup = this._getColGroup(colSpan), minimumY = Math.min.apply(Math, colGroup), shortColIndex = indexOf(colGroup, minimumY), position = {
                x: this.columnWidth * shortColIndex,
                y: minimumY
            }, setHeight = minimumY + item.size.outerHeight, setSpan = this.cols + 1 - colGroup.length, i = 0; setSpan > i; i++) this.colYs[shortColIndex + i] = setHeight;
            return position;
        }, Masonry.prototype._getColGroup = function(colSpan) {
            if (2 > colSpan) return this.colYs;
            for (var colGroup = [], groupCount = this.cols + 1 - colSpan, i = 0; groupCount > i; i++) {
                var groupColYs = this.colYs.slice(i, i + colSpan);
                colGroup[i] = Math.max.apply(Math, groupColYs);
            }
            return colGroup;
        }, Masonry.prototype._manageStamp = function(stamp) {
            var stampSize = getSize(stamp), offset = this._getElementOffset(stamp), firstX = this.options.isOriginLeft ? offset.left : offset.right, lastX = firstX + stampSize.outerWidth, firstCol = Math.floor(firstX / this.columnWidth);
            firstCol = Math.max(0, firstCol);
            var lastCol = Math.floor(lastX / this.columnWidth);
            lastCol -= lastX % this.columnWidth ? 0 : 1, lastCol = Math.min(this.cols - 1, lastCol);
            for (var stampMaxY = (this.options.isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight, i = firstCol; lastCol >= i; i++) this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }, Masonry.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var size = {
                height: this.maxY
            };
            return this.options.isFitWidth && (size.width = this._getContainerFitWidth()), size;
        }, Masonry.prototype._getContainerFitWidth = function() {
            for (var unusedCols = 0, i = this.cols; --i && 0 === this.colYs[i]; ) unusedCols++;
            return (this.cols - unusedCols) * this.columnWidth - this.gutter;
        }, Masonry.prototype.needsResizeLayout = function() {
            var previousWidth = this.containerWidth;
            return this.getContainerWidth(), previousWidth !== this.containerWidth;
        }, Masonry;
    }
    var indexOf = Array.prototype.indexOf ? function(items, value) {
        return items.indexOf(value);
    } : function(items, value) {
        for (var i = 0, len = items.length; len > i; i++) {
            var item = items[i];
            if (item === value) return i;
        }
        return -1;
    };
    "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size" ], masonryDefinition) : "object" == typeof exports ? module.exports = masonryDefinition(require("outlayer"), require("get-size")) : window.Masonry = masonryDefinition(window.Outlayer, window.getSize);
}(window), function() {
    function EventEmitter() {}
    function indexOfListener(listeners, listener) {
        for (var i = listeners.length; i--; ) if (listeners[i].listener === listener) return i;
        return -1;
    }
    function alias(name) {
        return function() {
            return this[name].apply(this, arguments);
        };
    }
    var proto = EventEmitter.prototype, exports = this, originalGlobalValue = exports.EventEmitter;
    proto.getListeners = function(evt) {
        var response, key, events = this._getEvents();
        if ("object" == typeof evt) {
            response = {};
            for (key in events) events.hasOwnProperty(key) && evt.test(key) && (response[key] = events[key]);
        } else response = events[evt] || (events[evt] = []);
        return response;
    }, proto.flattenListeners = function(listeners) {
        var i, flatListeners = [];
        for (i = 0; i < listeners.length; i += 1) flatListeners.push(listeners[i].listener);
        return flatListeners;
    }, proto.getListenersAsObject = function(evt) {
        var response, listeners = this.getListeners(evt);
        return listeners instanceof Array && (response = {}, response[evt] = listeners), 
        response || listeners;
    }, proto.addListener = function(evt, listener) {
        var key, listeners = this.getListenersAsObject(evt), listenerIsWrapped = "object" == typeof listener;
        for (key in listeners) listeners.hasOwnProperty(key) && -1 === indexOfListener(listeners[key], listener) && listeners[key].push(listenerIsWrapped ? listener : {
            listener: listener,
            once: !1
        });
        return this;
    }, proto.on = alias("addListener"), proto.addOnceListener = function(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: !0
        });
    }, proto.once = alias("addOnceListener"), proto.defineEvent = function(evt) {
        return this.getListeners(evt), this;
    }, proto.defineEvents = function(evts) {
        for (var i = 0; i < evts.length; i += 1) this.defineEvent(evts[i]);
        return this;
    }, proto.removeListener = function(evt, listener) {
        var index, key, listeners = this.getListenersAsObject(evt);
        for (key in listeners) listeners.hasOwnProperty(key) && (index = indexOfListener(listeners[key], listener), 
        -1 !== index && listeners[key].splice(index, 1));
        return this;
    }, proto.off = alias("removeListener"), proto.addListeners = function(evt, listeners) {
        return this.manipulateListeners(!1, evt, listeners);
    }, proto.removeListeners = function(evt, listeners) {
        return this.manipulateListeners(!0, evt, listeners);
    }, proto.manipulateListeners = function(remove, evt, listeners) {
        var i, value, single = remove ? this.removeListener : this.addListener, multiple = remove ? this.removeListeners : this.addListeners;
        if ("object" != typeof evt || evt instanceof RegExp) for (i = listeners.length; i--; ) single.call(this, evt, listeners[i]); else for (i in evt) evt.hasOwnProperty(i) && (value = evt[i]) && ("function" == typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
        return this;
    }, proto.removeEvent = function(evt) {
        var key, type = typeof evt, events = this._getEvents();
        if ("string" === type) delete events[evt]; else if ("object" === type) for (key in events) events.hasOwnProperty(key) && evt.test(key) && delete events[key]; else delete this._events;
        return this;
    }, proto.removeAllListeners = alias("removeEvent"), proto.emitEvent = function(evt, args) {
        var listener, i, key, response, listeners = this.getListenersAsObject(evt);
        for (key in listeners) if (listeners.hasOwnProperty(key)) for (i = listeners[key].length; i--; ) listener = listeners[key][i], 
        listener.once === !0 && this.removeListener(evt, listener.listener), response = listener.listener.apply(this, args || []), 
        response === this._getOnceReturnValue() && this.removeListener(evt, listener.listener);
        return this;
    }, proto.trigger = alias("emitEvent"), proto.emit = function(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    }, proto.setOnceReturnValue = function(value) {
        return this._onceReturnValue = value, this;
    }, proto._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, proto._getEvents = function() {
        return this._events || (this._events = {});
    }, EventEmitter.noConflict = function() {
        return exports.EventEmitter = originalGlobalValue, EventEmitter;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return EventEmitter;
    }) : "object" == typeof module && module.exports ? module.exports = EventEmitter : this.EventEmitter = EventEmitter;
}.call(this), function(window) {
    function getIEEvent(obj) {
        var event = window.event;
        return event.target = event.target || event.srcElement || obj, event;
    }
    var docElem = document.documentElement, bind = function() {};
    docElem.addEventListener ? bind = function(obj, type, fn) {
        obj.addEventListener(type, fn, !1);
    } : docElem.attachEvent && (bind = function(obj, type, fn) {
        obj[type + fn] = fn.handleEvent ? function() {
            var event = getIEEvent(obj);
            fn.handleEvent.call(fn, event);
        } : function() {
            var event = getIEEvent(obj);
            fn.call(obj, event);
        }, obj.attachEvent("on" + type, obj[type + fn]);
    });
    var unbind = function() {};
    docElem.removeEventListener ? unbind = function(obj, type, fn) {
        obj.removeEventListener(type, fn, !1);
    } : docElem.detachEvent && (unbind = function(obj, type, fn) {
        obj.detachEvent("on" + type, obj[type + fn]);
        try {
            delete obj[type + fn];
        } catch (err) {
            obj[type + fn] = void 0;
        }
    });
    var eventie = {
        bind: bind,
        unbind: unbind
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", eventie) : window.eventie = eventie;
}(this), function(window, factory) {
    "function" == typeof define && define.amd ? define([ "eventEmitter/EventEmitter", "eventie/eventie" ], function(EventEmitter, eventie) {
        return factory(window, EventEmitter, eventie);
    }) : "object" == typeof exports ? module.exports = factory(window, require("wolfy87-eventemitter"), require("eventie")) : window.imagesLoaded = factory(window, window.EventEmitter, window.eventie);
}(window, function(window, EventEmitter, eventie) {
    function extend(a, b) {
        for (var prop in b) a[prop] = b[prop];
        return a;
    }
    function isArray(obj) {
        return "[object Array]" === objToString.call(obj);
    }
    function makeArray(obj) {
        var ary = [];
        if (isArray(obj)) ary = obj; else if ("number" == typeof obj.length) for (var i = 0, len = obj.length; len > i; i++) ary.push(obj[i]); else ary.push(obj);
        return ary;
    }
    function ImagesLoaded(elem, options, onAlways) {
        if (!(this instanceof ImagesLoaded)) return new ImagesLoaded(elem, options);
        "string" == typeof elem && (elem = document.querySelectorAll(elem)), this.elements = makeArray(elem), 
        this.options = extend({}, this.options), "function" == typeof options ? onAlways = options : extend(this.options, options), 
        onAlways && this.on("always", onAlways), this.getImages(), $ && (this.jqDeferred = new $.Deferred());
        var _this = this;
        setTimeout(function() {
            _this.check();
        });
    }
    function LoadingImage(img) {
        this.img = img;
    }
    function Resource(src) {
        this.src = src, cache[src] = this;
    }
    var $ = window.jQuery, console = window.console, hasConsole = "undefined" != typeof console, objToString = Object.prototype.toString;
    ImagesLoaded.prototype = new EventEmitter(), ImagesLoaded.prototype.options = {}, 
    ImagesLoaded.prototype.getImages = function() {
        this.images = [];
        for (var i = 0, len = this.elements.length; len > i; i++) {
            var elem = this.elements[i];
            "IMG" === elem.nodeName && this.addImage(elem);
            var nodeType = elem.nodeType;
            if (nodeType && (1 === nodeType || 9 === nodeType || 11 === nodeType)) for (var childElems = elem.querySelectorAll("img"), j = 0, jLen = childElems.length; jLen > j; j++) {
                var img = childElems[j];
                this.addImage(img);
            }
        }
    }, ImagesLoaded.prototype.addImage = function(img) {
        var loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
    }, ImagesLoaded.prototype.check = function() {
        function onConfirm(image, message) {
            return _this.options.debug && hasConsole && console.log("confirm", image, message), 
            _this.progress(image), checkedCount++, checkedCount === length && _this.complete(), 
            !0;
        }
        var _this = this, checkedCount = 0, length = this.images.length;
        if (this.hasAnyBroken = !1, !length) return void this.complete();
        for (var i = 0; length > i; i++) {
            var loadingImage = this.images[i];
            loadingImage.on("confirm", onConfirm), loadingImage.check();
        }
    }, ImagesLoaded.prototype.progress = function(image) {
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        var _this = this;
        setTimeout(function() {
            _this.emit("progress", _this, image), _this.jqDeferred && _this.jqDeferred.notify && _this.jqDeferred.notify(_this, image);
        });
    }, ImagesLoaded.prototype.complete = function() {
        var eventName = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var _this = this;
        setTimeout(function() {
            if (_this.emit(eventName, _this), _this.emit("always", _this), _this.jqDeferred) {
                var jqMethod = _this.hasAnyBroken ? "reject" : "resolve";
                _this.jqDeferred[jqMethod](_this);
            }
        });
    }, $ && ($.fn.imagesLoaded = function(options, callback) {
        var instance = new ImagesLoaded(this, options, callback);
        return instance.jqDeferred.promise($(this));
    }), LoadingImage.prototype = new EventEmitter(), LoadingImage.prototype.check = function() {
        var resource = cache[this.img.src] || new Resource(this.img.src);
        if (resource.isConfirmed) return void this.confirm(resource.isLoaded, "cached was confirmed");
        if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        var _this = this;
        resource.on("confirm", function(resrc, message) {
            return _this.confirm(resrc.isLoaded, message), !0;
        }), resource.check();
    }, LoadingImage.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded, this.emit("confirm", this, message);
    };
    var cache = {};
    return Resource.prototype = new EventEmitter(), Resource.prototype.check = function() {
        if (!this.isChecked) {
            var proxyImage = new Image();
            eventie.bind(proxyImage, "load", this), eventie.bind(proxyImage, "error", this), 
            proxyImage.src = this.src, this.isChecked = !0;
        }
    }, Resource.prototype.handleEvent = function(event) {
        var method = "on" + event.type;
        this[method] && this[method](event);
    }, Resource.prototype.onload = function(event) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(event);
    }, Resource.prototype.onerror = function(event) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(event);
    }, Resource.prototype.confirm = function(isLoaded, message) {
        this.isConfirmed = !0, this.isLoaded = isLoaded, this.emit("confirm", this, message);
    }, Resource.prototype.unbindProxyEvents = function(event) {
        eventie.unbind(event.target, "load", this), eventie.unbind(event.target, "error", this);
    }, ImagesLoaded;
}), function(window, document, exportName, undefined) {
    "use strict";
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }
    function invokeArrayArg(arg, fn, context) {
        return Array.isArray(arg) ? (each(arg, context[fn], context), !0) : !1;
    }
    function each(obj, iterator, context) {
        var i;
        if (obj) if (obj.forEach) obj.forEach(iterator, context); else if (obj.length !== undefined) for (i = 0; i < obj.length; ) iterator.call(context, obj[i], i, obj), 
        i++; else for (i in obj) obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
    function extend(dest, src, merge) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ) (!merge || merge && dest[keys[i]] === undefined) && (dest[keys[i]] = src[keys[i]]), 
        i++;
        return dest;
    }
    function merge(dest, src) {
        return extend(dest, src, !0);
    }
    function inherit(child, base, properties) {
        var childP, baseP = base.prototype;
        childP = child.prototype = Object.create(baseP), childP.constructor = child, childP._super = baseP, 
        properties && extend(childP, properties);
    }
    function bindFn(fn, context) {
        return function() {
            return fn.apply(context, arguments);
        };
    }
    function boolOrFn(val, args) {
        return typeof val == TYPE_FUNCTION ? val.apply(args ? args[0] || undefined : undefined, args) : val;
    }
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
    }
    function addEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
            target.addEventListener(type, handler, !1);
        });
    }
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
            target.removeEventListener(type, handler, !1);
        });
    }
    function hasParent(node, parent) {
        for (;node; ) {
            if (node == parent) return !0;
            node = node.parentNode;
        }
        return !1;
    }
    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }
    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) return src.indexOf(find);
        for (var i = 0; i < src.length; ) {
            if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) return i;
            i++;
        }
        return -1;
    }
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }
    function uniqueArray(src, key, sort) {
        for (var results = [], values = [], i = 0; i < src.length; ) {
            var val = key ? src[i][key] : src[i];
            inArray(values, val) < 0 && results.push(src[i]), values[i] = val, i++;
        }
        return sort && (results = key ? results.sort(function(a, b) {
            return a[key] > b[key];
        }) : results.sort()), results;
    }
    function prefixed(obj, property) {
        for (var prefix, prop, camelProp = property[0].toUpperCase() + property.slice(1), i = 0; i < VENDOR_PREFIXES.length; ) {
            if (prefix = VENDOR_PREFIXES[i], prop = prefix ? prefix + camelProp : property, 
            prop in obj) return prop;
            i++;
        }
        return undefined;
    }
    function uniqueId() {
        return _uniqueId++;
    }
    function getWindowForElement(element) {
        var doc = element.ownerDocument;
        return doc.defaultView || doc.parentWindow;
    }
    function Input(manager, callback) {
        var self = this;
        this.manager = manager, this.callback = callback, this.element = manager.element, 
        this.target = manager.options.inputTarget, this.domHandler = function(ev) {
            boolOrFn(manager.options.enable, [ manager ]) && self.handler(ev);
        }, this.init();
    }
    function createInputInstance(manager) {
        var Type, inputClass = manager.options.inputClass;
        return new (Type = inputClass ? inputClass : SUPPORT_POINTER_EVENTS ? PointerEventInput : SUPPORT_ONLY_TOUCH ? TouchInput : SUPPORT_TOUCH ? TouchMouseInput : MouseInput)(manager, inputHandler);
    }
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length, changedPointersLen = input.changedPointers.length, isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0, isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
        input.isFirst = !!isFirst, input.isFinal = !!isFinal, isFirst && (manager.session = {}), 
        input.eventType = eventType, computeInputData(manager, input), manager.emit("hammer.input", input), 
        manager.recognize(input), manager.session.prevInput = input;
    }
    function computeInputData(manager, input) {
        var session = manager.session, pointers = input.pointers, pointersLength = pointers.length;
        session.firstInput || (session.firstInput = simpleCloneInputData(input)), pointersLength > 1 && !session.firstMultiple ? session.firstMultiple = simpleCloneInputData(input) : 1 === pointersLength && (session.firstMultiple = !1);
        var firstInput = session.firstInput, firstMultiple = session.firstMultiple, offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center, center = input.center = getCenter(pointers);
        input.timeStamp = now(), input.deltaTime = input.timeStamp - firstInput.timeStamp, 
        input.angle = getAngle(offsetCenter, center), input.distance = getDistance(offsetCenter, center), 
        computeDeltaXY(session, input), input.offsetDirection = getDirection(input.deltaX, input.deltaY), 
        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1, input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0, 
        computeIntervalInputData(session, input);
        var target = manager.element;
        hasParent(input.srcEvent.target, target) && (target = input.srcEvent.target), input.target = target;
    }
    function computeDeltaXY(session, input) {
        var center = input.center, offset = session.offsetDelta || {}, prevDelta = session.prevDelta || {}, prevInput = session.prevInput || {};
        (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) && (prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        }, offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        }), input.deltaX = prevDelta.x + (center.x - offset.x), input.deltaY = prevDelta.y + (center.y - offset.y);
    }
    function computeIntervalInputData(session, input) {
        var velocity, velocityX, velocityY, direction, last = session.lastInterval || input, deltaTime = input.timeStamp - last.timeStamp;
        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = last.deltaX - input.deltaX, deltaY = last.deltaY - input.deltaY, v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x, velocityY = v.y, velocity = abs(v.x) > abs(v.y) ? v.x : v.y, direction = getDirection(deltaX, deltaY), 
            session.lastInterval = input;
        } else velocity = last.velocity, velocityX = last.velocityX, velocityY = last.velocityY, 
        direction = last.direction;
        input.velocity = velocity, input.velocityX = velocityX, input.velocityY = velocityY, 
        input.direction = direction;
    }
    function simpleCloneInputData(input) {
        for (var pointers = [], i = 0; i < input.pointers.length; ) pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        }, i++;
        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }
    function getCenter(pointers) {
        var pointersLength = pointers.length;
        if (1 === pointersLength) return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
        for (var x = 0, y = 0, i = 0; pointersLength > i; ) x += pointers[i].clientX, y += pointers[i].clientY, 
        i++;
        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }
    function getDirection(x, y) {
        return x === y ? DIRECTION_NONE : abs(x) >= abs(y) ? x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT : y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }
    function getDistance(p1, p2, props) {
        props || (props = PROPS_XY);
        var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
        return Math.sqrt(x * x + y * y);
    }
    function getAngle(p1, p2, props) {
        props || (props = PROPS_XY);
        var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
        return 180 * Math.atan2(y, x) / Math.PI;
    }
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }
    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS, this.evWin = MOUSE_WINDOW_EVENTS, this.allow = !0, 
        this.pressed = !1, Input.apply(this, arguments);
    }
    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS, this.evWin = POINTER_WINDOW_EVENTS, Input.apply(this, arguments), 
        this.store = this.manager.session.pointerEvents = [];
    }
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS, this.evWin = SINGLE_TOUCH_WINDOW_EVENTS, 
        this.started = !1, Input.apply(this, arguments);
    }
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches), changed = toArray(ev.changedTouches);
        return type & (INPUT_END | INPUT_CANCEL) && (all = uniqueArray(all.concat(changed), "identifier", !0)), 
        [ all, changed ];
    }
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS, this.targetIds = {}, Input.apply(this, arguments);
    }
    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches), targetIds = this.targetIds;
        if (type & (INPUT_START | INPUT_MOVE) && 1 === allTouches.length) return targetIds[allTouches[0].identifier] = !0, 
        [ allTouches, allTouches ];
        var i, targetTouches, changedTouches = toArray(ev.changedTouches), changedTargetTouches = [], target = this.target;
        if (targetTouches = allTouches.filter(function(touch) {
            return hasParent(touch.target, target);
        }), type === INPUT_START) for (i = 0; i < targetTouches.length; ) targetIds[targetTouches[i].identifier] = !0, 
        i++;
        for (i = 0; i < changedTouches.length; ) targetIds[changedTouches[i].identifier] && changedTargetTouches.push(changedTouches[i]), 
        type & (INPUT_END | INPUT_CANCEL) && delete targetIds[changedTouches[i].identifier], 
        i++;
        return changedTargetTouches.length ? [ uniqueArray(targetTouches.concat(changedTargetTouches), "identifier", !0), changedTargetTouches ] : void 0;
    }
    function TouchMouseInput() {
        Input.apply(this, arguments);
        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler), this.mouse = new MouseInput(this.manager, handler);
    }
    function TouchAction(manager, value) {
        this.manager = manager, this.set(value);
    }
    function cleanTouchActions(actions) {
        if (inStr(actions, TOUCH_ACTION_NONE)) return TOUCH_ACTION_NONE;
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X), hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        return hasPanX && hasPanY ? TOUCH_ACTION_PAN_X + " " + TOUCH_ACTION_PAN_Y : hasPanX || hasPanY ? hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y : inStr(actions, TOUCH_ACTION_MANIPULATION) ? TOUCH_ACTION_MANIPULATION : TOUCH_ACTION_AUTO;
    }
    function Recognizer(options) {
        this.id = uniqueId(), this.manager = null, this.options = merge(options || {}, this.defaults), 
        this.options.enable = ifUndefined(this.options.enable, !0), this.state = STATE_POSSIBLE, 
        this.simultaneous = {}, this.requireFail = [];
    }
    function stateStr(state) {
        return state & STATE_CANCELLED ? "cancel" : state & STATE_ENDED ? "end" : state & STATE_CHANGED ? "move" : state & STATE_BEGAN ? "start" : "";
    }
    function directionStr(direction) {
        return direction == DIRECTION_DOWN ? "down" : direction == DIRECTION_UP ? "up" : direction == DIRECTION_LEFT ? "left" : direction == DIRECTION_RIGHT ? "right" : "";
    }
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        return manager ? manager.get(otherRecognizer) : otherRecognizer;
    }
    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }
    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments), this.pX = null, this.pY = null;
    }
    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }
    function PressRecognizer() {
        Recognizer.apply(this, arguments), this._timer = null, this._input = null;
    }
    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }
    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }
    function TapRecognizer() {
        Recognizer.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, 
        this._input = null, this.count = 0;
    }
    function Hammer(element, options) {
        return options = options || {}, options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset), 
        new Manager(element, options);
    }
    function Manager(element, options) {
        options = options || {}, this.options = merge(options, Hammer.defaults), this.options.inputTarget = this.options.inputTarget || element, 
        this.handlers = {}, this.session = {}, this.recognizers = [], this.element = element, 
        this.input = createInputInstance(this), this.touchAction = new TouchAction(this, this.options.touchAction), 
        toggleCssProps(this, !0), each(options.recognizers, function(item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]), item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }
    function toggleCssProps(manager, add) {
        var element = manager.element;
        each(manager.options.cssProps, function(value, name) {
            element.style[prefixed(element.style, name)] = add ? value : "";
        });
    }
    function triggerDomEvent(event, data) {
        var gestureEvent = document.createEvent("Event");
        gestureEvent.initEvent(event, !0, !0), gestureEvent.gesture = data, data.target.dispatchEvent(gestureEvent);
    }
    var VENDOR_PREFIXES = [ "", "webkit", "moz", "MS", "ms", "o" ], TEST_ELEMENT = document.createElement("div"), TYPE_FUNCTION = "function", round = Math.round, abs = Math.abs, now = Date.now, _uniqueId = 1, MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, SUPPORT_TOUCH = "ontouchstart" in window, SUPPORT_POINTER_EVENTS = prefixed(window, "PointerEvent") !== undefined, SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent), INPUT_TYPE_TOUCH = "touch", INPUT_TYPE_PEN = "pen", INPUT_TYPE_MOUSE = "mouse", INPUT_TYPE_KINECT = "kinect", COMPUTE_INTERVAL = 25, INPUT_START = 1, INPUT_MOVE = 2, INPUT_END = 4, INPUT_CANCEL = 8, DIRECTION_NONE = 1, DIRECTION_LEFT = 2, DIRECTION_RIGHT = 4, DIRECTION_UP = 8, DIRECTION_DOWN = 16, DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT, DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN, DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL, PROPS_XY = [ "x", "y" ], PROPS_CLIENT_XY = [ "clientX", "clientY" ];
    Input.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler), this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler), 
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },
        destroy: function() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler), this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler), 
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };
    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    }, MOUSE_ELEMENT_EVENTS = "mousedown", MOUSE_WINDOW_EVENTS = "mousemove mouseup";
    inherit(MouseInput, Input, {
        handler: function(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];
            eventType & INPUT_START && 0 === ev.button && (this.pressed = !0), eventType & INPUT_MOVE && 1 !== ev.which && (eventType = INPUT_END), 
            this.pressed && this.allow && (eventType & INPUT_END && (this.pressed = !1), this.callback(this.manager, eventType, {
                pointers: [ ev ],
                changedPointers: [ ev ],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            }));
        }
    });
    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    }, IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT
    }, POINTER_ELEMENT_EVENTS = "pointerdown", POINTER_WINDOW_EVENTS = "pointermove pointerup pointercancel";
    window.MSPointerEvent && (POINTER_ELEMENT_EVENTS = "MSPointerDown", POINTER_WINDOW_EVENTS = "MSPointerMove MSPointerUp MSPointerCancel"), 
    inherit(PointerEventInput, Input, {
        handler: function(ev) {
            var store = this.store, removePointer = !1, eventTypeNormalized = ev.type.toLowerCase().replace("ms", ""), eventType = POINTER_INPUT_MAP[eventTypeNormalized], pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType, isTouch = pointerType == INPUT_TYPE_TOUCH, storeIndex = inArray(store, ev.pointerId, "pointerId");
            eventType & INPUT_START && (0 === ev.button || isTouch) ? 0 > storeIndex && (store.push(ev), 
            storeIndex = store.length - 1) : eventType & (INPUT_END | INPUT_CANCEL) && (removePointer = !0), 
            0 > storeIndex || (store[storeIndex] = ev, this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ ev ],
                pointerType: pointerType,
                srcEvent: ev
            }), removePointer && store.splice(storeIndex, 1));
        }
    });
    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    }, SINGLE_TOUCH_TARGET_EVENTS = "touchstart", SINGLE_TOUCH_WINDOW_EVENTS = "touchstart touchmove touchend touchcancel";
    inherit(SingleTouchInput, Input, {
        handler: function(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
            if (type === INPUT_START && (this.started = !0), this.started) {
                var touches = normalizeSingleTouches.call(this, ev, type);
                type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0 && (this.started = !1), 
                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        }
    });
    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    }, TOUCH_TARGET_EVENTS = "touchstart touchmove touchend touchcancel";
    inherit(TouchInput, Input, {
        handler: function(ev) {
            var type = TOUCH_INPUT_MAP[ev.type], touches = getTouches.call(this, ev, type);
            touches && this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    }), inherit(TouchMouseInput, Input, {
        handler: function(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH, isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;
            if (isTouch) this.mouse.allow = !1; else if (isMouse && !this.mouse.allow) return;
            inputEvent & (INPUT_END | INPUT_CANCEL) && (this.mouse.allow = !0), this.callback(manager, inputEvent, inputData);
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy();
        }
    });
    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, "touchAction"), NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined, TOUCH_ACTION_COMPUTE = "compute", TOUCH_ACTION_AUTO = "auto", TOUCH_ACTION_MANIPULATION = "manipulation", TOUCH_ACTION_NONE = "none", TOUCH_ACTION_PAN_X = "pan-x", TOUCH_ACTION_PAN_Y = "pan-y";
    TouchAction.prototype = {
        set: function(value) {
            value == TOUCH_ACTION_COMPUTE && (value = this.compute()), NATIVE_TOUCH_ACTION && (this.manager.element.style[PREFIXED_TOUCH_ACTION] = value), 
            this.actions = value.toLowerCase().trim();
        },
        update: function() {
            this.set(this.manager.options.touchAction);
        },
        compute: function() {
            var actions = [];
            return each(this.manager.recognizers, function(recognizer) {
                boolOrFn(recognizer.options.enable, [ recognizer ]) && (actions = actions.concat(recognizer.getTouchAction()));
            }), cleanTouchActions(actions.join(" "));
        },
        preventDefaults: function(input) {
            if (!NATIVE_TOUCH_ACTION) {
                var srcEvent = input.srcEvent, direction = input.offsetDirection;
                if (this.manager.session.prevented) return void srcEvent.preventDefault();
                var actions = this.actions, hasNone = inStr(actions, TOUCH_ACTION_NONE), hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y), hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
                return hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL ? this.preventSrc(srcEvent) : void 0;
            }
        },
        preventSrc: function(srcEvent) {
            this.manager.session.prevented = !0, srcEvent.preventDefault();
        }
    };
    var STATE_POSSIBLE = 1, STATE_BEGAN = 2, STATE_CHANGED = 4, STATE_ENDED = 8, STATE_RECOGNIZED = STATE_ENDED, STATE_CANCELLED = 16, STATE_FAILED = 32;
    Recognizer.prototype = {
        defaults: {},
        set: function(options) {
            return extend(this.options, options), this.manager && this.manager.touchAction.update(), 
            this;
        },
        recognizeWith: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, "recognizeWith", this)) return this;
            var simultaneous = this.simultaneous;
            return otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this), simultaneous[otherRecognizer.id] || (simultaneous[otherRecognizer.id] = otherRecognizer, 
            otherRecognizer.recognizeWith(this)), this;
        },
        dropRecognizeWith: function(otherRecognizer) {
            return invokeArrayArg(otherRecognizer, "dropRecognizeWith", this) ? this : (otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this), 
            delete this.simultaneous[otherRecognizer.id], this);
        },
        requireFailure: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, "requireFailure", this)) return this;
            var requireFail = this.requireFail;
            return otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this), -1 === inArray(requireFail, otherRecognizer) && (requireFail.push(otherRecognizer), 
            otherRecognizer.requireFailure(this)), this;
        },
        dropRequireFailure: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, "dropRequireFailure", this)) return this;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            return index > -1 && this.requireFail.splice(index, 1), this;
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0;
        },
        canRecognizeWith: function(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },
        emit: function(input) {
            function emit(withState) {
                self.manager.emit(self.options.event + (withState ? stateStr(state) : ""), input);
            }
            var self = this, state = this.state;
            STATE_ENDED > state && emit(!0), emit(), state >= STATE_ENDED && emit(!0);
        },
        tryEmit: function(input) {
            return this.canEmit() ? this.emit(input) : void (this.state = STATE_FAILED);
        },
        canEmit: function() {
            for (var i = 0; i < this.requireFail.length; ) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) return !1;
                i++;
            }
            return !0;
        },
        recognize: function(inputData) {
            var inputDataClone = extend({}, inputData);
            return boolOrFn(this.options.enable, [ this, inputDataClone ]) ? (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED) && (this.state = STATE_POSSIBLE), 
            this.state = this.process(inputDataClone), void (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED) && this.tryEmit(inputDataClone))) : (this.reset(), 
            void (this.state = STATE_FAILED));
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    }, inherit(AttrRecognizer, Recognizer, {
        defaults: {
            pointers: 1
        },
        attrTest: function(input) {
            var optionPointers = this.options.pointers;
            return 0 === optionPointers || input.pointers.length === optionPointers;
        },
        process: function(input) {
            var state = this.state, eventType = input.eventType, isRecognized = state & (STATE_BEGAN | STATE_CHANGED), isValid = this.attrTest(input);
            return isRecognized && (eventType & INPUT_CANCEL || !isValid) ? state | STATE_CANCELLED : isRecognized || isValid ? eventType & INPUT_END ? state | STATE_ENDED : state & STATE_BEGAN ? state | STATE_CHANGED : STATE_BEGAN : STATE_FAILED;
        }
    }), inherit(PanRecognizer, AttrRecognizer, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },
        getTouchAction: function() {
            var direction = this.options.direction, actions = [];
            return direction & DIRECTION_HORIZONTAL && actions.push(TOUCH_ACTION_PAN_Y), direction & DIRECTION_VERTICAL && actions.push(TOUCH_ACTION_PAN_X), 
            actions;
        },
        directionTest: function(input) {
            var options = this.options, hasMoved = !0, distance = input.distance, direction = input.direction, x = input.deltaX, y = input.deltaY;
            return direction & options.direction || (options.direction & DIRECTION_HORIZONTAL ? (direction = 0 === x ? DIRECTION_NONE : 0 > x ? DIRECTION_LEFT : DIRECTION_RIGHT, 
            hasMoved = x != this.pX, distance = Math.abs(input.deltaX)) : (direction = 0 === y ? DIRECTION_NONE : 0 > y ? DIRECTION_UP : DIRECTION_DOWN, 
            hasMoved = y != this.pY, distance = Math.abs(input.deltaY))), input.direction = direction, 
            hasMoved && distance > options.threshold && direction & options.direction;
        },
        attrTest: function(input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },
        emit: function(input) {
            this.pX = input.deltaX, this.pY = input.deltaY;
            var direction = directionStr(input.direction);
            direction && this.manager.emit(this.options.event + direction, input), this._super.emit.call(this, input);
        }
    }), inherit(PinchRecognizer, AttrRecognizer, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ TOUCH_ACTION_NONE ];
        },
        attrTest: function(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },
        emit: function(input) {
            if (this._super.emit.call(this, input), 1 !== input.scale) {
                var inOut = input.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + inOut, input);
            }
        }
    }), inherit(PressRecognizer, Recognizer, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function() {
            return [ TOUCH_ACTION_AUTO ];
        },
        process: function(input) {
            var options = this.options, validPointers = input.pointers.length === options.pointers, validMovement = input.distance < options.threshold, validTime = input.deltaTime > options.time;
            if (this._input = input, !validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) this.reset(); else if (input.eventType & INPUT_START) this.reset(), 
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED, this.tryEmit();
            }, options.time, this); else if (input.eventType & INPUT_END) return STATE_RECOGNIZED;
            return STATE_FAILED;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function(input) {
            this.state === STATE_RECOGNIZED && (input && input.eventType & INPUT_END ? this.manager.emit(this.options.event + "up", input) : (this._input.timeStamp = now(), 
            this.manager.emit(this.options.event, this._input)));
        }
    }), inherit(RotateRecognizer, AttrRecognizer, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ TOUCH_ACTION_NONE ];
        },
        attrTest: function(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    }), inherit(SwipeRecognizer, AttrRecognizer, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },
        getTouchAction: function() {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },
        attrTest: function(input) {
            var velocity, direction = this.options.direction;
            return direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL) ? velocity = input.velocity : direction & DIRECTION_HORIZONTAL ? velocity = input.velocityX : direction & DIRECTION_VERTICAL && (velocity = input.velocityY), 
            this._super.attrTest.call(this, input) && direction & input.direction && input.distance > this.options.threshold && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },
        emit: function(input) {
            var direction = directionStr(input.direction);
            direction && this.manager.emit(this.options.event + direction, input), this.manager.emit(this.options.event, input);
        }
    }), inherit(TapRecognizer, Recognizer, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ TOUCH_ACTION_MANIPULATION ];
        },
        process: function(input) {
            var options = this.options, validPointers = input.pointers.length === options.pointers, validMovement = input.distance < options.threshold, validTouchTime = input.deltaTime < options.time;
            if (this.reset(), input.eventType & INPUT_START && 0 === this.count) return this.failTimeout();
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) return this.failTimeout();
                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : !0, validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
                this.pTime = input.timeStamp, this.pCenter = input.center, validMultiTap && validInterval ? this.count += 1 : this.count = 1, 
                this._input = input;
                var tapCount = this.count % options.taps;
                if (0 === tapCount) return this.hasRequireFailures() ? (this._timer = setTimeoutContext(function() {
                    this.state = STATE_RECOGNIZED, this.tryEmit();
                }, options.interval, this), STATE_BEGAN) : STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },
        failTimeout: function() {
            return this._timer = setTimeoutContext(function() {
                this.state = STATE_FAILED;
            }, this.options.interval, this), STATE_FAILED;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function() {
            this.state == STATE_RECOGNIZED && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        }
    }), Hammer.VERSION = "2.0.4", Hammer.defaults = {
        domEvents: !1,
        touchAction: TOUCH_ACTION_COMPUTE,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [ [ RotateRecognizer, {
            enable: !1
        } ], [ PinchRecognizer, {
            enable: !1
        }, [ "rotate" ] ], [ SwipeRecognizer, {
            direction: DIRECTION_HORIZONTAL
        } ], [ PanRecognizer, {
            direction: DIRECTION_HORIZONTAL
        }, [ "swipe" ] ], [ TapRecognizer ], [ TapRecognizer, {
            event: "doubletap",
            taps: 2
        }, [ "tap" ] ], [ PressRecognizer ] ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var STOP = 1, FORCED_STOP = 2;
    Manager.prototype = {
        set: function(options) {
            return extend(this.options, options), options.touchAction && this.touchAction.update(), 
            options.inputTarget && (this.input.destroy(), this.input.target = options.inputTarget, 
            this.input.init()), this;
        },
        stop: function(force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },
        recognize: function(inputData) {
            var session = this.session;
            if (!session.stopped) {
                this.touchAction.preventDefaults(inputData);
                var recognizer, recognizers = this.recognizers, curRecognizer = session.curRecognizer;
                (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) && (curRecognizer = session.curRecognizer = null);
                for (var i = 0; i < recognizers.length; ) recognizer = recognizers[i], session.stopped === FORCED_STOP || curRecognizer && recognizer != curRecognizer && !recognizer.canRecognizeWith(curRecognizer) ? recognizer.reset() : recognizer.recognize(inputData), 
                !curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED) && (curRecognizer = session.curRecognizer = recognizer), 
                i++;
            }
        },
        get: function(recognizer) {
            if (recognizer instanceof Recognizer) return recognizer;
            for (var recognizers = this.recognizers, i = 0; i < recognizers.length; i++) if (recognizers[i].options.event == recognizer) return recognizers[i];
            return null;
        },
        add: function(recognizer) {
            if (invokeArrayArg(recognizer, "add", this)) return this;
            var existing = this.get(recognizer.options.event);
            return existing && this.remove(existing), this.recognizers.push(recognizer), recognizer.manager = this, 
            this.touchAction.update(), recognizer;
        },
        remove: function(recognizer) {
            if (invokeArrayArg(recognizer, "remove", this)) return this;
            var recognizers = this.recognizers;
            return recognizer = this.get(recognizer), recognizers.splice(inArray(recognizers, recognizer), 1), 
            this.touchAction.update(), this;
        },
        on: function(events, handler) {
            var handlers = this.handlers;
            return each(splitStr(events), function(event) {
                handlers[event] = handlers[event] || [], handlers[event].push(handler);
            }), this;
        },
        off: function(events, handler) {
            var handlers = this.handlers;
            return each(splitStr(events), function(event) {
                handler ? handlers[event].splice(inArray(handlers[event], handler), 1) : delete handlers[event];
            }), this;
        },
        emit: function(event, data) {
            this.options.domEvents && triggerDomEvent(event, data);
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (handlers && handlers.length) {
                data.type = event, data.preventDefault = function() {
                    data.srcEvent.preventDefault();
                };
                for (var i = 0; i < handlers.length; ) handlers[i](data), i++;
            }
        },
        destroy: function() {
            this.element && toggleCssProps(this, !1), this.handlers = {}, this.session = {}, 
            this.input.destroy(), this.element = null;
        }
    }, extend(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,
        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,
        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,
        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,
        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,
        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,
        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    }), typeof define == TYPE_FUNCTION && define.amd ? define(function() {
        return Hammer;
    }) : "undefined" != typeof module && module.exports ? module.exports = Hammer : window[exportName] = Hammer;
}(window, document, "Hammer"), function(window, document, undefined) {
    "use strict";
    function minErr(module, ErrorConstructor) {
        return ErrorConstructor = ErrorConstructor || Error, function() {
            var message, i, code = arguments[0], prefix = "[" + (module ? module + ":" : "") + code + "] ", template = arguments[1], templateArgs = arguments;
            for (message = prefix + template.replace(/\{\d+\}/g, function(match) {
                var index = +match.slice(1, -1);
                return index + 2 < templateArgs.length ? toDebugString(templateArgs[index + 2]) : match;
            }), message = message + "\nhttp://errors.angularjs.org/1.3.10/" + (module ? module + "/" : "") + code, 
            i = 2; i < arguments.length; i++) message = message + (2 == i ? "?" : "&") + "p" + (i - 2) + "=" + encodeURIComponent(toDebugString(arguments[i]));
            return new ErrorConstructor(message);
        };
    }
    function isArrayLike(obj) {
        if (null == obj || isWindow(obj)) return !1;
        var length = obj.length;
        return obj.nodeType === NODE_TYPE_ELEMENT && length ? !0 : isString(obj) || isArray(obj) || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function forEach(obj, iterator, context) {
        var key, length;
        if (obj) if (isFunction(obj)) for (key in obj) "prototype" == key || "length" == key || "name" == key || obj.hasOwnProperty && !obj.hasOwnProperty(key) || iterator.call(context, obj[key], key, obj); else if (isArray(obj) || isArrayLike(obj)) {
            var isPrimitive = "object" != typeof obj;
            for (key = 0, length = obj.length; length > key; key++) (isPrimitive || key in obj) && iterator.call(context, obj[key], key, obj);
        } else if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context, obj); else for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj);
        return obj;
    }
    function sortedKeys(obj) {
        return Object.keys(obj).sort();
    }
    function forEachSorted(obj, iterator, context) {
        for (var keys = sortedKeys(obj), i = 0; i < keys.length; i++) iterator.call(context, obj[keys[i]], keys[i]);
        return keys;
    }
    function reverseParams(iteratorFn) {
        return function(value, key) {
            iteratorFn(key, value);
        };
    }
    function nextUid() {
        return ++uid;
    }
    function setHashKey(obj, h) {
        h ? obj.$$hashKey = h : delete obj.$$hashKey;
    }
    function extend(dst) {
        for (var h = dst.$$hashKey, i = 1, ii = arguments.length; ii > i; i++) {
            var obj = arguments[i];
            if (obj) for (var keys = Object.keys(obj), j = 0, jj = keys.length; jj > j; j++) {
                var key = keys[j];
                dst[key] = obj[key];
            }
        }
        return setHashKey(dst, h), dst;
    }
    function int(str) {
        return parseInt(str, 10);
    }
    function inherit(parent, extra) {
        return extend(Object.create(parent), extra);
    }
    function noop() {}
    function identity($) {
        return $;
    }
    function valueFn(value) {
        return function() {
            return value;
        };
    }
    function isUndefined(value) {
        return "undefined" == typeof value;
    }
    function isDefined(value) {
        return "undefined" != typeof value;
    }
    function isObject(value) {
        return null !== value && "object" == typeof value;
    }
    function isString(value) {
        return "string" == typeof value;
    }
    function isNumber(value) {
        return "number" == typeof value;
    }
    function isDate(value) {
        return "[object Date]" === toString.call(value);
    }
    function isFunction(value) {
        return "function" == typeof value;
    }
    function isRegExp(value) {
        return "[object RegExp]" === toString.call(value);
    }
    function isWindow(obj) {
        return obj && obj.window === obj;
    }
    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
        return "[object File]" === toString.call(obj);
    }
    function isFormData(obj) {
        return "[object FormData]" === toString.call(obj);
    }
    function isBlob(obj) {
        return "[object Blob]" === toString.call(obj);
    }
    function isBoolean(value) {
        return "boolean" == typeof value;
    }
    function isPromiseLike(obj) {
        return obj && isFunction(obj.then);
    }
    function isElement(node) {
        return !(!node || !(node.nodeName || node.prop && node.attr && node.find));
    }
    function makeMap(str) {
        var i, obj = {}, items = str.split(",");
        for (i = 0; i < items.length; i++) obj[items[i]] = !0;
        return obj;
    }
    function nodeName_(element) {
        return lowercase(element.nodeName || element[0] && element[0].nodeName);
    }
    function arrayRemove(array, value) {
        var index = array.indexOf(value);
        return index >= 0 && array.splice(index, 1), value;
    }
    function copy(source, destination, stackSource, stackDest) {
        if (isWindow(source) || isScope(source)) throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (destination) {
            if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
            if (stackSource = stackSource || [], stackDest = stackDest || [], isObject(source)) {
                var index = stackSource.indexOf(source);
                if (-1 !== index) return stackDest[index];
                stackSource.push(source), stackDest.push(destination);
            }
            var result;
            if (isArray(source)) {
                destination.length = 0;
                for (var i = 0; i < source.length; i++) result = copy(source[i], null, stackSource, stackDest), 
                isObject(source[i]) && (stackSource.push(source[i]), stackDest.push(result)), destination.push(result);
            } else {
                var h = destination.$$hashKey;
                isArray(destination) ? destination.length = 0 : forEach(destination, function(value, key) {
                    delete destination[key];
                });
                for (var key in source) source.hasOwnProperty(key) && (result = copy(source[key], null, stackSource, stackDest), 
                isObject(source[key]) && (stackSource.push(source[key]), stackDest.push(result)), 
                destination[key] = result);
                setHashKey(destination, h);
            }
        } else if (destination = source, source) if (isArray(source)) destination = copy(source, [], stackSource, stackDest); else if (isDate(source)) destination = new Date(source.getTime()); else if (isRegExp(source)) destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]), 
        destination.lastIndex = source.lastIndex; else if (isObject(source)) {
            var emptyObject = Object.create(Object.getPrototypeOf(source));
            destination = copy(source, emptyObject, stackSource, stackDest);
        }
        return destination;
    }
    function shallowCopy(src, dst) {
        if (isArray(src)) {
            dst = dst || [];
            for (var i = 0, ii = src.length; ii > i; i++) dst[i] = src[i];
        } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src) ("$" !== key.charAt(0) || "$" !== key.charAt(1)) && (dst[key] = src[key]);
        }
        return dst || src;
    }
    function equals(o1, o2) {
        if (o1 === o2) return !0;
        if (null === o1 || null === o2) return !1;
        if (o1 !== o1 && o2 !== o2) return !0;
        var length, key, keySet, t1 = typeof o1, t2 = typeof o2;
        if (t1 == t2 && "object" == t1) {
            if (!isArray(o1)) {
                if (isDate(o1)) return isDate(o2) ? equals(o1.getTime(), o2.getTime()) : !1;
                if (isRegExp(o1) && isRegExp(o2)) return o1.toString() == o2.toString();
                if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2)) return !1;
                keySet = {};
                for (key in o1) if ("$" !== key.charAt(0) && !isFunction(o1[key])) {
                    if (!equals(o1[key], o2[key])) return !1;
                    keySet[key] = !0;
                }
                for (key in o2) if (!keySet.hasOwnProperty(key) && "$" !== key.charAt(0) && o2[key] !== undefined && !isFunction(o2[key])) return !1;
                return !0;
            }
            if (!isArray(o2)) return !1;
            if ((length = o1.length) == o2.length) {
                for (key = 0; length > key; key++) if (!equals(o1[key], o2[key])) return !1;
                return !0;
            }
        }
        return !1;
    }
    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
        return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function() {
            return arguments.length ? fn.apply(self, concat(curryArgs, arguments, 0)) : fn.apply(self, curryArgs);
        } : function() {
            return arguments.length ? fn.apply(self, arguments) : fn.call(self);
        };
    }
    function toJsonReplacer(key, value) {
        var val = value;
        return "string" == typeof key && "$" === key.charAt(0) && "$" === key.charAt(1) ? val = undefined : isWindow(value) ? val = "$WINDOW" : value && document === value ? val = "$DOCUMENT" : isScope(value) && (val = "$SCOPE"), 
        val;
    }
    function toJson(obj, pretty) {
        return "undefined" == typeof obj ? undefined : (isNumber(pretty) || (pretty = pretty ? 2 : null), 
        JSON.stringify(obj, toJsonReplacer, pretty));
    }
    function fromJson(json) {
        return isString(json) ? JSON.parse(json) : json;
    }
    function startingTag(element) {
        element = jqLite(element).clone();
        try {
            element.empty();
        } catch (e) {}
        var elemHtml = jqLite("<div>").append(element).html();
        try {
            return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
                return "<" + lowercase(nodeName);
            });
        } catch (e) {
            return lowercase(elemHtml);
        }
    }
    function tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {}
    }
    function parseKeyValue(keyValue) {
        var key_value, key, obj = {};
        return forEach((keyValue || "").split("&"), function(keyValue) {
            if (keyValue && (key_value = keyValue.replace(/\+/g, "%20").split("="), key = tryDecodeURIComponent(key_value[0]), 
            isDefined(key))) {
                var val = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : !0;
                hasOwnProperty.call(obj, key) ? isArray(obj[key]) ? obj[key].push(val) : obj[key] = [ obj[key], val ] : obj[key] = val;
            }
        }), obj;
    }
    function toKeyValue(obj) {
        var parts = [];
        return forEach(obj, function(value, key) {
            isArray(value) ? forEach(value, function(arrayValue) {
                parts.push(encodeUriQuery(key, !0) + (arrayValue === !0 ? "" : "=" + encodeUriQuery(arrayValue, !0)));
            }) : parts.push(encodeUriQuery(key, !0) + (value === !0 ? "" : "=" + encodeUriQuery(value, !0)));
        }), parts.length ? parts.join("&") : "";
    }
    function encodeUriSegment(val) {
        return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
    }
    function getNgAttribute(element, ngAttr) {
        var attr, i, ii = ngAttrPrefixes.length;
        for (element = jqLite(element), i = 0; ii > i; ++i) if (attr = ngAttrPrefixes[i] + ngAttr, 
        isString(attr = element.attr(attr))) return attr;
        return null;
    }
    function angularInit(element, bootstrap) {
        var appElement, module, config = {};
        forEach(ngAttrPrefixes, function(prefix) {
            var name = prefix + "app";
            !appElement && element.hasAttribute && element.hasAttribute(name) && (appElement = element, 
            module = element.getAttribute(name));
        }), forEach(ngAttrPrefixes, function(prefix) {
            var candidate, name = prefix + "app";
            !appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]")) && (appElement = candidate, 
            module = candidate.getAttribute(name));
        }), appElement && (config.strictDi = null !== getNgAttribute(appElement, "strict-di"), 
        bootstrap(appElement, module ? [ module ] : [], config));
    }
    function bootstrap(element, modules, config) {
        isObject(config) || (config = {});
        var defaultConfig = {
            strictDi: !1
        };
        config = extend(defaultConfig, config);
        var doBootstrap = function() {
            if (element = jqLite(element), element.injector()) {
                var tag = element[0] === document ? "document" : startingTag(element);
                throw ngMinErr("btstrpd", "App Already Bootstrapped with this Element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            modules = modules || [], modules.unshift([ "$provide", function($provide) {
                $provide.value("$rootElement", element);
            } ]), config.debugInfoEnabled && modules.push([ "$compileProvider", function($compileProvider) {
                $compileProvider.debugInfoEnabled(!0);
            } ]), modules.unshift("ng");
            var injector = createInjector(modules, config.strictDi);
            return injector.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(scope, element, compile, injector) {
                scope.$apply(function() {
                    element.data("$injector", injector), compile(element)(scope);
                });
            } ]), injector;
        }, NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/, NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
        return window && NG_ENABLE_DEBUG_INFO.test(window.name) && (config.debugInfoEnabled = !0, 
        window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "")), window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ""), 
        void (angular.resumeBootstrap = function(extraModules) {
            forEach(extraModules, function(module) {
                modules.push(module);
            }), doBootstrap();
        }));
    }
    function reloadWithDebugInfo() {
        window.name = "NG_ENABLE_DEBUG_INFO!" + window.name, window.location.reload();
    }
    function getTestability(rootElement) {
        var injector = angular.element(rootElement).injector();
        if (!injector) throw ngMinErr("test", "no injector found for element argument to getTestability");
        return injector.get("$$testability");
    }
    function snake_case(name, separator) {
        return separator = separator || "_", name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    function bindJQuery() {
        var originalCleanData;
        bindJQueryFired || (jQuery = window.jQuery, jQuery && jQuery.fn.on ? (jqLite = jQuery, 
        extend(jQuery.fn, {
            scope: JQLitePrototype.scope,
            isolateScope: JQLitePrototype.isolateScope,
            controller: JQLitePrototype.controller,
            injector: JQLitePrototype.injector,
            inheritedData: JQLitePrototype.inheritedData
        }), originalCleanData = jQuery.cleanData, jQuery.cleanData = function(elems) {
            var events;
            if (skipDestroyOnNextJQueryCleanData) skipDestroyOnNextJQueryCleanData = !1; else for (var elem, i = 0; null != (elem = elems[i]); i++) events = jQuery._data(elem, "events"), 
            events && events.$destroy && jQuery(elem).triggerHandler("$destroy");
            originalCleanData(elems);
        }) : jqLite = JQLite, angular.element = jqLite, bindJQueryFired = !0);
    }
    function assertArg(arg, name, reason) {
        if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
        return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, "not a function, got " + (arg && "object" == typeof arg ? arg.constructor.name || "Object" : typeof arg)), 
        arg;
    }
    function assertNotHasOwnProperty(name, context) {
        if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
    }
    function getter(obj, path, bindFnToScope) {
        if (!path) return obj;
        for (var key, keys = path.split("."), lastInstance = obj, len = keys.length, i = 0; len > i; i++) key = keys[i], 
        obj && (obj = (lastInstance = obj)[key]);
        return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj;
    }
    function getBlockNodes(nodes) {
        var node = nodes[0], endNode = nodes[nodes.length - 1], blockNodes = [ node ];
        do {
            if (node = node.nextSibling, !node) break;
            blockNodes.push(node);
        } while (node !== endNode);
        return jqLite(blockNodes);
    }
    function createMap() {
        return Object.create(null);
    }
    function setupModuleLoader(window) {
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory());
        }
        var $injectorMinErr = minErr("$injector"), ngMinErr = minErr("ng"), angular = ensure(window, "angular", Object);
        return angular.$$minErr = angular.$$minErr || minErr, ensure(angular, "module", function() {
            var modules = {};
            return function(name, requires, configFn) {
                var assertNotHasOwnProperty = function(name, context) {
                    if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
                };
                return assertNotHasOwnProperty(name, "module"), requires && modules.hasOwnProperty(name) && (modules[name] = null), 
                ensure(modules, name, function() {
                    function invokeLater(provider, method, insertMethod, queue) {
                        return queue || (queue = invokeQueue), function() {
                            return queue[insertMethod || "push"]([ provider, method, arguments ]), moduleInstance;
                        };
                    }
                    if (!requires) throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", name);
                    var invokeQueue = [], configBlocks = [], runBlocks = [], config = invokeLater("$injector", "invoke", "push", configBlocks), moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _configBlocks: configBlocks,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLater("$provide", "provider"),
                        factory: invokeLater("$provide", "factory"),
                        service: invokeLater("$provide", "service"),
                        value: invokeLater("$provide", "value"),
                        constant: invokeLater("$provide", "constant", "unshift"),
                        animation: invokeLater("$animateProvider", "register"),
                        filter: invokeLater("$filterProvider", "register"),
                        controller: invokeLater("$controllerProvider", "register"),
                        directive: invokeLater("$compileProvider", "directive"),
                        config: config,
                        run: function(block) {
                            return runBlocks.push(block), this;
                        }
                    };
                    return configFn && config(configFn), moduleInstance;
                });
            };
        });
    }
    function serializeObject(obj) {
        var seen = [];
        return JSON.stringify(obj, function(key, val) {
            if (val = toJsonReplacer(key, val), isObject(val)) {
                if (seen.indexOf(val) >= 0) return "<<already seen>>";
                seen.push(val);
            }
            return val;
        });
    }
    function toDebugString(obj) {
        return "function" == typeof obj ? obj.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof obj ? "undefined" : "string" != typeof obj ? serializeObject(obj) : obj;
    }
    function publishExternalAPI(angular) {
        extend(angular, {
            bootstrap: bootstrap,
            copy: copy,
            extend: extend,
            equals: equals,
            element: jqLite,
            forEach: forEach,
            injector: createInjector,
            noop: noop,
            bind: bind,
            toJson: toJson,
            fromJson: fromJson,
            identity: identity,
            isUndefined: isUndefined,
            isDefined: isDefined,
            isString: isString,
            isFunction: isFunction,
            isObject: isObject,
            isNumber: isNumber,
            isElement: isElement,
            isArray: isArray,
            version: version,
            isDate: isDate,
            lowercase: lowercase,
            uppercase: uppercase,
            callbacks: {
                counter: 0
            },
            getTestability: getTestability,
            $$minErr: minErr,
            $$csp: csp,
            reloadWithDebugInfo: reloadWithDebugInfo
        }), angularModule = setupModuleLoader(window);
        try {
            angularModule("ngLocale");
        } catch (e) {
            angularModule("ngLocale", []).provider("$locale", $LocaleProvider);
        }
        angularModule("ng", [ "ngLocale" ], [ "$provide", function($provide) {
            $provide.provider({
                $$sanitizeUri: $$SanitizeUriProvider
            }), $provide.provider("$compile", $CompileProvider).directive({
                a: htmlAnchorDirective,
                input: inputDirective,
                textarea: inputDirective,
                form: formDirective,
                script: scriptDirective,
                select: selectDirective,
                style: styleDirective,
                option: optionDirective,
                ngBind: ngBindDirective,
                ngBindHtml: ngBindHtmlDirective,
                ngBindTemplate: ngBindTemplateDirective,
                ngClass: ngClassDirective,
                ngClassEven: ngClassEvenDirective,
                ngClassOdd: ngClassOddDirective,
                ngCloak: ngCloakDirective,
                ngController: ngControllerDirective,
                ngForm: ngFormDirective,
                ngHide: ngHideDirective,
                ngIf: ngIfDirective,
                ngInclude: ngIncludeDirective,
                ngInit: ngInitDirective,
                ngNonBindable: ngNonBindableDirective,
                ngPluralize: ngPluralizeDirective,
                ngRepeat: ngRepeatDirective,
                ngShow: ngShowDirective,
                ngStyle: ngStyleDirective,
                ngSwitch: ngSwitchDirective,
                ngSwitchWhen: ngSwitchWhenDirective,
                ngSwitchDefault: ngSwitchDefaultDirective,
                ngOptions: ngOptionsDirective,
                ngTransclude: ngTranscludeDirective,
                ngModel: ngModelDirective,
                ngList: ngListDirective,
                ngChange: ngChangeDirective,
                pattern: patternDirective,
                ngPattern: patternDirective,
                required: requiredDirective,
                ngRequired: requiredDirective,
                minlength: minlengthDirective,
                ngMinlength: minlengthDirective,
                maxlength: maxlengthDirective,
                ngMaxlength: maxlengthDirective,
                ngValue: ngValueDirective,
                ngModelOptions: ngModelOptionsDirective
            }).directive({
                ngInclude: ngIncludeFillContentDirective
            }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
                $anchorScroll: $AnchorScrollProvider,
                $animate: $AnimateProvider,
                $browser: $BrowserProvider,
                $cacheFactory: $CacheFactoryProvider,
                $controller: $ControllerProvider,
                $document: $DocumentProvider,
                $exceptionHandler: $ExceptionHandlerProvider,
                $filter: $FilterProvider,
                $interpolate: $InterpolateProvider,
                $interval: $IntervalProvider,
                $http: $HttpProvider,
                $httpBackend: $HttpBackendProvider,
                $location: $LocationProvider,
                $log: $LogProvider,
                $parse: $ParseProvider,
                $rootScope: $RootScopeProvider,
                $q: $QProvider,
                $$q: $$QProvider,
                $sce: $SceProvider,
                $sceDelegate: $SceDelegateProvider,
                $sniffer: $SnifferProvider,
                $templateCache: $TemplateCacheProvider,
                $templateRequest: $TemplateRequestProvider,
                $$testability: $$TestabilityProvider,
                $timeout: $TimeoutProvider,
                $window: $WindowProvider,
                $$rAF: $$RAFProvider,
                $$asyncCallback: $$AsyncCallbackProvider,
                $$jqLite: $$jqLiteProvider
            });
        } ]);
    }
    function jqNextId() {
        return ++jqId;
    }
    function camelCase(name) {
        return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).replace(MOZ_HACK_REGEXP, "Moz$1");
    }
    function jqLiteIsTextNode(html) {
        return !HTML_REGEXP.test(html);
    }
    function jqLiteAcceptsData(node) {
        var nodeType = node.nodeType;
        return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
    }
    function jqLiteBuildFragment(html, context) {
        var tmp, tag, wrap, i, fragment = context.createDocumentFragment(), nodes = [];
        if (jqLiteIsTextNode(html)) nodes.push(context.createTextNode(html)); else {
            for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (TAG_NAME_REGEXP.exec(html) || [ "", "" ])[1].toLowerCase(), 
            wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2], 
            i = wrap[0]; i--; ) tmp = tmp.lastChild;
            nodes = concat(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
        }
        return fragment.textContent = "", fragment.innerHTML = "", forEach(nodes, function(node) {
            fragment.appendChild(node);
        }), fragment;
    }
    function jqLiteParseHTML(html, context) {
        context = context || document;
        var parsed;
        return (parsed = SINGLE_TAG_REGEXP.exec(html)) ? [ context.createElement(parsed[1]) ] : (parsed = jqLiteBuildFragment(html, context)) ? parsed.childNodes : [];
    }
    function JQLite(element) {
        if (element instanceof JQLite) return element;
        var argIsString;
        if (isString(element) && (element = trim(element), argIsString = !0), !(this instanceof JQLite)) {
            if (argIsString && "<" != element.charAt(0)) throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new JQLite(element);
        }
        argIsString ? jqLiteAddNodes(this, jqLiteParseHTML(element)) : jqLiteAddNodes(this, element);
    }
    function jqLiteClone(element) {
        return element.cloneNode(!0);
    }
    function jqLiteDealoc(element, onlyDescendants) {
        if (onlyDescendants || jqLiteRemoveData(element), element.querySelectorAll) for (var descendants = element.querySelectorAll("*"), i = 0, l = descendants.length; l > i; i++) jqLiteRemoveData(descendants[i]);
    }
    function jqLiteOff(element, type, fn, unsupported) {
        if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
        var expandoStore = jqLiteExpandoStore(element), events = expandoStore && expandoStore.events, handle = expandoStore && expandoStore.handle;
        if (handle) if (type) forEach(type.split(" "), function(type) {
            if (isDefined(fn)) {
                var listenerFns = events[type];
                if (arrayRemove(listenerFns || [], fn), listenerFns && listenerFns.length > 0) return;
            }
            removeEventListenerFn(element, type, handle), delete events[type];
        }); else for (type in events) "$destroy" !== type && removeEventListenerFn(element, type, handle), 
        delete events[type];
    }
    function jqLiteRemoveData(element, name) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        if (expandoStore) {
            if (name) return void delete expandoStore.data[name];
            expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, "$destroy"), 
            jqLiteOff(element)), delete jqCache[expandoId], element.ng339 = undefined;
        }
    }
    function jqLiteExpandoStore(element, createIfNecessary) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        return createIfNecessary && !expandoStore && (element.ng339 = expandoId = jqNextId(), 
        expandoStore = jqCache[expandoId] = {
            events: {},
            data: {},
            handle: undefined
        }), expandoStore;
    }
    function jqLiteData(element, key, value) {
        if (jqLiteAcceptsData(element)) {
            var isSimpleSetter = isDefined(value), isSimpleGetter = !isSimpleSetter && key && !isObject(key), massGetter = !key, expandoStore = jqLiteExpandoStore(element, !isSimpleGetter), data = expandoStore && expandoStore.data;
            if (isSimpleSetter) data[key] = value; else {
                if (massGetter) return data;
                if (isSimpleGetter) return data && data[key];
                extend(data, key);
            }
        }
    }
    function jqLiteHasClass(element, selector) {
        return element.getAttribute ? (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1 : !1;
    }
    function jqLiteRemoveClass(element, cssClasses) {
        cssClasses && element.setAttribute && forEach(cssClasses.split(" "), function(cssClass) {
            element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")));
        });
    }
    function jqLiteAddClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            forEach(cssClasses.split(" "), function(cssClass) {
                cssClass = trim(cssClass), -1 === existingClasses.indexOf(" " + cssClass + " ") && (existingClasses += cssClass + " ");
            }), element.setAttribute("class", trim(existingClasses));
        }
    }
    function jqLiteAddNodes(root, elements) {
        if (elements) if (elements.nodeType) root[root.length++] = elements; else {
            var length = elements.length;
            if ("number" == typeof length && elements.window !== elements) {
                if (length) for (var i = 0; length > i; i++) root[root.length++] = elements[i];
            } else root[root.length++] = elements;
        }
    }
    function jqLiteController(element, name) {
        return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller");
    }
    function jqLiteInheritedData(element, name, value) {
        element.nodeType == NODE_TYPE_DOCUMENT && (element = element.documentElement);
        for (var names = isArray(name) ? name : [ name ]; element; ) {
            for (var i = 0, ii = names.length; ii > i; i++) if ((value = jqLite.data(element, names[i])) !== undefined) return value;
            element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host;
        }
    }
    function jqLiteEmpty(element) {
        for (jqLiteDealoc(element, !0); element.firstChild; ) element.removeChild(element.firstChild);
    }
    function jqLiteRemove(element, keepData) {
        keepData || jqLiteDealoc(element);
        var parent = element.parentNode;
        parent && parent.removeChild(element);
    }
    function jqLiteDocumentLoaded(action, win) {
        win = win || window, "complete" === win.document.readyState ? win.setTimeout(action) : jqLite(win).on("load", action);
    }
    function getBooleanAttrName(element, name) {
        var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
        return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr;
    }
    function getAliasedAttrName(element, name) {
        var nodeName = element.nodeName;
        return ("INPUT" === nodeName || "TEXTAREA" === nodeName) && ALIASED_ATTR[name];
    }
    function createEventHandler(element, events) {
        var eventHandler = function(event, type) {
            event.isDefaultPrevented = function() {
                return event.defaultPrevented;
            };
            var eventFns = events[type || event.type], eventFnsLength = eventFns ? eventFns.length : 0;
            if (eventFnsLength) {
                if (isUndefined(event.immediatePropagationStopped)) {
                    var originalStopImmediatePropagation = event.stopImmediatePropagation;
                    event.stopImmediatePropagation = function() {
                        event.immediatePropagationStopped = !0, event.stopPropagation && event.stopPropagation(), 
                        originalStopImmediatePropagation && originalStopImmediatePropagation.call(event);
                    };
                }
                event.isImmediatePropagationStopped = function() {
                    return event.immediatePropagationStopped === !0;
                }, eventFnsLength > 1 && (eventFns = shallowCopy(eventFns));
                for (var i = 0; eventFnsLength > i; i++) event.isImmediatePropagationStopped() || eventFns[i].call(element, event);
            }
        };
        return eventHandler.elem = element, eventHandler;
    }
    function $$jqLiteProvider() {
        this.$get = function() {
            return extend(JQLite, {
                hasClass: function(node, classes) {
                    return node.attr && (node = node[0]), jqLiteHasClass(node, classes);
                },
                addClass: function(node, classes) {
                    return node.attr && (node = node[0]), jqLiteAddClass(node, classes);
                },
                removeClass: function(node, classes) {
                    return node.attr && (node = node[0]), jqLiteRemoveClass(node, classes);
                }
            });
        };
    }
    function hashKey(obj, nextUidFn) {
        var key = obj && obj.$$hashKey;
        if (key) return "function" == typeof key && (key = obj.$$hashKey()), key;
        var objType = typeof obj;
        return key = "function" == objType || "object" == objType && null !== obj ? obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)() : objType + ":" + obj;
    }
    function HashMap(array, isolatedUid) {
        if (isolatedUid) {
            var uid = 0;
            this.nextUid = function() {
                return ++uid;
            };
        }
        forEach(array, this.put, this);
    }
    function anonFn(fn) {
        var fnText = fn.toString().replace(STRIP_COMMENTS, ""), args = fnText.match(FN_ARGS);
        return args ? "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
    }
    function annotate(fn, strictDi, name) {
        var $inject, fnText, argDecl, last;
        if ("function" == typeof fn) {
            if (!($inject = fn.$inject)) {
                if ($inject = [], fn.length) {
                    if (strictDi) throw isString(name) && name || (name = fn.name || anonFn(fn)), $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                    fnText = fn.toString().replace(STRIP_COMMENTS, ""), argDecl = fnText.match(FN_ARGS), 
                    forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                        arg.replace(FN_ARG, function(all, underscore, name) {
                            $inject.push(name);
                        });
                    });
                }
                fn.$inject = $inject;
            }
        } else isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], "fn"), $inject = fn.slice(0, last)) : assertArgFn(fn, "fn", !0);
        return $inject;
    }
    function createInjector(modulesToLoad, strictDi) {
        function supportObject(delegate) {
            return function(key, value) {
                return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value);
            };
        }
        function provider(name, provider_) {
            if (assertNotHasOwnProperty(name, "service"), (isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), 
            !provider_.$get) throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
            return providerCache[name + providerSuffix] = provider_;
        }
        function enforceReturnValue(name, factory) {
            return function() {
                var result = instanceInjector.invoke(factory, this);
                if (isUndefined(result)) throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                return result;
            };
        }
        function factory(name, factoryFn, enforce) {
            return provider(name, {
                $get: enforce !== !1 ? enforceReturnValue(name, factoryFn) : factoryFn
            });
        }
        function service(name, constructor) {
            return factory(name, [ "$injector", function($injector) {
                return $injector.instantiate(constructor);
            } ]);
        }
        function value(name, val) {
            return factory(name, valueFn(val), !1);
        }
        function constant(name, value) {
            assertNotHasOwnProperty(name, "constant"), providerCache[name] = value, instanceCache[name] = value;
        }
        function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
            origProvider.$get = function() {
                var origInstance = instanceInjector.invoke(orig$get, origProvider);
                return instanceInjector.invoke(decorFn, null, {
                    $delegate: origInstance
                });
            };
        }
        function loadModules(modulesToLoad) {
            var moduleFn, runBlocks = [];
            return forEach(modulesToLoad, function(module) {
                function runInvokeQueue(queue) {
                    var i, ii;
                    for (i = 0, ii = queue.length; ii > i; i++) {
                        var invokeArgs = queue[i], provider = providerInjector.get(invokeArgs[0]);
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                    }
                }
                if (!loadedModules.get(module)) {
                    loadedModules.put(module, !0);
                    try {
                        isString(module) ? (moduleFn = angularModule(module), runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks), 
                        runInvokeQueue(moduleFn._invokeQueue), runInvokeQueue(moduleFn._configBlocks)) : isFunction(module) ? runBlocks.push(providerInjector.invoke(module)) : isArray(module) ? runBlocks.push(providerInjector.invoke(module)) : assertArgFn(module, "module");
                    } catch (e) {
                        throw isArray(module) && (module = module[module.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e);
                    }
                }
            }), runBlocks;
        }
        function createInternalInjector(cache, factory) {
            function getService(serviceName, caller) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING) throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                    return cache[serviceName];
                }
                try {
                    return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName, caller);
                } catch (err) {
                    throw cache[serviceName] === INSTANTIATING && delete cache[serviceName], err;
                } finally {
                    path.shift();
                }
            }
            function invoke(fn, self, locals, serviceName) {
                "string" == typeof locals && (serviceName = locals, locals = null);
                var length, i, key, args = [], $inject = annotate(fn, strictDi, serviceName);
                for (i = 0, length = $inject.length; length > i; i++) {
                    if (key = $inject[i], "string" != typeof key) throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName));
                }
                return isArray(fn) && (fn = fn[length]), fn.apply(self, args);
            }
            function instantiate(Type, locals, serviceName) {
                var instance = Object.create((isArray(Type) ? Type[Type.length - 1] : Type).prototype || null), returnedValue = invoke(Type, instance, locals, serviceName);
                return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
            }
            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: annotate,
                has: function(name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
                }
            };
        }
        strictDi = strictDi === !0;
        var INSTANTIATING = {}, providerSuffix = "Provider", path = [], loadedModules = new HashMap([], !0), providerCache = {
            $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
            }
        }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function(serviceName, caller) {
            throw angular.isString(caller) && path.push(caller), $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "));
        }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function(serviceName, caller) {
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
        });
        return forEach(loadModules(modulesToLoad), function(fn) {
            instanceInjector.invoke(fn || noop);
        }), instanceInjector;
    }
    function $AnchorScrollProvider() {
        var autoScrollingEnabled = !0;
        this.disableAutoScrolling = function() {
            autoScrollingEnabled = !1;
        }, this.$get = [ "$window", "$location", "$rootScope", function($window, $location, $rootScope) {
            function getFirstAnchor(list) {
                var result = null;
                return Array.prototype.some.call(list, function(element) {
                    return "a" === nodeName_(element) ? (result = element, !0) : void 0;
                }), result;
            }
            function getYOffset() {
                var offset = scroll.yOffset;
                if (isFunction(offset)) offset = offset(); else if (isElement(offset)) {
                    var elem = offset[0], style = $window.getComputedStyle(elem);
                    offset = "fixed" !== style.position ? 0 : elem.getBoundingClientRect().bottom;
                } else isNumber(offset) || (offset = 0);
                return offset;
            }
            function scrollTo(elem) {
                if (elem) {
                    elem.scrollIntoView();
                    var offset = getYOffset();
                    if (offset) {
                        var elemTop = elem.getBoundingClientRect().top;
                        $window.scrollBy(0, elemTop - offset);
                    }
                } else $window.scrollTo(0, 0);
            }
            function scroll() {
                var elm, hash = $location.hash();
                hash ? (elm = document.getElementById(hash)) ? scrollTo(elm) : (elm = getFirstAnchor(document.getElementsByName(hash))) ? scrollTo(elm) : "top" === hash && scrollTo(null) : scrollTo(null);
            }
            var document = $window.document;
            return autoScrollingEnabled && $rootScope.$watch(function() {
                return $location.hash();
            }, function(newVal, oldVal) {
                (newVal !== oldVal || "" !== newVal) && jqLiteDocumentLoaded(function() {
                    $rootScope.$evalAsync(scroll);
                });
            }), scroll;
        } ];
    }
    function $$AsyncCallbackProvider() {
        this.$get = [ "$$rAF", "$timeout", function($$rAF, $timeout) {
            return $$rAF.supported ? function(fn) {
                return $$rAF(fn);
            } : function(fn) {
                return $timeout(fn, 0, !1);
            };
        } ];
    }
    function Browser(window, document, $log, $sniffer) {
        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1));
            } finally {
                if (outstandingRequestCount--, 0 === outstandingRequestCount) for (;outstandingRequestCallbacks.length; ) try {
                    outstandingRequestCallbacks.pop()();
                } catch (e) {
                    $log.error(e);
                }
            }
        }
        function getHash(url) {
            var index = url.indexOf("#");
            return -1 === index ? "" : url.substr(index + 1);
        }
        function startPoller(interval, setTimeout) {
            !function check() {
                forEach(pollFns, function(pollFn) {
                    pollFn();
                }), pollTimeout = setTimeout(check, interval);
            }();
        }
        function cacheStateAndFireUrlChange() {
            cacheState(), fireUrlChange();
        }
        function cacheState() {
            cachedState = window.history.state, cachedState = isUndefined(cachedState) ? null : cachedState, 
            equals(cachedState, lastCachedState) && (cachedState = lastCachedState), lastCachedState = cachedState;
        }
        function fireUrlChange() {
            (lastBrowserUrl !== self.url() || lastHistoryState !== cachedState) && (lastBrowserUrl = self.url(), 
            lastHistoryState = cachedState, forEach(urlChangeListeners, function(listener) {
                listener(self.url(), cachedState);
            }));
        }
        function safeDecodeURIComponent(str) {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return str;
            }
        }
        var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
        self.isMock = !1;
        var outstandingRequestCount = 0, outstandingRequestCallbacks = [];
        self.$$completeOutstandingRequest = completeOutstandingRequest, self.$$incOutstandingRequestCount = function() {
            outstandingRequestCount++;
        }, self.notifyWhenNoOutstandingRequests = function(callback) {
            forEach(pollFns, function(pollFn) {
                pollFn();
            }), 0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback);
        };
        var pollTimeout, pollFns = [];
        self.addPollFn = function(fn) {
            return isUndefined(pollTimeout) && startPoller(100, setTimeout), pollFns.push(fn), 
            fn;
        };
        var cachedState, lastHistoryState, lastBrowserUrl = location.href, baseElement = document.find("base"), reloadLocation = null;
        cacheState(), lastHistoryState = cachedState, self.url = function(url, replace, state) {
            if (isUndefined(state) && (state = null), location !== window.location && (location = window.location), 
            history !== window.history && (history = window.history), url) {
                var sameState = lastHistoryState === state;
                if (lastBrowserUrl === url && (!$sniffer.history || sameState)) return self;
                var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                return lastBrowserUrl = url, lastHistoryState = state, !$sniffer.history || sameBase && sameState ? (sameBase || (reloadLocation = url), 
                replace ? location.replace(url) : sameBase ? location.hash = getHash(url) : location.href = url) : (history[replace ? "replaceState" : "pushState"](state, "", url), 
                cacheState(), lastHistoryState = cachedState), self;
            }
            return reloadLocation || location.href.replace(/%27/g, "'");
        }, self.state = function() {
            return cachedState;
        };
        var urlChangeListeners = [], urlChangeInit = !1, lastCachedState = null;
        self.onUrlChange = function(callback) {
            return urlChangeInit || ($sniffer.history && jqLite(window).on("popstate", cacheStateAndFireUrlChange), 
            jqLite(window).on("hashchange", cacheStateAndFireUrlChange), urlChangeInit = !0), 
            urlChangeListeners.push(callback), callback;
        }, self.$$checkUrlChange = fireUrlChange, self.baseHref = function() {
            var href = baseElement.attr("href");
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        var lastCookies = {}, lastCookieString = "", cookiePath = self.baseHref();
        self.cookies = function(name, value) {
            var cookieLength, cookieArray, cookie, i, index;
            if (!name) {
                if (rawDocument.cookie !== lastCookieString) for (lastCookieString = rawDocument.cookie, 
                cookieArray = lastCookieString.split("; "), lastCookies = {}, i = 0; i < cookieArray.length; i++) cookie = cookieArray[i], 
                index = cookie.indexOf("="), index > 0 && (name = safeDecodeURIComponent(cookie.substring(0, index)), 
                lastCookies[name] === undefined && (lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1))));
                return lastCookies;
            }
            value === undefined ? rawDocument.cookie = encodeURIComponent(name) + "=;path=" + cookiePath + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : isString(value) && (cookieLength = (rawDocument.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=" + cookiePath).length + 1, 
            cookieLength > 4096 && $log.warn("Cookie '" + name + "' possibly not set or overflowed because it was too large (" + cookieLength + " > 4096 bytes)!"));
        }, self.defer = function(fn, delay) {
            var timeoutId;
            return outstandingRequestCount++, timeoutId = setTimeout(function() {
                delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn);
            }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId;
        }, self.defer.cancel = function(deferId) {
            return pendingDeferIds[deferId] ? (delete pendingDeferIds[deferId], clearTimeout(deferId), 
            completeOutstandingRequest(noop), !0) : !1;
        };
    }
    function $BrowserProvider() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function($window, $log, $sniffer, $document) {
            return new Browser($window, $document, $log, $sniffer);
        } ];
    }
    function $CacheFactoryProvider() {
        this.$get = function() {
            function cacheFactory(cacheId, options) {
                function refresh(entry) {
                    entry != freshEnd && (staleEnd ? staleEnd == entry && (staleEnd = entry.n) : staleEnd = entry, 
                    link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null);
                }
                function link(nextEntry, prevEntry) {
                    nextEntry != prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry));
                }
                if (cacheId in caches) throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                var size = 0, stats = extend({}, options, {
                    id: cacheId
                }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
                return caches[cacheId] = {
                    put: function(key, value) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key] || (lruHash[key] = {
                                key: key
                            });
                            refresh(lruEntry);
                        }
                        if (!isUndefined(value)) return key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key), 
                        value;
                    },
                    get: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            refresh(lruEntry);
                        }
                        return data[key];
                    },
                    remove: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            lruEntry == freshEnd && (freshEnd = lruEntry.p), lruEntry == staleEnd && (staleEnd = lruEntry.n), 
                            link(lruEntry.n, lruEntry.p), delete lruHash[key];
                        }
                        delete data[key], size--;
                    },
                    removeAll: function() {
                        data = {}, size = 0, lruHash = {}, freshEnd = staleEnd = null;
                    },
                    destroy: function() {
                        data = null, stats = null, lruHash = null, delete caches[cacheId];
                    },
                    info: function() {
                        return extend({}, stats, {
                            size: size
                        });
                    }
                };
            }
            var caches = {};
            return cacheFactory.info = function() {
                var info = {};
                return forEach(caches, function(cache, cacheId) {
                    info[cacheId] = cache.info();
                }), info;
            }, cacheFactory.get = function(cacheId) {
                return caches[cacheId];
            }, cacheFactory;
        };
    }
    function $TemplateCacheProvider() {
        this.$get = [ "$cacheFactory", function($cacheFactory) {
            return $cacheFactory("templates");
        } ];
    }
    function $CompileProvider($provide, $$sanitizeUriProvider) {
        function parseIsolateBindings(scope, directiveName) {
            var LOCAL_REGEXP = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, bindings = {};
            return forEach(scope, function(definition, scopeName) {
                var match = definition.match(LOCAL_REGEXP);
                if (!match) throw $compileMinErr("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition);
                bindings[scopeName] = {
                    mode: match[1][0],
                    collection: "*" === match[2],
                    optional: "?" === match[3],
                    attrName: match[4] || scopeName
                };
            }), bindings;
        }
        var hasDirectives = {}, Suffix = "Directive", COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\w\-]+)(?:\:([^;]+))?;?)/, ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"), REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        this.directive = function registerDirective(name, directiveFactory) {
            return assertNotHasOwnProperty(name, "directive"), isString(name) ? (assertArg(directiveFactory, "directiveFactory"), 
            hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], $provide.factory(name + Suffix, [ "$injector", "$exceptionHandler", function($injector, $exceptionHandler) {
                var directives = [];
                return forEach(hasDirectives[name], function(directiveFactory, index) {
                    try {
                        var directive = $injector.invoke(directiveFactory);
                        isFunction(directive) ? directive = {
                            compile: valueFn(directive)
                        } : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), 
                        directive.priority = directive.priority || 0, directive.index = index, directive.name = directive.name || name, 
                        directive.require = directive.require || directive.controller && directive.name, 
                        directive.restrict = directive.restrict || "EA", isObject(directive.scope) && (directive.$$isolateBindings = parseIsolateBindings(directive.scope, directive.name)), 
                        directives.push(directive);
                    } catch (e) {
                        $exceptionHandler(e);
                    }
                }), directives;
            } ])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), 
            this;
        }, this.aHrefSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp), 
            this) : $$sanitizeUriProvider.aHrefSanitizationWhitelist();
        }, this.imgSrcSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp), 
            this) : $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
        };
        var debugInfoEnabled = !0;
        this.debugInfoEnabled = function(enabled) {
            return isDefined(enabled) ? (debugInfoEnabled = enabled, this) : debugInfoEnabled;
        }, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $document, $sce, $animate, $$sanitizeUri) {
            function safeAddClass($element, className) {
                try {
                    $element.addClass(className);
                } catch (e) {}
            }
            function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes)), forEach($compileNodes, function(node, index) {
                    node.nodeType == NODE_TYPE_TEXT && node.nodeValue.match(/\S+/) && ($compileNodes[index] = jqLite(node).wrap("<span></span>").parent()[0]);
                });
                var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                compile.$$addScopeClass($compileNodes);
                var namespace = null;
                return function(scope, cloneConnectFn, options) {
                    assertArg(scope, "scope"), options = options || {};
                    var parentBoundTranscludeFn = options.parentBoundTranscludeFn, transcludeControllers = options.transcludeControllers, futureParentElement = options.futureParentElement;
                    parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude && (parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude), 
                    namespace || (namespace = detectNamespaceForChildElements(futureParentElement));
                    var $linkNode;
                    if ($linkNode = "html" !== namespace ? jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html())) : cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes, 
                    transcludeControllers) for (var controllerName in transcludeControllers) $linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                    return compile.$$addScopeInfo($linkNode, scope), cloneConnectFn && cloneConnectFn($linkNode, scope), 
                    compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn), 
                    $linkNode;
                };
            }
            function detectNamespaceForChildElements(parentElement) {
                var node = parentElement && parentElement[0];
                return node && "foreignobject" !== nodeName_(node) && node.toString().match(/SVG/) ? "svg" : "html";
            }
            function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                    var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn, stableNodeList;
                    if (nodeLinkFnFound) {
                        var nodeListLength = nodeList.length;
                        for (stableNodeList = new Array(nodeListLength), i = 0; i < linkFns.length; i += 3) idx = linkFns[i], 
                        stableNodeList[idx] = nodeList[idx];
                    } else stableNodeList = nodeList;
                    for (i = 0, ii = linkFns.length; ii > i; ) node = stableNodeList[linkFns[i++]], 
                    nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], nodeLinkFn ? (nodeLinkFn.scope ? (childScope = scope.$new(), 
                    compile.$$addScopeInfo(jqLite(node), childScope)) : childScope = scope, childBoundTranscludeFn = nodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn, nodeLinkFn.elementTranscludeOnThisElement) : !nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn ? parentBoundTranscludeFn : !parentBoundTranscludeFn && transcludeFn ? createBoundTranscludeFn(scope, transcludeFn) : null, 
                    nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn)) : childLinkFn && childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn);
                }
                for (var attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound, linkFns = [], i = 0; i < nodeList.length; i++) attrs = new Attributes(), 
                directives = collectDirectives(nodeList[i], [], attrs, 0 === i ? maxPriority : undefined, ignoreDirective), 
                nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null, 
                nodeLinkFn && nodeLinkFn.scope && compile.$$addScopeClass(attrs.$$element), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn), 
                (nodeLinkFn || childLinkFn) && (linkFns.push(i, nodeLinkFn, childLinkFn), linkFnFound = !0, 
                nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn), previousCompileContext = null;
                return linkFnFound ? compositeLinkFn : null;
            }
            function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                var boundTranscludeFn = function(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                    return transcludedScope || (transcludedScope = scope.$new(!1, containingScope), 
                    transcludedScope.$$transcluded = !0), transcludeFn(transcludedScope, cloneFn, {
                        parentBoundTranscludeFn: previousBoundTranscludeFn,
                        transcludeControllers: controllers,
                        futureParentElement: futureParentElement
                    });
                };
                return boundTranscludeFn;
            }
            function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                var match, className, nodeType = node.nodeType, attrsMap = attrs.$attr;
                switch (nodeType) {
                  case NODE_TYPE_ELEMENT:
                    addDirective(directives, directiveNormalize(nodeName_(node)), "E", maxPriority, ignoreDirective);
                    for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; jj > j; j++) {
                        var attrStartName = !1, attrEndName = !1;
                        attr = nAttrs[j], name = attr.name, value = trim(attr.value), ngAttrName = directiveNormalize(name), 
                        (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) && (name = name.replace(PREFIX_REGEXP, "").substr(8).replace(/_(.)/g, function(match, letter) {
                            return letter.toUpperCase();
                        }));
                        var directiveNName = ngAttrName.replace(/(Start|End)$/, "");
                        directiveIsMultiElement(directiveNName) && ngAttrName === directiveNName + "Start" && (attrStartName = name, 
                        attrEndName = name.substr(0, name.length - 5) + "end", name = name.substr(0, name.length - 6)), 
                        nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, (isNgAttr || !attrs.hasOwnProperty(nName)) && (attrs[nName] = value, 
                        getBooleanAttrName(node, nName) && (attrs[nName] = !0)), addAttrInterpolateDirective(node, directives, value, nName, isNgAttr), 
                        addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName);
                    }
                    if (className = node.className, isObject(className) && (className = className.animVal), 
                    isString(className) && "" !== className) for (;match = CLASS_DIRECTIVE_REGEXP.exec(className); ) nName = directiveNormalize(match[2]), 
                    addDirective(directives, nName, "C", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[3])), 
                    className = className.substr(match.index + match[0].length);
                    break;

                  case NODE_TYPE_TEXT:
                    addTextInterpolateDirective(directives, node.nodeValue);
                    break;

                  case NODE_TYPE_COMMENT:
                    try {
                        match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue), match && (nName = directiveNormalize(match[1]), 
                        addDirective(directives, nName, "M", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[2])));
                    } catch (e) {}
                }
                return directives.sort(byPriority), directives;
            }
            function groupScan(node, attrStart, attrEnd) {
                var nodes = [], depth = 0;
                if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                    do {
                        if (!node) throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                        node.nodeType == NODE_TYPE_ELEMENT && (node.hasAttribute(attrStart) && depth++, 
                        node.hasAttribute(attrEnd) && depth--), nodes.push(node), node = node.nextSibling;
                    } while (depth > 0);
                } else nodes.push(node);
                return jqLite(nodes);
            }
            function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                return function(scope, element, attrs, controllers, transcludeFn) {
                    return element = groupScan(element[0], attrStart, attrEnd), linkFn(scope, element, attrs, controllers, transcludeFn);
                };
            }
            function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                function addLinkFns(pre, post, attrStart, attrEnd) {
                    pre && (attrStart && (pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd)), 
                    pre.require = directive.require, pre.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (pre = cloneAndAnnotateFn(pre, {
                        isolateScope: !0
                    })), preLinkFns.push(pre)), post && (attrStart && (post = groupElementsLinkFnWrapper(post, attrStart, attrEnd)), 
                    post.require = directive.require, post.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (post = cloneAndAnnotateFn(post, {
                        isolateScope: !0
                    })), postLinkFns.push(post));
                }
                function getControllers(directiveName, require, $element, elementControllers) {
                    var value, match, retrievalMethod = "data", optional = !1, $searchElement = $element;
                    if (isString(require)) {
                        if (match = require.match(REQUIRE_PREFIX_REGEXP), require = require.substring(match[0].length), 
                        match[3] && (match[1] ? match[3] = null : match[1] = match[3]), "^" === match[1] ? retrievalMethod = "inheritedData" : "^^" === match[1] && (retrievalMethod = "inheritedData", 
                        $searchElement = $element.parent()), "?" === match[2] && (optional = !0), value = null, 
                        elementControllers && "data" === retrievalMethod && (value = elementControllers[require]) && (value = value.instance), 
                        value = value || $searchElement[retrievalMethod]("$" + require + "Controller"), 
                        !value && !optional) throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", require, directiveName);
                        return value || null;
                    }
                    return isArray(require) && (value = [], forEach(require, function(require) {
                        value.push(getControllers(directiveName, require, $element, elementControllers));
                    })), value;
                }
                function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                    function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement) {
                        var transcludeControllers;
                        return isScope(scope) || (futureParentElement = cloneAttachFn, cloneAttachFn = scope, 
                        scope = undefined), hasElementTranscludeDirective && (transcludeControllers = elementControllers), 
                        futureParentElement || (futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element), 
                        boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                    }
                    var i, ii, linkFn, controller, isolateScope, elementControllers, transcludeFn, $element, attrs;
                    if (compileNode === linkNode ? (attrs = templateAttrs, $element = templateAttrs.$$element) : ($element = jqLite(linkNode), 
                    attrs = new Attributes($element, templateAttrs)), newIsolateScopeDirective && (isolateScope = scope.$new(!0)), 
                    boundTranscludeFn && (transcludeFn = controllersBoundTransclude, transcludeFn.$$boundTransclude = boundTranscludeFn), 
                    controllerDirectives && (controllers = {}, elementControllers = {}, forEach(controllerDirectives, function(directive) {
                        var controllerInstance, locals = {
                            $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                            $element: $element,
                            $attrs: attrs,
                            $transclude: transcludeFn
                        };
                        controller = directive.controller, "@" == controller && (controller = attrs[directive.name]), 
                        controllerInstance = $controller(controller, locals, !0, directive.controllerAs), 
                        elementControllers[directive.name] = controllerInstance, hasElementTranscludeDirective || $element.data("$" + directive.name + "Controller", controllerInstance.instance), 
                        controllers[directive.name] = controllerInstance;
                    })), newIsolateScopeDirective) {
                        compile.$$addScopeInfo($element, isolateScope, !0, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective))), 
                        compile.$$addScopeClass($element, !0);
                        var isolateScopeController = controllers && controllers[newIsolateScopeDirective.name], isolateBindingContext = isolateScope;
                        isolateScopeController && isolateScopeController.identifier && newIsolateScopeDirective.bindToController === !0 && (isolateBindingContext = isolateScopeController.instance), 
                        forEach(isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings, function(definition, scopeName) {
                            var lastValue, parentGet, parentSet, compare, attrName = definition.attrName, optional = definition.optional, mode = definition.mode;
                            switch (mode) {
                              case "@":
                                attrs.$observe(attrName, function(value) {
                                    isolateBindingContext[scopeName] = value;
                                }), attrs.$$observers[attrName].$$scope = scope, attrs[attrName] && (isolateBindingContext[scopeName] = $interpolate(attrs[attrName])(scope));
                                break;

                              case "=":
                                if (optional && !attrs[attrName]) return;
                                parentGet = $parse(attrs[attrName]), compare = parentGet.literal ? equals : function(a, b) {
                                    return a === b || a !== a && b !== b;
                                }, parentSet = parentGet.assign || function() {
                                    throw lastValue = isolateBindingContext[scopeName] = parentGet(scope), $compileMinErr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", attrs[attrName], newIsolateScopeDirective.name);
                                }, lastValue = isolateBindingContext[scopeName] = parentGet(scope);
                                var parentValueWatch = function(parentValue) {
                                    return compare(parentValue, isolateBindingContext[scopeName]) || (compare(parentValue, lastValue) ? parentSet(scope, parentValue = isolateBindingContext[scopeName]) : isolateBindingContext[scopeName] = parentValue), 
                                    lastValue = parentValue;
                                };
                                parentValueWatch.$stateful = !0;
                                var unwatch;
                                unwatch = definition.collection ? scope.$watchCollection(attrs[attrName], parentValueWatch) : scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal), 
                                isolateScope.$on("$destroy", unwatch);
                                break;

                              case "&":
                                parentGet = $parse(attrs[attrName]), isolateBindingContext[scopeName] = function(locals) {
                                    return parentGet(scope, locals);
                                };
                            }
                        });
                    }
                    for (controllers && (forEach(controllers, function(controller) {
                        controller();
                    }), controllers = null), i = 0, ii = preLinkFns.length; ii > i; i++) linkFn = preLinkFns[i], 
                    invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    var scopeToChild = scope;
                    for (newIsolateScopeDirective && (newIsolateScopeDirective.template || null === newIsolateScopeDirective.templateUrl) && (scopeToChild = isolateScope), 
                    childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn), 
                    i = postLinkFns.length - 1; i >= 0; i--) linkFn = postLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                }
                previousCompileContext = previousCompileContext || {};
                for (var newScopeDirective, controllers, directive, directiveName, $template, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = !1, hasTemplate = !1, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, i = 0, ii = directives.length; ii > i; i++) {
                    directive = directives[i];
                    var attrStart = directive.$$start, attrEnd = directive.$$end;
                    if (attrStart && ($compileNode = groupScan(compileNode, attrStart, attrEnd)), $template = undefined, 
                    terminalPriority > directive.priority) break;
                    if ((directiveValue = directive.scope) && (directive.templateUrl || (isObject(directiveValue) ? (assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode), 
                    newIsolateScopeDirective = directive) : assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode)), 
                    newScopeDirective = newScopeDirective || directive), directiveName = directive.name, 
                    !directive.templateUrl && directive.controller && (directiveValue = directive.controller, 
                    controllerDirectives = controllerDirectives || {}, assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode), 
                    controllerDirectives[directiveName] = directive), (directiveValue = directive.transclude) && (hasTranscludeDirective = !0, 
                    directive.$$tlb || (assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode), 
                    nonTlbTranscludeDirective = directive), "element" == directiveValue ? (hasElementTranscludeDirective = !0, 
                    terminalPriority = directive.priority, $template = $compileNode, $compileNode = templateAttrs.$$element = jqLite(document.createComment(" " + directiveName + ": " + templateAttrs[directiveName] + " ")), 
                    compileNode = $compileNode[0], replaceWith(jqCollection, sliceArgs($template), compileNode), 
                    childTranscludeFn = compile($template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                        nonTlbTranscludeDirective: nonTlbTranscludeDirective
                    })) : ($template = jqLite(jqLiteClone(compileNode)).contents(), $compileNode.empty(), 
                    childTranscludeFn = compile($template, transcludeFn))), directive.template) if (hasTemplate = !0, 
                    assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, 
                    directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template, 
                    directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                        if (replaceDirective = directive, $template = jqLiteIsTextNode(directiveValue) ? [] : removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue))), 
                        compileNode = $template[0], 1 != $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                        replaceWith(jqCollection, $compileNode, compileNode);
                        var newTemplateAttrs = {
                            $attr: {}
                        }, templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs), unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                        newIsolateScopeDirective && markDirectivesAsIsolate(templateDirectives), directives = directives.concat(templateDirectives).concat(unprocessedDirectives), 
                        mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length;
                    } else $compileNode.html(directiveValue);
                    if (directive.templateUrl) hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), 
                    templateDirective = directive, directive.replace && (replaceDirective = directive), 
                    nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                        controllerDirectives: controllerDirectives,
                        newIsolateScopeDirective: newIsolateScopeDirective,
                        templateDirective: templateDirective,
                        nonTlbTranscludeDirective: nonTlbTranscludeDirective
                    }), ii = directives.length; else if (directive.compile) try {
                        linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn), isFunction(linkFn) ? addLinkFns(null, linkFn, attrStart, attrEnd) : linkFn && addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
                    } catch (e) {
                        $exceptionHandler(e, startingTag($compileNode));
                    }
                    directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority));
                }
                return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === !0, nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective, 
                nodeLinkFn.elementTranscludeOnThisElement = hasElementTranscludeDirective, nodeLinkFn.templateOnThisElement = hasTemplate, 
                nodeLinkFn.transclude = childTranscludeFn, previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective, 
                nodeLinkFn;
            }
            function markDirectivesAsIsolate(directives) {
                for (var j = 0, jj = directives.length; jj > j; j++) directives[j] = inherit(directives[j], {
                    $$isolateScope: !0
                });
            }
            function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                if (name === ignoreDirective) return null;
                var match = null;
                if (hasDirectives.hasOwnProperty(name)) for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++) try {
                    directive = directives[i], (maxPriority === undefined || maxPriority > directive.priority) && -1 != directive.restrict.indexOf(location) && (startAttrName && (directive = inherit(directive, {
                        $$start: startAttrName,
                        $$end: endAttrName
                    })), tDirectives.push(directive), match = directive);
                } catch (e) {
                    $exceptionHandler(e);
                }
                return match;
            }
            function directiveIsMultiElement(name) {
                if (hasDirectives.hasOwnProperty(name)) for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++) if (directive = directives[i], 
                directive.multiElement) return !0;
                return !1;
            }
            function mergeTemplateAttributes(dst, src) {
                var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
                forEach(dst, function(value, key) {
                    "$" != key.charAt(0) && (src[key] && src[key] !== value && (value += ("style" === key ? ";" : " ") + src[key]), 
                    dst.$set(key, value, !0, srcAttr[key]));
                }), forEach(src, function(value, key) {
                    "class" == key ? (safeAddClass($element, value), dst["class"] = (dst["class"] ? dst["class"] + " " : "") + value) : "style" == key ? ($element.attr("style", $element.attr("style") + ";" + value), 
                    dst.style = (dst.style ? dst.style + ";" : "") + value) : "$" == key.charAt(0) || dst.hasOwnProperty(key) || (dst[key] = value, 
                    dstAttr[key] = srcAttr[key]);
                });
            }
            function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [], beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: origAsyncDirective
                }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl, templateNamespace = origAsyncDirective.templateNamespace;
                return $compileNode.empty(), $templateRequest($sce.getTrustedResourceUrl(templateUrl)).then(function(content) {
                    var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                    if (content = denormalizeTemplate(content), origAsyncDirective.replace) {
                        if ($template = jqLiteIsTextNode(content) ? [] : removeComments(wrapTemplate(templateNamespace, trim(content))), 
                        compileNode = $template[0], 1 != $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                        tempTemplateAttrs = {
                            $attr: {}
                        }, replaceWith($rootElement, $compileNode, compileNode);
                        var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                        isObject(origAsyncDirective.scope) && markDirectivesAsIsolate(templateDirectives), 
                        directives = templateDirectives.concat(directives), mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
                    } else compileNode = beforeTemplateCompileNode, $compileNode.html(content);
                    for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext), 
                    forEach($rootElement, function(node, i) {
                        node == compileNode && ($rootElement[i] = $compileNode[0]);
                    }), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length; ) {
                        var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), boundTranscludeFn = linkQueue.shift(), linkNode = $compileNode[0];
                        if (!scope.$$destroyed) {
                            if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                var oldClasses = beforeTemplateLinkNode.className;
                                previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace || (linkNode = jqLiteClone(compileNode)), 
                                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode), safeAddClass(jqLite(linkNode), oldClasses);
                            }
                            childBoundTranscludeFn = afterTemplateNodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn) : boundTranscludeFn, 
                            afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn);
                        }
                    }
                    linkQueue = null;
                }), function(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                    var childBoundTranscludeFn = boundTranscludeFn;
                    scope.$$destroyed || (linkQueue ? linkQueue.push(scope, node, rootElement, childBoundTranscludeFn) : (afterTemplateNodeLinkFn.transcludeOnThisElement && (childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn)), 
                    afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn)));
                };
            }
            function byPriority(a, b) {
                var diff = b.priority - a.priority;
                return 0 !== diff ? diff : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function assertNoDuplicate(what, previousDirective, directive, element) {
                if (previousDirective) throw $compileMinErr("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", previousDirective.name, directive.name, what, startingTag(element));
            }
            function addTextInterpolateDirective(directives, text) {
                var interpolateFn = $interpolate(text, !0);
                interpolateFn && directives.push({
                    priority: 0,
                    compile: function(templateNode) {
                        var templateNodeParent = templateNode.parent(), hasCompileParent = !!templateNodeParent.length;
                        return hasCompileParent && compile.$$addBindingClass(templateNodeParent), function(scope, node) {
                            var parent = node.parent();
                            hasCompileParent || compile.$$addBindingClass(parent), compile.$$addBindingInfo(parent, interpolateFn.expressions), 
                            scope.$watch(interpolateFn, function(value) {
                                node[0].nodeValue = value;
                            });
                        };
                    }
                });
            }
            function wrapTemplate(type, template) {
                switch (type = lowercase(type || "html")) {
                  case "svg":
                  case "math":
                    var wrapper = document.createElement("div");
                    return wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">", wrapper.childNodes[0].childNodes;

                  default:
                    return template;
                }
            }
            function getTrustedContext(node, attrNormalizedName) {
                if ("srcdoc" == attrNormalizedName) return $sce.HTML;
                var tag = nodeName_(node);
                return "xlinkHref" == attrNormalizedName || "form" == tag && "action" == attrNormalizedName || "img" != tag && ("src" == attrNormalizedName || "ngSrc" == attrNormalizedName) ? $sce.RESOURCE_URL : void 0;
            }
            function addAttrInterpolateDirective(node, directives, value, name, allOrNothing) {
                var trustedContext = getTrustedContext(node, name);
                allOrNothing = ALL_OR_NOTHING_ATTRS[name] || allOrNothing;
                var interpolateFn = $interpolate(value, !0, trustedContext, allOrNothing);
                if (interpolateFn) {
                    if ("multiple" === name && "select" === nodeName_(node)) throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                    directives.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(scope, element, attr) {
                                    var $$observers = attr.$$observers || (attr.$$observers = {});
                                    if (EVENT_HANDLER_ATTR_REGEXP.test(name)) throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    var newValue = attr[name];
                                    newValue !== value && (interpolateFn = newValue && $interpolate(newValue, !0, trustedContext, allOrNothing), 
                                    value = newValue), interpolateFn && (attr[name] = interpolateFn(scope), ($$observers[name] || ($$observers[name] = [])).$$inter = !0, 
                                    (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function(newValue, oldValue) {
                                        "class" === name && newValue != oldValue ? attr.$updateClass(newValue, oldValue) : attr.$set(name, newValue);
                                    }));
                                }
                            };
                        }
                    });
                }
            }
            function replaceWith($rootElement, elementsToRemove, newNode) {
                var i, ii, firstElementToRemove = elementsToRemove[0], removeCount = elementsToRemove.length, parent = firstElementToRemove.parentNode;
                if ($rootElement) for (i = 0, ii = $rootElement.length; ii > i; i++) if ($rootElement[i] == firstElementToRemove) {
                    $rootElement[i++] = newNode;
                    for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; jj > j; j++, 
                    j2++) jj > j2 ? $rootElement[j] = $rootElement[j2] : delete $rootElement[j];
                    $rootElement.length -= removeCount - 1, $rootElement.context === firstElementToRemove && ($rootElement.context = newNode);
                    break;
                }
                parent && parent.replaceChild(newNode, firstElementToRemove);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(firstElementToRemove), jqLite(newNode).data(jqLite(firstElementToRemove).data()), 
                jQuery ? (skipDestroyOnNextJQueryCleanData = !0, jQuery.cleanData([ firstElementToRemove ])) : delete jqLite.cache[firstElementToRemove[jqLite.expando]];
                for (var k = 1, kk = elementsToRemove.length; kk > k; k++) {
                    var element = elementsToRemove[k];
                    jqLite(element).remove(), fragment.appendChild(element), delete elementsToRemove[k];
                }
                elementsToRemove[0] = newNode, elementsToRemove.length = 1;
            }
            function cloneAndAnnotateFn(fn, annotation) {
                return extend(function() {
                    return fn.apply(null, arguments);
                }, fn, annotation);
            }
            function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                try {
                    linkFn(scope, $element, attrs, controllers, transcludeFn);
                } catch (e) {
                    $exceptionHandler(e, startingTag($element));
                }
            }
            var Attributes = function(element, attributesToCopy) {
                if (attributesToCopy) {
                    var i, l, key, keys = Object.keys(attributesToCopy);
                    for (i = 0, l = keys.length; l > i; i++) key = keys[i], this[key] = attributesToCopy[key];
                } else this.$attr = {};
                this.$$element = element;
            };
            Attributes.prototype = {
                $normalize: directiveNormalize,
                $addClass: function(classVal) {
                    classVal && classVal.length > 0 && $animate.addClass(this.$$element, classVal);
                },
                $removeClass: function(classVal) {
                    classVal && classVal.length > 0 && $animate.removeClass(this.$$element, classVal);
                },
                $updateClass: function(newClasses, oldClasses) {
                    var toAdd = tokenDifference(newClasses, oldClasses);
                    toAdd && toAdd.length && $animate.addClass(this.$$element, toAdd);
                    var toRemove = tokenDifference(oldClasses, newClasses);
                    toRemove && toRemove.length && $animate.removeClass(this.$$element, toRemove);
                },
                $set: function(key, value, writeAttr, attrName) {
                    var nodeName, node = this.$$element[0], booleanKey = getBooleanAttrName(node, key), aliasedKey = getAliasedAttrName(node, key), observer = key;
                    if (booleanKey ? (this.$$element.prop(key, value), attrName = booleanKey) : aliasedKey && (this[aliasedKey] = value, 
                    observer = aliasedKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], 
                    attrName || (this.$attr[key] = attrName = snake_case(key, "-"))), nodeName = nodeName_(this.$$element), 
                    "a" === nodeName && "href" === key || "img" === nodeName && "src" === key) this[key] = value = $$sanitizeUri(value, "src" === key); else if ("img" === nodeName && "srcset" === key) {
                        for (var result = "", trimmedSrcset = trim(value), srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/, rawUris = trimmedSrcset.split(pattern), nbrUrisWith2parts = Math.floor(rawUris.length / 2), i = 0; nbrUrisWith2parts > i; i++) {
                            var innerIdx = 2 * i;
                            result += $$sanitizeUri(trim(rawUris[innerIdx]), !0), result += " " + trim(rawUris[innerIdx + 1]);
                        }
                        var lastTuple = trim(rawUris[2 * i]).split(/\s/);
                        result += $$sanitizeUri(trim(lastTuple[0]), !0), 2 === lastTuple.length && (result += " " + trim(lastTuple[1])), 
                        this[key] = value = result;
                    }
                    writeAttr !== !1 && (null === value || value === undefined ? this.$$element.removeAttr(attrName) : this.$$element.attr(attrName, value));
                    var $$observers = this.$$observers;
                    $$observers && forEach($$observers[observer], function(fn) {
                        try {
                            fn(value);
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    });
                },
                $observe: function(key, fn) {
                    var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = createMap()), listeners = $$observers[key] || ($$observers[key] = []);
                    return listeners.push(fn), $rootScope.$evalAsync(function() {
                        !listeners.$$inter && attrs.hasOwnProperty(key) && fn(attrs[key]);
                    }), function() {
                        arrayRemove(listeners, fn);
                    };
                }
            };
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = "{{" == startSymbol || "}}" == endSymbol ? identity : function(template) {
                return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
            }, NG_ATTR_BINDING = /^ngAttr[A-Z]/;
            return compile.$$addBindingInfo = debugInfoEnabled ? function($element, binding) {
                var bindings = $element.data("$binding") || [];
                isArray(binding) ? bindings = bindings.concat(binding) : bindings.push(binding), 
                $element.data("$binding", bindings);
            } : noop, compile.$$addBindingClass = debugInfoEnabled ? function($element) {
                safeAddClass($element, "ng-binding");
            } : noop, compile.$$addScopeInfo = debugInfoEnabled ? function($element, scope, isolated, noTemplate) {
                var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                $element.data(dataName, scope);
            } : noop, compile.$$addScopeClass = debugInfoEnabled ? function($element, isolated) {
                safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope");
            } : noop, compile;
        } ];
    }
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ""));
    }
    function tokenDifference(str1, str2) {
        var values = "", tokens1 = str1.split(/\s+/), tokens2 = str2.split(/\s+/);
        outer: for (var i = 0; i < tokens1.length; i++) {
            for (var token = tokens1[i], j = 0; j < tokens2.length; j++) if (token == tokens2[j]) continue outer;
            values += (values.length > 0 ? " " : "") + token;
        }
        return values;
    }
    function removeComments(jqNodes) {
        jqNodes = jqLite(jqNodes);
        var i = jqNodes.length;
        if (1 >= i) return jqNodes;
        for (;i--; ) {
            var node = jqNodes[i];
            node.nodeType === NODE_TYPE_COMMENT && splice.call(jqNodes, i, 1);
        }
        return jqNodes;
    }
    function $ControllerProvider() {
        var controllers = {}, globals = !1, CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(name, constructor) {
            assertNotHasOwnProperty(name, "controller"), isObject(name) ? extend(controllers, name) : controllers[name] = constructor;
        }, this.allowGlobals = function() {
            globals = !0;
        }, this.$get = [ "$injector", "$window", function($injector, $window) {
            function addIdentifier(locals, identifier, instance, name) {
                if (!locals || !isObject(locals.$scope)) throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                locals.$scope[identifier] = instance;
            }
            return function(expression, locals, later, ident) {
                var instance, match, constructor, identifier;
                if (later = later === !0, ident && isString(ident) && (identifier = ident), isString(expression) && (match = expression.match(CNTRL_REG), 
                constructor = match[1], identifier = identifier || match[3], expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, !0) || (globals ? getter($window, constructor, !0) : undefined), 
                assertArgFn(expression, constructor, !0)), later) {
                    var controllerPrototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                    return instance = Object.create(controllerPrototype || null), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), 
                    extend(function() {
                        return $injector.invoke(expression, instance, locals, constructor), instance;
                    }, {
                        instance: instance,
                        identifier: identifier
                    });
                }
                return instance = $injector.instantiate(expression, locals, constructor), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), 
                instance;
            };
        } ];
    }
    function $DocumentProvider() {
        this.$get = [ "$window", function(window) {
            return jqLite(window.document);
        } ];
    }
    function $ExceptionHandlerProvider() {
        this.$get = [ "$log", function($log) {
            return function() {
                $log.error.apply($log, arguments);
            };
        } ];
    }
    function defaultHttpResponseTransform(data, headers) {
        if (isString(data)) {
            var tempData = data.replace(JSON_PROTECTION_PREFIX, "").trim();
            if (tempData) {
                var contentType = headers("Content-Type");
                (contentType && 0 === contentType.indexOf(APPLICATION_JSON) || isJsonLike(tempData)) && (data = fromJson(tempData));
            }
        }
        return data;
    }
    function isJsonLike(str) {
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
    }
    function parseHeaders(headers) {
        var key, val, i, parsed = createMap();
        return headers ? (forEach(headers.split("\n"), function(line) {
            i = line.indexOf(":"), key = lowercase(trim(line.substr(0, i))), val = trim(line.substr(i + 1)), 
            key && (parsed[key] = parsed[key] ? parsed[key] + ", " + val : val);
        }), parsed) : parsed;
    }
    function headersGetter(headers) {
        var headersObj = isObject(headers) ? headers : undefined;
        return function(name) {
            if (headersObj || (headersObj = parseHeaders(headers)), name) {
                var value = headersObj[lowercase(name)];
                return void 0 === value && (value = null), value;
            }
            return headersObj;
        };
    }
    function transformData(data, headers, status, fns) {
        return isFunction(fns) ? fns(data, headers, status) : (forEach(fns, function(fn) {
            data = fn(data, headers, status);
        }), data);
    }
    function isSuccess(status) {
        return status >= 200 && 300 > status;
    }
    function $HttpProvider() {
        var defaults = this.defaults = {
            transformResponse: [ defaultHttpResponseTransform ],
            transformRequest: [ function(d) {
                return !isObject(d) || isFile(d) || isBlob(d) || isFormData(d) ? d : toJson(d);
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, useApplyAsync = !1;
        this.useApplyAsync = function(value) {
            return isDefined(value) ? (useApplyAsync = !!value, this) : useApplyAsync;
        };
        var interceptorFactories = this.interceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
            function $http(requestConfig) {
                function transformResponse(response) {
                    var resp = extend({}, response);
                    return resp.data = response.data ? transformData(response.data, response.headers, response.status, config.transformResponse) : response.data, 
                    isSuccess(response.status) ? resp : $q.reject(resp);
                }
                function executeHeaderFns(headers) {
                    var headerContent, processedHeaders = {};
                    return forEach(headers, function(headerFn, header) {
                        isFunction(headerFn) ? (headerContent = headerFn(), null != headerContent && (processedHeaders[header] = headerContent)) : processedHeaders[header] = headerFn;
                    }), processedHeaders;
                }
                function mergeHeaders(config) {
                    var defHeaderName, lowercaseDefHeaderName, reqHeaderName, defHeaders = defaults.headers, reqHeaders = extend({}, config.headers);
                    defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                    defaultHeadersIteration: for (defHeaderName in defHeaders) {
                        lowercaseDefHeaderName = lowercase(defHeaderName);
                        for (reqHeaderName in reqHeaders) if (lowercase(reqHeaderName) === lowercaseDefHeaderName) continue defaultHeadersIteration;
                        reqHeaders[defHeaderName] = defHeaders[defHeaderName];
                    }
                    return executeHeaderFns(reqHeaders);
                }
                if (!angular.isObject(requestConfig)) throw minErr("$http")("badreq", "Http request configuration must be an object.  Received: {0}", requestConfig);
                var config = extend({
                    method: "get",
                    transformRequest: defaults.transformRequest,
                    transformResponse: defaults.transformResponse
                }, requestConfig);
                config.headers = mergeHeaders(requestConfig), config.method = uppercase(config.method);
                var serverRequest = function(config) {
                    var headers = config.headers, reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);
                    return isUndefined(reqData) && forEach(headers, function(value, header) {
                        "content-type" === lowercase(header) && delete headers[header];
                    }), isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials) && (config.withCredentials = defaults.withCredentials), 
                    sendReq(config, reqData).then(transformResponse, transformResponse);
                }, chain = [ serverRequest, undefined ], promise = $q.when(config);
                for (forEach(reversedInterceptors, function(interceptor) {
                    (interceptor.request || interceptor.requestError) && chain.unshift(interceptor.request, interceptor.requestError), 
                    (interceptor.response || interceptor.responseError) && chain.push(interceptor.response, interceptor.responseError);
                }); chain.length; ) {
                    var thenFn = chain.shift(), rejectFn = chain.shift();
                    promise = promise.then(thenFn, rejectFn);
                }
                return promise.success = function(fn) {
                    return promise.then(function(response) {
                        fn(response.data, response.status, response.headers, config);
                    }), promise;
                }, promise.error = function(fn) {
                    return promise.then(null, function(response) {
                        fn(response.data, response.status, response.headers, config);
                    }), promise;
                }, promise;
            }
            function createShortMethods() {
                forEach(arguments, function(name) {
                    $http[name] = function(url, config) {
                        return $http(extend(config || {}, {
                            method: name,
                            url: url
                        }));
                    };
                });
            }
            function createShortMethodsWithData() {
                forEach(arguments, function(name) {
                    $http[name] = function(url, data, config) {
                        return $http(extend(config || {}, {
                            method: name,
                            url: url,
                            data: data
                        }));
                    };
                });
            }
            function sendReq(config, reqData) {
                function done(status, response, headersString, statusText) {
                    function resolveHttpPromise() {
                        resolvePromise(response, status, headersString, statusText);
                    }
                    cache && (isSuccess(status) ? cache.put(url, [ status, response, parseHeaders(headersString), statusText ]) : cache.remove(url)), 
                    useApplyAsync ? $rootScope.$applyAsync(resolveHttpPromise) : (resolveHttpPromise(), 
                    $rootScope.$$phase || $rootScope.$apply());
                }
                function resolvePromise(response, status, headers, statusText) {
                    status = Math.max(status, 0), (isSuccess(status) ? deferred.resolve : deferred.reject)({
                        data: response,
                        status: status,
                        headers: headersGetter(headers),
                        config: config,
                        statusText: statusText
                    });
                }
                function resolvePromiseWithResult(result) {
                    resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText);
                }
                function removePendingReq() {
                    var idx = $http.pendingRequests.indexOf(config);
                    -1 !== idx && $http.pendingRequests.splice(idx, 1);
                }
                var cache, cachedResp, deferred = $q.defer(), promise = deferred.promise, reqHeaders = config.headers, url = buildUrl(config.url, config.params);
                if ($http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), 
                !config.cache && !defaults.cache || config.cache === !1 || "GET" !== config.method && "JSONP" !== config.method || (cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache), 
                cache && (cachedResp = cache.get(url), isDefined(cachedResp) ? isPromiseLike(cachedResp) ? cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult) : isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]) : resolvePromise(cachedResp, 200, {}, "OK") : cache.put(url, promise)), 
                isUndefined(cachedResp)) {
                    var xsrfValue = urlIsSameOrigin(config.url) ? $browser.cookies()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                    xsrfValue && (reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue), 
                    $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType);
                }
                return promise;
            }
            function buildUrl(url, params) {
                if (!params) return url;
                var parts = [];
                return forEachSorted(params, function(value, key) {
                    null === value || isUndefined(value) || (isArray(value) || (value = [ value ]), 
                    forEach(value, function(v) {
                        isObject(v) && (v = isDate(v) ? v.toISOString() : toJson(v)), parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(v));
                    }));
                }), parts.length > 0 && (url += (-1 == url.indexOf("?") ? "?" : "&") + parts.join("&")), 
                url;
            }
            var defaultCache = $cacheFactory("$http"), reversedInterceptors = [];
            return forEach(interceptorFactories, function(interceptorFactory) {
                reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
            }), $http.pendingRequests = [], createShortMethods("get", "delete", "head", "jsonp"), 
            createShortMethodsWithData("post", "put", "patch"), $http.defaults = defaults, $http;
        } ];
    }
    function createXhr() {
        return new window.XMLHttpRequest();
    }
    function $HttpBackendProvider() {
        this.$get = [ "$browser", "$window", "$document", function($browser, $window, $document) {
            return createHttpBackend($browser, createXhr, $browser.defer, $window.angular.callbacks, $document[0]);
        } ];
    }
    function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
        function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement("script"), callback = null;
            return script.type = "text/javascript", script.src = url, script.async = !0, callback = function(event) {
                removeEventListenerFn(script, "load", callback), removeEventListenerFn(script, "error", callback), 
                rawDocument.body.removeChild(script), script = null;
                var status = -1, text = "unknown";
                event && ("load" !== event.type || callbacks[callbackId].called || (event = {
                    type: "error"
                }), text = event.type, status = "error" === event.type ? 404 : 200), done && done(status, text);
            }, addEventListenerFn(script, "load", callback), addEventListenerFn(script, "error", callback), 
            rawDocument.body.appendChild(script), callback;
        }
        return function(method, url, post, callback, headers, timeout, withCredentials, responseType) {
            function timeoutRequest() {
                jsonpDone && jsonpDone(), xhr && xhr.abort();
            }
            function completeRequest(callback, status, response, headersString, statusText) {
                timeoutId !== undefined && $browserDefer.cancel(timeoutId), jsonpDone = xhr = null, 
                callback(status, response, headersString, statusText), $browser.$$completeOutstandingRequest(noop);
            }
            if ($browser.$$incOutstandingRequestCount(), url = url || $browser.url(), "jsonp" == lowercase(method)) {
                var callbackId = "_" + (callbacks.counter++).toString(36);
                callbacks[callbackId] = function(data) {
                    callbacks[callbackId].data = data, callbacks[callbackId].called = !0;
                };
                var jsonpDone = jsonpReq(url.replace("JSON_CALLBACK", "angular.callbacks." + callbackId), callbackId, function(status, text) {
                    completeRequest(callback, status, callbacks[callbackId].data, "", text), callbacks[callbackId] = noop;
                });
            } else {
                var xhr = createXhr();
                xhr.open(method, url, !0), forEach(headers, function(value, key) {
                    isDefined(value) && xhr.setRequestHeader(key, value);
                }), xhr.onload = function() {
                    var statusText = xhr.statusText || "", response = "response" in xhr ? xhr.response : xhr.responseText, status = 1223 === xhr.status ? 204 : xhr.status;
                    0 === status && (status = response ? 200 : "file" == urlResolve(url).protocol ? 404 : 0), 
                    completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText);
                };
                var requestError = function() {
                    completeRequest(callback, -1, null, null, "");
                };
                if (xhr.onerror = requestError, xhr.onabort = requestError, withCredentials && (xhr.withCredentials = !0), 
                responseType) try {
                    xhr.responseType = responseType;
                } catch (e) {
                    if ("json" !== responseType) throw e;
                }
                xhr.send(post || null);
            }
            if (timeout > 0) var timeoutId = $browserDefer(timeoutRequest, timeout); else isPromiseLike(timeout) && timeout.then(timeoutRequest);
        };
    }
    function $InterpolateProvider() {
        var startSymbol = "{{", endSymbol = "}}";
        this.startSymbol = function(value) {
            return value ? (startSymbol = value, this) : startSymbol;
        }, this.endSymbol = function(value) {
            return value ? (endSymbol = value, this) : endSymbol;
        }, this.$get = [ "$parse", "$exceptionHandler", "$sce", function($parse, $exceptionHandler, $sce) {
            function escape(ch) {
                return "\\\\\\" + ch;
            }
            function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                function unescapeText(text) {
                    return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol);
                }
                function parseStringifyInterceptor(value) {
                    try {
                        return value = getValue(value), allOrNothing && !isDefined(value) ? value : stringify(value);
                    } catch (err) {
                        var newErr = $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
                        $exceptionHandler(newErr);
                    }
                }
                allOrNothing = !!allOrNothing;
                for (var startIndex, endIndex, exp, index = 0, expressions = [], parseFns = [], textLength = text.length, concat = [], expressionPositions = []; textLength > index; ) {
                    if (-1 == (startIndex = text.indexOf(startSymbol, index)) || -1 == (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength))) {
                        index !== textLength && concat.push(unescapeText(text.substring(index)));
                        break;
                    }
                    index !== startIndex && concat.push(unescapeText(text.substring(index, startIndex))), 
                    exp = text.substring(startIndex + startSymbolLength, endIndex), expressions.push(exp), 
                    parseFns.push($parse(exp, parseStringifyInterceptor)), index = endIndex + endSymbolLength, 
                    expressionPositions.push(concat.length), concat.push("");
                }
                if (trustedContext && concat.length > 1) throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", text);
                if (!mustHaveExpression || expressions.length) {
                    var compute = function(values) {
                        for (var i = 0, ii = expressions.length; ii > i; i++) {
                            if (allOrNothing && isUndefined(values[i])) return;
                            concat[expressionPositions[i]] = values[i];
                        }
                        return concat.join("");
                    }, getValue = function(value) {
                        return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value);
                    }, stringify = function(value) {
                        if (null == value) return "";
                        switch (typeof value) {
                          case "string":
                            break;

                          case "number":
                            value = "" + value;
                            break;

                          default:
                            value = toJson(value);
                        }
                        return value;
                    };
                    return extend(function(context) {
                        var i = 0, ii = expressions.length, values = new Array(ii);
                        try {
                            for (;ii > i; i++) values[i] = parseFns[i](context);
                            return compute(values);
                        } catch (err) {
                            var newErr = $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
                            $exceptionHandler(newErr);
                        }
                    }, {
                        exp: text,
                        expressions: expressions,
                        $$watchDelegate: function(scope, listener, objectEquality) {
                            var lastValue;
                            return scope.$watchGroup(parseFns, function(values, oldValues) {
                                var currValue = compute(values);
                                isFunction(listener) && listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope), 
                                lastValue = currValue;
                            }, objectEquality);
                        }
                    });
                }
            }
            var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length, escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"), escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
            return $interpolate.startSymbol = function() {
                return startSymbol;
            }, $interpolate.endSymbol = function() {
                return endSymbol;
            }, $interpolate;
        } ];
    }
    function $IntervalProvider() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function($rootScope, $window, $q, $$q) {
            function interval(fn, delay, count, invokeApply) {
                var setInterval = $window.setInterval, clearInterval = $window.clearInterval, iteration = 0, skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return count = isDefined(count) ? count : 0, promise.then(null, null, fn), promise.$$intervalId = setInterval(function() {
                    deferred.notify(iteration++), count > 0 && iteration >= count && (deferred.resolve(iteration), 
                    clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId]), skipApply || $rootScope.$apply();
                }, delay), intervals[promise.$$intervalId] = deferred, promise;
            }
            var intervals = {};
            return interval.cancel = function(promise) {
                return promise && promise.$$intervalId in intervals ? (intervals[promise.$$intervalId].reject("canceled"), 
                $window.clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId], 
                !0) : !1;
            }, interval;
        } ];
    }
    function $LocaleProvider() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(num) {
                    return 1 === num ? "one" : "other";
                }
            };
        };
    }
    function encodePath(path) {
        for (var segments = path.split("/"), i = segments.length; i--; ) segments[i] = encodeUriSegment(segments[i]);
        return segments.join("/");
    }
    function parseAbsoluteUrl(absoluteUrl, locationObj) {
        var parsedUrl = urlResolve(absoluteUrl);
        locationObj.$$protocol = parsedUrl.protocol, locationObj.$$host = parsedUrl.hostname, 
        locationObj.$$port = int(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
    }
    function parseAppUrl(relativeUrl, locationObj) {
        var prefixed = "/" !== relativeUrl.charAt(0);
        prefixed && (relativeUrl = "/" + relativeUrl);
        var match = urlResolve(relativeUrl);
        locationObj.$$path = decodeURIComponent(prefixed && "/" === match.pathname.charAt(0) ? match.pathname.substring(1) : match.pathname), 
        locationObj.$$search = parseKeyValue(match.search), locationObj.$$hash = decodeURIComponent(match.hash), 
        locationObj.$$path && "/" != locationObj.$$path.charAt(0) && (locationObj.$$path = "/" + locationObj.$$path);
    }
    function beginsWith(begin, whole) {
        return 0 === whole.indexOf(begin) ? whole.substr(begin.length) : void 0;
    }
    function stripHash(url) {
        var index = url.indexOf("#");
        return -1 == index ? url : url.substr(0, index);
    }
    function trimEmptyHash(url) {
        return url.replace(/(#.+)|#$/, "$1");
    }
    function stripFile(url) {
        return url.substr(0, stripHash(url).lastIndexOf("/") + 1);
    }
    function serverBase(url) {
        return url.substring(0, url.indexOf("/", url.indexOf("//") + 2));
    }
    function LocationHtml5Url(appBase, basePrefix) {
        this.$$html5 = !0, basePrefix = basePrefix || "";
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this), this.$$parse = function(url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl)) throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            parseAppUrl(pathUrl, this), this.$$path || (this.$$path = "/"), this.$$compose();
        }, this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBaseNoFile + this.$$url.substr(1);
        }, this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
            var appUrl, prevAppUrl, rewrittenUrl;
            return (appUrl = beginsWith(appBase, url)) !== undefined ? (prevAppUrl = appUrl, 
            rewrittenUrl = (appUrl = beginsWith(basePrefix, appUrl)) !== undefined ? appBaseNoFile + (beginsWith("/", appUrl) || appUrl) : appBase + prevAppUrl) : (appUrl = beginsWith(appBaseNoFile, url)) !== undefined ? rewrittenUrl = appBaseNoFile + appUrl : appBaseNoFile == url + "/" && (rewrittenUrl = appBaseNoFile), 
            rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl;
        };
    }
    function LocationHashbangUrl(appBase, hashPrefix) {
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this), this.$$parse = function(url) {
            function removeWindowsDriveName(path, url, base) {
                var firstPathSegmentMatch, windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                return 0 === url.indexOf(base) && (url = url.replace(base, "")), windowsFilePathExp.exec(url) ? path : (firstPathSegmentMatch = windowsFilePathExp.exec(path), 
                firstPathSegmentMatch ? firstPathSegmentMatch[1] : path);
            }
            var withoutHashUrl, withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
            "#" === withoutBaseUrl.charAt(0) ? (withoutHashUrl = beginsWith(hashPrefix, withoutBaseUrl), 
            isUndefined(withoutHashUrl) && (withoutHashUrl = withoutBaseUrl)) : withoutHashUrl = this.$$html5 ? withoutBaseUrl : "", 
            parseAppUrl(withoutHashUrl, this), this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase), 
            this.$$compose();
        }, this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "");
        }, this.$$parseLinkUrl = function(url) {
            return stripHash(appBase) == stripHash(url) ? (this.$$parse(url), !0) : !1;
        };
    }
    function LocationHashbangInHtml5Url(appBase, hashPrefix) {
        this.$$html5 = !0, LocationHashbangUrl.apply(this, arguments);
        var appBaseNoFile = stripFile(appBase);
        this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
            var rewrittenUrl, appUrl;
            return appBase == stripHash(url) ? rewrittenUrl = url : (appUrl = beginsWith(appBaseNoFile, url)) ? rewrittenUrl = appBase + hashPrefix + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), 
            rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl;
        }, this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + hashPrefix + this.$$url;
        };
    }
    function locationGetter(property) {
        return function() {
            return this[property];
        };
    }
    function locationGetterSetter(property, preprocess) {
        return function(value) {
            return isUndefined(value) ? this[property] : (this[property] = preprocess(value), 
            this.$$compose(), this);
        };
    }
    function $LocationProvider() {
        var hashPrefix = "", html5Mode = {
            enabled: !1,
            requireBase: !0,
            rewriteLinks: !0
        };
        this.hashPrefix = function(prefix) {
            return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix;
        }, this.html5Mode = function(mode) {
            return isBoolean(mode) ? (html5Mode.enabled = mode, this) : isObject(mode) ? (isBoolean(mode.enabled) && (html5Mode.enabled = mode.enabled), 
            isBoolean(mode.requireBase) && (html5Mode.requireBase = mode.requireBase), isBoolean(mode.rewriteLinks) && (html5Mode.rewriteLinks = mode.rewriteLinks), 
            this) : html5Mode;
        }, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function($rootScope, $browser, $sniffer, $rootElement, $window) {
            function setBrowserUrlWithFallback(url, replace, state) {
                var oldUrl = $location.url(), oldState = $location.$$state;
                try {
                    $browser.url(url, replace, state), $location.$$state = $browser.state();
                } catch (e) {
                    throw $location.url(oldUrl), $location.$$state = oldState, e;
                }
            }
            function afterLocationChange(oldUrl, oldState) {
                $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState);
            }
            var $location, LocationMode, appBase, baseHref = $browser.baseHref(), initialUrl = $browser.url();
            if (html5Mode.enabled) {
                if (!baseHref && html5Mode.requireBase) throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                appBase = serverBase(initialUrl) + (baseHref || "/"), LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
            } else appBase = stripHash(initialUrl), LocationMode = LocationHashbangUrl;
            $location = new LocationMode(appBase, "#" + hashPrefix), $location.$$parseLinkUrl(initialUrl, initialUrl), 
            $location.$$state = $browser.state();
            var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
            $rootElement.on("click", function(event) {
                if (html5Mode.rewriteLinks && !event.ctrlKey && !event.metaKey && 2 != event.which) {
                    for (var elm = jqLite(event.target); "a" !== nodeName_(elm[0]); ) if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                    var absHref = elm.prop("href"), relHref = elm.attr("href") || elm.attr("xlink:href");
                    isObject(absHref) && "[object SVGAnimatedString]" === absHref.toString() && (absHref = urlResolve(absHref.animVal).href), 
                    IGNORE_URI_REGEXP.test(absHref) || !absHref || elm.attr("target") || event.isDefaultPrevented() || $location.$$parseLinkUrl(absHref, relHref) && (event.preventDefault(), 
                    $location.absUrl() != $browser.url() && ($rootScope.$apply(), $window.angular["ff-684208-preventDefault"] = !0));
                }
            }), $location.absUrl() != initialUrl && $browser.url($location.absUrl(), !0);
            var initializing = !0;
            return $browser.onUrlChange(function(newUrl, newState) {
                $rootScope.$evalAsync(function() {
                    var defaultPrevented, oldUrl = $location.absUrl(), oldState = $location.$$state;
                    $location.$$parse(newUrl), $location.$$state = newState, defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented, 
                    $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), 
                    $location.$$state = oldState, setBrowserUrlWithFallback(oldUrl, !1, oldState)) : (initializing = !1, 
                    afterLocationChange(oldUrl, oldState)));
                }), $rootScope.$$phase || $rootScope.$digest();
            }), $rootScope.$watch(function() {
                var oldUrl = trimEmptyHash($browser.url()), newUrl = trimEmptyHash($location.absUrl()), oldState = $browser.state(), currentReplace = $location.$$replace, urlOrStateChanged = oldUrl !== newUrl || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                (initializing || urlOrStateChanged) && (initializing = !1, $rootScope.$evalAsync(function() {
                    var newUrl = $location.absUrl(), defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, $location.$$state, oldState).defaultPrevented;
                    $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), 
                    $location.$$state = oldState) : (urlOrStateChanged && setBrowserUrlWithFallback(newUrl, currentReplace, oldState === $location.$$state ? null : $location.$$state), 
                    afterLocationChange(oldUrl, oldState)));
                })), $location.$$replace = !1;
            }), $location;
        } ];
    }
    function $LogProvider() {
        var debug = !0, self = this;
        this.debugEnabled = function(flag) {
            return isDefined(flag) ? (debug = flag, this) : debug;
        }, this.$get = [ "$window", function($window) {
            function formatError(arg) {
                return arg instanceof Error && (arg.stack ? arg = arg.message && -1 === arg.stack.indexOf(arg.message) ? "Error: " + arg.message + "\n" + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line)), 
                arg;
            }
            function consoleLog(type) {
                var console = $window.console || {}, logFn = console[type] || console.log || noop, hasApply = !1;
                try {
                    hasApply = !!logFn.apply;
                } catch (e) {}
                return hasApply ? function() {
                    var args = [];
                    return forEach(arguments, function(arg) {
                        args.push(formatError(arg));
                    }), logFn.apply(console, args);
                } : function(arg1, arg2) {
                    logFn(arg1, null == arg2 ? "" : arg2);
                };
            }
            return {
                log: consoleLog("log"),
                info: consoleLog("info"),
                warn: consoleLog("warn"),
                error: consoleLog("error"),
                debug: function() {
                    var fn = consoleLog("debug");
                    return function() {
                        debug && fn.apply(self, arguments);
                    };
                }()
            };
        } ];
    }
    function ensureSafeMemberName(name, fullExpression) {
        if ("__defineGetter__" === name || "__defineSetter__" === name || "__lookupGetter__" === name || "__lookupSetter__" === name || "__proto__" === name) throw $parseMinErr("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", fullExpression);
        return name;
    }
    function ensureSafeObject(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.window === obj) throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj === Object) throw $parseMinErr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", fullExpression);
        }
        return obj;
    }
    function ensureSafeFunction(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj === CALL || obj === APPLY || obj === BIND) throw $parseMinErr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", fullExpression);
        }
    }
    function isConstant(exp) {
        return exp.constant;
    }
    function setter(obj, locals, path, setValue, fullExp) {
        ensureSafeObject(obj, fullExp), ensureSafeObject(locals, fullExp);
        for (var key, element = path.split("."), i = 0; element.length > 1; i++) {
            key = ensureSafeMemberName(element.shift(), fullExp);
            var propertyObj = 0 === i && locals && locals[key] || obj[key];
            propertyObj || (propertyObj = {}, obj[key] = propertyObj), obj = ensureSafeObject(propertyObj, fullExp);
        }
        return key = ensureSafeMemberName(element.shift(), fullExp), ensureSafeObject(obj[key], fullExp), 
        obj[key] = setValue, setValue;
    }
    function isPossiblyDangerousMemberName(name) {
        return "constructor" == name;
    }
    function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp, expensiveChecks) {
        ensureSafeMemberName(key0, fullExp), ensureSafeMemberName(key1, fullExp), ensureSafeMemberName(key2, fullExp), 
        ensureSafeMemberName(key3, fullExp), ensureSafeMemberName(key4, fullExp);
        var eso = function(o) {
            return ensureSafeObject(o, fullExp);
        }, eso0 = expensiveChecks || isPossiblyDangerousMemberName(key0) ? eso : identity, eso1 = expensiveChecks || isPossiblyDangerousMemberName(key1) ? eso : identity, eso2 = expensiveChecks || isPossiblyDangerousMemberName(key2) ? eso : identity, eso3 = expensiveChecks || isPossiblyDangerousMemberName(key3) ? eso : identity, eso4 = expensiveChecks || isPossiblyDangerousMemberName(key4) ? eso : identity;
        return function(scope, locals) {
            var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope;
            return null == pathVal ? pathVal : (pathVal = eso0(pathVal[key0]), key1 ? null == pathVal ? undefined : (pathVal = eso1(pathVal[key1]), 
            key2 ? null == pathVal ? undefined : (pathVal = eso2(pathVal[key2]), key3 ? null == pathVal ? undefined : (pathVal = eso3(pathVal[key3]), 
            key4 ? null == pathVal ? undefined : pathVal = eso4(pathVal[key4]) : pathVal) : pathVal) : pathVal) : pathVal);
        };
    }
    function getterFnWithEnsureSafeObject(fn, fullExpression) {
        return function(s, l) {
            return fn(s, l, ensureSafeObject, fullExpression);
        };
    }
    function getterFn(path, options, fullExp) {
        var expensiveChecks = options.expensiveChecks, getterFnCache = expensiveChecks ? getterFnCacheExpensive : getterFnCacheDefault, fn = getterFnCache[path];
        if (fn) return fn;
        var pathKeys = path.split("."), pathKeysLength = pathKeys.length;
        if (options.csp) fn = 6 > pathKeysLength ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp, expensiveChecks) : function(scope, locals) {
            var val, i = 0;
            do val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp, expensiveChecks)(scope, locals), 
            locals = undefined, scope = val; while (pathKeysLength > i);
            return val;
        }; else {
            var code = "";
            expensiveChecks && (code += "s = eso(s, fe);\nl = eso(l, fe);\n");
            var needsEnsureSafeObject = expensiveChecks;
            forEach(pathKeys, function(key, index) {
                ensureSafeMemberName(key, fullExp);
                var lookupJs = (index ? "s" : '((l&&l.hasOwnProperty("' + key + '"))?l:s)') + "." + key;
                (expensiveChecks || isPossiblyDangerousMemberName(key)) && (lookupJs = "eso(" + lookupJs + ", fe)", 
                needsEnsureSafeObject = !0), code += "if(s == null) return undefined;\ns=" + lookupJs + ";\n";
            }), code += "return s;";
            var evaledFnGetter = new Function("s", "l", "eso", "fe", code);
            evaledFnGetter.toString = valueFn(code), needsEnsureSafeObject && (evaledFnGetter = getterFnWithEnsureSafeObject(evaledFnGetter, fullExp)), 
            fn = evaledFnGetter;
        }
        return fn.sharedGetter = !0, fn.assign = function(self, value, locals) {
            return setter(self, locals, path, value, path);
        }, getterFnCache[path] = fn, fn;
    }
    function getValueOf(value) {
        return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value);
    }
    function $ParseProvider() {
        var cacheDefault = createMap(), cacheExpensive = createMap();
        this.$get = [ "$filter", "$sniffer", function($filter, $sniffer) {
            function wrapSharedExpression(exp) {
                var wrapped = exp;
                return exp.sharedGetter && (wrapped = function(self, locals) {
                    return exp(self, locals);
                }, wrapped.literal = exp.literal, wrapped.constant = exp.constant, wrapped.assign = exp.assign), 
                wrapped;
            }
            function collectExpressionInputs(inputs, list) {
                for (var i = 0, ii = inputs.length; ii > i; i++) {
                    var input = inputs[i];
                    input.constant || (input.inputs ? collectExpressionInputs(input.inputs, list) : -1 === list.indexOf(input) && list.push(input));
                }
                return list;
            }
            function expressionInputDirtyCheck(newValue, oldValueOfValue) {
                return null == newValue || null == oldValueOfValue ? newValue === oldValueOfValue : "object" == typeof newValue && (newValue = getValueOf(newValue), 
                "object" == typeof newValue) ? !1 : newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue;
            }
            function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var lastResult, inputExpressions = parsedExpression.$$inputs || (parsedExpression.$$inputs = collectExpressionInputs(parsedExpression.inputs, []));
                if (1 === inputExpressions.length) {
                    var oldInputValue = expressionInputDirtyCheck;
                    return inputExpressions = inputExpressions[0], scope.$watch(function(scope) {
                        var newInputValue = inputExpressions(scope);
                        return expressionInputDirtyCheck(newInputValue, oldInputValue) || (lastResult = parsedExpression(scope), 
                        oldInputValue = newInputValue && getValueOf(newInputValue)), lastResult;
                    }, listener, objectEquality);
                }
                for (var oldInputValueOfValues = [], i = 0, ii = inputExpressions.length; ii > i; i++) oldInputValueOfValues[i] = expressionInputDirtyCheck;
                return scope.$watch(function(scope) {
                    for (var changed = !1, i = 0, ii = inputExpressions.length; ii > i; i++) {
                        var newInputValue = inputExpressions[i](scope);
                        (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i]))) && (oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue));
                    }
                    return changed && (lastResult = parsedExpression(scope)), lastResult;
                }, listener, objectEquality);
            }
            function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function(scope) {
                    return parsedExpression(scope);
                }, function(value, old, scope) {
                    lastValue = value, isFunction(listener) && listener.apply(this, arguments), isDefined(value) && scope.$$postDigest(function() {
                        isDefined(lastValue) && unwatch();
                    });
                }, objectEquality);
            }
            function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                function isAllDefined(value) {
                    var allDefined = !0;
                    return forEach(value, function(val) {
                        isDefined(val) || (allDefined = !1);
                    }), allDefined;
                }
                var unwatch, lastValue;
                return unwatch = scope.$watch(function(scope) {
                    return parsedExpression(scope);
                }, function(value, old, scope) {
                    lastValue = value, isFunction(listener) && listener.call(this, value, old, scope), 
                    isAllDefined(value) && scope.$$postDigest(function() {
                        isAllDefined(lastValue) && unwatch();
                    });
                }, objectEquality);
            }
            function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch;
                return unwatch = scope.$watch(function(scope) {
                    return parsedExpression(scope);
                }, function() {
                    isFunction(listener) && listener.apply(this, arguments), unwatch();
                }, objectEquality);
            }
            function addInterceptor(parsedExpression, interceptorFn) {
                if (!interceptorFn) return parsedExpression;
                var watchDelegate = parsedExpression.$$watchDelegate, regularWatch = watchDelegate !== oneTimeLiteralWatchDelegate && watchDelegate !== oneTimeWatchDelegate, fn = regularWatch ? function(scope, locals) {
                    var value = parsedExpression(scope, locals);
                    return interceptorFn(value, scope, locals);
                } : function(scope, locals) {
                    var value = parsedExpression(scope, locals), result = interceptorFn(value, scope, locals);
                    return isDefined(value) ? result : value;
                };
                return parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate ? fn.$$watchDelegate = parsedExpression.$$watchDelegate : interceptorFn.$stateful || (fn.$$watchDelegate = inputsWatchDelegate, 
                fn.inputs = [ parsedExpression ]), fn;
            }
            var $parseOptions = {
                csp: $sniffer.csp,
                expensiveChecks: !1
            }, $parseOptionsExpensive = {
                csp: $sniffer.csp,
                expensiveChecks: !0
            };
            return function(exp, interceptorFn, expensiveChecks) {
                var parsedExpression, oneTime, cacheKey;
                switch (typeof exp) {
                  case "string":
                    cacheKey = exp = exp.trim();
                    var cache = expensiveChecks ? cacheExpensive : cacheDefault;
                    if (parsedExpression = cache[cacheKey], !parsedExpression) {
                        ":" === exp.charAt(0) && ":" === exp.charAt(1) && (oneTime = !0, exp = exp.substring(2));
                        var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions, lexer = new Lexer(parseOptions), parser = new Parser(lexer, $filter, parseOptions);
                        parsedExpression = parser.parse(exp), parsedExpression.constant ? parsedExpression.$$watchDelegate = constantWatchDelegate : oneTime ? (parsedExpression = wrapSharedExpression(parsedExpression), 
                        parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate) : parsedExpression.inputs && (parsedExpression.$$watchDelegate = inputsWatchDelegate), 
                        cache[cacheKey] = parsedExpression;
                    }
                    return addInterceptor(parsedExpression, interceptorFn);

                  case "function":
                    return addInterceptor(exp, interceptorFn);

                  default:
                    return addInterceptor(noop, interceptorFn);
                }
            };
        } ];
    }
    function $QProvider() {
        this.$get = [ "$rootScope", "$exceptionHandler", function($rootScope, $exceptionHandler) {
            return qFactory(function(callback) {
                $rootScope.$evalAsync(callback);
            }, $exceptionHandler);
        } ];
    }
    function $$QProvider() {
        this.$get = [ "$browser", "$exceptionHandler", function($browser, $exceptionHandler) {
            return qFactory(function(callback) {
                $browser.defer(callback);
            }, $exceptionHandler);
        } ];
    }
    function qFactory(nextTick, exceptionHandler) {
        function callOnce(self, resolveFn, rejectFn) {
            function wrap(fn) {
                return function(value) {
                    called || (called = !0, fn.call(self, value));
                };
            }
            var called = !1;
            return [ wrap(resolveFn), wrap(rejectFn) ];
        }
        function Promise() {
            this.$$state = {
                status: 0
            };
        }
        function simpleBind(context, fn) {
            return function(value) {
                fn.call(context, value);
            };
        }
        function processQueue(state) {
            var fn, promise, pending;
            pending = state.pending, state.processScheduled = !1, state.pending = undefined;
            for (var i = 0, ii = pending.length; ii > i; ++i) {
                promise = pending[i][0], fn = pending[i][state.status];
                try {
                    isFunction(fn) ? promise.resolve(fn(state.value)) : 1 === state.status ? promise.resolve(state.value) : promise.reject(state.value);
                } catch (e) {
                    promise.reject(e), exceptionHandler(e);
                }
            }
        }
        function scheduleProcessQueue(state) {
            !state.processScheduled && state.pending && (state.processScheduled = !0, nextTick(function() {
                processQueue(state);
            }));
        }
        function Deferred() {
            this.promise = new Promise(), this.resolve = simpleBind(this, this.resolve), this.reject = simpleBind(this, this.reject), 
            this.notify = simpleBind(this, this.notify);
        }
        function all(promises) {
            var deferred = new Deferred(), counter = 0, results = isArray(promises) ? [] : {};
            return forEach(promises, function(promise, key) {
                counter++, when(promise).then(function(value) {
                    results.hasOwnProperty(key) || (results[key] = value, --counter || deferred.resolve(results));
                }, function(reason) {
                    results.hasOwnProperty(key) || deferred.reject(reason);
                });
            }), 0 === counter && deferred.resolve(results), deferred.promise;
        }
        var $qMinErr = minErr("$q", TypeError), defer = function() {
            return new Deferred();
        };
        Promise.prototype = {
            then: function(onFulfilled, onRejected, progressBack) {
                var result = new Deferred();
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ result, onFulfilled, onRejected, progressBack ]), 
                this.$$state.status > 0 && scheduleProcessQueue(this.$$state), result.promise;
            },
            "catch": function(callback) {
                return this.then(null, callback);
            },
            "finally": function(callback, progressBack) {
                return this.then(function(value) {
                    return handleCallback(value, !0, callback);
                }, function(error) {
                    return handleCallback(error, !1, callback);
                }, progressBack);
            }
        }, Deferred.prototype = {
            resolve: function(val) {
                this.promise.$$state.status || (val === this.promise ? this.$$reject($qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val)) : this.$$resolve(val));
            },
            $$resolve: function(val) {
                var then, fns;
                fns = callOnce(this, this.$$resolve, this.$$reject);
                try {
                    (isObject(val) || isFunction(val)) && (then = val && val.then), isFunction(then) ? (this.promise.$$state.status = -1, 
                    then.call(val, fns[0], fns[1], this.notify)) : (this.promise.$$state.value = val, 
                    this.promise.$$state.status = 1, scheduleProcessQueue(this.promise.$$state));
                } catch (e) {
                    fns[1](e), exceptionHandler(e);
                }
            },
            reject: function(reason) {
                this.promise.$$state.status || this.$$reject(reason);
            },
            $$reject: function(reason) {
                this.promise.$$state.value = reason, this.promise.$$state.status = 2, scheduleProcessQueue(this.promise.$$state);
            },
            notify: function(progress) {
                var callbacks = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && callbacks && callbacks.length && nextTick(function() {
                    for (var callback, result, i = 0, ii = callbacks.length; ii > i; i++) {
                        result = callbacks[i][0], callback = callbacks[i][3];
                        try {
                            result.notify(isFunction(callback) ? callback(progress) : progress);
                        } catch (e) {
                            exceptionHandler(e);
                        }
                    }
                });
            }
        };
        var reject = function(reason) {
            var result = new Deferred();
            return result.reject(reason), result.promise;
        }, makePromise = function(value, resolved) {
            var result = new Deferred();
            return resolved ? result.resolve(value) : result.reject(value), result.promise;
        }, handleCallback = function(value, isResolved, callback) {
            var callbackOutput = null;
            try {
                isFunction(callback) && (callbackOutput = callback());
            } catch (e) {
                return makePromise(e, !1);
            }
            return isPromiseLike(callbackOutput) ? callbackOutput.then(function() {
                return makePromise(value, isResolved);
            }, function(error) {
                return makePromise(error, !1);
            }) : makePromise(value, isResolved);
        }, when = function(value, callback, errback, progressBack) {
            var result = new Deferred();
            return result.resolve(value), result.promise.then(callback, errback, progressBack);
        }, $Q = function Q(resolver) {
            function resolveFn(value) {
                deferred.resolve(value);
            }
            function rejectFn(reason) {
                deferred.reject(reason);
            }
            if (!isFunction(resolver)) throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
            if (!(this instanceof Q)) return new Q(resolver);
            var deferred = new Deferred();
            return resolver(resolveFn, rejectFn), deferred.promise;
        };
        return $Q.defer = defer, $Q.reject = reject, $Q.when = when, $Q.all = all, $Q;
    }
    function $$RAFProvider() {
        this.$get = [ "$window", "$timeout", function($window, $timeout) {
            var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame, cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame, rafSupported = !!requestAnimationFrame, raf = rafSupported ? function(fn) {
                var id = requestAnimationFrame(fn);
                return function() {
                    cancelAnimationFrame(id);
                };
            } : function(fn) {
                var timer = $timeout(fn, 16.66, !1);
                return function() {
                    $timeout.cancel(timer);
                };
            };
            return raf.supported = rafSupported, raf;
        } ];
    }
    function $RootScopeProvider() {
        var TTL = 10, $rootScopeMinErr = minErr("$rootScope"), lastDirtyWatch = null, applyAsyncId = null;
        this.digestTtl = function(value) {
            return arguments.length && (TTL = value), TTL;
        }, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function($injector, $exceptionHandler, $parse, $browser) {
            function Scope() {
                this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
                this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
                this.$$isolateBindings = null;
            }
            function beginPhase(phase) {
                if ($rootScope.$$phase) throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                $rootScope.$$phase = phase;
            }
            function clearPhase() {
                $rootScope.$$phase = null;
            }
            function decrementListenerCount(current, count, name) {
                do current.$$listenerCount[name] -= count, 0 === current.$$listenerCount[name] && delete current.$$listenerCount[name]; while (current = current.$parent);
            }
            function initWatchVal() {}
            function flushApplyAsync() {
                for (;applyAsyncQueue.length; ) try {
                    applyAsyncQueue.shift()();
                } catch (e) {
                    $exceptionHandler(e);
                }
                applyAsyncId = null;
            }
            function scheduleApplyAsync() {
                null === applyAsyncId && (applyAsyncId = $browser.defer(function() {
                    $rootScope.$apply(flushApplyAsync);
                }));
            }
            Scope.prototype = {
                constructor: Scope,
                $new: function(isolate, parent) {
                    function destroyChild() {
                        child.$$destroyed = !0;
                    }
                    var child;
                    return parent = parent || this, isolate ? (child = new Scope(), child.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
                        this.$$listeners = {}, this.$$listenerCount = {}, this.$id = nextUid(), this.$$ChildScope = null;
                    }, this.$$ChildScope.prototype = this), child = new this.$$ChildScope()), child.$parent = parent, 
                    child.$$prevSibling = parent.$$childTail, parent.$$childHead ? (parent.$$childTail.$$nextSibling = child, 
                    parent.$$childTail = child) : parent.$$childHead = parent.$$childTail = child, (isolate || parent != this) && child.$on("$destroy", destroyChild), 
                    child;
                },
                $watch: function(watchExp, listener, objectEquality) {
                    var get = $parse(watchExp);
                    if (get.$$watchDelegate) return get.$$watchDelegate(this, listener, objectEquality, get);
                    var scope = this, array = scope.$$watchers, watcher = {
                        fn: listener,
                        last: initWatchVal,
                        get: get,
                        exp: watchExp,
                        eq: !!objectEquality
                    };
                    return lastDirtyWatch = null, isFunction(listener) || (watcher.fn = noop), array || (array = scope.$$watchers = []), 
                    array.unshift(watcher), function() {
                        arrayRemove(array, watcher), lastDirtyWatch = null;
                    };
                },
                $watchGroup: function(watchExpressions, listener) {
                    function watchGroupAction() {
                        changeReactionScheduled = !1, firstRun ? (firstRun = !1, listener(newValues, newValues, self)) : listener(newValues, oldValues, self);
                    }
                    var oldValues = new Array(watchExpressions.length), newValues = new Array(watchExpressions.length), deregisterFns = [], self = this, changeReactionScheduled = !1, firstRun = !0;
                    if (!watchExpressions.length) {
                        var shouldCall = !0;
                        return self.$evalAsync(function() {
                            shouldCall && listener(newValues, newValues, self);
                        }), function() {
                            shouldCall = !1;
                        };
                    }
                    return 1 === watchExpressions.length ? this.$watch(watchExpressions[0], function(value, oldValue, scope) {
                        newValues[0] = value, oldValues[0] = oldValue, listener(newValues, value === oldValue ? newValues : oldValues, scope);
                    }) : (forEach(watchExpressions, function(expr, i) {
                        var unwatchFn = self.$watch(expr, function(value, oldValue) {
                            newValues[i] = value, oldValues[i] = oldValue, changeReactionScheduled || (changeReactionScheduled = !0, 
                            self.$evalAsync(watchGroupAction));
                        });
                        deregisterFns.push(unwatchFn);
                    }), function() {
                        for (;deregisterFns.length; ) deregisterFns.shift()();
                    });
                },
                $watchCollection: function(obj, listener) {
                    function $watchCollectionInterceptor(_value) {
                        newValue = _value;
                        var newLength, key, bothNaN, newItem, oldItem;
                        if (!isUndefined(newValue)) {
                            if (isObject(newValue)) if (isArrayLike(newValue)) {
                                oldValue !== internalArray && (oldValue = internalArray, oldLength = oldValue.length = 0, 
                                changeDetected++), newLength = newValue.length, oldLength !== newLength && (changeDetected++, 
                                oldValue.length = oldLength = newLength);
                                for (var i = 0; newLength > i; i++) oldItem = oldValue[i], newItem = newValue[i], 
                                bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, 
                                oldValue[i] = newItem);
                            } else {
                                oldValue !== internalObject && (oldValue = internalObject = {}, oldLength = 0, changeDetected++), 
                                newLength = 0;
                                for (key in newValue) newValue.hasOwnProperty(key) && (newLength++, newItem = newValue[key], 
                                oldItem = oldValue[key], key in oldValue ? (bothNaN = oldItem !== oldItem && newItem !== newItem, 
                                bothNaN || oldItem === newItem || (changeDetected++, oldValue[key] = newItem)) : (oldLength++, 
                                oldValue[key] = newItem, changeDetected++));
                                if (oldLength > newLength) {
                                    changeDetected++;
                                    for (key in oldValue) newValue.hasOwnProperty(key) || (oldLength--, delete oldValue[key]);
                                }
                            } else oldValue !== newValue && (oldValue = newValue, changeDetected++);
                            return changeDetected;
                        }
                    }
                    function $watchCollectionAction() {
                        if (initRun ? (initRun = !1, listener(newValue, newValue, self)) : listener(newValue, veryOldValue, self), 
                        trackVeryOldValue) if (isObject(newValue)) if (isArrayLike(newValue)) {
                            veryOldValue = new Array(newValue.length);
                            for (var i = 0; i < newValue.length; i++) veryOldValue[i] = newValue[i];
                        } else {
                            veryOldValue = {};
                            for (var key in newValue) hasOwnProperty.call(newValue, key) && (veryOldValue[key] = newValue[key]);
                        } else veryOldValue = newValue;
                    }
                    $watchCollectionInterceptor.$stateful = !0;
                    var newValue, oldValue, veryOldValue, self = this, trackVeryOldValue = listener.length > 1, changeDetected = 0, changeDetector = $parse(obj, $watchCollectionInterceptor), internalArray = [], internalObject = {}, initRun = !0, oldLength = 0;
                    return this.$watch(changeDetector, $watchCollectionAction);
                },
                $digest: function() {
                    var watch, value, last, watchers, length, dirty, next, current, logIdx, asyncTask, ttl = TTL, target = this, watchLog = [];
                    beginPhase("$digest"), $browser.$$checkUrlChange(), this === $rootScope && null !== applyAsyncId && ($browser.defer.cancel(applyAsyncId), 
                    flushApplyAsync()), lastDirtyWatch = null;
                    do {
                        for (dirty = !1, current = target; asyncQueue.length; ) {
                            try {
                                asyncTask = asyncQueue.shift(), asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                            lastDirtyWatch = null;
                        }
                        traverseScopesLoop: do {
                            if (watchers = current.$$watchers) for (length = watchers.length; length--; ) try {
                                if (watch = watchers[length]) if ((value = watch.get(current)) === (last = watch.last) || (watch.eq ? equals(value, last) : "number" == typeof value && "number" == typeof last && isNaN(value) && isNaN(last))) {
                                    if (watch === lastDirtyWatch) {
                                        dirty = !1;
                                        break traverseScopesLoop;
                                    }
                                } else dirty = !0, lastDirtyWatch = watch, watch.last = watch.eq ? copy(value, null) : value, 
                                watch.fn(value, last === initWatchVal ? value : last, current), 5 > ttl && (logIdx = 4 - ttl, 
                                watchLog[logIdx] || (watchLog[logIdx] = []), watchLog[logIdx].push({
                                    msg: isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                    newVal: value,
                                    oldVal: last
                                }));
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                            if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) for (;current !== target && !(next = current.$$nextSibling); ) current = current.$parent;
                        } while (current = next);
                        if ((dirty || asyncQueue.length) && !ttl--) throw clearPhase(), $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", TTL, watchLog);
                    } while (dirty || asyncQueue.length);
                    for (clearPhase(); postDigestQueue.length; ) try {
                        postDigestQueue.shift()();
                    } catch (e) {
                        $exceptionHandler(e);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var parent = this.$parent;
                        if (this.$broadcast("$destroy"), this.$$destroyed = !0, this !== $rootScope) {
                            for (var eventName in this.$$listenerCount) decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                            parent.$$childHead == this && (parent.$$childHead = this.$$nextSibling), parent.$$childTail == this && (parent.$$childTail = this.$$prevSibling), 
                            this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
                            this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop, 
                            this.$on = this.$watch = this.$watchGroup = function() {
                                return noop;
                            }, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
                        }
                    }
                },
                $eval: function(expr, locals) {
                    return $parse(expr)(this, locals);
                },
                $evalAsync: function(expr, locals) {
                    $rootScope.$$phase || asyncQueue.length || $browser.defer(function() {
                        asyncQueue.length && $rootScope.$digest();
                    }), asyncQueue.push({
                        scope: this,
                        expression: expr,
                        locals: locals
                    });
                },
                $$postDigest: function(fn) {
                    postDigestQueue.push(fn);
                },
                $apply: function(expr) {
                    try {
                        return beginPhase("$apply"), this.$eval(expr);
                    } catch (e) {
                        $exceptionHandler(e);
                    } finally {
                        clearPhase();
                        try {
                            $rootScope.$digest();
                        } catch (e) {
                            throw $exceptionHandler(e), e;
                        }
                    }
                },
                $applyAsync: function(expr) {
                    function $applyAsyncExpression() {
                        scope.$eval(expr);
                    }
                    var scope = this;
                    expr && applyAsyncQueue.push($applyAsyncExpression), scheduleApplyAsync();
                },
                $on: function(name, listener) {
                    var namedListeners = this.$$listeners[name];
                    namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener);
                    var current = this;
                    do current.$$listenerCount[name] || (current.$$listenerCount[name] = 0), current.$$listenerCount[name]++; while (current = current.$parent);
                    var self = this;
                    return function() {
                        var indexOfListener = namedListeners.indexOf(listener);
                        -1 !== indexOfListener && (namedListeners[indexOfListener] = null, decrementListenerCount(self, 1, name));
                    };
                },
                $emit: function(name) {
                    var namedListeners, i, length, empty = [], scope = this, stopPropagation = !1, event = {
                        name: name,
                        targetScope: scope,
                        stopPropagation: function() {
                            stopPropagation = !0;
                        },
                        preventDefault: function() {
                            event.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, listenerArgs = concat([ event ], arguments, 1);
                    do {
                        for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, 
                        i = 0, length = namedListeners.length; length > i; i++) if (namedListeners[i]) try {
                            namedListeners[i].apply(null, listenerArgs);
                        } catch (e) {
                            $exceptionHandler(e);
                        } else namedListeners.splice(i, 1), i--, length--;
                        if (stopPropagation) return event.currentScope = null, event;
                        scope = scope.$parent;
                    } while (scope);
                    return event.currentScope = null, event;
                },
                $broadcast: function(name) {
                    var target = this, current = target, next = target, event = {
                        name: name,
                        targetScope: target,
                        preventDefault: function() {
                            event.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    };
                    if (!target.$$listenerCount[name]) return event;
                    for (var listeners, i, length, listenerArgs = concat([ event ], arguments, 1); current = next; ) {
                        for (event.currentScope = current, listeners = current.$$listeners[name] || [], 
                        i = 0, length = listeners.length; length > i; i++) if (listeners[i]) try {
                            listeners[i].apply(null, listenerArgs);
                        } catch (e) {
                            $exceptionHandler(e);
                        } else listeners.splice(i, 1), i--, length--;
                        if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling)) for (;current !== target && !(next = current.$$nextSibling); ) current = current.$parent;
                    }
                    return event.currentScope = null, event;
                }
            };
            var $rootScope = new Scope(), asyncQueue = $rootScope.$$asyncQueue = [], postDigestQueue = $rootScope.$$postDigestQueue = [], applyAsyncQueue = $rootScope.$$applyAsyncQueue = [];
            return $rootScope;
        } ];
    }
    function $$SanitizeUriProvider() {
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/, imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? (aHrefSanitizationWhitelist = regexp, this) : aHrefSanitizationWhitelist;
        }, this.imgSrcSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? (imgSrcSanitizationWhitelist = regexp, this) : imgSrcSanitizationWhitelist;
        }, this.$get = function() {
            return function(uri, isImage) {
                var normalizedVal, regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                return normalizedVal = urlResolve(uri).href, "" === normalizedVal || normalizedVal.match(regex) ? uri : "unsafe:" + normalizedVal;
            };
        };
    }
    function adjustMatcher(matcher) {
        if ("self" === matcher) return matcher;
        if (isString(matcher)) {
            if (matcher.indexOf("***") > -1) throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
            return matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), 
            new RegExp("^" + matcher + "$");
        }
        if (isRegExp(matcher)) return new RegExp("^" + matcher.source + "$");
        throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
    }
    function adjustMatchers(matchers) {
        var adjustedMatchers = [];
        return isDefined(matchers) && forEach(matchers, function(matcher) {
            adjustedMatchers.push(adjustMatcher(matcher));
        }), adjustedMatchers;
    }
    function $SceDelegateProvider() {
        this.SCE_CONTEXTS = SCE_CONTEXTS;
        var resourceUrlWhitelist = [ "self" ], resourceUrlBlacklist = [];
        this.resourceUrlWhitelist = function(value) {
            return arguments.length && (resourceUrlWhitelist = adjustMatchers(value)), resourceUrlWhitelist;
        }, this.resourceUrlBlacklist = function(value) {
            return arguments.length && (resourceUrlBlacklist = adjustMatchers(value)), resourceUrlBlacklist;
        }, this.$get = [ "$injector", function($injector) {
            function matchUrl(matcher, parsedUrl) {
                return "self" === matcher ? urlIsSameOrigin(parsedUrl) : !!matcher.exec(parsedUrl.href);
            }
            function isResourceUrlAllowedByPolicy(url) {
                var i, n, parsedUrl = urlResolve(url.toString()), allowed = !1;
                for (i = 0, n = resourceUrlWhitelist.length; n > i; i++) if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                    allowed = !0;
                    break;
                }
                if (allowed) for (i = 0, n = resourceUrlBlacklist.length; n > i; i++) if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                    allowed = !1;
                    break;
                }
                return allowed;
            }
            function generateHolderType(Base) {
                var holderType = function(trustedValue) {
                    this.$$unwrapTrustedValue = function() {
                        return trustedValue;
                    };
                };
                return Base && (holderType.prototype = new Base()), holderType.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                }, holderType.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                }, holderType;
            }
            function trustAs(type, trustedValue) {
                var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (!Constructor) throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                if (null === trustedValue || trustedValue === undefined || "" === trustedValue) return trustedValue;
                if ("string" != typeof trustedValue) throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                return new Constructor(trustedValue);
            }
            function valueOf(maybeTrusted) {
                return maybeTrusted instanceof trustedValueHolderBase ? maybeTrusted.$$unwrapTrustedValue() : maybeTrusted;
            }
            function getTrusted(type, maybeTrusted) {
                if (null === maybeTrusted || maybeTrusted === undefined || "" === maybeTrusted) return maybeTrusted;
                var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (constructor && maybeTrusted instanceof constructor) return maybeTrusted.$$unwrapTrustedValue();
                if (type === SCE_CONTEXTS.RESOURCE_URL) {
                    if (isResourceUrlAllowedByPolicy(maybeTrusted)) return maybeTrusted;
                    throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString());
                }
                if (type === SCE_CONTEXTS.HTML) return htmlSanitizer(maybeTrusted);
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            }
            var htmlSanitizer = function() {
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            };
            $injector.has("$sanitize") && (htmlSanitizer = $injector.get("$sanitize"));
            var trustedValueHolderBase = generateHolderType(), byType = {};
            return byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase), 
            byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase), 
            byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]), 
            {
                trustAs: trustAs,
                getTrusted: getTrusted,
                valueOf: valueOf
            };
        } ];
    }
    function $SceProvider() {
        var enabled = !0;
        this.enabled = function(value) {
            return arguments.length && (enabled = !!value), enabled;
        }, this.$get = [ "$parse", "$sceDelegate", function($parse, $sceDelegate) {
            if (enabled && 8 > msie) throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var sce = shallowCopy(SCE_CONTEXTS);
            sce.isEnabled = function() {
                return enabled;
            }, sce.trustAs = $sceDelegate.trustAs, sce.getTrusted = $sceDelegate.getTrusted, 
            sce.valueOf = $sceDelegate.valueOf, enabled || (sce.trustAs = sce.getTrusted = function(type, value) {
                return value;
            }, sce.valueOf = identity), sce.parseAs = function(type, expr) {
                var parsed = $parse(expr);
                return parsed.literal && parsed.constant ? parsed : $parse(expr, function(value) {
                    return sce.getTrusted(type, value);
                });
            };
            var parse = sce.parseAs, getTrusted = sce.getTrusted, trustAs = sce.trustAs;
            return forEach(SCE_CONTEXTS, function(enumValue, name) {
                var lName = lowercase(name);
                sce[camelCase("parse_as_" + lName)] = function(expr) {
                    return parse(enumValue, expr);
                }, sce[camelCase("get_trusted_" + lName)] = function(value) {
                    return getTrusted(enumValue, value);
                }, sce[camelCase("trust_as_" + lName)] = function(value) {
                    return trustAs(enumValue, value);
                };
            }), sce;
        } ];
    }
    function $SnifferProvider() {
        this.$get = [ "$window", "$document", function($window, $document) {
            var vendorPrefix, match, eventSupport = {}, android = int((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), boxee = /Boxee/i.test(($window.navigator || {}).userAgent), document = $document[0] || {}, vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = !1, animations = !1;
            if (bodyStyle) {
                for (var prop in bodyStyle) if (match = vendorRegex.exec(prop)) {
                    vendorPrefix = match[0], vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                    break;
                }
                vendorPrefix || (vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit"), transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle), 
                animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle), 
                !android || transitions && animations || (transitions = isString(document.body.style.webkitTransition), 
                animations = isString(document.body.style.webkitAnimation));
            }
            return {
                history: !(!$window.history || !$window.history.pushState || 4 > android || boxee),
                hasEvent: function(event) {
                    if ("input" === event && 11 >= msie) return !1;
                    if (isUndefined(eventSupport[event])) {
                        var divElm = document.createElement("div");
                        eventSupport[event] = "on" + event in divElm;
                    }
                    return eventSupport[event];
                },
                csp: csp(),
                vendorPrefix: vendorPrefix,
                transitions: transitions,
                animations: animations,
                android: android
            };
        } ];
    }
    function $TemplateRequestProvider() {
        this.$get = [ "$templateCache", "$http", "$q", function($templateCache, $http, $q) {
            function handleRequestFn(tpl, ignoreRequestError) {
                function handleError(resp) {
                    if (!ignoreRequestError) throw $compileMinErr("tpload", "Failed to load template: {0}", tpl);
                    return $q.reject(resp);
                }
                handleRequestFn.totalPendingRequests++;
                var transformResponse = $http.defaults && $http.defaults.transformResponse;
                isArray(transformResponse) ? transformResponse = transformResponse.filter(function(transformer) {
                    return transformer !== defaultHttpResponseTransform;
                }) : transformResponse === defaultHttpResponseTransform && (transformResponse = null);
                var httpOptions = {
                    cache: $templateCache,
                    transformResponse: transformResponse
                };
                return $http.get(tpl, httpOptions)["finally"](function() {
                    handleRequestFn.totalPendingRequests--;
                }).then(function(response) {
                    return response.data;
                }, handleError);
            }
            return handleRequestFn.totalPendingRequests = 0, handleRequestFn;
        } ];
    }
    function $$TestabilityProvider() {
        this.$get = [ "$rootScope", "$browser", "$location", function($rootScope, $browser, $location) {
            var testability = {};
            return testability.findBindings = function(element, expression, opt_exactMatch) {
                var bindings = element.getElementsByClassName("ng-binding"), matches = [];
                return forEach(bindings, function(binding) {
                    var dataBinding = angular.element(binding).data("$binding");
                    dataBinding && forEach(dataBinding, function(bindingName) {
                        if (opt_exactMatch) {
                            var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                            matcher.test(bindingName) && matches.push(binding);
                        } else -1 != bindingName.indexOf(expression) && matches.push(binding);
                    });
                }), matches;
            }, testability.findModels = function(element, expression, opt_exactMatch) {
                for (var prefixes = [ "ng-", "data-ng-", "ng\\:" ], p = 0; p < prefixes.length; ++p) {
                    var attributeEquals = opt_exactMatch ? "=" : "*=", selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]', elements = element.querySelectorAll(selector);
                    if (elements.length) return elements;
                }
            }, testability.getLocation = function() {
                return $location.url();
            }, testability.setLocation = function(url) {
                url !== $location.url() && ($location.url(url), $rootScope.$digest());
            }, testability.whenStable = function(callback) {
                $browser.notifyWhenNoOutstandingRequests(callback);
            }, testability;
        } ];
    }
    function $TimeoutProvider() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function($rootScope, $browser, $q, $$q, $exceptionHandler) {
            function timeout(fn, delay, invokeApply) {
                var timeoutId, skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return timeoutId = $browser.defer(function() {
                    try {
                        deferred.resolve(fn());
                    } catch (e) {
                        deferred.reject(e), $exceptionHandler(e);
                    } finally {
                        delete deferreds[promise.$$timeoutId];
                    }
                    skipApply || $rootScope.$apply();
                }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise;
            }
            var deferreds = {};
            return timeout.cancel = function(promise) {
                return promise && promise.$$timeoutId in deferreds ? (deferreds[promise.$$timeoutId].reject("canceled"), 
                delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId)) : !1;
            }, timeout;
        } ];
    }
    function urlResolve(url) {
        var href = url;
        return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), 
        urlParsingNode.setAttribute("href", href), {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    function urlIsSameOrigin(requestUrl) {
        var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
        return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host;
    }
    function $WindowProvider() {
        this.$get = valueFn(window);
    }
    function $FilterProvider($provide) {
        function register(name, factory) {
            if (isObject(name)) {
                var filters = {};
                return forEach(name, function(filter, key) {
                    filters[key] = register(key, filter);
                }), filters;
            }
            return $provide.factory(name + suffix, factory);
        }
        var suffix = "Filter";
        this.register = register, this.$get = [ "$injector", function($injector) {
            return function(name) {
                return $injector.get(name + suffix);
            };
        } ], register("currency", currencyFilter), register("date", dateFilter), register("filter", filterFilter), 
        register("json", jsonFilter), register("limitTo", limitToFilter), register("lowercase", lowercaseFilter), 
        register("number", numberFilter), register("orderBy", orderByFilter), register("uppercase", uppercaseFilter);
    }
    function filterFilter() {
        return function(array, expression, comparator) {
            if (!isArray(array)) return array;
            var predicateFn, matchAgainstAnyProp;
            switch (typeof expression) {
              case "function":
                predicateFn = expression;
                break;

              case "boolean":
              case "number":
              case "string":
                matchAgainstAnyProp = !0;

              case "object":
                predicateFn = createPredicateFn(expression, comparator, matchAgainstAnyProp);
                break;

              default:
                return array;
            }
            return array.filter(predicateFn);
        };
    }
    function createPredicateFn(expression, comparator, matchAgainstAnyProp) {
        var predicateFn, shouldMatchPrimitives = isObject(expression) && "$" in expression;
        return comparator === !0 ? comparator = equals : isFunction(comparator) || (comparator = function(actual, expected) {
            return isObject(actual) || isObject(expected) ? !1 : (actual = lowercase("" + actual), 
            expected = lowercase("" + expected), -1 !== actual.indexOf(expected));
        }), predicateFn = function(item) {
            return shouldMatchPrimitives && !isObject(item) ? deepCompare(item, expression.$, comparator, !1) : deepCompare(item, expression, comparator, matchAgainstAnyProp);
        };
    }
    function deepCompare(actual, expected, comparator, matchAgainstAnyProp, dontMatchWholeObject) {
        var actualType = typeof actual, expectedType = typeof expected;
        if ("string" === expectedType && "!" === expected.charAt(0)) return !deepCompare(actual, expected.substring(1), comparator, matchAgainstAnyProp);
        if (isArray(actual)) return actual.some(function(item) {
            return deepCompare(item, expected, comparator, matchAgainstAnyProp);
        });
        switch (actualType) {
          case "object":
            var key;
            if (matchAgainstAnyProp) {
                for (key in actual) if ("$" !== key.charAt(0) && deepCompare(actual[key], expected, comparator, !0)) return !0;
                return dontMatchWholeObject ? !1 : deepCompare(actual, expected, comparator, !1);
            }
            if ("object" === expectedType) {
                for (key in expected) {
                    var expectedVal = expected[key];
                    if (!isFunction(expectedVal)) {
                        var matchAnyProperty = "$" === key, actualVal = matchAnyProperty ? actual : actual[key];
                        if (!deepCompare(actualVal, expectedVal, comparator, matchAnyProperty, matchAnyProperty)) return !1;
                    }
                }
                return !0;
            }
            return comparator(actual, expected);

          case "function":
            return !1;

          default:
            return comparator(actual, expected);
        }
    }
    function currencyFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(amount, currencySymbol, fractionSize) {
            return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), isUndefined(fractionSize) && (fractionSize = formats.PATTERNS[1].maxFrac), 
            null == amount ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol);
        };
    }
    function numberFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(number, fractionSize) {
            return null == number ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
        };
    }
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (!isFinite(number) || isObject(number)) return "";
        var isNegative = 0 > number;
        number = Math.abs(number);
        var numStr = number + "", formatedText = "", parts = [], hasExponent = !1;
        if (-1 !== numStr.indexOf("e")) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            match && "-" == match[2] && match[3] > fractionSize + 1 ? number = 0 : (formatedText = numStr, 
            hasExponent = !0);
        }
        if (hasExponent) fractionSize > 0 && 1 > number && (formatedText = number.toFixed(fractionSize), 
        number = parseFloat(formatedText)); else {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || "").length;
            isUndefined(fractionSize) && (fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac)), 
            number = +(Math.round(+(number.toString() + "e" + fractionSize)).toString() + "e" + -fractionSize);
            var fraction = ("" + number).split(DECIMAL_SEP), whole = fraction[0];
            fraction = fraction[1] || "";
            var i, pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
            if (whole.length >= lgroup + group) for (pos = whole.length - lgroup, i = 0; pos > i; i++) (pos - i) % group === 0 && 0 !== i && (formatedText += groupSep), 
            formatedText += whole.charAt(i);
            for (i = pos; i < whole.length; i++) (whole.length - i) % lgroup === 0 && 0 !== i && (formatedText += groupSep), 
            formatedText += whole.charAt(i);
            for (;fraction.length < fractionSize; ) fraction += "0";
            fractionSize && "0" !== fractionSize && (formatedText += decimalSep + fraction.substr(0, fractionSize));
        }
        return 0 === number && (isNegative = !1), parts.push(isNegative ? pattern.negPre : pattern.posPre, formatedText, isNegative ? pattern.negSuf : pattern.posSuf), 
        parts.join("");
    }
    function padNumber(num, digits, trim) {
        var neg = "";
        for (0 > num && (neg = "-", num = -num), num = "" + num; num.length < digits; ) num = "0" + num;
        return trim && (num = num.substr(num.length - digits)), neg + num;
    }
    function dateGetter(name, size, offset, trim) {
        return offset = offset || 0, function(date) {
            var value = date["get" + name]();
            return (offset > 0 || value > -offset) && (value += offset), 0 === value && -12 == offset && (value = 12), 
            padNumber(value, size, trim);
        };
    }
    function dateStrGetter(name, shortForm) {
        return function(date, formats) {
            var value = date["get" + name](), get = uppercase(shortForm ? "SHORT" + name : name);
            return formats[get][value];
        };
    }
    function timeZoneGetter(date) {
        var zone = -1 * date.getTimezoneOffset(), paddedZone = zone >= 0 ? "+" : "";
        return paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
    }
    function getFirstThursdayOfYear(year) {
        var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
        return new Date(year, 0, (4 >= dayOfWeekOnFirst ? 5 : 12) - dayOfWeekOnFirst);
    }
    function getThursdayThisWeek(datetime) {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()));
    }
    function weekGetter(size) {
        return function(date) {
            var firstThurs = getFirstThursdayOfYear(date.getFullYear()), thisThurs = getThursdayThisWeek(date), diff = +thisThurs - +firstThurs, result = 1 + Math.round(diff / 6048e5);
            return padNumber(result, size);
        };
    }
    function ampmGetter(date, formats) {
        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    function dateFilter($locale) {
        function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
                var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
                match[9] && (tzHour = int(match[9] + match[10]), tzMin = int(match[9] + match[11])), 
                dateSetter.call(date, int(match[1]), int(match[2]) - 1, int(match[3]));
                var h = int(match[4] || 0) - tzHour, m = int(match[5] || 0) - tzMin, s = int(match[6] || 0), ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
                return timeSetter.call(date, h, m, s, ms), date;
            }
            return string;
        }
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(date, format, timezone) {
            var fn, match, text = "", parts = [];
            if (format = format || "mediumDate", format = $locale.DATETIME_FORMATS[format] || format, 
            isString(date) && (date = NUMBER_STRING.test(date) ? int(date) : jsonStringToDate(date)), 
            isNumber(date) && (date = new Date(date)), !isDate(date)) return date;
            for (;format; ) match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), 
            format = parts.pop()) : (parts.push(format), format = null);
            return timezone && "UTC" === timezone && (date = new Date(date.getTime()), date.setMinutes(date.getMinutes() + date.getTimezoneOffset())), 
            forEach(parts, function(value) {
                fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            }), text;
        };
    }
    function jsonFilter() {
        return function(object, spacing) {
            return isUndefined(spacing) && (spacing = 2), toJson(object, spacing);
        };
    }
    function limitToFilter() {
        return function(input, limit) {
            return isNumber(input) && (input = input.toString()), isArray(input) || isString(input) ? (limit = 1/0 === Math.abs(Number(limit)) ? Number(limit) : int(limit), 
            limit ? limit > 0 ? input.slice(0, limit) : input.slice(limit) : isString(input) ? "" : []) : input;
        };
    }
    function orderByFilter($parse) {
        return function(array, sortPredicate, reverseOrder) {
            function comparator(o1, o2) {
                for (var i = 0; i < sortPredicate.length; i++) {
                    var comp = sortPredicate[i](o1, o2);
                    if (0 !== comp) return comp;
                }
                return 0;
            }
            function reverseComparator(comp, descending) {
                return descending ? function(a, b) {
                    return comp(b, a);
                } : comp;
            }
            function isPrimitive(value) {
                switch (typeof value) {
                  case "number":
                  case "boolean":
                  case "string":
                    return !0;

                  default:
                    return !1;
                }
            }
            function objectToString(value) {
                return null === value ? "null" : "function" == typeof value.valueOf && (value = value.valueOf(), 
                isPrimitive(value)) ? value : "function" == typeof value.toString && (value = value.toString(), 
                isPrimitive(value)) ? value : "";
            }
            function compare(v1, v2) {
                var t1 = typeof v1, t2 = typeof v2;
                return t1 === t2 && "object" === t1 && (v1 = objectToString(v1), v2 = objectToString(v2)), 
                t1 === t2 ? ("string" === t1 && (v1 = v1.toLowerCase(), v2 = v2.toLowerCase()), 
                v1 === v2 ? 0 : v2 > v1 ? -1 : 1) : t2 > t1 ? -1 : 1;
            }
            return isArrayLike(array) ? (sortPredicate = isArray(sortPredicate) ? sortPredicate : [ sortPredicate ], 
            0 === sortPredicate.length && (sortPredicate = [ "+" ]), sortPredicate = sortPredicate.map(function(predicate) {
                var descending = !1, get = predicate || identity;
                if (isString(predicate)) {
                    if (("+" == predicate.charAt(0) || "-" == predicate.charAt(0)) && (descending = "-" == predicate.charAt(0), 
                    predicate = predicate.substring(1)), "" === predicate) return reverseComparator(compare, descending);
                    if (get = $parse(predicate), get.constant) {
                        var key = get();
                        return reverseComparator(function(a, b) {
                            return compare(a[key], b[key]);
                        }, descending);
                    }
                }
                return reverseComparator(function(a, b) {
                    return compare(get(a), get(b));
                }, descending);
            }), slice.call(array).sort(reverseComparator(comparator, reverseOrder))) : array;
        };
    }
    function ngDirective(directive) {
        return isFunction(directive) && (directive = {
            link: directive
        }), directive.restrict = directive.restrict || "AC", valueFn(directive);
    }
    function nullFormRenameControl(control, name) {
        control.$name = name;
    }
    function FormController(element, attrs, $scope, $animate, $interpolate) {
        var form = this, controls = [], parentForm = form.$$parentForm = element.parent().controller("form") || nullFormCtrl;
        form.$error = {}, form.$$success = {}, form.$pending = undefined, form.$name = $interpolate(attrs.name || attrs.ngForm || "")($scope), 
        form.$dirty = !1, form.$pristine = !0, form.$valid = !0, form.$invalid = !1, form.$submitted = !1, 
        parentForm.$addControl(form), form.$rollbackViewValue = function() {
            forEach(controls, function(control) {
                control.$rollbackViewValue();
            });
        }, form.$commitViewValue = function() {
            forEach(controls, function(control) {
                control.$commitViewValue();
            });
        }, form.$addControl = function(control) {
            assertNotHasOwnProperty(control.$name, "input"), controls.push(control), control.$name && (form[control.$name] = control);
        }, form.$$renameControl = function(control, newName) {
            var oldName = control.$name;
            form[oldName] === control && delete form[oldName], form[newName] = control, control.$name = newName;
        }, form.$removeControl = function(control) {
            control.$name && form[control.$name] === control && delete form[control.$name], 
            forEach(form.$pending, function(value, name) {
                form.$setValidity(name, null, control);
            }), forEach(form.$error, function(value, name) {
                form.$setValidity(name, null, control);
            }), forEach(form.$$success, function(value, name) {
                form.$setValidity(name, null, control);
            }), arrayRemove(controls, control);
        }, addSetValidityMethod({
            ctrl: this,
            $element: element,
            set: function(object, property, controller) {
                var list = object[property];
                if (list) {
                    var index = list.indexOf(controller);
                    -1 === index && list.push(controller);
                } else object[property] = [ controller ];
            },
            unset: function(object, property, controller) {
                var list = object[property];
                list && (arrayRemove(list, controller), 0 === list.length && delete object[property]);
            },
            parentForm: parentForm,
            $animate: $animate
        }), form.$setDirty = function() {
            $animate.removeClass(element, PRISTINE_CLASS), $animate.addClass(element, DIRTY_CLASS), 
            form.$dirty = !0, form.$pristine = !1, parentForm.$setDirty();
        }, form.$setPristine = function() {
            $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS), 
            form.$dirty = !1, form.$pristine = !0, form.$submitted = !1, forEach(controls, function(control) {
                control.$setPristine();
            });
        }, form.$setUntouched = function() {
            forEach(controls, function(control) {
                control.$setUntouched();
            });
        }, form.$setSubmitted = function() {
            $animate.addClass(element, SUBMITTED_CLASS), form.$submitted = !0, parentForm.$setSubmitted();
        };
    }
    function stringBasedInputType(ctrl) {
        ctrl.$formatters.push(function(value) {
            return ctrl.$isEmpty(value) ? value : value.toString();
        });
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl);
    }
    function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        var type = lowercase(element[0].type);
        if (!$sniffer.android) {
            var composing = !1;
            element.on("compositionstart", function() {
                composing = !0;
            }), element.on("compositionend", function() {
                composing = !1, listener();
            });
        }
        var listener = function(ev) {
            if (timeout && ($browser.defer.cancel(timeout), timeout = null), !composing) {
                var value = element.val(), event = ev && ev.type;
                "password" === type || attr.ngTrim && "false" === attr.ngTrim || (value = trim(value)), 
                (ctrl.$viewValue !== value || "" === value && ctrl.$$hasNativeValidators) && ctrl.$setViewValue(value, event);
            }
        };
        if ($sniffer.hasEvent("input")) element.on("input", listener); else {
            var timeout, deferListener = function(ev, input, origValue) {
                timeout || (timeout = $browser.defer(function() {
                    timeout = null, input && input.value === origValue || listener(ev);
                }));
            };
            element.on("keydown", function(event) {
                var key = event.keyCode;
                91 === key || key > 15 && 19 > key || key >= 37 && 40 >= key || deferListener(event, this, this.value);
            }), $sniffer.hasEvent("paste") && element.on("paste cut", deferListener);
        }
        element.on("change", listener), ctrl.$render = function() {
            element.val(ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
        };
    }
    function weekParser(isoWeek, existingDate) {
        if (isDate(isoWeek)) return isoWeek;
        if (isString(isoWeek)) {
            WEEK_REGEXP.lastIndex = 0;
            var parts = WEEK_REGEXP.exec(isoWeek);
            if (parts) {
                var year = +parts[1], week = +parts[2], hours = 0, minutes = 0, seconds = 0, milliseconds = 0, firstThurs = getFirstThursdayOfYear(year), addDays = 7 * (week - 1);
                return existingDate && (hours = existingDate.getHours(), minutes = existingDate.getMinutes(), 
                seconds = existingDate.getSeconds(), milliseconds = existingDate.getMilliseconds()), 
                new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds);
            }
        }
        return 0/0;
    }
    function createDateParser(regexp, mapping) {
        return function(iso, date) {
            var parts, map;
            if (isDate(iso)) return iso;
            if (isString(iso)) {
                if ('"' == iso.charAt(0) && '"' == iso.charAt(iso.length - 1) && (iso = iso.substring(1, iso.length - 1)), 
                ISO_DATE_REGEXP.test(iso)) return new Date(iso);
                if (regexp.lastIndex = 0, parts = regexp.exec(iso)) return parts.shift(), map = date ? {
                    yyyy: date.getFullYear(),
                    MM: date.getMonth() + 1,
                    dd: date.getDate(),
                    HH: date.getHours(),
                    mm: date.getMinutes(),
                    ss: date.getSeconds(),
                    sss: date.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, forEach(parts, function(part, index) {
                    index < mapping.length && (map[mapping[index]] = +part);
                }), new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, 1e3 * map.sss || 0);
            }
            return 0/0;
        };
    }
    function createDateInputType(type, regexp, parseDate, format) {
        return function(scope, element, attr, ctrl, $sniffer, $browser, $filter) {
            function isValidDate(value) {
                return value && !(value.getTime && value.getTime() !== value.getTime());
            }
            function parseObservedDateValue(val) {
                return isDefined(val) ? isDate(val) ? val : parseDate(val) : undefined;
            }
            badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
            var previousDate, timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
            if (ctrl.$$parserName = type, ctrl.$parsers.push(function(value) {
                if (ctrl.$isEmpty(value)) return null;
                if (regexp.test(value)) {
                    var parsedDate = parseDate(value, previousDate);
                    return "UTC" === timezone && parsedDate.setMinutes(parsedDate.getMinutes() - parsedDate.getTimezoneOffset()), 
                    parsedDate;
                }
                return undefined;
            }), ctrl.$formatters.push(function(value) {
                if (value && !isDate(value)) throw $ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                if (isValidDate(value)) {
                    if (previousDate = value, previousDate && "UTC" === timezone) {
                        var timezoneOffset = 6e4 * previousDate.getTimezoneOffset();
                        previousDate = new Date(previousDate.getTime() + timezoneOffset);
                    }
                    return $filter("date")(value, format, timezone);
                }
                return previousDate = null, "";
            }), isDefined(attr.min) || attr.ngMin) {
                var minVal;
                ctrl.$validators.min = function(value) {
                    return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal;
                }, attr.$observe("min", function(val) {
                    minVal = parseObservedDateValue(val), ctrl.$validate();
                });
            }
            if (isDefined(attr.max) || attr.ngMax) {
                var maxVal;
                ctrl.$validators.max = function(value) {
                    return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal;
                }, attr.$observe("max", function(val) {
                    maxVal = parseObservedDateValue(val), ctrl.$validate();
                });
            }
        };
    }
    function badInputChecker(scope, element, attr, ctrl) {
        var node = element[0], nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
        nativeValidation && ctrl.$parsers.push(function(value) {
            var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
            return validity.badInput && !validity.typeMismatch ? undefined : value;
        });
    }
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        if (badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser), 
        ctrl.$$parserName = "number", ctrl.$parsers.push(function(value) {
            return ctrl.$isEmpty(value) ? null : NUMBER_REGEXP.test(value) ? parseFloat(value) : undefined;
        }), ctrl.$formatters.push(function(value) {
            if (!ctrl.$isEmpty(value)) {
                if (!isNumber(value)) throw $ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                value = value.toString();
            }
            return value;
        }), attr.min || attr.ngMin) {
            var minVal;
            ctrl.$validators.min = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal;
            }, attr.$observe("min", function(val) {
                isDefined(val) && !isNumber(val) && (val = parseFloat(val, 10)), minVal = isNumber(val) && !isNaN(val) ? val : undefined, 
                ctrl.$validate();
            });
        }
        if (attr.max || attr.ngMax) {
            var maxVal;
            ctrl.$validators.max = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(maxVal) || maxVal >= value;
            }, attr.$observe("max", function(val) {
                isDefined(val) && !isNumber(val) && (val = parseFloat(val, 10)), maxVal = isNumber(val) && !isNaN(val) ? val : undefined, 
                ctrl.$validate();
            });
        }
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), 
        ctrl.$$parserName = "url", ctrl.$validators.url = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || URL_REGEXP.test(value);
        };
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), 
        ctrl.$$parserName = "email", ctrl.$validators.email = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value);
        };
    }
    function radioInputType(scope, element, attr, ctrl) {
        isUndefined(attr.name) && element.attr("name", nextUid());
        var listener = function(ev) {
            element[0].checked && ctrl.$setViewValue(attr.value, ev && ev.type);
        };
        element.on("click", listener), ctrl.$render = function() {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue;
        }, attr.$observe("value", ctrl.$render);
    }
    function parseConstantExpr($parse, context, name, expression, fallback) {
        var parseFn;
        if (isDefined(expression)) {
            if (parseFn = $parse(expression), !parseFn.constant) throw minErr("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", name, expression);
            return parseFn(context);
        }
        return fallback;
    }
    function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
        var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, !0), falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, !1), listener = function(ev) {
            ctrl.$setViewValue(element[0].checked, ev && ev.type);
        };
        element.on("click", listener), ctrl.$render = function() {
            element[0].checked = ctrl.$viewValue;
        }, ctrl.$isEmpty = function(value) {
            return value === !1;
        }, ctrl.$formatters.push(function(value) {
            return equals(value, trueValue);
        }), ctrl.$parsers.push(function(value) {
            return value ? trueValue : falseValue;
        });
    }
    function classDirective(name, selector) {
        return name = "ngClass" + name, [ "$animate", function($animate) {
            function arrayDifference(tokens1, tokens2) {
                var values = [];
                outer: for (var i = 0; i < tokens1.length; i++) {
                    for (var token = tokens1[i], j = 0; j < tokens2.length; j++) if (token == tokens2[j]) continue outer;
                    values.push(token);
                }
                return values;
            }
            function arrayClasses(classVal) {
                if (isArray(classVal)) return classVal;
                if (isString(classVal)) return classVal.split(" ");
                if (isObject(classVal)) {
                    var classes = [];
                    return forEach(classVal, function(v, k) {
                        v && (classes = classes.concat(k.split(" ")));
                    }), classes;
                }
                return classVal;
            }
            return {
                restrict: "AC",
                link: function(scope, element, attr) {
                    function addClasses(classes) {
                        var newClasses = digestClassCounts(classes, 1);
                        attr.$addClass(newClasses);
                    }
                    function removeClasses(classes) {
                        var newClasses = digestClassCounts(classes, -1);
                        attr.$removeClass(newClasses);
                    }
                    function digestClassCounts(classes, count) {
                        var classCounts = element.data("$classCounts") || {}, classesToUpdate = [];
                        return forEach(classes, function(className) {
                            (count > 0 || classCounts[className]) && (classCounts[className] = (classCounts[className] || 0) + count, 
                            classCounts[className] === +(count > 0) && classesToUpdate.push(className));
                        }), element.data("$classCounts", classCounts), classesToUpdate.join(" ");
                    }
                    function updateClasses(oldClasses, newClasses) {
                        var toAdd = arrayDifference(newClasses, oldClasses), toRemove = arrayDifference(oldClasses, newClasses);
                        toAdd = digestClassCounts(toAdd, 1), toRemove = digestClassCounts(toRemove, -1), 
                        toAdd && toAdd.length && $animate.addClass(element, toAdd), toRemove && toRemove.length && $animate.removeClass(element, toRemove);
                    }
                    function ngClassWatchAction(newVal) {
                        if (selector === !0 || scope.$index % 2 === selector) {
                            var newClasses = arrayClasses(newVal || []);
                            if (oldVal) {
                                if (!equals(newVal, oldVal)) {
                                    var oldClasses = arrayClasses(oldVal);
                                    updateClasses(oldClasses, newClasses);
                                }
                            } else addClasses(newClasses);
                        }
                        oldVal = shallowCopy(newVal);
                    }
                    var oldVal;
                    scope.$watch(attr[name], ngClassWatchAction, !0), attr.$observe("class", function() {
                        ngClassWatchAction(scope.$eval(attr[name]));
                    }), "ngClass" !== name && scope.$watch("$index", function($index, old$index) {
                        var mod = 1 & $index;
                        if (mod !== (1 & old$index)) {
                            var classes = arrayClasses(scope.$eval(attr[name]));
                            mod === selector ? addClasses(classes) : removeClasses(classes);
                        }
                    });
                }
            };
        } ];
    }
    function addSetValidityMethod(context) {
        function setValidity(validationErrorKey, state, controller) {
            state === undefined ? createAndSet("$pending", validationErrorKey, controller) : unsetAndCleanup("$pending", validationErrorKey, controller), 
            isBoolean(state) ? state ? (unset(ctrl.$error, validationErrorKey, controller), 
            set(ctrl.$$success, validationErrorKey, controller)) : (set(ctrl.$error, validationErrorKey, controller), 
            unset(ctrl.$$success, validationErrorKey, controller)) : (unset(ctrl.$error, validationErrorKey, controller), 
            unset(ctrl.$$success, validationErrorKey, controller)), ctrl.$pending ? (cachedToggleClass(PENDING_CLASS, !0), 
            ctrl.$valid = ctrl.$invalid = undefined, toggleValidationCss("", null)) : (cachedToggleClass(PENDING_CLASS, !1), 
            ctrl.$valid = isObjectEmpty(ctrl.$error), ctrl.$invalid = !ctrl.$valid, toggleValidationCss("", ctrl.$valid));
            var combinedState;
            combinedState = ctrl.$pending && ctrl.$pending[validationErrorKey] ? undefined : ctrl.$error[validationErrorKey] ? !1 : ctrl.$$success[validationErrorKey] ? !0 : null, 
            toggleValidationCss(validationErrorKey, combinedState), parentForm.$setValidity(validationErrorKey, combinedState, ctrl);
        }
        function createAndSet(name, value, controller) {
            ctrl[name] || (ctrl[name] = {}), set(ctrl[name], value, controller);
        }
        function unsetAndCleanup(name, value, controller) {
            ctrl[name] && unset(ctrl[name], value, controller), isObjectEmpty(ctrl[name]) && (ctrl[name] = undefined);
        }
        function cachedToggleClass(className, switchValue) {
            switchValue && !classCache[className] ? ($animate.addClass($element, className), 
            classCache[className] = !0) : !switchValue && classCache[className] && ($animate.removeClass($element, className), 
            classCache[className] = !1);
        }
        function toggleValidationCss(validationErrorKey, isValid) {
            validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", 
            cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === !0), cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === !1);
        }
        var ctrl = context.ctrl, $element = context.$element, classCache = {}, set = context.set, unset = context.unset, parentForm = context.parentForm, $animate = context.$animate;
        classCache[INVALID_CLASS] = !(classCache[VALID_CLASS] = $element.hasClass(VALID_CLASS)), 
        ctrl.$setValidity = setValidity;
    }
    function isObjectEmpty(obj) {
        if (obj) for (var prop in obj) return !1;
        return !0;
    }
    var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/, VALIDITY_STATE_PROPERTY = "validity", lowercase = function(string) {
        return isString(string) ? string.toLowerCase() : string;
    }, hasOwnProperty = Object.prototype.hasOwnProperty, uppercase = function(string) {
        return isString(string) ? string.toUpperCase() : string;
    }, manualLowercase = function(s) {
        return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
            return String.fromCharCode(32 | ch.charCodeAt(0));
        }) : s;
    }, manualUppercase = function(s) {
        return isString(s) ? s.replace(/[a-z]/g, function(ch) {
            return String.fromCharCode(-33 & ch.charCodeAt(0));
        }) : s;
    };
    "i" !== "I".toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
    var msie, jqLite, jQuery, angularModule, slice = [].slice, splice = [].splice, push = [].push, toString = Object.prototype.toString, ngMinErr = minErr("ng"), angular = window.angular || (window.angular = {}), uid = 0;
    msie = document.documentMode, noop.$inject = [], identity.$inject = [];
    var skipDestroyOnNextJQueryCleanData, isArray = Array.isArray, trim = function(value) {
        return isString(value) ? value.trim() : value;
    }, escapeForRegexp = function(s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }, csp = function() {
        if (isDefined(csp.isActive_)) return csp.isActive_;
        var active = !(!document.querySelector("[ng-csp]") && !document.querySelector("[data-ng-csp]"));
        if (!active) try {
            new Function("");
        } catch (e) {
            active = !0;
        }
        return csp.isActive_ = active;
    }, ngAttrPrefixes = [ "ng-", "data-ng-", "ng:", "x-ng-" ], SNAKE_CASE_REGEXP = /[A-Z]/g, bindJQueryFired = !1, NODE_TYPE_ELEMENT = 1, NODE_TYPE_TEXT = 3, NODE_TYPE_COMMENT = 8, NODE_TYPE_DOCUMENT = 9, NODE_TYPE_DOCUMENT_FRAGMENT = 11, version = {
        full: "1.3.10",
        major: 1,
        minor: 3,
        dot: 10,
        codeName: "heliotropic-sundial"
    };
    JQLite.expando = "ng339";
    var jqCache = JQLite.cache = {}, jqId = 1, addEventListenerFn = function(element, type, fn) {
        element.addEventListener(type, fn, !1);
    }, removeEventListenerFn = function(element, type, fn) {
        element.removeEventListener(type, fn, !1);
    };
    JQLite._data = function(node) {
        return this.cache[node[this.expando]] || {};
    };
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g, MOZ_HACK_REGEXP = /^moz([A-Z])/, MOUSE_EVENT_MAP = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, jqLiteMinErr = minErr("jqLite"), SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, HTML_REGEXP = /<|&#?\w+;/, TAG_NAME_REGEXP = /<([\w:]+)/, XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, wrapMap = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td;
    var JQLitePrototype = JQLite.prototype = {
        ready: function(fn) {
            function trigger() {
                fired || (fired = !0, fn());
            }
            var fired = !1;
            "complete" === document.readyState ? setTimeout(trigger) : (this.on("DOMContentLoaded", trigger), 
            JQLite(window).on("load", trigger));
        },
        toString: function() {
            var value = [];
            return forEach(this, function(e) {
                value.push("" + e);
            }), "[" + value.join(", ") + "]";
        },
        eq: function(index) {
            return jqLite(index >= 0 ? this[index] : this[this.length + index]);
        },
        length: 0,
        push: push,
        sort: [].sort,
        splice: [].splice
    }, BOOLEAN_ATTR = {};
    forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(value) {
        BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach("input,select,option,textarea,button,form,details".split(","), function(value) {
        BOOLEAN_ELEMENTS[value] = !0;
    });
    var ALIASED_ATTR = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    forEach({
        data: jqLiteData,
        removeData: jqLiteRemoveData
    }, function(fn, name) {
        JQLite[name] = fn;
    }), forEach({
        data: jqLiteData,
        inheritedData: jqLiteInheritedData,
        scope: function(element) {
            return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(element) {
            return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate");
        },
        controller: jqLiteController,
        injector: function(element) {
            return jqLiteInheritedData(element, "$injector");
        },
        removeAttr: function(element, name) {
            element.removeAttribute(name);
        },
        hasClass: jqLiteHasClass,
        css: function(element, name, value) {
            return name = camelCase(name), isDefined(value) ? void (element.style[name] = value) : element.style[name];
        },
        attr: function(element, name, value) {
            var lowercasedName = lowercase(name);
            if (BOOLEAN_ATTR[lowercasedName]) {
                if (!isDefined(value)) return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
                value ? (element[name] = !0, element.setAttribute(name, lowercasedName)) : (element[name] = !1, 
                element.removeAttribute(lowercasedName));
            } else if (isDefined(value)) element.setAttribute(name, value); else if (element.getAttribute) {
                var ret = element.getAttribute(name, 2);
                return null === ret ? undefined : ret;
            }
        },
        prop: function(element, name, value) {
            return isDefined(value) ? void (element[name] = value) : element[name];
        },
        text: function() {
            function getText(element, value) {
                if (isUndefined(value)) {
                    var nodeType = element.nodeType;
                    return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : "";
                }
                element.textContent = value;
            }
            return getText.$dv = "", getText;
        }(),
        val: function(element, value) {
            if (isUndefined(value)) {
                if (element.multiple && "select" === nodeName_(element)) {
                    var result = [];
                    return forEach(element.options, function(option) {
                        option.selected && result.push(option.value || option.text);
                    }), 0 === result.length ? null : result;
                }
                return element.value;
            }
            element.value = value;
        },
        html: function(element, value) {
            return isUndefined(value) ? element.innerHTML : (jqLiteDealoc(element, !0), void (element.innerHTML = value));
        },
        empty: jqLiteEmpty
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2) {
            var i, key, nodeCount = this.length;
            if (fn !== jqLiteEmpty && (2 == fn.length && fn !== jqLiteHasClass && fn !== jqLiteController ? arg1 : arg2) === undefined) {
                if (isObject(arg1)) {
                    for (i = 0; nodeCount > i; i++) if (fn === jqLiteData) fn(this[i], arg1); else for (key in arg1) fn(this[i], key, arg1[key]);
                    return this;
                }
                for (var value = fn.$dv, jj = value === undefined ? Math.min(nodeCount, 1) : nodeCount, j = 0; jj > j; j++) {
                    var nodeValue = fn(this[j], arg1, arg2);
                    value = value ? value + nodeValue : nodeValue;
                }
                return value;
            }
            for (i = 0; nodeCount > i; i++) fn(this[i], arg1, arg2);
            return this;
        };
    }), forEach({
        removeData: jqLiteRemoveData,
        on: function jqLiteOn(element, type, fn, unsupported) {
            if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (jqLiteAcceptsData(element)) {
                var expandoStore = jqLiteExpandoStore(element, !0), events = expandoStore.events, handle = expandoStore.handle;
                handle || (handle = expandoStore.handle = createEventHandler(element, events));
                for (var types = type.indexOf(" ") >= 0 ? type.split(" ") : [ type ], i = types.length; i--; ) {
                    type = types[i];
                    var eventFns = events[type];
                    eventFns || (events[type] = [], "mouseenter" === type || "mouseleave" === type ? jqLiteOn(element, MOUSE_EVENT_MAP[type], function(event) {
                        var target = this, related = event.relatedTarget;
                        (!related || related !== target && !target.contains(related)) && handle(event, type);
                    }) : "$destroy" !== type && addEventListenerFn(element, type, handle), eventFns = events[type]), 
                    eventFns.push(fn);
                }
            }
        },
        off: jqLiteOff,
        one: function(element, type, fn) {
            element = jqLite(element), element.on(type, function onFn() {
                element.off(type, fn), element.off(type, onFn);
            }), element.on(type, fn);
        },
        replaceWith: function(element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element), forEach(new JQLite(replaceNode), function(node) {
                index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), 
                index = node;
            });
        },
        children: function(element) {
            var children = [];
            return forEach(element.childNodes, function(element) {
                element.nodeType === NODE_TYPE_ELEMENT && children.push(element);
            }), children;
        },
        contents: function(element) {
            return element.contentDocument || element.childNodes || [];
        },
        append: function(element, node) {
            var nodeType = element.nodeType;
            if (nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_DOCUMENT_FRAGMENT) {
                node = new JQLite(node);
                for (var i = 0, ii = node.length; ii > i; i++) {
                    var child = node[i];
                    element.appendChild(child);
                }
            }
        },
        prepend: function(element, node) {
            if (element.nodeType === NODE_TYPE_ELEMENT) {
                var index = element.firstChild;
                forEach(new JQLite(node), function(child) {
                    element.insertBefore(child, index);
                });
            }
        },
        wrap: function(element, wrapNode) {
            wrapNode = jqLite(wrapNode).eq(0).clone()[0];
            var parent = element.parentNode;
            parent && parent.replaceChild(wrapNode, element), wrapNode.appendChild(element);
        },
        remove: jqLiteRemove,
        detach: function(element) {
            jqLiteRemove(element, !0);
        },
        after: function(element, newElement) {
            var index = element, parent = element.parentNode;
            newElement = new JQLite(newElement);
            for (var i = 0, ii = newElement.length; ii > i; i++) {
                var node = newElement[i];
                parent.insertBefore(node, index.nextSibling), index = node;
            }
        },
        addClass: jqLiteAddClass,
        removeClass: jqLiteRemoveClass,
        toggleClass: function(element, selector, condition) {
            selector && forEach(selector.split(" "), function(className) {
                var classCondition = condition;
                isUndefined(classCondition) && (classCondition = !jqLiteHasClass(element, className)), 
                (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className);
            });
        },
        parent: function(element) {
            var parent = element.parentNode;
            return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null;
        },
        next: function(element) {
            return element.nextElementSibling;
        },
        find: function(element, selector) {
            return element.getElementsByTagName ? element.getElementsByTagName(selector) : [];
        },
        clone: jqLiteClone,
        triggerHandler: function(element, event, extraParameters) {
            var dummyEvent, eventFnsCopy, handlerArgs, eventName = event.type || event, expandoStore = jqLiteExpandoStore(element), events = expandoStore && expandoStore.events, eventFns = events && events[eventName];
            eventFns && (dummyEvent = {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return this.defaultPrevented === !0;
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0;
                },
                isImmediatePropagationStopped: function() {
                    return this.immediatePropagationStopped === !0;
                },
                stopPropagation: noop,
                type: eventName,
                target: element
            }, event.type && (dummyEvent = extend(dummyEvent, event)), eventFnsCopy = shallowCopy(eventFns), 
            handlerArgs = extraParameters ? [ dummyEvent ].concat(extraParameters) : [ dummyEvent ], 
            forEach(eventFnsCopy, function(fn) {
                dummyEvent.isImmediatePropagationStopped() || fn.apply(element, handlerArgs);
            }));
        }
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2, arg3) {
            for (var value, i = 0, ii = this.length; ii > i; i++) isUndefined(value) ? (value = fn(this[i], arg1, arg2, arg3), 
            isDefined(value) && (value = jqLite(value))) : jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
            return isDefined(value) ? value : this;
        }, JQLite.prototype.bind = JQLite.prototype.on, JQLite.prototype.unbind = JQLite.prototype.off;
    }), HashMap.prototype = {
        put: function(key, value) {
            this[hashKey(key, this.nextUid)] = value;
        },
        get: function(key) {
            return this[hashKey(key, this.nextUid)];
        },
        remove: function(key) {
            var value = this[key = hashKey(key, this.nextUid)];
            return delete this[key], value;
        }
    };
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, FN_ARG_SPLIT = /,/, FN_ARG = /^\s*(_?)(\S+?)\1\s*$/, STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, $injectorMinErr = minErr("$injector");
    createInjector.$$annotate = annotate;
    var $animateMinErr = minErr("$animate"), $AnimateProvider = [ "$provide", function($provide) {
        this.$$selectors = {}, this.register = function(name, factory) {
            var key = name + "-animation";
            if (name && "." != name.charAt(0)) throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
            this.$$selectors[name.substr(1)] = key, $provide.factory(key, factory);
        }, this.classNameFilter = function(expression) {
            return 1 === arguments.length && (this.$$classNameFilter = expression instanceof RegExp ? expression : null), 
            this.$$classNameFilter;
        }, this.$get = [ "$$q", "$$asyncCallback", "$rootScope", function($$q, $$asyncCallback, $rootScope) {
            function runAnimationPostDigest(fn) {
                var cancelFn, defer = $$q.defer();
                return defer.promise.$$cancelFn = function() {
                    cancelFn && cancelFn();
                }, $rootScope.$$postDigest(function() {
                    cancelFn = fn(function() {
                        defer.resolve();
                    });
                }), defer.promise;
            }
            function resolveElementClasses(element, classes) {
                var toAdd = [], toRemove = [], hasClasses = createMap();
                return forEach((element.attr("class") || "").split(/\s+/), function(className) {
                    hasClasses[className] = !0;
                }), forEach(classes, function(status, className) {
                    var hasClass = hasClasses[className];
                    status === !1 && hasClass ? toRemove.push(className) : status !== !0 || hasClass || toAdd.push(className);
                }), toAdd.length + toRemove.length > 0 && [ toAdd.length ? toAdd : null, toRemove.length ? toRemove : null ];
            }
            function cachedClassManipulation(cache, classes, op) {
                for (var i = 0, ii = classes.length; ii > i; ++i) {
                    var className = classes[i];
                    cache[className] = op;
                }
            }
            function asyncPromise() {
                return currentDefer || (currentDefer = $$q.defer(), $$asyncCallback(function() {
                    currentDefer.resolve(), currentDefer = null;
                })), currentDefer.promise;
            }
            function applyStyles(element, options) {
                if (angular.isObject(options)) {
                    var styles = extend(options.from || {}, options.to || {});
                    element.css(styles);
                }
            }
            var currentDefer;
            return {
                animate: function(element, from, to) {
                    return applyStyles(element, {
                        from: from,
                        to: to
                    }), asyncPromise();
                },
                enter: function(element, parent, after, options) {
                    return applyStyles(element, options), after ? after.after(element) : parent.prepend(element), 
                    asyncPromise();
                },
                leave: function(element) {
                    return element.remove(), asyncPromise();
                },
                move: function(element, parent, after, options) {
                    return this.enter(element, parent, after, options);
                },
                addClass: function(element, className, options) {
                    return this.setClass(element, className, [], options);
                },
                $$addClassImmediately: function(element, className, options) {
                    return element = jqLite(element), className = isString(className) ? className : isArray(className) ? className.join(" ") : "", 
                    forEach(element, function(element) {
                        jqLiteAddClass(element, className);
                    }), applyStyles(element, options), asyncPromise();
                },
                removeClass: function(element, className, options) {
                    return this.setClass(element, [], className, options);
                },
                $$removeClassImmediately: function(element, className, options) {
                    return element = jqLite(element), className = isString(className) ? className : isArray(className) ? className.join(" ") : "", 
                    forEach(element, function(element) {
                        jqLiteRemoveClass(element, className);
                    }), applyStyles(element, options), asyncPromise();
                },
                setClass: function(element, add, remove, options) {
                    var self = this, STORAGE_KEY = "$$animateClasses", createdCache = !1;
                    element = jqLite(element);
                    var cache = element.data(STORAGE_KEY);
                    cache ? options && cache.options && (cache.options = angular.extend(cache.options || {}, options)) : (cache = {
                        classes: {},
                        options: options
                    }, createdCache = !0);
                    var classes = cache.classes;
                    return add = isArray(add) ? add : add.split(" "), remove = isArray(remove) ? remove : remove.split(" "), 
                    cachedClassManipulation(classes, add, !0), cachedClassManipulation(classes, remove, !1), 
                    createdCache && (cache.promise = runAnimationPostDigest(function(done) {
                        var cache = element.data(STORAGE_KEY);
                        if (element.removeData(STORAGE_KEY), cache) {
                            var classes = resolveElementClasses(element, cache.classes);
                            classes && self.$$setClassImmediately(element, classes[0], classes[1], cache.options);
                        }
                        done();
                    }), element.data(STORAGE_KEY, cache)), cache.promise;
                },
                $$setClassImmediately: function(element, add, remove, options) {
                    return add && this.$$addClassImmediately(element, add), remove && this.$$removeClassImmediately(element, remove), 
                    applyStyles(element, options), asyncPromise();
                },
                enabled: noop,
                cancel: noop
            };
        } ];
    } ], $compileMinErr = minErr("$compile");
    $CompileProvider.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i, APPLICATION_JSON = "application/json", CONTENT_TYPE_APPLICATION_JSON = {
        "Content-Type": APPLICATION_JSON + ";charset=utf-8"
    }, JSON_START = /^\[|^\{(?!\{)/, JSON_ENDS = {
        "[": /]$/,
        "{": /}$/
    }, JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/, $interpolateMinErr = minErr("$interpolate"), PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
        http: 80,
        https: 443,
        ftp: 21
    }, $locationMinErr = minErr("$location"), locationPrototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: locationGetter("$$absUrl"),
        url: function(url) {
            if (isUndefined(url)) return this.$$url;
            var match = PATH_MATCH.exec(url);
            return (match[1] || "" === url) && this.path(decodeURIComponent(match[1])), (match[2] || match[1] || "" === url) && this.search(match[3] || ""), 
            this.hash(match[5] || ""), this;
        },
        protocol: locationGetter("$$protocol"),
        host: locationGetter("$$host"),
        port: locationGetter("$$port"),
        path: locationGetterSetter("$$path", function(path) {
            return path = null !== path ? path.toString() : "", "/" == path.charAt(0) ? path : "/" + path;
        }),
        search: function(search, paramValue) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (isString(search) || isNumber(search)) search = search.toString(), this.$$search = parseKeyValue(search); else {
                    if (!isObject(search)) throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                    search = copy(search, {}), forEach(search, function(value, key) {
                        null == value && delete search[key];
                    }), this.$$search = search;
                }
                break;

              default:
                isUndefined(paramValue) || null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue;
            }
            return this.$$compose(), this;
        },
        hash: locationGetterSetter("$$hash", function(hash) {
            return null !== hash ? hash.toString() : "";
        }),
        replace: function() {
            return this.$$replace = !0, this;
        }
    };
    forEach([ LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url ], function(Location) {
        Location.prototype = Object.create(locationPrototype), Location.prototype.state = function(state) {
            if (!arguments.length) return this.$$state;
            if (Location !== LocationHtml5Url || !this.$$html5) throw $locationMinErr("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = isUndefined(state) ? null : state, this;
        };
    });
    var $parseMinErr = minErr("$parse"), CALL = Function.prototype.call, APPLY = Function.prototype.apply, BIND = Function.prototype.bind, CONSTANTS = createMap();
    forEach({
        "null": function() {
            return null;
        },
        "true": function() {
            return !0;
        },
        "false": function() {
            return !1;
        },
        undefined: function() {}
    }, function(constantGetter, name) {
        constantGetter.constant = constantGetter.literal = constantGetter.sharedGetter = !0, 
        CONSTANTS[name] = constantGetter;
    }), CONSTANTS["this"] = function(self) {
        return self;
    }, CONSTANTS["this"].sharedGetter = !0;
    var OPERATORS = extend(createMap(), {
        "+": function(self, locals, a, b) {
            return a = a(self, locals), b = b(self, locals), isDefined(a) ? isDefined(b) ? a + b : a : isDefined(b) ? b : undefined;
        },
        "-": function(self, locals, a, b) {
            return a = a(self, locals), b = b(self, locals), (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
        },
        "*": function(self, locals, a, b) {
            return a(self, locals) * b(self, locals);
        },
        "/": function(self, locals, a, b) {
            return a(self, locals) / b(self, locals);
        },
        "%": function(self, locals, a, b) {
            return a(self, locals) % b(self, locals);
        },
        "===": function(self, locals, a, b) {
            return a(self, locals) === b(self, locals);
        },
        "!==": function(self, locals, a, b) {
            return a(self, locals) !== b(self, locals);
        },
        "==": function(self, locals, a, b) {
            return a(self, locals) == b(self, locals);
        },
        "!=": function(self, locals, a, b) {
            return a(self, locals) != b(self, locals);
        },
        "<": function(self, locals, a, b) {
            return a(self, locals) < b(self, locals);
        },
        ">": function(self, locals, a, b) {
            return a(self, locals) > b(self, locals);
        },
        "<=": function(self, locals, a, b) {
            return a(self, locals) <= b(self, locals);
        },
        ">=": function(self, locals, a, b) {
            return a(self, locals) >= b(self, locals);
        },
        "&&": function(self, locals, a, b) {
            return a(self, locals) && b(self, locals);
        },
        "||": function(self, locals, a, b) {
            return a(self, locals) || b(self, locals);
        },
        "!": function(self, locals, a) {
            return !a(self, locals);
        },
        "=": !0,
        "|": !0
    }), ESCAPE = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, Lexer = function(options) {
        this.options = options;
    };
    Lexer.prototype = {
        constructor: Lexer,
        lex: function(text) {
            for (this.text = text, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
                var ch = this.text.charAt(this.index);
                if ('"' === ch || "'" === ch) this.readString(ch); else if (this.isNumber(ch) || "." === ch && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(ch)) this.readIdent(); else if (this.is(ch, "(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: ch
                }), this.index++; else if (this.isWhitespace(ch)) this.index++; else {
                    var ch2 = ch + this.peek(), ch3 = ch2 + this.peek(2), op1 = OPERATORS[ch], op2 = OPERATORS[ch2], op3 = OPERATORS[ch3];
                    if (op1 || op2 || op3) {
                        var token = op3 ? ch3 : op2 ? ch2 : ch;
                        this.tokens.push({
                            index: this.index,
                            text: token,
                            operator: !0
                        }), this.index += token.length;
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1);
                }
            }
            return this.tokens;
        },
        is: function(ch, chars) {
            return -1 !== chars.indexOf(ch);
        },
        peek: function(i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : !1;
        },
        isNumber: function(ch) {
            return ch >= "0" && "9" >= ch && "string" == typeof ch;
        },
        isWhitespace: function(ch) {
            return " " === ch || "\r" === ch || "	" === ch || "\n" === ch || "" === ch || " " === ch;
        },
        isIdent: function(ch) {
            return ch >= "a" && "z" >= ch || ch >= "A" && "Z" >= ch || "_" === ch || "$" === ch;
        },
        isExpOperator: function(ch) {
            return "-" === ch || "+" === ch || this.isNumber(ch);
        },
        throwError: function(error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
            throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text);
        },
        readNumber: function() {
            for (var number = "", start = this.index; this.index < this.text.length; ) {
                var ch = lowercase(this.text.charAt(this.index));
                if ("." == ch || this.isNumber(ch)) number += ch; else {
                    var peekCh = this.peek();
                    if ("e" == ch && this.isExpOperator(peekCh)) number += ch; else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && "e" == number.charAt(number.length - 1)) number += ch; else {
                        if (!this.isExpOperator(ch) || peekCh && this.isNumber(peekCh) || "e" != number.charAt(number.length - 1)) break;
                        this.throwError("Invalid exponent");
                    }
                }
                this.index++;
            }
            this.tokens.push({
                index: start,
                text: number,
                constant: !0,
                value: Number(number)
            });
        },
        readIdent: function() {
            for (var start = this.index; this.index < this.text.length; ) {
                var ch = this.text.charAt(this.index);
                if (!this.isIdent(ch) && !this.isNumber(ch)) break;
                this.index++;
            }
            this.tokens.push({
                index: start,
                text: this.text.slice(start, this.index),
                identifier: !0
            });
        },
        readString: function(quote) {
            var start = this.index;
            this.index++;
            for (var string = "", rawString = quote, escape = !1; this.index < this.text.length; ) {
                var ch = this.text.charAt(this.index);
                if (rawString += ch, escape) {
                    if ("u" === ch) {
                        var hex = this.text.substring(this.index + 1, this.index + 5);
                        hex.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + hex + "]"), 
                        this.index += 4, string += String.fromCharCode(parseInt(hex, 16));
                    } else {
                        var rep = ESCAPE[ch];
                        string += rep || ch;
                    }
                    escape = !1;
                } else if ("\\" === ch) escape = !0; else {
                    if (ch === quote) return this.index++, void this.tokens.push({
                        index: start,
                        text: rawString,
                        constant: !0,
                        value: string
                    });
                    string += ch;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", start);
        }
    };
    var Parser = function(lexer, $filter, options) {
        this.lexer = lexer, this.$filter = $filter, this.options = options;
    };
    Parser.ZERO = extend(function() {
        return 0;
    }, {
        sharedGetter: !0,
        constant: !0
    }), Parser.prototype = {
        constructor: Parser,
        parse: function(text) {
            this.text = text, this.tokens = this.lexer.lex(text);
            var value = this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
            value.literal = !!value.literal, value.constant = !!value.constant, value;
        },
        primary: function() {
            var primary;
            this.expect("(") ? (primary = this.filterChain(), this.consume(")")) : this.expect("[") ? primary = this.arrayDeclaration() : this.expect("{") ? primary = this.object() : this.peek().identifier && this.peek().text in CONSTANTS ? primary = CONSTANTS[this.consume().text] : this.peek().identifier ? primary = this.identifier() : this.peek().constant ? primary = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var next, context; next = this.expect("(", "[", "."); ) "(" === next.text ? (primary = this.functionCall(primary, context), 
            context = null) : "[" === next.text ? (context = primary, primary = this.objectIndex(primary)) : "." === next.text ? (context = primary, 
            primary = this.fieldAccess(primary)) : this.throwError("IMPOSSIBLE");
            return primary;
        },
        throwError: function(msg, token) {
            throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index));
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0];
        },
        peek: function(e1, e2, e3, e4) {
            return this.peekAhead(0, e1, e2, e3, e4);
        },
        peekAhead: function(i, e1, e2, e3, e4) {
            if (this.tokens.length > i) {
                var token = this.tokens[i], t = token.text;
                if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) return token;
            }
            return !1;
        },
        expect: function(e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            return token ? (this.tokens.shift(), token) : !1;
        },
        consume: function(e1) {
            if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            var token = this.expect(e1);
            return token || this.throwError("is unexpected, expecting [" + e1 + "]", this.peek()), 
            token;
        },
        unaryFn: function(op, right) {
            var fn = OPERATORS[op];
            return extend(function(self, locals) {
                return fn(self, locals, right);
            }, {
                constant: right.constant,
                inputs: [ right ]
            });
        },
        binaryFn: function(left, op, right, isBranching) {
            var fn = OPERATORS[op];
            return extend(function(self, locals) {
                return fn(self, locals, left, right);
            }, {
                constant: left.constant && right.constant,
                inputs: !isBranching && [ left, right ]
            });
        },
        identifier: function() {
            for (var id = this.consume().text; this.peek(".") && this.peekAhead(1).identifier && !this.peekAhead(2, "("); ) id += this.consume().text + this.consume().text;
            return getterFn(id, this.options, this.text);
        },
        constant: function() {
            var value = this.consume().value;
            return extend(function() {
                return value;
            }, {
                constant: !0,
                literal: !0
            });
        },
        statements: function() {
            for (var statements = []; ;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && statements.push(this.filterChain()), 
            !this.expect(";")) return 1 === statements.length ? statements[0] : function(self, locals) {
                for (var value, i = 0, ii = statements.length; ii > i; i++) value = statements[i](self, locals);
                return value;
            };
        },
        filterChain: function() {
            for (var token, left = this.expression(); token = this.expect("|"); ) left = this.filter(left);
            return left;
        },
        filter: function(inputFn) {
            var argsFn, args, fn = this.$filter(this.consume().text);
            if (this.peek(":")) for (argsFn = [], args = []; this.expect(":"); ) argsFn.push(this.expression());
            var inputs = [ inputFn ].concat(argsFn || []);
            return extend(function(self, locals) {
                var input = inputFn(self, locals);
                if (args) {
                    args[0] = input;
                    for (var i = argsFn.length; i--; ) args[i + 1] = argsFn[i](self, locals);
                    return fn.apply(undefined, args);
                }
                return fn(input);
            }, {
                constant: !fn.$stateful && inputs.every(isConstant),
                inputs: !fn.$stateful && inputs
            });
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var right, token, left = this.ternary();
            return (token = this.expect("=")) ? (left.assign || this.throwError("implies assignment but [" + this.text.substring(0, token.index) + "] can not be assigned to", token), 
            right = this.ternary(), extend(function(scope, locals) {
                return left.assign(scope, right(scope, locals), locals);
            }, {
                inputs: [ left, right ]
            })) : left;
        },
        ternary: function() {
            var middle, token, left = this.logicalOR();
            if ((token = this.expect("?")) && (middle = this.assignment(), this.consume(":"))) {
                var right = this.assignment();
                return extend(function(self, locals) {
                    return left(self, locals) ? middle(self, locals) : right(self, locals);
                }, {
                    constant: left.constant && middle.constant && right.constant
                });
            }
            return left;
        },
        logicalOR: function() {
            for (var token, left = this.logicalAND(); token = this.expect("||"); ) left = this.binaryFn(left, token.text, this.logicalAND(), !0);
            return left;
        },
        logicalAND: function() {
            for (var token, left = this.equality(); token = this.expect("&&"); ) left = this.binaryFn(left, token.text, this.equality(), !0);
            return left;
        },
        equality: function() {
            for (var token, left = this.relational(); token = this.expect("==", "!=", "===", "!=="); ) left = this.binaryFn(left, token.text, this.relational());
            return left;
        },
        relational: function() {
            for (var token, left = this.additive(); token = this.expect("<", ">", "<=", ">="); ) left = this.binaryFn(left, token.text, this.additive());
            return left;
        },
        additive: function() {
            for (var token, left = this.multiplicative(); token = this.expect("+", "-"); ) left = this.binaryFn(left, token.text, this.multiplicative());
            return left;
        },
        multiplicative: function() {
            for (var token, left = this.unary(); token = this.expect("*", "/", "%"); ) left = this.binaryFn(left, token.text, this.unary());
            return left;
        },
        unary: function() {
            var token;
            return this.expect("+") ? this.primary() : (token = this.expect("-")) ? this.binaryFn(Parser.ZERO, token.text, this.unary()) : (token = this.expect("!")) ? this.unaryFn(token.text, this.unary()) : this.primary();
        },
        fieldAccess: function(object) {
            var getter = this.identifier();
            return extend(function(scope, locals, self) {
                var o = self || object(scope, locals);
                return null == o ? undefined : getter(o);
            }, {
                assign: function(scope, value, locals) {
                    var o = object(scope, locals);
                    return o || object.assign(scope, o = {}, locals), getter.assign(o, value);
                }
            });
        },
        objectIndex: function(obj) {
            var expression = this.text, indexFn = this.expression();
            return this.consume("]"), extend(function(self, locals) {
                var v, o = obj(self, locals), i = indexFn(self, locals);
                return ensureSafeMemberName(i, expression), o ? v = ensureSafeObject(o[i], expression) : undefined;
            }, {
                assign: function(self, value, locals) {
                    var key = ensureSafeMemberName(indexFn(self, locals), expression), o = ensureSafeObject(obj(self, locals), expression);
                    return o || obj.assign(self, o = {}, locals), o[key] = value;
                }
            });
        },
        functionCall: function(fnGetter, contextGetter) {
            var argsFn = [];
            if (")" !== this.peekToken().text) do argsFn.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var expressionText = this.text, args = argsFn.length ? [] : null;
            return function(scope, locals) {
                var context = contextGetter ? contextGetter(scope, locals) : isDefined(contextGetter) ? undefined : scope, fn = fnGetter(scope, locals, context) || noop;
                if (args) for (var i = argsFn.length; i--; ) args[i] = ensureSafeObject(argsFn[i](scope, locals), expressionText);
                ensureSafeObject(context, expressionText), ensureSafeFunction(fn, expressionText);
                var v = fn.apply ? fn.apply(context, args) : fn(args[0], args[1], args[2], args[3], args[4]);
                return ensureSafeObject(v, expressionText);
            };
        },
        arrayDeclaration: function() {
            var elementFns = [];
            if ("]" !== this.peekToken().text) do {
                if (this.peek("]")) break;
                elementFns.push(this.expression());
            } while (this.expect(","));
            return this.consume("]"), extend(function(self, locals) {
                for (var array = [], i = 0, ii = elementFns.length; ii > i; i++) array.push(elementFns[i](self, locals));
                return array;
            }, {
                literal: !0,
                constant: elementFns.every(isConstant),
                inputs: elementFns
            });
        },
        object: function() {
            var keys = [], valueFns = [];
            if ("}" !== this.peekToken().text) do {
                if (this.peek("}")) break;
                var token = this.consume();
                token.constant ? keys.push(token.value) : token.identifier ? keys.push(token.text) : this.throwError("invalid key", token), 
                this.consume(":"), valueFns.push(this.expression());
            } while (this.expect(","));
            return this.consume("}"), extend(function(self, locals) {
                for (var object = {}, i = 0, ii = valueFns.length; ii > i; i++) object[keys[i]] = valueFns[i](self, locals);
                return object;
            }, {
                literal: !0,
                constant: valueFns.every(isConstant),
                inputs: valueFns
            });
        }
    };
    var getterFnCacheDefault = createMap(), getterFnCacheExpensive = createMap(), objectValueOf = Object.prototype.valueOf, $sceMinErr = minErr("$sce"), SCE_CONTEXTS = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, $compileMinErr = minErr("$compile"), urlParsingNode = document.createElement("a"), originUrl = urlResolve(window.location.href);
    $FilterProvider.$inject = [ "$provide" ], currencyFilter.$inject = [ "$locale" ], 
    numberFilter.$inject = [ "$locale" ];
    var DECIMAL_SEP = ".", DATE_FORMATS = {
        yyyy: dateGetter("FullYear", 4),
        yy: dateGetter("FullYear", 2, 0, !0),
        y: dateGetter("FullYear", 1),
        MMMM: dateStrGetter("Month"),
        MMM: dateStrGetter("Month", !0),
        MM: dateGetter("Month", 2, 1),
        M: dateGetter("Month", 1, 1),
        dd: dateGetter("Date", 2),
        d: dateGetter("Date", 1),
        HH: dateGetter("Hours", 2),
        H: dateGetter("Hours", 1),
        hh: dateGetter("Hours", 2, -12),
        h: dateGetter("Hours", 1, -12),
        mm: dateGetter("Minutes", 2),
        m: dateGetter("Minutes", 1),
        ss: dateGetter("Seconds", 2),
        s: dateGetter("Seconds", 1),
        sss: dateGetter("Milliseconds", 3),
        EEEE: dateStrGetter("Day"),
        EEE: dateStrGetter("Day", !0),
        a: ampmGetter,
        Z: timeZoneGetter,
        ww: weekGetter(2),
        w: weekGetter(1)
    }, DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/, NUMBER_STRING = /^\-?\d+$/;
    dateFilter.$inject = [ "$locale" ];
    var lowercaseFilter = valueFn(lowercase), uppercaseFilter = valueFn(uppercase);
    orderByFilter.$inject = [ "$parse" ];
    var htmlAnchorDirective = valueFn({
        restrict: "E",
        compile: function(element, attr) {
            return attr.href || attr.xlinkHref || attr.name ? void 0 : function(scope, element) {
                var href = "[object SVGAnimatedString]" === toString.call(element.prop("href")) ? "xlink:href" : "href";
                element.on("click", function(event) {
                    element.attr(href) || event.preventDefault();
                });
            };
        }
    }), ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function(propName, attrName) {
        if ("multiple" != propName) {
            var normalized = directiveNormalize("ng-" + attrName);
            ngAttributeAliasDirectives[normalized] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: function(scope, element, attr) {
                        scope.$watch(attr[normalized], function(value) {
                            attr.$set(attrName, !!value);
                        });
                    }
                };
            };
        }
    }), forEach(ALIASED_ATTR, function(htmlAttr, ngAttr) {
        ngAttributeAliasDirectives[ngAttr] = function() {
            return {
                priority: 100,
                link: function(scope, element, attr) {
                    if ("ngPattern" === ngAttr && "/" == attr.ngPattern.charAt(0)) {
                        var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                        if (match) return void attr.$set("ngPattern", new RegExp(match[1], match[2]));
                    }
                    scope.$watch(attr[ngAttr], function(value) {
                        attr.$set(ngAttr, value);
                    });
                }
            };
        };
    }), forEach([ "src", "srcset", "href" ], function(attrName) {
        var normalized = directiveNormalize("ng-" + attrName);
        ngAttributeAliasDirectives[normalized] = function() {
            return {
                priority: 99,
                link: function(scope, element, attr) {
                    var propName = attrName, name = attrName;
                    "href" === attrName && "[object SVGAnimatedString]" === toString.call(element.prop("href")) && (name = "xlinkHref", 
                    attr.$attr[name] = "xlink:href", propName = null), attr.$observe(normalized, function(value) {
                        return value ? (attr.$set(name, value), void (msie && propName && element.prop(propName, attr[name]))) : void ("href" === attrName && attr.$set(name, null));
                    });
                }
            };
        };
    });
    var nullFormCtrl = {
        $addControl: noop,
        $$renameControl: nullFormRenameControl,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop,
        $setPristine: noop,
        $setSubmitted: noop
    }, SUBMITTED_CLASS = "ng-submitted";
    FormController.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    var formDirectiveFactory = function(isNgForm) {
        return [ "$timeout", function($timeout) {
            var formDirective = {
                name: "form",
                restrict: isNgForm ? "EAC" : "E",
                controller: FormController,
                compile: function(formElement) {
                    return formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS), {
                        pre: function(scope, formElement, attr, controller) {
                            if (!("action" in attr)) {
                                var handleFormSubmission = function(event) {
                                    scope.$apply(function() {
                                        controller.$commitViewValue(), controller.$setSubmitted();
                                    }), event.preventDefault();
                                };
                                addEventListenerFn(formElement[0], "submit", handleFormSubmission), formElement.on("$destroy", function() {
                                    $timeout(function() {
                                        removeEventListenerFn(formElement[0], "submit", handleFormSubmission);
                                    }, 0, !1);
                                });
                            }
                            var parentFormCtrl = controller.$$parentForm, alias = controller.$name;
                            alias && (setter(scope, null, alias, controller, alias), attr.$observe(attr.name ? "name" : "ngForm", function(newValue) {
                                alias !== newValue && (setter(scope, null, alias, undefined, alias), alias = newValue, 
                                setter(scope, null, alias, controller, alias), parentFormCtrl.$$renameControl(controller, alias));
                            })), formElement.on("$destroy", function() {
                                parentFormCtrl.$removeControl(controller), alias && setter(scope, null, alias, undefined, alias), 
                                extend(controller, nullFormCtrl);
                            });
                        }
                    };
                }
            };
            return formDirective;
        } ];
    }, formDirective = formDirectiveFactory(), ngFormDirective = formDirectiveFactory(!0), ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/, DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, WEEK_REGEXP = /^(\d{4})-W(\d\d)$/, MONTH_REGEXP = /^(\d{4})-(\d\d)$/, TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, inputType = {
        text: textInputType,
        date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
        month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: numberInputType,
        url: urlInputType,
        email: emailInputType,
        radio: radioInputType,
        checkbox: checkboxInputType,
        hidden: noop,
        button: noop,
        submit: noop,
        reset: noop,
        file: noop
    }, inputDirective = [ "$browser", "$sniffer", "$filter", "$parse", function($browser, $sniffer, $filter, $parse) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(scope, element, attr, ctrls) {
                    ctrls[0] && (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse);
                }
            }
        };
    } ], CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/, ngValueDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(tpl, tplAttr) {
                return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function(scope, elm, attr) {
                    attr.$set("value", scope.$eval(attr.ngValue));
                } : function(scope, elm, attr) {
                    scope.$watch(attr.ngValue, function(value) {
                        attr.$set("value", value);
                    });
                };
            }
        };
    }, ngBindDirective = [ "$compile", function($compile) {
        return {
            restrict: "AC",
            compile: function(templateElement) {
                return $compile.$$addBindingClass(templateElement), function(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBind), element = element[0], scope.$watch(attr.ngBind, function(value) {
                        element.textContent = value === undefined ? "" : value;
                    });
                };
            }
        };
    } ], ngBindTemplateDirective = [ "$interpolate", "$compile", function($interpolate, $compile) {
        return {
            compile: function(templateElement) {
                return $compile.$$addBindingClass(templateElement), function(scope, element, attr) {
                    var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                    $compile.$$addBindingInfo(element, interpolateFn.expressions), element = element[0], 
                    attr.$observe("ngBindTemplate", function(value) {
                        element.textContent = value === undefined ? "" : value;
                    });
                };
            }
        };
    } ], ngBindHtmlDirective = [ "$sce", "$parse", "$compile", function($sce, $parse, $compile) {
        return {
            restrict: "A",
            compile: function(tElement, tAttrs) {
                var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml), ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function(value) {
                    return (value || "").toString();
                });
                return $compile.$$addBindingClass(tElement), function(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBindHtml), scope.$watch(ngBindHtmlWatch, function() {
                        element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope)) || "");
                    });
                };
            }
        };
    } ], ngChangeDirective = valueFn({
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attr, ctrl) {
            ctrl.$viewChangeListeners.push(function() {
                scope.$eval(attr.ngChange);
            });
        }
    }), ngClassDirective = classDirective("", !0), ngClassOddDirective = classDirective("Odd", 0), ngClassEvenDirective = classDirective("Even", 1), ngCloakDirective = ngDirective({
        compile: function(element, attr) {
            attr.$set("ngCloak", undefined), element.removeClass("ng-cloak");
        }
    }), ngControllerDirective = [ function() {
        return {
            restrict: "A",
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], ngEventDirectives = {}, forceAsyncEvents = {
        blur: !0,
        focus: !0
    };
    forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(eventName) {
        var directiveName = directiveNormalize("ng-" + eventName);
        ngEventDirectives[directiveName] = [ "$parse", "$rootScope", function($parse, $rootScope) {
            return {
                restrict: "A",
                compile: function($element, attr) {
                    var fn = $parse(attr[directiveName], null, !0);
                    return function(scope, element) {
                        element.on(eventName, function(event) {
                            var callback = function() {
                                fn(scope, {
                                    $event: event
                                });
                            };
                            forceAsyncEvents[eventName] && $rootScope.$$phase ? scope.$evalAsync(callback) : scope.$apply(callback);
                        });
                    };
                }
            };
        } ];
    });
    var ngIfDirective = [ "$animate", function($animate) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements;
                $scope.$watch($attr.ngIf, function(value) {
                    value ? childScope || $transclude(function(clone, newScope) {
                        childScope = newScope, clone[clone.length++] = document.createComment(" end ngIf: " + $attr.ngIf + " "), 
                        block = {
                            clone: clone
                        }, $animate.enter(clone, $element.parent(), $element);
                    }) : (previousElements && (previousElements.remove(), previousElements = null), 
                    childScope && (childScope.$destroy(), childScope = null), block && (previousElements = getBlockNodes(block.clone), 
                    $animate.leave(previousElements).then(function() {
                        previousElements = null;
                    }), block = null));
                });
            }
        };
    } ], ngIncludeDirective = [ "$templateRequest", "$anchorScroll", "$animate", "$sce", function($templateRequest, $anchorScroll, $animate, $sce) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: angular.noop,
            compile: function(element, attr) {
                var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || "", autoScrollExp = attr.autoscroll;
                return function(scope, $element, $attr, ctrl, $transclude) {
                    var currentScope, previousElement, currentElement, changeCounter = 0, cleanupLastIncludeContent = function() {
                        previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), 
                        currentScope = null), currentElement && ($animate.leave(currentElement).then(function() {
                            previousElement = null;
                        }), previousElement = currentElement, currentElement = null);
                    };
                    scope.$watch($sce.parseAsResourceUrl(srcExp), function(src) {
                        var afterAnimation = function() {
                            !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll();
                        }, thisChangeId = ++changeCounter;
                        src ? ($templateRequest(src, !0).then(function(response) {
                            if (thisChangeId === changeCounter) {
                                var newScope = scope.$new();
                                ctrl.template = response;
                                var clone = $transclude(newScope, function(clone) {
                                    cleanupLastIncludeContent(), $animate.enter(clone, null, $element).then(afterAnimation);
                                });
                                currentScope = newScope, currentElement = clone, currentScope.$emit("$includeContentLoaded", src), 
                                scope.$eval(onloadExp);
                            }
                        }, function() {
                            thisChangeId === changeCounter && (cleanupLastIncludeContent(), scope.$emit("$includeContentError", src));
                        }), scope.$emit("$includeContentRequested", src)) : (cleanupLastIncludeContent(), 
                        ctrl.template = null);
                    });
                };
            }
        };
    } ], ngIncludeFillContentDirective = [ "$compile", function($compile) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(scope, $element, $attr, ctrl) {
                return /SVG/.test($element[0].toString()) ? ($element.empty(), void $compile(jqLiteBuildFragment(ctrl.template, document).childNodes)(scope, function(clone) {
                    $element.append(clone);
                }, {
                    futureParentElement: $element
                })) : ($element.html(ctrl.template), void $compile($element.contents())(scope));
            }
        };
    } ], ngInitDirective = ngDirective({
        priority: 450,
        compile: function() {
            return {
                pre: function(scope, element, attrs) {
                    scope.$eval(attrs.ngInit);
                }
            };
        }
    }), ngListDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(scope, element, attr, ctrl) {
                var ngList = element.attr(attr.$attr.ngList) || ", ", trimValues = "false" !== attr.ngTrim, separator = trimValues ? trim(ngList) : ngList, parse = function(viewValue) {
                    if (!isUndefined(viewValue)) {
                        var list = [];
                        return viewValue && forEach(viewValue.split(separator), function(value) {
                            value && list.push(trimValues ? trim(value) : value);
                        }), list;
                    }
                };
                ctrl.$parsers.push(parse), ctrl.$formatters.push(function(value) {
                    return isArray(value) ? value.join(ngList) : undefined;
                }), ctrl.$isEmpty = function(value) {
                    return !value || !value.length;
                };
            }
        };
    }, VALID_CLASS = "ng-valid", INVALID_CLASS = "ng-invalid", PRISTINE_CLASS = "ng-pristine", DIRTY_CLASS = "ng-dirty", UNTOUCHED_CLASS = "ng-untouched", TOUCHED_CLASS = "ng-touched", PENDING_CLASS = "ng-pending", $ngModelMinErr = new minErr("ngModel"), NgModelController = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $rootScope, $q, $interpolate) {
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = undefined, 
        this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], 
        this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, 
        this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, 
        this.$pending = undefined, this.$name = $interpolate($attr.name || "", !1)($scope);
        var parsedNgModel = $parse($attr.ngModel), parsedNgModelAssign = parsedNgModel.assign, ngModelGet = parsedNgModel, ngModelSet = parsedNgModelAssign, pendingDebounce = null, ctrl = this;
        this.$$setOptions = function(options) {
            if (ctrl.$options = options, options && options.getterSetter) {
                var invokeModelGetter = $parse($attr.ngModel + "()"), invokeModelSetter = $parse($attr.ngModel + "($$$p)");
                ngModelGet = function($scope) {
                    var modelValue = parsedNgModel($scope);
                    return isFunction(modelValue) && (modelValue = invokeModelGetter($scope)), modelValue;
                }, ngModelSet = function($scope) {
                    isFunction(parsedNgModel($scope)) ? invokeModelSetter($scope, {
                        $$$p: ctrl.$modelValue
                    }) : parsedNgModelAssign($scope, ctrl.$modelValue);
                };
            } else if (!parsedNgModel.assign) throw $ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element));
        }, this.$render = noop, this.$isEmpty = function(value) {
            return isUndefined(value) || "" === value || null === value || value !== value;
        };
        var parentForm = $element.inheritedData("$formController") || nullFormCtrl, currentValidationRunId = 0;
        addSetValidityMethod({
            ctrl: this,
            $element: $element,
            set: function(object, property) {
                object[property] = !0;
            },
            unset: function(object, property) {
                delete object[property];
            },
            parentForm: parentForm,
            $animate: $animate
        }), this.$setPristine = function() {
            ctrl.$dirty = !1, ctrl.$pristine = !0, $animate.removeClass($element, DIRTY_CLASS), 
            $animate.addClass($element, PRISTINE_CLASS);
        }, this.$setDirty = function() {
            ctrl.$dirty = !0, ctrl.$pristine = !1, $animate.removeClass($element, PRISTINE_CLASS), 
            $animate.addClass($element, DIRTY_CLASS), parentForm.$setDirty();
        }, this.$setUntouched = function() {
            ctrl.$touched = !1, ctrl.$untouched = !0, $animate.setClass($element, UNTOUCHED_CLASS, TOUCHED_CLASS);
        }, this.$setTouched = function() {
            ctrl.$touched = !0, ctrl.$untouched = !1, $animate.setClass($element, TOUCHED_CLASS, UNTOUCHED_CLASS);
        }, this.$rollbackViewValue = function() {
            $timeout.cancel(pendingDebounce), ctrl.$viewValue = ctrl.$$lastCommittedViewValue, 
            ctrl.$render();
        }, this.$validate = function() {
            if (!isNumber(ctrl.$modelValue) || !isNaN(ctrl.$modelValue)) {
                var viewValue = ctrl.$$lastCommittedViewValue, modelValue = ctrl.$$rawModelValue, parserName = ctrl.$$parserName || "parse", parserValid = ctrl.$error[parserName] ? !1 : undefined, prevValid = ctrl.$valid, prevModelValue = ctrl.$modelValue, allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
                ctrl.$$runValidators(parserValid, modelValue, viewValue, function(allValid) {
                    allowInvalid || prevValid === allValid || (ctrl.$modelValue = allValid ? modelValue : undefined, 
                    ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope());
                });
            }
        }, this.$$runValidators = function(parseValid, modelValue, viewValue, doneCallback) {
            function processParseErrors(parseValid) {
                var errorKey = ctrl.$$parserName || "parse";
                if (parseValid === undefined) setValidity(errorKey, null); else if (setValidity(errorKey, parseValid), 
                !parseValid) return forEach(ctrl.$validators, function(v, name) {
                    setValidity(name, null);
                }), forEach(ctrl.$asyncValidators, function(v, name) {
                    setValidity(name, null);
                }), !1;
                return !0;
            }
            function processSyncValidators() {
                var syncValidatorsValid = !0;
                return forEach(ctrl.$validators, function(validator, name) {
                    var result = validator(modelValue, viewValue);
                    syncValidatorsValid = syncValidatorsValid && result, setValidity(name, result);
                }), syncValidatorsValid ? !0 : (forEach(ctrl.$asyncValidators, function(v, name) {
                    setValidity(name, null);
                }), !1);
            }
            function processAsyncValidators() {
                var validatorPromises = [], allValid = !0;
                forEach(ctrl.$asyncValidators, function(validator, name) {
                    var promise = validator(modelValue, viewValue);
                    if (!isPromiseLike(promise)) throw $ngModelMinErr("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                    setValidity(name, undefined), validatorPromises.push(promise.then(function() {
                        setValidity(name, !0);
                    }, function() {
                        allValid = !1, setValidity(name, !1);
                    }));
                }), validatorPromises.length ? $q.all(validatorPromises).then(function() {
                    validationDone(allValid);
                }, noop) : validationDone(!0);
            }
            function setValidity(name, isValid) {
                localValidationRunId === currentValidationRunId && ctrl.$setValidity(name, isValid);
            }
            function validationDone(allValid) {
                localValidationRunId === currentValidationRunId && doneCallback(allValid);
            }
            currentValidationRunId++;
            var localValidationRunId = currentValidationRunId;
            return processParseErrors(parseValid) && processSyncValidators() ? void processAsyncValidators() : void validationDone(!1);
        }, this.$commitViewValue = function() {
            var viewValue = ctrl.$viewValue;
            $timeout.cancel(pendingDebounce), (ctrl.$$lastCommittedViewValue !== viewValue || "" === viewValue && ctrl.$$hasNativeValidators) && (ctrl.$$lastCommittedViewValue = viewValue, 
            ctrl.$pristine && this.$setDirty(), this.$$parseAndValidate());
        }, this.$$parseAndValidate = function() {
            function writeToModelIfNeeded() {
                ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope();
            }
            var viewValue = ctrl.$$lastCommittedViewValue, modelValue = viewValue, parserValid = isUndefined(modelValue) ? undefined : !0;
            if (parserValid) for (var i = 0; i < ctrl.$parsers.length; i++) if (modelValue = ctrl.$parsers[i](modelValue), 
            isUndefined(modelValue)) {
                parserValid = !1;
                break;
            }
            isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue) && (ctrl.$modelValue = ngModelGet($scope));
            var prevModelValue = ctrl.$modelValue, allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
            ctrl.$$rawModelValue = modelValue, allowInvalid && (ctrl.$modelValue = modelValue, 
            writeToModelIfNeeded()), ctrl.$$runValidators(parserValid, modelValue, ctrl.$$lastCommittedViewValue, function(allValid) {
                allowInvalid || (ctrl.$modelValue = allValid ? modelValue : undefined, writeToModelIfNeeded());
            });
        }, this.$$writeModelToScope = function() {
            ngModelSet($scope, ctrl.$modelValue), forEach(ctrl.$viewChangeListeners, function(listener) {
                try {
                    listener();
                } catch (e) {
                    $exceptionHandler(e);
                }
            });
        }, this.$setViewValue = function(value, trigger) {
            ctrl.$viewValue = value, (!ctrl.$options || ctrl.$options.updateOnDefault) && ctrl.$$debounceViewValueCommit(trigger);
        }, this.$$debounceViewValueCommit = function(trigger) {
            var debounce, debounceDelay = 0, options = ctrl.$options;
            options && isDefined(options.debounce) && (debounce = options.debounce, isNumber(debounce) ? debounceDelay = debounce : isNumber(debounce[trigger]) ? debounceDelay = debounce[trigger] : isNumber(debounce["default"]) && (debounceDelay = debounce["default"])), 
            $timeout.cancel(pendingDebounce), debounceDelay ? pendingDebounce = $timeout(function() {
                ctrl.$commitViewValue();
            }, debounceDelay) : $rootScope.$$phase ? ctrl.$commitViewValue() : $scope.$apply(function() {
                ctrl.$commitViewValue();
            });
        }, $scope.$watch(function() {
            var modelValue = ngModelGet($scope);
            if (modelValue !== ctrl.$modelValue) {
                ctrl.$modelValue = ctrl.$$rawModelValue = modelValue;
                for (var formatters = ctrl.$formatters, idx = formatters.length, viewValue = modelValue; idx--; ) viewValue = formatters[idx](viewValue);
                ctrl.$viewValue !== viewValue && (ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue, 
                ctrl.$render(), ctrl.$$runValidators(undefined, modelValue, viewValue, noop));
            }
            return modelValue;
        });
    } ], ngModelDirective = [ "$rootScope", function($rootScope) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: NgModelController,
            priority: 1,
            compile: function(element) {
                return element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS), 
                {
                    pre: function(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
                        modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options), formCtrl.$addControl(modelCtrl), 
                        attr.$observe("name", function(newValue) {
                            modelCtrl.$name !== newValue && formCtrl.$$renameControl(modelCtrl, newValue);
                        }), scope.$on("$destroy", function() {
                            formCtrl.$removeControl(modelCtrl);
                        });
                    },
                    post: function(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0];
                        modelCtrl.$options && modelCtrl.$options.updateOn && element.on(modelCtrl.$options.updateOn, function(ev) {
                            modelCtrl.$$debounceViewValueCommit(ev && ev.type);
                        }), element.on("blur", function() {
                            modelCtrl.$touched || ($rootScope.$$phase ? scope.$evalAsync(modelCtrl.$setTouched) : scope.$apply(modelCtrl.$setTouched));
                        });
                    }
                };
            }
        };
    } ], DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/, ngModelOptionsDirective = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                var that = this;
                this.$options = $scope.$eval($attrs.ngModelOptions), this.$options.updateOn !== undefined ? (this.$options.updateOnDefault = !1, 
                this.$options.updateOn = trim(this.$options.updateOn.replace(DEFAULT_REGEXP, function() {
                    return that.$options.updateOnDefault = !0, " ";
                }))) : this.$options.updateOnDefault = !0;
            } ]
        };
    }, ngNonBindableDirective = ngDirective({
        terminal: !0,
        priority: 1e3
    }), ngPluralizeDirective = [ "$locale", "$interpolate", function($locale, $interpolate) {
        var BRACE = /{}/g, IS_WHEN = /^when(Minus)?(.+)$/;
        return {
            restrict: "EA",
            link: function(scope, element, attr) {
                function updateElementText(newText) {
                    element.text(newText || "");
                }
                var lastCount, numberExp = attr.count, whenExp = attr.$attr.when && element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp) || {}, whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), braceReplacement = startSymbol + numberExp + "-" + offset + endSymbol, watchRemover = angular.noop;
                forEach(attr, function(expression, attributeName) {
                    var tmpMatch = IS_WHEN.exec(attributeName);
                    if (tmpMatch) {
                        var whenKey = (tmpMatch[1] ? "-" : "") + lowercase(tmpMatch[2]);
                        whens[whenKey] = element.attr(attr.$attr[attributeName]);
                    }
                }), forEach(whens, function(expression, key) {
                    whensExpFns[key] = $interpolate(expression.replace(BRACE, braceReplacement));
                }), scope.$watch(numberExp, function(newVal) {
                    var count = parseFloat(newVal), countIsNaN = isNaN(count);
                    countIsNaN || count in whens || (count = $locale.pluralCat(count - offset)), count === lastCount || countIsNaN && isNaN(lastCount) || (watchRemover(), 
                    watchRemover = scope.$watch(whensExpFns[count], updateElementText), lastCount = count);
                });
            }
        };
    } ], ngRepeatDirective = [ "$parse", "$animate", function($parse, $animate) {
        var NG_REMOVED = "$$NG_REMOVED", ngRepeatMinErr = minErr("ngRepeat"), updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
            scope[valueIdentifier] = value, keyIdentifier && (scope[keyIdentifier] = key), scope.$index = index, 
            scope.$first = 0 === index, scope.$last = index === arrayLength - 1, scope.$middle = !(scope.$first || scope.$last), 
            scope.$odd = !(scope.$even = 0 === (1 & index));
        }, getBlockStart = function(block) {
            return block.clone[0];
        }, getBlockEnd = function(block) {
            return block.clone[block.clone.length - 1];
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function($element, $attr) {
                var expression = $attr.ngRepeat, ngRepeatEndComment = document.createComment(" end ngRepeat: " + expression + " "), match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!match) throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                var lhs = match[1], rhs = match[2], aliasAs = match[3], trackByExp = match[4];
                if (match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), 
                !match) throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                var valueIdentifier = match[3] || match[1], keyIdentifier = match[2];
                if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, hashFnLocals = {
                    $id: hashKey
                };
                return trackByExp ? trackByExpGetter = $parse(trackByExp) : (trackByIdArrayFn = function(key, value) {
                    return hashKey(value);
                }, trackByIdObjFn = function(key) {
                    return key;
                }), function($scope, $element, $attr, ctrl, $transclude) {
                    trackByExpGetter && (trackByIdExpFn = function(key, value, index) {
                        return keyIdentifier && (hashFnLocals[keyIdentifier] = key), hashFnLocals[valueIdentifier] = value, 
                        hashFnLocals.$index = index, trackByExpGetter($scope, hashFnLocals);
                    });
                    var lastBlockMap = createMap();
                    $scope.$watchCollection(rhs, function(collection) {
                        var index, length, nextNode, collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove, previousNode = $element[0], nextBlockMap = createMap();
                        if (aliasAs && ($scope[aliasAs] = collection), isArrayLike(collection)) collectionKeys = collection, 
                        trackByIdFn = trackByIdExpFn || trackByIdArrayFn; else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn, collectionKeys = [];
                            for (var itemKey in collection) collection.hasOwnProperty(itemKey) && "$" != itemKey.charAt(0) && collectionKeys.push(itemKey);
                            collectionKeys.sort();
                        }
                        for (collectionLength = collectionKeys.length, nextBlockOrder = new Array(collectionLength), 
                        index = 0; collectionLength > index; index++) if (key = collection === collectionKeys ? index : collectionKeys[index], 
                        value = collection[key], trackById = trackByIdFn(key, value, index), lastBlockMap[trackById]) block = lastBlockMap[trackById], 
                        delete lastBlockMap[trackById], nextBlockMap[trackById] = block, nextBlockOrder[index] = block; else {
                            if (nextBlockMap[trackById]) throw forEach(nextBlockOrder, function(block) {
                                block && block.scope && (lastBlockMap[block.id] = block);
                            }), ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, value);
                            nextBlockOrder[index] = {
                                id: trackById,
                                scope: undefined,
                                clone: undefined
                            }, nextBlockMap[trackById] = !0;
                        }
                        for (var blockKey in lastBlockMap) {
                            if (block = lastBlockMap[blockKey], elementsToRemove = getBlockNodes(block.clone), 
                            $animate.leave(elementsToRemove), elementsToRemove[0].parentNode) for (index = 0, 
                            length = elementsToRemove.length; length > index; index++) elementsToRemove[index][NG_REMOVED] = !0;
                            block.scope.$destroy();
                        }
                        for (index = 0; collectionLength > index; index++) if (key = collection === collectionKeys ? index : collectionKeys[index], 
                        value = collection[key], block = nextBlockOrder[index], block.scope) {
                            nextNode = previousNode;
                            do nextNode = nextNode.nextSibling; while (nextNode && nextNode[NG_REMOVED]);
                            getBlockStart(block) != nextNode && $animate.move(getBlockNodes(block.clone), null, jqLite(previousNode)), 
                            previousNode = getBlockEnd(block), updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                        } else $transclude(function(clone, scope) {
                            block.scope = scope;
                            var endNode = ngRepeatEndComment.cloneNode(!1);
                            clone[clone.length++] = endNode, $animate.enter(clone, null, jqLite(previousNode)), 
                            previousNode = endNode, block.clone = clone, nextBlockMap[block.id] = block, updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                        });
                        lastBlockMap = nextBlockMap;
                    });
                };
            }
        };
    } ], NG_HIDE_CLASS = "ng-hide", NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate", ngShowDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngShow, function(value) {
                    $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ], ngHideDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngHide, function(value) {
                    $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ], ngStyleDirective = ngDirective(function(scope, element, attr) {
        scope.$watchCollection(attr.ngStyle, function(newStyles, oldStyles) {
            oldStyles && newStyles !== oldStyles && forEach(oldStyles, function(val, style) {
                element.css(style, "");
            }), newStyles && element.css(newStyles);
        });
    }), ngSwitchDirective = [ "$animate", function($animate) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(scope, element, attr, ngSwitchController) {
                var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes = [], selectedElements = [], previousLeaveAnimations = [], selectedScopes = [], spliceFactory = function(array, index) {
                    return function() {
                        array.splice(index, 1);
                    };
                };
                scope.$watch(watchExpr, function(value) {
                    var i, ii;
                    for (i = 0, ii = previousLeaveAnimations.length; ii > i; ++i) $animate.cancel(previousLeaveAnimations[i]);
                    for (previousLeaveAnimations.length = 0, i = 0, ii = selectedScopes.length; ii > i; ++i) {
                        var selected = getBlockNodes(selectedElements[i].clone);
                        selectedScopes[i].$destroy();
                        var promise = previousLeaveAnimations[i] = $animate.leave(selected);
                        promise.then(spliceFactory(previousLeaveAnimations, i));
                    }
                    selectedElements.length = 0, selectedScopes.length = 0, (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) && forEach(selectedTranscludes, function(selectedTransclude) {
                        selectedTransclude.transclude(function(caseElement, selectedScope) {
                            selectedScopes.push(selectedScope);
                            var anchor = selectedTransclude.element;
                            caseElement[caseElement.length++] = document.createComment(" end ngSwitchWhen: ");
                            var block = {
                                clone: caseElement
                            };
                            selectedElements.push(block), $animate.enter(caseElement, anchor.parent(), anchor);
                        });
                    });
                });
            }
        };
    } ], ngSwitchWhenDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(scope, element, attrs, ctrl, $transclude) {
            ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [], 
            ctrl.cases["!" + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
            });
        }
    }), ngSwitchDefaultDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(scope, element, attr, ctrl, $transclude) {
            ctrl.cases["?"] = ctrl.cases["?"] || [], ctrl.cases["?"].push({
                transclude: $transclude,
                element: element
            });
        }
    }), ngTranscludeDirective = ngDirective({
        restrict: "EAC",
        link: function($scope, $element, $attrs, controller, $transclude) {
            if (!$transclude) throw minErr("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", startingTag($element));
            $transclude(function(clone) {
                $element.empty(), $element.append(clone);
            });
        }
    }), scriptDirective = [ "$templateCache", function($templateCache) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(element, attr) {
                if ("text/ng-template" == attr.type) {
                    var templateUrl = attr.id, text = element[0].text;
                    $templateCache.put(templateUrl, text);
                }
            }
        };
    } ], ngOptionsMinErr = minErr("ngOptions"), ngOptionsDirective = valueFn({
        restrict: "A",
        terminal: !0
    }), selectDirective = [ "$compile", "$parse", function($compile, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, nullModelCtrl = {
            $setViewValue: noop
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function($element, $scope, $attrs) {
                var nullOption, unknownOption, self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl;
                self.databound = $attrs.ngModel, self.init = function(ngModelCtrl_, nullOption_, unknownOption_) {
                    ngModelCtrl = ngModelCtrl_, nullOption = nullOption_, unknownOption = unknownOption_;
                }, self.addOption = function(value, element) {
                    assertNotHasOwnProperty(value, '"option value"'), optionsMap[value] = !0, ngModelCtrl.$viewValue == value && ($element.val(value), 
                    unknownOption.parent() && unknownOption.remove()), element && element[0].hasAttribute("selected") && (element[0].selected = !0);
                }, self.removeOption = function(value) {
                    this.hasOption(value) && (delete optionsMap[value], ngModelCtrl.$viewValue === value && this.renderUnknownOption(value));
                }, self.renderUnknownOption = function(val) {
                    var unknownVal = "? " + hashKey(val) + " ?";
                    unknownOption.val(unknownVal), $element.prepend(unknownOption), $element.val(unknownVal), 
                    unknownOption.prop("selected", !0);
                }, self.hasOption = function(value) {
                    return optionsMap.hasOwnProperty(value);
                }, $scope.$on("$destroy", function() {
                    self.renderUnknownOption = noop;
                });
            } ],
            link: function(scope, element, attr, ctrls) {
                function setupAsSingle(scope, selectElement, ngModelCtrl, selectCtrl) {
                    ngModelCtrl.$render = function() {
                        var viewValue = ngModelCtrl.$viewValue;
                        selectCtrl.hasOption(viewValue) ? (unknownOption.parent() && unknownOption.remove(), 
                        selectElement.val(viewValue), "" === viewValue && emptyOption.prop("selected", !0)) : isUndefined(viewValue) && emptyOption ? selectElement.val("") : selectCtrl.renderUnknownOption(viewValue);
                    }, selectElement.on("change", function() {
                        scope.$apply(function() {
                            unknownOption.parent() && unknownOption.remove(), ngModelCtrl.$setViewValue(selectElement.val());
                        });
                    });
                }
                function setupAsMultiple(scope, selectElement, ctrl) {
                    var lastView;
                    ctrl.$render = function() {
                        var items = new HashMap(ctrl.$viewValue);
                        forEach(selectElement.find("option"), function(option) {
                            option.selected = isDefined(items.get(option.value));
                        });
                    }, scope.$watch(function() {
                        equals(lastView, ctrl.$viewValue) || (lastView = shallowCopy(ctrl.$viewValue), ctrl.$render());
                    }), selectElement.on("change", function() {
                        scope.$apply(function() {
                            var array = [];
                            forEach(selectElement.find("option"), function(option) {
                                option.selected && array.push(option.value);
                            }), ctrl.$setViewValue(array);
                        });
                    });
                }
                function setupAsOptions(scope, selectElement, ctrl) {
                    function callExpression(exprFn, key, value) {
                        return locals[valueName] = value, keyName && (locals[keyName] = key), exprFn(scope, locals);
                    }
                    function selectionChanged() {
                        scope.$apply(function() {
                            var viewValue, collection = valuesFn(scope) || [];
                            if (multiple) viewValue = [], forEach(selectElement.val(), function(selectedKey) {
                                selectedKey = trackFn ? trackKeysCache[selectedKey] : selectedKey, viewValue.push(getViewValue(selectedKey, collection[selectedKey]));
                            }); else {
                                var selectedKey = trackFn ? trackKeysCache[selectElement.val()] : selectElement.val();
                                viewValue = getViewValue(selectedKey, collection[selectedKey]);
                            }
                            ctrl.$setViewValue(viewValue), render();
                        });
                    }
                    function getViewValue(key, value) {
                        if ("?" === key) return undefined;
                        if ("" === key) return null;
                        var viewValueFn = selectAsFn ? selectAsFn : valueFn;
                        return callExpression(viewValueFn, key, value);
                    }
                    function getLabels() {
                        var toDisplay, values = valuesFn(scope);
                        if (values && isArray(values)) {
                            toDisplay = new Array(values.length);
                            for (var i = 0, ii = values.length; ii > i; i++) toDisplay[i] = callExpression(displayFn, i, values[i]);
                            return toDisplay;
                        }
                        if (values) {
                            toDisplay = {};
                            for (var prop in values) values.hasOwnProperty(prop) && (toDisplay[prop] = callExpression(displayFn, prop, values[prop]));
                        }
                        return toDisplay;
                    }
                    function createIsSelectedFn(viewValue) {
                        var selectedSet;
                        if (multiple) if (trackFn && isArray(viewValue)) {
                            selectedSet = new HashMap([]);
                            for (var trackIndex = 0; trackIndex < viewValue.length; trackIndex++) selectedSet.put(callExpression(trackFn, null, viewValue[trackIndex]), !0);
                        } else selectedSet = new HashMap(viewValue); else trackFn && (viewValue = callExpression(trackFn, null, viewValue));
                        return function(key, value) {
                            var compareValueFn;
                            return compareValueFn = trackFn ? trackFn : selectAsFn ? selectAsFn : valueFn, multiple ? isDefined(selectedSet.remove(callExpression(compareValueFn, key, value))) : viewValue === callExpression(compareValueFn, key, value);
                        };
                    }
                    function scheduleRendering() {
                        renderScheduled || (scope.$$postDigest(render), renderScheduled = !0);
                    }
                    function updateLabelMap(labelMap, label, added) {
                        labelMap[label] = labelMap[label] || 0, labelMap[label] += added ? 1 : -1;
                    }
                    function render() {
                        renderScheduled = !1;
                        var optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, key, value, groupLength, length, groupIndex, index, selected, lastElement, element, label, optionId, optionGroups = {
                            "": []
                        }, optionGroupNames = [ "" ], viewValue = ctrl.$viewValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, labelMap = {}, isSelected = createIsSelectedFn(viewValue), anySelected = !1;
                        for (trackKeysCache = {}, index = 0; length = keys.length, length > index; index++) key = index, 
                        keyName && (key = keys[index], "$" === key.charAt(0)) || (value = values[key], optionGroupName = callExpression(groupByFn, key, value) || "", 
                        (optionGroup = optionGroups[optionGroupName]) || (optionGroup = optionGroups[optionGroupName] = [], 
                        optionGroupNames.push(optionGroupName)), selected = isSelected(key, value), anySelected = anySelected || selected, 
                        label = callExpression(displayFn, key, value), label = isDefined(label) ? label : "", 
                        optionId = trackFn ? trackFn(scope, locals) : keyName ? keys[index] : index, trackFn && (trackKeysCache[optionId] = key), 
                        optionGroup.push({
                            id: optionId,
                            label: label,
                            selected: selected
                        }));
                        for (multiple || (nullOption || null === viewValue ? optionGroups[""].unshift({
                            id: "",
                            label: "",
                            selected: !anySelected
                        }) : anySelected || optionGroups[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        })), groupIndex = 0, groupLength = optionGroupNames.length; groupLength > groupIndex; groupIndex++) {
                            for (optionGroupName = optionGroupNames[groupIndex], optionGroup = optionGroups[optionGroupName], 
                            optionGroupsCache.length <= groupIndex ? (existingParent = {
                                element: optGroupTemplate.clone().attr("label", optionGroupName),
                                label: optionGroup.label
                            }, existingOptions = [ existingParent ], optionGroupsCache.push(existingOptions), 
                            selectElement.append(existingParent.element)) : (existingOptions = optionGroupsCache[groupIndex], 
                            existingParent = existingOptions[0], existingParent.label != optionGroupName && existingParent.element.attr("label", existingParent.label = optionGroupName)), 
                            lastElement = null, index = 0, length = optionGroup.length; length > index; index++) option = optionGroup[index], 
                            (existingOption = existingOptions[index + 1]) ? (lastElement = existingOption.element, 
                            existingOption.label !== option.label && (updateLabelMap(labelMap, existingOption.label, !1), 
                            updateLabelMap(labelMap, option.label, !0), lastElement.text(existingOption.label = option.label), 
                            lastElement.prop("label", existingOption.label)), existingOption.id !== option.id && lastElement.val(existingOption.id = option.id), 
                            lastElement[0].selected !== option.selected && (lastElement.prop("selected", existingOption.selected = option.selected), 
                            msie && lastElement.prop("selected", existingOption.selected))) : ("" === option.id && nullOption ? element = nullOption : (element = optionTemplate.clone()).val(option.id).prop("selected", option.selected).attr("selected", option.selected).prop("label", option.label).text(option.label), 
                            existingOptions.push(existingOption = {
                                element: element,
                                label: option.label,
                                id: option.id,
                                selected: option.selected
                            }), updateLabelMap(labelMap, option.label, !0), lastElement ? lastElement.after(element) : existingParent.element.append(element), 
                            lastElement = element);
                            for (index++; existingOptions.length > index; ) option = existingOptions.pop(), 
                            updateLabelMap(labelMap, option.label, !1), option.element.remove();
                        }
                        for (;optionGroupsCache.length > groupIndex; ) {
                            for (optionGroup = optionGroupsCache.pop(), index = 1; index < optionGroup.length; ++index) updateLabelMap(labelMap, optionGroup[index].label, !1);
                            optionGroup[0].element.remove();
                        }
                        forEach(labelMap, function(count, label) {
                            count > 0 ? selectCtrl.addOption(label) : 0 > count && selectCtrl.removeOption(label);
                        });
                    }
                    var match;
                    if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) throw ngOptionsMinErr("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
                    var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], selectAs = / as /.test(match[0]) && match[1], selectAsFn = selectAs ? $parse(selectAs) : null, keyName = match[5], groupByFn = $parse(match[3] || ""), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), track = match[8], trackFn = track ? $parse(match[8]) : null, trackKeysCache = {}, optionGroupsCache = [ [ {
                        element: selectElement,
                        label: ""
                    } ] ], locals = {};
                    nullOption && ($compile(nullOption)(scope), nullOption.removeClass("ng-scope"), 
                    nullOption.remove()), selectElement.empty(), selectElement.on("change", selectionChanged), 
                    ctrl.$render = render, scope.$watchCollection(valuesFn, scheduleRendering), scope.$watchCollection(getLabels, scheduleRendering), 
                    multiple && scope.$watchCollection(function() {
                        return ctrl.$modelValue;
                    }, scheduleRendering);
                }
                if (ctrls[1]) {
                    for (var emptyOption, selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = !1, renderScheduled = !1, optionTemplate = jqLite(document.createElement("option")), optGroupTemplate = jqLite(document.createElement("optgroup")), unknownOption = optionTemplate.clone(), i = 0, children = element.children(), ii = children.length; ii > i; i++) if ("" === children[i].value) {
                        emptyOption = nullOption = children.eq(i);
                        break;
                    }
                    selectCtrl.init(ngModelCtrl, nullOption, unknownOption), multiple && (ngModelCtrl.$isEmpty = function(value) {
                        return !value || 0 === value.length;
                    }), optionsExp ? setupAsOptions(scope, element, ngModelCtrl) : multiple ? setupAsMultiple(scope, element, ngModelCtrl) : setupAsSingle(scope, element, ngModelCtrl, selectCtrl);
                }
            }
        };
    } ], optionDirective = [ "$interpolate", function($interpolate) {
        var nullSelectCtrl = {
            addOption: noop,
            removeOption: noop
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(element, attr) {
                if (isUndefined(attr.value)) {
                    var interpolateFn = $interpolate(element.text(), !0);
                    interpolateFn || attr.$set("value", element.text());
                }
                return function(scope, element, attr) {
                    var selectCtrlName = "$selectController", parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                    selectCtrl && selectCtrl.databound || (selectCtrl = nullSelectCtrl), interpolateFn ? scope.$watch(interpolateFn, function(newVal, oldVal) {
                        attr.$set("value", newVal), oldVal !== newVal && selectCtrl.removeOption(oldVal), 
                        selectCtrl.addOption(newVal, element);
                    }) : selectCtrl.addOption(attr.value, element), element.on("$destroy", function() {
                        selectCtrl.removeOption(attr.value);
                    });
                };
            }
        };
    } ], styleDirective = valueFn({
        restrict: "E",
        terminal: !1
    }), requiredDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                ctrl && (attr.required = !0, ctrl.$validators.required = function(modelValue, viewValue) {
                    return !attr.required || !ctrl.$isEmpty(viewValue);
                }, attr.$observe("required", function() {
                    ctrl.$validate();
                }));
            }
        };
    }, patternDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                    var regexp, patternExp = attr.ngPattern || attr.pattern;
                    attr.$observe("pattern", function(regex) {
                        if (isString(regex) && regex.length > 0 && (regex = new RegExp("^" + regex + "$")), 
                        regex && !regex.test) throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                        regexp = regex || undefined, ctrl.$validate();
                    }), ctrl.$validators.pattern = function(value) {
                        return ctrl.$isEmpty(value) || isUndefined(regexp) || regexp.test(value);
                    };
                }
            }
        };
    }, maxlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                    var maxlength = -1;
                    attr.$observe("maxlength", function(value) {
                        var intVal = int(value);
                        maxlength = isNaN(intVal) ? -1 : intVal, ctrl.$validate();
                    }), ctrl.$validators.maxlength = function(modelValue, viewValue) {
                        return 0 > maxlength || ctrl.$isEmpty(modelValue) || viewValue.length <= maxlength;
                    };
                }
            }
        };
    }, minlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                    var minlength = 0;
                    attr.$observe("minlength", function(value) {
                        minlength = int(value) || 0, ctrl.$validate();
                    }), ctrl.$validators.minlength = function(modelValue, viewValue) {
                        return ctrl.$isEmpty(viewValue) || viewValue.length >= minlength;
                    };
                }
            }
        };
    };
    return window.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (bindJQuery(), 
    publishExternalAPI(angular), void jqLite(document).ready(function() {
        angularInit(document, bootstrap);
    }));
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'), 
function(window, angular, undefined) {
    "use strict";
    function isValidDottedPath(path) {
        return null != path && "" !== path && "hasOwnProperty" !== path && MEMBER_NAME_REGEX.test("." + path);
    }
    function lookupDottedPath(obj, path) {
        if (!isValidDottedPath(path)) throw $resourceMinErr("badmember", 'Dotted member path "@{0}" is invalid.', path);
        for (var keys = path.split("."), i = 0, ii = keys.length; ii > i && obj !== undefined; i++) {
            var key = keys[i];
            obj = null !== obj ? obj[key] : undefined;
        }
        return obj;
    }
    function shallowClearAndCopy(src, dst) {
        dst = dst || {}, angular.forEach(dst, function(value, key) {
            delete dst[key];
        });
        for (var key in src) !src.hasOwnProperty(key) || "$" === key.charAt(0) && "$" === key.charAt(1) || (dst[key] = src[key]);
        return dst;
    }
    var $resourceMinErr = angular.$$minErr("$resource"), MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
    angular.module("ngResource", [ "ng" ]).provider("$resource", function() {
        var provider = this;
        this.defaults = {
            stripTrailingSlashes: !0,
            actions: {
                get: {
                    method: "GET"
                },
                save: {
                    method: "POST"
                },
                query: {
                    method: "GET",
                    isArray: !0
                },
                remove: {
                    method: "DELETE"
                },
                "delete": {
                    method: "DELETE"
                }
            }
        }, this.$get = [ "$http", "$q", function($http, $q) {
            function encodeUriSegment(val) {
                return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
            }
            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
            }
            function Route(template, defaults) {
                this.template = template, this.defaults = extend({}, provider.defaults, defaults), 
                this.urlParams = {};
            }
            function resourceFactory(url, paramDefaults, actions, options) {
                function extractParams(data, actionParams) {
                    var ids = {};
                    return actionParams = extend({}, paramDefaults, actionParams), forEach(actionParams, function(value, key) {
                        isFunction(value) && (value = value()), ids[key] = value && value.charAt && "@" == value.charAt(0) ? lookupDottedPath(data, value.substr(1)) : value;
                    }), ids;
                }
                function defaultResponseInterceptor(response) {
                    return response.resource;
                }
                function Resource(value) {
                    shallowClearAndCopy(value || {}, this);
                }
                var route = new Route(url, options);
                return actions = extend({}, provider.defaults.actions, actions), Resource.prototype.toJSON = function() {
                    var data = extend({}, this);
                    return delete data.$promise, delete data.$resolved, data;
                }, forEach(actions, function(action, name) {
                    var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);
                    Resource[name] = function(a1, a2, a3, a4) {
                        var data, success, error, params = {};
                        switch (arguments.length) {
                          case 4:
                            error = a4, success = a3;

                          case 3:
                          case 2:
                            if (!isFunction(a2)) {
                                params = a1, data = a2, success = a3;
                                break;
                            }
                            if (isFunction(a1)) {
                                success = a1, error = a2;
                                break;
                            }
                            success = a2, error = a3;

                          case 1:
                            isFunction(a1) ? success = a1 : hasBody ? data = a1 : params = a1;
                            break;

                          case 0:
                            break;

                          default:
                            throw $resourceMinErr("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length);
                        }
                        var isInstanceCall = this instanceof Resource, value = isInstanceCall ? data : action.isArray ? [] : new Resource(data), httpConfig = {}, responseInterceptor = action.interceptor && action.interceptor.response || defaultResponseInterceptor, responseErrorInterceptor = action.interceptor && action.interceptor.responseError || undefined;
                        forEach(action, function(value, key) {
                            "params" != key && "isArray" != key && "interceptor" != key && (httpConfig[key] = copy(value));
                        }), hasBody && (httpConfig.data = data), route.setUrlParams(httpConfig, extend({}, extractParams(data, action.params || {}), params), action.url);
                        var promise = $http(httpConfig).then(function(response) {
                            var data = response.data, promise = value.$promise;
                            if (data) {
                                if (angular.isArray(data) !== !!action.isArray) throw $resourceMinErr("badcfg", "Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2}", name, action.isArray ? "array" : "object", angular.isArray(data) ? "array" : "object");
                                action.isArray ? (value.length = 0, forEach(data, function(item) {
                                    value.push("object" == typeof item ? new Resource(item) : item);
                                })) : (shallowClearAndCopy(data, value), value.$promise = promise);
                            }
                            return value.$resolved = !0, response.resource = value, response;
                        }, function(response) {
                            return value.$resolved = !0, (error || noop)(response), $q.reject(response);
                        });
                        return promise = promise.then(function(response) {
                            var value = responseInterceptor(response);
                            return (success || noop)(value, response.headers), value;
                        }, responseErrorInterceptor), isInstanceCall ? promise : (value.$promise = promise, 
                        value.$resolved = !1, value);
                    }, Resource.prototype["$" + name] = function(params, success, error) {
                        isFunction(params) && (error = success, success = params, params = {});
                        var result = Resource[name].call(this, params, this, success, error);
                        return result.$promise || result;
                    };
                }), Resource.bind = function(additionalParamDefaults) {
                    return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
                }, Resource;
            }
            var noop = angular.noop, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, isFunction = angular.isFunction;
            return Route.prototype = {
                setUrlParams: function(config, params, actionUrl) {
                    var val, encodedVal, self = this, url = actionUrl || self.template, urlParams = self.urlParams = {};
                    forEach(url.split(/\W/), function(param) {
                        if ("hasOwnProperty" === param) throw $resourceMinErr("badname", "hasOwnProperty is not a valid parameter name.");
                        !new RegExp("^\\d+$").test(param) && param && new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url) && (urlParams[param] = !0);
                    }), url = url.replace(/\\:/g, ":"), params = params || {}, forEach(self.urlParams, function(_, urlParam) {
                        val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam], 
                        angular.isDefined(val) && null !== val ? (encodedVal = encodeUriSegment(val), url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
                            return encodedVal + p1;
                        })) : url = url.replace(new RegExp("(/?):" + urlParam + "(\\W|$)", "g"), function(match, leadingSlashes, tail) {
                            return "/" == tail.charAt(0) ? tail : leadingSlashes + tail;
                        });
                    }), self.defaults.stripTrailingSlashes && (url = url.replace(/\/+$/, "") || "/"), 
                    url = url.replace(/\/\.(?=\w+($|\?))/, "."), config.url = url.replace(/\/\\\./, "/."), 
                    forEach(params, function(value, key) {
                        self.urlParams[key] || (config.params = config.params || {}, config.params[key] = value);
                    });
                }
            }, resourceFactory;
        } ];
    });
}(window, window.angular), function(window, angular) {
    "use strict";
    function $RouteProvider() {
        function inherit(parent, extra) {
            return angular.extend(Object.create(parent), extra);
        }
        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch, ret = {
                originalPath: path,
                regexp: path
            }, keys = ret.keys = [];
            return path = path.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
                var optional = "?" === option ? option : null, star = "*" === option ? option : null;
                return keys.push({
                    name: key,
                    optional: !!optional
                }), slash = slash || "", "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (star && "(.+?)" || "([^/]+)") + (optional || "") + ")" + (optional || "");
            }).replace(/([\/$\*])/g, "\\$1"), ret.regexp = new RegExp("^" + path + "$", insensitive ? "i" : ""), 
            ret;
        }
        var routes = {};
        this.when = function(path, route) {
            var routeCopy = angular.copy(route);
            if (angular.isUndefined(routeCopy.reloadOnSearch) && (routeCopy.reloadOnSearch = !0), 
            angular.isUndefined(routeCopy.caseInsensitiveMatch) && (routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch), 
            routes[path] = angular.extend(routeCopy, path && pathRegExp(path, routeCopy)), path) {
                var redirectPath = "/" == path[path.length - 1] ? path.substr(0, path.length - 1) : path + "/";
                routes[redirectPath] = angular.extend({
                    redirectTo: path
                }, pathRegExp(redirectPath, routeCopy));
            }
            return this;
        }, this.caseInsensitiveMatch = !1, this.otherwise = function(params) {
            return "string" == typeof params && (params = {
                redirectTo: params
            }), this.when(null, params), this;
        }, this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {
            function switchRouteMatcher(on, route) {
                var keys = route.keys, params = {};
                if (!route.regexp) return null;
                var m = route.regexp.exec(on);
                if (!m) return null;
                for (var i = 1, len = m.length; len > i; ++i) {
                    var key = keys[i - 1], val = m[i];
                    key && val && (params[key.name] = val);
                }
                return params;
            }
            function prepareRoute($locationEvent) {
                var lastRoute = $route.current;
                preparedRoute = parseRoute(), preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route && angular.equals(preparedRoute.pathParams, lastRoute.pathParams) && !preparedRoute.reloadOnSearch && !forceReload, 
                preparedRouteIsUpdateOnly || !lastRoute && !preparedRoute || $rootScope.$broadcast("$routeChangeStart", preparedRoute, lastRoute).defaultPrevented && $locationEvent && $locationEvent.preventDefault();
            }
            function commitRoute() {
                var lastRoute = $route.current, nextRoute = preparedRoute;
                preparedRouteIsUpdateOnly ? (lastRoute.params = nextRoute.params, angular.copy(lastRoute.params, $routeParams), 
                $rootScope.$broadcast("$routeUpdate", lastRoute)) : (nextRoute || lastRoute) && (forceReload = !1, 
                $route.current = nextRoute, nextRoute && nextRoute.redirectTo && (angular.isString(nextRoute.redirectTo) ? $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params).replace() : $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search())).replace()), 
                $q.when(nextRoute).then(function() {
                    if (nextRoute) {
                        var template, templateUrl, locals = angular.extend({}, nextRoute.resolve);
                        return angular.forEach(locals, function(value, key) {
                            locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                        }), angular.isDefined(template = nextRoute.template) ? angular.isFunction(template) && (template = template(nextRoute.params)) : angular.isDefined(templateUrl = nextRoute.templateUrl) && (angular.isFunction(templateUrl) && (templateUrl = templateUrl(nextRoute.params)), 
                        templateUrl = $sce.getTrustedResourceUrl(templateUrl), angular.isDefined(templateUrl) && (nextRoute.loadedTemplateUrl = templateUrl, 
                        template = $templateRequest(templateUrl))), angular.isDefined(template) && (locals.$template = template), 
                        $q.all(locals);
                    }
                }).then(function(locals) {
                    nextRoute == $route.current && (nextRoute && (nextRoute.locals = locals, angular.copy(nextRoute.params, $routeParams)), 
                    $rootScope.$broadcast("$routeChangeSuccess", nextRoute, lastRoute));
                }, function(error) {
                    nextRoute == $route.current && $rootScope.$broadcast("$routeChangeError", nextRoute, lastRoute, error);
                }));
            }
            function parseRoute() {
                var params, match;
                return angular.forEach(routes, function(route) {
                    !match && (params = switchRouteMatcher($location.path(), route)) && (match = inherit(route, {
                        params: angular.extend({}, $location.search(), params),
                        pathParams: params
                    }), match.$$route = route);
                }), match || routes[null] && inherit(routes[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function interpolate(string, params) {
                var result = [];
                return angular.forEach((string || "").split(":"), function(segment, i) {
                    if (0 === i) result.push(segment); else {
                        var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/), key = segmentMatch[1];
                        result.push(params[key]), result.push(segmentMatch[2] || ""), delete params[key];
                    }
                }), result.join("");
            }
            var preparedRoute, preparedRouteIsUpdateOnly, forceReload = !1, $route = {
                routes: routes,
                reload: function() {
                    forceReload = !0, $rootScope.$evalAsync(function() {
                        prepareRoute(), commitRoute();
                    });
                },
                updateParams: function(newParams) {
                    if (!this.current || !this.current.$$route) throw $routeMinErr("norout", "Tried updating route when with no current route");
                    var searchParams = {}, self = this;
                    angular.forEach(Object.keys(newParams), function(key) {
                        self.current.pathParams[key] || (searchParams[key] = newParams[key]);
                    }), newParams = angular.extend({}, this.current.params, newParams), $location.path(interpolate(this.current.$$route.originalPath, newParams)), 
                    $location.search(angular.extend({}, $location.search(), searchParams));
                }
            };
            return $rootScope.$on("$locationChangeStart", prepareRoute), $rootScope.$on("$locationChangeSuccess", commitRoute), 
            $route;
        } ];
    }
    function $RouteParamsProvider() {
        this.$get = function() {
            return {};
        };
    }
    function ngViewFactory($route, $anchorScroll, $animate) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(scope, $element, attr, ctrl, $transclude) {
                function cleanupLastView() {
                    previousLeaveAnimation && ($animate.cancel(previousLeaveAnimation), previousLeaveAnimation = null), 
                    currentScope && (currentScope.$destroy(), currentScope = null), currentElement && (previousLeaveAnimation = $animate.leave(currentElement), 
                    previousLeaveAnimation.then(function() {
                        previousLeaveAnimation = null;
                    }), currentElement = null);
                }
                function update() {
                    var locals = $route.current && $route.current.locals, template = locals && locals.$template;
                    if (angular.isDefined(template)) {
                        var newScope = scope.$new(), current = $route.current, clone = $transclude(newScope, function(clone) {
                            $animate.enter(clone, null, currentElement || $element).then(function() {
                                !angular.isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll();
                            }), cleanupLastView();
                        });
                        currentElement = clone, currentScope = current.scope = newScope, currentScope.$emit("$viewContentLoaded"), 
                        currentScope.$eval(onloadExp);
                    } else cleanupLastView();
                }
                var currentScope, currentElement, previousLeaveAnimation, autoScrollExp = attr.autoscroll, onloadExp = attr.onload || "";
                scope.$on("$routeChangeSuccess", update), update();
            }
        };
    }
    function ngViewFillContentFactory($compile, $controller, $route) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(scope, $element) {
                var current = $route.current, locals = current.locals;
                $element.html(locals.$template);
                var link = $compile($element.contents());
                if (current.controller) {
                    locals.$scope = scope;
                    var controller = $controller(current.controller, locals);
                    current.controllerAs && (scope[current.controllerAs] = controller), $element.data("$ngControllerController", controller), 
                    $element.children().data("$ngControllerController", controller);
                }
                link(scope);
            }
        };
    }
    var ngRouteModule = angular.module("ngRoute", [ "ng" ]).provider("$route", $RouteProvider), $routeMinErr = angular.$$minErr("ngRoute");
    ngRouteModule.provider("$routeParams", $RouteParamsProvider), ngRouteModule.directive("ngView", ngViewFactory), 
    ngRouteModule.directive("ngView", ngViewFillContentFactory), ngViewFactory.$inject = [ "$route", "$anchorScroll", "$animate" ], 
    ngViewFillContentFactory.$inject = [ "$compile", "$controller", "$route" ];
}(window, window.angular), function(window, angular, undefined) {
    "use strict";
    angular.module("ngAnimate", [ "ng" ]).directive("ngAnimateChildren", function() {
        var NG_ANIMATE_CHILDREN = "$$ngAnimateChildren";
        return function(scope, element, attrs) {
            var val = attrs.ngAnimateChildren;
            angular.isString(val) && 0 === val.length ? element.data(NG_ANIMATE_CHILDREN, !0) : scope.$watch(val, function(value) {
                element.data(NG_ANIMATE_CHILDREN, !!value);
            });
        };
    }).factory("$$animateReflow", [ "$$rAF", "$document", function($$rAF, $document) {
        var bod = $document[0].body;
        return function(fn) {
            return $$rAF(function() {
                bod.offsetWidth + 1;
                fn();
            });
        };
    } ]).config([ "$provide", "$animateProvider", function($provide, $animateProvider) {
        function extractElementNode(element) {
            for (var i = 0; i < element.length; i++) {
                var elm = element[i];
                if (elm.nodeType == ELEMENT_NODE) return elm;
            }
        }
        function prepareElement(element) {
            return element && angular.element(element);
        }
        function stripCommentsFromElement(element) {
            return angular.element(extractElementNode(element));
        }
        function isMatchingElement(elm1, elm2) {
            return extractElementNode(elm1) == extractElementNode(elm2);
        }
        var $$jqLite, noop = angular.noop, forEach = angular.forEach, selectors = $animateProvider.$$selectors, isArray = angular.isArray, isString = angular.isString, isObject = angular.isObject, ELEMENT_NODE = 1, NG_ANIMATE_STATE = "$$ngAnimateState", NG_ANIMATE_CHILDREN = "$$ngAnimateChildren", NG_ANIMATE_CLASS_NAME = "ng-animate", rootAnimateState = {
            running: !0
        };
        $provide.decorator("$animate", [ "$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", "$$jqLite", function($delegate, $$q, $injector, $sniffer, $rootElement, $$asyncCallback, $rootScope, $document, $templateRequest, $$$jqLite) {
            function classBasedAnimationsBlocked(element, setter) {
                var data = element.data(NG_ANIMATE_STATE) || {};
                return setter && (data.running = !0, data.structural = !0, element.data(NG_ANIMATE_STATE, data)), 
                data.disabled || data.running && data.structural;
            }
            function runAnimationPostDigest(fn) {
                var cancelFn, defer = $$q.defer();
                return defer.promise.$$cancelFn = function() {
                    cancelFn && cancelFn();
                }, $rootScope.$$postDigest(function() {
                    cancelFn = fn(function() {
                        defer.resolve();
                    });
                }), defer.promise;
            }
            function parseAnimateOptions(options) {
                return isObject(options) ? (options.tempClasses && isString(options.tempClasses) && (options.tempClasses = options.tempClasses.split(/\s+/)), 
                options) : void 0;
            }
            function resolveElementClasses(element, cache, runningAnimations) {
                runningAnimations = runningAnimations || {};
                var lookup = {};
                forEach(runningAnimations, function(data, selector) {
                    forEach(selector.split(" "), function(s) {
                        lookup[s] = data;
                    });
                });
                var hasClasses = Object.create(null);
                forEach((element.attr("class") || "").split(/\s+/), function(className) {
                    hasClasses[className] = !0;
                });
                var toAdd = [], toRemove = [];
                return forEach(cache && cache.classes || [], function(status, className) {
                    var hasClass = hasClasses[className], matchingAnimation = lookup[className] || {};
                    status === !1 ? (hasClass || "addClass" == matchingAnimation.event) && toRemove.push(className) : status === !0 && (hasClass && "removeClass" != matchingAnimation.event || toAdd.push(className));
                }), toAdd.length + toRemove.length > 0 && [ toAdd.join(" "), toRemove.join(" ") ];
            }
            function lookup(name) {
                if (name) {
                    var matches = [], flagMap = {}, classes = name.substr(1).split(".");
                    ($sniffer.transitions || $sniffer.animations) && matches.push($injector.get(selectors[""]));
                    for (var i = 0; i < classes.length; i++) {
                        var klass = classes[i], selectorFactoryName = selectors[klass];
                        selectorFactoryName && !flagMap[klass] && (matches.push($injector.get(selectorFactoryName)), 
                        flagMap[klass] = !0);
                    }
                    return matches;
                }
            }
            function animationRunner(element, animationEvent, className, options) {
                function registerAnimation(animationFactory, event) {
                    var afterFn = animationFactory[event], beforeFn = animationFactory["before" + event.charAt(0).toUpperCase() + event.substr(1)];
                    return afterFn || beforeFn ? ("leave" == event && (beforeFn = afterFn, afterFn = null), 
                    after.push({
                        event: event,
                        fn: afterFn
                    }), before.push({
                        event: event,
                        fn: beforeFn
                    }), !0) : void 0;
                }
                function run(fns, cancellations, allCompleteFn) {
                    function afterAnimationComplete(index) {
                        if (cancellations) {
                            if ((cancellations[index] || noop)(), ++count < animations.length) return;
                            cancellations = null;
                        }
                        allCompleteFn();
                    }
                    var animations = [];
                    forEach(fns, function(animation) {
                        animation.fn && animations.push(animation);
                    });
                    var count = 0;
                    forEach(animations, function(animation, index) {
                        var progress = function() {
                            afterAnimationComplete(index);
                        };
                        switch (animation.event) {
                          case "setClass":
                            cancellations.push(animation.fn(element, classNameAdd, classNameRemove, progress, options));
                            break;

                          case "animate":
                            cancellations.push(animation.fn(element, className, options.from, options.to, progress));
                            break;

                          case "addClass":
                            cancellations.push(animation.fn(element, classNameAdd || className, progress, options));
                            break;

                          case "removeClass":
                            cancellations.push(animation.fn(element, classNameRemove || className, progress, options));
                            break;

                          default:
                            cancellations.push(animation.fn(element, progress, options));
                        }
                    }), cancellations && 0 === cancellations.length && allCompleteFn();
                }
                var node = element[0];
                if (node) {
                    options && (options.to = options.to || {}, options.from = options.from || {});
                    var classNameAdd, classNameRemove;
                    isArray(className) && (classNameAdd = className[0], classNameRemove = className[1], 
                    classNameAdd ? classNameRemove ? className = classNameAdd + " " + classNameRemove : (className = classNameAdd, 
                    animationEvent = "addClass") : (className = classNameRemove, animationEvent = "removeClass"));
                    var isSetClassOperation = "setClass" == animationEvent, isClassBased = isSetClassOperation || "addClass" == animationEvent || "removeClass" == animationEvent || "animate" == animationEvent, currentClassName = element.attr("class"), classes = currentClassName + " " + className;
                    if (isAnimatableClassName(classes)) {
                        var beforeComplete = noop, beforeCancel = [], before = [], afterComplete = noop, afterCancel = [], after = [], animationLookup = (" " + classes).replace(/\s+/g, ".");
                        return forEach(lookup(animationLookup), function(animationFactory) {
                            var created = registerAnimation(animationFactory, animationEvent);
                            !created && isSetClassOperation && (registerAnimation(animationFactory, "addClass"), 
                            registerAnimation(animationFactory, "removeClass"));
                        }), {
                            node: node,
                            event: animationEvent,
                            className: className,
                            isClassBased: isClassBased,
                            isSetClassOperation: isSetClassOperation,
                            applyStyles: function() {
                                options && element.css(angular.extend(options.from || {}, options.to || {}));
                            },
                            before: function(allCompleteFn) {
                                beforeComplete = allCompleteFn, run(before, beforeCancel, function() {
                                    beforeComplete = noop, allCompleteFn();
                                });
                            },
                            after: function(allCompleteFn) {
                                afterComplete = allCompleteFn, run(after, afterCancel, function() {
                                    afterComplete = noop, allCompleteFn();
                                });
                            },
                            cancel: function() {
                                beforeCancel && (forEach(beforeCancel, function(cancelFn) {
                                    (cancelFn || noop)(!0);
                                }), beforeComplete(!0)), afterCancel && (forEach(afterCancel, function(cancelFn) {
                                    (cancelFn || noop)(!0);
                                }), afterComplete(!0));
                            }
                        };
                    }
                }
            }
            function performAnimation(animationEvent, className, element, parentElement, afterElement, domOperation, options, doneCallback) {
                function fireDOMCallback(animationPhase) {
                    var eventName = "$animate:" + animationPhase;
                    elementEvents && elementEvents[eventName] && elementEvents[eventName].length > 0 && $$asyncCallback(function() {
                        element.triggerHandler(eventName, {
                            event: animationEvent,
                            className: className
                        });
                    });
                }
                function fireBeforeCallbackAsync() {
                    fireDOMCallback("before");
                }
                function fireAfterCallbackAsync() {
                    fireDOMCallback("after");
                }
                function fireDoneCallbackAsync() {
                    fireDOMCallback("close"), doneCallback();
                }
                function fireDOMOperation() {
                    fireDOMOperation.hasBeenRun || (fireDOMOperation.hasBeenRun = !0, domOperation());
                }
                function closeAnimation() {
                    if (!closeAnimation.hasBeenRun) {
                        runner && runner.applyStyles(), closeAnimation.hasBeenRun = !0, options && options.tempClasses && forEach(options.tempClasses, function(className) {
                            $$jqLite.removeClass(element, className);
                        });
                        var data = element.data(NG_ANIMATE_STATE);
                        data && (runner && runner.isClassBased ? cleanup(element, className) : ($$asyncCallback(function() {
                            var data = element.data(NG_ANIMATE_STATE) || {};
                            localAnimationCount == data.index && cleanup(element, className, animationEvent);
                        }), element.data(NG_ANIMATE_STATE, data))), fireDoneCallbackAsync();
                    }
                }
                var noopCancel = noop, runner = animationRunner(element, animationEvent, className, options);
                if (!runner) return fireDOMOperation(), fireBeforeCallbackAsync(), fireAfterCallbackAsync(), 
                closeAnimation(), noopCancel;
                animationEvent = runner.event, className = runner.className;
                var elementEvents = angular.element._data(runner.node);
                if (elementEvents = elementEvents && elementEvents.events, parentElement || (parentElement = afterElement ? afterElement.parent() : element.parent()), 
                animationsDisabled(element, parentElement)) return fireDOMOperation(), fireBeforeCallbackAsync(), 
                fireAfterCallbackAsync(), closeAnimation(), noopCancel;
                var ngAnimateState = element.data(NG_ANIMATE_STATE) || {}, runningAnimations = ngAnimateState.active || {}, totalActiveAnimations = ngAnimateState.totalActive || 0, lastAnimation = ngAnimateState.last, skipAnimation = !1;
                if (totalActiveAnimations > 0) {
                    var animationsToCancel = [];
                    if (runner.isClassBased) {
                        if ("setClass" == lastAnimation.event) animationsToCancel.push(lastAnimation), cleanup(element, className); else if (runningAnimations[className]) {
                            var current = runningAnimations[className];
                            current.event == animationEvent ? skipAnimation = !0 : (animationsToCancel.push(current), 
                            cleanup(element, className));
                        }
                    } else if ("leave" == animationEvent && runningAnimations["ng-leave"]) skipAnimation = !0; else {
                        for (var klass in runningAnimations) animationsToCancel.push(runningAnimations[klass]);
                        ngAnimateState = {}, cleanup(element, !0);
                    }
                    animationsToCancel.length > 0 && forEach(animationsToCancel, function(operation) {
                        operation.cancel();
                    });
                }
                if (!runner.isClassBased || runner.isSetClassOperation || "animate" == animationEvent || skipAnimation || (skipAnimation = "addClass" == animationEvent == element.hasClass(className)), 
                skipAnimation) return fireDOMOperation(), fireBeforeCallbackAsync(), fireAfterCallbackAsync(), 
                fireDoneCallbackAsync(), noopCancel;
                runningAnimations = ngAnimateState.active || {}, totalActiveAnimations = ngAnimateState.totalActive || 0, 
                "leave" == animationEvent && element.one("$destroy", function() {
                    var element = angular.element(this), state = element.data(NG_ANIMATE_STATE);
                    if (state) {
                        var activeLeaveAnimation = state.active["ng-leave"];
                        activeLeaveAnimation && (activeLeaveAnimation.cancel(), cleanup(element, "ng-leave"));
                    }
                }), $$jqLite.addClass(element, NG_ANIMATE_CLASS_NAME), options && options.tempClasses && forEach(options.tempClasses, function(className) {
                    $$jqLite.addClass(element, className);
                });
                var localAnimationCount = globalAnimationCounter++;
                return totalActiveAnimations++, runningAnimations[className] = runner, element.data(NG_ANIMATE_STATE, {
                    last: runner,
                    active: runningAnimations,
                    index: localAnimationCount,
                    totalActive: totalActiveAnimations
                }), fireBeforeCallbackAsync(), runner.before(function(cancelled) {
                    var data = element.data(NG_ANIMATE_STATE);
                    cancelled = cancelled || !data || !data.active[className] || runner.isClassBased && data.active[className].event != animationEvent, 
                    fireDOMOperation(), cancelled === !0 ? closeAnimation() : (fireAfterCallbackAsync(), 
                    runner.after(closeAnimation));
                }), runner.cancel;
            }
            function cancelChildAnimations(element) {
                var node = extractElementNode(element);
                if (node) {
                    var nodes = angular.isFunction(node.getElementsByClassName) ? node.getElementsByClassName(NG_ANIMATE_CLASS_NAME) : node.querySelectorAll("." + NG_ANIMATE_CLASS_NAME);
                    forEach(nodes, function(element) {
                        element = angular.element(element);
                        var data = element.data(NG_ANIMATE_STATE);
                        data && data.active && forEach(data.active, function(runner) {
                            runner.cancel();
                        });
                    });
                }
            }
            function cleanup(element, className) {
                if (isMatchingElement(element, $rootElement)) rootAnimateState.disabled || (rootAnimateState.running = !1, 
                rootAnimateState.structural = !1); else if (className) {
                    var data = element.data(NG_ANIMATE_STATE) || {}, removeAnimations = className === !0;
                    !removeAnimations && data.active && data.active[className] && (data.totalActive--, 
                    delete data.active[className]), (removeAnimations || !data.totalActive) && ($$jqLite.removeClass(element, NG_ANIMATE_CLASS_NAME), 
                    element.removeData(NG_ANIMATE_STATE));
                }
            }
            function animationsDisabled(element, parentElement) {
                if (rootAnimateState.disabled) return !0;
                if (isMatchingElement(element, $rootElement)) return rootAnimateState.running;
                var allowChildAnimations, parentRunningAnimation, hasParent;
                do {
                    if (0 === parentElement.length) break;
                    var isRoot = isMatchingElement(parentElement, $rootElement), state = isRoot ? rootAnimateState : parentElement.data(NG_ANIMATE_STATE) || {};
                    if (state.disabled) return !0;
                    if (isRoot && (hasParent = !0), allowChildAnimations !== !1) {
                        var animateChildrenFlag = parentElement.data(NG_ANIMATE_CHILDREN);
                        angular.isDefined(animateChildrenFlag) && (allowChildAnimations = animateChildrenFlag);
                    }
                    parentRunningAnimation = parentRunningAnimation || state.running || state.last && !state.last.isClassBased;
                } while (parentElement = parentElement.parent());
                return !hasParent || !allowChildAnimations && parentRunningAnimation;
            }
            $$jqLite = $$$jqLite, $rootElement.data(NG_ANIMATE_STATE, rootAnimateState);
            var deregisterWatch = $rootScope.$watch(function() {
                return $templateRequest.totalPendingRequests;
            }, function(val) {
                0 === val && (deregisterWatch(), $rootScope.$$postDigest(function() {
                    $rootScope.$$postDigest(function() {
                        rootAnimateState.running = !1;
                    });
                }));
            }), globalAnimationCounter = 0, classNameFilter = $animateProvider.classNameFilter(), isAnimatableClassName = classNameFilter ? function(className) {
                return classNameFilter.test(className);
            } : function() {
                return !0;
            };
            return {
                animate: function(element, from, to, className, options) {
                    return className = className || "ng-inline-animate", options = parseAnimateOptions(options) || {}, 
                    options.from = to ? from : null, options.to = to ? to : from, runAnimationPostDigest(function(done) {
                        return performAnimation("animate", className, stripCommentsFromElement(element), null, null, noop, options, done);
                    });
                },
                enter: function(element, parentElement, afterElement, options) {
                    return options = parseAnimateOptions(options), element = angular.element(element), 
                    parentElement = prepareElement(parentElement), afterElement = prepareElement(afterElement), 
                    classBasedAnimationsBlocked(element, !0), $delegate.enter(element, parentElement, afterElement), 
                    runAnimationPostDigest(function(done) {
                        return performAnimation("enter", "ng-enter", stripCommentsFromElement(element), parentElement, afterElement, noop, options, done);
                    });
                },
                leave: function(element, options) {
                    return options = parseAnimateOptions(options), element = angular.element(element), 
                    cancelChildAnimations(element), classBasedAnimationsBlocked(element, !0), runAnimationPostDigest(function(done) {
                        return performAnimation("leave", "ng-leave", stripCommentsFromElement(element), null, null, function() {
                            $delegate.leave(element);
                        }, options, done);
                    });
                },
                move: function(element, parentElement, afterElement, options) {
                    return options = parseAnimateOptions(options), element = angular.element(element), 
                    parentElement = prepareElement(parentElement), afterElement = prepareElement(afterElement), 
                    cancelChildAnimations(element), classBasedAnimationsBlocked(element, !0), $delegate.move(element, parentElement, afterElement), 
                    runAnimationPostDigest(function(done) {
                        return performAnimation("move", "ng-move", stripCommentsFromElement(element), parentElement, afterElement, noop, options, done);
                    });
                },
                addClass: function(element, className, options) {
                    return this.setClass(element, className, [], options);
                },
                removeClass: function(element, className, options) {
                    return this.setClass(element, [], className, options);
                },
                setClass: function(element, add, remove, options) {
                    options = parseAnimateOptions(options);
                    var STORAGE_KEY = "$$animateClasses";
                    if (element = angular.element(element), element = stripCommentsFromElement(element), 
                    classBasedAnimationsBlocked(element)) return $delegate.$$setClassImmediately(element, add, remove, options);
                    var classes, cache = element.data(STORAGE_KEY), hasCache = !!cache;
                    return cache || (cache = {}, cache.classes = {}), classes = cache.classes, add = isArray(add) ? add : add.split(" "), 
                    forEach(add, function(c) {
                        c && c.length && (classes[c] = !0);
                    }), remove = isArray(remove) ? remove : remove.split(" "), forEach(remove, function(c) {
                        c && c.length && (classes[c] = !1);
                    }), hasCache ? (options && cache.options && (cache.options = angular.extend(cache.options || {}, options)), 
                    cache.promise) : (element.data(STORAGE_KEY, cache = {
                        classes: classes,
                        options: options
                    }), cache.promise = runAnimationPostDigest(function(done) {
                        var parentElement = element.parent(), elementNode = extractElementNode(element), parentNode = elementNode.parentNode;
                        if (!parentNode || parentNode.$$NG_REMOVED || elementNode.$$NG_REMOVED) return void done();
                        var cache = element.data(STORAGE_KEY);
                        element.removeData(STORAGE_KEY);
                        var state = element.data(NG_ANIMATE_STATE) || {}, classes = resolveElementClasses(element, cache, state.active);
                        return classes ? performAnimation("setClass", classes, element, parentElement, null, function() {
                            classes[0] && $delegate.$$addClassImmediately(element, classes[0]), classes[1] && $delegate.$$removeClassImmediately(element, classes[1]);
                        }, cache.options, done) : done();
                    }));
                },
                cancel: function(promise) {
                    promise.$$cancelFn();
                },
                enabled: function(value, element) {
                    switch (arguments.length) {
                      case 2:
                        if (value) cleanup(element); else {
                            var data = element.data(NG_ANIMATE_STATE) || {};
                            data.disabled = !0, element.data(NG_ANIMATE_STATE, data);
                        }
                        break;

                      case 1:
                        rootAnimateState.disabled = !value;
                        break;

                      default:
                        value = !rootAnimateState.disabled;
                    }
                    return !!value;
                }
            };
        } ]), $animateProvider.register("", [ "$window", "$sniffer", "$timeout", "$$animateReflow", function($window, $sniffer, $timeout, $$animateReflow) {
            function clearCacheAfterReflow() {
                cancelAnimationReflow || (cancelAnimationReflow = $$animateReflow(function() {
                    animationReflowQueue = [], cancelAnimationReflow = null, lookupCache = {};
                }));
            }
            function afterReflow(element, callback) {
                cancelAnimationReflow && cancelAnimationReflow(), animationReflowQueue.push(callback), 
                cancelAnimationReflow = $$animateReflow(function() {
                    forEach(animationReflowQueue, function(fn) {
                        fn();
                    }), animationReflowQueue = [], cancelAnimationReflow = null, lookupCache = {};
                });
            }
            function animationCloseHandler(element, totalTime) {
                var node = extractElementNode(element);
                element = angular.element(node), animationElementQueue.push(element);
                var futureTimestamp = Date.now() + totalTime;
                closingTimestamp >= futureTimestamp || ($timeout.cancel(closingTimer), closingTimestamp = futureTimestamp, 
                closingTimer = $timeout(function() {
                    closeAllAnimations(animationElementQueue), animationElementQueue = [];
                }, totalTime, !1));
            }
            function closeAllAnimations(elements) {
                forEach(elements, function(element) {
                    var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);
                    elementData && forEach(elementData.closeAnimationFns, function(fn) {
                        fn();
                    });
                });
            }
            function getElementAnimationDetails(element, cacheKey) {
                var data = cacheKey ? lookupCache[cacheKey] : null;
                if (!data) {
                    var transitionDuration = 0, transitionDelay = 0, animationDuration = 0, animationDelay = 0;
                    forEach(element, function(element) {
                        if (element.nodeType == ELEMENT_NODE) {
                            var elementStyles = $window.getComputedStyle(element) || {}, transitionDurationStyle = elementStyles[TRANSITION_PROP + DURATION_KEY];
                            transitionDuration = Math.max(parseMaxTime(transitionDurationStyle), transitionDuration);
                            var transitionDelayStyle = elementStyles[TRANSITION_PROP + DELAY_KEY];
                            transitionDelay = Math.max(parseMaxTime(transitionDelayStyle), transitionDelay);
                            {
                                elementStyles[ANIMATION_PROP + DELAY_KEY];
                            }
                            animationDelay = Math.max(parseMaxTime(elementStyles[ANIMATION_PROP + DELAY_KEY]), animationDelay);
                            var aDuration = parseMaxTime(elementStyles[ANIMATION_PROP + DURATION_KEY]);
                            aDuration > 0 && (aDuration *= parseInt(elementStyles[ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY], 10) || 1), 
                            animationDuration = Math.max(aDuration, animationDuration);
                        }
                    }), data = {
                        total: 0,
                        transitionDelay: transitionDelay,
                        transitionDuration: transitionDuration,
                        animationDelay: animationDelay,
                        animationDuration: animationDuration
                    }, cacheKey && (lookupCache[cacheKey] = data);
                }
                return data;
            }
            function parseMaxTime(str) {
                var maxValue = 0, values = isString(str) ? str.split(/\s*,\s*/) : [];
                return forEach(values, function(value) {
                    maxValue = Math.max(parseFloat(value) || 0, maxValue);
                }), maxValue;
            }
            function getCacheKey(element) {
                var parentElement = element.parent(), parentID = parentElement.data(NG_ANIMATE_PARENT_KEY);
                return parentID || (parentElement.data(NG_ANIMATE_PARENT_KEY, ++parentCounter), 
                parentID = parentCounter), parentID + "-" + extractElementNode(element).getAttribute("class");
            }
            function animateSetup(animationEvent, element, className, styles) {
                var structural = [ "ng-enter", "ng-leave", "ng-move" ].indexOf(className) >= 0, cacheKey = getCacheKey(element), eventCacheKey = cacheKey + " " + className, itemIndex = lookupCache[eventCacheKey] ? ++lookupCache[eventCacheKey].total : 0, stagger = {};
                if (itemIndex > 0) {
                    var staggerClassName = className + "-stagger", staggerCacheKey = cacheKey + " " + staggerClassName, applyClasses = !lookupCache[staggerCacheKey];
                    applyClasses && $$jqLite.addClass(element, staggerClassName), stagger = getElementAnimationDetails(element, staggerCacheKey), 
                    applyClasses && $$jqLite.removeClass(element, staggerClassName);
                }
                $$jqLite.addClass(element, className);
                var formerData = element.data(NG_ANIMATE_CSS_DATA_KEY) || {}, timings = getElementAnimationDetails(element, eventCacheKey), transitionDuration = timings.transitionDuration, animationDuration = timings.animationDuration;
                if (structural && 0 === transitionDuration && 0 === animationDuration) return $$jqLite.removeClass(element, className), 
                !1;
                var blockTransition = styles || structural && transitionDuration > 0, blockAnimation = animationDuration > 0 && stagger.animationDelay > 0 && 0 === stagger.animationDuration, closeAnimationFns = formerData.closeAnimationFns || [];
                element.data(NG_ANIMATE_CSS_DATA_KEY, {
                    stagger: stagger,
                    cacheKey: eventCacheKey,
                    running: formerData.running || 0,
                    itemIndex: itemIndex,
                    blockTransition: blockTransition,
                    closeAnimationFns: closeAnimationFns
                });
                var node = extractElementNode(element);
                return blockTransition && (blockTransitions(node, !0), styles && element.css(styles)), 
                blockAnimation && blockAnimations(node, !0), !0;
            }
            function animateRun(animationEvent, element, className, activeAnimationComplete, styles) {
                function onEnd() {
                    element.off(css3AnimationEvents, onAnimationProgress), $$jqLite.removeClass(element, activeClassName), 
                    $$jqLite.removeClass(element, pendingClassName), staggerTimeout && $timeout.cancel(staggerTimeout), 
                    animateClose(element, className);
                    var node = extractElementNode(element);
                    for (var i in appliedStyles) node.style.removeProperty(appliedStyles[i]);
                }
                function onAnimationProgress(event) {
                    event.stopPropagation();
                    var ev = event.originalEvent || event, timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now(), elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
                    Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration && activeAnimationComplete();
                }
                var node = extractElementNode(element), elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);
                if (-1 == node.getAttribute("class").indexOf(className) || !elementData) return void activeAnimationComplete();
                var activeClassName = "", pendingClassName = "";
                forEach(className.split(" "), function(klass, i) {
                    var prefix = (i > 0 ? " " : "") + klass;
                    activeClassName += prefix + "-active", pendingClassName += prefix + "-pending";
                });
                var style = "", appliedStyles = [], itemIndex = elementData.itemIndex, stagger = elementData.stagger, staggerTime = 0;
                if (itemIndex > 0) {
                    var transitionStaggerDelay = 0;
                    stagger.transitionDelay > 0 && 0 === stagger.transitionDuration && (transitionStaggerDelay = stagger.transitionDelay * itemIndex);
                    var animationStaggerDelay = 0;
                    stagger.animationDelay > 0 && 0 === stagger.animationDuration && (animationStaggerDelay = stagger.animationDelay * itemIndex, 
                    appliedStyles.push(CSS_PREFIX + "animation-play-state")), staggerTime = Math.round(100 * Math.max(transitionStaggerDelay, animationStaggerDelay)) / 100;
                }
                staggerTime || ($$jqLite.addClass(element, activeClassName), elementData.blockTransition && blockTransitions(node, !1));
                var eventCacheKey = elementData.cacheKey + " " + activeClassName, timings = getElementAnimationDetails(element, eventCacheKey), maxDuration = Math.max(timings.transitionDuration, timings.animationDuration);
                if (0 === maxDuration) return $$jqLite.removeClass(element, activeClassName), animateClose(element, className), 
                void activeAnimationComplete();
                !staggerTime && styles && Object.keys(styles).length > 0 && (timings.transitionDuration || (element.css("transition", timings.animationDuration + "s linear all"), 
                appliedStyles.push("transition")), element.css(styles));
                var maxDelay = Math.max(timings.transitionDelay, timings.animationDelay), maxDelayTime = maxDelay * ONE_SECOND;
                if (appliedStyles.length > 0) {
                    var oldStyle = node.getAttribute("style") || "";
                    ";" !== oldStyle.charAt(oldStyle.length - 1) && (oldStyle += ";"), node.setAttribute("style", oldStyle + " " + style);
                }
                var staggerTimeout, startTime = Date.now(), css3AnimationEvents = ANIMATIONEND_EVENT + " " + TRANSITIONEND_EVENT, animationTime = (maxDelay + maxDuration) * CLOSING_TIME_BUFFER, totalTime = (staggerTime + animationTime) * ONE_SECOND;
                return staggerTime > 0 && ($$jqLite.addClass(element, pendingClassName), staggerTimeout = $timeout(function() {
                    staggerTimeout = null, timings.transitionDuration > 0 && blockTransitions(node, !1), 
                    timings.animationDuration > 0 && blockAnimations(node, !1), $$jqLite.addClass(element, activeClassName), 
                    $$jqLite.removeClass(element, pendingClassName), styles && (0 === timings.transitionDuration && element.css("transition", timings.animationDuration + "s linear all"), 
                    element.css(styles), appliedStyles.push("transition"));
                }, staggerTime * ONE_SECOND, !1)), element.on(css3AnimationEvents, onAnimationProgress), 
                elementData.closeAnimationFns.push(function() {
                    onEnd(), activeAnimationComplete();
                }), elementData.running++, animationCloseHandler(element, totalTime), onEnd;
            }
            function blockTransitions(node, bool) {
                node.style[TRANSITION_PROP + PROPERTY_KEY] = bool ? "none" : "";
            }
            function blockAnimations(node, bool) {
                node.style[ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY] = bool ? "paused" : "";
            }
            function animateBefore(animationEvent, element, className, styles) {
                return animateSetup(animationEvent, element, className, styles) ? function(cancelled) {
                    cancelled && animateClose(element, className);
                } : void 0;
            }
            function animateAfter(animationEvent, element, className, afterAnimationComplete, styles) {
                return element.data(NG_ANIMATE_CSS_DATA_KEY) ? animateRun(animationEvent, element, className, afterAnimationComplete, styles) : (animateClose(element, className), 
                void afterAnimationComplete());
            }
            function animate(animationEvent, element, className, animationComplete, options) {
                var preReflowCancellation = animateBefore(animationEvent, element, className, options.from);
                if (!preReflowCancellation) return clearCacheAfterReflow(), void animationComplete();
                var cancel = preReflowCancellation;
                return afterReflow(element, function() {
                    cancel = animateAfter(animationEvent, element, className, animationComplete, options.to);
                }), function(cancelled) {
                    (cancel || noop)(cancelled);
                };
            }
            function animateClose(element, className) {
                $$jqLite.removeClass(element, className);
                var data = element.data(NG_ANIMATE_CSS_DATA_KEY);
                data && (data.running && data.running--, data.running && 0 !== data.running || element.removeData(NG_ANIMATE_CSS_DATA_KEY));
            }
            function suffixClasses(classes, suffix) {
                var className = "";
                return classes = isArray(classes) ? classes : classes.split(/\s+/), forEach(classes, function(klass, i) {
                    klass && klass.length > 0 && (className += (i > 0 ? " " : "") + klass + suffix);
                }), className;
            }
            var TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT, CSS_PREFIX = "";
            window.ontransitionend === undefined && window.onwebkittransitionend !== undefined ? (CSS_PREFIX = "-webkit-", 
            TRANSITION_PROP = "WebkitTransition", TRANSITIONEND_EVENT = "webkitTransitionEnd transitionend") : (TRANSITION_PROP = "transition", 
            TRANSITIONEND_EVENT = "transitionend"), window.onanimationend === undefined && window.onwebkitanimationend !== undefined ? (CSS_PREFIX = "-webkit-", 
            ANIMATION_PROP = "WebkitAnimation", ANIMATIONEND_EVENT = "webkitAnimationEnd animationend") : (ANIMATION_PROP = "animation", 
            ANIMATIONEND_EVENT = "animationend");
            var cancelAnimationReflow, DURATION_KEY = "Duration", PROPERTY_KEY = "Property", DELAY_KEY = "Delay", ANIMATION_ITERATION_COUNT_KEY = "IterationCount", ANIMATION_PLAYSTATE_KEY = "PlayState", NG_ANIMATE_PARENT_KEY = "$$ngAnimateKey", NG_ANIMATE_CSS_DATA_KEY = "$$ngAnimateCSS3Data", ELAPSED_TIME_MAX_DECIMAL_PLACES = 3, CLOSING_TIME_BUFFER = 1.5, ONE_SECOND = 1e3, lookupCache = {}, parentCounter = 0, animationReflowQueue = [], closingTimer = null, closingTimestamp = 0, animationElementQueue = [];
            return {
                animate: function(element, className, from, to, animationCompleted, options) {
                    return options = options || {}, options.from = from, options.to = to, animate("animate", element, className, animationCompleted, options);
                },
                enter: function(element, animationCompleted, options) {
                    return options = options || {}, animate("enter", element, "ng-enter", animationCompleted, options);
                },
                leave: function(element, animationCompleted, options) {
                    return options = options || {}, animate("leave", element, "ng-leave", animationCompleted, options);
                },
                move: function(element, animationCompleted, options) {
                    return options = options || {}, animate("move", element, "ng-move", animationCompleted, options);
                },
                beforeSetClass: function(element, add, remove, animationCompleted, options) {
                    options = options || {};
                    var className = suffixClasses(remove, "-remove") + " " + suffixClasses(add, "-add"), cancellationMethod = animateBefore("setClass", element, className, options.from);
                    return cancellationMethod ? (afterReflow(element, animationCompleted), cancellationMethod) : (clearCacheAfterReflow(), 
                    void animationCompleted());
                },
                beforeAddClass: function(element, className, animationCompleted, options) {
                    options = options || {};
                    var cancellationMethod = animateBefore("addClass", element, suffixClasses(className, "-add"), options.from);
                    return cancellationMethod ? (afterReflow(element, animationCompleted), cancellationMethod) : (clearCacheAfterReflow(), 
                    void animationCompleted());
                },
                beforeRemoveClass: function(element, className, animationCompleted, options) {
                    options = options || {};
                    var cancellationMethod = animateBefore("removeClass", element, suffixClasses(className, "-remove"), options.from);
                    return cancellationMethod ? (afterReflow(element, animationCompleted), cancellationMethod) : (clearCacheAfterReflow(), 
                    void animationCompleted());
                },
                setClass: function(element, add, remove, animationCompleted, options) {
                    options = options || {}, remove = suffixClasses(remove, "-remove"), add = suffixClasses(add, "-add");
                    var className = remove + " " + add;
                    return animateAfter("setClass", element, className, animationCompleted, options.to);
                },
                addClass: function(element, className, animationCompleted, options) {
                    return options = options || {}, animateAfter("addClass", element, suffixClasses(className, "-add"), animationCompleted, options.to);
                },
                removeClass: function(element, className, animationCompleted, options) {
                    return options = options || {}, animateAfter("removeClass", element, suffixClasses(className, "-remove"), animationCompleted, options.to);
                }
            };
        } ]);
    } ]);
}(window, window.angular), function(window, angular) {
    "use strict";
    function $AriaProvider() {
        function watchExpr(attrName, ariaAttr, negate) {
            return function(scope, elem, attr) {
                var ariaCamelName = attr.$normalize(ariaAttr);
                config[ariaCamelName] && !attr[ariaCamelName] && scope.$watch(attr[attrName], function(boolVal) {
                    negate && (boolVal = !boolVal), elem.attr(ariaAttr, boolVal);
                });
            };
        }
        var config = {
            ariaHidden: !0,
            ariaChecked: !0,
            ariaDisabled: !0,
            ariaRequired: !0,
            ariaInvalid: !0,
            ariaMultiline: !0,
            ariaValue: !0,
            tabindex: !0,
            bindKeypress: !0
        };
        this.config = function(newConfig) {
            config = angular.extend(config, newConfig);
        }, this.$get = function() {
            return {
                config: function(key) {
                    return config[key];
                },
                $$watchExpr: watchExpr
            };
        };
    }
    var ngAriaModule = angular.module("ngAria", [ "ng" ]).provider("$aria", $AriaProvider);
    ngAriaModule.directive("ngShow", [ "$aria", function($aria) {
        return $aria.$$watchExpr("ngShow", "aria-hidden", !0);
    } ]).directive("ngHide", [ "$aria", function($aria) {
        return $aria.$$watchExpr("ngHide", "aria-hidden", !1);
    } ]).directive("ngModel", [ "$aria", function($aria) {
        function shouldAttachAttr(attr, normalizedAttr, elem) {
            return $aria.config(normalizedAttr) && !elem.attr(attr);
        }
        function getShape(attr, elem) {
            var type = attr.type, role = attr.role;
            return "checkbox" === (type || role) || "menuitemcheckbox" === role ? "checkbox" : "radio" === (type || role) || "menuitemradio" === role ? "radio" : "range" === type || "progressbar" === role || "slider" === role ? "range" : "textbox" === (type || role) || "TEXTAREA" === elem[0].nodeName ? "multiline" : "";
        }
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elem, attr, ngModel) {
                function ngAriaWatchModelValue() {
                    return ngModel.$modelValue;
                }
                function getRadioReaction() {
                    return needsTabIndex ? (needsTabIndex = !1, function(newVal) {
                        var boolVal = newVal === attr.value;
                        elem.attr("aria-checked", boolVal), elem.attr("tabindex", 0 - !boolVal);
                    }) : function(newVal) {
                        elem.attr("aria-checked", newVal === attr.value);
                    };
                }
                function ngAriaCheckboxReaction(newVal) {
                    elem.attr("aria-checked", !!newVal);
                }
                var shape = getShape(attr, elem), needsTabIndex = shouldAttachAttr("tabindex", "tabindex", elem);
                switch (shape) {
                  case "radio":
                  case "checkbox":
                    shouldAttachAttr("aria-checked", "ariaChecked", elem) && scope.$watch(ngAriaWatchModelValue, "radio" === shape ? getRadioReaction() : ngAriaCheckboxReaction);
                    break;

                  case "range":
                    $aria.config("ariaValue") && (attr.min && !elem.attr("aria-valuemin") && elem.attr("aria-valuemin", attr.min), 
                    attr.max && !elem.attr("aria-valuemax") && elem.attr("aria-valuemax", attr.max), 
                    elem.attr("aria-valuenow") || scope.$watch(ngAriaWatchModelValue, function(newVal) {
                        elem.attr("aria-valuenow", newVal);
                    }));
                    break;

                  case "multiline":
                    shouldAttachAttr("aria-multiline", "ariaMultiline", elem) && elem.attr("aria-multiline", !0);
                }
                needsTabIndex && elem.attr("tabindex", 0), ngModel.$validators.required && shouldAttachAttr("aria-required", "ariaRequired", elem) && scope.$watch(function() {
                    return ngModel.$error.required;
                }, function(newVal) {
                    elem.attr("aria-required", !!newVal);
                }), shouldAttachAttr("aria-invalid", "ariaInvalid", elem) && scope.$watch(function() {
                    return ngModel.$invalid;
                }, function(newVal) {
                    elem.attr("aria-invalid", !!newVal);
                });
            }
        };
    } ]).directive("ngDisabled", [ "$aria", function($aria) {
        return $aria.$$watchExpr("ngDisabled", "aria-disabled");
    } ]).directive("ngMessages", function() {
        return {
            restrict: "A",
            require: "?ngMessages",
            link: function(scope, elem) {
                elem.attr("aria-live") || elem.attr("aria-live", "assertive");
            }
        };
    }).directive("ngClick", [ "$aria", "$parse", function($aria, $parse) {
        return {
            restrict: "A",
            compile: function(elem, attr) {
                var fn = $parse(attr.ngClick, null, !0);
                return function(scope, elem, attr) {
                    $aria.config("tabindex") && !elem.attr("tabindex") && elem.attr("tabindex", 0), 
                    $aria.config("bindKeypress") && !attr.ngKeypress && elem.on("keypress", function(event) {
                        function callback() {
                            fn(scope, {
                                $event: event
                            });
                        }
                        (32 === event.keyCode || 13 === event.keyCode) && scope.$apply(callback);
                    });
                };
            }
        };
    } ]).directive("ngDblclick", [ "$aria", function($aria) {
        return function(scope, elem) {
            $aria.config("tabindex") && !elem.attr("tabindex") && elem.attr("tabindex", 0);
        };
    } ]);
}(window, window.angular), angular.module("ngMaterial", [ "ng", "ngAnimate", "ngAria", "material.core", "material.core.theming.palette", "material.core.theming", "material.components.backdrop", "material.components.bottomSheet", "material.components.button", "material.components.checkbox", "material.components.card", "material.components.content", "material.components.dialog", "material.components.divider", "material.components.icon", "material.components.input", "material.components.list", "material.components.progressCircular", "material.components.progressLinear", "material.components.radioButton", "material.components.sidenav", "material.components.slider", "material.components.sticky", "material.components.subheader", "material.components.swipe", "material.components.switch", "material.components.tabs", "material.components.textField", "material.components.toast", "material.components.toolbar", "material.components.whiteframe", "material.components.tooltip" ]), 
function() {
    "use strict";
    function MdCoreInitialize() {
        if ("undefined" == typeof Hammer) throw new Error("ngMaterial requires HammerJS to be preloaded.");
        Hammer.defaults.cssProps.userSelect = "";
    }
    function MdCoreConfigure($provide, $mdThemingProvider) {
        function rAFDecorator($$rAF) {
            return $$rAF.debounce = function(cb) {
                var queueArgs, alreadyQueued, queueCb, context;
                return function() {
                    queueArgs = arguments, context = this, queueCb = cb, alreadyQueued || (alreadyQueued = !0, 
                    $$rAF(function() {
                        queueCb.apply(context, queueArgs), alreadyQueued = !1;
                    }));
                };
            }, $$rAF;
        }
        $provide.decorator("$$rAF", [ "$delegate", "$rootScope", rAFDecorator ]), $mdThemingProvider.theme("default").primaryColor("blue").accentColor("green").warnColor("red").backgroundColor("grey");
    }
    angular.module("material.core", [ "material.core.theming" ]).run(MdCoreInitialize).config(MdCoreConfigure), 
    MdCoreConfigure.$inject = [ "$provide", "$mdThemingProvider" ];
}(), function() {
    "use strict";
    function MdConstantFactory($$rAF, $sniffer) {
        function vendorProperty(name) {
            return webkit ? "webkit" + name.charAt(0).toUpperCase() + name.substring(1) : name;
        }
        var webkit = /webkit/i.test($sniffer.vendorPrefix);
        return {
            KEY_CODE: {
                ENTER: 13,
                ESCAPE: 27,
                SPACE: 32,
                LEFT_ARROW: 37,
                UP_ARROW: 38,
                RIGHT_ARROW: 39,
                DOWN_ARROW: 40
            },
            CSS: {
                TRANSITIONEND: "transitionend" + (webkit ? " webkitTransitionEnd" : ""),
                ANIMATIONEND: "animationend" + (webkit ? " webkitAnimationEnd" : ""),
                TRANSFORM: vendorProperty("transform"),
                TRANSITION: vendorProperty("transition"),
                TRANSITION_DURATION: vendorProperty("transitionDuration"),
                ANIMATION_PLAY_STATE: vendorProperty("animationPlayState"),
                ANIMATION_DURATION: vendorProperty("animationDuration"),
                ANIMATION_NAME: vendorProperty("animationName"),
                ANIMATION_TIMING: vendorProperty("animationTimingFunction"),
                ANIMATION_DIRECTION: vendorProperty("animationDirection")
            },
            MEDIA: {
                sm: "(max-width: 600px)",
                "gt-sm": "(min-width: 600px)",
                md: "(min-width: 600px) and (max-width: 960px)",
                "gt-md": "(min-width: 960px)",
                lg: "(min-width: 960px) and (max-width: 1200px)",
                "gt-lg": "(min-width: 1200px)"
            }
        };
    }
    angular.module("material.core").factory("$mdConstant", MdConstantFactory), MdConstantFactory.$inject = [ "$$rAF", "$sniffer" ];
}(), function() {
    function Iterator(items, reloop) {
        function getItems() {
            return [].concat(_items);
        }
        function count() {
            return _items.length;
        }
        function inRange(index) {
            return _items.length && index > -1 && index < _items.length;
        }
        function hasNext(item) {
            return item ? inRange(indexOf(item) + 1) : !1;
        }
        function hasPrevious(item) {
            return item ? inRange(indexOf(item) - 1) : !1;
        }
        function itemAt(index) {
            return inRange(index) ? _items[index] : null;
        }
        function findBy(key, val) {
            return _items.filter(function(item) {
                return item[key] === val;
            });
        }
        function add(item, index) {
            return item ? (angular.isNumber(index) || (index = _items.length), _items.splice(index, 0, item), 
            indexOf(item)) : -1;
        }
        function remove(item) {
            contains(item) && _items.splice(indexOf(item), 1);
        }
        function indexOf(item) {
            return _items.indexOf(item);
        }
        function contains(item) {
            return item && indexOf(item) > -1;
        }
        function first() {
            return _items.length ? _items[0] : null;
        }
        function last() {
            return _items.length ? _items[_items.length - 1] : null;
        }
        function findSubsequentItem(backwards, item, validate, limit) {
            validate = validate || trueFn;
            var curIndex = indexOf(item);
            if (!inRange(curIndex)) return null;
            var nextIndex = curIndex + (backwards ? -1 : 1), foundItem = null;
            return inRange(nextIndex) ? foundItem = _items[nextIndex] : reloop && (foundItem = backwards ? last() : first(), 
            nextIndex = indexOf(foundItem)), null === foundItem || nextIndex === limit ? null : (angular.isUndefined(limit) && (limit = nextIndex), 
            validate(foundItem) ? foundItem : findSubsequentItem(backwards, foundItem, validate, limit));
        }
        var trueFn = function() {
            return !0;
        };
        reloop = !!reloop;
        var _items = items || [];
        return {
            items: getItems,
            count: count,
            inRange: inRange,
            contains: contains,
            indexOf: indexOf,
            itemAt: itemAt,
            findBy: findBy,
            add: add,
            remove: remove,
            first: first,
            last: last,
            next: angular.bind(null, findSubsequentItem, !1),
            previous: angular.bind(null, findSubsequentItem, !0),
            hasPrevious: hasPrevious,
            hasNext: hasNext
        };
    }
    angular.module("material.core").config([ "$provide", function($provide) {
        $provide.decorator("$mdUtil", [ "$delegate", function($delegate) {
            return $delegate.iterator = Iterator, $delegate;
        } ]);
    } ]);
}(), angular.module("material.core").factory("$mdMedia", mdMediaFactory), mdMediaFactory.$inject = [ "$mdConstant", "$mdUtil", "$rootScope", "$window" ], 
function() {
    "use strict";
    var nextUniqueId = [ "0", "0", "0" ];
    angular.module("material.core").factory("$mdUtil", [ "$cacheFactory", "$document", "$timeout", function($cacheFactory, $document, $timeout) {
        function attachDragBehavior(scope, element) {
            function cleanup() {
                cleanup.called || (cleanup.called = !0, element.off(START_EVENTS, startDrag), $document.off(MOVE_EVENTS, doDrag).off(END_EVENTS, endDrag), 
                drag = pointerIsDown = !1);
            }
            function startDrag(ev) {
                var eventType = ev.type.charAt(0), now = Util.now();
                previousDrag && previousDrag.pointerType !== eventType && now - previousDrag.endTime < 400 || pointerIsDown || (pointerIsDown = !0, 
                drag = {
                    pointerType: eventType,
                    startX: getPosition(ev),
                    startTime: now
                }, element.one("$md.dragstart", function(ev) {
                    ev.defaultPrevented && (drag = null);
                }), element.triggerHandler("$md.dragstart", drag));
            }
            function doDrag(ev) {
                drag && isProperEventType(ev, drag) && (("t" === drag.pointerType || "p" === drag.pointerType) && ev.preventDefault(), 
                updateDragState(ev), element.triggerHandler("$md.drag", drag));
            }
            function endDrag(ev) {
                pointerIsDown = !1, drag && isProperEventType(ev, drag) && (drag.endTime = Util.now(), 
                updateDragState(ev), element.triggerHandler("$md.dragend", drag), previousDrag = drag, 
                drag = null);
            }
            function updateDragState(ev) {
                var x = getPosition(ev);
                drag.distance = drag.startX - x, drag.direction = drag.distance > 0 ? "left" : drag.distance < 0 ? "right" : "", 
                drag.duration = drag.startTime - Util.now(), drag.velocity = Math.abs(drag.duration) / drag.time;
            }
            function getPosition(ev) {
                ev = ev.originalEvent || ev;
                var point = ev.touches && ev.touches[0] || ev.changedTouches && ev.changedTouches[0] || ev;
                return point.pageX;
            }
            function isProperEventType(ev, drag) {
                return drag && ev && (ev.type || "").charAt(0) === drag.pointerType;
            }
            var drag, previousDrag, pointerIsDown, START_EVENTS = "mousedown touchstart pointerdown", MOVE_EVENTS = "mousemove touchmove pointermove", END_EVENTS = "mouseup mouseleave touchend touchcancel pointerup pointercancel";
            return element.on(START_EVENTS, startDrag), $document.on(MOVE_EVENTS, doDrag).on(END_EVENTS, endDrag), 
            scope.$on("$destroy", cleanup), cleanup;
        }
        function cacheFactory(id, options) {
            var cache = $cacheFactory(id, options), keys = {};
            return cache._put = cache.put, cache.put = function(k, v) {
                return keys[k] = !0, cache._put(k, v);
            }, cache._remove = cache.remove, cache.remove = function(k) {
                return delete keys[k], cache._remove(k);
            }, cache._removeAll = cache.removeAll, cache.removeAll = function() {
                return keys = {}, cache._removeAll();
            }, cache._destroy = cache.destroy, cache.destroy = function() {
                return keys = {}, cache._destroy();
            }, cache.keys = function() {
                return Object.keys(keys);
            }, cache;
        }
        var Util;
        return Util = {
            now: window.performance ? angular.bind(window.performance, window.performance.now) : Date.now,
            attachDragBehavior: attachDragBehavior,
            elementRect: function(element, offsetParent) {
                var node = element[0];
                offsetParent = offsetParent || node.offsetParent || document.body, offsetParent = offsetParent[0] || offsetParent;
                var nodeRect = node.getBoundingClientRect(), parentRect = offsetParent.getBoundingClientRect();
                return {
                    left: nodeRect.left - parentRect.left + offsetParent.scrollLeft,
                    top: nodeRect.top - parentRect.top + offsetParent.scrollTop,
                    width: nodeRect.width,
                    height: nodeRect.height
                };
            },
            fakeNgModel: function() {
                return {
                    $setViewValue: function(value) {
                        this.$viewValue = value, this.$render(value), this.$viewChangeListeners.forEach(function(cb) {
                            cb();
                        });
                    },
                    $parsers: [],
                    $formatters: [],
                    $viewChangeListeners: [],
                    $render: angular.noop
                };
            },
            cacheFactory: cacheFactory,
            debounce: function(func, wait, scope, invokeApply) {
                var timer;
                return function() {
                    var context = scope, args = Array.prototype.slice.call(arguments);
                    $timeout.cancel(timer), timer = $timeout(function() {
                        timer = void 0, func.apply(context, args);
                    }, wait || 10, invokeApply);
                };
            },
            throttle: function(func, delay) {
                var recent;
                return function() {
                    var context = this, args = arguments, now = Util.now();
                    (!recent || now - recent > delay) && (func.apply(context, args), recent = now);
                };
            },
            nextUid: function() {
                for (var digit, index = nextUniqueId.length; index; ) {
                    if (index--, digit = nextUniqueId[index].charCodeAt(0), 57 == digit) return nextUniqueId[index] = "A", 
                    nextUniqueId.join("");
                    if (90 != digit) return nextUniqueId[index] = String.fromCharCode(digit + 1), nextUniqueId.join("");
                    nextUniqueId[index] = "0";
                }
                return nextUniqueId.unshift("0"), nextUniqueId.join("");
            },
            disconnectScope: function(scope) {
                if (scope && scope.$root !== scope && !scope.$$destroyed) {
                    var parent = scope.$parent;
                    scope.$$disconnected = !0, parent.$$childHead === scope && (parent.$$childHead = scope.$$nextSibling), 
                    parent.$$childTail === scope && (parent.$$childTail = scope.$$prevSibling), scope.$$prevSibling && (scope.$$prevSibling.$$nextSibling = scope.$$nextSibling), 
                    scope.$$nextSibling && (scope.$$nextSibling.$$prevSibling = scope.$$prevSibling), 
                    scope.$$nextSibling = scope.$$prevSibling = null;
                }
            },
            reconnectScope: function(scope) {
                if (scope && scope.$root !== scope && scope.$$disconnected) {
                    var child = scope, parent = child.$parent;
                    child.$$disconnected = !1, child.$$prevSibling = parent.$$childTail, parent.$$childHead ? (parent.$$childTail.$$nextSibling = child, 
                    parent.$$childTail = child) : parent.$$childHead = parent.$$childTail = child;
                }
            },
            getClosest: function(el, tagName) {
                tagName = tagName.toUpperCase();
                do if (el.nodeName === tagName) return el; while (el = el.parentNode);
                return null;
            }
        };
    } ]), angular.element.prototype.focus = angular.element.prototype.focus || function() {
        return this.length && this[0].focus(), this;
    }, angular.element.prototype.blur = angular.element.prototype.blur || function() {
        return this.length && this[0].blur(), this;
    };
}(), function() {
    "use strict";
    function AriaService($$rAF, $log, $window) {
        function expect(element, attrName, defaultValue) {
            var node = element[0];
            node.hasAttribute(attrName) || childHasAttribute(node, attrName) || (defaultValue = angular.isString(defaultValue) && defaultValue.trim() || "", 
            defaultValue.length ? element.attr(attrName, defaultValue) : $log.warn('ARIA: Attribute "', attrName, '", required for accessibility, is missing on node:', node));
        }
        function expectAsync(element, attrName, defaultValueGetter) {
            $$rAF(function() {
                expect(element, attrName, defaultValueGetter());
            });
        }
        function expectWithText(element, attrName) {
            expectAsync(element, attrName, function() {
                return element.text().trim();
            });
        }
        function childHasAttribute(node, attrName) {
            function isHidden(el) {
                var style = el.currentStyle ? el.currentStyle : $window.getComputedStyle(el);
                return "none" === style.display;
            }
            var hasChildren = node.hasChildNodes(), hasAttr = !1;
            if (hasChildren) for (var children = node.childNodes, i = 0; i < children.length; i++) {
                var child = children[i];
                1 === child.nodeType && child.hasAttribute(attrName) && (isHidden(child) || (hasAttr = !0));
            }
            return hasAttr;
        }
        return {
            expect: expect,
            expectAsync: expectAsync,
            expectWithText: expectWithText
        };
    }
    angular.module("material.core").service("$mdAria", AriaService), AriaService.$inject = [ "$$rAF", "$log", "$window" ];
}(), function() {
    "use strict";
    function mdCompilerService($q, $http, $injector, $compile, $controller, $templateCache) {
        this.compile = function(options) {
            var templateUrl = options.templateUrl, template = options.template || "", controller = options.controller, controllerAs = options.controllerAs, resolve = options.resolve || {}, locals = options.locals || {}, transformTemplate = options.transformTemplate || angular.identity, bindToController = options.bindToController;
            return angular.forEach(resolve, function(value, key) {
                resolve[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value);
            }), angular.extend(resolve, locals), resolve.$template = templateUrl ? $http.get(templateUrl, {
                cache: $templateCache
            }).then(function(response) {
                return response.data;
            }) : $q.when(template), $q.all(resolve).then(function(locals) {
                var template = transformTemplate(locals.$template), element = angular.element("<div>").html(template.trim()).contents(), linkFn = $compile(element);
                return {
                    locals: locals,
                    element: element,
                    link: function(scope) {
                        if (locals.$scope = scope, controller) {
                            var ctrl = $controller(controller, locals);
                            bindToController && angular.extend(ctrl, locals), element.data("$ngControllerController", ctrl), 
                            element.children().data("$ngControllerController", ctrl), controllerAs && (scope[controllerAs] = ctrl);
                        }
                        return linkFn(scope);
                    }
                };
            });
        };
    }
    angular.module("material.core").service("$mdCompiler", mdCompilerService), mdCompilerService.$inject = [ "$q", "$http", "$injector", "$compile", "$controller", "$templateCache" ];
}(), function() {
    "use strict";
    function InterimElementProvider() {
        function createInterimElementProvider(interimFactoryName) {
            function setDefaults(definition) {
                return providerConfig.optionsFactory = definition.options, providerConfig.methods = (definition.methods || []).concat(EXPOSED_METHODS), 
                provider;
            }
            function addPreset(name, definition) {
                if (definition = definition || {}, definition.methods = definition.methods || [], 
                definition.options = definition.options || function() {
                    return {};
                }, /^cancel|hide|show$/.test(name)) throw new Error("Preset '" + name + "' in " + interimFactoryName + " is reserved!");
                if (definition.methods.indexOf("_options") > -1) throw new Error("Method '_options' in " + interimFactoryName + " is reserved!");
                return providerConfig.presets[name] = {
                    methods: definition.methods.concat(EXPOSED_METHODS),
                    optionsFactory: definition.options,
                    argOption: definition.argOption
                }, provider;
            }
            function factory($$interimElement, $animate, $injector) {
                function showInterimElement(opts) {
                    return opts && opts._options && (opts = opts._options), interimElementService.show(angular.extend({}, defaultOptions, opts));
                }
                function invokeFactory(factory, defaultVal) {
                    var locals = {};
                    return locals[interimFactoryName] = publicService, $injector.invoke(factory || function() {
                        return defaultVal;
                    }, {}, locals);
                }
                var defaultMethods, defaultOptions, interimElementService = $$interimElement(), publicService = {
                    hide: interimElementService.hide,
                    cancel: interimElementService.cancel,
                    show: showInterimElement
                };
                return defaultMethods = providerConfig.methods || [], defaultOptions = invokeFactory(providerConfig.optionsFactory, {}), 
                angular.forEach(providerConfig.presets, function(definition, name) {
                    function Preset(opts) {
                        this._options = angular.extend({}, presetDefaults, opts);
                    }
                    var presetDefaults = invokeFactory(definition.optionsFactory, {}), presetMethods = (definition.methods || []).concat(defaultMethods);
                    if (angular.extend(presetDefaults, {
                        $type: name
                    }), angular.forEach(presetMethods, function(name) {
                        Preset.prototype[name] = function(value) {
                            return this._options[name] = value, this;
                        };
                    }), definition.argOption) {
                        var methodName = "show" + name.charAt(0).toUpperCase() + name.slice(1);
                        publicService[methodName] = function(arg) {
                            var config = publicService[name](arg);
                            return publicService.show(config);
                        };
                    }
                    publicService[name] = function(arg) {
                        return arguments.length && definition.argOption && !angular.isObject(arg) && !angular.isArray(arg) ? new Preset()[definition.argOption](arg) : new Preset(arg);
                    };
                }), publicService;
            }
            var EXPOSED_METHODS = [ "onHide", "onShow", "onRemove" ], providerConfig = {
                presets: {}
            }, provider = {
                setDefaults: setDefaults,
                addPreset: addPreset,
                $get: factory
            };
            return provider.addPreset("build", {
                methods: [ "controller", "controllerAs", "resolve", "template", "templateUrl", "themable", "transformTemplate", "parent" ]
            }), factory.$inject = [ "$$interimElement", "$animate", "$injector" ], provider;
        }
        function InterimElementFactory($document, $q, $rootScope, $timeout, $rootElement, $animate, $interpolate, $mdCompiler, $mdTheming) {
            function replaceInterpolationSymbols(text) {
                return text && angular.isString(text) ? text.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol) : text;
            }
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), usesStandardSymbols = "{{" === startSymbol && "}}" === endSymbol, processTemplate = usesStandardSymbols ? angular.identity : replaceInterpolationSymbols;
            return function() {
                function show(options) {
                    stack.length && service.cancel();
                    var interimElement = new InterimElement(options);
                    return stack.push(interimElement), interimElement.show().then(function() {
                        return interimElement.deferred.promise;
                    });
                }
                function hide(response) {
                    var interimElement = stack.shift();
                    return interimElement && interimElement.remove().then(function() {
                        interimElement.deferred.resolve(response);
                    }), interimElement ? interimElement.deferred.promise : $q.when(response);
                }
                function cancel(reason) {
                    var interimElement = stack.shift();
                    return interimElement && interimElement.remove().then(function() {
                        interimElement.deferred.reject(reason);
                    }), interimElement ? interimElement.deferred.promise : $q.reject(reason);
                }
                function InterimElement(options) {
                    var self, hideTimeout, element;
                    return options = options || {}, options = angular.extend({
                        scope: options.scope || $rootScope.$new(options.isolateScope),
                        onShow: function(scope, element, options) {
                            return $animate.enter(element, options.parent);
                        },
                        onRemove: function(scope, element) {
                            return element && $animate.leave(element) || $q.when();
                        }
                    }, options), options.template && (options.template = processTemplate(options.template)), 
                    self = {
                        options: options,
                        deferred: $q.defer(),
                        show: function() {
                            return $mdCompiler.compile(options).then(function(compileData) {
                                function startHideTimeout() {
                                    options.hideDelay && (hideTimeout = $timeout(service.cancel, options.hideDelay));
                                }
                                angular.extend(compileData.locals, self.options), angular.isString(options.parent) ? options.parent = angular.element($document[0].querySelector(options.parent)) : options.parent || (options.parent = $rootElement.find("body"), 
                                options.parent.length || (options.parent = $rootElement)), element = compileData.link(options.scope), 
                                options.themable && $mdTheming(element);
                                var ret = options.onShow(options.scope, element, options);
                                return $q.when(ret).then(function() {
                                    (options.onComplete || angular.noop)(options.scope, element, options), startHideTimeout();
                                });
                            });
                        },
                        cancelTimeout: function() {
                            hideTimeout && ($timeout.cancel(hideTimeout), hideTimeout = void 0);
                        },
                        remove: function() {
                            self.cancelTimeout();
                            var ret = options.onRemove(options.scope, element, options);
                            return $q.when(ret).then(function() {
                                options.scope.$destroy();
                            });
                        }
                    };
                }
                var service, stack = [];
                return service = {
                    show: show,
                    hide: hide,
                    cancel: cancel
                };
            };
        }
        return createInterimElementProvider.$get = InterimElementFactory, InterimElementFactory.$inject = [ "$document", "$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$interpolate", "$mdCompiler", "$mdTheming" ], 
        createInterimElementProvider;
    }
    angular.module("material.core").provider("$$interimElement", InterimElementProvider);
}(), function() {
    "use strict";
    function ComponentRegistry($log, $q) {
        function isValidID(handle) {
            return handle && "" !== handle;
        }
        var self, instances = [], pendings = {};
        return self = {
            notFoundError: function(handle) {
                $log.error("No instance found for handle", handle);
            },
            getInstances: function() {
                return instances;
            },
            get: function(handle) {
                if (!isValidID(handle)) return null;
                var i, j, instance;
                for (i = 0, j = instances.length; j > i; i++) if (instance = instances[i], instance.$$mdHandle === handle) return instance;
                return null;
            },
            register: function(instance, handle) {
                function deregister() {
                    var index = instances.indexOf(instance);
                    -1 !== index && instances.splice(index, 1);
                }
                function resolveWhen() {
                    var dfd = pendings[handle];
                    dfd && (dfd.resolve(instance), delete pendings[handle]);
                }
                return handle ? (instance.$$mdHandle = handle, instances.push(instance), resolveWhen(), 
                deregister) : angular.noop;
            },
            when: function(handle) {
                if (isValidID(handle)) {
                    var deferred = $q.defer(), instance = self.get(handle);
                    return instance ? deferred.resolve(instance) : pendings[handle] = deferred, deferred.promise;
                }
                return $q.reject("Invalid `md-component-id` value.");
            }
        };
    }
    angular.module("material.core").factory("$mdComponentRegistry", ComponentRegistry), 
    ComponentRegistry.$inject = [ "$log", "$q" ];
}(), function() {
    "use strict";
    function InkRippleDirective($mdInkRipple) {
        return {
            controller: angular.noop,
            link: function(scope, element, attr) {
                attr.hasOwnProperty("mdInkRippleCheckbox") ? $mdInkRipple.attachCheckboxBehavior(scope, element) : $mdInkRipple.attachButtonBehavior(scope, element);
            }
        };
    }
    function InkRippleService($window, $timeout) {
        function attachButtonBehavior(scope, element, options) {
            return attach(scope, element, angular.extend({
                isFAB: element.hasClass("md-fab"),
                isMenuItem: element.hasClass("md-menu-item"),
                center: !1,
                dimBackground: !0
            }, options));
        }
        function attachCheckboxBehavior(scope, element, options) {
            return attach(scope, element, angular.extend({
                center: !0,
                dimBackground: !1
            }, options));
        }
        function attachTabBehavior(scope, element, options) {
            return attach(scope, element, angular.extend({
                center: !1,
                dimBackground: !0,
                outline: !0
            }, options));
        }
        function attach(scope, element, options) {
            function parseColor(color) {
                function hexToRGBA(color) {
                    var hex = "#" === color.charAt(0) ? color.substr(1) : color, dig = hex.length / 3, red = hex.substr(0, dig), grn = hex.substr(dig, dig), blu = hex.substr(2 * dig);
                    return 1 === dig && (red += red, grn += grn, blu += blu), "rgba(" + parseInt(red, 16) + "," + parseInt(grn, 16) + "," + parseInt(blu, 16) + ",0.1)";
                }
                function rgbToRGBA(color) {
                    return color.replace(")", ", 0.1)").replace("(", "a(");
                }
                if (color) return 0 === color.indexOf("rgba") ? color.replace(/\d?\.?\d*\s*\)\s*$/, "0.1)") : 0 === color.indexOf("rgb") ? rgbToRGBA(color) : 0 === color.indexOf("#") ? hexToRGBA(color) : void 0;
            }
            function removeElement(elem, wait) {
                ripples.splice(ripples.indexOf(elem), 1), 0 === ripples.length && rippleContainer && rippleContainer.css({
                    backgroundColor: ""
                }), $timeout(function() {
                    elem.remove();
                }, wait, !1);
            }
            function updateElement(elem) {
                var index = ripples.indexOf(elem), state = states[index] || {}, elemIsActive = ripples.length > 1 ? !1 : isActive, elemIsHeld = ripples.length > 1 ? !1 : isHeld;
                elemIsActive || state.animating || elemIsHeld ? elem.addClass("md-ripple-visible") : elem && (elem.removeClass("md-ripple-visible"), 
                options.outline && elem.css({
                    width: rippleSize + "px",
                    height: rippleSize + "px",
                    marginLeft: -1 * rippleSize + "px",
                    marginTop: -1 * rippleSize + "px"
                }), removeElement(elem, options.outline ? 450 : 650));
            }
            function createRipple(left, top) {
                function getRippleElement(css) {
                    var elem = angular.element('<div class="md-ripple" data-counter="' + counter++ + '">');
                    return ripples.unshift(elem), states.unshift({
                        animating: !0
                    }), container.append(elem), css && elem.css(css), elem;
                }
                function getRippleSize(left, top) {
                    var multiplier, size, rect, width = container.prop("offsetWidth"), height = container.prop("offsetHeight");
                    return options.isMenuItem ? size = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) : options.outline ? (rect = node.getBoundingClientRect(), 
                    left -= rect.left, top -= rect.top, width = Math.max(left, width - left), height = Math.max(top, height - top), 
                    size = 2 * Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))) : (multiplier = options.isFAB ? 1.1 : .8, 
                    size = Math.max(width, height) * multiplier), size;
                }
                function getRippleCss(size, left, top) {
                    function rgbaToRGB(color) {
                        return color.replace("rgba", "rgb").replace(/,[^\)\,]+\)/, ")");
                    }
                    var rect, css = {
                        backgroundColor: rgbaToRGB(color),
                        borderColor: rgbaToRGB(color),
                        width: size + "px",
                        height: size + "px"
                    };
                    return options.outline ? (css.width = 0, css.height = 0) : css.marginLeft = css.marginTop = size * -.5 + "px", 
                    options.center ? css.left = css.top = "50%" : (rect = node.getBoundingClientRect(), 
                    css.left = Math.round((left - rect.left) / container.prop("offsetWidth") * 100) + "%", 
                    css.top = Math.round((top - rect.top) / container.prop("offsetHeight") * 100) + "%"), 
                    css;
                }
                function getRippleContainer() {
                    if (rippleContainer) return rippleContainer;
                    var container = angular.element('<div class="md-ripple-container"></div>');
                    return rippleContainer = container, element.append(container), container;
                }
                color = parseColor(element.attr("md-ink-ripple")) || parseColor($window.getComputedStyle(options.colorElement[0]).color || "rgb(0, 0, 0)");
                var container = getRippleContainer(), size = getRippleSize(left, top), css = getRippleCss(size, left, top), elem = getRippleElement(css), index = ripples.indexOf(elem), state = states[index] || {};
                return rippleSize = size, state.animating = !0, $timeout(function() {
                    options.dimBackground && container.css({
                        backgroundColor: color
                    }), elem.addClass("md-ripple-placed md-ripple-scaled"), elem.css(options.outline ? {
                        borderWidth: .5 * size + "px",
                        marginLeft: size * -.5 + "px",
                        marginTop: size * -.5 + "px"
                    } : {
                        left: "50%",
                        top: "50%"
                    }), updateElement(elem), $timeout(function() {
                        state.animating = !1, updateElement(elem);
                    }, options.outline ? 450 : 225, !1);
                }, 0, !1), elem;
            }
            function onInput(ev) {
                function isRippleAllowed() {
                    function isDisabled(elem) {
                        return elem && elem.hasAttribute && elem.hasAttribute("disabled");
                    }
                    var parent = node.parentNode, grandparent = parent && parent.parentNode, ancestor = grandparent && grandparent.parentNode;
                    return !(isDisabled(node) || isDisabled(parent) || isDisabled(grandparent) || isDisabled(ancestor));
                }
                var ripple, index;
                ev.eventType === Hammer.INPUT_START && ev.isFirst && isRippleAllowed() ? (ripple = createRipple(ev.center.x, ev.center.y), 
                isHeld = !0) : ev.eventType === Hammer.INPUT_END && ev.isFinal && (isHeld = !1, 
                index = ripples.length - 1, ripple = ripples[index], $timeout(function() {
                    updateElement(ripple);
                }, 0, !1));
            }
            if (element.controller("mdNoInk")) return angular.noop;
            options = angular.extend({
                colorElement: element,
                mousedown: !0,
                hover: !0,
                focus: !0,
                center: !1,
                mousedownPauseTime: 150,
                dimBackground: !1,
                outline: !1,
                isFAB: !1,
                isMenuItem: !1
            }, options);
            var rippleContainer, rippleSize, controller = element.controller("mdInkRipple") || {}, counter = 0, ripples = [], states = [], isActiveExpr = element.attr("md-highlight"), isActive = !1, isHeld = !1, node = element[0], hammertime = new Hammer(node), color = parseColor(element.attr("md-ink-ripple")) || parseColor($window.getComputedStyle(options.colorElement[0]).color || "rgb(0, 0, 0)");
            return scope._onInput = onInput, options.mousedown && hammertime.on("hammer.input", onInput), 
            controller.createRipple = createRipple, isActiveExpr && scope.$watch(isActiveExpr, function(newValue) {
                isActive = newValue, isActive && !ripples.length && $timeout(function() {
                    createRipple(0, 0);
                }, 0, !1), angular.forEach(ripples, updateElement);
            }), function() {
                hammertime.destroy(), rippleContainer && rippleContainer.remove();
            };
        }
        return {
            attachButtonBehavior: attachButtonBehavior,
            attachCheckboxBehavior: attachCheckboxBehavior,
            attachTabBehavior: attachTabBehavior,
            attach: attach
        };
    }
    function attrNoDirective() {
        return function() {
            return {
                controller: angular.noop
            };
        };
    }
    angular.module("material.core").factory("$mdInkRipple", InkRippleService).directive("mdInkRipple", InkRippleDirective).directive("mdNoInk", attrNoDirective()).directive("mdNoBar", attrNoDirective()).directive("mdNoStretch", attrNoDirective()), 
    InkRippleDirective.$inject = [ "$mdInkRipple" ], InkRippleService.$inject = [ "$window", "$timeout" ];
}(), function() {
    "use strict";
    angular.module("material.core.theming.palette", []).constant("$mdColorPalette", {
        red: {
            "50": "#ffebee",
            "100": "#ffcdd2",
            "200": "#ef9a9a",
            "300": "#e57373",
            "400": "#ef5350",
            "500": "#f44336",
            "600": "#e53935",
            "700": "#d32f2f",
            "800": "#c62828",
            "900": "#b71c1c",
            A100: "#ff8a80",
            A200: "#ff5252",
            A400: "#ff1744",
            A700: "#d50000",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 300 400 A100"
        },
        pink: {
            "50": "#fce4ec",
            "100": "#f8bbd0",
            "200": "#f48fb1",
            "300": "#f06292",
            "400": "#ec407a",
            "500": "#e91e63",
            "600": "#d81b60",
            "700": "#c2185b",
            "800": "#ad1457",
            "900": "#880e4f",
            A100: "#ff80ab",
            A200: "#ff4081",
            A400: "#f50057",
            A700: "#c51162",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 300 400 A100"
        },
        purple: {
            "50": "#f3e5f5",
            "100": "#e1bee7",
            "200": "#ce93d8",
            "300": "#ba68c8",
            "400": "#ab47bc",
            "500": "#9c27b0",
            "600": "#8e24aa",
            "700": "#7b1fa2",
            "800": "#6a1b9a",
            "900": "#4a148c",
            A100: "#ea80fc",
            A200: "#e040fb",
            A400: "#d500f9",
            A700: "#aa00ff",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 A100"
        },
        "deep-purple": {
            "50": "#ede7f6",
            "100": "#d1c4e9",
            "200": "#b39ddb",
            "300": "#9575cd",
            "400": "#7e57c2",
            "500": "#673ab7",
            "600": "#5e35b1",
            "700": "#512da8",
            "800": "#4527a0",
            "900": "#311b92",
            A100: "#b388ff",
            A200: "#7c4dff",
            A400: "#651fff",
            A700: "#6200ea",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 A100"
        },
        indigo: {
            "50": "#e8eaf6",
            "100": "#c5cae9",
            "200": "#9fa8da",
            "300": "#7986cb",
            "400": "#5c6bc0",
            "500": "#3f51b5",
            "600": "#3949ab",
            "700": "#303f9f",
            "800": "#283593",
            "900": "#1a237e",
            A100: "#8c9eff",
            A200: "#536dfe",
            A400: "#3d5afe",
            A700: "#304ffe",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 A100"
        },
        blue: {
            "50": "#e3f2fd",
            "100": "#bbdefb",
            "200": "#90caf9",
            "300": "#64b5f6",
            "400": "#42a5f5",
            "500": "#2196f3",
            "600": "#1e88e5",
            "700": "#1976d2",
            "800": "#1565c0",
            "900": "#0d47a1",
            A100: "#82b1ff",
            A200: "#448aff",
            A400: "#2979ff",
            A700: "#2962ff",
            contrastDefaultColor: "light",
            contrastDarkColors: "100 200 300 400 A100"
        },
        "light-blue": {
            "50": "#e1f5fe",
            "100": "#b3e5fc",
            "200": "#81d4fa",
            "300": "#4fc3f7",
            "400": "#29b6f6",
            "500": "#03a9f4",
            "600": "#039be5",
            "700": "#0288d1",
            "800": "#0277bd",
            "900": "#01579b",
            A100: "#80d8ff",
            A200: "#40c4ff",
            A400: "#00b0ff",
            A700: "#0091ea",
            contrastDefaultColor: "dark",
            contrastLightColors: "500 600 700 800 900 A700"
        },
        cyan: {
            "50": "#e0f7fa",
            "100": "#b2ebf2",
            "200": "#80deea",
            "300": "#4dd0e1",
            "400": "#26c6da",
            "500": "#00bcd4",
            "600": "#00acc1",
            "700": "#0097a7",
            "800": "#00838f",
            "900": "#006064",
            A100: "#84ffff",
            A200: "#18ffff",
            A400: "#00e5ff",
            A700: "#00b8d4",
            contrastDefaultColor: "dark",
            contrastLightColors: "500 600 700 800 900"
        },
        teal: {
            "50": "#e0f2f1",
            "100": "#b2dfdb",
            "200": "#80cbc4",
            "300": "#4db6ac",
            "400": "#26a69a",
            "500": "#009688",
            "600": "#00897b",
            "700": "#00796b",
            "800": "#00695c",
            "900": "#004d40",
            A100: "#a7ffeb",
            A200: "#64ffda",
            A400: "#1de9b6",
            A700: "#00bfa5",
            contrastDefaultColor: "dark",
            contrastLightColors: "500 600 700 800 900"
        },
        green: {
            "50": "#e8f5e9",
            "100": "#c8e6c9",
            "200": "#a5d6a7",
            "300": "#81c784",
            "400": "#66bb6a",
            "500": "#4caf50",
            "600": "#43a047",
            "700": "#388e3c",
            "800": "#2e7d32",
            "900": "#1b5e20",
            A100: "#b9f6ca",
            A200: "#69f0ae",
            A400: "#00e676",
            A700: "#00c853",
            contrastDefaultColor: "dark",
            contrastLightColors: "500 600 700 800 900"
        },
        "light-green": {
            "50": "#f1f8e9",
            "100": "#dcedc8",
            "200": "#c5e1a5",
            "300": "#aed581",
            "400": "#9ccc65",
            "500": "#8bc34a",
            "600": "#7cb342",
            "700": "#689f38",
            "800": "#558b2f",
            "900": "#33691e",
            A100: "#ccff90",
            A200: "#b2ff59",
            A400: "#76ff03",
            A700: "#64dd17",
            contrastDefaultColor: "dark",
            contrastLightColors: "800 900"
        },
        lime: {
            "50": "#f9fbe7",
            "100": "#f0f4c3",
            "200": "#e6ee9c",
            "300": "#dce775",
            "400": "#d4e157",
            "500": "#cddc39",
            "600": "#c0ca33",
            "700": "#afb42b",
            "800": "#9e9d24",
            "900": "#827717",
            A100: "#f4ff81",
            A200: "#eeff41",
            A400: "#c6ff00",
            A700: "#aeea00",
            contrastDefaultColor: "dark",
            contrastLightColors: "900"
        },
        yellow: {
            "50": "#fffde7",
            "100": "#fff9c4",
            "200": "#fff59d",
            "300": "#fff176",
            "400": "#ffee58",
            "500": "#ffeb3b",
            "600": "#fdd835",
            "700": "#fbc02d",
            "800": "#f9a825",
            "900": "#f57f17",
            A100: "#ffff8d",
            A200: "#ffff00",
            A400: "#ffea00",
            A700: "#ffd600",
            contrastDefaultColor: "dark"
        },
        amber: {
            "50": "#fff8e1",
            "100": "#ffecb3",
            "200": "#ffe082",
            "300": "#ffd54f",
            "400": "#ffca28",
            "500": "#ffc107",
            "600": "#ffb300",
            "700": "#ffa000",
            "800": "#ff8f00",
            "900": "#ff6f00",
            A100: "#ffe57f",
            A200: "#ffd740",
            A400: "#ffc400",
            A700: "#ffab00",
            contrastDefaultColor: "dark"
        },
        orange: {
            "50": "#fff3e0",
            "100": "#ffe0b2",
            "200": "#ffcc80",
            "300": "#ffb74d",
            "400": "#ffa726",
            "500": "#ff9800",
            "600": "#fb8c00",
            "700": "#f57c00",
            "800": "#ef6c00",
            "900": "#e65100",
            A100: "#ffd180",
            A200: "#ffab40",
            A400: "#ff9100",
            A700: "#ff6d00",
            contrastDefaultColor: "dark",
            contrastLightColors: "800 900"
        },
        "deep-orange": {
            "50": "#fbe9e7",
            "100": "#ffccbc",
            "200": "#ffab91",
            "300": "#ff8a65",
            "400": "#ff7043",
            "500": "#ff5722",
            "600": "#f4511e",
            "700": "#e64a19",
            "800": "#d84315",
            "900": "#bf360c",
            A100: "#ff9e80",
            A200: "#ff6e40",
            A400: "#ff3d00",
            A700: "#dd2c00",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 300 400 A100 A200"
        },
        brown: {
            "50": "#efebe9",
            "100": "#d7ccc8",
            "200": "#bcaaa4",
            "300": "#a1887f",
            "400": "#8d6e63",
            "500": "#795548",
            "600": "#6d4c41",
            "700": "#5d4037",
            "800": "#4e342e",
            "900": "#3e2723",
            A100: "#d7ccc8",
            A200: "#bcaaa4",
            A400: "#8d6e63",
            A700: "#5d4037",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200"
        },
        grey: {
            "0": "#ffffff",
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "1000": "#000000",
            A100: "#ffffff",
            A200: "#eeeeee",
            A400: "#bdbdbd",
            A700: "#616161",
            contrastDefaultColor: "dark",
            contrastLightColors: "600 700 800 900"
        },
        "blue-grey": {
            "50": "#eceff1",
            "100": "#cfd8dc",
            "200": "#b0bec5",
            "300": "#90a4ae",
            "400": "#78909c",
            "500": "#607d8b",
            "600": "#546e7a",
            "700": "#455a64",
            "800": "#37474f",
            "900": "#263238",
            A100: "#cfd8dc",
            A200: "#b0bec5",
            A400: "#78909c",
            A700: "#455a64",
            contrastDefaultColor: "light",
            contrastDarkColors: "50 100 200 300"
        }
    });
}(), function() {
    "use strict";
    function ThemingProvider($mdColorPalette) {
        function definePalette(name, map) {
            return map = map || {}, PALETTES[name] = checkPaletteValid(name, map), themingProvider;
        }
        function extendPalette(name, map) {
            return checkPaletteValid(name, angular.extend({}, PALETTES[name] || {}, map));
        }
        function checkPaletteValid(name, map) {
            var missingColors = VALID_HUE_VALUES.filter(function(field) {
                return !map[field];
            });
            if (missingColors.length) throw new Error("Missing colors %1 in palette %2!".replace("%1", missingColors.join(", ")).replace("%2", name));
            return map;
        }
        function registerTheme(name, inheritFrom) {
            if (inheritFrom = inheritFrom || "default", THEMES[name]) return THEMES[name];
            var parentTheme = "string" == typeof inheritFrom ? THEMES[inheritFrom] : inheritFrom, theme = new Theme(name);
            return parentTheme && angular.forEach(parentTheme.colors, function(color, colorType) {
                theme.colors[colorType] = {
                    name: color.name,
                    hues: angular.extend({}, color.hues)
                };
            }), THEMES[name] = theme, theme;
        }
        function Theme(name) {
            function setDark(isDark) {
                if (isDark = 0 === arguments.length ? !0 : !!isDark, isDark !== self.isDark) {
                    self.isDark = isDark, self.foregroundPalette = self.isDark ? LIGHT_FOREGROUND : DARK_FOREGROUND, 
                    self.foregroundShadow = self.isDark ? DARK_SHADOW : LIGHT_SHADOW;
                    var newDefaultHues = self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES, oldDefaultHues = self.isDark ? LIGHT_DEFAULT_HUES : DARK_DEFAULT_HUES;
                    return angular.forEach(newDefaultHues, function(newDefaults, colorType) {
                        var color = self.colors[colorType], oldDefaults = oldDefaultHues[colorType];
                        if (color) for (var hueName in color.hues) color.hues[hueName] === oldDefaults[hueName] && (color.hues[hueName] = newDefaults[hueName]);
                    }), self;
                }
            }
            var self = this;
            self.name = name, self.colors = {}, self.dark = setDark, setDark(!1), THEME_COLOR_TYPES.forEach(function(colorType) {
                var defaultHues = (self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES)[colorType];
                self[colorType + "Color"] = function(paletteName, hues) {
                    var color = self.colors[colorType] = {
                        name: paletteName,
                        hues: angular.extend({}, defaultHues, hues)
                    };
                    return Object.keys(color.hues).forEach(function(name) {
                        if (!defaultHues[name]) throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4".replace("%1", name).replace("%2", self.name).replace("%3", paletteName).replace("%4", Object.keys(defaultHues).join(", ")));
                    }), Object.keys(color.hues).map(function(key) {
                        return color.hues[key];
                    }).forEach(function(hueValue) {
                        if (-1 == VALID_HUE_VALUES.indexOf(hueValue)) throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5".replace("%1", hueValue).replace("%2", self.name).replace("%3", colorType).replace("%4", paletteName).replace("%5", VALID_HUE_VALUES.join(", ")));
                    }), self;
                };
            });
        }
        function ThemingService($rootScope) {
            function applyTheme(scope, el) {
                void 0 === el && (el = scope, scope = void 0), void 0 === scope && (scope = $rootScope), 
                applyTheme.inherit(el, el);
            }
            return applyTheme.inherit = function(el, parent) {
                function changeTheme(theme) {
                    var oldTheme = el.data("$mdThemeName");
                    oldTheme && el.removeClass("md-" + oldTheme + "-theme"), el.addClass("md-" + theme + "-theme"), 
                    el.data("$mdThemeName", theme);
                }
                var ctrl = parent.controller("mdTheme"), attrThemeValue = el.attr("md-theme-watch");
                if ((alwaysWatchTheme || angular.isDefined(attrThemeValue)) && "false" != attrThemeValue) {
                    var deregisterWatch = $rootScope.$watch(function() {
                        return ctrl && ctrl.$mdTheme || defaultTheme;
                    }, changeTheme);
                    el.on("$destroy", deregisterWatch);
                } else {
                    var theme = ctrl && ctrl.$mdTheme || defaultTheme;
                    changeTheme(theme);
                }
            }, applyTheme;
        }
        PALETTES = {}, THEMES = {};
        var defaultTheme = "default", alwaysWatchTheme = !1;
        return angular.extend(PALETTES, $mdColorPalette), ThemingService.$inject = [ "$rootScope" ], 
        themingProvider = {
            definePalette: definePalette,
            extendPalette: extendPalette,
            theme: registerTheme,
            setDefaultTheme: function(theme) {
                defaultTheme = theme;
            },
            alwaysWatchTheme: function(alwaysWatch) {
                alwaysWatchTheme = alwaysWatch;
            },
            $get: ThemingService,
            _LIGHT_DEFAULT_HUES: LIGHT_DEFAULT_HUES,
            _DARK_DEFAULT_HUES: DARK_DEFAULT_HUES,
            _PALETTES: PALETTES,
            _THEMES: THEMES,
            _parseRules: parseRules,
            _rgba: rgba
        };
    }
    function ThemingDirective($interpolate) {
        return {
            priority: 100,
            link: {
                pre: function(scope, el, attrs) {
                    var ctrl = {
                        $setTheme: function(theme) {
                            ctrl.$mdTheme = theme;
                        }
                    };
                    el.data("$mdThemeController", ctrl), ctrl.$setTheme($interpolate(attrs.mdTheme)(scope)), 
                    attrs.$observe("mdTheme", ctrl.$setTheme);
                }
            }
        };
    }
    function ThemableDirective($mdTheming) {
        return $mdTheming;
    }
    function parseRules(theme, colorType, rules) {
        checkValidPalette(theme, colorType), rules = rules.replace(/THEME_NAME/g, theme.name);
        var generatedRules = [], color = theme.colors[colorType], themeNameRegex = new RegExp(".md-" + theme.name + "-theme", "g"), hueRegex = new RegExp("('|\")?{{\\s*(" + colorType + ")-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}(\"|')?", "g"), simpleVariableRegex = /'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue\-[0-3]|shadow)-?(\d\.?\d*)?\s*\}\}'?"?/g, palette = PALETTES[color.name];
        return rules = rules.replace(simpleVariableRegex, function(match, colorType, hue, opacity) {
            return "foreground" === colorType ? "shadow" == hue ? theme.foregroundShadow : theme.foregroundPalette[hue] || theme.foregroundPalette[1] : (0 === hue.indexOf("hue") && (hue = theme.colors[colorType].hues[hue]), 
            rgba((PALETTES[theme.colors[colorType].name][hue] || "").value, opacity));
        }), angular.forEach(color.hues, function(hueValue, hueName) {
            var newRule = rules.replace(hueRegex, function(match, _, colorType, hueType, opacity) {
                return rgba(palette[hueValue]["color" === hueType ? "value" : "contrast"], opacity);
            });
            "default" !== hueName && (newRule = newRule.replace(themeNameRegex, ".md-" + theme.name + "-theme.md-" + hueName)), 
            generatedRules.push(newRule);
        }), generatedRules.join("");
    }
    function generateThemes($injector) {
        function sanitizePalette(palette) {
            var defaultContrast = palette.contrastDefaultColor, lightColors = palette.contrastLightColors || [], darkColors = palette.contrastDarkColors || [];
            "string" == typeof lightColors && (lightColors = lightColors.split(" ")), "string" == typeof darkColors && (darkColors = darkColors.split(" ")), 
            delete palette.contrastDefaultColor, delete palette.contrastLightColors, delete palette.contrastDarkColors, 
            angular.forEach(palette, function(hueValue, hueName) {
                function getContrastColor() {
                    return "light" === defaultContrast ? darkColors.indexOf(hueName) > -1 ? DARK_CONTRAST_COLOR : LIGHT_CONTRAST_COLOR : lightColors.indexOf(hueName) > -1 ? LIGHT_CONTRAST_COLOR : DARK_CONTRAST_COLOR;
                }
                if (!angular.isObject(hueValue)) {
                    var rgbValue = colorToRgbaArray(hueValue);
                    if (!rgbValue) throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected.".replace("%1", hueValue).replace("%2", palette.name).replace("%3", hueName));
                    palette[hueName] = {
                        value: rgbValue,
                        contrast: getContrastColor()
                    };
                }
            });
        }
        var themeCss = $injector.has("$MD_THEME_CSS") ? $injector.get("$MD_THEME_CSS") : "";
        angular.forEach(PALETTES, sanitizePalette);
        var rules = themeCss.split(/\}(?!(\}|'|"|;))/).filter(function(rule) {
            return rule && rule.length;
        }).map(function(rule) {
            return rule.trim() + "}";
        }), rulesByType = {};
        THEME_COLOR_TYPES.forEach(function(type) {
            rulesByType[type] = "";
        });
        var ruleMatchRegex = new RegExp("md-(" + THEME_COLOR_TYPES.join("|") + ")", "g");
        rules.forEach(function(rule) {
            for (var type, i = (rule.match(ruleMatchRegex), 0); type = THEME_COLOR_TYPES[i]; i++) if (rule.indexOf(".md-" + type) > -1) return rulesByType[type] += rule;
            for (i = 0; type = THEME_COLOR_TYPES[i]; i++) if (rule.indexOf(type) > -1) return rulesByType[type] += rule;
            return rulesByType[DEFAULT_COLOR_TYPE] += rule;
        });
        var styleString = "";
        if (angular.forEach(THEMES, function(theme) {
            THEME_COLOR_TYPES.forEach(function(colorType) {
                styleString += parseRules(theme, colorType, rulesByType[colorType] + "");
            });
        }), !generationIsDone) {
            var style = document.createElement("style");
            style.innerHTML = styleString;
            var head = document.getElementsByTagName("head")[0];
            head.insertBefore(style, head.firstElementChild), generationIsDone = !0;
        }
    }
    function checkValidPalette(theme, colorType) {
        if (!PALETTES[(theme.colors[colorType] || {}).name]) throw new Error("You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3".replace("%1", theme.name).replace("%2", colorType).replace("%3", Object.keys(PALETTES).join(", ")));
    }
    function colorToRgbaArray(clr) {
        if (angular.isArray(clr) && 3 == clr.length) return clr;
        if (/^rgb/.test(clr)) return clr.replace(/(^\s*rgba?\(|\)\s*$)/g, "").split(",").map(function(value) {
            return parseInt(value, 10);
        });
        if ("#" == clr.charAt(0) && (clr = clr.substring(1)), /^([a-fA-F0-9]{3}){1,2}$/g.test(clr)) {
            var dig = clr.length / 3, red = clr.substr(0, dig), grn = clr.substr(dig, dig), blu = clr.substr(2 * dig);
            return 1 === dig && (red += red, grn += grn, blu += blu), [ parseInt(red, 16), parseInt(grn, 16), parseInt(blu, 16) ];
        }
    }
    function rgba(rgbArray, opacity) {
        return 4 == rgbArray.length && (opacity = rgbArray.pop()), opacity && opacity.length ? "rgba(" + rgbArray.join(",") + "," + opacity + ")" : "rgb(" + rgbArray.join(",") + ")";
    }
    angular.module("material.core.theming", [ "material.core.theming.palette" ]).directive("mdTheme", ThemingDirective).directive("mdThemable", ThemableDirective).provider("$mdTheming", ThemingProvider).run(generateThemes);
    var PALETTES, THEMES, themingProvider, generationIsDone, DARK_FOREGROUND = {
        name: "dark",
        "1": "rgba(0,0,0,0.87)",
        "2": "rgba(0,0,0,0.54)",
        "3": "rgba(0,0,0,0.26)",
        "4": "rgba(0,0,0,0.12)"
    }, LIGHT_FOREGROUND = {
        name: "light",
        "1": "rgba(255,255,255,1.0)",
        "2": "rgba(255,255,255,0.7)",
        "3": "rgba(255,255,255,0.3)",
        "4": "rgba(255,255,255,0.12)"
    }, DARK_SHADOW = "1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)", LIGHT_SHADOW = "", DARK_CONTRAST_COLOR = colorToRgbaArray("rgba(0,0,0,0.87)"), LIGHT_CONTRAST_COLOR = colorToRgbaArray("rgb(255,255,255)"), THEME_COLOR_TYPES = [ "primary", "accent", "warn", "background" ], DEFAULT_COLOR_TYPE = "primary", LIGHT_DEFAULT_HUES = {
        accent: {
            "default": "A700",
            "hue-1": "A200",
            "hue-2": "A400",
            "hue-3": "A100"
        }
    }, DARK_DEFAULT_HUES = {
        background: {
            "default": "500",
            "hue-1": "300",
            "hue-2": "600",
            "hue-3": "800"
        }
    };
    THEME_COLOR_TYPES.forEach(function(colorType) {
        var defaultDefaultHues = {
            "default": "500",
            "hue-1": "300",
            "hue-2": "800",
            "hue-3": "A100"
        };
        LIGHT_DEFAULT_HUES[colorType] || (LIGHT_DEFAULT_HUES[colorType] = defaultDefaultHues), 
        DARK_DEFAULT_HUES[colorType] || (DARK_DEFAULT_HUES[colorType] = defaultDefaultHues);
    });
    var VALID_HUE_VALUES = [ "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "A100", "A200", "A400", "A700" ];
    ThemingProvider.$inject = [ "$mdColorPalette" ], ThemingDirective.$inject = [ "$interpolate" ], 
    ThemableDirective.$inject = [ "$mdTheming" ], generateThemes.$inject = [ "$injector" ];
}(), function() {
    "use strict";
    function BackdropDirective($mdTheming) {
        return $mdTheming;
    }
    angular.module("material.components.backdrop", [ "material.core" ]).directive("mdBackdrop", BackdropDirective), 
    BackdropDirective.$inject = [ "$mdTheming" ];
}(), function() {
    "use strict";
    function MdBottomSheetDirective() {
        return {
            restrict: "E"
        };
    }
    function MdBottomSheetProvider($$interimElementProvider) {
        function bottomSheetDefaults($animate, $mdConstant, $timeout, $$rAF, $compile, $mdTheming, $mdBottomSheet, $rootElement) {
            function onShow(scope, element, options) {
                backdrop = $compile('<md-backdrop class="md-opaque md-bottom-sheet-backdrop">')(scope), 
                backdrop.on("click touchstart", function() {
                    $timeout($mdBottomSheet.cancel);
                }), $mdTheming.inherit(backdrop, options.parent), $animate.enter(backdrop, options.parent, null);
                var bottomSheet = new BottomSheet(element);
                return options.bottomSheet = bottomSheet, options.targetEvent && angular.element(options.targetEvent.target).blur(), 
                $mdTheming.inherit(bottomSheet.element, options.parent), $animate.enter(bottomSheet.element, options.parent).then(function() {
                    var focusable = angular.element(element[0].querySelector("button") || element[0].querySelector("a") || element[0].querySelector("[ng-click]"));
                    focusable.focus(), options.escapeToClose && (options.rootElementKeyupCallback = function(e) {
                        e.keyCode === $mdConstant.KEY_CODE.ESCAPE && $timeout($mdBottomSheet.cancel);
                    }, $rootElement.on("keyup", options.rootElementKeyupCallback));
                });
            }
            function onRemove(scope, element, options) {
                var bottomSheet = options.bottomSheet;
                return $animate.leave(backdrop), $animate.leave(bottomSheet.element).then(function() {
                    bottomSheet.cleanup(), options.targetEvent && angular.element(options.targetEvent.target).focus();
                });
            }
            function BottomSheet(element) {
                function onTouchStart(e) {
                    e.preventDefault(), startTarget = e.target, startY = getY(e), transitionDelay = element.css($mdConstant.CSS.TRANSITION_DURATION), 
                    element.css($mdConstant.CSS.TRANSITION_DURATION, "0s");
                }
                function onTouchEnd(e) {
                    element.css($mdConstant.CSS.TRANSITION_DURATION, transitionDelay);
                    var currentY = getY(e);
                    Math.abs(currentY - startY) < 5 && e.target == startTarget ? angular.element(e.target).triggerHandler("click") : velocity > CLOSING_VELOCITY ? $timeout($mdBottomSheet.cancel) : setTransformY(void 0);
                }
                function onTouchMove(e) {
                    var currentY = getY(e), delta = currentY - startY;
                    velocity = currentY - lastY, lastY = currentY, delta = adjustedDelta(delta), setTransformY(delta + MAX_OFFSET);
                }
                function getY(e) {
                    var touch = e.touches && e.touches.length ? e.touches[0] : e.changedTouches[0];
                    return touch.clientY;
                }
                function setTransformY(amt) {
                    null === amt || void 0 === amt ? element.css($mdConstant.CSS.TRANSFORM, "") : element.css($mdConstant.CSS.TRANSFORM, "translate3d(0, " + amt + "px, 0)");
                }
                function adjustedDelta(delta) {
                    if (0 > delta && -MAX_OFFSET + WIGGLE_AMOUNT > delta) {
                        delta = -delta;
                        var base = MAX_OFFSET - WIGGLE_AMOUNT;
                        delta = Math.max(-MAX_OFFSET, -Math.min(MAX_OFFSET - 5, base + WIGGLE_AMOUNT * (delta - base) / MAX_OFFSET) - delta / 50);
                    }
                    return delta;
                }
                var startY, lastY, velocity, transitionDelay, startTarget, MAX_OFFSET = 80, WIGGLE_AMOUNT = 20, CLOSING_VELOCITY = 10;
                return element = element.eq(0), element.on("touchstart", onTouchStart).on("touchmove", onTouchMove).on("touchend", onTouchEnd), 
                {
                    element: element,
                    cleanup: function() {
                        element.off("touchstart", onTouchStart).off("touchmove", onTouchMove).off("touchend", onTouchEnd);
                    }
                };
            }
            var backdrop;
            return {
                themable: !0,
                targetEvent: null,
                onShow: onShow,
                onRemove: onRemove,
                escapeToClose: !0
            };
        }
        return bottomSheetDefaults.$inject = [ "$animate", "$mdConstant", "$timeout", "$$rAF", "$compile", "$mdTheming", "$mdBottomSheet", "$rootElement" ], 
        $$interimElementProvider("$mdBottomSheet").setDefaults({
            options: bottomSheetDefaults
        });
    }
    angular.module("material.components.bottomSheet", [ "material.core", "material.components.backdrop" ]).directive("mdBottomSheet", MdBottomSheetDirective).provider("$mdBottomSheet", MdBottomSheetProvider), 
    MdBottomSheetProvider.$inject = [ "$$interimElementProvider" ];
}(), function() {
    "use strict";
    function MdButtonDirective($mdInkRipple, $mdTheming, $mdAria) {
        function isAnchor(attr) {
            return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref);
        }
        function getTemplate(element, attr) {
            return isAnchor(attr) ? '<a class="md-button" ng-transclude></a>' : '<button class="md-button" ng-transclude></button>';
        }
        function postLink(scope, element, attr) {
            var node = element[0];
            $mdTheming(element), $mdInkRipple.attachButtonBehavior(scope, element);
            var elementHasText = node.textContent.trim();
            elementHasText || $mdAria.expect(element, "aria-label"), isAnchor(attr) && angular.isDefined(attr.ngDisabled) && scope.$watch(attr.ngDisabled, function(isDisabled) {
                element.attr("tabindex", isDisabled ? -1 : 0);
            });
        }
        return {
            restrict: "E",
            replace: !0,
            transclude: !0,
            template: getTemplate,
            link: postLink
        };
    }
    angular.module("material.components.button", [ "material.core" ]).directive("mdButton", MdButtonDirective), 
    MdButtonDirective.$inject = [ "$mdInkRipple", "$mdTheming", "$mdAria" ];
}(), function() {
    "use strict";
    function MdCheckboxDirective(inputDirective, $mdInkRipple, $mdAria, $mdConstant, $mdTheming, $mdUtil) {
        function compile(tElement, tAttrs) {
            return tAttrs.type = "checkbox", tAttrs.tabIndex = 0, tElement.attr("role", tAttrs.type), 
            function(scope, element, attr, ngModelCtrl) {
                function keypressHandler(ev) {
                    ev.which === $mdConstant.KEY_CODE.SPACE && (ev.preventDefault(), listener(ev));
                }
                function listener(ev) {
                    element[0].hasAttribute("disabled") || scope.$apply(function() {
                        checked = !checked, ngModelCtrl.$setViewValue(checked, ev && ev.type), ngModelCtrl.$render();
                    });
                }
                function render() {
                    checked = ngModelCtrl.$viewValue, checked ? element.addClass(CHECKED_CSS) : element.removeClass(CHECKED_CSS);
                }
                ngModelCtrl = ngModelCtrl || $mdUtil.fakeNgModel();
                var checked = !1;
                $mdTheming(element), $mdAria.expectWithText(tElement, "aria-label"), inputDirective.link.pre(scope, {
                    on: angular.noop,
                    0: {}
                }, attr, [ ngModelCtrl ]), attr.mdNoClick || element.on("click", listener), element.on("keypress", keypressHandler), 
                ngModelCtrl.$render = render;
            };
        }
        inputDirective = inputDirective[0];
        var CHECKED_CSS = "md-checked";
        return {
            restrict: "E",
            transclude: !0,
            require: "?ngModel",
            template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',
            compile: compile
        };
    }
    angular.module("material.components.checkbox", [ "material.core" ]).directive("mdCheckbox", MdCheckboxDirective), 
    MdCheckboxDirective.$inject = [ "inputDirective", "$mdInkRipple", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil" ];
}(), function() {
    "use strict";
    function mdCardDirective($mdTheming) {
        return {
            restrict: "E",
            link: function($scope, $element) {
                $mdTheming($element);
            }
        };
    }
    angular.module("material.components.card", [ "material.core" ]).directive("mdCard", mdCardDirective), 
    mdCardDirective.$inject = [ "$mdTheming" ];
}(), function() {
    "use strict";
    function mdContentDirective($mdTheming) {
        function ContentController($scope, $element) {
            this.$scope = $scope, this.$element = $element;
        }
        return {
            restrict: "E",
            controller: [ "$scope", "$element", ContentController ],
            link: function($scope, $element) {
                $mdTheming($element), $scope.$broadcast("$mdContentLoaded", $element);
            }
        };
    }
    angular.module("material.components.content", [ "material.core" ]).directive("mdContent", mdContentDirective), 
    mdContentDirective.$inject = [ "$mdTheming" ];
}(), function() {
    "use strict";
    function MdDialogDirective($$rAF, $mdTheming) {
        return {
            restrict: "E",
            link: function(scope, element) {
                $mdTheming(element), $$rAF(function() {
                    var content = element[0].querySelector("md-content");
                    content && content.scrollHeight > content.clientHeight && element.addClass("md-content-overflow");
                });
            }
        };
    }
    function MdDialogProvider($$interimElementProvider) {
        function advancedDialogOptions($mdDialog) {
            return {
                template: [ '<md-dialog aria-label="{{ dialog.ariaLabel }}">', "<md-content>", "<h2>{{ dialog.title }}</h2>", "<p>{{ dialog.content }}</p>", "</md-content>", '<div class="md-actions">', '<md-button ng-if="dialog.$type == \'confirm\'" ng-click="dialog.abort()">', "{{ dialog.cancel }}", "</md-button>", '<md-button ng-click="dialog.hide()" class="md-primary">', "{{ dialog.ok }}", "</md-button>", "</div>", "</md-dialog>" ].join(""),
                controller: function() {
                    this.hide = function() {
                        $mdDialog.hide(!0);
                    }, this.abort = function() {
                        $mdDialog.cancel();
                    };
                },
                controllerAs: "dialog",
                bindToController: !0
            };
        }
        function dialogDefaultOptions($timeout, $rootElement, $compile, $animate, $mdAria, $document, $mdUtil, $mdConstant, $mdTheming, $$rAF, $q, $mdDialog) {
            function onShow(scope, element, options) {
                function findCloseButton() {
                    var closeButton = element[0].querySelector(".dialog-close");
                    if (!closeButton) {
                        var actionButtons = element[0].querySelectorAll(".md-actions button");
                        closeButton = actionButtons[actionButtons.length - 1];
                    }
                    return angular.element(closeButton);
                }
                options.parent = angular.element(options.parent), options.popInTarget = angular.element((options.targetEvent || {}).target);
                var closeButton = findCloseButton();
                return configureAria(element.find("md-dialog")), options.hasBackdrop && (options.backdrop = angular.element('<md-backdrop class="md-dialog-backdrop md-opaque">'), 
                $mdTheming.inherit(options.backdrop, options.parent), $animate.enter(options.backdrop, options.parent)), 
                options.disableParentScroll && (options.oldOverflowStyle = options.parent.css("overflow"), 
                options.parent.css("overflow", "hidden")), dialogPopIn(element, options.parent, options.popInTarget && options.popInTarget.length && options.popInTarget).then(function() {
                    options.escapeToClose && (options.rootElementKeyupCallback = function(e) {
                        e.keyCode === $mdConstant.KEY_CODE.ESCAPE && $timeout($mdDialog.cancel);
                    }, $rootElement.on("keyup", options.rootElementKeyupCallback)), options.clickOutsideToClose && (options.dialogClickOutsideCallback = function(e) {
                        e.target === element[0] && $timeout($mdDialog.cancel);
                    }, element.on("click", options.dialogClickOutsideCallback)), closeButton.focus();
                });
            }
            function onRemove(scope, element, options) {
                return options.backdrop && $animate.leave(options.backdrop), options.disableParentScroll && (options.parent.css("overflow", options.oldOverflowStyle), 
                $document[0].removeEventListener("scroll", options.captureScroll, !0)), options.escapeToClose && $rootElement.off("keyup", options.rootElementKeyupCallback), 
                options.clickOutsideToClose && element.off("click", options.dialogClickOutsideCallback), 
                dialogPopOut(element, options.parent, options.popInTarget && options.popInTarget.length && options.popInTarget).then(function() {
                    options.scope.$destroy(), element.remove(), options.popInTarget && options.popInTarget.focus();
                });
            }
            function configureAria(element) {
                element.attr({
                    role: "dialog"
                });
                var dialogContent = element.find("md-content");
                0 === dialogContent.length && (dialogContent = element), $mdAria.expectAsync(element, "aria-label", function() {
                    var words = dialogContent.text().split(/\s+/);
                    return words.length > 3 && (words = words.slice(0, 3).concat("...")), words.join(" ");
                });
            }
            function dialogPopIn(container, parentElement, clickElement) {
                var dialogEl = container.find("md-dialog");
                return parentElement.append(container), transformToClickElement(dialogEl, clickElement), 
                $$rAF(function() {
                    dialogEl.addClass("transition-in").css($mdConstant.CSS.TRANSFORM, "");
                }), dialogTransitionEnd(dialogEl);
            }
            function dialogPopOut(container, parentElement, clickElement) {
                var dialogEl = container.find("md-dialog");
                return dialogEl.addClass("transition-out").removeClass("transition-in"), transformToClickElement(dialogEl, clickElement), 
                dialogTransitionEnd(dialogEl);
            }
            function transformToClickElement(dialogEl, clickElement) {
                if (clickElement) {
                    var clickRect = clickElement[0].getBoundingClientRect(), dialogRect = dialogEl[0].getBoundingClientRect(), scaleX = Math.min(.5, clickRect.width / dialogRect.width), scaleY = Math.min(.5, clickRect.height / dialogRect.height);
                    dialogEl.css($mdConstant.CSS.TRANSFORM, "translate3d(" + (-dialogRect.left + clickRect.left + clickRect.width / 2 - dialogRect.width / 2) + "px," + (-dialogRect.top + clickRect.top + clickRect.height / 2 - dialogRect.height / 2) + "px,0) scale(" + scaleX + "," + scaleY + ")");
                }
            }
            function dialogTransitionEnd(dialogEl) {
                function finished(ev) {
                    ev.target === dialogEl[0] && (dialogEl.off($mdConstant.CSS.TRANSITIONEND, finished), 
                    deferred.resolve());
                }
                var deferred = $q.defer();
                return dialogEl.on($mdConstant.CSS.TRANSITIONEND, finished), deferred.promise;
            }
            return {
                hasBackdrop: !0,
                isolateScope: !0,
                onShow: onShow,
                onRemove: onRemove,
                clickOutsideToClose: !0,
                escapeToClose: !0,
                targetEvent: null,
                disableParentScroll: !0,
                transformTemplate: function(template) {
                    return '<div class="md-dialog-container">' + template + "</div>";
                }
            };
        }
        return advancedDialogOptions.$inject = [ "$mdDialog" ], dialogDefaultOptions.$inject = [ "$timeout", "$rootElement", "$compile", "$animate", "$mdAria", "$document", "$mdUtil", "$mdConstant", "$mdTheming", "$$rAF", "$q", "$mdDialog" ], 
        $$interimElementProvider("$mdDialog").setDefaults({
            methods: [ "disableParentScroll", "hasBackdrop", "clickOutsideToClose", "escapeToClose", "targetEvent" ],
            options: dialogDefaultOptions
        }).addPreset("alert", {
            methods: [ "title", "content", "ariaLabel", "ok" ],
            options: advancedDialogOptions
        }).addPreset("confirm", {
            methods: [ "title", "content", "ariaLabel", "ok", "cancel" ],
            options: advancedDialogOptions
        });
    }
    angular.module("material.components.dialog", [ "material.core", "material.components.backdrop" ]).directive("mdDialog", MdDialogDirective).provider("$mdDialog", MdDialogProvider), 
    MdDialogDirective.$inject = [ "$$rAF", "$mdTheming" ], MdDialogProvider.$inject = [ "$$interimElementProvider" ];
}(), function() {
    "use strict";
    function MdDividerController() {}
    function MdDividerDirective($mdTheming) {
        return {
            restrict: "E",
            link: $mdTheming,
            controller: [ MdDividerController ]
        };
    }
    angular.module("material.components.divider", [ "material.core" ]).directive("mdDivider", MdDividerDirective), 
    MdDividerDirective.$inject = [ "$mdTheming" ];
}(), function() {
    "use strict";
    function mdIconDirective() {
        return {
            restrict: "E",
            template: '<object class="md-icon"></object>',
            compile: function(element, attr) {
                var object = angular.element(element[0].children[0]);
                angular.isDefined(attr.icon) && object.attr("data", attr.icon);
            }
        };
    }
    angular.module("material.components.icon", [ "material.core" ]).directive("mdIcon", mdIconDirective);
}(), function() {
    function mdInputContainerDirective($mdTheming) {
        function postLink(scope, element) {
            $mdTheming(element);
        }
        function ContainerCtrl($scope, $element) {
            var self = this;
            self.element = $element, self.setFocused = function(isFocused) {
                $element.toggleClass("md-input-focused", !!isFocused);
            }, self.setHasValue = function(hasValue) {
                $element.toggleClass("md-input-has-value", !!hasValue);
            }, self.setInvalid = function(isInvalid) {
                $element.toggleClass("md-input-invalid", !!isInvalid);
            }, $scope.$watch(function() {
                return self.label && self.input;
            }, function(hasLabelAndInput) {
                hasLabelAndInput && !self.label.attr("for") && self.label.attr("for", self.input.attr("id"));
            });
        }
        return ContainerCtrl.$inject = [ "$scope", "$element", "$mdUtil" ], {
            restrict: "E",
            link: postLink,
            controller: ContainerCtrl
        };
    }
    function labelDirective() {
        return {
            restrict: "E",
            require: "^?mdInputContainer",
            link: function(scope, element, attr, containerCtrl) {
                containerCtrl && (containerCtrl.label = element, scope.$on("$destroy", function() {
                    containerCtrl.label = null;
                }));
            }
        };
    }
    function inputTextareaDirective($mdUtil, $window) {
        function postLink(scope, element, attr, ctrls) {
            function checkHasValue(value) {
                return containerCtrl.setHasValue(!isEmpty(value) || (element[0].validity || {}).badInput), 
                value;
            }
            function setupTextarea() {
                function pipelineListener(value) {
                    return onChangeTextarea(), value;
                }
                function growTextarea() {
                    node.style.height = "auto";
                    var line = node.scrollHeight - node.offsetHeight;
                    node.scrollTop = 0;
                    var height = node.offsetHeight + (line > 0 ? line : 0);
                    node.style.height = height + "px";
                }
                function onScroll() {
                    node.scrollTop = 0;
                    var line = node.scrollHeight - node.offsetHeight, height = node.offsetHeight + line;
                    node.style.height = height + "px";
                }
                var node = element[0], onChangeTextarea = $mdUtil.debounce(growTextarea, 1);
                ngModelCtrl ? (ngModelCtrl.$formatters.push(pipelineListener), ngModelCtrl.$viewChangeListeners.push(pipelineListener)) : onChangeTextarea(), 
                element.on("keydown input", onChangeTextarea), element.on("scroll", onScroll), angular.element($window).on("resize", onChangeTextarea), 
                scope.$on("$destroy", function() {
                    angular.element($window).off("resize", onChangeTextarea);
                });
            }
            var containerCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (containerCtrl) {
                if (containerCtrl.input) throw new Error("<md-input-container> can only have *one* <input> or <textarea> child element!");
                containerCtrl.input = element, element.addClass("md-input"), element.attr("id") || element.attr("id", "input_" + $mdUtil.nextUid()), 
                "textarea" === element[0].tagName.toLowerCase() && setupTextarea();
                var isEmpty = ngModelCtrl ? ngModelCtrl.$isEmpty : function() {
                    return 0 === ("" + element.val()).length;
                };
                ngModelCtrl ? (scope.$watch(function() {
                    return ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                }, containerCtrl.setInvalid), ngModelCtrl.$formatters.push(checkHasValue), ngModelCtrl.$parsers.push(checkHasValue)) : checkHasValue(), 
                element.on("input", checkHasValue), element.on("focus", function() {
                    containerCtrl.setFocused(!0);
                }).on("blur", function() {
                    containerCtrl.setFocused(!1);
                }), scope.$on("$destroy", function() {
                    containerCtrl.setFocused(!1), containerCtrl.setHasValue(!1), containerCtrl.input = null;
                });
            }
        }
        return {
            restrict: "E",
            require: [ "^?mdInputContainer", "?ngModel" ],
            link: postLink
        };
    }
    function mdMaxlengthDirective($animate) {
        function postLink(scope, element, attr, ctrls) {
            function renderCharCount(value) {
                return charCountEl.text((element.val() || value || "").length + "/" + maxlength), 
                value;
            }
            var maxlength, ngModelCtrl = ctrls[0], containerCtrl = ctrls[1], charCountEl = angular.element('<div class="md-char-counter">');
            attr.$set("ngTrim", "false"), containerCtrl.element.append(charCountEl), ngModelCtrl.$formatters.push(renderCharCount), 
            ngModelCtrl.$viewChangeListeners.push(renderCharCount), element.on("input keydown", function() {
                renderCharCount();
            }), scope.$watch(attr.mdMaxlength, function(value) {
                maxlength = value, angular.isNumber(value) && value > 0 ? (charCountEl.parent().length || $animate.enter(charCountEl, containerCtrl.element, angular.element(containerCtrl.element[0].lastElementChild)), 
                renderCharCount()) : $animate.leave(charCountEl);
            }), ngModelCtrl.$validators["md-maxlength"] = function(modelValue, viewValue) {
                return !angular.isNumber(maxlength) || 0 > maxlength ? !0 : (modelValue || element.val() || viewValue || "").length <= maxlength;
            };
        }
        return {
            restrict: "A",
            require: [ "ngModel", "^mdInputContainer" ],
            link: postLink
        };
    }
    angular.module("material.components.input", [ "material.core" ]).directive("mdInputContainer", mdInputContainerDirective).directive("label", labelDirective).directive("input", inputTextareaDirective).directive("textarea", inputTextareaDirective).directive("mdMaxlength", mdMaxlengthDirective), 
    mdInputContainerDirective.$inject = [ "$mdTheming" ], inputTextareaDirective.$inject = [ "$mdUtil", "$window", "$compile", "$animate" ], 
    mdMaxlengthDirective.$inject = [ "$animate" ];
}(), function() {
    "use strict";
    function mdListDirective() {
        return {
            restrict: "E",
            link: function($scope, $element) {
                $element.attr({
                    role: "list"
                });
            }
        };
    }
    function mdItemDirective() {
        return {
            restrict: "E",
            link: function($scope, $element) {
                $element.attr({
                    role: "listitem"
                });
            }
        };
    }
    angular.module("material.components.list", [ "material.core" ]).directive("mdList", mdListDirective).directive("mdItem", mdItemDirective);
}(), function() {
    "use strict";
    function MdProgressCircularDirective($$rAF, $mdConstant, $mdTheming) {
        function compile(tElement) {
            return tElement.attr("aria-valuemin", 0), tElement.attr("aria-valuemax", 100), tElement.attr("role", "progressbar"), 
            postLink;
        }
        function postLink(scope, element, attr) {
            $mdTheming(element);
            var i, clamped, fillRotation, fixRotation, circle = element[0], fill = circle.querySelectorAll(".md-fill, .md-mask.md-full"), fix = circle.querySelectorAll(".md-fill.md-fix"), diameter = attr.mdDiameter || 48, scale = diameter / 48;
            circle.style[$mdConstant.CSS.TRANSFORM] = "scale(" + scale.toString() + ")", attr.$observe("value", function(value) {
                for (clamped = clamp(value), fillRotation = fillRotations[clamped], fixRotation = fixRotations[clamped], 
                element.attr("aria-valuenow", clamped), i = 0; i < fill.length; i++) fill[i].style[$mdConstant.CSS.TRANSFORM] = fillRotation;
                for (i = 0; i < fix.length; i++) fix[i].style[$mdConstant.CSS.TRANSFORM] = fixRotation;
            });
        }
        function clamp(value) {
            return value > 100 ? 100 : 0 > value ? 0 : Math.ceil(value || 0);
        }
        for (var fillRotations = new Array(101), fixRotations = new Array(101), i = 0; 101 > i; i++) {
            var percent = i / 100, rotation = Math.floor(180 * percent);
            fillRotations[i] = "rotate(" + rotation.toString() + "deg)", fixRotations[i] = "rotate(" + (2 * rotation).toString() + "deg)";
        }
        return {
            restrict: "E",
            template: '<div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div>',
            compile: compile
        };
    }
    angular.module("material.components.progressCircular", [ "material.core" ]).directive("mdProgressCircular", MdProgressCircularDirective), 
    MdProgressCircularDirective.$inject = [ "$$rAF", "$mdConstant", "$mdTheming" ];
}(), function() {
    "use strict";
    function MdProgressLinearDirective($$rAF, $mdConstant, $mdTheming) {
        function compile(tElement) {
            return tElement.attr("aria-valuemin", 0), tElement.attr("aria-valuemax", 100), tElement.attr("role", "progressbar"), 
            postLink;
        }
        function postLink(scope, element, attr) {
            $mdTheming(element);
            var bar1Style = element[0].querySelector(".md-bar1").style, bar2Style = element[0].querySelector(".md-bar2").style, container = angular.element(element[0].querySelector(".md-container"));
            attr.$observe("value", function(value) {
                if ("query" != attr.mdMode) {
                    var clamped = clamp(value);
                    element.attr("aria-valuenow", clamped), bar2Style[$mdConstant.CSS.TRANSFORM] = transforms[clamped];
                }
            }), attr.$observe("mdBufferValue", function(value) {
                bar1Style[$mdConstant.CSS.TRANSFORM] = transforms[clamp(value)];
            }), $$rAF(function() {
                container.addClass("md-ready");
            });
        }
        function clamp(value) {
            return value > 100 ? 100 : 0 > value ? 0 : Math.ceil(value || 0);
        }
        return {
            restrict: "E",
            template: '<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',
            compile: compile
        };
    }
    angular.module("material.components.progressLinear", [ "material.core" ]).directive("mdProgressLinear", MdProgressLinearDirective), 
    MdProgressLinearDirective.$inject = [ "$$rAF", "$mdConstant", "$mdTheming" ];
    var transforms = function() {
        function makeTransform(value) {
            var scale = value / 100, translateX = (value - 100) / 2;
            return "translateX(" + translateX.toString() + "%) scale(" + scale.toString() + ", 1)";
        }
        for (var values = new Array(101), i = 0; 101 > i; i++) values[i] = makeTransform(i);
        return values;
    }();
}(), function() {
    "use strict";
    function mdRadioGroupDirective($mdUtil, $mdConstant, $mdTheming) {
        function linkRadioGroup(scope, element, attr, ctrls) {
            function keydownListener(ev) {
                switch (ev.keyCode) {
                  case $mdConstant.KEY_CODE.LEFT_ARROW:
                  case $mdConstant.KEY_CODE.UP_ARROW:
                    ev.preventDefault(), rgCtrl.selectPrevious();
                    break;

                  case $mdConstant.KEY_CODE.RIGHT_ARROW:
                  case $mdConstant.KEY_CODE.DOWN_ARROW:
                    ev.preventDefault(), rgCtrl.selectNext();
                    break;

                  case $mdConstant.KEY_CODE.ENTER:
                    var form = angular.element($mdUtil.getClosest(element[0], "form"));
                    form.length > 0 && form.triggerHandler("submit");
                }
            }
            $mdTheming(element);
            var rgCtrl = ctrls[0], ngModelCtrl = ctrls[1] || $mdUtil.fakeNgModel();
            rgCtrl.init(ngModelCtrl), element.attr({
                role: "radiogroup",
                tabIndex: element.attr("tabindex") || "0"
            }).on("keydown", keydownListener);
        }
        function RadioGroupController($element) {
            this._radioButtonRenderFns = [], this.$element = $element;
        }
        function createRadioGroupControllerProto() {
            return {
                init: function(ngModelCtrl) {
                    this._ngModelCtrl = ngModelCtrl, this._ngModelCtrl.$render = angular.bind(this, this.render);
                },
                add: function(rbRender) {
                    this._radioButtonRenderFns.push(rbRender);
                },
                remove: function(rbRender) {
                    var index = this._radioButtonRenderFns.indexOf(rbRender);
                    -1 !== index && this._radioButtonRenderFns.splice(index, 1);
                },
                render: function() {
                    this._radioButtonRenderFns.forEach(function(rbRender) {
                        rbRender();
                    });
                },
                setViewValue: function(value, eventType) {
                    this._ngModelCtrl.$setViewValue(value, eventType), this.render();
                },
                getViewValue: function() {
                    return this._ngModelCtrl.$viewValue;
                },
                selectNext: function() {
                    return changeSelectedButton(this.$element, 1);
                },
                selectPrevious: function() {
                    return changeSelectedButton(this.$element, -1);
                },
                setActiveDescendant: function(radioId) {
                    this.$element.attr("aria-activedescendant", radioId);
                }
            };
        }
        function changeSelectedButton(parent, increment) {
            var buttons = $mdUtil.iterator(Array.prototype.slice.call(parent[0].querySelectorAll("md-radio-button")), !0);
            if (buttons.count()) {
                var validate = function(button) {
                    return !angular.element(button).attr("disabled");
                }, selected = parent[0].querySelector("md-radio-button.md-checked"), target = buttons[0 > increment ? "previous" : "next"](selected, validate) || buttons.first();
                angular.element(target).triggerHandler("click");
            }
        }
        return RadioGroupController.prototype = createRadioGroupControllerProto(), {
            restrict: "E",
            controller: [ "$element", RadioGroupController ],
            require: [ "mdRadioGroup", "?ngModel" ],
            link: {
                pre: linkRadioGroup
            }
        };
    }
    function mdRadioButtonDirective($mdAria, $mdUtil, $mdTheming) {
        function link(scope, element, attr, rgCtrl) {
            function listener(ev) {
                element[0].hasAttribute("disabled") || scope.$apply(function() {
                    rgCtrl.setViewValue(attr.value, ev && ev.type);
                });
            }
            function render() {
                var checked = rgCtrl.getViewValue() == attr.value;
                checked !== lastChecked && (lastChecked = checked, element.attr("aria-checked", checked), 
                checked ? (element.addClass(CHECKED_CSS), rgCtrl.setActiveDescendant(element.attr("id"))) : element.removeClass(CHECKED_CSS));
            }
            function configureAria(element, scope) {
                function buildAriaID() {
                    return attr.id || "radio_" + $mdUtil.nextUid();
                }
                scope.ariaId = buildAriaID(), element.attr({
                    id: scope.ariaId,
                    role: "radio",
                    "aria-checked": "false"
                }), $mdAria.expectWithText(element, "aria-label");
            }
            var lastChecked;
            $mdTheming(element), configureAria(element, scope), rgCtrl.add(render), attr.$observe("value", render), 
            element.on("click", listener).on("$destroy", function() {
                rgCtrl.remove(render);
            });
        }
        var CHECKED_CSS = "md-checked";
        return {
            restrict: "E",
            require: "^mdRadioGroup",
            transclude: !0,
            template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',
            link: link
        };
    }
    angular.module("material.components.radioButton", [ "material.core" ]).directive("mdRadioGroup", mdRadioGroupDirective).directive("mdRadioButton", mdRadioButtonDirective), 
    mdRadioGroupDirective.$inject = [ "$mdUtil", "$mdConstant", "$mdTheming" ], mdRadioButtonDirective.$inject = [ "$mdAria", "$mdUtil", "$mdTheming" ];
}(), function() {
    "use strict";
    function SidenavService($mdComponentRegistry, $q) {
        return function(handle) {
            var errorMsg = "SideNav '" + handle + "' is not available!", instance = $mdComponentRegistry.get(handle);
            return instance || $mdComponentRegistry.notFoundError(handle), {
                isOpen: function() {
                    return instance && instance.isOpen();
                },
                toggle: function() {
                    return instance ? instance.toggle() : $q.reject(errorMsg);
                },
                open: function() {
                    return instance ? instance.open() : $q.reject(errorMsg);
                },
                close: function() {
                    return instance ? instance.close() : $q.reject(errorMsg);
                }
            };
        };
    }
    function SidenavDirective($timeout, $animate, $parse, $mdMedia, $mdConstant, $compile, $mdTheming, $q, $document) {
        function postLink(scope, element, attr, sidenavCtrl) {
            function updateIsLocked(isLocked, oldValue) {
                isLocked === oldValue ? element.toggleClass("md-locked-open", !!isLocked) : $animate[isLocked ? "addClass" : "removeClass"](element, "md-locked-open"), 
                backdrop.toggleClass("md-locked-open", !!isLocked);
            }
            function updateIsOpen(isOpen) {
                var parent = element.parent();
                return parent[isOpen ? "on" : "off"]("keydown", onKeyDown), backdrop[isOpen ? "on" : "off"]("click", close), 
                isOpen && (triggeringElement = $document[0].activeElement), promise = $q.all([ $animate[isOpen ? "enter" : "leave"](backdrop, parent), $animate[isOpen ? "removeClass" : "addClass"](element, "md-closed").then(function() {
                    scope.isOpen && element.focus();
                }) ]);
            }
            function toggleOpen(isOpen) {
                if (scope.isOpen == isOpen) return $q.when(!0);
                var deferred = $q.defer();
                return scope.isOpen = isOpen, $timeout(function() {
                    promise.then(function(result) {
                        scope.isOpen || (triggeringElement && triggeringElement.focus(), triggeringElement = null), 
                        deferred.resolve(result);
                    });
                }, 0, !1), deferred.promise;
            }
            function onKeyDown(ev) {
                var isEscape = ev.keyCode === $mdConstant.KEY_CODE.ESCAPE;
                return isEscape ? close(ev) : $q.when(!0);
            }
            function close(ev) {
                return ev.preventDefault(), ev.stopPropagation(), sidenavCtrl.close();
            }
            var triggeringElement = null, promise = $q.when(!0), isLockedOpenParsed = $parse(attr.mdIsLockedOpen), isLocked = function() {
                return isLockedOpenParsed(scope.$parent, {
                    $media: $mdMedia
                });
            }, backdrop = $compile('<md-backdrop class="md-sidenav-backdrop md-opaque ng-enter">')(scope);
            element.on("$destroy", sidenavCtrl.destroy), $mdTheming.inherit(backdrop, element), 
            scope.$watch(isLocked, updateIsLocked), scope.$watch("isOpen", updateIsOpen), sidenavCtrl.$toggleOpen = toggleOpen;
        }
        return {
            restrict: "E",
            scope: {
                isOpen: "=?mdIsOpen"
            },
            controller: "$mdSidenavController",
            compile: function(element) {
                return element.addClass("md-closed"), element.attr("tabIndex", "-1"), postLink;
            }
        };
    }
    function SidenavController($scope, $element, $attrs, $mdComponentRegistry, $q) {
        var self = this;
        self.$toggleOpen = function() {
            return $q.when($scope.isOpen);
        }, self.isOpen = function() {
            return !!$scope.isOpen;
        }, self.open = function() {
            return self.$toggleOpen(!0);
        }, self.close = function() {
            return self.$toggleOpen(!1);
        }, self.toggle = function() {
            return self.$toggleOpen(!$scope.isOpen);
        }, self.destroy = $mdComponentRegistry.register(self, $attrs.mdComponentId);
    }
    angular.module("material.components.sidenav", [ "material.core", "material.components.backdrop" ]).factory("$mdSidenav", SidenavService).directive("mdSidenav", SidenavDirective).controller("$mdSidenavController", SidenavController), 
    SidenavService.$inject = [ "$mdComponentRegistry", "$q" ], SidenavDirective.$inject = [ "$timeout", "$animate", "$parse", "$mdMedia", "$mdConstant", "$compile", "$mdTheming", "$q", "$document" ], 
    SidenavController.$inject = [ "$scope", "$element", "$attrs", "$mdComponentRegistry", "$q" ];
}(), function() {
    "use strict";
    function SliderDirective($mdTheming) {
        function postLink(scope, element, attr, ctrls) {
            $mdTheming(element);
            var ngModelCtrl = ctrls[0] || {
                $setViewValue: function(val) {
                    this.$viewValue = val, this.$viewChangeListeners.forEach(function(cb) {
                        cb();
                    });
                },
                $parsers: [],
                $formatters: [],
                $viewChangeListeners: []
            }, sliderCtrl = ctrls[1];
            sliderCtrl.init(ngModelCtrl);
        }
        return {
            scope: {},
            require: [ "?ngModel", "mdSlider" ],
            controller: SliderController,
            template: '<div class="md-track-container"><div class="md-track"></div><div class="md-track md-track-fill"></div><div class="md-track-ticks"></div></div><div class="md-thumb-container"><div class="md-thumb"></div><div class="md-focus-thumb"></div><div class="md-focus-ring"></div><div class="md-sign"><span class="md-thumb-text"></span></div><div class="md-disabled-thumb"></div></div>',
            link: postLink
        };
    }
    function SliderController($scope, $element, $attrs, $$rAF, $window, $mdAria, $mdUtil, $mdConstant) {
        this.init = function(ngModelCtrl) {
            function updateAll() {
                refreshSliderDimensions(), ngModelRender(), redrawTicks();
            }
            function updateMin(value) {
                min = parseFloat(value), $element.attr("aria-valuemin", value), updateAll();
            }
            function updateMax(value) {
                max = parseFloat(value), $element.attr("aria-valuemax", value), updateAll();
            }
            function updateStep(value) {
                step = parseFloat(value), redrawTicks();
            }
            function updateAriaDisabled(isDisabled) {
                $element.attr("aria-disabled", !!isDisabled);
            }
            function redrawTicks() {
                if (angular.isDefined($attrs.mdDiscrete)) {
                    var numSteps = Math.floor((max - min) / step);
                    if (!tickCanvas) {
                        var trackTicksStyle = $window.getComputedStyle(tickContainer[0]);
                        tickCanvas = angular.element('<canvas style="position:absolute;">'), tickCtx = tickCanvas[0].getContext("2d"), 
                        tickCtx.fillStyle = trackTicksStyle.backgroundColor || "black", tickContainer.append(tickCanvas);
                    }
                    var dimensions = getSliderDimensions();
                    tickCanvas[0].width = dimensions.width, tickCanvas[0].height = dimensions.height;
                    for (var distance, i = 0; numSteps >= i; i++) distance = Math.floor(dimensions.width * (i / numSteps)), 
                    tickCtx.fillRect(distance - 1, 0, 2, dimensions.height);
                }
            }
            function refreshSliderDimensions() {
                sliderDimensions = trackContainer[0].getBoundingClientRect();
            }
            function getSliderDimensions() {
                return throttledRefreshDimensions(), sliderDimensions;
            }
            function keydownListener(ev) {
                if (!$element[0].hasAttribute("disabled")) {
                    var changeAmount;
                    ev.keyCode === $mdConstant.KEY_CODE.LEFT_ARROW ? changeAmount = -step : ev.keyCode === $mdConstant.KEY_CODE.RIGHT_ARROW && (changeAmount = step), 
                    changeAmount && ((ev.metaKey || ev.ctrlKey || ev.altKey) && (changeAmount *= 4), 
                    ev.preventDefault(), ev.stopPropagation(), $scope.$evalAsync(function() {
                        setModelValue(ngModelCtrl.$viewValue + changeAmount);
                    }));
                }
            }
            function setModelValue(value) {
                ngModelCtrl.$setViewValue(minMaxValidator(stepValidator(value)));
            }
            function ngModelRender() {
                isNaN(ngModelCtrl.$viewValue) && (ngModelCtrl.$viewValue = ngModelCtrl.$modelValue);
                var percent = (ngModelCtrl.$viewValue - min) / (max - min);
                $scope.modelValue = ngModelCtrl.$viewValue, $element.attr("aria-valuenow", ngModelCtrl.$viewValue), 
                setSliderPercent(percent), thumbText.text(ngModelCtrl.$viewValue);
            }
            function minMaxValidator(value) {
                return angular.isNumber(value) ? Math.max(min, Math.min(max, value)) : void 0;
            }
            function stepValidator(value) {
                return angular.isNumber(value) ? Math.round(value / step) * step : void 0;
            }
            function setSliderPercent(percent) {
                activeTrack.css("width", 100 * percent + "%"), thumbContainer.css($mdConstant.CSS.TRANSFORM, "translate3d(" + getSliderDimensions().width * percent + "px,0,0)"), 
                $element.toggleClass("md-min", 0 === percent);
            }
            function onInput(ev) {
                isSliding || ev.eventType !== Hammer.INPUT_START || $element[0].hasAttribute("disabled") ? isSliding && ev.eventType === Hammer.INPUT_END && (isSliding && isDiscrete && onPanEnd(ev), 
                isSliding = !1, $element.removeClass("panning active")) : (isSliding = !0, $element.addClass("active"), 
                $element[0].focus(), refreshSliderDimensions(), onPan(ev), ev.srcEvent.stopPropagation());
            }
            function onPanStart() {
                isSliding && $element.addClass("panning");
            }
            function onPan(ev) {
                isSliding && (isDiscrete ? adjustThumbPosition(ev.center.x) : doSlide(ev.center.x), 
                ev.preventDefault(), ev.srcEvent.stopPropagation());
            }
            function onPanEnd(ev) {
                if (isDiscrete && !$element[0].hasAttribute("disabled")) {
                    var exactVal = percentToValue(positionToPercent(ev.center.x)), closestVal = minMaxValidator(stepValidator(exactVal));
                    setSliderPercent(valueToPercent(closestVal)), $$rAF(function() {
                        setModelValue(closestVal);
                    }), ev.preventDefault(), ev.srcEvent.stopPropagation();
                }
            }
            function doSlide(x) {
                $scope.$evalAsync(function() {
                    setModelValue(percentToValue(positionToPercent(x)));
                });
            }
            function adjustThumbPosition(x) {
                var exactVal = percentToValue(positionToPercent(x)), closestVal = minMaxValidator(stepValidator(exactVal));
                setSliderPercent(positionToPercent(x)), thumbText.text(closestVal);
            }
            function positionToPercent(x) {
                return Math.max(0, Math.min(1, (x - sliderDimensions.left) / sliderDimensions.width));
            }
            function percentToValue(percent) {
                return min + percent * (max - min);
            }
            function valueToPercent(val) {
                return (val - min) / (max - min);
            }
            var thumb = angular.element($element[0].querySelector(".md-thumb")), thumbText = angular.element($element[0].querySelector(".md-thumb-text")), thumbContainer = thumb.parent(), trackContainer = angular.element($element[0].querySelector(".md-track-container")), activeTrack = angular.element($element[0].querySelector(".md-track-fill")), tickContainer = angular.element($element[0].querySelector(".md-track-ticks")), throttledRefreshDimensions = $mdUtil.throttle(refreshSliderDimensions, 5e3);
            $attrs.min ? $attrs.$observe("min", updateMin) : updateMin(0), $attrs.max ? $attrs.$observe("max", updateMax) : updateMax(100), 
            $attrs.step ? $attrs.$observe("step", updateStep) : updateStep(1);
            var stopDisabledWatch = angular.noop;
            $attrs.ngDisabled && (stopDisabledWatch = $scope.$parent.$watch($attrs.ngDisabled, updateAriaDisabled)), 
            $mdAria.expect($element, "aria-label"), $element.attr("tabIndex", 0), $element.attr("role", "slider"), 
            $element.on("keydown", keydownListener);
            var hammertime = new Hammer($element[0], {
                recognizers: [ [ Hammer.Pan, {
                    direction: Hammer.DIRECTION_HORIZONTAL
                } ] ]
            });
            hammertime.on("hammer.input", onInput), hammertime.on("panstart", onPanStart), hammertime.on("pan", onPan), 
            hammertime.on("panend", onPanEnd), setTimeout(updateAll);
            var debouncedUpdateAll = $$rAF.debounce(updateAll);
            angular.element($window).on("resize", debouncedUpdateAll), $scope.$on("$destroy", function() {
                angular.element($window).off("resize", debouncedUpdateAll), hammertime.destroy(), 
                stopDisabledWatch();
            }), ngModelCtrl.$render = ngModelRender, ngModelCtrl.$viewChangeListeners.push(ngModelRender), 
            ngModelCtrl.$formatters.push(minMaxValidator), ngModelCtrl.$formatters.push(stepValidator);
            var min, max, step, tickCanvas, tickCtx, sliderDimensions = {};
            refreshSliderDimensions();
            var isSliding = !1, isDiscrete = angular.isDefined($attrs.mdDiscrete);
            this._onInput = onInput, this._onPanStart = onPanStart, this._onPan = onPan;
        };
    }
    angular.module("material.components.slider", [ "material.core" ]).directive("mdSlider", SliderDirective), 
    SliderDirective.$inject = [ "$mdTheming" ], SliderController.$inject = [ "$scope", "$element", "$attrs", "$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant" ];
}(), function() {
    "use strict";
    function MdSticky($document, $mdConstant, $compile, $$rAF, $mdUtil) {
        function setupSticky(contentCtrl) {
            function add(element, stickyClone) {
                stickyClone.addClass("md-sticky-clone");
                var item = {
                    element: element,
                    clone: stickyClone
                };
                return self.items.push(item), contentEl.parent().prepend(item.clone), debouncedRefreshElements(), 
                function() {
                    self.items.forEach(function(item, index) {
                        item.element[0] === element[0] && (self.items.splice(index, 1), item.clone.remove());
                    }), debouncedRefreshElements();
                };
            }
            function refreshElements() {
                self.items.forEach(refreshPosition), self.items = self.items.sort(function(a, b) {
                    return a.top < b.top ? -1 : 1;
                });
                for (var item, currentScrollTop = contentEl.prop("scrollTop"), i = self.items.length - 1; i >= 0; i--) if (currentScrollTop > self.items[i].top) {
                    item = self.items[i];
                    break;
                }
                setCurrentItem(item);
            }
            function refreshPosition(item) {
                var current = item.element[0];
                for (item.top = 0, item.left = 0; current && current !== contentEl[0]; ) item.top += current.offsetTop, 
                item.left += current.offsetLeft, current = current.offsetParent;
                item.height = item.element.prop("offsetHeight"), item.clone.css("margin-left", item.left + "px");
            }
            function onScroll() {
                var scrollTop = contentEl.prop("scrollTop"), isScrollingDown = scrollTop > (onScroll.prevScrollTop || 0);
                onScroll.prevScrollTop = scrollTop, 0 === scrollTop ? setCurrentItem(null) : isScrollingDown && self.next ? self.next.top - scrollTop <= 0 ? setCurrentItem(self.next) : self.current && (self.next.top - scrollTop <= self.next.height ? translate(self.current, self.next.top - self.next.height - scrollTop) : translate(self.current, null)) : !isScrollingDown && self.current && (scrollTop < self.current.top && setCurrentItem(self.prev), 
                self.current && self.next && (scrollTop >= self.next.top - self.current.height ? translate(self.current, self.next.top - scrollTop - self.current.height) : translate(self.current, null)));
            }
            function setCurrentItem(item) {
                if (self.current !== item) {
                    self.current && (translate(self.current, null), setStickyState(self.current, null)), 
                    item && setStickyState(item, "active"), self.current = item;
                    var index = self.items.indexOf(item);
                    self.next = self.items[index + 1], self.prev = self.items[index - 1], setStickyState(self.next, "next"), 
                    setStickyState(self.prev, "prev");
                }
            }
            function setStickyState(item, state) {
                item && item.state !== state && (item.state && (item.clone.attr("sticky-prev-state", item.state), 
                item.element.attr("sticky-prev-state", item.state)), item.clone.attr("sticky-state", state), 
                item.element.attr("sticky-state", state), item.state = state);
            }
            function translate(item, amount) {
                item && (null === amount || void 0 === amount ? item.translateY && (item.translateY = null, 
                item.clone.css($mdConstant.CSS.TRANSFORM, "")) : (item.translateY = amount, item.clone.css($mdConstant.CSS.TRANSFORM, "translate3d(" + item.left + "px," + amount + "px,0)")));
            }
            var contentEl = contentCtrl.$element, debouncedRefreshElements = $$rAF.debounce(refreshElements);
            setupAugmentedScrollEvents(contentEl), contentEl.on("$scrollstart", debouncedRefreshElements), 
            contentEl.on("$scroll", onScroll);
            var self;
            return self = {
                prev: null,
                current: null,
                next: null,
                items: [],
                add: add,
                refreshElements: refreshElements
            };
        }
        function checkStickySupport() {
            var stickyProp, testEl = angular.element("<div>");
            $document[0].body.appendChild(testEl[0]);
            for (var stickyProps = [ "sticky", "-webkit-sticky" ], i = 0; i < stickyProps.length; ++i) if (testEl.css({
                position: stickyProps[i],
                top: 0,
                "z-index": 2
            }), testEl.css("position") == stickyProps[i]) {
                stickyProp = stickyProps[i];
                break;
            }
            return testEl.remove(), stickyProp;
        }
        function setupAugmentedScrollEvents(element) {
            function loopScrollEvent() {
                +$mdUtil.now() - lastScrollTime > SCROLL_END_DELAY ? (isScrolling = !1, element.triggerHandler("$scrollend")) : (element.triggerHandler("$scroll"), 
                $$rAF(loopScrollEvent));
            }
            var isScrolling, lastScrollTime, SCROLL_END_DELAY = 200;
            element.on("scroll touchmove", function() {
                isScrolling || (isScrolling = !0, $$rAF(loopScrollEvent), element.triggerHandler("$scrollstart")), 
                element.triggerHandler("$scroll"), lastScrollTime = +$mdUtil.now();
            });
        }
        var browserStickySupport = checkStickySupport();
        return function(scope, element, stickyClone) {
            var contentCtrl = element.controller("mdContent");
            if (contentCtrl) if (browserStickySupport) element.css({
                position: browserStickySupport,
                top: 0,
                "z-index": 2
            }); else {
                var $$sticky = contentCtrl.$element.data("$$sticky");
                $$sticky || ($$sticky = setupSticky(contentCtrl), contentCtrl.$element.data("$$sticky", $$sticky));
                var deregister = $$sticky.add(element, stickyClone || element.clone());
                scope.$on("$destroy", deregister);
            }
        };
    }
    angular.module("material.components.sticky", [ "material.core", "material.components.content" ]).factory("$mdSticky", MdSticky), 
    MdSticky.$inject = [ "$document", "$mdConstant", "$compile", "$$rAF", "$mdUtil" ];
}(), function() {
    "use strict";
    function MdSubheaderDirective($mdSticky, $compile, $mdTheming) {
        return {
            restrict: "E",
            replace: !0,
            transclude: !0,
            template: '<h2 class="md-subheader"><span class="md-subheader-content"></span></h2>',
            compile: function(element, attr, transclude) {
                var outerHTML = element[0].outerHTML;
                return function(scope, element) {
                    function getContent(el) {
                        return angular.element(el[0].querySelector(".md-subheader-content"));
                    }
                    $mdTheming(element), transclude(scope, function(clone) {
                        getContent(element).append(clone);
                    }), transclude(scope, function(clone) {
                        var stickyClone = $compile(angular.element(outerHTML))(scope);
                        $mdTheming(stickyClone), getContent(stickyClone).append(clone), $mdSticky(scope, element, stickyClone);
                    });
                };
            }
        };
    }
    angular.module("material.components.subheader", [ "material.core", "material.components.sticky" ]).directive("mdSubheader", MdSubheaderDirective), 
    MdSubheaderDirective.$inject = [ "$mdSticky", "$compile", "$mdTheming" ];
}(), function() {
    "use strict";
    function MdSwipeFactory() {
        return function(scope, eventTypes) {
            return eventTypes || (eventTypes = "swipeleft swiperight"), function(element, onSwipeCallback, attachLater) {
                function swipeHandler(ev) {
                    ev.srcEvent.stopPropagation(), angular.isFunction(onSwipeCallback) && scope.$apply(function() {
                        onSwipeCallback(ev);
                    });
                }
                function attachSwipe() {
                    return hammertime.on(eventTypes, swipeHandler), function() {
                        hammertime.off(eventTypes);
                    };
                }
                function addRecognizers(list, events) {
                    var hasPanning = events.indexOf("pan") > -1, hasSwipe = events.indexOf("swipe") > -1;
                    return hasPanning && list.push([ Hammer.Pan, {
                        direction: Hammer.DIRECTION_HORIZONTAL
                    } ]), hasSwipe && list.push([ Hammer.Swipe, {
                        direction: Hammer.DIRECTION_HORIZONTAL
                    } ]), list;
                }
                var hammertime = new Hammer(element[0], {
                    recognizers: addRecognizers([], eventTypes)
                });
                return attachLater || attachSwipe(), scope.$on("$destroy", function() {
                    hammertime.destroy();
                }), attachSwipe;
            };
        };
    }
    function MdSwipeLeftDirective($parse, $mdSwipe) {
        return {
            restrict: "A",
            link: swipePostLink($parse, $mdSwipe, "SwipeLeft")
        };
    }
    function MdSwipeRightDirective($parse, $mdSwipe) {
        return {
            restrict: "A",
            link: swipePostLink($parse, $mdSwipe, "SwipeRight")
        };
    }
    function swipePostLink($parse, $mdSwipe, name) {
        return function(scope, element, attrs) {
            var direction = name.toLowerCase(), directiveName = "md" + name, parentGetter = $parse(attrs[directiveName]) || angular.noop, configureSwipe = $mdSwipe(scope, direction), requestSwipe = function(locals) {
                parentGetter(scope, locals);
            };
            configureSwipe(element, function(ev) {
                ev.type == direction && requestSwipe();
            });
        };
    }
    angular.module("material.components.swipe", []).factory("$mdSwipe", MdSwipeFactory).directive("mdSwipeLeft", MdSwipeLeftDirective).directive("mdSwipeRight", MdSwipeRightDirective), 
    MdSwipeLeftDirective.$inject = [ "$parse", "$mdSwipe" ], MdSwipeRightDirective.$inject = [ "$parse", "$mdSwipe" ];
}(), function() {
    "use strict";
    function MdSwitch(mdCheckboxDirective, $mdTheming, $mdUtil, $document, $mdConstant, $parse, $$rAF) {
        function compile(element, attr) {
            var checkboxLink = checkboxDirective.compile(element, attr);
            return element.addClass("md-dragging"), function(scope, element, attr, ngModel) {
                function onDragStart(ev, drag) {
                    return disabledGetter(scope) ? ev.preventDefault() : (drag.width = thumbContainer.prop("offsetWidth"), 
                    void element.addClass("md-dragging"));
                }
                function onDrag(ev, drag) {
                    var percent = drag.distance / drag.width, translate = ngModel.$viewValue ? 1 - percent : -percent;
                    translate = Math.max(0, Math.min(1, translate)), thumbContainer.css($mdConstant.CSS.TRANSFORM, "translate3d(" + 100 * translate + "%,0,0)"), 
                    drag.translate = translate;
                }
                function onDragEnd(ev, drag) {
                    if (disabledGetter(scope)) return !1;
                    element.removeClass("md-dragging"), thumbContainer.css($mdConstant.CSS.TRANSFORM, "");
                    var isChanged = Math.abs(drag.distance || 0) < 2 || (ngModel.$viewValue ? drag.translate < .5 : drag.translate > .5);
                    isChanged && scope.$apply(function() {
                        ngModel.$setViewValue(!ngModel.$viewValue), ngModel.$render();
                    });
                }
                ngModel = ngModel || $mdUtil.fakeNgModel();
                var disabledGetter = $parse(attr.ngDisabled), thumbContainer = angular.element(element[0].querySelector(".md-thumb-container")), switchContainer = angular.element(element[0].querySelector(".md-container"));
                $$rAF(function() {
                    element.removeClass("md-dragging");
                }), attr.mdNoClick = !0, checkboxLink(scope, element, attr, ngModel), $mdUtil.attachDragBehavior(scope, switchContainer), 
                switchContainer.on("$md.dragstart", onDragStart).on("$md.drag", onDrag).on("$md.dragend", onDragEnd);
            };
        }
        var checkboxDirective = mdCheckboxDirective[0];
        return {
            restrict: "E",
            transclude: !0,
            template: '<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',
            require: "?ngModel",
            compile: compile
        };
    }
    angular.module("material.components.switch", [ "material.core", "material.components.checkbox" ]).directive("mdSwitch", MdSwitch), 
    MdSwitch.$inject = [ "mdCheckboxDirective", "$mdTheming", "$mdUtil", "$document", "$mdConstant", "$parse", "$$rAF" ];
}(), function() {
    "use strict";
    angular.module("material.components.tabs", [ "material.core" ]);
}(), function() {
    "use strict";
    function mdTextFloatDirective($mdTheming, $mdUtil, $parse, $log) {
        return {
            restrict: "E",
            replace: !0,
            scope: {
                fid: "@?mdFid",
                label: "@?",
                value: "=ngModel"
            },
            compile: function(element, attr) {
                return $log.warn("<md-text-float> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer"), 
                angular.isUndefined(attr.mdFid) && (attr.mdFid = $mdUtil.nextUid()), {
                    pre: function(scope, element, attrs) {
                        var disabledParsed = $parse(attrs.ngDisabled);
                        scope.isDisabled = function() {
                            return disabledParsed(scope.$parent);
                        }, scope.inputType = attrs.type || "text";
                    },
                    post: $mdTheming
                };
            },
            template: '<md-input-group tabindex="-1"> <label for="{{fid}}" >{{label}}</label> <md-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" type="{{inputType}}"></md-input></md-input-group>'
        };
    }
    function mdInputGroupDirective($log) {
        return {
            restrict: "CE",
            controller: [ "$element", function($element) {
                $log.warn("<md-input-group> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer"), 
                this.setFocused = function(isFocused) {
                    $element.toggleClass("md-input-focused", !!isFocused);
                }, this.setHasValue = function(hasValue) {
                    $element.toggleClass("md-input-has-value", hasValue);
                };
            } ]
        };
    }
    function mdInputDirective($mdUtil, $log) {
        return {
            restrict: "E",
            replace: !0,
            template: "<input >",
            require: [ "^?mdInputGroup", "?ngModel" ],
            link: function(scope, element, attr, ctrls) {
                function isNotEmpty(value) {
                    return value = angular.isUndefined(value) ? element.val() : value, angular.isDefined(value) && null !== value && "" !== value.toString().trim();
                }
                if (ctrls[0]) {
                    $log.warn("<md-input> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer");
                    var inputGroupCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                    scope.$watch(scope.isDisabled, function(isDisabled) {
                        element.attr("aria-disabled", !!isDisabled), element.attr("tabindex", !!isDisabled);
                    }), element.attr("type", attr.type || element.parent().attr("type") || "text"), 
                    ngModelCtrl && ngModelCtrl.$formatters.push(function(value) {
                        return inputGroupCtrl.setHasValue(isNotEmpty(value)), value;
                    }), element.on("input", function() {
                        inputGroupCtrl.setHasValue(isNotEmpty());
                    }).on("focus", function() {
                        inputGroupCtrl.setFocused(!0);
                    }).on("blur", function() {
                        inputGroupCtrl.setFocused(!1), inputGroupCtrl.setHasValue(isNotEmpty());
                    }), scope.$on("$destroy", function() {
                        inputGroupCtrl.setFocused(!1), inputGroupCtrl.setHasValue(!1);
                    });
                }
            }
        };
    }
    angular.module("material.components.textField", [ "material.core" ]).directive("mdInputGroup", mdInputGroupDirective).directive("mdInput", mdInputDirective).directive("mdTextFloat", mdTextFloatDirective), 
    mdTextFloatDirective.$inject = [ "$mdTheming", "$mdUtil", "$parse", "$log" ], mdInputGroupDirective.$inject = [ "$log" ], 
    mdInputDirective.$inject = [ "$mdUtil", "$log" ];
}(), function() {
    "use strict";
    function MdToastDirective() {
        return {
            restrict: "E"
        };
    }
    function MdToastProvider($$interimElementProvider) {
        function toastDefaultOptions($timeout, $animate, $mdSwipe, $mdTheming, $mdToast) {
            function onShow(scope, element, options) {
                element.addClass(options.position.split(" ").map(function(pos) {
                    return "md-" + pos;
                }).join(" ")), options.parent.addClass(toastOpenClass(options.position));
                var configureSwipe = $mdSwipe(scope, "swipeleft swiperight");
                return options.detachSwipe = configureSwipe(element, function(ev) {
                    element.addClass("md-" + ev.type), $timeout($mdToast.cancel);
                }), $animate.enter(element, options.parent);
            }
            function onRemove(scope, element, options) {
                return options.detachSwipe(), options.parent.removeClass(toastOpenClass(options.position)), 
                $animate.leave(element);
            }
            function toastOpenClass(position) {
                return "md-toast-open-" + (position.indexOf("top") > -1 ? "top" : "bottom");
            }
            return {
                onShow: onShow,
                onRemove: onRemove,
                position: "bottom left",
                themable: !0,
                hideDelay: 3e3
            };
        }
        return toastDefaultOptions.$inject = [ "$timeout", "$animate", "$mdSwipe", "$mdTheming", "$mdToast" ], 
        $$interimElementProvider("$mdToast").setDefaults({
            methods: [ "position", "hideDelay", "capsule" ],
            options: toastDefaultOptions
        }).addPreset("simple", {
            argOption: "content",
            methods: [ "content", "action", "highlightAction" ],
            options: [ "$mdToast", function($mdToast) {
                return {
                    template: [ "<md-toast ng-class=\"{'md-capsule': toast.capsule}\">", "<span flex>{{ toast.content }}</span>", '<md-button ng-if="toast.action" ng-click="toast.resolve()" ng-class="{\'md-action\': toast.highlightAction}">', "{{ toast.action }}", "</md-button>", "</md-toast>" ].join(""),
                    controller: function() {
                        this.resolve = function() {
                            $mdToast.hide();
                        };
                    },
                    controllerAs: "toast",
                    bindToController: !0
                };
            } ]
        });
    }
    angular.module("material.components.toast", [ "material.core", "material.components.swipe", "material.components.button" ]).directive("mdToast", MdToastDirective).provider("$mdToast", MdToastProvider), 
    MdToastProvider.$inject = [ "$$interimElementProvider" ];
}(), function() {
    "use strict";
    function mdToolbarDirective($$rAF, $mdConstant, $mdUtil, $mdTheming) {
        return {
            restrict: "E",
            controller: angular.noop,
            link: function(scope, element, attr) {
                function setupScrollShrink() {
                    function onMdContentLoad($event, newContentEl) {
                        element.parent()[0] === newContentEl.parent()[0] && (contentElement && contentElement.off("scroll", debouncedContentScroll), 
                        newContentEl.on("scroll", debouncedContentScroll), newContentEl.attr("scroll-shrink", "true"), 
                        contentElement = newContentEl, $$rAF(updateToolbarHeight));
                    }
                    function updateToolbarHeight() {
                        toolbarHeight = element.prop("offsetHeight"), contentElement.css("margin-top", -toolbarHeight * shrinkSpeedFactor + "px"), 
                        onContentScroll();
                    }
                    function onContentScroll(e) {
                        var scrollTop = e ? e.target.scrollTop : prevScrollTop;
                        debouncedUpdateHeight(), y = Math.min(toolbarHeight / shrinkSpeedFactor, Math.max(0, y + scrollTop - prevScrollTop)), 
                        element.css($mdConstant.CSS.TRANSFORM, "translate3d(0," + -y * shrinkSpeedFactor + "px,0)"), 
                        contentElement.css($mdConstant.CSS.TRANSFORM, "translate3d(0," + (toolbarHeight - y) * shrinkSpeedFactor + "px,0)"), 
                        prevScrollTop = scrollTop;
                    }
                    var toolbarHeight, contentElement, y = 0, prevScrollTop = 0, shrinkSpeedFactor = attr.mdShrinkSpeedFactor || .5, debouncedContentScroll = $$rAF.debounce(onContentScroll), debouncedUpdateHeight = $mdUtil.debounce(updateToolbarHeight, 5e3);
                    scope.$on("$mdContentLoaded", onMdContentLoad);
                }
                $mdTheming(element), angular.isDefined(attr.mdScrollShrink) && setupScrollShrink();
            }
        };
    }
    angular.module("material.components.toolbar", [ "material.core", "material.components.content" ]).directive("mdToolbar", mdToolbarDirective), 
    mdToolbarDirective.$inject = [ "$$rAF", "$mdConstant", "$mdUtil", "$mdTheming" ];
}(), function() {
    "use strict";
    angular.module("material.components.whiteframe", []);
}(), function() {
    "use strict";
    function MdTooltipDirective($timeout, $window, $$rAF, $document, $mdUtil, $mdTheming, $rootElement) {
        function postLink(scope, element, attr) {
            function setVisible(value) {
                setVisible.value = !!value, setVisible.queued || (value ? (setVisible.queued = !0, 
                $timeout(function() {
                    scope.visible = setVisible.value, setVisible.queued = !1;
                }, scope.delay)) : $timeout(function() {
                    scope.visible = !1;
                }));
            }
            function showTooltip() {
                element.removeClass("md-hide"), parent.attr("aria-describedby", element.attr("id")), 
                tooltipParent.append(element), positionTooltip(), $$rAF(function() {
                    $$rAF(function() {
                        positionTooltip(), scope.visible && element.addClass("md-show");
                    });
                });
            }
            function hideTooltip() {
                element.removeClass("md-show").addClass("md-hide"), parent.removeAttr("aria-describedby"), 
                $timeout(function() {
                    scope.visible || element.detach();
                }, 200, !1);
            }
            function positionTooltip() {
                var tipRect = $mdUtil.elementRect(element, tooltipParent), parentRect = $mdUtil.elementRect(parent, tooltipParent), tipDirection = "bottom", newPosition = {
                    left: parentRect.left + parentRect.width / 2 - tipRect.width / 2,
                    top: parentRect.top + parentRect.height
                };
                newPosition.left = Math.min(newPosition.left, tooltipParent.prop("scrollWidth") - tipRect.width - TOOLTIP_WINDOW_EDGE_SPACE), 
                newPosition.left = Math.max(newPosition.left, TOOLTIP_WINDOW_EDGE_SPACE), newPosition.top + tipRect.height > tooltipParent.prop("scrollHeight") && (newPosition.top = parentRect.top - tipRect.height, 
                tipDirection = "top"), element.css({
                    top: newPosition.top + "px",
                    left: newPosition.left + "px"
                }), element.attr("width-32", Math.ceil(tipRect.width / 32)), element.attr("md-direction", tipDirection);
            }
            $mdTheming(element);
            for (var parent = element.parent(), current = element.parent()[0]; current && current !== $rootElement[0] && current !== document.body && (!current.tagName || "md-content" != current.tagName.toLowerCase()); ) current = current.parentNode;
            var tooltipParent = angular.element(current || document.body);
            angular.isDefined(attr.mdDelay) || (scope.delay = TOOLTIP_SHOW_DELAY), element.detach(), 
            element.attr("role", "tooltip"), element.attr("id", attr.id || "tooltip_" + $mdUtil.nextUid()), 
            parent.on("focus mouseenter touchstart", function() {
                setVisible(!0);
            }), parent.on("blur mouseleave touchend touchcancel", function() {
                $document[0].activeElement !== parent[0] && setVisible(!1);
            }), scope.$watch("visible", function(isVisible) {
                isVisible ? showTooltip() : hideTooltip();
            });
            var debouncedOnResize = $$rAF.debounce(function() {
                scope.visible && positionTooltip();
            });
            angular.element($window).on("resize", debouncedOnResize), scope.$on("$destroy", function() {
                scope.visible = !1, element.remove(), angular.element($window).off("resize", debouncedOnResize);
            });
        }
        var TOOLTIP_SHOW_DELAY = 400, TOOLTIP_WINDOW_EDGE_SPACE = 8;
        return {
            restrict: "E",
            transclude: !0,
            template: '<div class="md-background"></div><div class="md-content" ng-transclude></div>',
            scope: {
                visible: "=?mdVisible",
                delay: "=?mdDelay"
            },
            link: postLink
        };
    }
    angular.module("material.components.tooltip", [ "material.core" ]).directive("mdTooltip", MdTooltipDirective), 
    MdTooltipDirective.$inject = [ "$timeout", "$window", "$$rAF", "$document", "$mdUtil", "$mdTheming", "$rootElement" ];
}(), function() {
    "use strict";
    function MdTabInkDirective($$rAF) {
        function postLink(scope, element, attr, ctrls) {
            function updateBar() {
                var selected = tabsCtrl.getSelectedItem(), hideInkBar = !selected || tabsCtrl.count() < 2;
                if (element.css("display", hideInkBar ? "none" : "block"), !hideInkBar && scope.pagination && scope.pagination.tabData) {
                    var index = tabsCtrl.getSelectedIndex(), data = scope.pagination.tabData.tabs[index] || {
                        left: 0,
                        right: 0,
                        width: 0
                    }, right = element.parent().prop("offsetWidth") - data.right, classNames = [ "md-transition-left", "md-transition-right", "md-no-transition" ], classIndex = lastIndex > index ? 0 : index > lastIndex ? 1 : 2;
                    element.removeClass(classNames.join(" ")).addClass(classNames[classIndex]).css({
                        left: data.left + 1 + "px",
                        right: right + "px"
                    }), lastIndex = index;
                }
            }
            if (!ctrls[0]) {
                var tabsCtrl = ctrls[1], debouncedUpdateBar = $$rAF.debounce(updateBar);
                tabsCtrl.inkBarElement = element, scope.$on("$mdTabsPaginationChanged", debouncedUpdateBar);
            }
        }
        var lastIndex = 0;
        return {
            restrict: "E",
            require: [ "^?mdNoBar", "^mdTabs" ],
            link: postLink
        };
    }
    angular.module("material.components.tabs").directive("mdTabsInkBar", MdTabInkDirective), 
    MdTabInkDirective.$inject = [ "$$rAF" ];
}(), function() {
    "use strict";
    function TabPaginationDirective($mdConstant, $window, $$rAF, $$q, $timeout, $mdMedia) {
        function postLink(scope, element, attr, tabsCtrl) {
            function onTabFocus(tab, oldTab) {
                if (tab) {
                    var pageIndex = getPageForTab(tab);
                    state.active && pageIndex !== state.page ? (oldTab && oldTab.element.blur(), setPage(pageIndex).then(function() {
                        tab.element.focus();
                    })) : tab.element.focus();
                }
            }
            function userChangePage(increment) {
                var sizeData = state.tabData, newPage = Math.max(0, Math.min(sizeData.pages.length - 1, state.page + increment)), newTabIndex = sizeData.pages[newPage][increment > 0 ? "firstTabIndex" : "lastTabIndex"], newTab = tabsCtrl.itemAt(newTabIndex);
                onTabFocus(newTab);
            }
            function updatePagination() {
                function enablePagination() {
                    tabsParent.css("width", "9999px"), angular.forEach(sizeData.tabs, function(tab) {
                        angular.element(tab.element).css("margin-left", tab.filler + "px");
                    }), setPage(getPageForTab(tabsCtrl.getSelectedItem()));
                }
                function disablePagination() {
                    slideTabButtons(0), tabsParent.css("width", ""), tabs.css("width", ""), tabs.css("margin-left", ""), 
                    state.page = null, state.active = !1;
                }
                function waitForVisible() {
                    return watcher || scope.$watch(function() {
                        $timeout(function() {
                            element[0].offsetParent && (angular.isFunction(watcher) && watcher(), debouncedUpdatePagination(), 
                            watcher = null);
                        }, 0, !1);
                    });
                }
                if (element.prop("offsetParent")) {
                    var tabs = element.find("md-tab");
                    disablePagination();
                    var sizeData = state.tabData = calculateTabData(), needPagination = state.active = sizeData.pages.length > 1;
                    needPagination && enablePagination(), scope.$evalAsync(function() {
                        scope.$broadcast("$mdTabsPaginationChanged");
                    });
                } else var watcher = waitForVisible();
            }
            function slideTabButtons(x) {
                function onTabsParentTransitionEnd(ev) {
                    ev.target === tabsParent[0] && (tabsParent.off($mdConstant.CSS.TRANSITIONEND, onTabsParentTransitionEnd), 
                    deferred.resolve());
                }
                if (tabsCtrl.pagingOffset === x) return $$q.when();
                var deferred = $$q.defer();
                return tabsCtrl.$$pagingOffset = x, tabsParent.css($mdConstant.CSS.TRANSFORM, "translate3d(" + x + "px,0,0)"), 
                tabsParent.on($mdConstant.CSS.TRANSITIONEND, onTabsParentTransitionEnd), deferred.promise;
            }
            function shouldStretchTabs() {
                switch (scope.stretchTabs) {
                  case "never":
                    return !1;

                  case "always":
                    return !0;

                  default:
                    return $mdMedia("sm");
                }
            }
            function calculateTabData(noAdjust) {
                function adjustForStretchedTabs() {
                    var canvasWidth = 1 === pages.length ? clientWidth : tabsWidth, tabsPerPage = Math.min(Math.floor(canvasWidth / max), tabs.length), tabWidth = Math.floor(canvasWidth / tabsPerPage);
                    return $tabs.css("width", tabWidth + "px"), calculateTabData(!0);
                }
                var currentPage, clientWidth = element.parent().prop("offsetWidth"), tabsWidth = clientWidth - PAGINATORS_WIDTH - 1, $tabs = angular.element(tabs), totalWidth = 0, max = 0, tabData = [], pages = [];
                return $tabs.css("max-width", ""), angular.forEach(tabs, function(tab, index) {
                    var tabWidth = Math.min(tabsWidth, tab.offsetWidth), data = {
                        element: tab,
                        left: totalWidth,
                        width: tabWidth,
                        right: totalWidth + tabWidth,
                        filler: 0
                    };
                    data.page = Math.ceil(data.right / (1 === pages.length && index === tabs.length - 1 ? clientWidth : tabsWidth)) - 1, 
                    data.page >= pages.length ? (data.filler = tabsWidth * data.page - data.left, data.right += data.filler, 
                    data.left += data.filler, currentPage = {
                        left: data.left,
                        firstTabIndex: index,
                        lastTabIndex: index,
                        tabs: [ data ]
                    }, pages.push(currentPage)) : (currentPage.lastTabIndex = index, currentPage.tabs.push(data)), 
                    totalWidth = data.right, max = Math.max(max, tabWidth), tabData.push(data);
                }), $tabs.css("max-width", tabsWidth + "px"), !noAdjust && shouldStretchTabs() ? adjustForStretchedTabs() : {
                    width: totalWidth,
                    max: max,
                    tabs: tabData,
                    pages: pages,
                    tabElements: tabs
                };
            }
            function getPageForTab(tab) {
                var tabIndex = tabsCtrl.indexOf(tab);
                if (-1 === tabIndex) return 0;
                var sizeData = state.tabData;
                return sizeData ? sizeData.tabs[tabIndex].page : 0;
            }
            function setPage(page) {
                if (page !== state.page) {
                    var lastPage = state.tabData.pages.length - 1;
                    return 0 > page && (page = 0), page > lastPage && (page = lastPage), state.hasPrev = page > 0, 
                    state.hasNext = lastPage > page, state.page = page, scope.$broadcast("$mdTabsPaginationChanged"), 
                    slideTabButtons(-state.tabData.pages[page].left);
                }
            }
            var tabs = element[0].getElementsByTagName("md-tab"), debouncedUpdatePagination = $$rAF.debounce(updatePagination), tabsParent = element.children(), state = scope.pagination = {
                page: -1,
                active: !1,
                clickNext: function() {
                    userChangePage(1);
                },
                clickPrevious: function() {
                    userChangePage(-1);
                }
            };
            scope.$on("$mdTabsChanged", debouncedUpdatePagination), angular.element($window).on("resize", debouncedUpdatePagination), 
            scope.$on("$destroy", function() {
                angular.element($window).off("resize", debouncedUpdatePagination);
            }), scope.$watch(function() {
                return tabsCtrl.tabToFocus;
            }, onTabFocus);
        }
        var PAGINATORS_WIDTH = 64;
        return {
            restrict: "A",
            require: "^mdTabs",
            link: postLink
        };
    }
    angular.module("material.components.tabs").directive("mdTabsPagination", TabPaginationDirective), 
    TabPaginationDirective.$inject = [ "$mdConstant", "$window", "$$rAF", "$$q", "$timeout", "$mdMedia" ];
}(), function() {
    "use strict";
    function TabItemController($scope, $element, $attrs, $compile, $animate, $mdUtil, $parse, $timeout) {
        function isDisabled() {
            return disabledParsed($scope.$parent);
        }
        function onAdd(contentArea, shouldDisconnectScope) {
            self.content.length && (self.contentContainer.append(self.content), self.contentScope = $scope.$parent.$new(), 
            contentArea.append(self.contentContainer), $compile(self.contentContainer)(self.contentScope), 
            shouldDisconnectScope === !0 && $timeout(function() {
                $mdUtil.disconnectScope(self.contentScope);
            }, 0, !1));
        }
        function onRemove() {
            self.hammertime.destroy(), $animate.leave(self.contentContainer).then(function() {
                self.contentScope && self.contentScope.$destroy(), self.contentScope = null;
            });
        }
        function toggleAnimationClass(rightToLeft) {
            self.contentContainer[rightToLeft ? "addClass" : "removeClass"]("md-transition-rtl");
        }
        function onSelect(rightToLeft) {
            $mdUtil.reconnectScope(self.contentScope), self.hammertime.on("swipeleft swiperight", $scope.onSwipe), 
            $element.addClass("active"), $element.attr("aria-selected", !0), $element.attr("tabIndex", 0), 
            toggleAnimationClass(rightToLeft), $animate.removeClass(self.contentContainer, "ng-hide"), 
            $scope.onSelect();
        }
        function onDeselect(rightToLeft) {
            $mdUtil.disconnectScope(self.contentScope), self.hammertime.off("swipeleft swiperight", $scope.onSwipe), 
            $element.removeClass("active"), $element.attr("aria-selected", !1), $element.attr("tabIndex", -1), 
            toggleAnimationClass(rightToLeft), $animate.addClass(self.contentContainer, "ng-hide"), 
            $scope.onDeselect();
        }
        var self = this;
        self.contentContainer = angular.element('<div class="md-tab-content ng-hide">'), 
        self.hammertime = new Hammer(self.contentContainer[0]), self.element = $element, 
        self.isDisabled = isDisabled, self.onAdd = onAdd, self.onRemove = onRemove, self.onSelect = onSelect, 
        self.onDeselect = onDeselect;
        var disabledParsed = $parse($attrs.ngDisabled);
    }
    angular.module("material.components.tabs").controller("$mdTab", TabItemController), 
    TabItemController.$inject = [ "$scope", "$element", "$attrs", "$compile", "$animate", "$mdUtil", "$parse", "$timeout" ];
}(), function() {
    "use strict";
    function MdTabDirective($mdInkRipple, $compile, $mdUtil, $mdConstant, $timeout) {
        function compile(element, attr) {
            var tabLabel = element.find("md-tab-label");
            tabLabel.length ? tabLabel.remove() : tabLabel = angular.isDefined(attr.label) ? angular.element("<md-tab-label>").html(attr.label) : angular.element("<md-tab-label>").append(element.contents().remove());
            var tabContent = element.contents().remove();
            return function(scope, element, attr, ctrls) {
                function transcludeTabContent() {
                    var label = tabLabel.clone();
                    element.append(label), $compile(label)(scope.$parent), tabItemCtrl.content = tabContent.clone();
                }
                function defaultClickListener() {
                    scope.$apply(function() {
                        tabsCtrl.select(tabItemCtrl), tabsCtrl.focus(tabItemCtrl);
                    });
                }
                function keydownListener(ev) {
                    ev.keyCode == $mdConstant.KEY_CODE.SPACE || ev.keyCode == $mdConstant.KEY_CODE.ENTER ? (element.triggerHandler("click"), 
                    ev.preventDefault()) : ev.keyCode === $mdConstant.KEY_CODE.LEFT_ARROW ? scope.$evalAsync(function() {
                        tabsCtrl.focus(tabsCtrl.previous(tabItemCtrl));
                    }) : ev.keyCode === $mdConstant.KEY_CODE.RIGHT_ARROW && scope.$evalAsync(function() {
                        tabsCtrl.focus(tabsCtrl.next(tabItemCtrl));
                    });
                }
                function onSwipe(ev) {
                    scope.$apply(function() {
                        tabsCtrl.select("swipeleft" === ev.type ? tabsCtrl.next() : tabsCtrl.previous());
                    });
                }
                function watchNgRepeatIndex() {
                    scope.$watch("$parent.$index", function(newIndex) {
                        tabsCtrl.move(tabItemCtrl, newIndex);
                    });
                }
                function watchActiveAttribute() {
                    function activeWatchAction(isActive) {
                        var isSelected = tabsCtrl.getSelectedItem() === tabItemCtrl;
                        isActive && !isSelected ? tabsCtrl.select(tabItemCtrl) : !isActive && isSelected && tabsCtrl.deselect(tabItemCtrl);
                    }
                    var unwatch = scope.$parent.$watch("!!(" + attr.mdActive + ")", activeWatchAction);
                    scope.$on("$destroy", unwatch);
                }
                function watchDisabled() {
                    function disabledWatchAction(isDisabled) {
                        element.attr("aria-disabled", isDisabled);
                        var isSelected = tabsCtrl.getSelectedItem() === tabItemCtrl;
                        isSelected && isDisabled && tabsCtrl.select(tabsCtrl.next() || tabsCtrl.previous());
                    }
                    scope.$watch(tabItemCtrl.isDisabled, disabledWatchAction);
                }
                function configureAria() {
                    var tabId = attr.id || "tab_" + $mdUtil.nextUid();
                    if (element.attr({
                        id: tabId,
                        role: "tab",
                        tabIndex: -1
                    }), tabContent.length) {
                        var tabContentId = "content_" + tabId;
                        element.attr("aria-controls") || element.attr("aria-controls", tabContentId), tabItemCtrl.contentContainer.attr({
                            id: tabContentId,
                            role: "tabpanel",
                            "aria-labelledby": tabId
                        });
                    }
                }
                var tabItemCtrl = ctrls[0], tabsCtrl = ctrls[1];
                scope.$watch(function() {
                    return attr.label;
                }, function() {
                    $timeout(function() {
                        tabsCtrl.scope.$broadcast("$mdTabsChanged");
                    }, 0, !1);
                }), transcludeTabContent(), configureAria();
                var detachRippleFn = $mdInkRipple.attachTabBehavior(scope, element, {
                    colorElement: tabsCtrl.inkBarElement
                });
                tabsCtrl.add(tabItemCtrl), scope.$on("$destroy", function() {
                    detachRippleFn(), tabsCtrl.remove(tabItemCtrl);
                }), element.on("$destroy", function() {
                    $timeout(function() {
                        tabsCtrl.scope.$broadcast("$mdTabsChanged");
                    }, 0, !1);
                }), angular.isDefined(attr.ngClick) || element.on("click", defaultClickListener), 
                element.on("keydown", keydownListener), scope.onSwipe = onSwipe, angular.isNumber(scope.$parent.$index) && watchNgRepeatIndex(), 
                angular.isDefined(attr.mdActive) && watchActiveAttribute(), watchDisabled();
            };
        }
        return {
            restrict: "E",
            require: [ "mdTab", "^mdTabs" ],
            controller: "$mdTab",
            scope: {
                onSelect: "&mdOnSelect",
                onDeselect: "&mdOnDeselect",
                label: "@"
            },
            compile: compile
        };
    }
    angular.module("material.components.tabs").directive("mdTab", MdTabDirective), MdTabDirective.$inject = [ "$mdInkRipple", "$compile", "$mdUtil", "$mdConstant", "$timeout" ];
}(), function() {
    "use strict";
    function MdTabsController($scope, $element, $mdUtil) {
        function getSelectedItem() {
            return itemAt($scope.selectedIndex);
        }
        function getSelectedIndex() {
            return $scope.selectedIndex;
        }
        function add(tab, index) {
            tabsList.add(tab, index), angular.isDefined(tab.element.attr("md-active")) || -1 !== $scope.selectedIndex && angular.isNumber($scope.selectedIndex) && $scope.selectedIndex !== self.indexOf(tab) ? tab.onAdd(self.contentArea, !0) : (tab.onAdd(self.contentArea, !1), 
            self.select(tab)), $scope.$broadcast("$mdTabsChanged");
        }
        function remove(tab, noReselect) {
            if (tabsList.contains(tab) && !noReselect) {
                var isSelectedItem = getSelectedItem() === tab, newTab = previous() || next();
                deselect(tab), tabsList.remove(tab), tab.onRemove(), $scope.$broadcast("$mdTabsChanged"), 
                isSelectedItem && select(newTab);
            }
        }
        function move(tab, toIndex) {
            var isSelected = getSelectedItem() === tab;
            tabsList.remove(tab), tabsList.add(tab, toIndex), isSelected && select(tab), $scope.$broadcast("$mdTabsChanged");
        }
        function select(tab, rightToLeft) {
            !tab || tab.isSelected || tab.isDisabled() || tabsList.contains(tab) && (angular.isDefined(rightToLeft) || (rightToLeft = indexOf(tab) < $scope.selectedIndex), 
            deselect(getSelectedItem(), rightToLeft), $scope.selectedIndex = indexOf(tab), tab.isSelected = !0, 
            tab.onSelect(rightToLeft), $scope.$broadcast("$mdTabsChanged"));
        }
        function focus(tab) {
            self.tabToFocus = tab;
        }
        function deselect(tab, rightToLeft) {
            tab && tab.isSelected && tabsList.contains(tab) && ($scope.selectedIndex = -1, tab.isSelected = !1, 
            tab.onDeselect(rightToLeft));
        }
        function next(tab, filterFn) {
            return tabsList.next(tab || getSelectedItem(), filterFn || isTabEnabled);
        }
        function previous(tab, filterFn) {
            return tabsList.previous(tab || getSelectedItem(), filterFn || isTabEnabled);
        }
        function isTabEnabled(tab) {
            return tab && !tab.isDisabled();
        }
        var tabsList = $mdUtil.iterator([], !1), self = this;
        self.$element = $element, self.scope = $scope;
        var indexOf = (self.contentArea = angular.element($element[0].querySelector(".md-tabs-content")), 
        self.inRange = tabsList.inRange, self.indexOf = tabsList.indexOf), itemAt = self.itemAt = tabsList.itemAt;
        self.count = tabsList.count, self.getSelectedItem = getSelectedItem, self.getSelectedIndex = getSelectedIndex, 
        self.add = add, self.remove = remove, self.move = move, self.select = select, self.focus = focus, 
        self.deselect = deselect, self.next = next, self.previous = previous, $scope.$on("$destroy", function() {
            deselect(getSelectedItem());
            for (var i = tabsList.count() - 1; i >= 0; i--) remove(tabsList[i], !0);
        });
    }
    angular.module("material.components.tabs").controller("$mdTabs", MdTabsController), 
    MdTabsController.$inject = [ "$scope", "$element", "$mdUtil", "$timeout" ];
}(), function() {
    "use strict";
    function TabsDirective($mdTheming) {
        function postLink(scope, element, attr, tabsCtrl, transclude) {
            function configureAria() {
                element.attr("role", "tablist");
            }
            function watchSelected() {
                scope.$watch("selectedIndex", function(newIndex, oldIndex) {
                    if (oldIndex != newIndex) {
                        var rightToLeft = oldIndex > newIndex;
                        if (tabsCtrl.deselect(tabsCtrl.itemAt(oldIndex), rightToLeft), tabsCtrl.inRange(newIndex)) {
                            for (var newTab = tabsCtrl.itemAt(newIndex); newTab && newTab.isDisabled(); ) newTab = newIndex > oldIndex ? tabsCtrl.next(newTab) : tabsCtrl.previous(newTab);
                            tabsCtrl.select(newTab, rightToLeft);
                        }
                    }
                });
            }
            scope.stretchTabs = attr.hasOwnProperty("mdStretchTabs") ? attr.mdStretchTabs || "always" : "auto", 
            $mdTheming(element), configureAria(), watchSelected(), transclude(scope.$parent, function(clone) {
                angular.element(element[0].querySelector(".md-header-items")).append(clone);
            });
        }
        return {
            restrict: "E",
            controller: "$mdTabs",
            require: "mdTabs",
            transclude: !0,
            scope: {
                selectedIndex: "=?mdSelected"
            },
            template: '<section class="md-header" ng-class="{\'md-paginating\': pagination.active}"><button class="md-paginator md-prev" ng-if="pagination.active && pagination.hasPrev" ng-click="pagination.clickPrevious()" aria-hidden="true"></button><div class="md-header-items-container" md-tabs-pagination><div class="md-header-items"><md-tabs-ink-bar></md-tabs-ink-bar></div></div><button class="md-paginator md-next" ng-if="pagination.active && pagination.hasNext" ng-click="pagination.clickNext()" aria-hidden="true"></button></section><section class="md-tabs-content"></section>',
            link: postLink
        };
    }
    angular.module("material.components.tabs").directive("mdTabs", TabsDirective), TabsDirective.$inject = [ "$mdTheming" ];
}(), angular.module("material.core").constant("$MD_THEME_CSS", "md-backdrop.md-opaque.md-THEME_NAME-theme {  background-color: '{{foreground-4-0.5}}';  position: absolute; }md-bottom-sheet.md-THEME_NAME-theme {  background-color: '{{background-50}}';  border-top-color: '{{background-300}}'; }  md-bottom-sheet.md-THEME_NAME-theme.md-list md-item {    color: '{{foreground-1}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    background-color: '{{background-50}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    color: '{{foreground-1}}'; }.md-button.md-THEME_NAME-theme {  border-radius: 3px; }  .md-button.md-THEME_NAME-theme:not([disabled]):hover, .md-button.md-THEME_NAME-theme:not([disabled]):focus {    background-color: '{{background-500-0.2}}'; }  .md-button.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }    .md-button.md-THEME_NAME-theme.md-primary.md-raised, .md-button.md-THEME_NAME-theme.md-primary.md-fab {      color: '{{primary-contrast}}';      background-color: '{{primary-color}}'; }      .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):focus {        background-color: '{{primary-600}}'; }  .md-button.md-THEME_NAME-theme.md-fab {    border-radius: 50%; }  .md-button.md-THEME_NAME-theme.md-raised, .md-button.md-THEME_NAME-theme.md-fab {    color: '{{background-contrast}}';    background-color: '{{background-500-0.185}}'; }    .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):focus {      background-color: '{{background-500-0.3}}'; }  .md-button.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }    .md-button.md-THEME_NAME-theme.md-warn.md-raised, .md-button.md-THEME_NAME-theme.md-warn.md-fab {      color: '{{warn-contrast}}';      background-color: '{{warn-color}}'; }      .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):focus {        background-color: '{{warn-700}}'; }  .md-button.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }    .md-button.md-THEME_NAME-theme.md-accent.md-raised, .md-button.md-THEME_NAME-theme.md-accent.md-fab {      color: '{{accent-contrast}}';      background-color: '{{accent-color}}'; }      .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):focus {        background-color: '{{accent-700}}'; }  .md-button.md-THEME_NAME-theme[disabled], .md-button.md-THEME_NAME-theme.md-raised[disabled], .md-button.md-THEME_NAME-theme.md-fab[disabled] {    color: '{{foreground-3}}';    background-color: transparent;    cursor: not-allowed; }md-checkbox.md-THEME_NAME-theme .md-ripple {  color: '{{primary-600}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon {  background-color: '{{primary-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-accent .md-ripple {  color: '{{accent-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-accent.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-accent .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-accent.md-checked .md-icon {  background-color: '{{accent-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-accent.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple {  color: '{{warn-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon {  background-color: '{{warn-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme[disabled] .md-icon {  border-color: '{{foreground-3}}'; }md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon {  background-color: '{{foreground-3}}'; }md-card.md-THEME_NAME-theme {  border-radius: 2px; }  md-card.md-THEME_NAME-theme .md-card-image {    border-radius: 2px 2px 0 0; }md-content.md-THEME_NAME-theme {  background-color: '{{background-hue-3}}'; }md-dialog.md-THEME_NAME-theme {  border-radius: 4px;  background-color: '{{background-hue-3}}'; }  md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions {    border-top-color: '{{foreground-4}}'; }md-divider.md-THEME_NAME-theme {  border-top-color: '{{foreground-4}}'; }md-input-container.md-THEME_NAME-theme .md-input {  color: '{{foreground-1}}';  border-color: '{{foreground-4}}';  text-shadow: '{{foreground-shadow}}'; }  md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder, md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder {    color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme label {  text-shadow: '{{foreground-shadow}}';  color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label {  color: '{{foreground-2}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input {  border-color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label {  color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input {  border-color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label {  color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input {  border-color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input {  border-color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid label {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid data-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid x-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid [ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [data-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [x-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme .md-input[disabled] {  border-bottom-color: transparent;  color: '{{foreground-3}}';  background-image: linear-gradient(to right, '{{foreground-4}}' 0%, '{{foreground-4}}' 33%, transparent 0%); }md-progress-circular.md-THEME_NAME-theme {  background-color: transparent; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-gap {    border-top-color: '{{primary-color}}';    border-bottom-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-top-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-right-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle {    border-left-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-gap {    border-top-color: '{{warn-color}}';    border-bottom-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-top-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-right-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle {    border-left-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-gap {    border-top-color: '{{accent-color}}';    border-bottom-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-top-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-right-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle {    border-left-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme .md-container {  background-color: '{{primary-100}}'; }md-progress-linear.md-THEME_NAME-theme .md-bar {  background-color: '{{primary-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-container {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar {  background-color: '{{warn-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-container {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar {  background-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1 {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before {  background: radial-gradient('{{warn-100}}' 0%, '{{warn-100}}' 16%, transparent 42%); }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1 {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before {  background: radial-gradient('{{accent-100}}' 0%, '{{accent-100}}' 16%, transparent 42%); }md-radio-button.md-THEME_NAME-theme .md-off {  border-color: '{{foreground-2}}'; }md-radio-button.md-THEME_NAME-theme .md-on {  background-color: '{{primary-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-off {  border-color: '{{primary-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple {  color: '{{primary-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme .md-container .md-ripple {  color: '{{primary-600}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-accent .md-on {  background-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-accent.md-checked .md-off {  border-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-accent.md-checked .md-ink-ripple {  color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-accent .md-container .md-ripple {  color: '{{accent-600}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-on {  background-color: '{{warn-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off {  border-color: '{{warn-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple {  color: '{{warn-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple {  color: '{{warn-600}}'; }md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-off {  border-color: '{{foreground-3}}'; }md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-on {  border-color: '{{foreground-3}}'; }md-radio-group.md-THEME_NAME-theme:focus:not(:empty) {  border-color: '{{foreground-1}}'; }md-sidenav.md-THEME_NAME-theme {  background-color: '{{background-hue-3}}'; }md-slider.md-THEME_NAME-theme .md-track {  background-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme .md-track-ticks {  background-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-focus-thumb {  background-color: '{{foreground-2}}'; }md-slider.md-THEME_NAME-theme .md-focus-ring {  border-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-disabled-thumb {  border-color: '{{background-hue-3}}'; }md-slider.md-THEME_NAME-theme.md-min .md-thumb:after {  background-color: '{{background-hue-3}}'; }md-slider.md-THEME_NAME-theme .md-track.md-track-fill {  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb:after {  border-color: '{{primary-color}}';  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme .md-sign {  background-color: '{{primary-color}}'; }  md-slider.md-THEME_NAME-theme .md-sign:after {    border-top-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb-text {  color: '{{primary-contrast}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-track-fill {  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after {  border-color: '{{warn-color}}';  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-sign {  background-color: '{{warn-color}}'; }  md-slider.md-THEME_NAME-theme.md-warn .md-sign:after {    border-top-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text {  color: '{{warn-contrast}}'; }md-slider.md-THEME_NAME-theme.md-accent .md-track-fill {  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme.md-accent .md-thumb:after {  border-color: '{{accent-color}}';  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme.md-accent .md-sign {  background-color: '{{accent-color}}'; }  md-slider.md-THEME_NAME-theme.md-accent .md-sign:after {    border-top-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme.md-accent .md-thumb-text {  color: '{{accent-contrast}}'; }md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after {  border-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after {  background-color: '{{foreground-3}}'; }.md-subheader.md-THEME_NAME-theme {  color: '{{ foreground-2-0.23 }}';  background-color: '{{background-hue-3}}'; }  .md-subheader.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme .md-thumb {  background-color: '{{background-50}}'; }md-switch.md-THEME_NAME-theme .md-bar {  background-color: '{{background-500}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-thumb {  background-color: '{{primary-color}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-bar {  background-color: '{{primary-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-accent .md-thumb {  background-color: '{{accent-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-accent .md-bar {  background-color: '{{accent-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-thumb {  background-color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-bar {  background-color: '{{warn-color-0.5}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-thumb {  background-color: '{{background-400}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-bar {  background-color: '{{foreground-4}}'; }md-switch.md-THEME_NAME-theme:focus .md-label:not(:empty) {  border-color: '{{foreground-1}}';  border-style: dotted; }md-tabs.md-THEME_NAME-theme .md-header {  background-color: '{{primary-color}}'; }md-tabs.md-THEME_NAME-theme.md-accent .md-header {  background-color: '{{accent-color}}'; }md-tabs.md-THEME_NAME-theme.md-accent md-tab:not([disabled]) {  color: '{{accent-100}}'; }  md-tabs.md-THEME_NAME-theme.md-accent md-tab:not([disabled]).active {    color: '{{accent-contrast}}'; }md-tabs.md-THEME_NAME-theme.md-warn .md-header {  background-color: '{{warn-color}}'; }md-tabs.md-THEME_NAME-theme.md-warn md-tab:not([disabled]) {  color: '{{warn-100}}'; }  md-tabs.md-THEME_NAME-theme.md-warn md-tab:not([disabled]).active {    color: '{{warn-contrast}}'; }md-tabs.md-THEME_NAME-theme md-tabs-ink-bar {  color: '{{primary-contrast}}';  background: '{{primary-contrast}}'; }md-tabs.md-THEME_NAME-theme md-tab {  color: '{{primary-100}}'; }  md-tabs.md-THEME_NAME-theme md-tab.active {    color: '{{primary-contrast}}'; }  md-tabs.md-THEME_NAME-theme md-tab[disabled] {    color: '{{foreground-4}}'; }  md-tabs.md-THEME_NAME-theme md-tab:focus {    color: '{{primary-contrast}}';    background-color: '{{primary-contrast-0.1}}'; }  md-tabs.md-THEME_NAME-theme md-tab .md-ripple-container {    color: '{{primary-contrast}}'; }md-input-group.md-THEME_NAME-theme input, md-input-group.md-THEME_NAME-theme textarea {  text-shadow: '{{foreground-shadow}}'; }  md-input-group.md-THEME_NAME-theme input::-webkit-input-placeholder, md-input-group.md-THEME_NAME-theme input::-moz-placeholder, md-input-group.md-THEME_NAME-theme input:-moz-placeholder, md-input-group.md-THEME_NAME-theme input:-ms-input-placeholder, md-input-group.md-THEME_NAME-theme textarea::-webkit-input-placeholder, md-input-group.md-THEME_NAME-theme textarea::-moz-placeholder, md-input-group.md-THEME_NAME-theme textarea:-moz-placeholder, md-input-group.md-THEME_NAME-theme textarea:-ms-input-placeholder {    color: '{{foreground-3}}'; }md-input-group.md-THEME_NAME-theme label {  text-shadow: '{{foreground-shadow}}';  color: '{{foreground-3}}'; }md-input-group.md-THEME_NAME-theme input, md-input-group.md-THEME_NAME-theme textarea {  color: '{{foreground-1}}';  border-color: '{{foreground-4}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused input, md-input-group.md-THEME_NAME-theme.md-input-focused textarea {  border-color: '{{primary-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused label {  color: '{{primary-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused.md-accent input, md-input-group.md-THEME_NAME-theme.md-input-focused.md-accent textarea {  border-color: '{{accent-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused.md-accent label {  color: '{{accent-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-has-value:not(.md-input-focused) label {  color: '{{foreground-2}}'; }md-input-group.md-THEME_NAME-theme .md-input[disabled] {  border-bottom-color: '{{foreground-4}}';  color: '{{foreground-3}}'; }md-toast.md-THEME_NAME-theme {  background-color: '{{foreground-1}}';  color: '{{background-50}}'; }  md-toast.md-THEME_NAME-theme .md-button {    color: '{{background-50}}'; }  md-toast.md-THEME_NAME-theme .md-action {    color: '{{primary-A200}}'; }    md-toast.md-THEME_NAME-theme .md-action.md-accent {      color: '{{accent-A200}}'; }    md-toast.md-THEME_NAME-theme .md-action.md-warn {      color: '{{warn-A200}}'; }md-toolbar.md-THEME_NAME-theme {  background-color: '{{primary-color}}';  color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme .md-button {    color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme.md-accent {    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }  md-toolbar.md-THEME_NAME-theme.md-warn {    background-color: '{{warn-color}}';    color: '{{warn-contrast}}'; }md-tooltip.md-THEME_NAME-theme {  color: '{{background-A100}}'; }  md-tooltip.md-THEME_NAME-theme .md-background {    background-color: '{{foreground-2}}'; }"), 
function() {
    "use strict";
    angular.module("wu.masonry", []).controller("MasonryCtrl", [ "$scope", "$element", "$timeout", function($scope, $element, $timeout) {
        function defaultLoaded($element) {
            $element.addClass("loaded");
        }
        var bricks = {}, schedule = [], destroyed = !1, self = this, timeout = null;
        this.preserveOrder = !1, this.loadImages = !0, this.scheduleMasonryOnce = function() {
            var args = arguments, found = schedule.filter(function(item) {
                return item[0] === args[0];
            }).length > 0;
            found || this.scheduleMasonry.apply(null, arguments);
        }, this.scheduleMasonry = function() {
            timeout && $timeout.cancel(timeout), schedule.push([].slice.call(arguments)), timeout = $timeout(function() {
                destroyed || (schedule.forEach(function(args) {
                    $element.masonry.apply($element, args);
                }), schedule = []);
            }, 30);
        }, this.appendBrick = function(element, id) {
            function _append() {
                0 === Object.keys(bricks).length && $element.masonry("resize"), void 0 === bricks[id] && (bricks[id] = !0, 
                defaultLoaded(element), $element.masonry("appended", element, !0));
            }
            function _layout() {
                self.scheduleMasonryOnce("layout");
            }
            destroyed || (self.loadImages ? self.preserveOrder ? (_append(), element.imagesLoaded(_layout)) : element.imagesLoaded(function() {
                _append(), _layout();
            }) : (_append(), _layout()));
        }, this.removeBrick = function(id, element) {
            destroyed || (delete bricks[id], $element.masonry("remove", element), this.scheduleMasonryOnce("layout"));
        }, this.destroy = function() {
            destroyed = !0, $element.data("masonry") && $element.masonry("destroy"), $scope.$emit("masonry.destroyed"), 
            bricks = [];
        }, this.reload = function() {
            $element.masonry(), $scope.$emit("masonry.reloaded");
        };
    } ]).directive("masonry", function() {
        return {
            restrict: "AE",
            controller: "MasonryCtrl",
            link: {
                pre: function(scope, element, attrs, ctrl) {
                    var attrOptions = scope.$eval(attrs.masonry || attrs.masonryOptions), options = angular.extend({
                        itemSelector: attrs.itemSelector || ".masonry-brick",
                        columnWidth: parseInt(attrs.columnWidth, 10) || attrs.columnWidth
                    }, attrOptions || {});
                    element.masonry(options);
                    var loadImages = scope.$eval(attrs.loadImages);
                    ctrl.loadImages = loadImages !== !1;
                    var preserveOrder = scope.$eval(attrs.preserveOrder);
                    ctrl.preserveOrder = preserveOrder !== !1 && void 0 !== attrs.preserveOrder;
                    var reloadOnShow = scope.$eval(attrs.reloadOnShow);
                    reloadOnShow !== !1 && void 0 !== attrs.reloadOnShow && scope.$watch(function() {
                        return element.prop("offsetParent");
                    }, function(isVisible, wasVisible) {
                        isVisible && !wasVisible && ctrl.reload();
                    }), scope.$emit("masonry.created", element), scope.$on("$destroy", ctrl.destroy);
                }
            }
        };
    }).directive("masonryBrick", function() {
        return {
            restrict: "AC",
            require: "^masonry",
            scope: !0,
            link: {
                pre: function(scope, element, attrs, ctrl) {
                    var index, id = scope.$id;
                    ctrl.appendBrick(element, id), element.on("$destroy", function() {
                        ctrl.removeBrick(id, element);
                    }), scope.$on("masonry.reload", function() {
                        ctrl.scheduleMasonryOnce("reloadItems"), ctrl.scheduleMasonryOnce("layout");
                    }), scope.$watch("$index", function() {
                        void 0 !== index && index !== scope.$index && (ctrl.scheduleMasonryOnce("reloadItems"), 
                        ctrl.scheduleMasonryOnce("layout")), index = scope.$index;
                    });
                }
            }
        };
    });
}(), angular.module("pascalprecht.translate", [ "ng" ]).run([ "$translate", function($translate) {
    var key = $translate.storageKey(), storage = $translate.storage(), fallbackFromIncorrectStorageValue = function() {
        var preferred = $translate.preferredLanguage();
        angular.isString(preferred) ? $translate.use(preferred) : storage.put(key, $translate.use());
    };
    storage ? storage.get(key) ? $translate.use(storage.get(key))["catch"](fallbackFromIncorrectStorageValue) : fallbackFromIncorrectStorageValue() : angular.isString($translate.preferredLanguage()) && $translate.use($translate.preferredLanguage());
} ]), angular.module("pascalprecht.translate").provider("$translate", [ "$STORAGE_KEY", function($STORAGE_KEY) {
    var $preferredLanguage, $languageKeyAliases, $fallbackLanguage, $fallbackWasString, $uses, $nextLang, $storageFactory, $storagePrefix, $missingTranslationHandlerFactory, $interpolationFactory, $loaderFactory, $loaderOptions, $notFoundIndicatorLeft, $notFoundIndicatorRight, loaderCache, $translationTable = {}, $availableLanguageKeys = [], $storageKey = $STORAGE_KEY, $interpolatorFactories = [], $interpolationSanitizationStrategy = !1, $cloakClassName = "translate-cloak", $postCompilingEnabled = !1, NESTED_OBJECT_DELIMITER = ".", version = "2.5.2", getFirstBrowserLanguage = function() {
        var i, language, nav = window.navigator, browserLanguagePropertyKeys = [ "language", "browserLanguage", "systemLanguage", "userLanguage" ];
        if (angular.isArray(nav.languages)) for (i = 0; i < nav.languages.length; i++) if (language = nav.languages[i], 
        language && language.length) return language;
        for (i = 0; i < browserLanguagePropertyKeys.length; i++) if (language = nav[browserLanguagePropertyKeys[i]], 
        language && language.length) return language;
        return null;
    };
    getFirstBrowserLanguage.displayName = "angular-translate/service: getFirstBrowserLanguage";
    var getLocale = function() {
        return (getFirstBrowserLanguage() || "").split("-").join("_");
    };
    getLocale.displayName = "angular-translate/service: getLocale";
    var indexOf = function(array, searchElement) {
        for (var i = 0, len = array.length; len > i; i++) if (array[i] === searchElement) return i;
        return -1;
    }, trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    }, negotiateLocale = function(preferred) {
        for (var avail = [], locale = angular.lowercase(preferred), i = 0, n = $availableLanguageKeys.length; n > i; i++) avail.push(angular.lowercase($availableLanguageKeys[i]));
        if (indexOf(avail, locale) > -1) return preferred;
        if ($languageKeyAliases) {
            var alias;
            for (var langKeyAlias in $languageKeyAliases) {
                var hasWildcardKey = !1, hasExactKey = Object.prototype.hasOwnProperty.call($languageKeyAliases, langKeyAlias) && angular.lowercase(langKeyAlias) === angular.lowercase(preferred);
                if ("*" === langKeyAlias.slice(-1) && (hasWildcardKey = langKeyAlias.slice(0, -1) === preferred.slice(0, langKeyAlias.length - 1)), 
                (hasExactKey || hasWildcardKey) && (alias = $languageKeyAliases[langKeyAlias], indexOf(avail, angular.lowercase(alias)) > -1)) return alias;
            }
        }
        var parts = preferred.split("_");
        return parts.length > 1 && indexOf(avail, angular.lowercase(parts[0])) > -1 ? parts[0] : preferred;
    }, translations = function(langKey, translationTable) {
        if (!langKey && !translationTable) return $translationTable;
        if (langKey && !translationTable) {
            if (angular.isString(langKey)) return $translationTable[langKey];
        } else angular.isObject($translationTable[langKey]) || ($translationTable[langKey] = {}), 
        angular.extend($translationTable[langKey], flatObject(translationTable));
        return this;
    };
    this.translations = translations, this.cloakClassName = function(name) {
        return name ? ($cloakClassName = name, this) : $cloakClassName;
    };
    var flatObject = function(data, path, result, prevKey) {
        var key, keyWithPath, keyWithShortPath, val;
        path || (path = []), result || (result = {});
        for (key in data) Object.prototype.hasOwnProperty.call(data, key) && (val = data[key], 
        angular.isObject(val) ? flatObject(val, path.concat(key), result, key) : (keyWithPath = path.length ? "" + path.join(NESTED_OBJECT_DELIMITER) + NESTED_OBJECT_DELIMITER + key : key, 
        path.length && key === prevKey && (keyWithShortPath = "" + path.join(NESTED_OBJECT_DELIMITER), 
        result[keyWithShortPath] = "@:" + keyWithPath), result[keyWithPath] = val));
        return result;
    };
    this.addInterpolation = function(factory) {
        return $interpolatorFactories.push(factory), this;
    }, this.useMessageFormatInterpolation = function() {
        return this.useInterpolation("$translateMessageFormatInterpolation");
    }, this.useInterpolation = function(factory) {
        return $interpolationFactory = factory, this;
    }, this.useSanitizeValueStrategy = function(value) {
        return $interpolationSanitizationStrategy = value, this;
    }, this.preferredLanguage = function(langKey) {
        return setupPreferredLanguage(langKey), this;
    };
    var setupPreferredLanguage = function(langKey) {
        return langKey && ($preferredLanguage = langKey), $preferredLanguage;
    };
    this.translationNotFoundIndicator = function(indicator) {
        return this.translationNotFoundIndicatorLeft(indicator), this.translationNotFoundIndicatorRight(indicator), 
        this;
    }, this.translationNotFoundIndicatorLeft = function(indicator) {
        return indicator ? ($notFoundIndicatorLeft = indicator, this) : $notFoundIndicatorLeft;
    }, this.translationNotFoundIndicatorRight = function(indicator) {
        return indicator ? ($notFoundIndicatorRight = indicator, this) : $notFoundIndicatorRight;
    }, this.fallbackLanguage = function(langKey) {
        return fallbackStack(langKey), this;
    };
    var fallbackStack = function(langKey) {
        return langKey ? (angular.isString(langKey) ? ($fallbackWasString = !0, $fallbackLanguage = [ langKey ]) : angular.isArray(langKey) && ($fallbackWasString = !1, 
        $fallbackLanguage = langKey), angular.isString($preferredLanguage) && indexOf($fallbackLanguage, $preferredLanguage) < 0 && $fallbackLanguage.push($preferredLanguage), 
        this) : $fallbackWasString ? $fallbackLanguage[0] : $fallbackLanguage;
    };
    this.use = function(langKey) {
        if (langKey) {
            if (!$translationTable[langKey] && !$loaderFactory) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + langKey + "'");
            return $uses = langKey, this;
        }
        return $uses;
    };
    var storageKey = function(key) {
        return key ? void ($storageKey = key) : $storagePrefix ? $storagePrefix + $storageKey : $storageKey;
    };
    this.storageKey = storageKey, this.useUrlLoader = function(url, options) {
        return this.useLoader("$translateUrlLoader", angular.extend({
            url: url
        }, options));
    }, this.useStaticFilesLoader = function(options) {
        return this.useLoader("$translateStaticFilesLoader", options);
    }, this.useLoader = function(loaderFactory, options) {
        return $loaderFactory = loaderFactory, $loaderOptions = options || {}, this;
    }, this.useLocalStorage = function() {
        return this.useStorage("$translateLocalStorage");
    }, this.useCookieStorage = function() {
        return this.useStorage("$translateCookieStorage");
    }, this.useStorage = function(storageFactory) {
        return $storageFactory = storageFactory, this;
    }, this.storagePrefix = function(prefix) {
        return prefix ? ($storagePrefix = prefix, this) : prefix;
    }, this.useMissingTranslationHandlerLog = function() {
        return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog");
    }, this.useMissingTranslationHandler = function(factory) {
        return $missingTranslationHandlerFactory = factory, this;
    }, this.usePostCompiling = function(value) {
        return $postCompilingEnabled = !!value, this;
    }, this.determinePreferredLanguage = function(fn) {
        var locale = fn && angular.isFunction(fn) ? fn() : getLocale();
        return $preferredLanguage = $availableLanguageKeys.length ? negotiateLocale(locale) : locale, 
        this;
    }, this.registerAvailableLanguageKeys = function(languageKeys, aliases) {
        return languageKeys ? ($availableLanguageKeys = languageKeys, aliases && ($languageKeyAliases = aliases), 
        this) : $availableLanguageKeys;
    }, this.useLoaderCache = function(cache) {
        return cache === !1 ? loaderCache = void 0 : cache === !0 ? loaderCache = !0 : "undefined" == typeof cache ? loaderCache = "$translationCache" : cache && (loaderCache = cache), 
        this;
    }, this.$get = [ "$log", "$injector", "$rootScope", "$q", function($log, $injector, $rootScope, $q) {
        var Storage, fallbackIndex, startFallbackIteration, defaultInterpolator = $injector.get($interpolationFactory || "$translateDefaultInterpolation"), pendingLoader = !1, interpolatorHashMap = {}, langPromises = {}, $translate = function(translationId, interpolateParams, interpolationId) {
            if (angular.isArray(translationId)) {
                var translateAll = function(translationIds) {
                    for (var results = {}, promises = [], translate = function(translationId) {
                        var deferred = $q.defer(), regardless = function(value) {
                            results[translationId] = value, deferred.resolve([ translationId, value ]);
                        };
                        return $translate(translationId, interpolateParams, interpolationId).then(regardless, regardless), 
                        deferred.promise;
                    }, i = 0, c = translationIds.length; c > i; i++) promises.push(translate(translationIds[i]));
                    return $q.all(promises).then(function() {
                        return results;
                    });
                };
                return translateAll(translationId);
            }
            var deferred = $q.defer();
            translationId && (translationId = trim.apply(translationId));
            var promiseToWaitFor = function() {
                var promise = $preferredLanguage ? langPromises[$preferredLanguage] : langPromises[$uses];
                if (fallbackIndex = 0, $storageFactory && !promise) {
                    var langKey = Storage.get($storageKey);
                    if (promise = langPromises[langKey], $fallbackLanguage && $fallbackLanguage.length) {
                        var index = indexOf($fallbackLanguage, langKey);
                        fallbackIndex = 0 === index ? 1 : 0, indexOf($fallbackLanguage, $preferredLanguage) < 0 && $fallbackLanguage.push($preferredLanguage);
                    }
                }
                return promise;
            }();
            return promiseToWaitFor ? promiseToWaitFor.then(function() {
                determineTranslation(translationId, interpolateParams, interpolationId).then(deferred.resolve, deferred.reject);
            }, deferred.reject) : determineTranslation(translationId, interpolateParams, interpolationId).then(deferred.resolve, deferred.reject), 
            deferred.promise;
        }, applyNotFoundIndicators = function(translationId) {
            return $notFoundIndicatorLeft && (translationId = [ $notFoundIndicatorLeft, translationId ].join(" ")), 
            $notFoundIndicatorRight && (translationId = [ translationId, $notFoundIndicatorRight ].join(" ")), 
            translationId;
        }, useLanguage = function(key) {
            $uses = key, $rootScope.$emit("$translateChangeSuccess", {
                language: key
            }), $storageFactory && Storage.put($translate.storageKey(), $uses), defaultInterpolator.setLocale($uses), 
            angular.forEach(interpolatorHashMap, function(interpolator, id) {
                interpolatorHashMap[id].setLocale($uses);
            }), $rootScope.$emit("$translateChangeEnd", {
                language: key
            });
        }, loadAsync = function(key) {
            if (!key) throw "No language key specified for loading.";
            var deferred = $q.defer();
            $rootScope.$emit("$translateLoadingStart", {
                language: key
            }), pendingLoader = !0;
            var cache = loaderCache;
            "string" == typeof cache && (cache = $injector.get(cache));
            var loaderOptions = angular.extend({}, $loaderOptions, {
                key: key,
                $http: angular.extend({}, {
                    cache: cache
                }, $loaderOptions.$http)
            });
            return $injector.get($loaderFactory)(loaderOptions).then(function(data) {
                var translationTable = {};
                $rootScope.$emit("$translateLoadingSuccess", {
                    language: key
                }), angular.isArray(data) ? angular.forEach(data, function(table) {
                    angular.extend(translationTable, flatObject(table));
                }) : angular.extend(translationTable, flatObject(data)), pendingLoader = !1, deferred.resolve({
                    key: key,
                    table: translationTable
                }), $rootScope.$emit("$translateLoadingEnd", {
                    language: key
                });
            }, function(key) {
                $rootScope.$emit("$translateLoadingError", {
                    language: key
                }), deferred.reject(key), $rootScope.$emit("$translateLoadingEnd", {
                    language: key
                });
            }), deferred.promise;
        };
        if ($storageFactory && (Storage = $injector.get($storageFactory), !Storage.get || !Storage.put)) throw new Error("Couldn't use storage '" + $storageFactory + "', missing get() or put() method!");
        angular.isFunction(defaultInterpolator.useSanitizeValueStrategy) && defaultInterpolator.useSanitizeValueStrategy($interpolationSanitizationStrategy), 
        $interpolatorFactories.length && angular.forEach($interpolatorFactories, function(interpolatorFactory) {
            var interpolator = $injector.get(interpolatorFactory);
            interpolator.setLocale($preferredLanguage || $uses), angular.isFunction(interpolator.useSanitizeValueStrategy) && interpolator.useSanitizeValueStrategy($interpolationSanitizationStrategy), 
            interpolatorHashMap[interpolator.getInterpolationIdentifier()] = interpolator;
        });
        var getTranslationTable = function(langKey) {
            var deferred = $q.defer();
            return Object.prototype.hasOwnProperty.call($translationTable, langKey) ? deferred.resolve($translationTable[langKey]) : langPromises[langKey] ? langPromises[langKey].then(function(data) {
                translations(data.key, data.table), deferred.resolve(data.table);
            }, deferred.reject) : deferred.reject(), deferred.promise;
        }, getFallbackTranslation = function(langKey, translationId, interpolateParams, Interpolator) {
            var deferred = $q.defer();
            return getTranslationTable(langKey).then(function(translationTable) {
                Object.prototype.hasOwnProperty.call(translationTable, translationId) ? (Interpolator.setLocale(langKey), 
                deferred.resolve(Interpolator.interpolate(translationTable[translationId], interpolateParams)), 
                Interpolator.setLocale($uses)) : deferred.reject();
            }, deferred.reject), deferred.promise;
        }, getFallbackTranslationInstant = function(langKey, translationId, interpolateParams, Interpolator) {
            var result, translationTable = $translationTable[langKey];
            return translationTable && Object.prototype.hasOwnProperty.call(translationTable, translationId) && (Interpolator.setLocale(langKey), 
            result = Interpolator.interpolate(translationTable[translationId], interpolateParams), 
            Interpolator.setLocale($uses)), result;
        }, translateByHandler = function(translationId) {
            if ($missingTranslationHandlerFactory) {
                var resultString = $injector.get($missingTranslationHandlerFactory)(translationId, $uses);
                return void 0 !== resultString ? resultString : translationId;
            }
            return translationId;
        }, resolveForFallbackLanguage = function(fallbackLanguageIndex, translationId, interpolateParams, Interpolator) {
            var deferred = $q.defer();
            if (fallbackLanguageIndex < $fallbackLanguage.length) {
                var langKey = $fallbackLanguage[fallbackLanguageIndex];
                getFallbackTranslation(langKey, translationId, interpolateParams, Interpolator).then(deferred.resolve, function() {
                    resolveForFallbackLanguage(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator).then(deferred.resolve);
                });
            } else deferred.resolve(translateByHandler(translationId));
            return deferred.promise;
        }, resolveForFallbackLanguageInstant = function(fallbackLanguageIndex, translationId, interpolateParams, Interpolator) {
            var result;
            if (fallbackLanguageIndex < $fallbackLanguage.length) {
                var langKey = $fallbackLanguage[fallbackLanguageIndex];
                result = getFallbackTranslationInstant(langKey, translationId, interpolateParams, Interpolator), 
                result || (result = resolveForFallbackLanguageInstant(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator));
            }
            return result;
        }, fallbackTranslation = function(translationId, interpolateParams, Interpolator) {
            return resolveForFallbackLanguage(startFallbackIteration > 0 ? startFallbackIteration : fallbackIndex, translationId, interpolateParams, Interpolator);
        }, fallbackTranslationInstant = function(translationId, interpolateParams, Interpolator) {
            return resolveForFallbackLanguageInstant(startFallbackIteration > 0 ? startFallbackIteration : fallbackIndex, translationId, interpolateParams, Interpolator);
        }, determineTranslation = function(translationId, interpolateParams, interpolationId) {
            var deferred = $q.defer(), table = $uses ? $translationTable[$uses] : $translationTable, Interpolator = interpolationId ? interpolatorHashMap[interpolationId] : defaultInterpolator;
            if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
                var translation = table[translationId];
                "@:" === translation.substr(0, 2) ? $translate(translation.substr(2), interpolateParams, interpolationId).then(deferred.resolve, deferred.reject) : deferred.resolve(Interpolator.interpolate(translation, interpolateParams));
            } else {
                var missingTranslationHandlerTranslation;
                $missingTranslationHandlerFactory && !pendingLoader && (missingTranslationHandlerTranslation = translateByHandler(translationId)), 
                $uses && $fallbackLanguage && $fallbackLanguage.length ? fallbackTranslation(translationId, interpolateParams, Interpolator).then(function(translation) {
                    deferred.resolve(translation);
                }, function(_translationId) {
                    deferred.reject(applyNotFoundIndicators(_translationId));
                }) : $missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation ? deferred.resolve(missingTranslationHandlerTranslation) : deferred.reject(applyNotFoundIndicators(translationId));
            }
            return deferred.promise;
        }, determineTranslationInstant = function(translationId, interpolateParams, interpolationId) {
            var result, table = $uses ? $translationTable[$uses] : $translationTable, Interpolator = interpolationId ? interpolatorHashMap[interpolationId] : defaultInterpolator;
            if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
                var translation = table[translationId];
                result = "@:" === translation.substr(0, 2) ? determineTranslationInstant(translation.substr(2), interpolateParams, interpolationId) : Interpolator.interpolate(translation, interpolateParams);
            } else {
                var missingTranslationHandlerTranslation;
                $missingTranslationHandlerFactory && !pendingLoader && (missingTranslationHandlerTranslation = translateByHandler(translationId)), 
                $uses && $fallbackLanguage && $fallbackLanguage.length ? (fallbackIndex = 0, result = fallbackTranslationInstant(translationId, interpolateParams, Interpolator)) : result = $missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation ? missingTranslationHandlerTranslation : applyNotFoundIndicators(translationId);
            }
            return result;
        };
        if ($translate.preferredLanguage = function(langKey) {
            return langKey && setupPreferredLanguage(langKey), $preferredLanguage;
        }, $translate.cloakClassName = function() {
            return $cloakClassName;
        }, $translate.fallbackLanguage = function(langKey) {
            if (void 0 !== langKey && null !== langKey) {
                if (fallbackStack(langKey), $loaderFactory && $fallbackLanguage && $fallbackLanguage.length) for (var i = 0, len = $fallbackLanguage.length; len > i; i++) langPromises[$fallbackLanguage[i]] || (langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]));
                $translate.use($translate.use());
            }
            return $fallbackWasString ? $fallbackLanguage[0] : $fallbackLanguage;
        }, $translate.useFallbackLanguage = function(langKey) {
            if (void 0 !== langKey && null !== langKey) if (langKey) {
                var langKeyPosition = indexOf($fallbackLanguage, langKey);
                langKeyPosition > -1 && (startFallbackIteration = langKeyPosition);
            } else startFallbackIteration = 0;
        }, $translate.proposedLanguage = function() {
            return $nextLang;
        }, $translate.storage = function() {
            return Storage;
        }, $translate.use = function(key) {
            if (!key) return $uses;
            var deferred = $q.defer();
            $rootScope.$emit("$translateChangeStart", {
                language: key
            });
            var aliasedKey = negotiateLocale(key);
            return aliasedKey && (key = aliasedKey), $translationTable[key] || !$loaderFactory || langPromises[key] ? (deferred.resolve(key), 
            useLanguage(key)) : ($nextLang = key, langPromises[key] = loadAsync(key).then(function(translation) {
                return translations(translation.key, translation.table), deferred.resolve(translation.key), 
                useLanguage(translation.key), $nextLang === key && ($nextLang = void 0), translation;
            }, function(key) {
                $nextLang === key && ($nextLang = void 0), $rootScope.$emit("$translateChangeError", {
                    language: key
                }), deferred.reject(key), $rootScope.$emit("$translateChangeEnd", {
                    language: key
                });
            })), deferred.promise;
        }, $translate.storageKey = function() {
            return storageKey();
        }, $translate.isPostCompilingEnabled = function() {
            return $postCompilingEnabled;
        }, $translate.refresh = function(langKey) {
            function resolve() {
                deferred.resolve(), $rootScope.$emit("$translateRefreshEnd", {
                    language: langKey
                });
            }
            function reject() {
                deferred.reject(), $rootScope.$emit("$translateRefreshEnd", {
                    language: langKey
                });
            }
            if (!$loaderFactory) throw new Error("Couldn't refresh translation table, no loader registered!");
            var deferred = $q.defer();
            if ($rootScope.$emit("$translateRefreshStart", {
                language: langKey
            }), langKey) $translationTable[langKey] ? loadAsync(langKey).then(function(data) {
                translations(data.key, data.table), langKey === $uses && useLanguage($uses), resolve();
            }, reject) : reject(); else {
                var tables = [], loadingKeys = {};
                if ($fallbackLanguage && $fallbackLanguage.length) for (var i = 0, len = $fallbackLanguage.length; len > i; i++) tables.push(loadAsync($fallbackLanguage[i])), 
                loadingKeys[$fallbackLanguage[i]] = !0;
                $uses && !loadingKeys[$uses] && tables.push(loadAsync($uses)), $q.all(tables).then(function(tableData) {
                    angular.forEach(tableData, function(data) {
                        $translationTable[data.key] && delete $translationTable[data.key], translations(data.key, data.table);
                    }), $uses && useLanguage($uses), resolve();
                });
            }
            return deferred.promise;
        }, $translate.instant = function(translationId, interpolateParams, interpolationId) {
            if (null === translationId || angular.isUndefined(translationId)) return translationId;
            if (angular.isArray(translationId)) {
                for (var results = {}, i = 0, c = translationId.length; c > i; i++) results[translationId[i]] = $translate.instant(translationId[i], interpolateParams, interpolationId);
                return results;
            }
            if (angular.isString(translationId) && translationId.length < 1) return translationId;
            translationId && (translationId = trim.apply(translationId));
            var result, possibleLangKeys = [];
            $preferredLanguage && possibleLangKeys.push($preferredLanguage), $uses && possibleLangKeys.push($uses), 
            $fallbackLanguage && $fallbackLanguage.length && (possibleLangKeys = possibleLangKeys.concat($fallbackLanguage));
            for (var j = 0, d = possibleLangKeys.length; d > j; j++) {
                var possibleLangKey = possibleLangKeys[j];
                if ($translationTable[possibleLangKey] && "undefined" != typeof $translationTable[possibleLangKey][translationId] && (result = determineTranslationInstant(translationId, interpolateParams, interpolationId)), 
                "undefined" != typeof result) break;
            }
            return result || "" === result || (result = defaultInterpolator.interpolate(translationId, interpolateParams), 
            $missingTranslationHandlerFactory && !pendingLoader && (result = translateByHandler(translationId))), 
            result;
        }, $translate.versionInfo = function() {
            return version;
        }, $translate.loaderCache = function() {
            return loaderCache;
        }, $loaderFactory && (angular.equals($translationTable, {}) && $translate.use($translate.use()), 
        $fallbackLanguage && $fallbackLanguage.length)) for (var processAsyncResult = function(translation) {
            return translations(translation.key, translation.table), $rootScope.$emit("$translateChangeEnd", {
                language: translation.key
            }), translation;
        }, i = 0, len = $fallbackLanguage.length; len > i; i++) langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]).then(processAsyncResult);
        return $translate;
    } ];
} ]), angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", [ "$interpolate", function($interpolate) {
    var $locale, $translateInterpolator = {}, $identifier = "default", $sanitizeValueStrategy = null, sanitizeValueStrategies = {
        escaped: function(params) {
            var result = {};
            for (var key in params) Object.prototype.hasOwnProperty.call(params, key) && (result[key] = angular.element("<div></div>").text(params[key]).html());
            return result;
        }
    }, sanitizeParams = function(params) {
        var result;
        return result = angular.isFunction(sanitizeValueStrategies[$sanitizeValueStrategy]) ? sanitizeValueStrategies[$sanitizeValueStrategy](params) : params;
    };
    return $translateInterpolator.setLocale = function(locale) {
        $locale = locale;
    }, $translateInterpolator.getInterpolationIdentifier = function() {
        return $identifier;
    }, $translateInterpolator.useSanitizeValueStrategy = function(value) {
        return $sanitizeValueStrategy = value, this;
    }, $translateInterpolator.interpolate = function(string, interpolateParams) {
        return $sanitizeValueStrategy && (interpolateParams = sanitizeParams(interpolateParams)), 
        $interpolate(string)(interpolateParams || {});
    }, $translateInterpolator;
} ]), angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), 
angular.module("pascalprecht.translate").directive("translate", [ "$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function($translate, $q, $interpolate, $compile, $parse, $rootScope) {
    return {
        restrict: "AE",
        scope: !0,
        compile: function(tElement, tAttr) {
            var translateValuesExist = tAttr.translateValues ? tAttr.translateValues : void 0, translateInterpolation = tAttr.translateInterpolation ? tAttr.translateInterpolation : void 0, translateValueExist = tElement[0].outerHTML.match(/translate-value-+/i), interpolateRegExp = "^(.*)(" + $interpolate.startSymbol() + ".*" + $interpolate.endSymbol() + ")(.*)", watcherRegExp = "^(.*)" + $interpolate.startSymbol() + "(.*)" + $interpolate.endSymbol() + "(.*)";
            return function(scope, iElement, iAttr) {
                scope.interpolateParams = {}, scope.preText = "", scope.postText = "";
                var translationIds = {}, observeElementTranslation = function(translationId) {
                    if (angular.equals(translationId, "") || !angular.isDefined(translationId)) {
                        var interpolateMatches = iElement.text().match(interpolateRegExp);
                        angular.isArray(interpolateMatches) ? (scope.preText = interpolateMatches[1], scope.postText = interpolateMatches[3], 
                        translationIds.translate = $interpolate(interpolateMatches[2])(scope.$parent), watcherMatches = iElement.text().match(watcherRegExp), 
                        angular.isArray(watcherMatches) && watcherMatches[2] && watcherMatches[2].length && scope.$watch(watcherMatches[2], function(newValue) {
                            translationIds.translate = newValue, updateTranslations();
                        })) : translationIds.translate = iElement.text().replace(/^\s+|\s+$/g, "");
                    } else translationIds.translate = translationId;
                    updateTranslations();
                }, observeAttributeTranslation = function(translateAttr) {
                    iAttr.$observe(translateAttr, function(translationId) {
                        translationIds[translateAttr] = translationId, updateTranslations();
                    });
                };
                iAttr.$observe("translate", function(translationId) {
                    observeElementTranslation(translationId);
                });
                for (var translateAttr in iAttr) iAttr.hasOwnProperty(translateAttr) && "translateAttr" === translateAttr.substr(0, 13) && observeAttributeTranslation(translateAttr);
                if (iAttr.$observe("translateDefault", function(value) {
                    scope.defaultText = value;
                }), translateValuesExist && iAttr.$observe("translateValues", function(interpolateParams) {
                    interpolateParams && scope.$parent.$watch(function() {
                        angular.extend(scope.interpolateParams, $parse(interpolateParams)(scope.$parent));
                    });
                }), translateValueExist) {
                    var observeValueAttribute = function(attrName) {
                        iAttr.$observe(attrName, function(value) {
                            var attributeName = angular.lowercase(attrName.substr(14, 1)) + attrName.substr(15);
                            scope.interpolateParams[attributeName] = value;
                        });
                    };
                    for (var attr in iAttr) Object.prototype.hasOwnProperty.call(iAttr, attr) && "translateValue" === attr.substr(0, 14) && "translateValues" !== attr && observeValueAttribute(attr);
                }
                var updateTranslations = function() {
                    for (var key in translationIds) translationIds.hasOwnProperty(key) && translationIds[key] && updateTranslation(key, translationIds[key], scope, scope.interpolateParams);
                }, updateTranslation = function(translateAttr, translationId, scope, interpolateParams) {
                    $translate(translationId, interpolateParams, translateInterpolation).then(function(translation) {
                        applyTranslation(translation, scope, !0, translateAttr);
                    }, function(translationId) {
                        applyTranslation(translationId, scope, !1, translateAttr);
                    });
                }, applyTranslation = function(value, scope, successful, translateAttr) {
                    if ("translate" === translateAttr) {
                        successful || "undefined" == typeof scope.defaultText || (value = scope.defaultText), 
                        iElement.html(scope.preText + value + scope.postText);
                        var globallyEnabled = $translate.isPostCompilingEnabled(), locallyDefined = "undefined" != typeof tAttr.translateCompile, locallyEnabled = locallyDefined && "false" !== tAttr.translateCompile;
                        (globallyEnabled && !locallyDefined || locallyEnabled) && $compile(iElement.contents())(scope);
                    } else {
                        successful || "undefined" == typeof scope.defaultText || (value = scope.defaultText);
                        var attributeName = iAttr.$attr[translateAttr].substr(15);
                        iElement.attr(attributeName, value);
                    }
                };
                scope.$watch("interpolateParams", updateTranslations, !0);
                var unbind = $rootScope.$on("$translateChangeSuccess", updateTranslations);
                iElement.text().length && observeElementTranslation(""), updateTranslations(), scope.$on("$destroy", unbind);
            };
        }
    };
} ]), angular.module("pascalprecht.translate").directive("translateCloak", [ "$rootScope", "$translate", function($rootScope, $translate) {
    return {
        compile: function(tElement) {
            var applyCloak = function() {
                tElement.addClass($translate.cloakClassName());
            }, removeCloak = function() {
                tElement.removeClass($translate.cloakClassName());
            }, removeListener = $rootScope.$on("$translateChangeEnd", function() {
                removeCloak(), removeListener(), removeListener = null;
            });
            return applyCloak(), function(scope, iElement, iAttr) {
                iAttr.translateCloak && iAttr.translateCloak.length && iAttr.$observe("translateCloak", function(translationId) {
                    $translate(translationId).then(removeCloak, applyCloak);
                });
            };
        }
    };
} ]), angular.module("pascalprecht.translate").filter("translate", [ "$parse", "$translate", function($parse, $translate) {
    var translateFilter = function(translationId, interpolateParams, interpolation) {
        return angular.isObject(interpolateParams) || (interpolateParams = $parse(interpolateParams)(this)), 
        $translate.instant(translationId, interpolateParams, interpolation);
    };
    return translateFilter.$stateful = !0, translateFilter;
} ]), angular.module("ui.bootstrap", [ "ui.bootstrap.tpls", "ui.bootstrap.pagination" ]), 
angular.module("ui.bootstrap.tpls", [ "template/pagination/pager.html", "template/pagination/pagination.html" ]), 
angular.module("ui.bootstrap.pagination", []).controller("PaginationController", [ "$scope", "$attrs", "$parse", function($scope, $attrs, $parse) {
    var self = this, ngModelCtrl = {
        $setViewValue: angular.noop
    }, setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
    this.init = function(ngModelCtrl_, config) {
        ngModelCtrl = ngModelCtrl_, this.config = config, ngModelCtrl.$render = function() {
            self.render();
        }, $attrs.itemsPerPage ? $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
            self.itemsPerPage = parseInt(value, 10), $scope.totalPages = self.calculateTotalPages();
        }) : this.itemsPerPage = config.itemsPerPage;
    }, this.calculateTotalPages = function() {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }, this.render = function() {
        $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
    }, $scope.selectPage = function(page) {
        $scope.page !== page && page > 0 && page <= $scope.totalPages && (ngModelCtrl.$setViewValue(page), 
        ngModelCtrl.$render());
    }, $scope.getText = function(key) {
        return $scope[key + "Text"] || self.config[key + "Text"];
    }, $scope.noPrevious = function() {
        return 1 === $scope.page;
    }, $scope.noNext = function() {
        return $scope.page === $scope.totalPages;
    }, $scope.$watch("totalItems", function() {
        $scope.totalPages = self.calculateTotalPages();
    }), $scope.$watch("totalPages", function(value) {
        setNumPages($scope.$parent, value), $scope.page > value ? $scope.selectPage(value) : ngModelCtrl.$render();
    });
} ]).constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0
}).directive("pagination", [ "$parse", "paginationConfig", function($parse, paginationConfig) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@"
        },
        require: [ "pagination", "?ngModel" ],
        controller: "PaginationController",
        templateUrl: "template/pagination/pagination.html",
        replace: !0,
        link: function(scope, element, attrs, ctrls) {
            function makePage(number, text, isActive) {
                return {
                    number: number,
                    text: text,
                    active: isActive
                };
            }
            function getPages(currentPage, totalPages) {
                var pages = [], startPage = 1, endPage = totalPages, isMaxSized = angular.isDefined(maxSize) && totalPages > maxSize;
                isMaxSized && (rotate ? (startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1), 
                endPage = startPage + maxSize - 1, endPage > totalPages && (endPage = totalPages, 
                startPage = endPage - maxSize + 1)) : (startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1, 
                endPage = Math.min(startPage + maxSize - 1, totalPages)));
                for (var number = startPage; endPage >= number; number++) {
                    var page = makePage(number, number, number === currentPage);
                    pages.push(page);
                }
                if (isMaxSized && !rotate) {
                    if (startPage > 1) {
                        var previousPageSet = makePage(startPage - 1, "...", !1);
                        pages.unshift(previousPageSet);
                    }
                    if (totalPages > endPage) {
                        var nextPageSet = makePage(endPage + 1, "...", !1);
                        pages.push(nextPageSet);
                    }
                }
                return pages;
            }
            var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize, rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
                scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks, 
                scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks, 
                paginationCtrl.init(ngModelCtrl, paginationConfig), attrs.maxSize && scope.$parent.$watch($parse(attrs.maxSize), function(value) {
                    maxSize = parseInt(value, 10), paginationCtrl.render();
                });
                var originalRender = paginationCtrl.render;
                paginationCtrl.render = function() {
                    originalRender(), scope.page > 0 && scope.page <= scope.totalPages && (scope.pages = getPages(scope.page, scope.totalPages));
                };
            }
        }
    };
} ]).constant("pagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: !0
}).directive("pager", [ "pagerConfig", function(pagerConfig) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@"
        },
        require: [ "pager", "?ngModel" ],
        controller: "PaginationController",
        templateUrl: "template/pagination/pager.html",
        replace: !0,
        link: function(scope, element, attrs, ctrls) {
            var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            ngModelCtrl && (scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align, 
            paginationCtrl.init(ngModelCtrl, pagerConfig));
        }
    };
} ]), angular.module("template/pagination/pager.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pager.html", '<div class="pager"><md-button ng-disabled="noPrevious()" ng-click="selectPage(1)" class="md-primary">{{getText(\'previous\')}}</md-button><md-button ng-disabled="noNext()" ng-click="selectPage(page + 1)" class="md-primary">{{getText(\'next\')}}</md-button></div>');
} ]), angular.module("template/pagination/pagination.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pagination.html", '<div class="pagination"><md-button ng-disabled="noPrevious()" ng-click="selectPage(page - 1)" class="md-primary">{{getText(\'previous\')}}</md-button><md-button ng-repeat="page in pages track by $index" ng-disabled="page.active" ng-click="selectPage(page.number)" class="md-primary">{{page.text}}</md-button><md-button ng-disabled="noNext()" ng-click="selectPage(page + 1)" class="md-primary">{{getText(\'next\')}}</md-button></div>');
} ]);