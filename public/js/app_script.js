
/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!
function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = "1.11.1",
        m = function(a, b) {
            return new m.fn.init(a, b)
        },
        n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        o = /^-ms-/,
        p = /-([\da-z])/gi,
        q = function(a, b) {
            return b.toUpperCase()
        };
    m.fn = m.prototype = {
        jquery: l,
        constructor: m,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = m.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return m.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(m.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, m.extend = m.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, m.extend({
        expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === m.type(a)
        },
        isArray: Array.isArray ||
        function(a) {
            return "array" === m.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !m.isArray(a) && a - parseFloat(a) >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (c) {
                return !1
            }
            if (k.ownLast) for (b in a) return j.call(a, b);
            for (b in a);
            return void 0 === b || j.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && m.trim(b) && (a.execScript ||
            function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(o, "ms-").replace(p, q)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = r(a);
            if (c) {
                if (g) {
                    for (; f > e; e++) if (d = b.apply(a[e], c), d === !1) break
                } else
                for (e in a) if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break
            } else
            for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(n, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (g) return g.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function(a, b) {
            var c = +b.length,
                d = 0,
                e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = r(a),
                i = [];
            if (h) for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
            for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
                return a.apply(b || this, c.concat(d.call(arguments)))
            }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
        },
        now: function() {
            return +new Date
        },
        support: k
    }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function r(a) {
        var b = a.length,
            c = m.type(a);
        return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var s = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = gb(),
            z = gb(),
            A = gb(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            },
            C = "undefined",
            D = 1 << 31,
            E = {}.hasOwnProperty,
            F = [],
            G = F.pop,
            H = F.push,
            I = F.push,
            J = F.slice,
            K = F.indexOf ||
            function(a) {
                for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
                return -1
            },
            L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            O = N.replace("w", "w#"),
            P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]",
            Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)",
            R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            S = new RegExp("^" + M + "*," + M + "*"),
            T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
            V = new RegExp(Q),
            W = new RegExp("^" + O + "$"),
            X = {
                ID: new RegExp("^#(" + N + ")"),
                CLASS: new RegExp("^\\.(" + N + ")"),
                TAG: new RegExp("^(" + N.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + Q),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + L + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ab = /[+~]/,
            bb = /'|\\/g,
            cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            db = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
        try {
            I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType
        } catch (eb) {
            I = {
                apply: F.length ?
                function(a, b) {
                    H.apply(a, J.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }
        function fb(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a) return d;
            if (1 !== (k = b.nodeType) && 9 !== k) return [];
            if (p && !e) {
                if (f = _.exec(a)) if (j = f[1]) {
                    if (9 === k) {
                        if (h = b.getElementById(j), !h || !h.parentNode) return d;
                        if (h.id === j) return d.push(h), d
                    } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                } else {
                    if (f[2]) return I.apply(d, b.getElementsByTagName(a)), d;
                    if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return I.apply(d, b.getElementsByClassName(j)), d
                }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + qb(o[l]);
                        w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return I.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }
        function gb() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }
        function hb(a) {
            return a[u] = !0, a
        }
        function ib(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }
        function jb(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }
        function kb(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1
        }
        function lb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function mb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function nb(a) {
            return hb(function(b) {
                return b = +b, hb(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function ob(a) {
            return a && typeof a.getElementsByTagName !== C && a
        }
        c = fb.support = {}, f = fb.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = fb.setDocument = function(a) {
            var b, e = a ? a.ownerDocument || a : v,
                g = e.defaultView;
            return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function() {
                m()
            }, !1) : g.attachEvent && g.attachEvent("onunload", function() {
                m()
            })), c.attributes = ib(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ib(function(a) {
                return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function(a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), c.getById = ib(function(a) {
                return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if (typeof b.getElementById !== C && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ?
            function(a, b) {
                return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName &&
            function(a, b) {
                return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function(a) {
                a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked")
            }), ib(function(a) {
                var b = e.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ?
            function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1
            }, B = b ?
            function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    f = a.parentNode,
                    g = b.parentNode,
                    h = [a],
                    i = [b];
                if (!f || !g) return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0;
                if (f === g) return kb(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, e) : n
        }, fb.matches = function(a, b) {
            return fb(a, null, null, b)
        }, fb.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return fb(b, n, null, [a]).length > 0
        }, fb.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, fb.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, fb.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, fb.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = fb.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else
            while (b = a[d++]) c += e(b);
            return c
        }, d = fb.selectors = {
            cacheLength: 50,
            createPseudo: hb,
            match: X,
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
                ATTR: function(a) {
                    return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(cb, db).toLowerCase();
                    return "*" === a ?
                    function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = fb.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ?
                    function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [w, n, m];
                                    break
                                }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                            while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = K.call(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: hb(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? hb(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }),
                has: hb(function(a) {
                    return function(b) {
                        return fb(a, b).length > 0
                    }
                }),
                contains: hb(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }),
                lang: hb(function(a) {
                    return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(), function(b) {
                        var c;
                        do
                        if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !! (a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !! a.checked || "option" === b && !! a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Z.test(a.nodeName)
                },
                input: function(a) {
                    return Y.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: nb(function() {
                    return [0]
                }),
                last: nb(function(a, b) {
                    return [b - 1]
                }),
                eq: nb(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: nb(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: nb(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: nb(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: nb(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) d.pseudos[b] = lb(b);
        for (b in {
            submit: !0,
            reset: !0
        }) d.pseudos[b] = mb(b);

        function pb() {}
        pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter)!(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? fb.error(a) : z(a, i).slice(0)
        };

        function qb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }
        function rb(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ?
            function(b, c, f) {
                while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                while (b = b[d]) if (1 === b.nodeType || e) {
                    if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return !0
                }
            }
        }
        function sb(a) {
            return a.length > 1 ?
            function(b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }
        function tb(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fb(a, b[d], c);
            return c
        }
        function ub(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }
        function vb(a, b, c, d, e, f) {
            return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || tb(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : ub(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = ub(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r)
            })
        }
        function wb(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function(a) {
                return a === b
            }, h, !0), l = rb(function(a) {
                return K.call(b, a) > -1
            }, h, !0), m = [function(a, c, d) {
                return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
            }]; f > i; i++) if (c = d.relative[a[i].type]) m = [rb(sb(m), c)];
            else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
                    return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({
                        value: " " === a[i - 2].type ? "*" : ""
                    })).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a))
                }
                m.push(c)
            }
            return sb(m)
        }
        function xb(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function(f, g, h, i, k) {
                    var l, m, o, p = 0,
                        q = "0",
                        r = f && [],
                        s = [],
                        t = j,
                        u = f || e && d.find.TAG("*", k),
                        v = w += null == t ? 1 : Math.random() || .1,
                        x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++]) if (o(l, g, h)) {
                                i.push(l);
                                break
                            }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++]) o(r, s, g, h);
                        if (f) {
                            if (p > 0) while (q--) r[q] || s[q] || (s[q] = G.call(i));
                            s = ub(s)
                        }
                        I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
            return c ? hb(f) : f
        }
        return h = fb.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, xb(e, d)), f.selector = a
            }
            return f
        }, i = fb.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qb(j), !a) return I.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !! l, m(), c.sortDetached = ib(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ib(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || jb("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ib(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || jb("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ib(function(a) {
            return null == a.getAttribute("disabled")
        }) || jb(L, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), fb
    }(a);
    m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
    var t = m.expr.match.needsContext,
        u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        v = /^.[^:#\[\.,]*$/;

    function w(a, b, c) {
        if (m.isFunction(b)) return m.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return m.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (v.test(b)) return m.filter(b, a, c);
            b = m.filter(b, a)
        }
        return m.grep(a, function(a) {
            return m.inArray(a, b) >= 0 !== c
        })
    }
    m.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, m.fn.extend({
        find: function(a) {
            var b, c = [],
                d = this,
                e = d.length;
            if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
                for (b = 0; e > b; b++) if (m.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) m.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        },
        filter: function(a) {
            return this.pushStack(w(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(w(this, a || [], !0))
        },
        is: function(a) {
            return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
        }
    });
    var x, y = a.document,
        z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = m.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b)) for (c in b) m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                if (d = y.getElementById(c[2]), d && d.parentNode) {
                    if (d.id !== c[2]) return x.find(a);
                    this.length = 1, this[0] = d
                }
                return this.context = y, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
        };
    A.prototype = m.fn, x = m(y);
    var B = /^(?:parents|prev(?:Until|All))/,
        C = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    m.extend({
        dir: function(a, b, c) {
            var d = [],
                e = a[b];
            while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), m.fn.extend({
        has: function(a) {
            var b, c = m(a, this),
                d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++) if (m.contains(this, c[b])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? m.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function D(a, b) {
        do a = a[b];
        while (a && 1 !== a.nodeType);
        return a
    }
    m.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return m.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return m.dir(a, "parentNode", c)
        },
        next: function(a) {
            return D(a, "nextSibling")
        },
        prev: function(a) {
            return D(a, "previousSibling")
        },
        nextAll: function(a) {
            return m.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return m.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return m.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return m.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return m.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return m.sibling(a.firstChild)
        },
        contents: function(a) {
            return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
        }
    }, function(a, b) {
        m.fn[a] = function(c, d) {
            var e = m.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return m.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    m.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                    c = !1;
                    break
                }
                b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
            },
            k = {
                add: function() {
                    if (h) {
                        var d = h.length;
                        !
                        function f(b) {
                            m.each(b, function(b, c) {
                                var d = m.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                            })
                        }(arguments), b ? e = h.length : c && (g = d, j(c))
                    }
                    return this
                },
                remove: function() {
                    return h && m.each(arguments, function(a, c) {
                        var d;
                        while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                    }), this
                },
                has: function(a) {
                    return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], e = 0, this
                },
                disable: function() {
                    return h = i = c = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, c || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, c) {
                    return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return k
    }, m.extend({
        Deferred: function(a) {
            var b = [
                ["resolve", "done", m.Callbacks("once memory"), "resolved"],
                ["reject", "fail", m.Callbacks("once memory"), "rejected"],
                ["notify", "progress", m.Callbacks("memory")]
            ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return m.Deferred(function(c) {
                            m.each(b, function(b, f) {
                                var g = m.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? m.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, m.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b = 0,
                c = d.call(arguments),
                e = c.length,
                f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : m.Deferred(),
                h = function(a, b, c) {
                    return function(e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                i, j, k;
            if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var H;
    m.fn.ready = function(a) {
        return m.ready.promise().done(a), this
    }, m.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? m.readyWait++ : m.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? !--m.readyWait : !m.isReady) {
                if (!y.body) return setTimeout(m.ready);
                m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
            }
        }
    });

    function I() {
        y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
    }
    function J() {
        (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
    }
    m.ready.promise = function(b) {
        if (!H) if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
        else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
        else {
            y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
            var c = !1;
            try {
                c = null == a.frameElement && y.documentElement
            } catch (d) {}
            c && c.doScroll && !
            function e() {
                if (!m.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    I(), m.ready()
                }
            }()
        }
        return H.promise(b)
    };
    var K = "undefined",
        L;
    for (L in m(k)) break;
    k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function() {
        var a, b, c, d;
        c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
    }), function() {
        var a = y.createElement("div");
        if (null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                k.deleteExpando = !1
            }
        }
        a = null
    }(), m.acceptData = function(a) {
        var b = m.noData[(a.nodeName + " ").toLowerCase()],
            c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
    var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        N = /([A-Z])/g;

    function O(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(N, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
                } catch (e) {}
                m.data(a, b, c)
            } else c = void 0
        }
        return c
    }
    function P(a) {
        var b;
        for (b in a) if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }
    function Q(a, b, d, e) {
        if (m.acceptData(a)) {
            var f, g, h = m.expando,
                i = a.nodeType,
                j = i ? m.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                toJSON: m.noop
            }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
        }
    }
    function R(a, b, c) {
        if (m.acceptData(a)) {
            var d, e, f = a.nodeType,
                g = f ? m.cache : a,
                h = f ? a[m.expando] : m.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !P(d) : !m.isEmptyObject(d)) return
                }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }
    m.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !! a && !P(a)
        },
        data: function(a, b, c) {
            return Q(a, b, c)
        },
        removeData: function(a, b) {
            return R(a, b)
        },
        _data: function(a, b, c) {
            return Q(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return R(a, b, !0)
        }
    }), m.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                    m._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                m.data(this, a)
            }) : arguments.length > 1 ? this.each(function() {
                m.data(this, a, b)
            }) : f ? O(f, a, m.data(f, a)) : void 0
        },
        removeData: function(a) {
            return this.each(function() {
                m.removeData(this, a)
            })
        }
    }), m.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = m.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = m._queueHooks(a, b),
                g = function() {
                    m.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return m._data(a, c) || m._data(a, c, {
                empty: m.Callbacks("once memory").add(function() {
                    m._removeData(a, b + "queue"), m._removeData(a, c)
                })
            })
        }
    }), m.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = m.queue(this, a, b);
                m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                m.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = m.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        T = ["Top", "Right", "Bottom", "Left"],
        U = function(a, b) {
            return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
        },
        V = m.access = function(a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === m.type(c)) {
                e = !0;
                for (h in c) m.access(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                return j.call(m(a), c)
            })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        },
        W = /^(?:checkbox|radio)$/i;
    !
    function() {
        var a = y.createElement("input"),
            b = y.createElement("div"),
            c = y.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !! b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !! b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
            k.noCloneEvent = !1
        }), b.cloneNode(!0).click()), null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                k.deleteExpando = !1
            }
        }
    }(), function() {
        var b, c, d = y.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }();
    var X = /^(?:input|select|textarea)$/i,
        Y = /^key/,
        Z = /^(?:mouse|pointer|contextmenu)|click/,
        $ = /^(?:focusinfocus|focusoutblur)$/,
        _ = /^([^.]*)(?:\.(.+)|)$/;

    function ab() {
        return !0
    }
    function bb() {
        return !1
    }
    function cb() {
        try {
            return y.activeElement
        } catch (a) {}
    }
    m.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
                    return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
                }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
                while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && m.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--) if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                    l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                    while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
                } else
                for (o in k) m.event.remove(a, o + b[j], c, d, !0);
                m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, l, n, o = [d || y],
                p = j.call(b, "type") ? b.type : b,
                q = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !m.isWindow(d)) {
                    for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
                    l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                }
                n = 0;
                while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                    l = d[g], l && (d[g] = null), m.event.triggered = p;
                    try {
                        d[p]()
                    } catch (r) {}
                    m.event.triggered = void 0, l && (d[g] = l)
                }
                return b.result
            }
        },
        dispatch: function(a) {
            a = m.event.fix(a);
            var b, c, e, f, g, h = [],
                i = d.call(arguments),
                j = (m._data(this, "events") || {})[a.type] || [],
                k = m.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = m.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, g = 0;
                    while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
                e.length && g.push({
                    elem: i,
                    handlers: e
                })
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        fix: function(a) {
            if (a[m.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !! a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button,
                    g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== cb() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === cb() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return m.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = m.extend(new m.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, m.removeEvent = y.removeEventListener ?
    function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
    }, m.Event = function(a, b) {
        return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
    }, m.Event.prototype = {
        isDefaultPrevented: bb,
        isPropagationStopped: bb,
        isImmediatePropagationStopped: bb,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, m.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        m.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), k.submitBubbles || (m.event.special.submit = {
        setup: function() {
            return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target,
                    c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
                c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), m._data(c, "submitBubbles", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
        }
    }), k.changeBubbles || (m.event.special.change = {
        setup: function() {
            return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), m.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
            })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
                }), m._data(b, "changeBubbles", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return m.event.remove(this, "._change"), !X.test(this.nodeName)
        }
    }), k.focusinBubbles || m.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            m.event.simulate(b, a.target, m.event.fix(a), !0)
        };
        m.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = m._data(d, b);
                e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = m._data(d, b) - 1;
                e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
            }
        }
    }), m.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = bb;
            else if (!d) return this;
            return 1 === e && (g = d, d = function(a) {
                return m().off(a), g.apply(this, arguments)
            }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
                m.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function() {
                m.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                m.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? m.event.trigger(a, b, c, !0) : void 0
        }
    });

    function db(a) {
        var b = eb.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }
    var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        fb = / jQuery\d+="(?:null|\d+)"/g,
        gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"),
        hb = /^\s+/,
        ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        jb = /<([\w:]+)/,
        kb = /<tbody/i,
        lb = /<|&#?\w+;/,
        mb = /<(?:script|style|link)/i,
        nb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ob = /^$|\/(?:java|ecma)script/i,
        pb = /^true\/(.*)/,
        qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        rb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        sb = db(y),
        tb = sb.appendChild(y.createElement("div"));
    rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;

    function ub(a, b) {
        var c, d, e = 0,
            f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b));
        return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
    }
    function vb(a) {
        W.test(a.type) && (a.defaultChecked = a.checked)
    }
    function wb(a, b) {
        return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function xb(a) {
        return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
    }
    function yb(a) {
        var b = pb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }
    function zb(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
    }
    function Ab(a, b) {
        if (1 === b.nodeType && m.hasData(a)) {
            var c, d, e, f = m._data(a),
                g = m._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
            }
            g.data && (g.data = m.extend({}, g.data))
        }
    }
    function Bb(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                e = m._data(b);
                for (d in e.events) m.removeEvent(b, d, e.handle);
                b.removeAttribute(m.expando)
            }
            "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }
    m.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
            if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a))) for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g) d[g] && Bb(e, d[g]);
            if (b) if (c) for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++) Ab(e, d[g]);
            else Ab(a, f);
            return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++) if (f = a[q], f || 0 === f) if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
            else if (lb.test(f)) {
                h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1></$2>") + l[2], e = l[0];
                while (e--) h = h.lastChild;
                if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
                    f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                    while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                }
                m.merge(p, h.childNodes), h.textContent = "";
                while (h.firstChild) h.removeChild(h.firstChild);
                h = o.lastChild
            } else p.push(b.createTextNode(f));
            h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0;
            while (f = p[q++]) if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
                e = 0;
                while (f = h[e++]) ob.test(f.type || "") && c.push(f)
            }
            return h = null, o
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++) if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                if (g.events) for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
            }
        }
    }), m.fn.extend({
        text: function(a) {
            return V(this, function(a) {
                return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = wb(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = wb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && m.cleanData(ub(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && m.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return m.clone(this, a, b)
            })
        },
        html: function(a) {
            return V(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0;
                if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(ib, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0,
                l = this.length,
                n = this,
                o = l - 1,
                p = a[0],
                q = m.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p)) return this.each(function(c) {
                var d = n.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
                if (f) for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++) d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
                i = c = null
            }
            return this
        }
    }), m.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        m.fn[a] = function(a) {
            for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var Cb, Db = {};

    function Eb(b, c) {
        var d, e = m(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
        return e.detach(), f
    }
    function Fb(a) {
        var b = y,
            c = Db[a];
        return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c
    }!
    function() {
        var a;
        k.shrinkWrapBlocks = function() {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
        }
    }();
    var Gb = /^margin/,
        Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
        Ib, Jb, Kb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ib = function(a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, Jb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : y.documentElement.currentStyle && (Ib = function(a) {
        return a.currentStyle
    }, Jb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    });

    function Lb(a, b) {
        return {
            get: function() {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }!
    function() {
        var b, c, d, e, f, g, h;
        if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
            c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !! c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
                reliableHiddenOffsets: function() {
                    return null == g && i(), g
                },
                boxSizingReliable: function() {
                    return null == f && i(), f
                },
                pixelPosition: function() {
                    return null == e && i(), e
                },
                reliableMarginRight: function() {
                    return null == h && i(), h
                }
            });

            function i() {
                var b, c, d, i;
                c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
                    width: "4px"
                }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
            }
        }
    }(), m.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Mb = /alpha\([^)]*\)/i,
        Nb = /opacity\s*=\s*([^)]*)/,
        Ob = /^(none|table(?!-c[ea]).+)/,
        Pb = new RegExp("^(" + S + ")(.*)$", "i"),
        Qb = new RegExp("^([+-])=(" + S + ")", "i"),
        Rb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Sb = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Tb = ["Webkit", "O", "Moz", "ms"];

    function Ub(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1),
            d = b,
            e = Tb.length;
        while (e--) if (b = Tb[e] + c, b in a) return b;
        return d
    }
    function Vb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    function Wb(a, b, c) {
        var d = Pb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function Xb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
        return g
    }
    function Yb(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ib(a),
            g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }
    m.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Jb(a, "opacity");
                        return "" === c ? "1" : c
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
            "float": k.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = m.camelCase(b),
                    i = a.style;
                if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = m.camelCase(b);
            return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
        }
    }), m.each(["height", "width"], function(a, b) {
        m.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function() {
                    return Yb(a, b, d)
                }) : Yb(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Ib(a);
                return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), k.opacity || (m.cssHooks.opacity = {
        get: function(a, b) {
            return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e)
        }
    }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function(a, b) {
        return b ? m.swap(a, {
            display: "inline-block"
        }, Jb, [a, "marginRight"]) : void 0
    }), m.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        m.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Gb.test(a) || (m.cssHooks[a + b].set = Wb)
    }), m.fn.extend({
        css: function(a, b) {
            return V(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (m.isArray(b)) {
                    for (d = Ib(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Vb(this, !0)
        },
        hide: function() {
            return Vb(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                U(this) ? m(this).show() : m(this).hide()
            })
        }
    });

    function Zb(a, b, c, d, e) {
        return new Zb.prototype.init(a, b, c, d, e)
    }
    m.Tween = Zb, Zb.prototype = {
        constructor: Zb,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Zb.propHooks[this.prop];
            return a && a.get ? a.get(this) : Zb.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Zb.propHooks[this.prop];
            return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this
        }
    }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, m.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, m.fx = Zb.prototype.init, m.fx.step = {};
    var $b, _b, ac = /^(?:toggle|show|hide)$/,
        bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
        cc = /queueHooks$/,
        dc = [ic],
        ec = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = bc.exec(b),
                    f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
                    g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, m.style(c.elem, a, g + f);
                    while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

    function fc() {
        return setTimeout(function() {
            $b = void 0
        }), $b = m.now()
    }
    function gc(a, b) {
        var c, d = {
            height: a
        },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }
    function hc(a, b, c) {
        for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
    }
    function ic(a, b, c) {
        var d, e, f, g, h, i, j, l, n = this,
            o = {},
            p = a.style,
            q = a.nodeType && U(a),
            r = m._data(a, "fxshow");
        c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, n.always(function() {
            n.always(function() {
                h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
        }));
        for (d in b) if (e = b[d], ac.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d]) continue;
                q = !0
            }
            o[d] = r && r[d] || m.style(a, d)
        } else j = void 0;
        if (m.isEmptyObject(o))"inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j);
        else {
            r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() {
                m(a).hide()
            }), n.done(function() {
                var b;
                m._removeData(a, "fxshow");
                for (b in o) m.style(a, b, o[b])
            });
            for (d in o) g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }
    function jc(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }
    function kc(a, b, c) {
        var d, e, f = 0,
            g = dc.length,
            h = m.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: m.extend({}, b),
                opts: m.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: $b || fc(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (jc(k, j.opts.specialEasing); g > f; f++) if (d = dc[f].call(j, a, k, j.opts)) return d;
        return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    m.Animation = m.extend(kc, {
        tweener: function(a, b) {
            m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? dc.unshift(a) : dc.push(a)
        }
    }), m.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? m.extend({}, a) : {
            complete: c || !c && b || m.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !m.isFunction(b) && b
        };
        return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
        }, d
    }, m.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(U).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = m.isEmptyObject(a),
                f = m.speed(b, c, d),
                g = function() {
                    var b = kc(this, m.extend({}, a), f);
                    (e || m._data(this, "finish")) && b.stop(!0)
                };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                var b = !0,
                    e = null != a && a + "queueHooks",
                    f = m.timers,
                    g = m._data(this);
                if (e) g[e] && g[e].stop && d(g[e]);
                else
                for (e in g) g[e] && g[e].stop && cc.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                (b || !c) && m.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = m._data(this),
                    d = c[a + "queue"],
                    e = c[a + "queueHooks"],
                    f = m.timers,
                    g = d ? d.length : 0;
                for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), m.each(["toggle", "show", "hide"], function(a, b) {
        var c = m.fn[b];
        m.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e)
        }
    }), m.each({
        slideDown: gc("show"),
        slideUp: gc("hide"),
        slideToggle: gc("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        m.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), m.timers = [], m.fx.tick = function() {
        var a, b = m.timers,
            c = 0;
        for ($b = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || m.fx.stop(), $b = void 0
    }, m.fx.timer = function(a) {
        m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
    }, m.fx.interval = 13, m.fx.start = function() {
        _b || (_b = setInterval(m.fx.tick, m.fx.interval))
    }, m.fx.stop = function() {
        clearInterval(_b), _b = null
    }, m.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, m.fn.delay = function(a, b) {
        return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d)
            }
        })
    }, function() {
        var a, b, c, d, e;
        b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !! a.value, k.optSelected = e.selected, k.enctype = !! y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
    }();
    var lc = /\r/g;
    m.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = m.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
            }
        }
    }), m.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = m.find.attr(a, "value");
                    return null != b ? b : m.trim(m.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                        if (b = m(c).val(), f) return b;
                        g.push(b)
                    }
                    return g
                },
                set: function(a, b) {
                    var c, d, e = a.options,
                        f = m.makeArray(b),
                        g = e.length;
                    while (g--) if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
                        d.selected = c = !0
                    } catch (h) {
                        d.scrollHeight
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e
                }
            }
        }
    }), m.each(["radio", "checkbox"], function() {
        m.valHooks[this] = {
            set: function(a, b) {
                return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
            }
        }, k.checkOn || (m.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var mc, nc, oc = m.expr.attrHandle,
        pc = /^(?:checked|selected)$/i,
        qc = k.getSetAttribute,
        rc = k.input;
    m.fn.extend({
        attr: function(a, b) {
            return V(this, m.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                m.removeAttr(this, a)
            })
        }
    }), m.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(E);
            if (f && 1 === a.nodeType) while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), nc = {
        set: function(a, b, c) {
            return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = oc[b] || m.find.attr;
        oc[b] = rc && qc || !pc.test(b) ?
        function(a, b, d) {
            var e, f;
            return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e
        } : function(a, b, c) {
            return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), rc && qc || (m.attrHooks.value = {
        set: function(a, b, c) {
            return m.nodeName(a, "input") ? void(a.defaultValue = b) : mc && mc.set(a, b, c)
        }
    }), qc || (mc = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    }, oc.id = oc.name = oc.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, m.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: mc.set
    }, m.attrHooks.contenteditable = {
        set: function(a, b, c) {
            mc.set(a, "" === b ? !1 : b, c)
        }
    }, m.each(["width", "height"], function(a, b) {
        m.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), k.style || (m.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    var sc = /^(?:input|select|textarea|button|object)$/i,
        tc = /^(?:a|area)$/i;
    m.fn.extend({
        prop: function(a, b) {
            return V(this, m.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = m.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a]
                } catch (b) {}
            })
        }
    }), m.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = m.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), k.hrefNormalized || m.each(["href", "src"], function(a, b) {
        m.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }), k.optSelected || (m.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        m.propFix[this.toLowerCase()] = this
    }), k.enctype || (m.propFix.enctype = "encoding");
    var uc = /[\t\r\n\f]/g;
    m.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0,
                i = this.length,
                j = "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).addClass(a.call(this, b, this.className))
            });
            if (j) for (b = (a || "").match(E) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
                f = 0;
                while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = m.trim(d), c.className !== g && (c.className = g)
            }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0,
                i = this.length,
                j = 0 === arguments.length || "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).removeClass(a.call(this, b, this.className))
            });
            if (j) for (b = (a || "").match(E) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
                f = 0;
                while (e = b[f++]) while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ?
            function(c) {
                m(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0,
                        e = m(this),
                        f = a.match(E) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        m.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), m.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var vc = m.now(),
        wc = /\?/,
        xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    m.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null,
            e = m.trim(b + "");
        return e && !m.trim(e.replace(xc, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
    }, m.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
    };
    var yc, zc, Ac = /#.*$/,
        Bc = /([?&])_=[^&]*/,
        Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Ec = /^(?:GET|HEAD)$/,
        Fc = /^\/\//,
        Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Hc = {},
        Ic = {},
        Jc = "*/".concat("*");
    try {
        zc = location.href
    } catch (Kc) {
        zc = y.createElement("a"), zc.href = "", zc = zc.href
    }
    yc = Gc.exec(zc.toLowerCase()) || [];

    function Lc(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(E) || [];
            if (m.isFunction(c)) while (d = f[e++])"+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function Mc(a, b, c, d) {
        var e = {},
            f = a === Ic;

        function g(h) {
            var i;
            return e[h] = !0, m.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }
    function Nc(a, b) {
        var c, d, e = m.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && m.extend(!0, a, c), a
    }
    function Oc(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break
        }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }
    function Pc(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a["throws"]) b = g(b);
            else
            try {
                b = g(b)
            } catch (l) {
                return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f
                }
            }
        }
        return {
            state: "success",
            data: b
        }
    }
    m.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: zc,
            type: "GET",
            isLocal: Dc.test(yc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Jc,
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
                "text json": m.parseJSON,
                "text xml": m.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a)
        },
        ajaxPrefilter: Lc(Hc),
        ajaxTransport: Lc(Ic),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
                l = k.context || k,
                n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
                o = m.Deferred(),
                p = m.Callbacks("once memory"),
                q = k.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!j) {
                                j = {};
                                while (b = Cc.exec(f)) j[b[1].toLowerCase()] = b[2]
                            }
                            b = j[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a) if (2 > t) for (b in a) q[b] = [q[b], a[b]];
                        else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return i && i.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t) return v;
            h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]);
            for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (d in {
                success: 1,
                error: 1,
                complete: 1
            }) v[d](k[d]);
            if (i = Mc(Ic, k, b, v)) {
                v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, i.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, c, d) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return m.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return m.get(a, void 0, b, "script")
        }
    }), m.each(["get", "post"], function(a, b) {
        m[b] = function(a, c, d, e) {
            return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        m.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), m._evalUrl = function(a) {
        return m.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, m.fn.extend({
        wrapAll: function(a) {
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(m.isFunction(a) ?
            function(b) {
                m(this).wrapInner(a.call(this, b))
            } : function() {
                var b = m(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = m.isFunction(a);
            return this.each(function(c) {
                m(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
            }).end()
        }
    }), m.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
    }, m.expr.filters.visible = function(a) {
        return !m.expr.filters.hidden(a)
    };
    var Qc = /%20/g,
        Rc = /\[\]$/,
        Sc = /\r?\n/g,
        Tc = /^(?:submit|button|image|reset|file)$/i,
        Uc = /^(?:input|select|textarea|keygen)/i;

    function Vc(a, b, c, d) {
        var e;
        if (m.isArray(b)) m.each(b, function(b, e) {
            c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== m.type(b)) d(a, b);
        else
        for (e in b) Vc(a + "[" + e + "]", b[e], c, d)
    }
    m.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
            e(this.name, this.value)
        });
        else
        for (c in a) Vc(c, a[c], b, e);
        return d.join("&").replace(Qc, "+")
    }, m.fn.extend({
        serialize: function() {
            return m.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = m.prop(this, "elements");
                return a ? m.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a))
            }).map(function(a, b) {
                var c = m(this).val();
                return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Sc, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Sc, "\r\n")
                }
            }).get()
        }
    }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ?
    function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c()
    } : Zc;
    var Wc = 0,
        Xc = {},
        Yc = m.ajaxSettings.xhr();
    a.ActiveXObject && m(a).on("unload", function() {
        for (var a in Xc) Xc[a](void 0, !0)
    }), k.cors = !! Yc && "withCredentials" in Yc, Yc = k.ajax = !! Yc, Yc && m.ajaxTransport(function(a) {
        if (!a.crossDomain || k.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(),
                        g = ++Wc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState)) if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
                        else {
                            j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                            try {
                                i = f.statusText
                            } catch (k) {
                                i = ""
                            }
                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                        }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b()
                },
                abort: function() {
                    b && b(void 0, !0)
                }
            }
        }
    });

    function Zc() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function $c() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    m.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return m.globalEval(a), a
            }
        }
    }), m.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), m.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = y.head || m("head")[0] || y.documentElement;
            return {
                send: function(d, e) {
                    b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var _c = [],
        ad = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = _c.pop() || m.expando + "_" + vc++;
            return this[a] = !0, a
        }
    }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || m.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), m.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || y;
        var d = u.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
    };
    var bd = m.fn.load;
    m.fn.load = function(a, b, c) {
        if ("string" != typeof a && bd) return bd.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
        }).complete(c &&
        function(a, b) {
            g.each(c, e || [a.responseText, b, a])
        }), this
    }, m.expr.filters.animated = function(a) {
        return m.grep(m.timers, function(b) {
            return a === b.elem
        }).length
    };
    var cd = a.document.documentElement;

    function dd(a) {
        return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    m.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = m.css(a, "position"),
                l = m(a),
                n = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
        }
    }, m.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                m.offset.setOffset(this, a, b)
            });
            var b, c, d = {
                top: 0,
                left: 0
            },
                e = this[0],
                f = e && e.ownerDocument;
            if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                },
                    d = this[0];
                return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - m.css(d, "marginTop", !0),
                    left: b.left - c.left - m.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || cd;
                while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
                return a || cd
            })
        }
    }), m.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        m.fn[a] = function(d) {
            return V(this, function(a, d, e) {
                var f = dd(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), m.each(["top", "left"], function(a, b) {
        m.cssHooks[b] = Lb(k.pixelPosition, function(a, c) {
            return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0
        })
    }), m.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        m.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            m.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return V(this, function(b, c, d) {
                    var e;
                    return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), m.fn.size = function() {
        return this.length
    }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return m
    });
    var ed = a.jQuery,
        fd = a.$;
    return m.noConflict = function(b) {
        return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m
    }, typeof b === K && (a.jQuery = a.$ = m), m
});
/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.9.4.min
 ================================================================================*/
