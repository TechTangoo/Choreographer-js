!(function (t) {
    function n(r) {
        if (e[r]) return e[r].exports;
        var o = (e[r] = { exports: {}, id: r, loaded: !1 });
        return t[r].call(o.exports, o, o.exports, n), (o.loaded = !0), o.exports;
    }
    var e = {};
    return (n.m = t), (n.c = e), (n.p = "/dist/"), n(0);
})([
    function (t, n, e) {
        "use strict";
        var r = e(1);
        (t.exports = r), (window.Choreographer = r);
    },
    function (t, n, e) {
        "use strict";
        function r(t, n) {
            if (!(t instanceof n))
                throw new TypeError("Cannot call a class as a function");
        }
        var o = (function () {
            function t(t, n) {
                for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(t, r.key, r);
                }
            }
            return function (n, e, r) {
                return e && t(n.prototype, e), r && t(n, r), n;
            };
        })(),
            i = e(2),
            s = e(3),
            a = function () { },
            u = (function () {
                function t(n) {
                    var e = this;
                    r(this, t),
                        (this.customFunctions = n.customFunctions || {}),
                        (this.animations = n.animations.map(function (t) {
                            return (t.fn = e.getAnimationFn(t.type)), new i(t);
                        }));
                }
                return (
                    o(t, [
                        {
                            key: "getAnimationFn",
                            value: function (t) {
                                return s[t] || this.customFunctions[t] || a;
                            }
                        },
                        {
                            key: "updateAnimations",
                            value: function (t) {
                                var n = this;
                                this.animations = t.map(function (t) {
                                    return (t.fn = n.getAnimationFn(t.type)), new i(t);
                                });
                            }
                        },
                        {
                            key: "runAnimationsAt",
                            value: function (t) {
                                this.animations.forEach(function (t) {
                                    t.nodes.forEach(function (t) {
                                        return t.setAttribute("animated", "");
                                    });
                                }),
                                    this.animations.forEach(function (n) {
                                        return n.runAt(t);
                                    });
                            }
                        }
                    ]),
                    t
                );
            })();
        t.exports = u;
    },
    function (t, n) {
        "use strict";
        function e(t, n) {
            if (!(t instanceof n))
                throw new TypeError("Cannot call a class as a function");
        }
        var r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                }
                : function (t) {
                    return t &&
                        "function" == typeof Symbol &&
                        t.constructor === Symbol
                        ? "symbol"
                        : typeof t;
                },
            o = (function () {
                function t(t, n) {
                    var e = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (
                            var s, a = t[Symbol.iterator]();
                            !(r = (s = a.next()).done) &&
                            (e.push(s.value), !n || e.length !== n);
                            r = !0
                        );
                    } catch (u) {
                        (o = !0), (i = u);
                    } finally {
                        try {
                            !r && a["return"] && a["return"]();
                        } finally {
                            if (o) throw i;
                        }
                    }
                    return e;
                }
                return function (n, e) {
                    if (Array.isArray(n)) return n;
                    if (Symbol.iterator in Object(n)) return t(n, e);
                    throw new TypeError(
                        "Invalid attempt to destructure non-iterable instance"
                    );
                };
            })(),
            i = (function () {
                function t(t, n) {
                    for (var e = 0; e < n.length; e++) {
                        var r = n[e];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            "value" in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                return function (n, e, r) {
                    return e && t(n.prototype, e), r && t(n, r), n;
                };
            })(),
            s = (function () {
                function t(n) {
                    e(this, t), (this.config = n), this.storeNodes();
                }
                return (
                    i(t, [
                        {
                            key: "storeNodes",
                            value: function () {
                                var t = this;
                                this.config.selector &&
                                    (this.nodes = Array.prototype.slice.call(
                                        document.querySelectorAll(this.config.selector)
                                    )),
                                    this.config.selectors &&
                                    ((this.nodes = []),
                                        this.config.selectors.forEach(function (n) {
                                            var e = Array.prototype.slice.call(
                                                document.querySelectorAll(n)
                                            );
                                            t.nodes = t.nodes.concat(e);
                                        }));
                            }
                        },
                        {
                            key: "getProgress",
                            value: function (t, n) {
                                var e = o(n, 2),
                                    r = e[0],
                                    i = e[1];
                                return (t - r) / (i - r);
                            }
                        },
                        {
                            key: "getProgressAt",
                            value: function (t) {
                                if ("object" === r(this.config.range[0])) {
                                    var n = void 0;
                                    return (
                                        this.config.range.forEach(function (t) {
                                            isBetween(postion, t[0], t[1]) && (n = t);
                                        }),
                                        n ? this.getProgress(t, n) : -1
                                    );
                                }
                                return this.getProgress(t, this.config.range);
                            }
                        },
                        {
                            key: "runAt",
                            value: function (t) {
                                var n = this,
                                    e = this.getProgressAt(t);
                                if (e < 0 || e > 1) {
                                    var r = void 0;
                                    if (
                                        (this.nodes.forEach(function (t) {
                                            t.getAttribute("animated").indexOf(n.config.style) > -1 &&
                                                (r = !0);
                                        }),
                                            r)
                                    )
                                        return;
                                    "change" === this.config.type && (e = -1),
                                        "scale" === this.config.type &&
                                        (e < 0 && (e = 0), e > 1 && (e = 1));
                                }
                                this.nodes.forEach(function (t) {
                                    e > 0 &&
                                        e < 1 &&
                                        t.setAttribute(
                                            "animated",
                                            t.getAttribute("animated") + "|" + n.config.style
                                        ),
                                        n.config.fn({
                                            node: t,
                                            style: n.config.style,
                                            from: n.config.from,
                                            to: n.config.to,
                                            unit: n.config.unit,
                                            progress: e
                                        });
                                });
                            }
                        }
                    ]),
                    t
                );
            })();
        t.exports = s;
    },
    function (t, n, e) {
        "use strict";
        var r = e(4),
            o = function (t) {
                var n = (t.to - t.from) * t.progress + t.from,
                    e = t.unit ? n + t.unit : n;
                if (1 === t.style.split(":").length)
                    return void (t.node.style[t.style] = e);
                var o = t.style.split(":")[1];
                t.node.style.transform = r(t.node, o, e);
            },
            i = function (t) {
                var n = t.progress < 0 ? null : t.to,
                    e = n && t.unit ? n + t.unit : n;
                if (t.progress < 0 && "transition" === t.style)
                    return void t.node.addEventListener("transitionend", function (n) {
                        n.target === t.node && (t.node.style[t.style] = null);
                    });
                if (1 === t.style.split(":").length)
                    return void (t.node.style[t.style] = e);
                var o = t.style.split(":")[1];
                t.node.style.transform = r(t.node, o, e);
            };
        t.exports = { scale: o, change: i };
    },
    function (t, n) {
        "use strict";
        var e = { translateX: 0, translateY: 1, translateZ: 2 },
            r = { scaleX: 0, scaleY: 1, scaleZ: 2 },
            o = {
                transform: "transform",
                webkitTransform: "-webkit-transform",
                MozTransform: "-moz-transform",
                msTransform: "-ms-transform",
                OTransform: "-o-transform"
            },
            i = function () {
                if (!window.getComputedStyle) return null;
                var t = document.createElement("div");
                document.body.insertBefore(t, null);
                for (var n in o)
                    if (window.getComputedStyle(t)[n])
                        return document.body.removeChild(t), n;
                return document.body.removeChild(t), null;
            },
            s = function () {
                if (!a) return !1;
                var t = document.createElement("div");
                document.body.insertBefore(t, null),
                    (t.style[a] = "translate3d(1px,1px,1px)");
                var n = !!window.getComputedStyle(t).getPropertyValue(a);
                return document.body.removeChild(t), n;
            },
            a = i(),
            u = s(),
            f = function (t, n, o) {
                if (a) {
                    var i = t.style[a] || "",
                        s = void 0,
                        f = void 0,
                        c = void 0;
                    if (
                        u &&
                        (void 0 !== e[n]
                            ? ((f = e[n]),
                                (n = "translate3d"),
                                (c = ["0", "0", "0"]),
                                null === o && (o = 0))
                            : void 0 !== r[n] &&
                            ((f = r[n]),
                                (n = "scale3d"),
                                (c = ["1", "1", "1"]),
                                null === o && (o = 1)),
                            void 0 !== f)
                    ) {
                        if (i.indexOf(n) > -1) {
                            var l = (i.split(n + "(")[0], i.split(n + "(")[1].split(")")[0]);
                            c = l.split(",");
                        }
                        (c[f] = o), (s = n + "(" + c.join(",") + ")");
                    }
                    var d = s || n + "(" + o + ")",
                        m = i,
                        y = i.indexOf(n) > -1;
                    if (y) {
                        var v = i.split(n)[0],
                            p = i.split(n)[1].split(")")[1];
                        m = v + d + p;
                    } else m += " " + d;
                    return m;
                }
            };
        t.exports = f;
    }
]);

var wrapperNode = document.getElementById('wrapper')
var scrollDownNode = document.querySelector('.scroll-down')
var linkNodes = document.querySelector('.links')

var vh = window.innerHeight

/* STORE SOME KEY LOCATIONS */

/* ~ le fin ~
 * The point where you cannot scroll down any further.
 */
var fin = wrapperNode.clientHeight - vh + linkNodes.clientHeight

function calculateAnimations() {
    return [
        /* animate Cs */
        { range: [-1, fin * 0.5], selector: '.c', type: 'scale', style: 'transform:translateY', from: 0, to: 25, unit: 'px' },
        { range: [fin * 0.5, fin], selector: '.c', type: 'scale', style: 'transform:translateY', from: 25, to: 0, unit: 'px' },
        { range: [-1, fin * 0.5], selector: '.c', type: 'scale', style: 'transform:scale', from: 1, to: 2 },
        { range: [fin * 0.4, fin], selector: '.c', type: 'change', style: 'color', to: '#ffb515' },

        /* animate Hs */
        { range: [-1, fin * 0.5], selector: '.h', type: 'scale', style: 'transform:scaleX', from: 1, to: 0.5 },
        { range: [-1, fin * 0.5], selector: '.h', type: 'scale', style: 'transform:scaleY', from: 1, to: 0.5 },
        { range: [fin * 0.5, fin], selector: '.h', type: 'scale', style: 'transform:scaleX', from: 0.5, to: 1 },
        { range: [fin * 0.5, fin], selector: '.h', type: 'scale', style: 'transform:scaleY', from: 0.5, to: 1 },
        { range: [fin * 0.3, fin], selector: '.h', type: 'change', style: 'color', to: '#1fd1ec' },

        /* animate Os */
        { range: [fin * 0.1, fin], selector: '.o', type: 'randomizeColor' },

        /* animate Rs */
        { range: [-1, fin * 0.5], selector: '.r', type: 'scale', style: 'transform:rotateX', from: 0, to: 90, unit: 'deg' },
        { range: [fin * 0.5, fin], selector: '.r', type: 'scale', style: 'transform:rotateX', from: 90, to: 0, unit: 'deg' },
        { range: [fin * 0.3, fin], selector: '.r', type: 'change', style: 'color', to: '#8382f9' },

        /* animate Es */
        { range: [fin * 0.3, fin], selector: '.e', type: 'change', style: 'color', to: '#ff1b9b' },

        /* animate Gs */
        { range: [-1, fin * 0.5], selectors: ['.g', '.j'], type: 'scale', style: 'transform:rotateZ', from: 0, to: 180, unit: 'deg' },
        { range: [fin * 0.5, fin], selectors: ['.g', '.j'], type: 'scale', style: 'transform:rotateZ', from: 180, to: 360, unit: 'deg' },
        { range: [fin * 0.4, fin], selectors: ['.g', '.j'], type: 'change', style: 'color', to: '#ff8b1c' },

        /* animate As */
        { range: [-1, fin * 0.5], selectors: ['.a', '.s'], type: 'scale', style: 'transform:rotateZ', from: 0, to: -180, unit: 'deg' },
        { range: [fin * 0.5, fin], selectors: ['.a', '.s'], type: 'scale', style: 'transform:rotateZ', from: -180, to: -360, unit: 'deg' },
        { range: [fin * 0.4, fin], selectors: ['.a', '.s'], type: 'change', style: 'color', to: '#c05bdb' },

        /* animate Ps */
        { range: [-1, fin * 0.5], selectors: ['.p', '.dash'], type: 'scale', style: 'opacity', from: 1, to: 0.1 },
        { range: [fin * 0.5, fin], selectors: ['.p', '.dash'], type: 'scale', style: 'opacity', from: 0.1, to: 1 },
        { range: [fin * 0.4, fin], selectors: ['.p', '.dash'], type: 'change', style: 'color', to: '#ff537c' },

        /* animate line */
        { range: [-1, fin], selector: '.line', type: 'scale', style: 'width', from: 0.01, to: 50, unit: '%' },
        { range: [-1, fin], selector: '.line', type: 'scale', style: 'opacity', from: 0, to: 1 },

        /* animate arrow */
        { range: [0.6 * fin, fin], selector: '.scroll-down', type: 'scale', style: 'opacity', from: 1, to: 0 },
        { range: [fin - 30, fin], selector: '.scroll-down', type: 'change', style: 'display', to: 'none' },

        /* animate links */
        { range: [0.8 * fin, fin], selector: '.links', type: 'scale', style: 'opacity', from: 0, to: 1 }
    ]
}

// Instantiate choreographer.
var choreographer = new Choreographer({
    animations: calculateAnimations(),
    customFunctions: {
        randomizeColor: function (data) {
            var chars = '0123456789abcdef'.split('')
            var hex = '#'

            while (hex.length < 7) {
                hex += chars[Math.round(Math.random() * (chars.length - 1))]
            }

            data.node.style.color = hex
        }
    }
})

function animate() {
    var scrollPosition = (wrapperNode.getBoundingClientRect().top - wrapperNode.offsetTop) * -1
    choreographer.runAnimationsAt(scrollPosition)
}

document.body.addEventListener('scroll', animate)

animate()

window.addEventListener('resize', function () {
    choreographer.updateAnimations(calculateAnimations())
})