(function(b) {
    b.fn.bPopup = function(z, F) {
        function K() {
            a.contentContainer = b(a.contentContainer || c);
            switch (a.content) {
            case "iframe":
                var h = b('<iframe class="b-iframe" ' + a.iframeAttr + "></iframe>");
                h.appendTo(a.contentContainer);
                r = c.outerHeight(!0);
                s = c.outerWidth(!0);
                A();
                h.attr("src", a.loadUrl);
                k(a.loadCallback);
                break;
            case "image":
                A();
                b("<img />").load(function() {
                    k(a.loadCallback);
                    G(b(this))
                }).attr("src", a.loadUrl).hide().appendTo(a.contentContainer);
                break;
            default:
                A(), b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl, a.loadData, function() {
                    k(a.loadCallback);
                    G(b(this))
                }).hide().appendTo(a.contentContainer)
            }
        }
        function A() {
            a.modal && b('<div class="b-modal ' + e + '"></div>').css({
                backgroundColor: a.modalColor,
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: 0,
                zIndex: a.zIndex + t
            }).appendTo(a.appendTo).fadeTo(a.speed, a.opacity);
            D();
            c.data("bPopup", a).data("id", e).css({
                left: "slideIn" == a.transition || "slideBack" == a.transition ? "slideBack" == a.transition ? g.scrollLeft() + u : -1 * (v + s) : l(!(!a.follow[0] && m || f)),
                position: a.positionStyle || "absolute",
                top: "slideDown" == a.transition || "slideUp" == a.transition ? "slideUp" == a.transition ? g.scrollTop() + w : x + -1 * r : n(!(!a.follow[1] && p || f)),
                "z-index": a.zIndex + t + 1
            }).each(function() {
                a.appending && b(this).appendTo(a.appendTo)
            });
            H(!0)
        }
        function q() {
            a.modal && b(".b-modal." + c.data("id")).fadeTo(a.speed, 0, function() {
                b(this).remove()
            });
            a.scrollBar || b("html").css("overflow", "auto");
            b(".b-modal." + e).unbind("click");
            g.unbind("keydown." + e);
            d.unbind("." + e).data("bPopup", 0 < d.data("bPopup") - 1 ? d.data("bPopup") - 1 : null);
            c.undelegate(".bClose, ." + a.closeClass, "click." + e, q).data("bPopup", null);
            H();
            return !1
        }
        function G(h) {
            var b = h.width(),
                e = h.height(),
                d = {};
            a.contentContainer.css({
                height: e,
                width: b
            });
            e >= c.height() && (d.height = c.height());
            b >= c.width() && (d.width = c.width());
            r = c.outerHeight(!0);
            s = c.outerWidth(!0);
            D();
            a.contentContainer.css({
                height: "auto",
                width: "auto"
            });
            d.left = l(!(!a.follow[0] && m || f));
            d.top = n(!(!a.follow[1] && p || f));
            c.animate(d, 250, function() {
                h.show();
                B = E()
            })
        }
        function L() {
            d.data("bPopup", t);
            c.delegate(".bClose, ." + a.closeClass, "click." + e, q);
            a.modalClose && b(".b-modal." + e).css("cursor", "pointer").bind("click", q);
            M || !a.follow[0] && !a.follow[1] || d.bind("scroll." + e, function() {
                B && c.dequeue().animate({
                    left: a.follow[0] ? l(!f) : "auto",
                    top: a.follow[1] ? n(!f) : "auto"
                }, a.followSpeed, a.followEasing)
            }).bind("resize." + e, function() {
                w = y.innerHeight || d.height();
                u = y.innerWidth || d.width();
                if (B = E()) clearTimeout(I), I = setTimeout(function() {
                    D();
                    c.dequeue().each(function() {
                        f ? b(this).css({
                            left: v,
                            top: x
                        }) : b(this).animate({
                            left: a.follow[0] ? l(!0) : "auto",
                            top: a.follow[1] ? n(!0) : "auto"
                        }, a.followSpeed, a.followEasing)
                    })
                }, 50)
            });
            a.escClose && g.bind("keydown." + e, function(a) {
                27 == a.which && q()
            })
        }
        function H(b) {
            function d(e) {
                c.css({
                    display: "block",
                    opacity: 1
                }).animate(e, a.speed, a.easing, function() {
                    J(b)
                })
            }
            switch (b ? a.transition : a.transitionClose || a.transition) {
            case "slideIn":
                d({
                    left: b ? l(!(!a.follow[0] && m || f)) : g.scrollLeft() - (s || c.outerWidth(!0)) - C
                });
                break;
            case "slideBack":
                d({
                    left: b ? l(!(!a.follow[0] && m || f)) : g.scrollLeft() + u + C
                });
                break;
            case "slideDown":
                d({
                    top: b ? n(!(!a.follow[1] && p || f)) : g.scrollTop() - (r || c.outerHeight(!0)) - C
                });
                break;
            case "slideUp":
                d({
                    top: b ? n(!(!a.follow[1] && p || f)) : g.scrollTop() + w + C
                });
                break;
            default:
                c.stop().fadeTo(a.speed, b ? 1 : 0, function() {
                    J(b)
                })
            }
        }
        function J(b) {
            b ? (L(), k(F), a.autoClose && setTimeout(q, a.autoClose)) : (c.hide(), k(a.onClose), a.loadUrl && (a.contentContainer.empty(), c.css({
                height: "auto",
                width: "auto"
            })))
        }
        function l(a) {
            return a ? v + g.scrollLeft() : v
        }
        function n(a) {
            return a ? x + g.scrollTop() : x
        }
        function k(a) {
            b.isFunction(a) && a.call(c)
        }
        function D() {
            x = p ? a.position[1] : Math.max(0, (w - c.outerHeight(!0)) / 2 - a.amsl);
            v = m ? a.position[0] : (u - c.outerWidth(!0)) / 2;
            B = E()
        }
        function E() {
            return w > c.outerHeight(!0) && u > c.outerWidth(!0)
        }
        b.isFunction(z) && (F = z, z = null);
        var a = b.extend({}, b.fn.bPopup.defaults, z);
        a.scrollBar || b("html").css("overflow", "hidden");
        var c = this,
            g = b(document),
            y = window,
            d = b(y),
            w = y.innerHeight || d.height(),
            u = y.innerWidth || d.width(),
            M = /OS 6(_\d)+/i.test(navigator.userAgent),
            C = 200,
            t = 0,
            e, B, p, m, f, x, v, r, s, I;
        c.close = function() {
            a = this.data("bPopup");
            e = "__b-popup" + d.data("bPopup") + "__";
            q()
        };
        return c.each(function() {
            b(this).data("bPopup") || (k(a.onOpen), t = (d.data("bPopup") || 0) + 1, e = "__b-popup" + t + "__", p = "auto" !== a.position[1], m = "auto" !== a.position[0], f = "fixed" === a.positionStyle, r = c.outerHeight(!0), s = c.outerWidth(!0), a.loadUrl ? K() : A())
        })
    };
    b.fn.bPopup.defaults = {
        amsl: 50,
        appending: !0,
        appendTo: "body",
        autoClose: !1,
        closeClass: "b-close",
        content: "ajax",
        contentContainer: !1,
        easing: "swing",
        escClose: !0,
        follow: [!0, !0],
        followEasing: "swing",
        followSpeed: 500,
        iframeAttr: 'scrolling="no" frameborder="0"',
        loadCallback: !1,
        loadData: !1,
        loadUrl: !1,
        modal: !0,
        modalClose: !0,
        modalColor: "#000",
        onClose: !1,
        onOpen: !1,
        opacity: 0.7,
        position: ["auto", "auto"],
        positionStyle: "absolute",
        scrollBar: !0,
        speed: 250,
        transition: "fadeIn",
        transitionClose: !1,
        zIndex: 9997
    }
})(jQuery);
!
function(a) {
    a(["jquery"], function(a) {
        return function() {
            function b(a, b, c) {
                return o({
                    type: u.error,
                    iconClass: p().iconClasses.error,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function c(b, c) {
                return b || (b = p()), r = a("#" + b.containerId), r.length ? r : (c && (r = l(b)), r)
            }
            function d(a, b, c) {
                return o({
                    type: u.info,
                    iconClass: p().iconClasses.info,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function e(a) {
                s = a
            }
            function f(a, b, c) {
                return o({
                    type: u.success,
                    iconClass: p().iconClasses.success,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function g(a, b, c) {
                return o({
                    type: u.warning,
                    iconClass: p().iconClasses.warning,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function h(a) {
                var b = p();
                r || c(b), k(a, b) || j(b)
            }
            function i(b) {
                var d = p();
                return r || c(d), b && 0 === a(":focus", b).length ? void q(b) : void(r.children().length && r.remove())
            }
            function j(b) {
                for (var c = r.children(), d = c.length - 1; d >= 0; d--) k(a(c[d]), b)
            }
            function k(b, c) {
                return b && 0 === a(":focus", b).length ? (b[c.hideMethod]({
                    duration: c.hideDuration,
                    easing: c.hideEasing,
                    complete: function() {
                        q(b)
                    }
                }), !0) : !1
            }
            function l(b) {
                return r = a("<div/>").attr("id", b.containerId).addClass(b.positionClass).attr("aria-live", "polite").attr("role", "alert"), r.appendTo(a(b.target)), r
            }
            function m() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: !0
                }
            }
            function n(a) {
                s && s(a)
            }
            function o(b) {
                function d(b) {
                    return !a(":focus", j).length || b ? j[g.hideMethod]({
                        duration: g.hideDuration,
                        easing: g.hideEasing,
                        complete: function() {
                            q(j), g.onHidden && "hidden" !== o.state && g.onHidden(), o.state = "hidden", o.endTime = new Date, n(o)
                        }
                    }) : void 0
                }
                function e() {
                    (g.timeOut > 0 || g.extendedTimeOut > 0) && (i = setTimeout(d, g.extendedTimeOut))
                }
                function f() {
                    clearTimeout(i), j.stop(!0, !0)[g.showMethod]({
                        duration: g.showDuration,
                        easing: g.showEasing
                    })
                }
                var g = p(),
                    h = b.iconClass || g.iconClass;
                "undefined" != typeof b.optionsOverride && (g = a.extend(g, b.optionsOverride), h = b.optionsOverride.iconClass || h), t++, r = c(g, !0);
                var i = null,
                    j = a("<div/>"),
                    k = a("<div/>"),
                    l = a("<div/>"),
                    m = a(g.closeHtml),
                    o = {
                        toastId: t,
                        state: "visible",
                        startTime: new Date,
                        options: g,
                        map: b
                    };
                return b.iconClass && j.addClass(g.toastClass).addClass(h), b.title && (k.append(b.title).addClass(g.titleClass), j.append(k)), b.message && (l.append(b.message).addClass(g.messageClass), j.append(l)), g.closeButton && (m.addClass("toast-close-button").attr("role", "button"), j.prepend(m)), j.hide(), g.newestOnTop ? r.prepend(j) : r.append(j), j[g.showMethod]({
                    duration: g.showDuration,
                    easing: g.showEasing,
                    complete: g.onShown
                }), g.timeOut > 0 && (i = setTimeout(d, g.timeOut)), j.hover(f, e), !g.onclick && g.tapToDismiss && j.click(d), g.closeButton && m && m.click(function(a) {
                    a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble && a.cancelBubble !== !0 && (a.cancelBubble = !0), d(!0)
                }), g.onclick && j.click(function() {
                    g.onclick(), d()
                }), n(o), g.debug && console && console.log(o), j
            }
            function p() {
                return a.extend({}, m(), v.options)
            }
            function q(a) {
                r || (r = c()), a.is(":visible") || (a.remove(), a = null, 0 === r.children().length && r.remove())
            }
            var r, s, t = 0,
                u = {
                    error: "error",
                    info: "info",
                    success: "success",
                    warning: "warning"
                },
                v = {
                    clear: h,
                    remove: i,
                    error: b,
                    getContainer: c,
                    info: d,
                    options: {},
                    subscribe: e,
                    success: f,
                    version: "2.0.3",
                    warning: g
                };
            return v
        }()
    })
}("function" == typeof define && define.amd ? define : function(a, b) {
    "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : window.toastr = b(window.jQuery)
});

function Tile(d) {
    var g = d;
    var c = "perspective( 800px ) rotateX( 0deg ) rotateY( 0deg ) translateZ( 0px )";
    var e = function() {
        g.style.webkitTransformOrigin = "50% 50%";
        g.style.MozTransformOrigin = "50% 50%";
        g.style.msTransformOrigin = "50% 50%";
        g.style.oTransformOrigin = "50% 50%";
        g.style.transformOrigin = "50% 50%";
        g.parentElement.style.webkitTransformStyle = "preserve-3d";
        g.parentElement.style.MozTransformStyle = "preserve-3d";
        g.parentElement.style.msTransformStyle = "preserve-3d";
        g.parentElement.style.oTransformStyle = "preserve-3d";
        g.parentElement.style.transformStyle = "preserve-3d";
        g.style.webkitTransition = "-webkit-transform 0.08s";
        g.style.MozTransition = "-moz-transform 0.08s";
        g.style.msTransition = "-ms-transform 0.08s";
        g.style.oTransition = "-o-transform 0.08s";
        g.style.transition = "transform 0.08s";
        g.style.outline = "1px solid transparent";
        g.style.webkitFontSmoothing = "antialiased";
        g.addEventListener("mousedown", h, false);
    };
    var f = function(l, o) {
        var m = g.offsetWidth;
        var k = g.offsetHeight;
        var n = "perspective( 800px ) ";
        if (l > m / 4 && l < (m / 4 * 3) && o > k / 4 && o < (k / 4 * 3)) {
            n += "rotateX( 0deg ) rotateY( 0deg ) translateZ( -30px )";
        } else {
            if (Math.min(l, m - l) < Math.min(o, k - o)) {
                if (l < m - l) {
                    n += "rotateX( 0deg ) rotateY( -20deg ) translateZ( 0px )";
                } else {
                    n += "rotateX( 0deg ) rotateY( 20deg ) translateZ( 0px )";
                }
            } else {
                if (o < k - o) {
                    n += "rotateX( 20deg ) rotateY( 0deg ) translateZ( 0px )";
                } else {
                    n += "rotateX( -20deg ) rotateY( 0deg ) translateZ( 0px )";
                }
            }
        }
        g.style.webkitTransform = n;
        g.style.MozTransform = n;
        g.style.msTransform = n;
        g.style.oTransform = n;
        g.style.transform = n;
        document.addEventListener("mouseup", a, false);
    };
    var h = function(m) {
        if (m.offsetX) {
            f(m.offsetX, m.offsetY);
            return;
        }
        var l = b(g);
        var k = m.pageX - l.x;
        var n = m.pageY - l.y;
        f(k, n);
    };
    var a = function(k) {
        g.style.webkitTransform = c;
        g.style.MozTransform = c;
        g.style.msTransform = c;
        g.style.oTransform = c;
        g.style.transform = c;
        document.removeEventListener("mouseup", a, false);
    };
    var j = function(k, l) {
        return parseInt(k.getPropertyValue(l), 10);
    };
    var b = function(n) {
        var q = 0,
            p = 0;
        var s = true;
        do {
            q += n.offsetLeft;
            p += n.offsetTop;
            var k = getComputedStyle(n, null);
            var m = j(k, "border-top-width");
            var o = j(k, "border-left-width");
            p += m;
            q += o;
            if (s) {
                var r = j(k, "padding-top");
                var l = j(k, "padding-left");
                p += r;
                q += l;
            }
            s = false;
        } while (n = n.offsetParent);
        return {
            x: q,
            y: p
        };
    };
    e();
}
var tileElements = document.getElementsByClassName("metro-tile");
var i;
for (i = 0; i < tileElements.length; i++) {
    Tile(tileElements[i]);
}
//document.domain = "http://jutja.com";
$("[data-toggle='offcanvas']").click(function(e) {
    e.preventDefault();
    //If window is small enough, enable sidebar push menu
    if ($(window).width() <= 992) {
        $('.row-offcanvas').toggleClass('active');
        $('.left-side').removeClass("collapse-left");
        $(".right-side").removeClass("strech");
        $('.row-offcanvas').toggleClass("relative");
    } else {
        //Else, enable content streching
        $('.left-side').toggleClass("collapse-left");
        $(".right-side").toggleClass("strech");
    }
});


+
function($) {

    // DROPDOWN CLASS DEFINITION
    // =========================
    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle=dropdown]'
    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.prototype.toggle = function(e) {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }

            $parent.trigger(e = $.Event('show.bs.dropdown'))

            if (e.isDefaultPrevented()) return

            $parent.toggleClass('open').trigger('shown.bs.dropdown')

            $this.focus()
        }

        return false
    }

    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27) $parent.find(toggle).focus()
            return $this.click()
        }

        var $items = $('[role=menu] li:not(.divider):visible a', $parent)

        if (!$items.length) return

        var index = $items.index($items.filter(':focus'))

        if (e.keyCode == 38 && index > 0) index-- // up
        if (e.keyCode == 40 && index < $items.length - 1) index++ // down
        if (!~index) index = 0

        $items.eq(index).focus()
    }

    function clearMenus() {
        $(backdrop).remove()
        $(toggle).each(function(e) {
            var $parent = getParent($(this))
            if (!$parent.hasClass('open')) return
            $parent.trigger(e = $.Event('hide.bs.dropdown'))
            if (e.isDefaultPrevented()) return
            $parent.removeClass('open').trigger('hidden.bs.dropdown')
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================
    var old = $.fn.dropdown

    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.dropdown')

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================
    $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation()
    }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)

}(jQuery);

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function(root, factory) {
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try {
            moment = require('moment');
        } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function(req) {
            // Load moment.js as an optional dependency
            var id = 'moment';
            moment = req.defined && req.defined(id) ? req(id) : undefined;
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function(moment) {
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

        hasEventListeners = !! window.addEventListener,

        document = window.document,

        sto = window.setTimeout,

        addEvent = function(el, e, callback, capture) {
            if (hasEventListeners) {
                el.addEventListener(e, callback, !! capture);
            } else {
                el.attachEvent('on' + e, callback);
            }
        },

        removeEvent = function(el, e, callback, capture) {
            if (hasEventListeners) {
                el.removeEventListener(e, callback, !! capture);
            } else {
                el.detachEvent('on' + e, callback);
            }
        },

        fireEvent = function(el, eventName, data) {
            var ev;

            if (document.createEvent) {
                ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, true, false);
                ev = extend(ev, data);
                el.dispatchEvent(ev);
            } else if (document.createEventObject) {
                ev = document.createEventObject();
                ev = extend(ev, data);
                el.fireEvent('on' + eventName, ev);
            }
        },

        trim = function(str) {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
        },

        hasClass = function(el, cn) {
            return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
        },

        addClass = function(el, cn) {
            if (!hasClass(el, cn)) {
                el.className = (el.className === '') ? cn : el.className + ' ' + cn;
            }
        },

        removeClass = function(el, cn) {
            el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
        },

        isArray = function(obj) {
            return (/Array/).test(Object.prototype.toString.call(obj));
        },

        isDate = function(obj) {
            return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
        },

        isLeapYear = function(year) {
            // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },

        getDaysInMonth = function(year, month) {
            return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },

        setToStartOfDay = function(date) {
            if (isDate(date)) date.setHours(0, 0, 0, 0);
        },

        compareDates = function(a, b) {
            // weak date comparison (use setToStartOfDay(date) to ensure correct result)
            return a.getTime() === b.getTime();
        },

        extend = function(to, from, overwrite) {
            var prop, hasProp;
            for (prop in from) {
                hasProp = to[prop] !== undefined;
                if (hasProp && typeof from[prop] === 'object' && from[prop].nodeName === undefined) {
                    if (isDate(from[prop])) {
                        if (overwrite) {
                            to[prop] = new Date(from[prop].getTime());
                        }
                    } else if (isArray(from[prop])) {
                        if (overwrite) {
                            to[prop] = from[prop].slice(0);
                        }
                    } else {
                        to[prop] = extend({}, from[prop], overwrite);
                    }
                } else if (overwrite || !hasProp) {
                    to[prop] = from[prop];
                }
            }
            return to;
        },

        adjustCalendar = function(calendar) {
            if (calendar.month < 0) {
                calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
                calendar.month += 12;
            }
            if (calendar.month > 11) {
                calendar.year += Math.floor(Math.abs(calendar.month) / 12);
                calendar.month -= 12;
            }
            return calendar;
        },

        /**
         * defaults and localisation
         */
        defaults = {

            // bind the picker to a form field
            field: null,

            // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
            bound: undefined,

            // position of the datepicker, relative to the field (default to bottom & left)
            // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
            position: 'bottom left',

            // the default output format for `.toString()` and `field` value
            format: 'YYYY-MM-DD',

            // the initial date to view when first opened
            defaultDate: null,

            // make the `defaultDate` the initial selected value
            setDefaultDate: false,

            // first day of week (0: Sunday, 1: Monday etc)
            firstDay: 0,

            // the minimum/earliest date that can be selected
            minDate: null,
            // the maximum/latest date that can be selected
            maxDate: null,

            // number of years either side, or array of upper/lower range
            yearRange: 10,

            // show week numbers at head of row
            showWeekNumber: false,

            // used internally (don't config outside)
            minYear: 0,
            maxYear: 9999,
            minMonth: undefined,
            maxMonth: undefined,

            isRTL: false,

            // Additional text to append to the year in the calendar title
            yearSuffix: '',

            // Render the month after year in the calendar title
            showMonthAfterYear: false,

            // how many months are visible
            numberOfMonths: 1,

            // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
            // only used for the first display or when a selected date is not visible
            mainCalendar: 'left',

            // Specify a DOM element to render the calendar in
            container: undefined,

            // internationalization
            i18n: {
                previousMonth: 'Previous Month',
                nextMonth: 'Next Month',
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },

            // callback function
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null
        },


        /**
         * templating functions to abstract HTML rendering
         */
        renderDayName = function(opts, day, abbr) {
            day += opts.firstDay;
            while (day >= 7) {
                day -= 7;
            }
            return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
        },

        renderDay = function(d, m, y, isSelected, isToday, isDisabled, isEmpty) {
            if (isEmpty) {
                return '<td class="is-empty"></td>';
            }
            var arr = [];
            if (isDisabled) {
                arr.push('is-disabled');
            }
            if (isToday) {
                arr.push('is-today');
            }
            if (isSelected) {
                arr.push('is-selected');
            }
            return '<td data-day="' + d + '" class="' + arr.join(' ') + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + y + '" data-pika-month="' + m + '" data-pika-day="' + d + '">' + d + '</button>' + '</td>';
        },

        renderWeek = function(d, m, y) {
            // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
            var onejan = new Date(y, 0, 1),
                weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay() + 1) / 7);
            return '<td class="pika-week">' + weekNum + '</td>';
        },

        renderRow = function(days, isRTL) {
            return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
        },

        renderBody = function(rows) {
            return '<tbody>' + rows.join('') + '</tbody>';
        },

        renderHead = function(opts) {
            var i, arr = [];
            if (opts.showWeekNumber) {
                arr.push('<th></th>');
            }
            for (i = 0; i < 7; i++) {
                arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
            }
            return '<thead>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</thead>';
        },

        renderTitle = function(instance, c, year, month, refYear) {
            var i, j, arr, opts = instance._o,
                isMinYear = year === opts.minYear,
                isMaxYear = year === opts.maxYear,
                html = '<div class="pika-title">',
                monthHtml, yearHtml, prev = true,
                next = true;

            for (arr = [], i = 0; i < 12; i++) {
                arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected' : '') + ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') + '>' + opts.i18n.months[i] + '</option>');
            }
            monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month">' + arr.join('') + '</select></div>';

            if (isArray(opts.yearRange)) {
                i = opts.yearRange[0];
                j = opts.yearRange[1] + 1;
            } else {
                i = year - opts.yearRange;
                j = 1 + year + opts.yearRange;
            }

            for (arr = []; i < j && i <= opts.maxYear; i++) {
                if (i >= opts.minYear) {
                    arr.push('<option value="' + i + '"' + (i === year ? ' selected' : '') + '>' + (i) + '</option>');
                }
            }
            yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year">' + arr.join('') + '</select></div>';

            if (opts.showMonthAfterYear) {
                html += yearHtml + monthHtml;
            } else {
                html += monthHtml + yearHtml;
            }

            if (isMinYear && (month === 0 || opts.minMonth >= month)) {
                prev = false;
            }

            if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
                next = false;
            }

            if (c === 0) {
                html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
            }
            if (c === (instance._o.numberOfMonths - 1)) {
                html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
            }

            return html += '</div>';
        },

        renderTable = function(opts, data) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table">' + renderHead(opts) + renderBody(data) + '</table>';
        },


        /**
         * Pikaday constructor
         */
        Pikaday = function(options) {
            var self = this,
                opts = self.config(options);

            self._onMouseDown = function(e) {
                if (!self._v) {
                    return;
                }
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (!target) {
                    return;
                }

                if (!hasClass(target, 'is-disabled')) {
                    if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty')) {
                        self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                        if (opts.bound) {
                            sto(function() {
                                self.hide();
                                if (opts.field) {
                                    opts.field.blur();
                                }
                            }, 100);
                        }
                        return;
                    } else if (hasClass(target, 'pika-prev')) {
                        self.prevMonth();
                    } else if (hasClass(target, 'pika-next')) {
                        self.nextMonth();
                    }
                }
                if (!hasClass(target, 'pika-select')) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                        return false;
                    }
                } else {
                    self._c = true;
                }
            };

            self._onChange = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (!target) {
                    return;
                }
                if (hasClass(target, 'pika-select-month')) {
                    self.gotoMonth(target.value);
                } else if (hasClass(target, 'pika-select-year')) {
                    self.gotoYear(target.value);
                }
            };

            self._onInputChange = function(e) {
                var date;

                if (e.firedBy === self) {
                    return;
                }
                if (hasMoment) {
                    date = moment(opts.field.value, opts.format);
                    date = (date && date.isValid()) ? date.toDate() : null;
                } else {
                    date = new Date(Date.parse(opts.field.value));
                }
                self.setDate(isDate(date) ? date : null);
                if (!self._v) {
                    self.show();
                }
            };

            self._onInputFocus = function() {
                self.show();
            };

            self._onInputClick = function() {
                self.show();
            };

            self._onInputBlur = function() {
                if (!self._c) {
                    self._b = sto(function() {
                        self.hide();
                    }, 50);
                }
                self._c = false;
            };

            self._onClick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement,
                    pEl = target;
                if (!target) {
                    return;
                }
                if (!hasEventListeners && hasClass(target, 'pika-select')) {
                    if (!target.onchange) {
                        target.setAttribute('onchange', 'return;');
                        addEvent(target, 'change', self._onChange);
                    }
                }
                do {
                    if (hasClass(pEl, 'pika-single')) {
                        return;
                    }
                }
                while ((pEl = pEl.parentNode));
                if (self._v && target !== opts.trigger) {
                    self.hide();
                }
            };

            self.el = document.createElement('div');
            self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '');

            addEvent(self.el, 'mousedown', self._onMouseDown, true);
            addEvent(self.el, 'change', self._onChange);

            if (opts.field) {
                if (opts.container) {
                    opts.container.appendChild(self.el);
                } else if (opts.bound) {
                    document.body.appendChild(self.el);
                } else {
                    opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
                }
                addEvent(opts.field, 'change', self._onInputChange);

                if (!opts.defaultDate) {
                    if (hasMoment && opts.field.value) {
                        opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                    } else {
                        opts.defaultDate = new Date(Date.parse(opts.field.value));
                    }
                    opts.setDefaultDate = true;
                }
            }

            var defDate = opts.defaultDate;

            if (isDate(defDate)) {
                if (opts.setDefaultDate) {
                    self.setDate(defDate, true);
                } else {
                    self.gotoDate(defDate);
                }
            } else {
                self.gotoDate(new Date());
            }

            if (opts.bound) {
                this.hide();
                self.el.className += ' is-bound';
                addEvent(opts.trigger, 'click', self._onInputClick);
                addEvent(opts.trigger, 'focus', self._onInputFocus);
                addEvent(opts.trigger, 'blur', self._onInputBlur);
            } else {
                this.show();
            }
        };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options) {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !! opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.bound = !! (opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                setToStartOfDay(opts.minDate);
                opts.minYear = opts.minDate.getFullYear();
                opts.minMonth = opts.minDate.getMonth();
            }
            if (opts.maxDate) {
                setToStartOfDay(opts.maxDate);
                opts.maxYear = opts.maxDate.getFullYear();
                opts.maxMonth = opts.maxDate.getMonth();
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format) {
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function() {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect) {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function() {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect) {
            if (!date) {
                this._d = null;
                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', {
                    firedBy: this
                });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date) {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
                lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function() {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month) {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function() {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function() {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year) {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value) {
            this._o.minDate = value;
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value) {
            this._o.maxDate = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force) {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '';

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if (opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                var self = this;
                sto(function() {
                    self._o.onDraw.call(self);
                }, 0);
            }
        },

        adjustPosition: function() {
            if (this._o.container) return;
            var field = this._o.trigger,
                pEl = field,
                width = this.el.offsetWidth,
                height = this.el.offsetHeight,
                viewportWidth = window.innerWidth || document.documentElement.clientWidth,
                viewportHeight = window.innerHeight || document.documentElement.clientHeight,
                scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                left, top, clientRect;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top = pEl.offsetTop + pEl.offsetHeight;
                while ((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if (left + width > viewportWidth || (
            this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0)) {
                left = left - width + field.offsetWidth;
            }
            if (top + height > viewportHeight + scrollTop || (
            this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0)) {
                top = top - height - field.offsetHeight;
            }
            this.el.style.cssText = ['position: absolute', 'left: ' + left + 'px', 'top: ' + top + 'px'].join(';');
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month) {
            var opts = this._o,
                now = new Date(),
                days = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data = [],
                row = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var cells = days + before,
                after = cells;
            while (after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++) {
                var day = new Date(year, month, 1 + (i - before)),
                    isDisabled = (opts.minDate && day < opts.minDate) || (opts.maxDate && day > opts.maxDate),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    isEmpty = i < before || i >= (days + before);

                row.push(renderDay(1 + (i - before), month, year, isSelected, isToday, isDisabled, isEmpty));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data);
        },

        isVisible: function() {
            return this._v;
        },

        show: function() {
            if (!this._v) {
                removeClass(this.el, 'is-hidden');
                this._v = true;
                this.draw();
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function() {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.cssText = '';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function() {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;

}));
(function(w) {

    var routes = [];
    var map = {};
    var reference = "routie";
    var oldReference = w[reference];

    var Route = function(path, name) {
        this.name = name;
        this.path = path;
        this.keys = [];
        this.fns = [];
        this.params = {};
        this.regex = pathToRegexp(this.path, this.keys, false, false);

    };

    Route.prototype.addHandler = function(fn) {
        this.fns.push(fn);
    };

    Route.prototype.removeHandler = function(fn) {
        for (var i = 0, c = this.fns.length; i < c; i++) {
            var f = this.fns[i];
            if (fn == f) {
                this.fns.splice(i, 1);
                return;
            }
        }
    };

    Route.prototype.run = function(params) {
        for (var i = 0, c = this.fns.length; i < c; i++) {
            this.fns[i].apply(this, params);
        }
    };

    Route.prototype.match = function(path, params) {
        var m = this.regex.exec(path);

        if (!m) return false;


        for (var i = 1, len = m.length; i < len; ++i) {
            var key = this.keys[i - 1];

            var val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];

            if (key) {
                this.params[key.name] = val;
            }
            params.push(val);
        }

        return true;
    };

    Route.prototype.toURL = function(params) {
        var path = this.path;
        for (var param in params) {
            path = path.replace('/:' + param, '/' + params[param]);
        }
        path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
        if (path.indexOf(':') != -1) {
            throw new Error('missing parameters for url: ' + path);
        }
        return path;
    };

    var pathToRegexp = function(path, keys, sensitive, strict) {
        if (path instanceof RegExp) return path;
        if (path instanceof Array) path = '(' + path.join('|') + ')';
        path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
            keys.push({
                name: key,
                optional: !! optional
            });
            slash = slash || '';
            return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
        }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
        return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    };

    var addHandler = function(path, fn) {
        var s = path.split(' ');
        var name = (s.length == 2) ? s[0] : null;
        path = (s.length == 2) ? s[1] : s[0];

        if (!map[path]) {
            map[path] = new Route(path, name);
            routes.push(map[path]);
        }
        map[path].addHandler(fn);
    };

    var routie = function(path, fn) {
        if (typeof fn == 'function') {
            addHandler(path, fn);
            routie.reload();
        } else if (typeof path == 'object') {
            for (var p in path) {
                addHandler(p, path[p]);
            }
            routie.reload();
        } else if (typeof fn === 'undefined') {
            routie.navigate(path);
        }
    };

    routie.lookup = function(name, obj) {
        for (var i = 0, c = routes.length; i < c; i++) {
            var route = routes[i];
            if (route.name == name) {
                return route.toURL(obj);
            }
        }
    };

    routie.remove = function(path, fn) {
        var route = map[path];
        if (!route) return;
        route.removeHandler(fn);
    };

    routie.removeAll = function() {
        map = {};
        routes = [];
    };

    routie.navigate = function(path, options) {
        options = options || {};
        var silent = options.silent || false;

        if (silent) {
            removeListener();
        }
        setTimeout(function() {
            window.location.hash = path;

            if (silent) {
                setTimeout(function() {
                    addListener();
                }, 1);
            }

        }, 1);
    };

    routie.noConflict = function() {
        w[reference] = oldReference;
        return routie;
    };

    var getHash = function() {
        return window.location.hash.substring(1);
    };

    var checkRoute = function(hash, route) {
        var params = [];
        if (route.match(hash, params)) {
            route.run(params);
            return true;
        }
        return false;
    };

    var hashChanged = routie.reload = function() {
        var hash = getHash();
        for (var i = 0, c = routes.length; i < c; i++) {
            var route = routes[i];
            if (checkRoute(hash, route)) {
                return;
            }
        }
    };

    var addListener = function() {
        if (w.addEventListener) {
            w.addEventListener('hashchange', hashChanged, false);
        } else {
            w.attachEvent('onhashchange', hashChanged);
        }
    };

    var removeListener = function() {
        if (w.removeEventListener) {
            w.removeEventListener('hashchange', hashChanged);
        } else {
            w.detachEvent('onhashchange', hashChanged);
        }
    };
    addListener();

    w[reference] = routie;

})(window);
var event_mention;
var real = new Primus({},  {timeout: 2000, ping: 10000,pong: 5000, strategy: ['online', 'timeout', 'disconnect'],reconnect: {
      maxDelay: 20000 // Number: The max delay for a reconnect retry.
    , minDelay: 500 // Number: The minimum delay before we reconnect.
    , retries: 10 // Number: How many times should we attempt to reconnect.
  }});
real.on('open', function open() {
    // console.log("OPEN"); //check if map is already present or not
    var a = " <a ><i class='icon-circle text-success' ></i> Online</a>"
    document.getElementById("online").innerHTML = a;
     if($(".toastr-id")){
       $(".toastr-id").remove();
        toastr.success("Connected");
   }
});

real.on('offline', function() {
    // console.log('offline');
    var a = " <a ><i class='icon-circle text-success' style='color:#c93330;'></i> Offline</a>"
    document.getElementById("online").innerHTML = a;
    toastr.error("You are offline now. Please check your internet connection");
   if($(".toastr-id")){
       $(".toastr-id").remove();
   }
    var message_tag = "<div role='alert' aria-live='polite' class='toast-top-full-width toastr-id' id='toast-container'><div style='' class='toast toast-error'><button id='toastr-close' role='button' class='toast-close-button'>×</button><div class='toast-message'>You are offline now. Please check your internet connection</div></div></div>";
    $('body').append($(message_tag));

    document.getElementById("toastr-close").onclick = function (){
        $(".toastr-id").remove();
    }
});

real.on('reconnecting', function(){
    // console.log("reconnecting");
    if($(".toastr-id")){
       $(".toastr-id").remove();
   }
    var message_tag = "<div role='alert' aria-live='polite' class='toast-top-full-width toastr-id' id='toast-container'><div style='' class='toast toast-error'><button id='toastr-close' role='button' class='toast-close-button'>×</button><div class='toast-message'>Reconnecting...</div></div></div>";
    $('body').append($(message_tag));

    document.getElementById("toastr-close").onclick = function (){
        $(".toastr-id").remove();
    }
});

real.on('reconnect', function(){
    // console.log("reconnected");
});

real.on('data', function(data) {
    // console.log(data);
    switch (data.action) {
    case "notice":
        realtime.notice(data.data);
        break;
    case "new_project":
        realtime.project_made(data.data);
        $("#createProjForm").fadeOut();
        break;
    case "view_project":
        realtime.view_proj(data.data);
        break;
    case "user_not":
        realtime.user_not(data.data);
        break;
    case "user_task":
        realtime.user_task(data.data);
        break;
    case "new_map":
        realtime.new_map(data);
        break;
    case "open_map":
        realtime.open_map(data);
        break;
    case "get_id":
        call.ini_uid(data.id);
        break;
    case "delete_project":
        realtime.delete_project(data.data);
        break;
    case "add_node":
        realtime.add_node(data);
        break;
    case "edit_node":
        realtime.edit_node(data);
        break;
    case "del_node":
        realtime.del_node(data);
        break;
    case "user_info":
        realtime.user_info(data.data);
        break;
    case "user_projects":
        realtime.user_projects(data.data);
        break;
    case "chat":
        realtime.chat(data);
        break;
    case "get_chat":
        realtime.get_chat(data);
        break;
    case "vote":
        realtime.vote(data);
        break;
    case "get_vote":
        realtime.get_vote(data.data);
        break;
    case "collaborator":
        realtime.collaborator(data.data);
        break;
    case "add_users":
        realtime.add_users(data);
        break;
    case "remove_users":
        realtime.remove_users(data);
        break;
    case "reset_map":
        realtime.reset_map(data);
        toastr.success("You have successfully reseted the map");
        break;
    }
});

call = function() {

    var udetails = {};
    var nodedetails = {};
    var collaborators = {};
    var project = {};
    var email = "";

    function ini_uid(data) {
        udetails["id"] = data;
    }

    function ret_uid() {
        return udetails["id"];
    }

    function ini_project(data) {
        project = data;
    }

    function ch_project(data, action) {
        if (action == "add") {
            if (project.hasOwnProperty('maps')) {
                project.maps[data] = "null";
            } else {
                project["maps"] = {};
                project.maps[data] = "null";
            }
        }
        // console.log(project);
    }

    function ini_collaborators(data, id) {
        collaborators = data;
        // console.log(collaborators);
    }

    function ret_collaborators() {
        return collaborators;
    }

    function return_nodedetails() {
        return nodedetails;
    }

    function initialise_nodedetails(data) {
        nodedetails["pin"] = 0;
        nodedetails.data = {};
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                nodedetails.data[key] = data[key];
                nodedetails.data[key]["visibility"] = 1;
            }
        }
    }

    function change_nodedetails(data, type) {
        if (type == 'pin') {
            nodedetails.pin = data;
        } else if (type == 'hide') {
            var id = data.id;
            nodedetails.data[id].visibility = data.value;
        } else if (type == 'add') {
            var id = data.i_no;
            nodedetails.data[id] = data;
            nodedetails.data[id].visibility = 1;
            nodedetails.data[data.parenti_no].childi_no.push(data.i_no);
        } else if (type == 'edit') {
            var visibility = nodedetails.data[data.i_no].visibility;
            nodedetails.data[data.i_no] = data;
            nodedetails.data[data.i_no].visibility = visibility;
        } else if (type == 'delete') {
            var i;
            for (i = 0; i < data.deleted.length; i++) {
                //      if(nodedetails.data[data[i]].parenti_no)
                delete nodedetails.data[data.deleted[i]];
            }
            if (data) {
                for (i = 0; i < nodedetails.data[data.parenti_no].childi_no.length; i++) {
                    if (nodedetails.data[data.parenti_no].childi_no[i] == data.i_no) break;
                }
            }
            nodedetails.data[data.parenti_no].childi_no.splice(i, 1);
        }
    }
    ////////////////////////////////////////////////////////


    function chat(i_no) {
        var relation  = JSON.parse(localStorage.getItem("uemail"));
        if (!udetails.hasOwnProperty("name")) {
            udetails["name"] = $('#user_name').data().name;
            udetails["gravatar"] = $('#user_gravatar').data().gravatar;
        }
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":";
        if(currentdate.getMinutes()<10){
            datetime = datetime + "0" + currentdate.getMinutes();
        }
        else{
            datetime = datetime + currentdate.getMinutes();
        }
        var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');

        var msg = $("#user_message").val() ;
        var targets = [] ;
        var commasep = "";
        for (var key in relation) {
            if (relation.hasOwnProperty(key)) {
                if(msg.search(key)>=0){
                    targets.push(relation[key]);
                    commasep += relation[key] +",";
                }
            }
        }

        if ($("#user_message").val().length) {
            var chat = {
                username: udetails.name,
                msg: $("#user_message").val(),
                gravatar: udetails.gravatar,
                time: datetime
            };
            // console.log(chat);
            $("#user_message").val('');
            real.write({
                action: "chat",
                scope: {
                    pid: id[0],
                    m_n: id[1]
                },
                data: {
                    chat: chat,
                    pid: id[0],
                    m_n: id[1],
                    i_no: i_no
                },
                mention : {
                        targets : commasep,
                        email : collaborators[call.ret_uid()]["email"],
                        nid : i_no 
                    }
            });
        }
    }
    //////////////////////////////////////////////////////
    /*Creation of a new Map */

    function cr_map() {
        var title = document.getElementById("modal_title");
        title.innerHTML = "Create a new Map";


        var body = document.getElementById("modal_body");
        var a = "<div class='form-group'><label for='title' class='col-sm-2 control-label'>Name</label>" + "<div class='col-sm-10' style='margin-left:5px;'><input required  type='text' class='form-control' id='map_name' placeholder='Map Name'></div>" + "</div>" + "<div class='form-group'><div class='col-sm-offset-2 col-sm-10'>" + "<button  class='btn btn-success' onclick = 'call.newMap()'>Submit</button>" + "<button  class='btn btn-primary' style = 'margin-left: 10px;' onclick = 'call.closeModal()'>Cancel</button></div>" + "</div>";
        body.innerHTML = a;

        $("#modal_form").bPopup();
    }

    function newMap() {
        if ($("#map_name").val() == "") {
            toastr.error("Please provide a map name");

        } else if ($("#map_name").val() != "") {
            real.write({
                action: "new_map",
                scope: {
                    pid: window.location.hash.substring(1).split('/')[1]
                },
                data: {
                    m_n: $("#map_name").val(),
                    pid: window.location.hash.substring(1).split('/')[1]
                }
            });
            $("#map_name").val('');
        }
    } /*end of calling real.write for a new map*/
    //////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /*To edit project details inside the viw project page i.e. when you are viewing maps*/

    function add_collab() {
        var a = "<div><h2 style='margin-top: 10px;font-size:22px;color:#55518a;text-align:center;'>Email id of new collaborators.</h2>"+
                        "<span style='text-align:center;font-size:16px;'>Users need to be member of jutja prior to the addition</span>"+
                        "<div class='form-horizontal' style='font-size: 20px;margin-top: 30px;'>"+
                            "<div class='form-group'><label for='title' class='col-sm-2 control-label' style='font-size:17px;'>Owner</label>"+
                                "<div class='col-sm-10' style='margin-left:5px;'>"+
                                 "<input type='text' id='add_owner' class='demo-default' placeholder='Add Email'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'><label for='title' class='col-sm-2 control-label' style='font-size:17px;'>Editor</label>"+
                                "<div class='col-sm-10' style='margin-left:5px;'>"+
                                "<input type='text' id='add_editor' class='demo-default' placeholder='Add Email'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'><label for='title' class='col-sm-2 control-label' style='font-size:17px;'>Viewer</label>"+
                                "<div class='col-sm-10' style='margin-left:5px;'>"+
                                 "<input type='text' id='add_viewer' class='demo-default' placeholder='Add Email'>"+
                               "</div>"+
                            "</div>"+
                            "<div class='form-group'><div class='col-sm-offset-2 col-sm-10'>"+
                                "<button  class='btn btn-success' onclick='call.submit_addCollab()'>Submit</button>"+
                                "<button  class='btn btn-primary' style = 'margin-left: 10px;' onclick = 'call.closecollab()'>Cancel</button></div>"+
                            "</div></div>";
        document.getElementById("add_collab").innerHTML = a;
        $('#add_owner').selectize({
                    persist: false,
                    createOnBlur: true,
                    valueField: 'email',
                    labelField: 'email',
                    create: function (input) {
                        if (re.test(input)) {
                            return {email: input};
                        }
                        else{
                            toastr.error("Please type a valid email address");
                            return false;
                        }
                    }
                });
                $('#add_editor').selectize({
                    persist: false,
                    createOnBlur: true,
                    valueField: 'email',
                    labelField: 'email',
                    create: function (input) {
                        if (re.test(input)) {
                            return {email: input};
                        }
                        else{
                            toastr.error("Please type a valid email address");
                            return false;
                        }
                    }
                });
                $('#add_viewer').selectize({
                    persist: false,
                    createOnBlur: true,
                    valueField: 'email',
                    labelField: 'email',
                    create: function (input) {
                        if (re.test(input)) {
                            return {email: input};
                        }
                        else{
                            toastr.error("Please type a valid email address");
                            return false;
                        }
                    }
                });
        $("#add_collab").bPopup();
    }

    function submit_addCollab() {
       
        var st_owner = $("#add_owner").val().trim();
        var st_editor = $("#add_editor").val().trim();
        var st_viewer = $("#add_viewer").val().trim();
        var members = {};
        var i;
        if (st_owner.length) {
            var owner = st_owner.split(',');
            for (i = 0; i < owner.length; i++) {
                members[owner[i]] = "owner";
            }
        }
        if (st_editor.length) {
            var editor = st_editor.split(',');
            for (i = 0; i < editor.length; i++) {
                members[editor[i]] = "editor";
            }
        }
        if (st_viewer.length) {
            var viewer = st_viewer.split(',');
            for (i = 0; i < viewer.length; i++) {
                members[viewer[i]] = "viewer";
            }
        }
        if (owner || editor || viewer) {
            real.write({
                action: "add_users",
                data: {
                    pid: window.location.hash.substring(1).split('/')[1],
                    users: members,
                    addedby : collaborators[call.ret_uid()].email
                }
            });
    //        $("#add_collab").bPopup().close();
        } else {
            toastr.error("Add some collaborators");
        }
        $("#add_collab").bPopup().close();
    }

    function del_collab() {

        var owner = [];
        var editor = [];
        var viewer = [];
        var a = "";
        var i;
        var collab_list = collaborators;
        var uid = call.ret_uid();
        for (var key in collab_list) {
            if (collab_list.hasOwnProperty(key) && key!=uid) {
                if (collab_list[key].status == "owner") owner.push(collab_list[key].email);
                else if (collab_list[key].status == "editor") editor.push(collab_list[key].email);
                else if (collab_list[key].status == "viewer") viewer.push(collab_list[key].email);
            }
        }
        if (owner.length + viewer.length + editor.length) {
            var title = document.getElementById("modal_title");
            title.innerHTML = "Delete Collaborators";

            var body = document.getElementById("modal_body");
            if (owner.length) {
                a = a + "<div class='form-group' style='text-align:center;'>Owner</div><ul class='list-group'>";
                for (i = 0; i < owner.length; i++) {
                    a = a + "<li id='" + owner[i] + "'class='list-group-item' style='font-size:13px'><a class='remove-users' onclick='call.delete_user(\"" + owner[i] + "\",\"owner\")'><span style='float:right;'>x</span></a>" + owner[i] + "</li>";
                }
                a = a + "</ul></div>";
            }
            if (editor.length) {
                a = a + "<div class='form-group' style='text-align:center;'>Editor</div><ul class='list-group'>";
                for (i = 0; i < editor.length; i++) {
                    a = a + "<li id='" + editor[i] + "'class='list-group-item' style='font-size:13px'><a class='remove-users' onclick='call.delete_user(\"" + editor[i] + "\",\"editor\")'><span style='float:right;'>x</span></a>" + editor[i] + "</li>";
                }
                a = a + "</ul></div>";
            }
            if (viewer.length) {
                a = a + "<div class='form-group' style='text-align:center;'>Viewer</div><ul class='list-group'>";
                for (i = 0; i < viewer.length; i++) {
                    a = a + "<li id='" + viewer[i] + "'class='list-group-item' style='font-size:13px'><a class='remove-users' onclick='call.delete_user(\"" + viewer[i] + "\",\"viewer\")'><span style='float:right;'>x</span></a>" + viewer[i] + "</li>";
                }
                a = a + "</ul></div>";
            }
            body.innerHTML = a;
            $("#modal_form").bPopup();
        } else {
            toastr.error("Currently there are no collaborators in this project");
        }
    }

    function delete_user(user, right) {
        var users = {};
        users[user] = right;
        // console.log()
        real.write({
            action: "remove_users",
            data: {
                pid: window.location.hash.substring(1).split('/')[1],
                users: users,
                delby: collaborators[call.ret_uid()].email
            }
        });
    }

    function new_projModal() {
        var i;
        var tags = document.getElementsByClassName("bootstrap-tagsinput");
        for (i = 0; i < tags.length; i++) {
            tags[i].childNodes[0].size = "30";
        }
        var a  = "<div><h2 style='margin-top: 10px;color:#55518a;text-align:center;'>New Project</h2>"+
                        "<div class='form-group'>"+
                            "<label for='title' class='col-sm-2 control-label' style='font-size:18px;'>Title</label>"+
                            "<div class='col-sm-10' style='margin-left:5px;'>"+
                            "<input type='text' class='form-control' id='p_name' placeholder='Name of Project'>"+
                            "</div>"+
                        "</div>"+
                        "<div class='form-group' style='margin-top:50px'>"+
                            "<label for='title' class='col-sm-2 control-label' style='font-size:18px;'>Info</label>"+
                            "<div class='col-sm-10' style='margin-left:5px;'>"+
                                "<textarea class='form-control' id='project_desc' rows='3'> </textarea>"+
                            "</div>"+
                        "</div>"+
                        "<div class='form-group'>"+
                            "<label for='title' class='col-sm-10 control-label' style='width: 90%; font-size: 18px; margin-top: 20px;margin-bottom: 12px;'>Email-ids of collaborators. Users need to be members of jutja prior to the addition.</label>"+
                            "<div class='form-group'>"+
                                "<label for='title' id='cr_owner' class='col-sm-2 control-label' style='font-size:17px;'>Owner</label>"+
                                "<div class='col-sm-10' style='margin-left:5px;'>"+
                                    "<input type='text' id='member_owner' class='demo-default' placeholder='Add Email'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                                "<label for='title' id='cr_editor' class='col-sm-2 control-label' style='font-size:17px;'>Editor</label>"+
                                "<div class='col-sm-10' style='margin-left:5px;'>"+
                                    "<input type='text'  id='member_editor' class='demo-default' placeholder='Add Email'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                                "<label for='title' id='cr_viewer' class='col-sm-2 control-label' style='font-size:17px;'>Viewer</label>"+
                                "<div class='col-sm-10' style='margin-left:5px;'>"+
                                    "<input type='text' id='member_viewer' class='demo-default' placeholder='Add Email'>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                            "<div class='form-group'><div class='col-sm-offset-2 col-sm-10'>"+
                                "<button  class='btn btn-success' id='create_submitproj' style='margin-left: 10%;' onclick='call.submit_newProj()'>Submit</button>"+
                                "<button  class='btn btn-primary' style = 'margin-left: 10%;' onclick = 'call.close_newProj()'>Cancel</button></div>"+
                            "</div></div>";
        document.getElementById("createProjForm").innerHTML = a;
        $('#member_owner').selectize({
                    persist: false,
                    createOnBlur: true,
                    valueField: 'email',
                    labelField: 'email',
                    create: function (input) {
                        if (re.test(input)) {
                            return {email: input};
                        }
                        else{
                            toastr.error("Please type a valid email address");
                            return false;
                        }
                    }
                });
                $('#member_editor').selectize({
                    persist: false,
                    createOnBlur: true,
                    valueField: 'email',
                    labelField: 'email',
                    create: function (input) {
                        if (re.test(input)) {
                            return {email: input};
                        }
                        else{
                            toastr.error("Please type a valid email address");
                            return false;
                        }
                    }
                });
                $('#member_viewer').selectize({
                    persist: false,
                    createOnBlur: true,
                    valueField: 'email',
                    labelField: 'email',
                    create: function (input) {
                        if (re.test(input)) {
                            return {email: input};
                        }
                        else{
                            toastr.error("Please type a valid email address");
                            return false;
                        }
                    }
                });
        $("#createProjForm").bPopup();
        $("#p_name").val('');
        $("#project_desc").val('');
        $("#member_owner").val('');
        $("#member_editor").val('');
        $("#member_viewer").val('');
    }
    //details of a particular project


    function prDetail() {
        var link = window.location.hash.substring(1);
        var owner = [];
        var editor = [];
        var viewer = [];
        var a = "";
        var i;
        for (var key in collaborators) {
            if (collaborators.hasOwnProperty(key)) {
                if (collaborators[key].status == "owner") owner.push(collaborators[key].email);
                else if (collaborators[key].status == "editor") editor.push(collaborators[key].email);
                else if (collaborators[key].status == "viewer") viewer.push(collaborators[key].email);
            }
        }
        if (project.description == "") project.description = "Not provided";
        var title = document.getElementById("right-title");
        title.innerHTML = "Info";
        var addr = document.getElementById("right-address");
        addr.innerHTML = '<li> <a href="#"><i class="icon-project"></i>Projects</a></li><li> <a style="cursor:pointer" onclick="call.viewProject(\'' + link + '\')">Maps</a></li><li class="active">Info</li>';
        var side = document.getElementById("left_sidebar");
        side.innerHTML = "";
        var bar = "<li class='active'><a class='item_l'><i class='icon-info_project'></i> <span>Info</span></a></li>" + "<li><a class='item_l' onclick='call.viewProject(\"" + link + "\")'><i class='icon-project'></i> <span>" + project.name + "</span></a></li>" + "<li ><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Your Profile</span></a></li>";
        side.innerHTML = bar;

        var mydiv = document.getElementById("tile");
        mydiv.innerHTML = "";
        mydiv.className = "";
        var body ="<div class='row hover-tab' style='margin-top:15px;margin-left: 10%;margin-right: 10%;'><div class='col-xs-3' style='font-size: 22px;color: #545559;padding-left: 6%;'>Project</div><div class='col-xs-7' style=' text-align:center;font-size: 22px;'>" + project.name + "</div></div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.6;'>" + "<div class='row hover-tab' style='margin-top:15px;margin-left:10%;margin-right: 10%;'><div class='col-xs-3' style='font-size:20px;padding-left: 6%;color:#545559;'>Description</div><div class='col-xs-7' style='text-align:center;font-size: 22px;'>" + project.description + "</div></div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.6;'>" + "<div class='row hover-tab' style='margin-top:15px;margin-left:10%;margin-right: 10%;'><div class='col-xs-3' style='font-size:20px;padding-left: 6%;color: #545559;'>Collaborators</div></div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.3;'>" + "<div class='row hover-tab' style='margin-top:10px;margin-left: 12%;margin-right: 12%;'><div class='col-xs-3' style='font-size:19px;padding-left: 6%;color: gray;'><i class='icon-circle' style='color: gray; margin-right: 4%;font-size: 10px;'></i>Owner</div>";
        if (owner.length) {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>" + owner[0];
            for (i = 1; i < owner.length; i++) {
                body = body + "<br>" + owner[i];
            }
            body = body + "</div>";
        } else {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
        }
        body = body + "</div><hr style='margin-left: 15%;margin-right: 15%;opacity:0.3;'>";
        body = body + "<div class='row hover-tab' style='margin-top:10px;margin-left: 12%;margin-right:12%'><div class='col-xs-3' style='font-size:19px;padding-left: 6%;color: gray;'><i class='icon-circle' style='color: gray; margin-right: 4%;font-size: 10px;'></i>Editor</div>";

        if (editor.length) {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>" + editor[0];
            for (i = 1; i < editor.length; i++) {
                body = body + "<br>" + editor[i];
            }
            body = body + "</div>";
        } else {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
        }
        body = body + "</div><hr style='margin-left: 15%;margin-right: 15%;opacity:0.3;'>";
        body = body + "<div class='row hover-tab' style='margin-top:10px;margin-left: 12%;margin-right:12%'><div class='col-xs-3' style='font-size:19px;padding-left: 6%;color: gray;'><i class='icon-circle' style='color: gray; margin-right: 4%;font-size: 10px;'></i>Viewer</div>";

        if (viewer.length) {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>" + viewer[0];
            for (i = 1; i < viewer.length; i++) {
                body = body + "<br>" + viewer[i];
            }
            body = body + "</div>";
        } else {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
        }
        body = body + "</div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.6;'>";
        body = body + "<div class='row hover-tab' style='margin-top:15px;margin-left:10%;margin-right: 10%;'><div class='col-xs-3' style='font-size:20px;padding-left: 6%;color:#545559;'>Maps</div>";

        if (project.hasOwnProperty('maps')) {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>";
            for (var key in project.maps) {
                if (project.maps.hasOwnProperty(key)) {
                    body = body + key + "<br>";
                }
            }
            body = body + "</div>";
        } else {
            body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
        }
        body = body + "</div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.8;'>";
        mydiv.innerHTML = body;

    }

    function analyseProject() {
        var link = window.location.hash.substring(1);
        var title = document.getElementById("right-title");
        title.innerHTML = "Analytics";
        var addr = document.getElementById("right-address");
        addr.innerHTML ='<li> <a href="#"><i class="icon-project"></i>Projects</a></li><li> <a style="cursor:pointer" onclick="call.viewProject(\'' + link + '\')">Maps</a></li><li class="active">Analystics</li>';
        var side = document.getElementById("left_sidebar");
        side.innerHTML = "";
        var bar = "<li class='active'><a class='item_l'><i class='icon-analytics'></i> <span>Analytics</span></a></li>" + "<li><a class='item_l' onclick='call.viewProject(\"" + link + "\")'><i class='icon-project'></i> <span>" + project.name + "</span></a></li>"  + "<li ><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Your Profile</span></a></li>";
        side.innerHTML = bar;

        var mydiv = document.getElementById("tile");
        mydiv.innerHTML = "";
        mydiv.className = "";

        var analytics = {};
        var analytics_date = {};
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        today = Date.parse(today);
        if (project.hasOwnProperty('maps')) {
            for (var key in project.maps) {
                if (project.maps.hasOwnProperty(key)) {
                    analytics[key] = {
                        Completed: [],
                        Incomplete: [],
                        Ongoing: [],
                        Not_Started: [],
                        Not_Set: []
                    };
                    analytics_date[key] = {
                        Today: [],
                        Tomorrow: [],
                        Week: [],
                        Later: [],
                        Gone: [],
                        Not_Set: []
                    };
                    var map = project.maps[key];
                    delete map.length;
                    for (var task in map) {
                        if (map.hasOwnProperty(task)) {
                            // console.log(map[task]);
                            var status = map[task].status;

                            if (status.split(" ").length == 2) status = status.split(" ")[0] + "_" + status.split(" ")[1];
                            if (analytics[key].hasOwnProperty(status)) analytics[key][status].push(task);

                            var due_date = map[task].due_date;
                            due_date = Date.parse(due_date);
                            if (isNaN(due_date)) analytics_date[key]["Not_Set"].push(task);
                            else {
                                // console.log(due_date - today);
                                if (due_date - today < 0) {
                                    analytics_date[key]["Gone"].push(task);
                                } else {
                                    if (due_date - today == 0) {
                                        analytics_date[key]["Today"].push(task);
                                    }
                                    if (due_date - today == 86400000) {
                                        analytics_date[key]["Tomorrow"].push(task);
                                    }
                                    if (due_date - today <= 518400000) {
                                        analytics_date[key]["Week"].push(task);
                                    }
                                    if (due_date - today > 518400000) {
                                        analytics_date[key]["Later"].push(task);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // console.log(analytics);
        // console.log(analytics_date);
        var project_status = {
            Completed: 0,
            Incomplete: 0,
            Ongoing: 0,
            Not_Started: 0,
            Not_Set: 0
        };
        for (var key in analytics) {
            if (analytics.hasOwnProperty(key)) {
                project_status.Completed = project_status.Completed + analytics[key].Completed.length;
                project_status.Incomplete = project_status.Incomplete + analytics[key].Incomplete.length;
                project_status.Ongoing = project_status.Ongoing + analytics[key].Ongoing.length;
                project_status.Not_Started = project_status.Not_Started + analytics[key].Not_Started.length;
                project_status.Not_Set = project_status.Not_Set + analytics[key].Not_Set.length;
            }
        }
        if (project_status["Completed"] + project_status["Incomplete"] + project_status["Ongoing"] + project_status["Not_Set"] + project_status["Not_Started"] == 0) {
            toastr.error("No tasks in this project to show analytics");
            call.viewProject(link);
        } else {
            var doughnutData_status = [{
                value: project_status.Completed,
                color: "#26A65B",
                highlight: "#2ECC71",
                label: "Completed"
            }, {
                value: project_status.Incomplete,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Incomplete"
            }, {
                value: project_status.Ongoing,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Ongoing"
            }, {
                value: project_status.Not_Started,
                color: "#1E8BC3",
                highlight: "#219ddd",
                label: "Not Started"
            }, {
                value: project_status.Not_Set,
                color: "#8E44AD",
                highlight: "#9B59B6",
                label: "Not Set"
            }

            ];

            var body = "<div class='row' style='margin-top:15px;'><div class='col-xs-6 responsive-small'><div class='analyse_head'>Status of Tasks</div><br><div id='canvas-holder' style='width:60%;'><canvas id='chart-area' width='500' height='500'/></div></div>";

            var project_date = {
                Not_Set: 0,
                Today: 0,
                Tomorrow: 0,
                Week: 0,
                Later: 0,
                Gone: 0
            };
            for (var key in analytics_date) {
                if (analytics_date.hasOwnProperty(key)) {
                    project_date.Not_Set = project_date.Not_Set + analytics_date[key].Not_Set.length;
                    project_date.Today = project_date.Today + analytics_date[key].Today.length;
                    project_date.Tomorrow = project_date.Tomorrow + analytics_date[key].Tomorrow.length;
                    project_date.Week = project_date.Week + analytics_date[key].Week.length;
                    project_date.Later = project_date.Later + analytics_date[key].Later.length;
                    project_date.Gone = project_date.Gone + analytics_date[key].Gone.length;
                }
            }
            // console.log(project_date);

            var doughnutData_date = [{
                value: project_date.Not_Set,
                color: "#8E44AD",
                highlight: "#9B59B6",
                label: "Not set"
            }, {
                value: project_date.Today,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Today"
            }, {
                value: project_date.Tomorrow,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Tomorrow"
            }, {
                value: project_date.Week,
                color: "#26A65B",
                highlight: "#2ECC71",
                label: "This Week"
            }, {
                value: project_date.Later,
                color: "#1E8BC3",
                highlight: "#219ddd",
                label: "After this week"
            }, {
                value: project_date.Gone,
                color: "#336E7B",
                highlight: "#4494a5",
                label: "Gone"
            }

            ];
            body = body + "<div class='col-xs-6 responsive-small' ><div class='analyse_head'>Due Date of Tasks</div><br><div id='canvas-date' style='width:60%;'><canvas id='chart-date' width='500' height='500'/></div></div></div>"
            mydiv.innerHTML = body;
            var ctx_status = document.getElementById("chart-area").getContext("2d");
          var moduleDoughnut_status = new Chart(ctx_status).Doughnut(doughnutData_status, {
                responsive: true
            });

           var helpers = Chart.helpers;
            var legendHolder = document.createElement('div');
            legendHolder.innerHTML = moduleDoughnut_status.generateLegend();
            // Include a html legend template after the module doughnut itself
            helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index) {
                helpers.addEvent(legendNode, 'mouseover', function() {
                    var activeSegment = moduleDoughnut_status.segments[index];
                    activeSegment.save();
                    activeSegment.fillColor = activeSegment.highlightColor;
                    moduleDoughnut_status.showTooltip([activeSegment]);
                    activeSegment.restore();
                });
            });
            helpers.addEvent(legendHolder.firstChild, 'mouseout', function() {
                moduleDoughnut_status.draw();
            });

            document.getElementById("chart-area").parentNode.parentNode.appendChild(legendHolder.firstChild);

           var ctx_date = document.getElementById("chart-date").getContext("2d");
            var moduleDoughnut_date = new Chart(ctx_date).Doughnut(doughnutData_date, {
                responsive: true
            });

            var helpers = Chart.helpers;
            var legendHolder = document.createElement('div');
            legendHolder.innerHTML = moduleDoughnut_date.generateLegend();
            // Include a html legend template after the module doughnut itself
            helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index) {
                helpers.addEvent(legendNode, 'mouseover', function() {
                    var activeSegment = moduleDoughnut_date.segments[index];
                    activeSegment.save();
                    activeSegment.fillColor = activeSegment.highlightColor;
                    moduleDoughnut_date.showTooltip([activeSegment]);
                    activeSegment.restore();
                });
            });
            helpers.addEvent(legendHolder.firstChild, 'mouseout', function() {
                moduleDoughnut_date.draw();
            });
            document.getElementById("chart-date").parentNode.parentNode.appendChild(legendHolder.firstChild);
        
        }
    }

    function viewProject(link) {
        window.location.hash = "";
        routie(link);
    }
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    /*To delete a project from view_project*/
    //Here first function pops up the modal in order to confirm and second one deletes it


    function delPrModal() {
        var title = document.getElementById("modal_title");
        title.innerHTML = "Delete Project ";

        var body = document.getElementById("modal_body");
        var a = "<div class='form-group' style='text-align:center;'>Do you want to delete this project?</div>" + "<div class='form-group'><div class='col-sm-offset-2 col-sm-10'>" + "<button  class='btn btn-danger' onclick = 'call.delProject()'>Delete</button>" + "<button  class='btn btn-primary' style = 'margin-left: 10px;' onclick = 'call.closeModal()'>Cancel</button></div>" + "</div>"
        body.innerHTML = a;
        $("#modal_form").bPopup();
    }

    function delProject() {
        real.write({
            action: "delete_project",
            data: {
                pid: window.location.hash.substring(1).split('/')[1]
            }
        });
        $('#modal_form').bPopup().close();
    } /*----*/
    /////////////////////////////////////////////////////////////////


    function closeModal() {
        $('#modal_form').bPopup().close();
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////

    function genModal(node) {
        if( document.querySelector('#reset').dataset.reset != "on"){
            $("#change_node").bPopup();

            document.getElementById("change_node").setAttribute("data-id", node.i_no);

            var id = window.location.hash.substring(1).split('/')[1];
            id = id.split('_');

            var paras = document.getElementsByClassName('chatitems');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }
            real.write({
                action: "get_vote",
                data: {
                    i_no: node.i_no,
                    m_n: id[1],
                    pid: id[0]
                },
                scope: {
                    pid: id[0],
                    m_n: id[1]
                }
            });
            real.write({
                action: "get_chat",
                scope: {
                    pid: id[0],
                    m_n: id[1]
                },
                data: {
                    i_no: node.i_no,
                    m_n: id[1],
                    pid: id[0]
                }
            });
            //Displaying info of node
            document.getElementById("info_title").innerHTML = node.name;
            document.getElementById("info_info").innerHTML = node.info;
            document.getElementById("info_date").innerHTML = node.due_date;
            document.getElementById("info_status").innerHTML = node.status;
            var uid = call.ret_uid();
            if (node.assign) {
                if (node.assign == collaborators[uid].email) document.getElementById("info_assign").innerHTML = "Myself";
                else
                document.getElementById("info_assign").innerHTML = node.assign;
            } else {
                document.getElementById("info_assign").innerHTML = "None";
            }
            // console.log(nodedetails.data[node.i_no]);
            if (nodedetails.data[node.i_no].visibility == 1) {
                document.getElementById("node_hide").innerHTML = "Hide";
            } else {
                document.getElementById("node_hide").innerHTML = "Unhide";
            }
            document.getElementById('create_assign').options.length = 0;
            var assignment = ["None", "Myself"];
            var i = 0;
            $('#create_title').val('');
            $('#create_info').val('');
            $('#cr_date_picker').val('');
            for (i = 0; i < 2; i++) {
                var option = document.createElement("option");
                option.text = assignment[i];
                option.value = assignment[i];
                var select = document.getElementById("create_assign");
                select.appendChild(option);
            }
            for (var key in collaborators) {
                if (collaborators.hasOwnProperty(key) && uid != key) {
                    var option = document.createElement("option");
                    option.text = collaborators[key].email;
                    option.value = collaborators[key].email;
                    var select = document.getElementById("create_assign");
                    select.appendChild(option);
                }
            }
            document.getElementById('edit_assign').options.length = 0;
            $('#edit_title').val(node.name);
            $('#edit_info').val(node.info);
            $('#ed_date_picker').val(node.due_date);
            var mySelect = document.getElementById('edit_dropdown');

            for (var i, j = 0; i = mySelect.options[j]; j++) {
                if (i.value == node.status) {
                    mySelect.selectedIndex = j;
                    break;
                }
            }

            for (i = 0; i < 2; i++) {
                var option = document.createElement("option");
                option.text = assignment[i];
                option.value = assignment[i];
                var select = document.getElementById("edit_assign");
                select.appendChild(option);
            }
            for (var key in collaborators) {
                if (collaborators.hasOwnProperty(key) && uid != key) {
                    var option = document.createElement("option");
                    option.text = collaborators[key].email;
                    option.value = collaborators[key].email;
                    var select = document.getElementById("edit_assign");
                    select.appendChild(option);
                }
            }
            var mySelect = document.getElementById('edit_assign');
            // console.log(collaborators);
            // console.log(uid);
            // console.log(collaborators[uid].email);
            var assign;
            if (node.assign == collaborators[uid].email) assign = "Myself";
            else
            assign = node.assign;

            for (var i, j = 0; i = mySelect.options[j]; j++) {
                if (i.value == assign) {
                    mySelect.selectedIndex = j;
                    break;
                }
            }

            document.getElementById("cr_submit").onclick = function() {
                call.add_node(node);
            }
            document.getElementById("ed_submit").onclick = function() {
                call.edit_node(node);
            }
            document.getElementById("task_delete").onclick = function() {
                var del = []; var root = 0 ;
                 if(node.i_no!=10000){
                    del.push(node.i_no);
                    call.del_node(node.i_no, del);
                    call.choose_parent(0,-1);
                    real.write({
                    action: "del_node",
                    scope: {
                        pid: id[0],
                        m_n: id[1]
                    },
                    data: {
                        pid: id[0],
                        m_n: id[1],
                        deleted: del,
                        i_no: node.i_no,
                        parenti_no: node.parenti_no                }
                });
                }
                else{
                    toastr.error("You are not allowed to delete the root");
                }
                

                
            }
            document.getElementById("task_cancel").onclick = function() {
                $("#change_node").bPopup().close();
            }
            document.getElementById("send_message").onclick = function() {
                call.chat(node.i_no);
            }
            var list_collab = collaborators ; 
            //uses message mention
            var users = [];
            var relation = {}; 
            for (var key in list_collab) {
                if (key!=call.ret_uid() && list_collab.hasOwnProperty(key) ) {
                    users.push({"username" : list_collab[key].email.split('@')[0] ,"email" : list_collab[key].email});
                    relation["@"+list_collab[key].email.split('@')[0]] = list_collab[key].email ;
                }
            }
            localStorage.setItem("uemail", JSON.stringify(relation));
            // console.log(users);

            $("#user_message").mention({users:users});
            document.getElementById("user_message").onkeypress = function(e){
                if(e.keyCode == 13){
                    call.chat(node.i_no);
                }
            }
            document.getElementById("node_like").onclick = function() {
                real.write({
                    action: "vote",
                    scope: {
                        pid: id[0],
                        m_n: id[1]
                    },
                    data: {
                        pid: id[0],
                        m_n: id[1],
                        i_no: node.i_no,
                        name: $('#user_name').data().name,
                        vote: 1
                    }
                });
            }
            document.getElementById("node_dislike").onclick = function() {
                real.write({
                    action: "vote",
                    scope: {
                        pid: id[0],
                        m_n: id[1]
                    },
                    data: {
                        pid: id[0],
                        m_n: id[1],
                        i_no: node.i_no,
                        name: $('#user_name').data().name,
                        vote: 0
                    }
                });
            }

            document.getElementById("node_hide").onclick = function() {
                var visibility = nodedetails.data[node.i_no].visibility;
                // console.log(visibility);
                if (visibility) {
                    var data = {
                        id: node.i_no,
                        value: 0
                    }
                    call.hideNode(node.i_no);
                    call.change_nodedetails(data, "hide");
                } else {
                    var linkid = [];
                    call.unhideNode(node.i_no, linkid);
                    var data = {
                        id: node.i_no,
                        value: 1
                    }
                    // console.log(linkid);
                    for (var i = 0; i < linkid.length; i++) {
                        graph.addLink(nodedetails.data[linkid[i]].parenti_no, linkid[i]);
                    }
                    call.change_nodedetails(data, "hide");
                }
                $("#change_node").bPopup().close();
            }
        }
    }

    function add_node(node) {
        var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');
        var date = document.getElementById("cr_date_picker").value;
        var dropdown = document.getElementById("create_dropdown");
        var status = dropdown.options[dropdown.selectedIndex].value;

        var assign_dropdown = document.getElementById("create_assign");
        var assign = assign_dropdown.options[assign_dropdown.selectedIndex].value;
        if (assign == "Myself") assign = collaborators[call.ret_uid()].email;
        if ($('#create_title').val().length == 0) {
            toastr.error("Please give a title to new task");
        } else if ($('#create_info').val().length == 0) {
            toastr.error("Please give info to new task");
        } else if (date.length == 0) {
            toastr.error("Please select deadline for the task");
        } else {
            real.write({
                action: "add_node",
                scope: {
                    pid: id[0],
                    m_n: id[1]
                },
                data: {
                    pid: id[0],
                    m_n: id[1],
                    name: $('#create_title').val(),
                    info: $('#create_info').val(),
                    parenti_no: node.i_no,
                    due_date: date,
                    status: status,
                    assign: assign
                }
            });
        }
    }

    function edit_node(node) {
        var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');
        var date = document.getElementById("ed_date_picker").value;
        var dropdown = document.getElementById("edit_dropdown");
        var status = dropdown.options[dropdown.selectedIndex].value;

        var assign_dropdown = document.getElementById("edit_assign");
        var assign = assign_dropdown.options[assign_dropdown.selectedIndex].value;
        if (assign == "Myself") assign = collaborators[call.ret_uid()].email;
        if ($('#edit_title').val().length == 0) {
            toastr.error("Please give a title to task");
        } else if ($('#edit_info').val().length == 0) {
            toastr.error("Please give info to task");
        } else if (date.length == 0) {
            toastr.error("Please select deadline for the task");
        } else {
            real.write({
                action: "edit_node",
                scope: {
                    pid: id[0],
                    m_n: id[1]
                },
                data: {
                    pid: id[0],
                    m_n: id[1],
                    i_no: node.i_no,
                    name: $('#edit_title').val(),
                    info: $('#edit_info').val(),
                    due_date: date,
                    status: status,
                    assign: assign
                }
            });
        }
    }

    function del_node(id, del) {
        if (nodedetails.data[id]) {
            for (var i = 0; i < nodedetails.data[id].childi_no.length; i++) {
                del.push(nodedetails.data[id].childi_no[i]);
                call.del_node(nodedetails.data[id].childi_no[i], del);
            }
        }
    }

    function hideNode(id) {
        if (nodedetails.data[id]) {
            for (var i = 0; i < nodedetails.data[id].childi_no.length; i++) {
                call.hideNode(nodedetails.data[id].childi_no[i]);
                graph.removeNode(nodedetails.data[id].childi_no[i]);
            }
        }
    }

    function unhideNode(id, linkid) {
        if (nodedetails.data[id]) {
            for (var i = 0; i < nodedetails.data[id].childi_no.length; i++) {
                call.unhideNode(nodedetails.data[id].childi_no[i], linkid);
                var nodeid = nodedetails.data[id].childi_no[i];
                var data = nodedetails.data[nodeid];
                delete data.visibility;
                graph.addNode(nodeid, data);
                linkid.push(nodeid);
            }
        }
    }
    //////////////////////////////////////////////////////////


    function modal_upassword() {
        $("#new_password").fadeIn();
        document.getElementById("update_password").onclick = function() {
            // console.log("Update password");
            if ($("#profile_repassword").val().length > 6) {
                function success(data) {
                    // console.log(data);
                }
                // console.log("up Password");
                var url = "/change-password";
                var url_data = {
                    p: $("#profile_repassword").val()
                };
                $.ajax({
                    type: "POST",
                    url: url,
                    data: url_data,
                    success: success
                });
                $("#new_password").fadeOut();
            } else {
                $("#profile_repassword").val('');
                toastr.error("Please type a password of minimum 6 characters");
            }
        }
        document.getElementById("pro_passcancel").onclick = function() {
            $("#new_password").fadeOut();
        }
    }

    function modal_ugravitar() {
        $("#gravatar_id").fadeIn();
        document.getElementById("update_gravatar").onclick = function() {
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var gid = $("#gravatar_mail").val();
            if (emailRegExp.test(gid)) {
                // console.log("Update gravitar");

                function success(data) {
                    // console.log(data);
                }
                // console.log("up gravatar");
                var url = "/gravatar";
                var url_data = {
                    mail: gid
                };
                $.ajax({
                    type: "GET",
                    url: url,
                    data: url_data,
                    success: success
                });
            }
            $("#gravatar_id").fadeOut();
        }
        document.getElementById("cancel_gravatar").onclick = function() {
            $("#gravatar_id").fadeOut();
        }
    }
    //////////////////////////////////////////////////////////////////
    //close new project made

    function submit_newProj() {
        var pname = $("#p_name").val();
        var st_owner = $("#member_owner").val().trim();
        var st_editor = $("#member_editor").val().trim();
        var st_viewer = $("#member_viewer").val().trim();
        var desc = $("#project_desc").val();

        var owner = st_owner.split(',');
        var editor = st_editor.split(',');
        var viewer = st_viewer.split(',');

        var members = {};
        var i = 0;
        for (i = 0; i < owner.length; i++) {
            if (owner[i].length > 0) members[owner[i]] = "owner";
        }
        for (i = 0; i < editor.length; i++) {
            if (editor[i].length > 0) members[editor[i]] = "editor";
        }
        for (i = 0; i < viewer.length; i++) {
            if (viewer[i].length > 0) members[viewer[i]] = "viewer";
        }

        $('#createProjForm').children('textarea').val('');

        if (pname.length) {
            $('#p_name').val('');
            $("#member_owner").val('');
            $("#member_editor").val('');
            $("#member_viewer").val('');
            real.write({
                action: "new_project",
                data: {
                    name: pname,
                    desc: desc,
                    members: members
                }
            });
        } 
        else
        toastr.error("Enter the name of the project");
    }

    function close_newProj() {
        $("#createProjForm").bPopup().close();
    }

    function closecollab() {
        $("#add_collab").bPopup().close();
    }

    var curr_id = 0;
    var pre_id = 0;
    var u_i;
    function choose_parent(id , u_id){
        curr_id = id;
        u_i = u_id;
        if(curr_id){
            if(u_id != -1){
                if(pre_id){
                    $("#"+pre_id).attr('stroke-width', 'inherit');
                    $("#"+pre_id).attr('stroke','inherit');
                }
                $("#"+curr_id).attr('stroke-width', '3');
                $("#"+curr_id).attr('stroke','#000');
                pre_id = curr_id ;
            }
            else{
                $("#"+curr_id).attr('stroke-width', 'inherit');
                $("#"+curr_id).attr('stroke','inherit');
            }
        }
    }


    var reNodeData = {};
    function reset_graph(id, node_no){   
        if(graph.getNodesCount() == 0)
        {
            reNodeData = {};
            reNodeData["data"] = {}
            var nodeData = nodedetails.data[id];
            nodeData["childi_no"] =[];
            nodeData["parenti_no"] = 0;
            reNodeData["data"][id] = nodeData;
            // console.log(reNodeData);
            graph.addNode(id, nodeData);
            var div = document.getElementById("node"+id);
            div.parentNode.removeChild(div);
        }
        else{
            if(u_i == -1)
            {
                toastr.error("Firstly select a parent node by clicking on the parent then select the node");
            }
            else{
                var nodeData = nodedetails.data[id];
                nodeData["childi_no"] =[];
                nodeData["parenti_no"] = curr_id;
                reNodeData["data"][curr_id]["childi_no"].push(id);
                reNodeData["data"][id] = nodeData;
                graph.addNode(id, nodeData);
                graph.addLink(curr_id, id);
                call.choose_parent(curr_id, -1);
                var div = document.getElementById("node"+id);
                div.parentNode.removeChild(div);
                // console.log(reNodeData);
            }
        }
        if(graph.getNodesCount() == node_no){
            var reset_button = document.getElementById("submit_reset")
            reset_button.setAttribute("style","display:block;");
        }
    }
    function submit_resetGraph(){
        var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');
        // console.log(reNodeData);
        real.write({action:"reset_map",scope: { pid: id[0], m_n: id[1] }, data: {map: reNodeData ,m_n:id[1], pid:id[0]} });
    }

    var intro;
    function ret_trip(){
        return intro;
    }
    function take_tour(){
          var introjsteps= [
              {
                element: 'app_project',
                intro: "Your Current <b>Projects</b> ",
                position: 'right'
              },
              {
                element: 'app_create',
                intro: "Click to <b>create project</b> ...",
                position: 'right'
              },
              {
                element: 'app_task',
                intro: 'Tasks assigned to you.',
                position: 'right'
              },
              {
                element: 'app_profile',
                intro: "<span style='font-family: Tahoma'>Your Full Profile </span>",
                position: 'right'
              },
              {
                element: 'app_dropdownmenu',
                intro: 'Your info is always here....',
                position: 'bottom'
              }
            ];

          var intro_head = document.getElementById("introjs_head");
          var a = "<div style='top: 0;bottom: 0; left: 0;right: 0;position: fixed;opacity: 0.8;' class='introjs-overlay' id='introjs-overlay'></div>";
          var b = "<div class='introjs-helperLayer'>"+
                      "<div style='opacity: 1; left: 240px;' class='introjs-tooltip'>"+
                        "<div class='introjs-tooltiptext'>"+introjsteps[0].intro+"</div>"+
                        "<div style='display: inherit;' class='introjs-arrow left'></div>"+
                        "<div class='introjs-tooltipbuttons'>"+
                            "<a href='javascript:void(0);' class='introjs-button introjs-skipbutton' id='introjs-skipbutton'>Skip</a>"+
                            "<a class='introjs-button introjs-prevbutton introjs-disabled' id='introjs-prevbutton'  href='javascript:void(0);'>← Back</a>"+
                            "<a class='introjs-button introjs-nextbutton' id='introjs-nextbutton' href='javascript:void(0);'>Next →</a>"+
                        "</div>"+
                      "</div>"+
                  "</div> ";
          intro_head.innerHTML = a +  b;
          jtour.iniTour(introjsteps.length);
          jtour.ini_Steps(introjsteps);
          jtour._step(1);
          jtour._setHelperLayerPosition(document.querySelector('.introjs-helperLayer'),introjsteps[0].element);
          //// console.log($(introjsteps[0].element));
          document.getElementById(introjsteps[0].element).className += ' introjs-showElement introjs-relativePosition';

          document.getElementById("introjs-overlay").onclick = function(){
                jtour._exitIntro();
          }
          
          document.getElementById("introjs-skipbutton").onclick = function(){
                jtour._exitIntro();
          }

           document.getElementById("introjs-nextbutton").onclick = function(){
                 jtour._nextStep();
          }

         document.getElementById("introjs-prevbutton").onclick = function(){
            jtour._prevStep();
         }
    }

    function user_read(link , index, show){
        // console.log(index);
        real.write({action:"not_read", data:{i_no:index}});
        // console.log(show);
        if(show == 'true'){
            routie(link);
        }
    }
    function user_mention(link, nid, index){
        routie(link);
        if(typeof graph == 'undefined'){
            event_mention = new Event('mention');
            var listener = function (event) {
                document.removeEventListener('mention', listener, false);
                // console.log(graph);
                var node = graph.getNode(nid);
                // console.log(node);
                call.genModal(node.data);
            };
            document.addEventListener('mention', listener, false);
        }
        else{
             // console.log(graph);
                var node = graph.getNode(nid);
                // console.log(node);
                call.genModal(node.data);
        }
        
        // console.log(index);
        if(index != -1){
            real.write({action:"not_read", data:{i_no:index}});
        }
    }

    function add_Task(){
        if(curr_id <= 0){
            toastr.error("You need to select a task before you can add a task.");
        }
        else{
            document.getElementById("modal_addTask").click();
            if(document.getElementById(curr_id)){
                var node_data = graph.getNode(curr_id);
                genModal(node_data.data);
            }
        }
    }

    return {
        ini_uid: ini_uid,
        ret_uid: ret_uid,
        ini_collaborators: ini_collaborators,
        ret_collaborators: ret_collaborators,
        ini_project: ini_project,
        ch_project: ch_project,
        return_nodedetails: return_nodedetails,
        change_nodedetails: change_nodedetails,
        initialise_nodedetails: initialise_nodedetails,
        cr_map: cr_map,
        closeModal: closeModal,
        new_projModal: new_projModal,
        newMap: newMap,
        add_collab: add_collab,
        del_collab: del_collab,
        delete_user: delete_user,
        submit_addCollab: submit_addCollab,
        delPrModal: delPrModal,
        delProject: delProject,
        genModal: genModal,
        add_node: add_node,
        edit_node: edit_node,
        del_node: del_node,
        modal_upassword: modal_upassword,
        modal_ugravitar: modal_ugravitar,
        chat: chat,
        close_newProj: close_newProj,
        closecollab: closecollab,
        submit_newProj: submit_newProj,
        hideNode: hideNode,
        unhideNode: unhideNode,
        prDetail: prDetail,
        viewProject: viewProject,
        analyseProject: analyseProject,
        reset_graph: reset_graph,
        choose_parent : choose_parent,
        submit_resetGraph: submit_resetGraph,
        take_tour : take_tour,
        ret_trip : ret_trip,
        user_read : user_read,
        user_mention : user_mention,
        add_Task : add_Task
    }
}();


realtime = function() {
    var tasks = {};
    function task_initialise(data , sorted, index_before, index_after){
        tasks.data = data;
        tasks.sorted = sorted;
        tasks.index = {};
        tasks.index["before"] = index_before;
        tasks.index["after"] = index_after;
    }

    function notice(data) {
        toastr.error("Error: " + data);
    }

    //called when a new project is made


    function project_made(data) {
        // console.log(data.status);
        $("#createProjForm").bPopup().close();
        var mydiv = document.getElementById("tile");
        var tdTag = document.createElement('div');
        tdTag.className = 'pure-u-1-4';
        tdTag.setAttribute("style", " float: left; margin-top: 10px; margin-left: 10px; ");
        var a = "<a class='metro-tile' id='" + data.proj._id + "'style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: rgb(245, 105, 84); color: #fff;' href='#project/" + data.proj._id + "'>" + data.proj.name + "</a>";
        tdTag.innerHTML = a;
        mydiv.appendChild(tdTag);
        toastr.success("Project " + data.proj.name + " has been created.");
        var status = ""; var i = 0;
        if(data.hasOwnProperty('status')){
            for(var key in data.status.stat){
                status = status + key + " status: " + data.status.stat[key]+"<br>";
                i++;
            }
        }
        // console.log(status);
        if(i){
            toastr.success(status);
        }
    }
    //first fun open all the maps in project , second creates a new map 
    //To view the a particular project i.e. maps in the project . It will also make maps metro tiles as well on thre same page


    function view_proj(data) {
        data = JSON.parse(data);
        //store pid
        // console.log(data);
        call.ini_collaborators(data.users, data.createdby);
        call.ini_project(data);

        var title = document.getElementById("right-title");
        title.innerHTML = data.name;
        var addr = document.getElementById("right-address");
        addr.innerHTML ='<li> <a href="#"><i class="icon-project"></i>Projects</a></li><li class="active">Maps</li>';

        //Change the left-sidebar menu
        var side = document.getElementById("left_sidebar");
        side.innerHTML = "";
        var bar = "<li class='active'><a class='item_l'><i class='icon-map'></i> <span>Maps(Current)</span></a></li>" + "<li onclick='call.cr_map()' id='add_newmap'><a class='item_l'><i class='icon-map_add'></i> <span>Create New Map</span> </a></li>" + "<li onclick='call.prDetail()'><a class='item_l'><i class='icon-info_project'></i> <span>Info</span></a></li>" + "<li onclick='call.add_collab()'><a class='item_l'><i class='icon-add_collab'></i> <span>Add Collaborators</span> </a></li>" + "<li onclick='call.del_collab()'><a class='item_l'><i class='icon-del_collab'></i> <span>Delete Collaborators</span> </a></li>" + "<li onclick='call.delPrModal()'><a class='item_l'><i class='icon-del_project'></i> <span>Delete Current Project</span></a></li>" + "<li ><a class='item_l' onclick='call.analyseProject()'><i class='icon-analytics'></i> <span>Analyse</span></a></li>" + "<li ><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Your Profile</span></a></li>";
        side.innerHTML = bar;

        //Change the main content 
        if ($('#tile')) {
            $('#tile').remove();
        }
        var mydiv = document.getElementById("main_content");
        mydiv.innerHTML = "";
        var tag = document.createElement('div');
        tag.className = 'pure-g';
        tag.id = "tile";

        var a = "";
        var no_maps = 0 ;
        if (data.hasOwnProperty('maps')) {
            for (var key in data.maps) {
                if (data.maps.hasOwnProperty(key)) {
                    a = a + "<div class='pure-u-1-4' style='margin-top: 10px; margin-left: 10px;'><a class='metro-tile' style='text-align:center;cursor: pointer; width: 98%; height: 110px; display: block; background-color: #32A3E0; color: #fff;' href='#map/" + window.location.hash.substring(1).split('/')[1] + "_" + key + "' id='" + key + "'>" + key + "</a></div>";
                    no_maps++;
                }
            }
        }
         if(no_maps == 0){
            //highlight create a new map
            document.getElementById("add_newmap").setAttribute("style","background:#B9B5B5");
            a = a + "<button id='onetime_add' onclick='call.cr_map()'>Add Map</button>"
        }
        tag.innerHTML = a;
        mydiv.appendChild(tag);

        var tileElements = document.getElementsByClassName('metro-tile');
        var i;
        // Apply tile functions 
        for (i = 0; i < tileElements.length; i++) {
            Tile(tileElements[i]);
        }
    }

    function collaborator(data) {
        data = JSON.parse(data);
        call.ini_collaborators(data.users);
    }

    //To create a new Map. It will create the metro tile of the new map


    function new_map(data) {
        var id = window.location.hash.substring(1).split('/')[1];
        if (data.scope.pid == id) {
            $('#modal_form').bPopup().close();
            call.ch_project(data.map, "add");
            if(document.getElementById("onetime_add")){
                document.getElementById("onetime_add").remove();
            }
            var mydiv = document.getElementById("tile");
            var tdTag = document.createElement('div');
            tdTag.className = 'pure-u-1-4';
            tdTag.setAttribute("style", " float: left; margin-top: 10px; margin-left: 10px; ");
            var a = "<a class='metro-tile' id='" + data.map + "'style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: #32A3E0; color: #fff;' href='#map/" + window.location.hash.substring(1).split('/')[1] + "_" + data.map + "'>" + data.map + "</a>";
            tdTag.innerHTML = a;
            mydiv.appendChild(tdTag);
            toastr.success("Map " + data.map + " has been created.");
            document.getElementById("add_newmap").setAttribute("style","");
        } else {
            //add to notifications
            // var notification = "<li><a href='#map/" + data.scope.pid + "'><i class='fa fa-plus success'></i>Task " + " is added to " + data.map + " </a></li>";
            // $("#notific").prepend(notification);

        }
    }

    function delete_project(data) {
        toastr.success("Project " + data.name + " has been successfully deleted.");
        routie('#');
    } /*To open a map */

    function open_map(data) {
        var pid = window.location.hash.substring(1).split('/')[1];
        pid = pid.split('_')[0];
        if (data.scope.pid == pid) {    
            var title = document.getElementById("right-title");
            title.innerHTML = "Map Name: " + data.info.m_n;
            var k=data.info.m_n;
            if(k.split(" ")[1]==undefined)
            {
                var l=k;
            }
            else if(k.split(" ")[2]==undefined)
            {
                var l=k.split(" ")[0]+" "+k.split(" ")[1];
            }
            else{
                var l=k.split(" ")[0]+" "+k.split(" ")[1]+"....";

            }
            var addr = document.getElementById("right-address");
            addr.innerHTML = '<li><a href="#"><i class="icon-project"></i>Projects</a></li>' + '<li ><a href="#project/' + pid + '">Maps</a></li>' + '<li class="active">' + l + '</li>';

            var side = document.getElementById("left_sidebar");
            side.innerHTML = "";
            var bar = "<li><a class='item_l' onclick= 'call.add_Task()' id='node_addTask' ><i class='icon-map'></i> <span>Add notes</span> </a></li>" + "<li><a class='item_l' id='center'><i class='icon-center'></i> <span>Center your Notes</span> </a></li>" + "<li><a class='item_l' id='pin'><i class='icon-pin'></i> <span>Pin your notes</span> </a></li>" + "<li><a class='item_l' id='reset'><i class='icon-reset1'></i> <span>Reset graph</span> </a></li>" + "<li><a class='item_l' id='reset_scale'><i class='icon-resetscale'></i> <span>Reset Scale</span> </a></li>"+ "<li ><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Your Profile</span></a></li>";
            side.innerHTML = bar;
            if ($('#tile')) {
                $('#tile').remove();
            }
            var mydiv = document.getElementById("main_content");
            mydiv.innerHTML="";
            var tag = document.createElement('div');
            tag.className = 'map_graph';
            tag.id = "tile";
            tag.setAttribute("style", "height:100%");
            mydiv.appendChild(tag);
            var node_data =  data.data;
            delete node_data.length;
            delete node_data.visibility;
            call.initialise_nodedetails(node_data);
            functions.main(node_data);

            document.getElementById("reset").onclick = function(){
                var collab = call.ret_collaborators();
                var userid = call.ret_uid();
                var status_collab = collab[userid]["status"];
                if(status_collab == 'viewer'){
                    toastr.error("You don't have rights to reset the graph");
                }
                else{
                    document.getElementById("node_addTask").setAttribute("style","pointer-events: none;");
                    document.getElementById("center").setAttribute("style","pointer-events: none;");
                    document.getElementById("pin").setAttribute("style","pointer-events: none;");
                    document.getElementById("reset").setAttribute("style","pointer-events: none;");
                    document.getElementById("reset_scale").setAttribute("style","pointer-events: none;");

                    $("#reset").attr("data-reset","on");

                    var count_node = graph.getNodesCount();
                    graph.forEachNode( function(n){
                        graph.removeNode(n.id);
                    });

                    var mydiv = document.getElementById("main_content");
                        document.getElementById("tile").setAttribute("style", "height:100%;width:80%;float:right;");
                        var node_display = document.createElement('div');
                        node_display.setAttribute("style", "height:100%;width:20%;float:left;");
                        nodedetails =  call.return_nodedetails();
                    var a= "<ul style='list-style-type: none;'>";
                    for(var key in nodedetails.data){
                        if (nodedetails.data.hasOwnProperty(key)) {
                            a = a +"<a id='node"+key+"' style='cursor:pointer;' onclick='call.reset_graph(\""+key+"\", \""+count_node+"\")'><li style=' font: 200 20px/1.5 Helvetica, Verdana, sans-serif;border-bottom: 1px solid #ccc;'>"+nodedetails.data[key].name+"</li></a>";    
                        }
                    }
                    call.choose_parent(0,-1);
                    a = a +"</ul>";
                    a = a + "<button id='submit_reset' onclick='call.submit_resetGraph()'style='display:none;'>Submit</button><button id='reset_cancel' >Cancel</button>";
                    node_display.innerHTML = a;
                    mydiv.appendChild(node_display);

                    document.getElementById("reset_cancel").onclick = function(){   
                        var hashed = window.location.hash.substring(1).split('/')[1];
                        var params = hashed.split('_');
                        real.write({
                            action: "open_map",
                            data: {
                                pid: params[0],
                                m_n: params[1]
                            },
                            scope: {
                                pid: params[0]
                            }
                        });
                    }
                }
            }  
        } 
    }
      function reset_map(data) {
        var id = window.location.hash.substring(1);
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            if (data.scope.pid == id[0] && data.scope.m_n == id[1]) {
                var title = document.getElementById("right-title");
                title.innerHTML = "Map Name: " + data.scope.m_n;
                var k = data.scope.m_n;
                if(k.split(" ")[1]==undefined)
                {
                    var l=k;
                }
                else if(k.split(" ")[2]==undefined)
                {
                    var l=k.split(" ")[0]+" "+k.split(" ")[1];
                }
                else{
                    var l=k.split(" ")[0]+" "+k.split(" ")[1]+"....";

                }
                var addr = document.getElementById("right-address");
                addr.innerHTML =  '<li><a href="#"><i class="icon-project"></i>Projects</a></li>' + '<li ><a href="#project/' + id[0] + '">Maps</a></li>' + '<li class="active">' + l + '</li>';


                var side = document.getElementById("left_sidebar");
                side.innerHTML = "";
                var bar = "<li class='active'><a class='item_l' ><i class='icon-map'></i> <span>Notes(current)</span> </a></li>" + "<li><a class='item_l' id='center'><i class='icon-center'></i> <span>Center your Notes</span> </a></li>" + "<li><a class='item_l' id='pin'><i class='icon-pin'></i> <span>Pin your notes</span> </a></li>" + "<li><a class='item_l' id='reset'><i class='icon-reset1'></i> <span>Reset graph</span> </a></li>"+ "<li><a class='item_l' id='reset_scale'><i class='icon-resetscale'></i> <span>Reset Scale</span> </a></li>"  + "<li ><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Your Profile</span></a></li>";
                side.innerHTML = bar;
                if ($('#tile')) {
                    $('#tile').remove();
                }
                var mydiv = document.getElementById("main_content");
                mydiv.innerHTML="";
                var tag = document.createElement('div');
                tag.className = 'map_graph';
                tag.id = "tile";
                tag.setAttribute("style", "height:100%");
                mydiv.appendChild(tag);
                var node_data =  data.data;
                // console.log(node_data);
                delete node_data.length;
                delete node_data.visibility;
                // console.log(node_data);
                call.initialise_nodedetails(node_data);
                functions.main(node_data);

                document.getElementById("reset").onclick = function(){
                    var count_node = graph.getNodesCount();
                    graph.forEachNode( function(n){
                        graph.removeNode(n.id);
                    });
                    document.getElementById("center").setAttribute("style","pointer-events: none;");
                    document.getElementById("pin").setAttribute("style","pointer-events: none;");
                    document.getElementById("reset").setAttribute("style","pointer-events: none;");
                    document.getElementById("reset_scale").setAttribute("style","pointer-events: none;");

                    var mydiv = document.getElementById("main_content");
                        document.getElementById("tile").setAttribute("style", "height:100%;width:80%;float:right;");
                        var node_display = document.createElement('div');
                        node_display.setAttribute("style", "height:100%;width:20%;float:left;");
                        nodedetails =  call.return_nodedetails();
                    var a= "<ul style='list-style-type: none;'>";
                    for(var key in nodedetails.data){
                        if (nodedetails.data.hasOwnProperty(key)) {
                            a = a +"<a id='node"+key+"' style='cursor:pointer;' onclick='call.reset_graph(\""+key+"\", \""+count_node+"\")'><li style=' font: 200 20px/1.5 Helvetica, Verdana, sans-serif;border-bottom: 1px solid #ccc;'>"+nodedetails.data[key].name+"</li></a>";    
                        }
                    }
                    call.choose_parent(0,-1);
                    a = a +"</ul>";
                    a = a + "<button id='submit_reset' onclick='call.submit_resetGraph()'style='display:none;'>Submit</button>";
                    node_display.innerHTML = a;
                    mydiv.appendChild(node_display);
                }
            }
        }
            else{
                //not present in correct map
            }   
    }

    function add_node(data) {
        var id = window.location.hash.substring(1);
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            if (data.scope.pid == id[0] && data.scope.m_n == id[1]) {
                $("#change_node").bPopup().close();
                graph.addNode(data.data.node.i_no, data.data.node);
                graph.addLink(data.data.node.parenti_no, data.data.node.i_no);
                toastr.success('Task :' + data.data.node.name + ' has been created');
                call.change_nodedetails(data.data.node, "add");
            }
        } else {
            //add in to notification
/*  var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-plus success'></i>Task "+data.data.node.name+" is added to "+data.scope.m_n+" </a></li>";
                console.log(notification);
                $("#notific").prepend(notification);*/
        }
    }

    function edit_node(data) {
        var id = window.location.hash.substring(1);
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            if (data.scope.pid == id[0] && data.scope.m_n == id[1]) {
                $("#change_node").bPopup().close();
                graph.removeNode(data.data.node.i_no);
                graph.addNode(data.data.node.i_no, data.data.node);
                if (data.data.node.parenti_no != 0) {
                    graph.addLink(data.data.node.parenti_no, data.data.node.i_no);
                }
                for (var j = 0; j < data.data.node.childi_no.length; j++) {
                    graph.addLink(data.data.node.i_no, data.data.node.childi_no[j]);
                }
                toastr.success('Task :' + data.data.node.name + ' has been edited');

                call.change_nodedetails(data.data.node, "edit");
            }
        } else {
            //add to notifications
/*  var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-edit success'></i>Task "+data.data.node.name+" has been edited to "+data.scope.m_n+" </a></li>";
                $("#notific").prepend(notification);*/
        }
    }

    function del_node(data) {
        var id = window.location.hash.substring(1);
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            if (data.scope.pid == id[0] && data.scope.m_n == id[1]) {
                $("#change_node").bPopup().close();
                if (data.data.deleted) {
                    for (var i = 0; i < data.data.deleted.length; i++) {
                        graph.removeNode(data.data.deleted[i]);
                    }
                }
                call.change_nodedetails(data.data, "delete");
            }
        } else {
            //add to notifications
/*      var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-trash-o danger'></i>Task has been deleted in "+data.scope.m_n+" </a></li>";
                    $("#notific").prepend(notification);*/
        }
    }

    function chat(data) {
        var id = window.location.hash.substring(1);
        var flag = 1;
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            var ino = document.getElementById("change_node").getAttribute("data-id");
            if (data.scope.pid == id[0] && data.scope.m_n == id[1] && ino == data.i_no) {
                var flag = 0;
                var divChat = document.createElement('div');
                divChat.className = 'chatitems';
                divChat.innerHTML = "<div class='item' style='margin-bottom: 20px;margin-top:5px;'><img style='border-radius: 20px;height: 40px;border: 2px solid rgba(0, 90, 166, 1);' src='https://www.gravatar.com/avatar/" + data.data.gravatar + "?d=identicon" + "' alt='user image' /><div class='message'" + "style='margin-left: 50px;margin-top: -45px;'><a class='name'><small style='margin-right:25px' class='text-muted pull-right'><i class='fa fa-clock-o'></i>" + data.data.time + "</small>" + data.data.name + "</a>" + "<br>" + data.data.msg + "</div></div>";
                document.getElementById('chat-box').appendChild(divChat);
            }
        }
        if (flag) {
            //add to notifications
/*  var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-trash-o success'></i>Message received from "+data.data.name+" : "+data.data.msg+" </a></li>";
                $("#notific").prepend(notification);*/
        }

    }

    function get_chat(data) {
        var id = window.location.hash.substring(1);
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            if (data.scope.pid == id[0] && data.scope.m_n == id[1]) {
                var divChat = document.createElement('div');
                divChat.className = 'chatitems';
                var a = "";
                for (var i = 0; i < data.data.length; i++) {
                    a = a + "<div class='item' style='margin-bottom: 20px;margin-top:5px;'><img style='border-radius: 20px;height: 40px;border: 2px solid rgba(0, 90, 166, 1);' src='https://www.gravatar.com/avatar/" + data.data[i].gravatar + "?d=identicon" + "' alt='user image' /><div class='message' style='margin-left: 50px;" + "margin-top: -45px;'><a class='name'><small style='margin-right:25px' class='text-muted pull-right'><i class='fa fa-clock-o'></i>" + data.data[i].time + "</small>" + data.data[i].name + "</a>" + "<br>" + data.data[i].msg + "</div></div>";
                }
                divChat.innerHTML = a;
                document.getElementById('chat-box').appendChild(divChat);
            }
        } else {
            //add to notifications
/*  var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-trash-o success'></i>A message is delivered to "+data.scope.m_n+" </a></li>";
                $("#notific").prepend(notification);    */
        }
    }

    function vote(data) {
        //removing like/button icon in case if there
        document.getElementById("node_like").innerHTML = "<i class='icon-thumbs-o-up thumbs-up fa-2x'></i>";
        document.getElementById("node_dislike").innerHTML = "<i class='icon-thumbs-o-down thumbs-down fa-2x'></i>";
        var id = window.location.hash.substring(1);
        if (id.search('/') > 0 && id.search('_') > 0) {
            id = id.split('/')[1];
            id = id.split('_');
            var uvote = 0; //mark the user vote
            var likes = [];
            var dislike = []; //like and dislike users
            var ino = document.getElementById("change_node").getAttribute("data-id");
            if (data.scope.pid == id[0] && data.scope.m_n == id[1] && ino == data.data.data.i_no) {
                var uid = call.ret_uid();
                var voter = $('#user_name').data().name + "#" + uid;
                if (data.data.votes.hasOwnProperty(voter)) {
                    if (data.data.votes[voter]) {
                        document.getElementById("node_like").innerHTML = "<i class='icon-thumbs-up thumbs-up  fa-2x'></i>";
                        uvote = 1;
                    } else {
                        document.getElementById("node_dislike").innerHTML = "<i class='icon-thumbs-down fa-2x'></i>";
                        uvote = -1;
                    }
                    delete data.data.votes[voter];
                }
                //getting user votes
                for (var key in data.data.votes) {
                    if (data.data.votes.hasOwnProperty(key)) {
                        if (data.data.votes[key] == 1) likes.push(key.split("#")[0]);
                        else if (data.data.votes[key] == 0) dislike.push(key.split("#")[0]);
                    }
                }

                var likehtml = document.getElementById("likes");
                var i;
                var a = "";
                if (uvote == 1) {
                    likehtml.innerHTML = likes.length + 1;
                    a = "You <br />";
                } else {
                    likehtml.innerHTML = likes.length;
                }
                if (likes.length) {
                    for (var i = 0; i < likes.length - 1; i++) {
                        a = a + likes[i] + "<br />";
                    }
                    a = a + likes[i];
                } else {
                    if (uvote != 1) a = "No likes yet";
                }
                likehtml.onmouseover = function() {
                    tooltip.show(a);
                }
                likehtml.onmouseout = function() {
                    tooltip.hide();
                }

                //dislike
                var b = "";
                var dislikehtml = document.getElementById("dislikes");
                if (uvote == -1) {
                    dislikehtml.innerHTML = dislike.length + 1;
                    b = "You <br />"
                } else {
                    dislikehtml.innerHTML = dislike.length;
                }
                if (dislike.length) {
                    for (var i = 0; i < dislike.length - 1; i++) {
                        b = b + dislike[i] + "<br />";
                    }
                    b = b + dislike[i];
                } else {
                    if (uvote != -1) b = "No dislikes";
                }
                dislikehtml.onmouseover = function() {
                    tooltip.show(b);
                }
                dislikehtml.onmouseout = function() {
                    tooltip.hide();
                }
            }
        } else {
            //add to notifications
/*  var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-star success'></i>A vote is delivered to "+data.scope.m_n+" </a></li>";
                $("#notific").prepend(notification);    */
        }
    }

    function get_vote(data) {
        //removing like/button icon in case if there
        document.getElementById("node_like").innerHTML = "<i class='icon-thumbs-o-up thumbs-up fa-2x'></i>";
        document.getElementById("node_dislike").innerHTML = "<i class='icon-thumbs-o-down thumbs-down fa-2x'></i>";
        var likes = [];
        var dislike = []; //like and dislike users
        //searching if current user has liked it
        var uid = call.ret_uid();
        var user = $('#user_name').data().name + "#" + uid;
        var uvote = 0; //mark the user vote
        if (data.votes.hasOwnProperty(user)) {
            if (data.votes[user] == 1) {
                document.getElementById("node_like").innerHTML = "<i class=' icon-thumbs-up  fa-2x'></i>";
                uvote = 1;
            } else {
                document.getElementById("node_dislike").innerHTML = "<i class=' icon-thumbs-down fa-2x'></i>";
                uvote = -1;
            }
            delete data.votes[user];
        }
        //getting user votes
        for (var key in data.votes) {
            if (data.votes.hasOwnProperty(key)) {
                if (data.votes[key] == 1) likes.push(key.split("#")[0]);
                else if (data.votes[key] == 0) dislike.push(key.split("#")[0]);
            }
        }
        var likehtml = document.getElementById("likes");
        var i;
        var a = "";
        if (uvote == 1) {
            likehtml.innerHTML = likes.length + 1;
            a = "You <br />";
        } else {
            likehtml.innerHTML = likes.length;
        }
        if (likes.length) {
            for (var i = 0; i < likes.length - 1; i++) {
                a = a + likes[i] + "<br />";
            }
            a = a + likes[i];
        } else {
            if (uvote != 1) a = "No likes yet";
        }
        likehtml.onmouseover = function() {
            tooltip.show(a);
        }
        likehtml.onmouseout = function() {
            tooltip.hide();
        }
        //dislike
        var b = "";
        var dislikehtml = document.getElementById("dislikes");
        if (uvote == -1) {
            dislikehtml.innerHTML = dislike.length + 1;
            b = "You <br />"
        } else {
            dislikehtml.innerHTML = dislike.length;
        }
        if (dislike.length) {
            for (var i = 0; i < dislike.length - 1; i++) {
                b = b + dislike[i] + "<br />";
            }
            b = b + dislike[i];
        } else {
            if (uvote != -1) b = "No dislikes";
        }
        dislikehtml.onmouseover = function() {
            tooltip.show(b);
        }
        dislikehtml.onmouseout = function() {
            tooltip.hide();
        }
    } 

    function user_info(data) {

        var title = document.getElementById("right-title");
        title.innerHTML = "User Info";
        var addr = document.getElementById("right-address");
        addr.innerHTML ='<li><a href="#"><i class="icon-project"></i>Projects</a></li>' +  '<li class="active">Profile</li>';

        var side = document.getElementById("left_sidebar");
        side.innerHTML = "";
        var bar = "<li class='active'><a href='#profile'><i class='icon-profile-info'></i> <span>Profile(Current)</span></a></li>" + "<li ><a href='#'><i class='icon-project'></i> <span>View Your Projects</span></a></li>";
        side.innerHTML = bar;


        var maindiv = document.getElementById("main_content");
        maindiv.innerHTML = "";
        var mydiv = document.createElement('div');
        mydiv.id = "tile";

        maindiv.appendChild(mydiv);

        var tag = document.createElement('div');
        tag.setAttribute("style", "padding-left:10px;margin-top: 10px;float: left;");
        if(data.fid){
            var a = "<img src='https://graph.facebook.com/" + data.fid + "/picture?height=200&width=200' alt='User Image'>";
        }
        else{
            var a = "<img src='https://www.gravatar.com/avatar/" + data.gravatar + "?s=200&d=identicon' alt='User Image'>";
        }
        tag.innerHTML = a;
        mydiv.appendChild(tag);

        var info_tag = document.createElement('div');
        info_tag.setAttribute("style", "float: left;margin-left: 20%;width:50%");
        a = "<h3 class='hl'><i class='icon-user-info'></i> Contact Information</h3>" + "<table class='table'><tbody>" + "<tr><td class='text-muted'>Name</td>" + "<td>" + data.fname + " " + data.lname + "</td>" + "</tr>" + "<tr><td class='text-muted'>Email</td>" + "<td>" + data.email + "</td>" + "</tr>" + "<tr><td class='text-muted'>Referral Link</td>" + 
                "<td><a href='https://jutja.com?r="+data.r_id+"'>" +"https://jutja.com?r=" +data.r_id + "</a</td>" + "<td><a href='https://www.facebook.com/sharer/sharer.php?u=https://jutja.com?r="+data.r_id+"' target='_blank' ><span style='margin-left: 2px;'><img src='https://fbstatic-a.akamaihd.net/rsrc.php/v2/yQ/r/7GFXgco-uzw.png' style='top: 0px;'' width='14' height='14'>Share</span></a></td>"+ "</tr>" +
                 "<tr><td class='text-muted' colspan='2'>Payment Info</td></tr>" + "<tr><td class='text-muted'>Cards</td>" + "<td>" + data.payment.cards + "</td>" + "</tr>" + "<tr><td class='text-muted'>Type</td>" + "<td>" + data.payment.type + "</td>" + "</tr>" + "<tr><td class='text-muted'>Validity</td>" + "<td>" + data.payment.validity.split('T')[0] + "</td></tr>" +"<tr><td class='text-muted'>Coupon code</td>" + "<td>" + "<input id='coupon_code'/>" + "</td>" +"<td>" + "<button id='coupon_submit' class='btn-primary'>Apply</button>" + "</td>"+ "</tr>"+ "</tbody>" + "</table>" +
            "<div id='profile_password'><button id='udetails_repassword' class='btn-primary' style='padding:6px;' onclick='call.modal_upassword()'>Reset Password</button><br>" + "<div id='new_password' style='display:none;margin-top:12px;'><label for='password' style='margin-right:10px'>Enter Your New Password</label>" + "<input required  type='password' id='profile_repassword' name='p'><br><br>" + "<button id='update_password' >Update Password</button>" + "<button id='pro_passcancel'  style='margin-left:15px;'>Cancel</button>" + "</div>" + "</div>" + "<br><div id='profile_gravatar'><button id='reset_gravatar' class='btn-primary' style='padding:6px;' onclick='call.modal_ugravitar()'>Reset Gravatar</button><br>" + "<div id='gravatar_id' style='display:none;margin-top:12px;margin-bottom:10px;'><label for='gravatar' style='margin-right:10px'>Enter a Gravatar email</label>" + "<input required  type='email' id='gravatar_mail' name='mail'><br><br>" + "<button id='update_gravatar' >Update Gravatar</button><button id='cancel_gravatar' style='margin-left:15px;'>Cancel</button>" + "</div><br>" + "<a  target='_blank' href='https://en.gravatar.com/'>What is gravatar? How to Use it. </a>";
        info_tag.innerHTML = a;
        mydiv.appendChild(info_tag);

        document.getElementById("coupon_submit").onclick = function(){
            real.write({
                action : "coupun",
                data: {
                    coupun : $("#coupon_code").val()
                }
            });
            $("#coupon_code").val('');
            
        }
    }

    function user_projects(data) {

        var title = document.getElementById("right-title");
        title.innerHTML = "Projects";
        var addr = document.getElementById("right-address");
        addr.innerHTML ='<li class="active"><a><i class="icon-project"></i>Projects</a></li>' ;

        var side = document.getElementById("left_sidebar");
        side.innerHTML = "";
        var bar = "<li class='active item_l' id='app_project'><a><i class='icon-project'></i> <span>Projects(Current)</span></a></li>" + "<li><a class='item_l' id='app_create' onclick='call.new_projModal()'><i class='icon-project_add'></i> <span>Create a New Project</span></a></li>" + "<li id='app_task'><a class='item_l' href='#tasks' ><i class='icon-task_assign'></i> <span>Assigned Tasks</span></a></li>" + "<li  id='app_profile'><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Your Profile</span></a></li><li><a class='item_l' onclick='call.take_tour()'><i class='icon-tour' ></i><span>Take a Tour</span</a></li>";
        side.innerHTML = bar;
        //Change the main content 
        if ($('#tile')) {
            $('#tile').remove();
        }
        var mydiv = document.getElementById("main_content");
        mydiv.innerHTML = "";
        var tag = document.createElement('div');
        tag.className = 'pure-g';
        tag.id = "tile";

        var a = "";
        for (var key in data.projects) {
            if (data.projects.hasOwnProperty(key)) {
                a = a + "<div class='pure-u-1-4' style='float: left; margin-top: 10px; margin-left: 10px;'>" + "<a class='metro-tile' style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: rgb(245, 105, 84) ; color: #fff;' id='" + key + "' href='#project/" + key + "'>" + data.projects[key] + "</a></div>";
            }
        }
        for (var key in data.oproj) {
            if (data.oproj.hasOwnProperty(key)) {
                a = a + "<div class='pure-u-1-4' style='float: left; margin-top: 10px; margin-left: 10px;'>" + "<a class='metro-tile' style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: rgb(0, 166, 90); color: #fff;' id='" + key + "' href='#project/" + key + "'>" + data.oproj[key] + "</a></div>";
            }
        }
        tag.innerHTML = a;
        mydiv.appendChild(tag);

        var tileElements = document.getElementsByClassName('metro-tile');
        var i;

        // Apply tile functions 
        for (i = 0; i < tileElements.length; i++) {
            Tile(tileElements[i]);
        }
    }

    function user_task(data){
            var sortable = [];
            for(var key in data){
                sortable.push([key , Date.parse(data[key].task.due_date)] );
            }
            var sorted;
            sorted = sortable.sort(function(a, b) {return a[1] - b[1]});
            // console.log(sorted);
            var today = new Date();
                today.setHours(0,0,0,0);
            if(sorted.length == 0)
            {
                toastr.error("No Task assigned to you yet");
                routie('#');
            }
            else{
                var index_today = 0,i;
                for( i=0 ;i<sorted.length ;i++){
                    if(sorted[i][1] >= today)
                    {
                        index_today = i;
                        break;
                    }
                }
                var title = document.getElementById("right-title");
                title.innerHTML = "Assigned Tasks";
                var addr= document.getElementById("right-address");
                addr.innerHTML= '<li><a href="#"><i class="icon-project"></i> Project</a></li>'+
                '<li class="active">Tasks</li>';

                var side = document.getElementById("left_sidebar");
                    side.innerHTML = "";
                    var bar = "<li class='active item_l'><a><i class='icon-task_assign'></i> <span>Assigned-Tasks</span></a></li>" +
                              "<li><a class='item_l' href='#'><i class='icon-project'></i> <span>View Projects</span></a></li>"+
                              "<li><a class='item_l' href='#profile'><i class='icon-profile-info'></i> <span>View Profile</span></a></li>";
                    side.innerHTML = bar ;

                var mydiv = document.getElementById("main_content");
                mydiv.innerHTML = "";
                
                var tag = document.createElement('div');
                tag.id = "tile";
                var a = "";var i;
                a = "<div class='main'>";
                var j ;
                if(index_today > 2)
                {
                    j = index_today - 2;
                    a = a + "<ul class='cbp_tmtimeline' id='load_before'><li class='date_display'><div class='tldate' onclick='realtime.load_before()'>Load more </div></li></ul>";
                }
                else{
                    j = 0;
                }
                a = a + "<ul class='cbp_tmtimeline' id='before_today'>" ;
                for(i = j ; i < index_today ; i++ ){
                    a = a + "<li><time class='cbp_tmtime'><span>"+data[sorted[i][0]].task.due_date+"</span></time>"+
                            "<div class='cbp_tmicon icon-circle' style='font-family:FontAwesome'></div><div class='cbp_tmlabel'>"+
                                "<h3>"+data[sorted[i][0]].task.name+"</h3>"+
                                "<h5>"+data[sorted[i][0]].task.info+"</h5>"+
                            "</div></li>";
                }
                a = a + "</ul><ul class='cbp_tmtimeline'><li class='date_display'><div class='tldate' style='cursor:inherit;'>Today</div></li></ul><ul class='cbp_tmtimeline' id='after_today'>";
                for(i=index_today; i < sorted.length && i < index_today + 2 ; i++ ){
                    a = a + "<li><time class='cbp_tmtime'><span>"+data[sorted[i][0]].task.due_date+"</span></time>"+
                            "<div class='cbp_tmicon icon-circle' style='font-family:FontAwesome'></div><div class='cbp_tmlabel'>"+
                                "<h3>"+data[sorted[i][0]].task.name+"</h3>"+
                                "<h5>"+data[sorted[i][0]].task.info+"</h5>"+
                            "</div></li>";
                }
                a = a + "</ul>";
                if( i < sorted.length)
                {
                    a = a + "<ul class='cbp_tmtimeline' id='load_after'><li class='date_display' ><div class='tldate' onclick='realtime.load_after()'>Load more </div></li></ul>";
                }
                a = a + "</div>"
                realtime.task_initialise(data,sorted,j-1,i);
                tag.innerHTML = a ;
                mydiv.appendChild(tag);
                if(sorted.length == 1){
                        var css='.cbp_tmtimeline:before{width:0px}';
                        style=document.createElement('style');
                        if (style.styleSheet)
                            style.styleSheet.cssText=css;
                        else 
                            style.appendChild(document.createTextNode(css));
                        style.id="css_style";
                        document.getElementsByTagName('head')[0].appendChild(style);
                }
            }
        }

    function load_after(){
        var data = tasks.data;
        // console.log(data);
        var sorted = tasks.sorted;
        // console.log(sorted);
        var index_after = tasks.index["after"];
        // console.log(index_after);
        var a="";
        for(i=index_after; i < sorted.length && i < index_after + 5 ; i++ ){
         a = a + "<li><time class='cbp_tmtime'><span>"+data[sorted[i][0]].task.due_date+"</span></time>"+
                            "<div class='cbp_tmicon icon-circle' style='font-family:FontAwesome'></div><div class='cbp_tmlabel'>"+
                                "<h3>"+data[sorted[i][0]].task.name+"</h3>"+
                                "<h5>"+data[sorted[i][0]].task.info+"</h5>"+
                            "</div></li>";
        }
        // console.log(a);
        var tag = document.getElementById("after_today");
        tag.innerHTML= tag.innerHTML + a ;
        if(i == sorted.length)
        {
            $("#load_after").remove();
        }
        realtime.task_initialise(data, sorted , tasks.index["before"] ,i);

    }
    function load_before(){
        var data = tasks.data;
        // console.log(data);
        var sorted = tasks.sorted;
        // console.log(sorted);
        var index_before = tasks.index["before"];
        // console.log(index_before);
        var a="";
        for(i=index_before; i >= 0 && i > index_before - 5 ; i-- ){
         a = "<li><time class='cbp_tmtime'><span>"+data[sorted[i][0]].task.due_date+"</span></time>"+
                            "<div class='cbp_tmicon icon-circle' style='font-family:FontAwesome'></div><div class='cbp_tmlabel'>"+
                                "<h3>"+data[sorted[i][0]].task.name+"</h3>"+
                                "<h5>"+data[sorted[i][0]].task.info+"</h5>"+
                            "</div></li>";
                    $("#before_today").prepend(a);
        }
        if(i == -1)
        {
            $("#load_before").remove();
        }
        realtime.task_initialise(data, sorted , i ,tasks.index["after"]);

    }
    function add_users(data) {
        call.ini_collaborators(data.data.users, data.info.id);
        var a = ""; var l =0;
        // console.log(data.data["status"]["stat"]);
        for (var key in data.data["status"]["stat"]){
            if(data.data["status"]["stat"].hasOwnProperty(key)){
                if(l) 
                {
                    a+="<br>";
                } 
                a += key +" status :" +data.data["status"]["stat"][key];
                l++; 
            }
        }
        toastr.success(a);
    }

    function remove_users(data) {
        call.ini_collaborators(data.data, data.info.id);
        call.closeModal();
    }

    function user_not(data){
        var unread = 0 ;
        if(data.not.length){
            document.getElementById("notific").innerHTML= "<a class='dropdown-toggle' data-toggle='dropdown' href='#''></a>";
            for( var i = data.not.length-1; i>=0 ; i--){
                if(data.not[i].read == true){
                    if(data.not[i].type == 'add'){
                        var notification = "<li><a href='#"+data.not[i].link+"'><i class='fa fa-star success'></i>"+data.not[i].event+" </a></li>";
                    }
                    else if(data.not[i].type == 'del'){
                        var notification = "<li><a><i class='fa fa-star success'></i>"+data.not[i].event+" </a></li>";
                    }
                    else if(data.not[i].type == 'men'){
                        var notification = "<li><a onclick='call.user_mention(\""+data.not[i].link+"\",\""+data.not[i].nid+"\",\"-1\")' style=' cursor:pointer;' ><i class='fa fa-star success'></i>"+data.not[i].event+" </a></li>";                        
                    }
                }
                else{
                    unread = unread +1 ;
                    if(data.not[i].type == 'add'){
                        var notification = "<li><a onclick='call.user_read(\""+data.not[i].link+"\",\""+i+"\",\"true\")' style='background-color:#d6d6d6; cursor:pointer;' ><i class='fa fa-star success'></i>"+data.not[i].event+" </a></li>";
                    }
                    else if(data.not[i].type == 'del'){
                        var notification = "<li><a onclick='call.user_read(\""+data.not[i].link+"\",\""+i+"\",\"false\")' style='background-color:#d6d6d6;cursor:pointer;' ><i class='fa fa-star success'></i>"+data.not[i].event+" </a></li>";
                    }
                    else if(data.not[i].type == 'men'){
                        // console.log(data.not[i].nid);
                        var notification = "<li><a onclick='call.user_mention(\""+data.not[i].link+"\",\""+data.not[i].nid+"\",\""+i+"\")' style='background-color:#d6d6d6; cursor:pointer;' ><i class='fa fa-star success'></i>"+data.not[i].event+" </a></li>";
                    }
                }
                $("#notific").append(notification);
            }
            if(unread){
                document.getElementById("label_not").innerHTML = unread;
                document.getElementById("label_not").setAttribute(
   "style", "");
            }
            else{
                document.getElementById("label_not").innerHTML = "";
                document.getElementById("label_not").setAttribute(
   "style", "display:none");

            }
        }
    }


    return {
        notice: notice,
        project_made: project_made,
        view_proj: view_proj,
        delete_project: delete_project,
        new_map: new_map,
        open_map: open_map,
        add_node: add_node,
        edit_node: edit_node,
        del_node: del_node,
        user_info: user_info,
        user_projects: user_projects,
        chat: chat,
        get_chat: get_chat,
        vote: vote,
        get_vote: get_vote,
        add_users: add_users,
        remove_users: remove_users,
        collaborator: collaborator,
        user_task: user_task,
        task_initialise :  task_initialise,
        load_after : load_after,
        load_before : load_before,
        reset_map : reset_map,
        user_not : user_not
    }

}();

//routie
routie({
    'project/:id': function(id) {
        real.write({
            action: "view_project",
            data: {
                pid: id
            }
        });
        real.write({
            action: "get_id"
        });
    },
    'map/:id': function(id) {
        var params = id.split("_");
        real.write({
            action: "get_id"
        });
        real.write({
            action: "collaborator",
            data: {
                pid: params[0]
            }
        });

        real.write({
            action: "open_map",
            data: {
                pid: params[0],
                m_n: params[1]
            },
            scope: {
                pid: params[0]
            }
        });
        

    },
    'profile': function() {
        if ($('#css_style')) {
            $('#css_style').remove();
        }
        real.write({
            action: "user_info"
        });
         real.write({
            action: "get_id"
        });
    },
    '': function() {
        if ($('#css_style')) {
            $('#css_style').remove();
        }
        real.write({
            action: "user_projects"
        });
         real.write({
            action: "get_id"
        });
    },
    '_=_': function() {
        if ($('#css_style')) {
            $('#css_style').remove();
        }
        real.write({
            action: "user_projects"
        });
         real.write({
            action: "get_id"
        });
    },
    'tasks': function() {
        real.write({
            action: "user_tasks"
        });
        real.write({
            action: "get_id"
        });
    }

});
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.2
 *
 */
(function(f) {
    jQuery.fn.extend({
        slimScroll: function(g) {
            var a = f.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: 0.4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: 0.2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, g);
            this.each(function() {
                function u(d) {
                    if (r) {
                        d = d || window.event;
                        var c = 0;
                        d.wheelDelta && (c = -d.wheelDelta / 120);
                        d.detail && (c = d.detail / 3);
                        f(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && m(c, !0);
                        d.preventDefault && !k && d.preventDefault();
                        k || (d.returnValue = !1)
                    }
                }
                function m(d, f, g) {
                    k = !1;
                    var e = d,
                        h = b.outerHeight() - c.outerHeight();
                    f && (e = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), e = Math.min(Math.max(e, 0), h), e = 0 < d ? Math.ceil(e) : Math.floor(e), c.css({
                        top: e + "px"
                    }));
                    l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
                    e = l * (b[0].scrollHeight - b.outerHeight());
                    g && (e = d, d = e / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), h), c.css({
                        top: d + "px"
                    }));
                    b.scrollTop(e);
                    b.trigger("slimscrolling", ~~e);
                    v();
                    p()
                }
                function C() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", u, !1), this.addEventListener("mousewheel", u, !1)) : document.attachEvent("onmousewheel", u)
                }
                function w() {
                    s = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), D);
                    c.css({
                        height: s + "px"
                    });
                    var a = s == b.outerHeight() ? "none" : "block";
                    c.css({
                        display: a
                    })
                }

                function v() {
                    w();
                    clearTimeout(A);
                    l == ~~l ? (k = a.allowPageScroll, B != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
                    B = l;
                    s >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && h.stop(!0, !0).fadeIn("fast"))
                }
                function p() {
                    a.alwaysVisible || (A = setTimeout(function() {
                        a.disableFadeOut && r || x || y || (c.fadeOut("slow"), h.fadeOut("slow"))
                    }, 1E3))
                }
                var r, x, y, A, z, s, l, B, D = 30,
                    k = !1,
                    b = f(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var n = b.scrollTop(),
                        c = b.parent().find("." + a.barClass),
                        h = b.parent().find("." + a.railClass);
                    w();
                    if (f.isPlainObject(g)) {
                        if ("height" in g && "auto" == g.height) {
                            b.parent().css("height", "auto");
                            b.css("height", "auto");
                            var q = b.parent().parent().height();
                            b.parent().css("height", q);
                            b.css("height", q)
                        }
                        if ("scrollTo" in g) n = parseInt(a.scrollTo);
                        else if ("scrollBy" in g) n += parseInt(a.scrollBy);
                        else if ("destroy" in g) {
                            c.remove();
                            h.remove();
                            b.unwrap();
                            return
                        }
                        m(n, !1, !0)
                    }
                } else {
                    a.height = "auto" == g.height ? b.parent().height() : g.height;
                    n = f("<div></div>").addClass(a.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    b.css({
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    var h = f("<div></div>").addClass(a.railClass).css({
                        width: a.size,
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: a.alwaysVisible && a.railVisible ? "block" : "none",
                        "border-radius": a.railBorderRadius,
                        background: a.railColor,
                        opacity: a.railOpacity,
                        zIndex: 90
                    }),
                        c = f("<div></div>").addClass(a.barClass).css({
                            background: a.color,
                            width: a.size,
                            position: "absolute",
                            top: 0,
                            opacity: a.opacity,
                            display: a.alwaysVisible ? "block" : "none",
                            "border-radius": a.borderRadius,
                            BorderRadius: a.borderRadius,
                            MozBorderRadius: a.borderRadius,
                            WebkitBorderRadius: a.borderRadius,
                            zIndex: 99
                        }),
                        q = "right" == a.position ? {
                            right: a.distance
                        } : {
                            left: a.distance
                        };
                    h.css(q);
                    c.css(q);
                    b.wrap(n);
                    b.parent().append(c);
                    b.parent().append(h);
                    a.railDraggable && c.bind("mousedown", function(a) {
                        var b = f(document);
                        y = !0;
                        t = parseFloat(c.css("top"));
                        pageY = a.pageY;
                        b.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY;
                            c.css("top", currTop);
                            m(0, c.position().top, !1)
                        });
                        b.bind("mouseup.slimscroll", function(a) {
                            y = !1;
                            p();
                            b.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll", function(a) {
                        a.stopPropagation();
                        a.preventDefault();
                        return !1
                    });
                    h.hover(function() {
                        v()
                    }, function() {
                        p()
                    });
                    c.hover(function() {
                        x = !0
                    }, function() {
                        x = !1
                    });
                    b.hover(function() {
                        r = !0;
                        v();
                        p()
                    }, function() {
                        r = !1;
                        p()
                    });
                    b.bind("touchstart", function(a, b) {
                        a.originalEvent.touches.length && (z = a.originalEvent.touches[0].pageY)
                    });
                    b.bind("touchmove", function(b) {
                        k || b.originalEvent.preventDefault();
                        b.originalEvent.touches.length && (m((z - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), z = b.originalEvent.touches[0].pageY)
                    });
                    w();
                    "bottom" === a.start ? (c.css({
                        top: b.outerHeight() - c.outerHeight()
                    }), m(0, !0)) : "top" !== a.start && (m(f(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
                    C()
                }
            });
            return this
        }
    });
    jQuery.fn.extend({
        slimscroll: jQuery.fn.slimScroll
    })
})(jQuery);
/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2014 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

/*! Hammer.JS - v2.0.1 - 2014-07-15
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!
function(a, b) {
    "use strict";

    function c(a, b, c) {
        return setTimeout(i(a, c), b)
    }
    function d(a, b, c) {
        return Array.isArray(a) ? (e(a, c[b], c), !0) : !1
    }
    function e(a, c, d) {
        var e, f;
        if (a) if (a.forEach) a.forEach(c, d);
        else if (a.length !== b) for (e = 0, f = a.length; f > e; e++) c.call(d, a[e], e, a);
        else
        for (e in a) a.hasOwnProperty(e) && c.call(d, a[e], e, a)
    }
    function f(a, c, d) {
        for (var e = Object.keys(c), f = 0, g = e.length; g > f; f++)(!d || d && a[e[f]] === b) && (a[e[f]] = c[e[f]]);
        return a
    }
    function g(a, b) {
        return f(a, b, !0)
    }
    function h(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && f(d, c)
    }
    function i(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }
    function j(a, c) {
        return typeof a == eb ? a.apply(c ? c[0] || b : b, c) : a
    }
    function k(a, c) {
        return a === b ? c : a
    }
    function l(a, b, c) {
        e(p(b), function(b) {
            a.addEventListener(b, c, !1)
        })
    }
    function m(a, b, c) {
        e(p(b), function(b) {
            a.removeEventListener(b, c, !1)
        })
    }
    function n(a, b) {
        for (; a;) {
            if (a == b) return !0;
            a = a.parentNode
        }
        return !1
    }
    function o(a, b) {
        return a.indexOf(b) > -1
    }
    function p(a) {
        return a.trim().split(/\s+/g)
    }
    function q(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);
        for (var d = 0, e = a.length; e > d; d++) if (c && a[d][c] == b || !c && a[d] === b) return d;
        return -1
    }
    function r(a) {
        return Array.prototype.slice.call(a, 0)
    }
    function s(a, b) {
        for (var c = [], d = [], e = 0, f = a.length; f > e; e++) {
            var g = b ? a[e][b] : a[e];
            q(d, g) < 0 && c.push(a[e]), d[e] = g
        }
        return c
    }
    function t(a, c) {
        for (var d, e, f = c[0].toUpperCase() + c.slice(1), g = 0, h = cb.length; h > g; g++) if (d = cb[g], e = d ? d + f : c, e in a) return e;
        return b
    }
    function u() {
        return jb++
    }
    function v(b, c) {
        var d = this;
        this.manager = b, this.callback = c, this.domHandler = function(a) {
            j(d.manager.options.enable, [d.manager]) && d.handler(a)
        }, this.evEl && l(this.manager.element, this.evEl, this.domHandler), this.evWin && l(a, this.evWin, this.domHandler)
    }
    function w(a) {
        var b;
        return new(b = mb ? J : nb ? K : lb ? M : I)(a, x)
    }
    function x(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & tb && d - e === 0,
            g = b & (vb | wb) && d - e === 0;
        c.isFirst = f, c.isFinal = g, f && (a.session = {}), c.eventType = b, y(a, c), a.emit("hammer.input", c), a.recognize(c)
    }
    function y(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;
        c.firstInput || (c.firstInput = A(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = A(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = B(d);
        b.timeStamp = ib(), b.deltaTime = b.timeStamp - f.timeStamp, b.deltaX = i.x - h.x, b.deltaY = i.y - h.y, b.center = i, b.angle = F(h, i), b.distance = E(h, i), b.offsetDirection = D(b.deltaX, b.deltaY), b.scale = g ? H(g.pointers, d) : 1, b.rotation = g ? G(g.pointers, d) : 0;
        var j = a.element;
        n(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j, z(c, b)
    }
    function z(a, c) {
        var d = a.lastInterval;
        d || (d = a.lastInterval = A(c));
        var e, f, g, h, i = c.timeStamp - d.timeStamp;
        if (i > sb || d.velocity === b) {
            var j = d.deltaX - c.deltaX,
                k = d.deltaY - c.deltaY,
                l = C(i, j, k);
            f = l.x, g = l.y, e = hb(l.x) > hb(l.y) ? l.x : l.y, h = D(j, k)
        } else e = d.velocity, f = d.velocityX, g = d.velocityY, h = d.direction;
        c.velocity = e, c.velocityX = f, c.velocityY = g, c.direction = h
    }
    function A(a) {
        for (var b = [], c = 0; c < a.pointers.length; c++) b[c] = {
            clientX: gb(a.pointers[c].clientX),
            clientY: gb(a.pointers[c].clientY)
        };
        return {
            timeStamp: ib(),
            pointers: b,
            center: B(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        }
    }
    function B(a) {
        var b = a.length;
        if (1 === b) return {
            x: gb(a[0].clientX),
            y: gb(a[0].clientY)
        };
        for (var c = 0, d = 0, e = 0; b > e; e++) c += a[e].clientX, d += a[e].clientY;
        return {
            x: gb(c / b),
            y: gb(d / b)
        }
    }
    function C(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        }
    }
    function D(a, b) {
        return a === b ? xb : hb(a) >= hb(b) ? a > 0 ? yb : zb : b > 0 ? Ab : Bb
    }
    function E(a, b, c) {
        c || (c = Fb);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }
    function F(a, b, c) {
        c || (c = Fb);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }
    function G(a, b) {
        return F(b[1], b[0], Gb) - F(a[1], a[0], Gb)
    }
    function H(a, b) {
        return E(b[0], b[1], Gb) / E(a[0], a[1], Gb)
    }
    function I() {
        this.evEl = Ib, this.evWin = Jb, this.allow = !0, this.pressed = !1, v.apply(this, arguments)
    }
    function J() {
        this.evEl = Mb, this.evWin = Nb, v.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    function K() {
        this.evEl = Pb, this.targetIds = {}, v.apply(this, arguments)
    }
    function L(a, b) {
        var c, d, e = b.targetIds,
            f = r(a.targetTouches),
            g = r(a.changedTouches),
            h = [];
        if ("touchstart" == a.type) for (c = 0, d = f.length; d > c; c++) e[f[c].identifier] = !0;
        for (c = 0, d = g.length; d > c; c++) e[g[c].identifier] && h.push(g[c]), ("touchend" == a.type || "touchcancel" == a.type) && delete e[g[c].identifier];
        return [s(f.concat(h), "identifier"), h]
    }
    function M() {
        v.apply(this, arguments);
        var a = i(this.handler, this);
        this.touch = new K(this.manager, a), this.mouse = new I(this.manager, a)
    }
    function N(a, b) {
        this.manager = a, this.set(b)
    }
    function O(a) {
        if (o(a, Vb)) return Vb;
        var b = o(a, Wb),
            c = o(a, Xb);
        return b && c ? Wb + " " + Xb : b || c ? b ? Wb : Xb : o(a, Ub) ? Ub : Tb
    }
    function P(a) {
        this.id = u(), this.manager = null, this.options = g(a || {}, this.defaults), this.options.enable = k(this.options.enable, !0), this.state = Yb, this.simultaneous = {}, this.requireFail = []
    }
    function Q(a) {
        return a & bc ? "cancel" : a & _b ? "end" : a & $b ? "move" : a & Zb ? "start" : ""
    }
    function R(a) {
        return a == Bb ? "down" : a == Ab ? "up" : a == yb ? "left" : a == zb ? "right" : ""
    }
    function S(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a
    }
    function T() {
        P.apply(this, arguments)
    }
    function U() {
        T.apply(this, arguments), this.pX = null, this.pY = null
    }
    function V() {
        T.apply(this, arguments)
    }
    function W() {
        P.apply(this, arguments), this._timer = null, this._input = null
    }
    function X() {
        T.apply(this, arguments)
    }
    function Y() {
        T.apply(this, arguments)
    }
    function Z() {
        P.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }
    function $(a, b) {
        return b = b || {}, b.recognizers = k(b.recognizers, $.defaults.preset), new _(a, b)
    }
    function _(a, b) {
        b = b || {}, this.options = g(b, $.defaults), this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = w(this), this.touchAction = new N(this, this.options.touchAction), ab(this, !0), e(b.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[2])
        }, this)
    }
    function ab(a, b) {
        var c = a.element,
            d = a.options.cssProps;
        e(d, function(a, d) {
            c.style[t(c.style, d)] = b ? a : ""
        });
        var f = b &&
        function() {
            return !1
        };
        "none" == d.userSelect && (c.onselectstart = f), "none" == d.userDrag && (c.ondragstart = f)
    }
    function bb(a, b) {
        var c = document.createEvent("Event");
        c.initEvent(a, !0, !0), c.gesture = b, b.target.dispatchEvent(c)
    }
    var cb = ["", "webkit", "moz", "MS", "ms", "o"],
        db = document.createElement("div"),
        eb = "function",
        fb = "undefined",
        gb = Math.round,
        hb = Math.abs,
        ib = Date.now,
        jb = 1,
        kb = /mobile|tablet|ip(ad|hone|od)|android/i,
        lb = "ontouchstart" in a,
        mb = t(a, "PointerEvent") !== b,
        nb = lb && kb.test(navigator.userAgent),
        ob = "touch",
        pb = "pen",
        qb = "mouse",
        rb = "kinect",
        sb = 25,
        tb = 1,
        ub = 2,
        vb = 4,
        wb = 8,
        xb = 1,
        yb = 2,
        zb = 4,
        Ab = 8,
        Bb = 16,
        Cb = yb | zb,
        Db = Ab | Bb,
        Eb = Cb | Db,
        Fb = ["x", "y"],
        Gb = ["clientX", "clientY"];
    v.prototype = {
        handler: function() {},
        destroy: function() {
            this.elEvents && m(this.manager.element, this.elEvents, this.domHandler), this.winEvents && m(a, this.winEvents, this.domHandler)
        }
    };
    var Hb = {
        mousedown: tb,
        mousemove: ub,
        mouseup: vb,
        mouseout: wb
    },
        Ib = "mousedown",
        Jb = "mousemove mouseout mouseup";
    h(I, v, {
        handler: function(a) {
            var b = Hb[a.type];
            if (b & tb && 0 === a.button && (this.pressed = !0), b & ub && 1 !== a.which && (b = vb), this.pressed && this.allow) {
                var c = a.relatedTarget || a.toElement || a.target;
                "mouseout" == a.type && "HTML" != c.nodeName && (b = ub), b & (vb | wb) && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [a],
                    changedPointers: [a],
                    pointerType: qb,
                    srcEvent: a
                })
            }
        }
    });
    var Kb = {
        pointerdown: tb,
        pointermove: ub,
        pointerup: vb,
        pointercancel: wb,
        pointerout: wb
    },
        Lb = {
            2: ob,
            3: pb,
            4: qb,
            5: rb
        },
        Mb = "pointerdown",
        Nb = "pointermove pointerout pointerup pointercancel";
    a.MSPointerEvent && (Mb = "MSPointerDown", Nb = "MSPointerMove MSPointerOut MSPointerUp MSPointerCancel"), h(J, v, {
        handler: function(a) {
            var b = this.store,
                c = !1,
                d = a.type.toLowerCase().replace("ms", ""),
                e = Kb[d],
                f = Lb[a.pointerType] || a.pointerType,
                g = a.relatedTarget || a.toElement || a.target;
            "pointerout" == d && "HTML" != g.nodeName && (e = ub), e & tb && (0 === a.button || f == ob) ? b.push(a) : e & (vb | wb) && (c = !0);
            var h = q(b, a.pointerId, "pointerId");
            0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1))
        }
    });
    var Ob = {
        touchstart: tb,
        touchmove: ub,
        touchend: vb,
        touchcancel: wb
    },
        Pb = "touchstart touchmove touchend touchcancel";
    h(K, v, {
        handler: function(a) {
            var b = L(a, this);
            this.callback(this.manager, Ob[a.type], {
                pointers: b[0],
                changedPointers: b[1],
                pointerType: ob,
                srcEvent: a
            })
        }
    }), h(M, v, {
        handler: function(a, b, c) {
            var d = c.pointerType == ob,
                e = c.pointerType == qb;
            if (d) this.mouse.allow = !1;
            else if (e && !this.mouse.allow) return;
            b & (vb | wb) && (this.mouse.allow = !0), this.callback(a, b, c)
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Qb = t(db.style, "touchAction"),
        Rb = Qb !== b,
        Sb = "compute",
        Tb = "auto",
        Ub = "manipulation",
        Vb = "none",
        Wb = "pan-x",
        Xb = "pan-y";
    N.prototype = {
        set: function(a) {
            a == Sb && (a = this.compute()), Rb && (this.manager.element.style[Qb] = a), this.actions = a.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var a = [];
            return e(this.manager.recognizers, function(b) {
                j(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
            }), O(a.join(" "))
        },
        preventDefaults: function(a) {
            if (!Rb) {
                var b = a.srcEvent,
                    c = a.offsetDirection;
                if (this.manager.session.prevented) return void b.preventDefault();
                var d = this.actions,
                    e = o(d, Vb),
                    f = o(d, Xb),
                    g = o(d, Wb);
                return e || f && g || f && c & Cb || g && c & Db ? this.preventSrc(b) : void 0
            }
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0, a.preventDefault()
        }
    };
    var Yb = 1,
        Zb = 2,
        $b = 4,
        _b = 8,
        ac = _b,
        bc = 16,
        cc = 32;
    P.prototype = {
        defaults: {},
        set: function(a) {
            return f(this.options, a), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(a) {
            if (d(a, "recognizeWith", this)) return this;
            var b = this.simultaneous;
            return a = S(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
        },
        dropRecognizeWith: function(a) {
            return d(a, "dropRecognizeWith", this) ? this : (a = S(a, this), delete this.simultaneous[a.id], this)
        },
        requireFailure: function(a) {
            if (d(a, "requireFailure", this)) return this;
            var b = this.requireFail;
            return a = S(a, this), -1 === q(b, a) && (b.push(a), a.requireFailure(this)), this
        },
        dropRequireFailure: function(a) {
            if (d(a, "dropRequireFailure", this)) return this;
            a = S(a, this);
            var b = q(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(a) {
            return !!this.simultaneous[a.id]
        },
        emit: function(a) {
            this.manager.emit(this.options.event, a), this.manager.emit(this.options.event + Q(this.state), a)
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void(this.state = cc)
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length; a++) if (!(this.requireFail[a].state & (cc | Yb))) return !1;
            return !0
        },
        recognize: function(a) {
            var b = f({}, a);
            return j(this.options.enable, [this, b]) ? (this.state & (ac | bc | cc) && (this.state = Yb), this.state = this.process(b), void(this.state & (Zb | $b | _b | bc) && this.tryEmit(b))) : (this.reset(), void(this.state = cc))
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    }, h(T, P, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b
        },
        process: function(a) {
            var b = this.state,
                c = a.eventType,
                d = b & (Zb | $b),
                e = this.attrTest(a);
            return d && (c & wb || !e) ? b | bc : d || e ? c & vb ? b | _b : b & Zb ? b | $b : Zb : cc
        }
    }), h(U, T, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Eb
        },
        getTouchAction: function() {
            var a = this.options.direction;
            if (a === Eb) return [Vb];
            var b = [];
            return a & Cb && b.push(Xb), a & Db && b.push(Wb), b
        },
        directionTest: function(a) {
            var b = this.options,
                c = !0,
                d = a.distance,
                e = a.direction,
                f = a.deltaX,
                g = a.deltaY;
            return e & b.direction || (b.direction & Cb ? (e = 0 === f ? xb : 0 > f ? yb : zb, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? xb : 0 > g ? Ab : Bb, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
        },
        attrTest: function(a) {
            return T.prototype.attrTest.call(this, a) && (this.state & Zb || !(this.state & Zb) && this.directionTest(a))
        },
        emit: function(a) {
            this.pX = a.deltaX, this.pY = a.deltaY, this._super.emit.call(this, a);
            var b = R(a.direction);
            b && this.manager.emit(this.options.event + b, a)
        }
    }), h(V, T, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [Vb]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & Zb)
        },
        emit: function(a) {
            if (this._super.emit.call(this, a), 1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + b, a)
            }
        }
    }), h(W, P, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function() {
            return [Tb]
        },
        process: function(a) {
            var b = this.options,
                d = a.pointers.length === b.pointers,
                e = a.distance < b.threshold,
                f = a.deltaTime > b.time;
            if (this._input = a, !e || !d || a.eventType & (vb | wb) && !f) this.reset();
            else if (a.eventType & tb) this.reset(), this._timer = c(function() {
                this.state = ac, this.tryEmit()
            }, b.time, this);
            else if (a.eventType & vb) return ac;
            return cc
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(a) {
            this.state === ac && (a && a.eventType & vb ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ib(), this.manager.emit(this.options.event, this._input)))
        }
    }), h(X, T, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [Vb]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & Zb)
        }
    }), h(Y, T, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: Cb | Db,
            pointers: 1
        },
        getTouchAction: function() {
            return U.prototype.getTouchAction.call(this)
        },
        attrTest: function(a) {
            var b, c = this.options.direction;
            return c & (Cb | Db) ? b = a.velocity : c & Cb ? b = a.velocityX : c & Db && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && hb(b) > this.options.velocity && a.eventType & vb
        },
        emit: function(a) {
            this.manager.emit(this.options.event, a);
            var b = R(a.direction);
            b && this.manager.emit(this.options.event + b, a)
        }
    }), h(Z, P, {
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
            return [Ub]
        },
        process: function(a) {
            var b = this.options,
                d = a.pointers.length === b.pointers,
                e = a.distance < b.threshold,
                f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & tb && 0 === this.count) return this._failTimeout();
            if (e && f && d) {
                if (a.eventType != vb) return this._failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                    h = !this.pCenter || E(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                var i = this.count % b.taps;
                if (0 === i) return this.hasRequireFailures() ? (this._timer = c(function() {
                    this.state = ac, this.tryEmit()
                }, b.interval, this), Zb) : ac
            }
            return cc
        },
        _failTimeout: function() {
            return this._timer = c(function() {
                this.state = cc
            }, this.options.interval, this), cc
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == ac && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), $.VERSION = "2.0.1", $.defaults = {
        domEvents: !1,
        touchAction: Sb,
        enable: !0,
        preset: [
            [X,
            {
                enable: !1
            }],
            [V,
            {
                enable: !1
            }, ["rotate"]],
            [Y,
            {
                direction: Cb
            }],
            [U,
            {
                direction: Cb
            }, ["swipe"]],
            [Z],
            [Z,
            {
                event: "doubletap",
                taps: 2
            }, ["tap"]],
            [W]
        ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var dc = 1,
        ec = 2;
    _.prototype = {
        set: function(a) {
            return f(this.options, a), this
        },
        stop: function(a) {
            this.session.stopped = a ? ec : dc
        },
        recognize: function(a) {
            if (!this.session.stopped) {
                this.touchAction.preventDefaults(a);
                var b, c = this.session,
                    d = c.curRecognizer;
                (!d || d && d.state & ac) && (d = c.curRecognizer = null);
                for (var e = 0, f = this.recognizers.length; f > e; e++) b = this.recognizers[e], this.session.stopped === ec || d && b != d && !b.canRecognizeWith(d) ? b.reset() : b.recognize(a), !d && b.state & (Zb | $b | _b) && (d = c.curRecognizer = b)
            }
        },
        get: function(a) {
            if (a instanceof P) return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
            return null
        },
        add: function(a) {
            if (d(a, "add", this)) return this;
            var b = this.get(a.options.event);
            return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
        },
        remove: function(a) {
            if (d(a, "remove", this)) return this;
            var b = this.recognizers;
            return a = this.get(a), b.splice(q(b, a), 1), this.touchAction.update(), this
        },
        on: function(a, b) {
            var c = this.handlers;
            return e(p(a), function(a) {
                c[a] = c[a] || [], c[a].push(b)
            }), this
        },
        off: function(a, b) {
            var c = this.handlers;
            return e(p(a), function(a) {
                b ? c[a].splice(q(c[a], b), 1) : delete c[a]
            }), this
        },
        emit: function(a, b) {
            this.options.domEvents && bb(a, b);
            var c = this.handlers[a];
            if (c && c.length) {
                b.type = a, b.preventDefault = function() {
                    b.srcEvent.preventDefault()
                };
                for (var d = 0, e = c.length; e > d; d++) c[d](b)
            }
        },
        destroy: function() {
            this.element && ab(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, f($, {
        INPUT_START: tb,
        INPUT_MOVE: ub,
        INPUT_END: vb,
        INPUT_CANCEL: wb,
        STATE_POSSIBLE: Yb,
        STATE_BEGAN: Zb,
        STATE_CHANGED: $b,
        STATE_ENDED: _b,
        STATE_RECOGNIZED: ac,
        STATE_CANCELLED: bc,
        STATE_FAILED: cc,
        DIRECTION_NONE: xb,
        DIRECTION_LEFT: yb,
        DIRECTION_RIGHT: zb,
        DIRECTION_UP: Ab,
        DIRECTION_DOWN: Bb,
        DIRECTION_HORIZONTAL: Cb,
        DIRECTION_VERTICAL: Db,
        DIRECTION_ALL: Eb,
        Manager: _,
        Input: v,
        TouchAction: N,
        Recognizer: P,
        AttrRecognizer: T,
        Tap: Z,
        Pan: U,
        Swipe: Y,
        Pinch: V,
        Rotate: X,
        Press: W,
        on: l,
        off: m,
        each: e,
        merge: g,
        extend: f,
        inherit: h,
        bindFn: i,
        prefixed: t
    }), typeof define == eb && define.amd ? define(function() {
        return $
    }) : typeof module != fb && module.exports ? module.exports = $ : a.Hammer = $
}(window);
var tooltip=function(){
var id = 'tt';
var top = 3;
var left = 3;
var maxw = 300;
var speed = 10;
var timer = 20;
var endalpha = 95;
var alpha = 0;
var tt, t, c, b, h;
var ie = document.all ? true : false;
return {
    show: function(v, w) {
        if (tt == null) {
            tt = document.createElement('div');
            tt.setAttribute('id', id);
            t = document.createElement('div');
            t.setAttribute('id', id + 'top');
            c = document.createElement('div');
            c.setAttribute('id', id + 'cont');
            b = document.createElement('div');
            b.setAttribute('id', id + 'bot');
            tt.appendChild(t);
            tt.appendChild(c);
            tt.appendChild(b);
            document.body.appendChild(tt);
            tt.style.opacity = 0;
            tt.style.filter = 'alpha(opacity=0)';
            document.onmousemove = this.pos;
        }
        tt.style.display = 'block';
        c.innerHTML = v;
        tt.style.width = w ? w + 'px' : 'auto';
        if (!w && ie) {
            t.style.display = 'none';
            b.style.display = 'none';
            tt.style.width = tt.offsetWidth;
            t.style.display = 'block';
            b.style.display = 'block';
        }
        if (tt.offsetWidth > maxw) {
            tt.style.width = maxw + 'px'
        }
        h = parseInt(tt.offsetHeight) + top;
        clearInterval(tt.timer);
        tt.timer = setInterval(function() {
            tooltip.fade(1)
        }, timer);
    },
    pos: function(e) {
        var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
        var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
        tt.style.top = (u - h) + 'px';
        tt.style.left = (l + left) + 'px';
    },
    fade: function(d) {
        var a = alpha;
        if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
            var i = speed;
            if (endalpha - a < speed && d == 1) {
                i = endalpha - a;
            } else if (alpha < speed && d == -1) {
                i = a;
            }
            alpha = a + (i * d);
            tt.style.opacity = alpha * .01;
            tt.style.filter = 'alpha(opacity=' + alpha + ')';
        } else {
            clearInterval(tt.timer);
            if (d == -1) {
                tt.style.display = 'none'
            }
        }
    },
    hide: function() {
        clearInterval(tt.timer);
        tt.timer = setInterval(function() {
            tooltip.fade(-1)
        }, timer);
    }
};
}(); /*! selectize.js - v0.10.1 | https://github.com/brianreavis/selectize.js | Apache License (v2) */
!
function(a, b) {
    "function" == typeof define && define.amd ? define("sifter", b) : "object" == typeof exports ? module.exports = b() : a.Sifter = b()
}(this, function() {
    var a = function(a, b) {
        this.items = a, this.settings = b || {
            diacritics: !0
        }
    };
    a.prototype.tokenize = function(a) {
        if (a = d(String(a || "").toLowerCase()), !a || !a.length) return [];
        var b, c, f, h, i = [],
            j = a.split(/ +/);
        for (b = 0, c = j.length; c > b; b++) {
            if (f = e(j[b]), this.settings.diacritics) for (h in g) g.hasOwnProperty(h) && (f = f.replace(new RegExp(h, "g"), g[h]));
            i.push({
                string: j[b],
                regex: new RegExp(f, "i")
            })
        }
        return i
    }, a.prototype.iterator = function(a, b) {
        var c;
        c = f(a) ? Array.prototype.forEach ||
        function(a) {
            for (var b = 0, c = this.length; c > b; b++) a(this[b], b, this)
        } : function(a) {
            for (var b in this) this.hasOwnProperty(b) && a(this[b], b, this)
        }, c.apply(a, [b])
    }, a.prototype.getScoreFunction = function(a, b) {
        var c, d, e, f;
        c = this, a = c.prepareSearch(a, b), e = a.tokens, d = a.options.fields, f = e.length;
        var g = function(a, b) {
            var c, d;
            return a ? (a = String(a || ""), d = a.search(b.regex), -1 === d ? 0 : (c = b.string.length / a.length, 0 === d && (c += .5), c)) : 0
        },
            h = function() {
                var a = d.length;
                return a ? 1 === a ?
                function(a, b) {
                    return g(b[d[0]], a)
                } : function(b, c) {
                    for (var e = 0, f = 0; a > e; e++) f += g(c[d[e]], b);
                    return f / a
                } : function() {
                    return 0
                }
            }();
        return f ? 1 === f ?
        function(a) {
            return h(e[0], a)
        } : "and" === a.options.conjunction ?
        function(a) {
            for (var b, c = 0, d = 0; f > c; c++) {
                if (b = h(e[c], a), 0 >= b) return 0;
                d += b
            }
            return d / f
        } : function(a) {
            for (var b = 0, c = 0; f > b; b++) c += h(e[b], a);
            return c / f
        } : function() {
            return 0
        }
    }, a.prototype.getSortFunction = function(a, c) {
        var d, e, f, g, h, i, j, k, l, m, n;
        if (f = this, a = f.prepareSearch(a, c), n = !a.query && c.sort_empty || c.sort, l = function(a, b) {
            return "$score" === a ? b.score : f.items[b.id][a]
        }, h = [], n) for (d = 0, e = n.length; e > d; d++)(a.query || "$score" !== n[d].field) && h.push(n[d]);
        if (a.query) {
            for (m = !0, d = 0, e = h.length; e > d; d++) if ("$score" === h[d].field) {
                m = !1;
                break
            }
            m && h.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
        for (d = 0, e = h.length; e > d; d++) if ("$score" === h[d].field) {
            h.splice(d, 1);
            break
        }
        for (k = [], d = 0, e = h.length; e > d; d++) k.push("desc" === h[d].direction ? -1 : 1);
        return i = h.length, i ? 1 === i ? (g = h[0].field, j = k[0], function(a, c) {
            return j * b(l(g, a), l(g, c))
        }) : function(a, c) {
            var d, e, f;
            for (d = 0; i > d; d++) if (f = h[d].field, e = k[d] * b(l(f, a), l(f, c))) return e;
            return 0
        } : null
    }, a.prototype.prepareSearch = function(a, b) {
        if ("object" == typeof a) return a;
        b = c({}, b);
        var d = b.fields,
            e = b.sort,
            g = b.sort_empty;
        return d && !f(d) && (b.fields = [d]), e && !f(e) && (b.sort = [e]), g && !f(g) && (b.sort_empty = [g]), {
            options: b,
            query: String(a || "").toLowerCase(),
            tokens: this.tokenize(a),
            total: 0,
            items: []
        }
    }, a.prototype.search = function(a, b) {
        var c, d, e, f, g = this;
        return d = this.prepareSearch(a, b), b = d.options, a = d.query, f = b.score || g.getScoreFunction(d), a.length ? g.iterator(g.items, function(a, e) {
            c = f(a), (b.filter === !1 || c > 0) && d.items.push({
                score: c,
                id: e
            })
        }) : g.iterator(g.items, function(a, b) {
            d.items.push({
                score: 1,
                id: b
            })
        }), e = g.getSortFunction(d, b), e && d.items.sort(e), d.total = d.items.length, "number" == typeof b.limit && (d.items = d.items.slice(0, b.limit)), d
    };
    var b = function(a, b) {
        return "number" == typeof a && "number" == typeof b ? a > b ? 1 : b > a ? -1 : 0 : (a = String(a || "").toLowerCase(), b = String(b || "").toLowerCase(), a > b ? 1 : b > a ? -1 : 0)
    },
        c = function(a) {
            var b, c, d, e;
            for (b = 1, c = arguments.length; c > b; b++) if (e = arguments[b]) for (d in e) e.hasOwnProperty(d) && (a[d] = e[d]);
            return a
        },
        d = function(a) {
            return (a + "").replace(/^\s+|\s+$|/g, "")
        },
        e = function(a) {
            return (a + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        },
        f = Array.isArray || $ && $.isArray ||
        function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        },
        g = {
            a: "[aÀÁÂÃÄÅàáâãäå]",
            c: "[cÇçćĆčČ]",
            d: "[dđĐďĎ]",
            e: "[eÈÉÊËèéêëěĚ]",
            i: "[iÌÍÎÏìíîï]",
            n: "[nÑñňŇ]",
            o: "[oÒÓÔÕÕÖØòóôõöø]",
            r: "[rřŘ]",
            s: "[sŠš]",
            t: "[tťŤ]",
            u: "[uÙÚÛÜùúûüůŮ]",
            y: "[yŸÿýÝ]",
            z: "[zŽž]"
        };
    return a
}), function(a, b) {
    "function" == typeof define && define.amd ? define("microplugin", b) : "object" == typeof exports ? module.exports = b() : a.MicroPlugin = b()
}(this, function() {
    var a = {};
    a.mixin = function(a) {
        a.plugins = {}, a.prototype.initializePlugins = function(a) {
            var c, d, e, f = this,
                g = [];
            if (f.plugins = {
                names: [],
                settings: {},
                requested: {},
                loaded: {}
            }, b.isArray(a)) for (c = 0, d = a.length; d > c; c++)"string" == typeof a[c] ? g.push(a[c]) : (f.plugins.settings[a[c].name] = a[c].options, g.push(a[c].name));
            else if (a) for (e in a) a.hasOwnProperty(e) && (f.plugins.settings[e] = a[e], g.push(e));
            for (; g.length;) f.require(g.shift())
        }, a.prototype.loadPlugin = function(b) {
            var c = this,
                d = c.plugins,
                e = a.plugins[b];
            if (!a.plugins.hasOwnProperty(b)) throw new Error('Unable to find "' + b + '" plugin');
            d.requested[b] = !0, d.loaded[b] = e.fn.apply(c, [c.plugins.settings[b] || {}]), d.names.push(b)
        }, a.prototype.require = function(a) {
            var b = this,
                c = b.plugins;
            if (!b.plugins.loaded.hasOwnProperty(a)) {
                if (c.requested[a]) throw new Error('Plugin has circular dependency ("' + a + '")');
                b.loadPlugin(a)
            }
            return c.loaded[a]
        }, a.define = function(b, c) {
            a.plugins[b] = {
                name: b,
                fn: c
            }
        }
    };
    var b = {
        isArray: Array.isArray ||
        function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
    };
    return a
}), function(a, b) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], b) : "object" == typeof exports ? module.exports = b(require("jquery"), require("sifter"), require("microplugin")) : a.Selectize = b(a.jQuery, a.Sifter, a.MicroPlugin)
}(this, function(a, b, c) {
    "use strict";
    var d = function(a, b) {
        if ("string" != typeof b || b.length) {
            var c = "string" == typeof b ? new RegExp(b, "i") : b,
                d = function(a) {
                    var b = 0;
                    if (3 === a.nodeType) {
                        var e = a.data.search(c);
                        if (e >= 0 && a.data.length > 0) {
                            var f = a.data.match(c),
                                g = document.createElement("span");
                            g.className = "highlight";
                            var h = a.splitText(e),
                                i = (h.splitText(f[0].length), h.cloneNode(!0));
                            g.appendChild(i), h.parentNode.replaceChild(g, h), b = 1
                        }
                    } else if (1 === a.nodeType && a.childNodes && !/(script|style)/i.test(a.tagName)) for (var j = 0; j < a.childNodes.length; ++j) j += d(a.childNodes[j]);
                    return b
                };
            return a.each(function() {
                d(this)
            })
        }
    },
        e = function() {};
    e.prototype = {
        on: function(a, b) {
            this._events = this._events || {}, this._events[a] = this._events[a] || [], this._events[a].push(b)
        },
        off: function(a, b) {
            var c = arguments.length;
            return 0 === c ? delete this._events : 1 === c ? delete this._events[a] : (this._events = this._events || {}, void(a in this._events != !1 && this._events[a].splice(this._events[a].indexOf(b), 1)))
        },
        trigger: function(a) {
            if (this._events = this._events || {}, a in this._events != !1) for (var b = 0; b < this._events[a].length; b++) this._events[a][b].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }, e.mixin = function(a) {
        for (var b = ["on", "off", "trigger"], c = 0; c < b.length; c++) a.prototype[b[c]] = e.prototype[b[c]]
    };
    var f = /Mac/.test(navigator.userAgent),
        g = 65,
        h = 13,
        i = 27,
        j = 37,
        k = 38,
        l = 80,
        m = 39,
        n = 40,
        o = 78,
        p = 8,
        q = 46,
        r = 16,
        s = f ? 91 : 17,
        t = f ? 18 : 17,
        u = 9,
        v = 1,
        w = 2,
        x = function(a) {
            return "undefined" != typeof a
        },
        y = function(a) {
            return "undefined" == typeof a || null === a ? "" : "boolean" == typeof a ? a ? "1" : "0" : a + ""
        },
        z = function(a) {
            return (a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        A = function(a) {
            return (a + "").replace(/\$/g, "$$$$")
        },
        B = {};
    B.before = function(a, b, c) {
        var d = a[b];
        a[b] = function() {
            return c.apply(a, arguments), d.apply(a, arguments)
        }
    }, B.after = function(a, b, c) {
        var d = a[b];
        a[b] = function() {
            var b = d.apply(a, arguments);
            return c.apply(a, arguments), b
        }
    };
    var C = function(b, c) {
        if (!a.isArray(c)) return c;
        var d, e, f = {};
        for (d = 0, e = c.length; e > d; d++) c[d].hasOwnProperty(b) && (f[c[d][b]] = c[d]);
        return f
    },
        D = function(a) {
            var b = !1;
            return function() {
                b || (b = !0, a.apply(this, arguments))
            }
        },
        E = function(a, b) {
            var c;
            return function() {
                var d = this,
                    e = arguments;
                window.clearTimeout(c), c = window.setTimeout(function() {
                    a.apply(d, e)
                }, b)
            }
        },
        F = function(a, b, c) {
            var d, e = a.trigger,
                f = {};
            a.trigger = function() {
                var c = arguments[0];
                return -1 === b.indexOf(c) ? e.apply(a, arguments) : void(f[c] = arguments)
            }, c.apply(a, []), a.trigger = e;
            for (d in f) f.hasOwnProperty(d) && e.apply(a, f[d])
        },
        G = function(a, b, c, d) {
            a.on(b, c, function(b) {
                for (var c = b.target; c && c.parentNode !== a[0];) c = c.parentNode;
                return b.currentTarget = c, d.apply(this, [b])
            })
        },
        H = function(a) {
            var b = {};
            if ("selectionStart" in a) b.start = a.selectionStart, b.length = a.selectionEnd - b.start;
            else if (document.selection) {
                a.focus();
                var c = document.selection.createRange(),
                    d = document.selection.createRange().text.length;
                c.moveStart("character", -a.value.length), b.start = c.text.length - d, b.length = d
            }
            return b
        },
        I = function(a, b, c) {
            var d, e, f = {};
            if (c) for (d = 0, e = c.length; e > d; d++) f[c[d]] = a.css(c[d]);
            else f = a.css();
            b.css(f)
        },
        J = function(b, c) {
            if (!b) return 0;
            var d = a("<test>").css({
                position: "absolute",
                top: -99999,
                left: -99999,
                width: "auto",
                padding: 0,
                whiteSpace: "pre"
            }).text(b).appendTo("body");
            I(c, d, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
            var e = d.width();
            return d.remove(), e
        },
        K = function(a) {
            var b = null,
                c = function(c, d) {
                    var e, f, g, h, i, j, k, l;
                    c = c || window.event || {}, d = d || {}, c.metaKey || c.altKey || (d.force || a.data("grow") !== !1) && (e = a.val(), c.type && "keydown" === c.type.toLowerCase() && (f = c.keyCode, g = f >= 97 && 122 >= f || f >= 65 && 90 >= f || f >= 48 && 57 >= f || 32 === f, f === q || f === p ? (l = H(a[0]), l.length ? e = e.substring(0, l.start) + e.substring(l.start + l.length) : f === p && l.start ? e = e.substring(0, l.start - 1) + e.substring(l.start + 1) : f === q && "undefined" != typeof l.start && (e = e.substring(0, l.start) + e.substring(l.start + 1))) : g && (j = c.shiftKey, k = String.fromCharCode(c.keyCode), k = j ? k.toUpperCase() : k.toLowerCase(), e += k)), h = a.attr("placeholder"), !e && h && (e = h), i = J(e, a) + 4, i !== b && (b = i, a.width(i), a.triggerHandler("resize")))
                };
            a.on("keydown keyup update blur", c), c()
        },
        L = function(c, d) {
            var e, f, g = this;
            f = c[0], f.selectize = g, e = window.getComputedStyle ? window.getComputedStyle(f, null).getPropertyValue("direction") : f.currentStyle && f.currentStyle.direction, e = e || c.parents("[dir]:first").attr("dir") || "", a.extend(g, {
                settings: d,
                $input: c,
                tagType: "select" === f.tagName.toLowerCase() ? v : w,
                rtl: /rtl/i.test(e),
                eventNS: ".selectize" + ++L.count,
                highlightedValue: null,
                isOpen: !1,
                isDisabled: !1,
                isRequired: c.is("[required]"),
                isInvalid: !1,
                isLocked: !1,
                isFocused: !1,
                isInputHidden: !1,
                isSetup: !1,
                isShiftDown: !1,
                isCmdDown: !1,
                isCtrlDown: !1,
                ignoreFocus: !1,
                ignoreBlur: !1,
                ignoreHover: !1,
                hasOptions: !1,
                currentResults: null,
                lastValue: "",
                caretPos: 0,
                loading: 0,
                loadedSearches: {},
                $activeOption: null,
                $activeItems: [],
                optgroups: {},
                options: {},
                userOptions: {},
                items: [],
                renderCache: {},
                onSearchChange: null === d.loadThrottle ? g.onSearchChange : E(g.onSearchChange, d.loadThrottle)
            }), g.sifter = new b(this.options, {
                diacritics: d.diacritics
            }), a.extend(g.options, C(d.valueField, d.options)), delete g.settings.options, a.extend(g.optgroups, C(d.optgroupValueField, d.optgroups)), delete g.settings.optgroups, g.settings.mode = g.settings.mode || (1 === g.settings.maxItems ? "single" : "multi"), "boolean" != typeof g.settings.hideSelected && (g.settings.hideSelected = "multi" === g.settings.mode), g.settings.create && (g.canCreate = function(a) {
                var b = g.settings.createFilter;
                return !(!a.length || "function" == typeof b && !b.apply(g, [a]) || "string" == typeof b && !new RegExp(b).test(a) || b instanceof RegExp && !b.test(a))
            }), g.initializePlugins(g.settings.plugins), g.setupCallbacks(), g.setupTemplates(), g.setup()
        };
    return e.mixin(L), c.mixin(L), a.extend(L.prototype, {
        setup: function() {
            var b, c, d, e, g, h, i, j, k, l, m = this,
                n = m.settings,
                o = m.eventNS,
                p = a(window),
                q = a(document),
                u = m.$input;
            i = m.settings.mode, j = u.attr("tabindex") || "", k = u.attr("class") || "", b = a("<div>").addClass(n.wrapperClass).addClass(k).addClass(i), c = a("<div>").addClass(n.inputClass).addClass("items").appendTo(b), d = a('<input type="text" autocomplete="off" />').appendTo(c).attr("tabindex", j), h = a(n.dropdownParent || b), e = a("<div>").addClass(n.dropdownClass).addClass(k).addClass(i).hide().appendTo(h), g = a("<div>").addClass(n.dropdownContentClass).appendTo(e), b.css({
                width: u[0].style.width
            }), m.plugins.names.length && (l = "plugin-" + m.plugins.names.join(" plugin-"), b.addClass(l), e.addClass(l)), (null === n.maxItems || n.maxItems > 1) && m.tagType === v && u.attr("multiple", "multiple"), m.settings.placeholder && d.attr("placeholder", n.placeholder), u.attr("autocorrect") && d.attr("autocorrect", u.attr("autocorrect")), u.attr("autocapitalize") && d.attr("autocapitalize", u.attr("autocapitalize")), m.$wrapper = b, m.$control = c, m.$control_input = d, m.$dropdown = e, m.$dropdown_content = g, e.on("mouseenter", "[data-selectable]", function() {
                return m.onOptionHover.apply(m, arguments)
            }), e.on("mousedown", "[data-selectable]", function() {
                return m.onOptionSelect.apply(m, arguments)
            }), G(c, "mousedown", "*:not(input)", function() {
                return m.onItemSelect.apply(m, arguments)
            }), K(d), c.on({
                mousedown: function() {
                    return m.onMouseDown.apply(m, arguments)
                },
                click: function() {
                    return m.onClick.apply(m, arguments)
                }
            }), d.on({
                mousedown: function(a) {
                    a.stopPropagation()
                },
                keydown: function() {
                    return m.onKeyDown.apply(m, arguments)
                },
                keyup: function() {
                    return m.onKeyUp.apply(m, arguments)
                },
                keypress: function() {
                    return m.onKeyPress.apply(m, arguments)
                },
                resize: function() {
                    m.positionDropdown.apply(m, [])
                },
                blur: function() {
                    return m.onBlur.apply(m, arguments)
                },
                focus: function() {
                    return m.ignoreBlur = !1, m.onFocus.apply(m, arguments)
                },
                paste: function() {
                    return m.onPaste.apply(m, arguments)
                }
            }), q.on("keydown" + o, function(a) {
                m.isCmdDown = a[f ? "metaKey" : "ctrlKey"], m.isCtrlDown = a[f ? "altKey" : "ctrlKey"], m.isShiftDown = a.shiftKey
            }), q.on("keyup" + o, function(a) {
                a.keyCode === t && (m.isCtrlDown = !1), a.keyCode === r && (m.isShiftDown = !1), a.keyCode === s && (m.isCmdDown = !1)
            }), q.on("mousedown" + o, function(a) {
                if (m.isFocused) {
                    if (a.target === m.$dropdown[0] || a.target.parentNode === m.$dropdown[0]) return !1;
                    m.$control.has(a.target).length || a.target === m.$control[0] || m.blur()
                }
            }), p.on(["scroll" + o, "resize" + o].join(" "), function() {
                m.isOpen && m.positionDropdown.apply(m, arguments)
            }), p.on("mousemove" + o, function() {
                m.ignoreHover = !1
            }), this.revertSettings = {
                $children: u.children().detach(),
                tabindex: u.attr("tabindex")
            }, u.attr("tabindex", -1).hide().after(m.$wrapper), a.isArray(n.items) && (m.setValue(n.items), delete n.items), u[0].validity && u.on("invalid" + o, function(a) {
                a.preventDefault(), m.isInvalid = !0, m.refreshState()
            }), m.updateOriginalInput(), m.refreshItems(), m.refreshState(), m.updatePlaceholder(), m.isSetup = !0, u.is(":disabled") && m.disable(), m.on("change", this.onChange), u.data("selectize", m), u.addClass("selectized"), m.trigger("initialize"), n.preload === !0 && m.onSearchChange("")
        },
        setupTemplates: function() {
            var b = this,
                c = b.settings.labelField,
                d = b.settings.optgroupLabelField,
                e = {
                    optgroup: function(a) {
                        return '<div class="optgroup">' + a.html + "</div>"
                    },
                    optgroup_header: function(a, b) {
                        return '<div class="optgroup-header">' + b(a[d]) + "</div>"
                    },
                    option: function(a, b) {
                        return '<div class="option">' + b(a[c]) + "</div>"
                    },
                    item: function(a, b) {
                        return '<div class="item">' + b(a[c]) + "</div>"
                    },
                    option_create: function(a, b) {
                        return '<div class="create">Add <strong>' + b(a.input) + "</strong>&hellip;</div>"
                    }
                };
            b.settings.render = a.extend({}, e, b.settings.render)
        },
        setupCallbacks: function() {
            var a, b, c = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType"
            };
            for (a in c) c.hasOwnProperty(a) && (b = this.settings[c[a]], b && this.on(a, b))
        },
        onClick: function(a) {
            var b = this;
            b.isFocused || (b.focus(), a.preventDefault())
        },
        onMouseDown: function(b) {
            {
                var c = this,
                    d = b.isDefaultPrevented();
                a(b.target)
            }
            if (c.isFocused) {
                if (b.target !== c.$control_input[0]) return "single" === c.settings.mode ? c.isOpen ? c.close() : c.open() : d || c.setActiveItem(null), !1
            } else d || window.setTimeout(function() {
                c.focus()
            }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(a) {
            var b = this;
            (b.isFull() || b.isInputHidden || b.isLocked) && a.preventDefault()
        },
        onKeyPress: function(a) {
            if (this.isLocked) return a && a.preventDefault();
            var b = String.fromCharCode(a.keyCode || a.which);
            return this.settings.create && b === this.settings.delimiter ? (this.createItem(), a.preventDefault(), !1) : void 0
        },
        onKeyDown: function(a) {
            var b = (a.target === this.$control_input[0], this);
            if (b.isLocked) return void(a.keyCode !== u && a.preventDefault());
            switch (a.keyCode) {
            case g:
                if (b.isCmdDown) return void b.selectAll();
                break;
            case i:
                return void b.close();
            case o:
                if (!a.ctrlKey || a.altKey) break;
            case n:
                if (!b.isOpen && b.hasOptions) b.open();
                else if (b.$activeOption) {
                    b.ignoreHover = !0;
                    var c = b.getAdjacentOption(b.$activeOption, 1);
                    c.length && b.setActiveOption(c, !0, !0)
                }
                return void a.preventDefault();
            case l:
                if (!a.ctrlKey || a.altKey) break;
            case k:
                if (b.$activeOption) {
                    b.ignoreHover = !0;
                    var d = b.getAdjacentOption(b.$activeOption, -1);
                    d.length && b.setActiveOption(d, !0, !0)
                }
                return void a.preventDefault();
            case h:
                return b.isOpen && b.$activeOption && b.onOptionSelect({
                    currentTarget: b.$activeOption
                }), void a.preventDefault();
            case j:
                return void b.advanceSelection(-1, a);
            case m:
                return void b.advanceSelection(1, a);
            case u:
                return b.settings.selectOnTab && b.isOpen && b.$activeOption && (b.onOptionSelect({
                    currentTarget: b.$activeOption
                }), a.preventDefault()), void(b.settings.create && b.createItem() && a.preventDefault());
            case p:
            case q:
                return void b.deleteSelection(a)
            }
            return !b.isFull() && !b.isInputHidden || (f ? a.metaKey : a.ctrlKey) ? void 0 : void a.preventDefault()
        },
        onKeyUp: function(a) {
            var b = this;
            if (b.isLocked) return a && a.preventDefault();
            var c = b.$control_input.val() || "";
            b.lastValue !== c && (b.lastValue = c, b.onSearchChange(c), b.refreshOptions(), b.trigger("type", c))
        },
        onSearchChange: function(a) {
            var b = this,
                c = b.settings.load;
            c && (b.loadedSearches.hasOwnProperty(a) || (b.loadedSearches[a] = !0, b.load(function(d) {
                c.apply(b, [a, d])
            })))
        },
        onFocus: function(a) {
            var b = this;
            return b.isFocused = !0, b.isDisabled ? (b.blur(), a && a.preventDefault(), !1) : void(b.ignoreFocus || ("focus" === b.settings.preload && b.onSearchChange(""), b.$activeItems.length || (b.showInput(), b.setActiveItem(null), b.refreshOptions( !! b.settings.openOnFocus)), b.refreshState()))
        },
        onBlur: function(a) {
            var b = this;
            if (b.isFocused = !1, !b.ignoreFocus) {
                if (!b.ignoreBlur && document.activeElement === b.$dropdown_content[0]) return b.ignoreBlur = !0, void b.onFocus(a);
                b.settings.create && b.settings.createOnBlur && b.createItem(!1), b.close(), b.setTextboxValue(""), b.setActiveItem(null), b.setActiveOption(null), b.setCaret(b.items.length), b.refreshState()
            }
        },
        onOptionHover: function(a) {
            this.ignoreHover || this.setActiveOption(a.currentTarget, !1)
        },
        onOptionSelect: function(b) {
            var c, d, e = this;
            b.preventDefault && (b.preventDefault(), b.stopPropagation()), d = a(b.currentTarget), d.hasClass("create") ? e.createItem() : (c = d.attr("data-value"), c && (e.lastQuery = null, e.setTextboxValue(""), e.addItem(c), !e.settings.hideSelected && b.type && /mouse/.test(b.type) && e.setActiveOption(e.getOption(c))))
        },
        onItemSelect: function(a) {
            var b = this;
            b.isLocked || "multi" === b.settings.mode && (a.preventDefault(), b.setActiveItem(a.currentTarget, a))
        },
        load: function(a) {
            var b = this,
                c = b.$wrapper.addClass("loading");
            b.loading++, a.apply(b, [function(a) {
                b.loading = Math.max(b.loading - 1, 0), a && a.length && (b.addOption(a), b.refreshOptions(b.isFocused && !b.isInputHidden)), b.loading || c.removeClass("loading"), b.trigger("load", a)
            }])
        },
        setTextboxValue: function(a) {
            var b = this.$control_input,
                c = b.val() !== a;
            c && (b.val(a).triggerHandler("update"), this.lastValue = a)
        },
        getValue: function() {
            return this.tagType === v && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(a) {
            F(this, ["change"], function() {
                this.clear(), this.addItems(a)
            })
        },
        setActiveItem: function(b, c) {
            var d, e, f, g, h, i, j, k, l = this;
            if ("single" !== l.settings.mode) {
                if (b = a(b), !b.length) return a(l.$activeItems).removeClass("active"), l.$activeItems = [], void(l.isFocused && l.showInput());
                if (d = c && c.type.toLowerCase(), "mousedown" === d && l.isShiftDown && l.$activeItems.length) {
                    for (k = l.$control.children(".active:last"), g = Array.prototype.indexOf.apply(l.$control[0].childNodes, [k[0]]), h = Array.prototype.indexOf.apply(l.$control[0].childNodes, [b[0]]), g > h && (j = g, g = h, h = j), e = g; h >= e; e++) i = l.$control[0].childNodes[e], -1 === l.$activeItems.indexOf(i) && (a(i).addClass("active"), l.$activeItems.push(i));
                    c.preventDefault()
                } else "mousedown" === d && l.isCtrlDown || "keydown" === d && this.isShiftDown ? b.hasClass("active") ? (f = l.$activeItems.indexOf(b[0]), l.$activeItems.splice(f, 1), b.removeClass("active")) : l.$activeItems.push(b.addClass("active")[0]) : (a(l.$activeItems).removeClass("active"), l.$activeItems = [b.addClass("active")[0]]);
                l.hideInput(), this.isFocused || l.focus()
            }
        },
        setActiveOption: function(b, c, d) {
            var e, f, g, h, i, j = this;
            j.$activeOption && j.$activeOption.removeClass("active"), j.$activeOption = null, b = a(b), b.length && (j.$activeOption = b.addClass("active"), (c || !x(c)) && (e = j.$dropdown_content.height(), f = j.$activeOption.outerHeight(!0), c = j.$dropdown_content.scrollTop() || 0, g = j.$activeOption.offset().top - j.$dropdown_content.offset().top + c, h = g, i = g - e + f, g + f > e + c ? j.$dropdown_content.stop().animate({
                scrollTop: i
            }, d ? j.settings.scrollDuration : 0) : c > g && j.$dropdown_content.stop().animate({
                scrollTop: h
            }, d ? j.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var a = this;
            "single" !== a.settings.mode && (a.$activeItems = Array.prototype.slice.apply(a.$control.children(":not(input)").addClass("active")), a.$activeItems.length && (a.hideInput(), a.close()), a.focus())
        },
        hideInput: function() {
            var a = this;
            a.setTextboxValue(""), a.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: a.rtl ? 1e4 : -1e4
            }), a.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            }), this.isInputHidden = !1
        },
        focus: function() {
            var a = this;
            a.isDisabled || (a.ignoreFocus = !0, a.$control_input[0].focus(), window.setTimeout(function() {
                a.ignoreFocus = !1, a.onFocus()
            }, 0))
        },
        blur: function() {
            this.$control_input.trigger("blur")
        },
        getScoreFunction: function(a) {
            return this.sifter.getScoreFunction(a, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var a = this.settings,
                b = a.sortField;
            return "string" == typeof b && (b = {
                field: b
            }), {
                fields: a.searchField,
                conjunction: a.searchConjunction,
                sort: b
            }
        },
        search: function(b) {
            var c, d, e, f = this,
                g = f.settings,
                h = this.getSearchOptions();
            if (g.score && (e = f.settings.score.apply(this, [b]), "function" != typeof e)) throw new Error('Selectize "score" setting must be a function that returns a function');
            if (b !== f.lastQuery ? (f.lastQuery = b, d = f.sifter.search(b, a.extend(h, {
                score: e
            })), f.currentResults = d) : d = a.extend(!0, {}, f.currentResults), g.hideSelected) for (c = d.items.length - 1; c >= 0; c--) - 1 !== f.items.indexOf(y(d.items[c].id)) && d.items.splice(c, 1);
            return d
        },
        refreshOptions: function(b) {
            var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            "undefined" == typeof b && (b = !0);
            var t = this,
                u = t.$control_input.val(),
                v = t.search(u),
                w = t.$dropdown_content,
                x = t.$activeOption && y(t.$activeOption.attr("data-value"));
            if (g = v.items.length, "number" == typeof t.settings.maxOptions && (g = Math.min(g, t.settings.maxOptions)), h = {}, t.settings.optgroupOrder) for (i = t.settings.optgroupOrder, c = 0; c < i.length; c++) h[i[c]] = [];
            else i = [];
            for (c = 0; g > c; c++) for (j = t.options[v.items[c].id], k = t.render("option", j), l = j[t.settings.optgroupField] || "", m = a.isArray(l) ? l : [l], e = 0, f = m && m.length; f > e; e++) l = m[e], t.optgroups.hasOwnProperty(l) || (l = ""), h.hasOwnProperty(l) || (h[l] = [], i.push(l)), h[l].push(k);
            for (n = [], c = 0, g = i.length; g > c; c++) l = i[c], t.optgroups.hasOwnProperty(l) && h[l].length ? (o = t.render("optgroup_header", t.optgroups[l]) || "", o += h[l].join(""), n.push(t.render("optgroup", a.extend({}, t.optgroups[l], {
                html: o
            })))) : n.push(h[l].join(""));
            if (w.html(n.join("")), t.settings.highlight && v.query.length && v.tokens.length) for (c = 0, g = v.tokens.length; g > c; c++) d(w, v.tokens[c].regex);
            if (!t.settings.hideSelected) for (c = 0, g = t.items.length; g > c; c++) t.getOption(t.items[c]).addClass("selected");
            p = t.settings.create && t.canCreate(v.query), p && (w.prepend(t.render("option_create", {
                input: u
            })), s = a(w[0].childNodes[0])), t.hasOptions = v.items.length > 0 || p, t.hasOptions ? (v.items.length > 0 ? (r = x && t.getOption(x), r && r.length ? q = r : "single" === t.settings.mode && t.items.length && (q = t.getOption(t.items[0])), q && q.length || (q = s && !t.settings.addPrecedence ? t.getAdjacentOption(s, 1) : w.find("[data-selectable]:first"))) : q = s, t.setActiveOption(q), b && !t.isOpen && t.open()) : (t.setActiveOption(null), b && t.isOpen && t.close())
        },
        addOption: function(b) {
            var c, d, e, f = this;
            if (a.isArray(b)) for (c = 0, d = b.length; d > c; c++) f.addOption(b[c]);
            else e = y(b[f.settings.valueField]), e && !f.options.hasOwnProperty(e) && (f.userOptions[e] = !0, f.options[e] = b, f.lastQuery = null, f.trigger("option_add", e, b))
        },
        addOptionGroup: function(a, b) {
            this.optgroups[a] = b, this.trigger("optgroup_add", a, b)
        },
        updateOption: function(b, c) {
            var d, e, f, g, h, i, j = this;
            if (b = y(b), f = y(c[j.settings.valueField]), j.options.hasOwnProperty(b)) {
                if (!f) throw new Error("Value must be set in option data");
                f !== b && (delete j.options[b], g = j.items.indexOf(b), -1 !== g && j.items.splice(g, 1, f)), j.options[f] = c, h = j.renderCache.item, i = j.renderCache.option, h && (delete h[b], delete h[f]), i && (delete i[b], delete i[f]), -1 !== j.items.indexOf(f) && (d = j.getItem(b), e = a(j.render("item", c)), d.hasClass("active") && e.addClass("active"), d.replaceWith(e)), j.isOpen && j.refreshOptions(!1)
            }
        },
        removeOption: function(a) {
            var b = this;
            a = y(a);
            var c = b.renderCache.item,
                d = b.renderCache.option;
            c && delete c[a], d && delete d[a], delete b.userOptions[a], delete b.options[a], b.lastQuery = null, b.trigger("option_remove", a), b.removeItem(a)
        },
        clearOptions: function() {
            var a = this;
            a.loadedSearches = {}, a.userOptions = {}, a.renderCache = {}, a.options = a.sifter.items = {}, a.lastQuery = null, a.trigger("option_clear"), a.clear()
        },
        getOption: function(a) {
            return this.getElementWithValue(a, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(b, c) {
            var d = this.$dropdown.find("[data-selectable]"),
                e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a()
        },
        getElementWithValue: function(b, c) {
            if (b = y(b)) for (var d = 0, e = c.length; e > d; d++) if (c[d].getAttribute("data-value") === b) return a(c[d]);
            return a()
        },
        getItem: function(a) {
            return this.getElementWithValue(a, this.$control.children())
        },
        addItems: function(b) {
            for (var c = a.isArray(b) ? b : [b], d = 0, e = c.length; e > d; d++) this.isPending = e - 1 > d, this.addItem(c[d])
        },
        addItem: function(b) {
            F(this, ["change"], function() {
                var c, d, e, f, g, h = this,
                    i = h.settings.mode;
                return b = y(b), -1 !== h.items.indexOf(b) ? void("single" === i && h.close()) : void(h.options.hasOwnProperty(b) && ("single" === i && h.clear(), "multi" === i && h.isFull() || (c = a(h.render("item", h.options[b])), g = h.isFull(), h.items.splice(h.caretPos, 0, b), h.insertAtCaret(c), (!h.isPending || !g && h.isFull()) && h.refreshState(), h.isSetup && (e = h.$dropdown_content.find("[data-selectable]"), h.isPending || (d = h.getOption(b), f = h.getAdjacentOption(d, 1).attr("data-value"), h.refreshOptions(h.isFocused && "single" !== i), f && h.setActiveOption(h.getOption(f))), !e.length || h.isFull() ? h.close() : h.positionDropdown(), h.updatePlaceholder(), h.trigger("item_add", b, c), h.updateOriginalInput()))))
            })
        },
        removeItem: function(a) {
            var b, c, d, e = this;
            b = "object" == typeof a ? a : e.getItem(a), a = y(b.attr("data-value")), c = e.items.indexOf(a), -1 !== c && (b.remove(), b.hasClass("active") && (d = e.$activeItems.indexOf(b[0]), e.$activeItems.splice(d, 1)), e.items.splice(c, 1), e.lastQuery = null, !e.settings.persist && e.userOptions.hasOwnProperty(a) && e.removeOption(a), c < e.caretPos && e.setCaret(e.caretPos - 1), e.refreshState(), e.updatePlaceholder(), e.updateOriginalInput(), e.positionDropdown(), e.trigger("item_remove", a))
        },
        createItem: function(b) {
            var c = this,
                d = a.trim(c.$control_input.val() || ""),
                e = c.caretPos;
            if (!c.canCreate(d)) return !1;
            c.lock(), "undefined" == typeof b && (b = !0);
            var f = "function" == typeof c.settings.create ? this.settings.create : function(a) {
                var b = {};
                return b[c.settings.labelField] = a, b[c.settings.valueField] = a, b
            },
                g = D(function(a) {
                    if (c.unlock(), a && "object" == typeof a) {
                        var d = y(a[c.settings.valueField]);
                        d && (c.setTextboxValue(""), c.addOption(a), c.setCaret(e), c.addItem(d), c.refreshOptions(b && "single" !== c.settings.mode))
                    }
                }),
                h = f.apply(this, [d, g]);
            return "undefined" != typeof h && g(h), !0
        },
        refreshItems: function() {
            if (this.lastQuery = null, this.isSetup) for (var a = 0; a < this.items.length; a++) this.addItem(this.items);
            this.refreshState(), this.updateOriginalInput()
        },
        refreshState: function() {
            var a, b = this;
            b.isRequired && (b.items.length && (b.isInvalid = !1), b.$control_input.prop("required", a)), b.refreshClasses()
        },
        refreshClasses: function() {
            var b = this,
                c = b.isFull(),
                d = b.isLocked;
            b.$wrapper.toggleClass("rtl", b.rtl), b.$control.toggleClass("focus", b.isFocused).toggleClass("disabled", b.isDisabled).toggleClass("required", b.isRequired).toggleClass("invalid", b.isInvalid).toggleClass("locked", d).toggleClass("full", c).toggleClass("not-full", !c).toggleClass("input-active", b.isFocused && !b.isInputHidden).toggleClass("dropdown-active", b.isOpen).toggleClass("has-options", !a.isEmptyObject(b.options)).toggleClass("has-items", b.items.length > 0), b.$control_input.data("grow", !c && !d)
        },
        isFull: function() {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function() {
            var a, b, c, d = this;
            if (d.tagType === v) {
                for (c = [], a = 0, b = d.items.length; b > a; a++) c.push('<option value="' + z(d.items[a]) + '" selected="selected"></option>');
                c.length || this.$input.attr("multiple") || c.push('<option value="" selected="selected"></option>'), d.$input.html(c.join(""))
            } else d.$input.val(d.getValue()), d.$input.attr("value", d.$input.val());
            d.isSetup && d.trigger("change", d.$input.val())
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var a = this.$control_input;
                this.items.length ? a.removeAttr("placeholder") : a.attr("placeholder", this.settings.placeholder), a.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var a = this;
            a.isLocked || a.isOpen || "multi" === a.settings.mode && a.isFull() || (a.focus(), a.isOpen = !0, a.refreshState(), a.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }), a.positionDropdown(), a.$dropdown.css({
                visibility: "visible"
            }), a.trigger("dropdown_open", a.$dropdown))
        },
        close: function() {
            var a = this,
                b = a.isOpen;
            "single" === a.settings.mode && a.items.length && a.hideInput(), a.isOpen = !1, a.$dropdown.hide(), a.setActiveOption(null), a.refreshState(), b && a.trigger("dropdown_close", a.$dropdown)
        },
        positionDropdown: function() {
            var a = this.$control,
                b = "body" === this.settings.dropdownParent ? a.offset() : a.position();
            b.top += a.outerHeight(!0), this.$dropdown.css({
                width: a.outerWidth(),
                top: b.top,
                left: b.left
            })
        },
        clear: function() {
            var a = this;
            a.items.length && (a.$control.children(":not(input)").remove(), a.items = [], a.lastQuery = null, a.setCaret(0), a.setActiveItem(null), a.updatePlaceholder(), a.updateOriginalInput(), a.refreshState(), a.showInput(), a.trigger("clear"))
        },
        insertAtCaret: function(b) {
            var c = Math.min(this.caretPos, this.items.length);
            0 === c ? this.$control.prepend(b) : a(this.$control[0].childNodes[c]).before(b), this.setCaret(c + 1)
        },
        deleteSelection: function(b) {
            var c, d, e, f, g, h, i, j, k, l = this;
            if (e = b && b.keyCode === p ? -1 : 1, f = H(l.$control_input[0]), l.$activeOption && !l.settings.hideSelected && (i = l.getAdjacentOption(l.$activeOption, -1).attr("data-value")), g = [], l.$activeItems.length) {
                for (k = l.$control.children(".active:" + (e > 0 ? "last" : "first")), h = l.$control.children(":not(input)").index(k), e > 0 && h++, c = 0, d = l.$activeItems.length; d > c; c++) g.push(a(l.$activeItems[c]).attr("data-value"));
                b && (b.preventDefault(), b.stopPropagation())
            } else(l.isFocused || "single" === l.settings.mode) && l.items.length && (0 > e && 0 === f.start && 0 === f.length ? g.push(l.items[l.caretPos - 1]) : e > 0 && f.start === l.$control_input.val().length && g.push(l.items[l.caretPos]));
            if (!g.length || "function" == typeof l.settings.onDelete && l.settings.onDelete.apply(l, [g]) === !1) return !1;
            for ("undefined" != typeof h && l.setCaret(h); g.length;) l.removeItem(g.pop());
            return l.showInput(), l.positionDropdown(), l.refreshOptions(!0), i && (j = l.getOption(i), j.length && l.setActiveOption(j)), !0
        },
        advanceSelection: function(a, b) {
            var c, d, e, f, g, h, i = this;
            0 !== a && (i.rtl && (a *= -1), c = a > 0 ? "last" : "first", d = H(i.$control_input[0]), i.isFocused && !i.isInputHidden ? (f = i.$control_input.val().length, g = 0 > a ? 0 === d.start && 0 === d.length : d.start === f, g && !f && i.advanceCaret(a, b)) : (h = i.$control.children(".active:" + c), h.length && (e = i.$control.children(":not(input)").index(h), i.setActiveItem(null), i.setCaret(a > 0 ? e + 1 : e))))
        },
        advanceCaret: function(a, b) {
            var c, d, e = this;
            0 !== a && (c = a > 0 ? "next" : "prev", e.isShiftDown ? (d = e.$control_input[c](), d.length && (e.hideInput(), e.setActiveItem(d), b && b.preventDefault())) : e.setCaret(e.caretPos + a))
        },
        setCaret: function(b) {
            var c = this;
            if (b = "single" === c.settings.mode ? c.items.length : Math.max(0, Math.min(c.items.length, b)), !c.isPending) {
                var d, e, f, g;
                for (f = c.$control.children(":not(input)"), d = 0, e = f.length; e > d; d++) g = a(f[d]).detach(), b > d ? c.$control_input.before(g) : c.$control.append(g)
            }
            c.caretPos = b
        },
        lock: function() {
            this.close(), this.isLocked = !0, this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1, this.refreshState()
        },
        disable: function() {
            var a = this;
            a.$input.prop("disabled", !0), a.isDisabled = !0, a.lock()
        },
        enable: function() {
            var a = this;
            a.$input.prop("disabled", !1), a.isDisabled = !1, a.unlock()
        },
        destroy: function() {
            var b = this,
                c = b.eventNS,
                d = b.revertSettings;
            b.trigger("destroy"), b.off(), b.$wrapper.remove(), b.$dropdown.remove(), b.$input.html("").append(d.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: d.tabindex
            }).show(), b.$control_input.removeData("grow"), b.$input.removeData("selectize"), a(window).off(c), a(document).off(c), a(document.body).off(c), delete b.$input[0].selectize
        },
        render: function(a, b) {
            var c, d, e = "",
                f = !1,
                g = this,
                h = /^[\t ]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
            return ("option" === a || "item" === a) && (c = y(b[g.settings.valueField]), f = !! c), f && (x(g.renderCache[a]) || (g.renderCache[a] = {}), g.renderCache[a].hasOwnProperty(c)) ? g.renderCache[a][c] : (e = g.settings.render[a].apply(this, [b, z]), ("option" === a || "option_create" === a) && (e = e.replace(h, "<$1 data-selectable")), "optgroup" === a && (d = b[g.settings.optgroupValueField] || "", e = e.replace(h, '<$1 data-group="' + A(z(d)) + '"')), ("option" === a || "item" === a) && (e = e.replace(h, '<$1 data-value="' + A(z(c || "")) + '"')), f && (g.renderCache[a][c] = e), e)
        },
        clearCache: function(a) {
            var b = this;
            "undefined" == typeof a ? b.renderCache = {} : delete b.renderCache[a]
        }
    }), L.count = 0, L.defaults = {
        plugins: [],
        delimiter: ",",
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        optgroupOrder: null,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        render: {}
    }, a.fn.selectize = function(b) {
        var c = a.fn.selectize.defaults,
            d = a.extend({}, c, b),
            e = d.dataAttr,
            f = d.labelField,
            g = d.valueField,
            h = d.optgroupField,
            i = d.optgroupLabelField,
            j = d.optgroupValueField,
            k = function(b, c) {
                var e, h, i, j, k = a.trim(b.val() || "");
                if (k.length) {
                    for (i = k.split(d.delimiter), e = 0, h = i.length; h > e; e++) j = {}, j[f] = i[e], j[g] = i[e], c.options[i[e]] = j;
                    c.items = i
                }
            },
            l = function(b, c) {
                var d, k, l, m, n = 0,
                    o = c.options,
                    p = function(a) {
                        var b = e && a.attr(e);
                        return "string" == typeof b && b.length ? JSON.parse(b) : null
                    },
                    q = function(b, d) {
                        var e, i;
                        if (b = a(b), e = b.attr("value") || "", e.length) {
                            if (o.hasOwnProperty(e)) return void(d && (o[e].optgroup ? a.isArray(o[e].optgroup) ? o[e].optgroup.push(d) : o[e].optgroup = [o[e].optgroup, d] : o[e].optgroup = d));
                            i = p(b) || {}, i[f] = i[f] || b.text(), i[g] = i[g] || e, i[h] = i[h] || d, i.$order = ++n, o[e] = i, b.is(":selected") && c.items.push(e)
                        }
                    },
                    r = function(b) {
                        var d, e, f, g, h;
                        for (b = a(b), f = b.attr("label"), f && (g = p(b) || {}, g[i] = f, g[j] = f, c.optgroups[f] = g), h = a("option", b), d = 0, e = h.length; e > d; d++) q(h[d], f)
                    };
                for (c.maxItems = b.attr("multiple") ? null : 1, m = b.children(), d = 0, k = m.length; k > d; d++) l = m[d].tagName.toLowerCase(), "optgroup" === l ? r(m[d]) : "option" === l && q(m[d])
            };
        return this.each(function() {
            if (!this.selectize) {
                var d, e = a(this),
                    f = this.tagName.toLowerCase(),
                    g = {
                        placeholder: e.children('option[value=""]').text() || e.attr("placeholder"),
                        options: {},
                        optgroups: {},
                        items: []
                    };
                "select" === f ? l(e, g) : k(e, g), d = new L(e, a.extend(!0, {}, c, g, b))
            }
        })
    }, a.fn.selectize.defaults = L.defaults, L.define("drag_drop", function() {
        if (!a.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var b = this;
            b.lock = function() {
                var a = b.lock;
                return function() {
                    var c = b.$control.data("sortable");
                    return c && c.disable(), a.apply(b, arguments)
                }
            }(), b.unlock = function() {
                var a = b.unlock;
                return function() {
                    var c = b.$control.data("sortable");
                    return c && c.enable(), a.apply(b, arguments)
                }
            }(), b.setup = function() {
                var c = b.setup;
                return function() {
                    c.apply(this, arguments);
                    var d = b.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: b.isLocked,
                        start: function(a, b) {
                            b.placeholder.css("width", b.helper.css("width")), d.css({
                                overflow: "visible"
                            })
                        },
                        stop: function() {
                            d.css({
                                overflow: "hidden"
                            });
                            var c = b.$activeItems ? b.$activeItems.slice() : null,
                                e = [];
                            d.children("[data-value]").each(function() {
                                e.push(a(this).attr("data-value"))
                            }), b.setValue(e), b.setActiveItem(c)
                        }
                    })
                }
            }()
        }
    }), L.define("dropdown_header", function(b) {
        var c = this;
        b = a.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(a) {
                return '<div class="' + a.headerClass + '"><div class="' + a.titleRowClass + '"><span class="' + a.labelClass + '">' + a.title + '</span><a href="javascript:void(0)" class="' + a.closeClass + '">&times;</a></div></div>'
            }
        }, b), c.setup = function() {
            var d = c.setup;
            return function() {
                d.apply(c, arguments), c.$dropdown_header = a(b.html(b)), c.$dropdown.prepend(c.$dropdown_header)
            }
        }()
    }), L.define("optgroup_columns", function(b) {
        var c = this;
        b = a.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, b), this.getAdjacentOption = function(b, c) {
            var d = b.closest("[data-group]").find("[data-selectable]"),
                e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a()
        }, this.onKeyDown = function() {
            var a = c.onKeyDown;
            return function(b) {
                var d, e, f, g;
                return !this.isOpen || b.keyCode !== j && b.keyCode !== m ? a.apply(this, arguments) : (c.ignoreHover = !0, g = this.$activeOption.closest("[data-group]"), d = g.find("[data-selectable]").index(this.$activeOption), g = b.keyCode === j ? g.prev("[data-group]") : g.next("[data-group]"), f = g.find("[data-selectable]"), e = f.eq(Math.min(f.length - 1, d)), void(e.length && this.setActiveOption(e)))
            }
        }();
        var d = function() {
            var a, b = d.width,
                c = document;
            return "undefined" == typeof b && (a = c.createElement("div"), a.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>', a = a.firstChild, c.body.appendChild(a), b = d.width = a.offsetWidth - a.clientWidth, c.body.removeChild(a)), b
        },
            e = function() {
                var e, f, g, h, i, j, k;
                if (k = a("[data-group]", c.$dropdown_content), f = k.length, f && c.$dropdown_content.width()) {
                    if (b.equalizeHeight) {
                        for (g = 0, e = 0; f > e; e++) g = Math.max(g, k.eq(e).height());
                        k.css({
                            height: g
                        })
                    }
                    b.equalizeWidth && (j = c.$dropdown_content.innerWidth() - d(), h = Math.round(j / f), k.css({
                        width: h
                    }), f > 1 && (i = j - h * (f - 1), k.eq(f - 1).css({
                        width: i
                    })))
                }
            };
        (b.equalizeHeight || b.equalizeWidth) && (B.after(this, "positionDropdown", e), B.after(this, "refreshOptions", e))
    }), L.define("remove_button", function(b) {
        if ("single" !== this.settings.mode) {
            b = a.extend({
                label: "&times;",
                title: "Remove",
                className: "remove",
                append: !0
            }, b);
            var c = this,
                d = '<a href="javascript:void(0)" class="' + b.className + '" tabindex="-1" title="' + z(b.title) + '">' + b.label + "</a>",
                e = function(a, b) {
                    var c = a.search(/(<\/[^>]+>\s*)$/);
                    return a.substring(0, c) + b + a.substring(c)
                };
            this.setup = function() {
                var f = c.setup;
                return function() {
                    if (b.append) {
                        var g = c.settings.render.item;
                        c.settings.render.item = function() {
                            return e(g.apply(this, arguments), d)
                        }
                    }
                    f.apply(this, arguments), this.$control.on("click", "." + b.className, function(b) {
                        if (b.preventDefault(), !c.isLocked) {
                            var d = a(b.currentTarget).parent();
                            c.setActiveItem(d), c.deleteSelection() && c.setCaret(c.items.length)
                        }
                    })
                }
            }()
        }
    }), L.define("restore_on_backspace", function(a) {
        var b = this;
        a.text = a.text ||
        function(a) {
            return a[this.settings.labelField]
        }, this.onKeyDown = function() {
            var c = b.onKeyDown;
            return function(b) {
                var d, e;
                return b.keyCode === p && "" === this.$control_input.val() && !this.$activeItems.length && (d = this.caretPos - 1, d >= 0 && d < this.items.length) ? (e = this.options[this.items[d]], this.deleteSelection(b) && (this.setTextboxValue(a.text.apply(this, [e])), this.refreshOptions(!0)), void b.preventDefault()) : c.apply(this, arguments)
            }
        }()
    }), L
});
//--------------------------------------------------------------------------------///
//--------------graph.js----------------------------------------------------------///
var functions = {};
var abcde;
functions.main = function(data) {
        graph = Viva.Graph.graph();
        graph.name = "Jutja project graph";
        
        var layout = Viva.Graph.Layout.forceDirected(graph, {
              springLength : 180,
              springCoeff : 0.00055,
              dragCoeff : 0.09,
              gravity : -100
          });

        var cssGraphics = Viva.Graph.View.cssGraphics();
        
        cssGraphics.node(function(node){
            var nodeUI = document.createElement('div');
            nodeUI.setAttribute('class', 'node');
            //nodeUI.title = node.data.name;
            var groupId = node.data.group;
            nodeUI.style.background = "#9edae5";
            return nodeUI;z
        });
          
        var graphics = Viva.Graph.View.svgGraphics(),
            nodeSize = 120,
          /*
                // we use this method to highlight all realted links
                // when user hovers mouse over a node:
              highlightRelatedNodes = function(nodeId, isOn) {
                   // just enumerate all realted nodes and update link color:
                   graph.forEachLinkedNode(nodeId, function(node, link){
                       var linkUI = graphics.getLinkUI(link.id);
                       if (linkUI) {
                           // linkUI is a UI object created by graphics below
                           linkUI.attr('stroke', isOn ? 'gray':'red');
                       }
                   });
                };      */
        
            renderer = Viva.Graph.View.renderer(graph, {
                  container : document.getElementById('tile'),
                  graphics : graphics,
                  layout   : layout,
                  prerender: 20,
                  renderLinks : true
                
            });
            renderer.run();
                 
            graphics.node(function(node) {
                  var arr = []; 
                  var head = [];
                  var date = node.data.due_date;
                  var color = functions.findColor(date,node.data.i_no);
                  functions.stringDivider(node.data.info, 15, arr,0);
                  functions.stringDivider(node.data.name, 13, head, 0);
                  if(head.length>1)
                    functions.wrapHead(head,13);
                  if(arr.length > 3)
                  {
                    
                      // console.log(arr);
                
                    functions.wrapString(arr,15);
                  }
                  var ui = Viva.Graph.svg('g'),
                  // Create SVG text element with user id as content
                  svgText = Viva.Graph.svg('text')
                            .attr('y', '20px')
                            .attr('x','2px')
                            .attr('font-size','18px')
                            .attr('font-weight','bold')
                            .attr('fill','#fff')
                            .text(head[0]);
                  // create svg text for the info part of node
                  var svgBody = [];         
                  for(var i=0; i<arr.length && i<3; i++)
                  {
                      var h = 50 + 15 *i;
                      svgBody[i] = Viva.Graph.svg('text')
                                    .attr('y', h)
                                    .attr('font-size','15px')
                                    .attr('x','1px')
                                    .attr('fill','#fff')
                                    .text(arr[i]);
                  }
                  var rectangle = Viva.Graph.svg('rect')
                            .attr('id', node.data.i_no)
                            .attr('width', nodeSize)
                            .attr('height', nodeSize)
                            .attr('fill', color);

                    var status = Viva.Graph.svg('text')
                            .attr('y', '115px')
                            .attr('x','2px')
                            .attr('font-size','17px')
                            .attr('font-weight','bold')
                            .attr('fill','#fff')
                            .text(node.data.status);

                  ui.append(rectangle); 
                  ui.append(svgText);
                  ui.append(status);
                  for(var i=0; i<arr.length && i<3; i++)
                  {
                      ui.append(svgBody[i]);
                  }
        
             //     $(ui).dblclick(function() { // mouse dbl click
               //           call.genModal(node.data);
               //   });
                  var hammertime = new Hammer(ui);
                  hammertime.on('doubletap', function(ev) {
                    // console.log(ev);
                     call.genModal(node.data);
                  });
                  ui.addEventListener('click', function () {
                        // toggle pinned mode
                        call.choose_parent(node.data.i_no, ui);
                        layout.pinNode(node, !layout.isNodePinned(node));
                  });
                
                  return ui;
            }).placeNode(function(nodeUI, pos) {
                nodeUI.attr('transform',
                            'translate(' +
                                  (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) +
                            ')');
            }); 
      
          var createMarker = function(id) {
                    return Viva.Graph.svg('marker')
                               .attr('id', id)
                               .attr('viewBox', "0 0 10 10")
                               .attr('refX', "10")
                               .attr('refY', "5")
                               .attr('markerUnits', "strokeWidth")
                               .attr('markerWidth', "20")
                               .attr('markerHeight', "10")
                               .attr('orient', "auto");
          },

            marker = createMarker('Triangle');
            marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z');
      
          var defs = graphics.getSvgRoot().append('defs');
              defs.append(marker);
          var geom = Viva.Graph.geom();
        
          graphics.link(function(link){
                var ui= Viva.Graph.svg('path')
                        .attr('stroke', 'gray')
                        .attr('marker-end', 'url(#Triangle)');
        
                var svgText = Viva.Graph.svg('text').attr('y', '-4px').text("deneme");  
                    ui.text("svgText");
        
                $(ui).click(function() { // mouse over
                    alert("test");
                });
              return ui;                   
          }).placeLink(function(linkUI, fromPos, toPos) {
                // Here we should take care about
                //  "Links should start/stop at node's bounding box, not at the node center."

                // For rectangular nodes Viva.Graph.geom() provides efficient way to find
                // an intersection point between segment and rectangle
                var toNodeSize = nodeSize,
                    fromNodeSize = nodeSize;

                var from = geom.intersectRect(
                        // rectangle:
                                fromPos.x - fromNodeSize / 2, // left
                                fromPos.y - fromNodeSize / 2, // top
                                fromPos.x + fromNodeSize / 2, // right
                                fromPos.y + fromNodeSize / 2, // bottom
                        // segment:
                                fromPos.x, fromPos.y, toPos.x, toPos.y)
                           || fromPos; // if no intersection found - return center of the node

                var to = geom.intersectRect(
                        // rectangle:
                                toPos.x - toNodeSize / 2, // left
                                toPos.y - toNodeSize / 2, // top
                                toPos.x + toNodeSize / 2, // right
                                toPos.y + toNodeSize / 2, // bottom
                        // segment:
                                toPos.x, toPos.y, fromPos.x, fromPos.y)
                            || toPos; // if no intersection found - return center of the node

                var data = 'M' + from.x + ',' + (from.y) +
                           'L' + to.x + ',' + (to.y);

                linkUI.attr("d", data);
            });
            // Finally we add something to the graph:
          if(data)
          {
              //add the node 
              for ( var key in data ){
                if(data.hasOwnProperty(key)){
                  graph.addNode( key , data[key] );
                }
              }
              //add the links
              for( var key in data ){
                  if(data.hasOwnProperty(key)){
                      var child = data[key].childi_no;
                      for (var i = 0; i < child.length ; i++ )
                      {
                          graph.addLink( key , child[i] );
                      }
                  }
              }
          }
          abcde = graphics;
          //center the nodes
          document.getElementById('center').onclick = function(){
             var calculator = Viva.Graph.centrality();
                var betweenness = calculator.betweennessCentrality(graph);
                if (graph.getNode(betweenness[0].key)) {
                  var pos = layout.getNodePosition(betweenness[0].key);
                  // console.log(pos);
                  renderer.moveTo(pos.x, pos.y);
                }
                else
                {
                    // console.log("Please create a map");
                }
          }
          //pinning of nodes
           document.getElementById('pin').onclick = function(){
              var pin = call.return_nodedetails().pin;
              // console.log(pin);
              graph.forEachNode(function(n){
                  var node = {
                    id: n.id,
                    data: n.data
                  };
                  if(!pin)
                  {
                      layout.pinNode(node, true);
                  }
                  else
                  {
                    layout.pinNode(node, false);
                  } 
              });
              call.change_nodedetails(!pin , "pin");
           }
           document.getElementById("reset_scale").onclick = function(){
                graphics.resetScale();
                var calculator = Viva.Graph.centrality();
                var betweenness = calculator.betweennessCentrality(graph);
                if (graph.getNode(betweenness[0].key)) {
                  var pos = layout.getNodePosition(betweenness[0].key);
                  // console.log(pos);
                  renderer.moveTo(pos.x, pos.y);
                }
           }
           if(event_mention)
           document.dispatchEvent(event_mention);
 /*   return {
        resetScale: function(){
           graphics.resetScale();
        }
    }*/
}
functions.stringDivider = function(str, width,arr,jdex){
        if (str.length>width) {
            var p=width;
            for (;p>=0 && str[p]!=' ';p--) {
          }
          if (p>0) {
            var left = str.substring(0, p);
                arr[jdex] = left;
                jdex++;
            var right = str.substring(p+1);
            functions.stringDivider(right,width,arr,jdex);
          }
          else if(p<0){                                                 //if length of word is more than width
            var left = str.substring(0, width-1);
            var trim = left.replace(/^\s+|\s+$/g, '');
              left = trim.concat("-");
            arr[jdex] = left;
                jdex++;
            var right = str.substring(width-1);
            functions.stringDivider(right,width,arr,jdex);
          }
        }
        else
        {
          arr[jdex] = str;
        }
      }
functions.wrapString = function(arr,width){
    if(arr[2])
    {
        if(arr[2].length<12)
        {
            var trim = arr[2].replace(/^\s+|\s+$/g, '');
              arr[2] = trim.concat(" ...");
        }
        else
        {
            var p = arr[2].length;
            var str = arr[2];
            for (;p>0&& str[p]!=' ';p--) {
          }
            if(p>0)
            {
                var left = str.substring(0, p);
                var trim = left.replace(/^\s+|\s+$/g, '');
                    arr[2] = trim.concat(" ...");
            }
            else
            {
                arr[2]= " ...";
            }
        }
    }
}
functions.findColor =  function(date,id){
    var colors = [
            "#D91E18", "#F39C12",
            "#2ECC71", "#9B59B6"
            ];
    var month = {"Jan":1 , "Feb" : 2,"Mar" : 3 , "Apr" : 4 , "May" : 5 , "Jun": 6, "Jul": 7, "Aug": 8 , "Sep" : 9, "Oct" : 10, "Nov" : 11, "Dec" : 12};
            if(date)
            {
              var dd = date.split(" ");         //day/mm/yyyy
              dd[0] = parseInt(dd[2]);          //dd[2] = date        
              dd[1] = month[dd[1]];             //dd[1] = month
              dd[2] = parseInt(dd[3]);          //dd[0] = year
              var today = new Date();
              var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
              if(dd[0]==today.getDate() && dd[1] == today.getMonth()+1 && dd[2] == today.getFullYear())
              {
                index = 0;
              }
              else if(dd[0]==tomorrow.getDate() && dd[1] == tomorrow.getMonth()+1 && dd[2] == tomorrow.getFullYear())
              {
                index = 1;
              }
              else 
              {
                if((dd[2] >= tomorrow.getFullYear()) && ((dd[1] > tomorrow.getMonth()+1 )|| (dd[0] > tomorrow.getDate() && dd[1] == tomorrow.getMonth()+1) || (dd[2] > tomorrow.getFullYear()) ))
                {
                  index = 2;
                }
                else
                {
                  index =3;
                }
              }
          }
          else
          {
            index = id%4;
          }
          return (colors[index]);
} 
functions.wrapHead = function(arr,width){       
   if(arr[0])
   {
    if(arr[0].length<10)
        {
            var trim = arr[0].replace(/^\s+|\s+$/g, '');
              arr[0] = trim.concat(" ...");
        }
    else
    {
        if(arr[0].indexOf(' ') >= 0)
        {
            var p = arr[0].length;
            var str = arr[0];
            for (; str[p]!=' ';p--) {
            }
            if(p>0)
            {
                var left = str.substring(0, p);
                var trim = left.replace(/^\s+|\s+$/g, '');
                    arr[0] = trim.concat(" ...");
            }
        }
        else
        {
            var left = arr[0].substring(0, 10);
             var trim = left.replace(/^\s+|\s+$/g, '');
            arr[0] = trim.concat("...");
        }
    }
  } 
}
