google.maps.__gjsload__('geometry', function (_) {
    var Qw = function (a, b) {
        return Math.abs(_.eb(b - a, -180, 180))
    }, Tw = function (a, b, c, d, e) {
        if (!d) {
            c = Qw(a.lng(), c) / Qw(a.lng(), b.lng());
            if (!e)return e = Math.sin(_.jc(a.lat())), e = Math.log((1 + e) / (1 - e)) / 2, b = Math.sin(_.jc(b.lat())), _.nc(2 * Math.atan(Math.exp(e + c * (Math.log((1 + b) / (1 - b)) / 2 - e))) - Math.PI / 2);
            a = e.fromLatLngToPoint(a);
            b = e.fromLatLngToPoint(b);
            return e.fromPointToLatLng(new _.G(a.x + c * (b.x - a.x), a.y + c * (b.y - a.y))).lat()
        }
        e = _.jc(a.lat());
        a = _.jc(a.lng());
        d = _.jc(b.lat());
        b = _.jc(b.lng());
        c = _.jc(c);
        return _.eb(_.nc(Math.atan2(Math.sin(e) *
            Math.cos(d) * Math.sin(c - b) - Math.sin(d) * Math.cos(e) * Math.sin(c - a), Math.cos(e) * Math.cos(d) * Math.sin(a - b))), -90, 90)
    }, Ww = _.ma(), Xw = {
        containsLocation: function (a, b) {
            for (var c = _.eb(a.lng(), -180, 180), d = !!b.get("geodesic"), e = b.get("latLngs"), f = b.get("map"), f = !d && f ? f.getProjection() : null, g = !1, h = 0, l = e.getLength(); h < l; ++h)for (var n = e.getAt(h), q = 0, r = n.getLength(); q < r; ++q) {
                var u = n.getAt(q), A = n.getAt((q + 1) % r), B = _.eb(u.lng(), -180, 180), E = _.eb(A.lng(), -180, 180), z = Math.max(B, E), B = Math.min(B, E);
                (180 < z - B ? c >= z || c < B : c < z &&
                    c >= B) && Tw(u, A, c, d, f) < a.lat() && (g = !g)
            }
            return g || Xw.isLocationOnEdge(a, b)
        }, isLocationOnEdge: function (a, b, c) {
            c = c || 1E-9;
            var d = _.eb(a.lng(), -180, 180), e = b instanceof _.Le, f = !!b.get("geodesic"), g = b.get("latLngs");
            b = b.get("map");
            b = !f && b ? b.getProjection() : null;
            for (var h = 0, l = g.getLength(); h < l; ++h)for (var n = g.getAt(h), q = n.getLength(), r = e ? q : q - 1, u = 0; u < r; ++u) {
                var A = n.getAt(u), B = n.getAt((u + 1) % q), E = _.eb(A.lng(), -180, 180), z = _.eb(B.lng(), -180, 180), H = Math.max(E, z), D = Math.min(E, z);
                if (E = 1E-9 >= Math.abs(_.eb(E - z, -180, 180)) &&
                        (Math.abs(_.eb(E - d, -180, 180)) <= c || Math.abs(_.eb(z - d, -180, 180)) <= c))var E = a.lat(), z = Math.min(A.lat(), B.lat()) - c, J = Math.max(A.lat(), B.lat()) + c, E = E >= z && E <= J;
                if (E)return !0;
                if (180 < H - D ? d + c >= H || d - c <= D : d + c >= D && d - c <= H)if (A = Tw(A, B, d, f, b), Math.abs(A - a.lat()) < c)return !0
            }
            return !1
        }
    };
    var Yw = {
        computeHeading: function (a, b) {
            var c = _.Gc(a), d = _.Hc(a);
            a = _.Gc(b);
            b = _.Hc(b) - d;
            return _.eb(_.nc(Math.atan2(Math.sin(b) * Math.cos(a), Math.cos(c) * Math.sin(a) - Math.sin(c) * Math.cos(a) * Math.cos(b))), -180, 180)
        }, computeOffset: function (a, b, c, d) {
            b /= d || 6378137;
            c = _.jc(c);
            var e = _.Gc(a);
            a = _.Hc(a);
            d = Math.cos(b);
            b = Math.sin(b);
            var f = Math.sin(e), e = Math.cos(e), g = d * f + b * e * Math.cos(c);
            return new _.C(_.nc(Math.asin(g)), _.nc(a + Math.atan2(b * e * Math.sin(c), d - f * g)))
        }, computeOffsetOrigin: function (a, b, c, d) {
            c = _.jc(c);
            b /= d ||
                6378137;
            d = Math.cos(b);
            var e = Math.sin(b) * Math.cos(c);
            b = Math.sin(b) * Math.sin(c);
            c = Math.sin(_.Gc(a));
            var f = e * e * d * d + d * d * d * d - d * d * c * c;
            if (0 > f)return null;
            var g = e * c + Math.sqrt(f), g = g / (d * d + e * e), h = (c - e * g) / d, g = Math.atan2(h, g);
            if (g < -Math.PI / 2 || g > Math.PI / 2) g = e * c - Math.sqrt(f), g = Math.atan2(h, g / (d * d + e * e));
            if (g < -Math.PI / 2 || g > Math.PI / 2)return null;
            a = _.Hc(a) - Math.atan2(b, d * Math.cos(g) - e * Math.sin(g));
            return new _.C(_.nc(g), _.nc(a))
        }, interpolate: function (a, b, c) {
            var d = _.Gc(a), e = _.Hc(a), f = _.Gc(b), g = _.Hc(b), h = Math.cos(d),
                l = Math.cos(f);
            b = Yw.Je(a, b);
            var n = Math.sin(b);
            if (1E-6 > n)return new _.C(a.lat(), a.lng());
            a = Math.sin((1 - c) * b) / n;
            c = Math.sin(c * b) / n;
            b = a * h * Math.cos(e) + c * l * Math.cos(g);
            e = a * h * Math.sin(e) + c * l * Math.sin(g);
            return new _.C(_.nc(Math.atan2(a * Math.sin(d) + c * Math.sin(f), Math.sqrt(b * b + e * e))), _.nc(Math.atan2(e, b)))
        }, Je: function (a, b) {
            var c = _.Gc(a);
            a = _.Hc(a);
            var d = _.Gc(b);
            b = _.Hc(b);
            return 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((c - d) / 2), 2) + Math.cos(c) * Math.cos(d) * Math.pow(Math.sin((a - b) / 2), 2)))
        }, computeDistanceBetween: function (a,
                                             b, c) {
            c = c || 6378137;
            return Yw.Je(a, b) * c
        }, computeLength: function (a, b) {
            b = b || 6378137;
            var c = 0;
            a instanceof _.wd && (a = a.getArray());
            for (var d = 0, e = a.length - 1; d < e; ++d)c += Yw.computeDistanceBetween(a[d], a[d + 1], b);
            return c
        }, computeArea: function (a, b) {
            return Math.abs(Yw.computeSignedArea(a, b))
        }, computeSignedArea: function (a, b) {
            b = b || 6378137;
            a instanceof _.wd && (a = a.getArray());
            for (var c = a[0], d = 0, e = 1, f = a.length - 1; e < f; ++e)d += Yw.lk(c, a[e], a[e + 1]);
            return d * b * b
        }, lk: function (a, b, c) {
            return Yw.mk(a, b, c) * Yw.ql(a, b, c)
        }, mk: function (a,
                         b, c) {
            var d = [a, b, c, a];
            a = [];
            for (c = b = 0; 3 > c; ++c)a[c] = Yw.Je(d[c], d[c + 1]), b += a[c];
            b /= 2;
            d = Math.tan(b / 2);
            for (c = 0; 3 > c; ++c)d *= Math.tan((b - a[c]) / 2);
            return 4 * Math.atan(Math.sqrt(Math.abs(d)))
        }, ql: function (a, b, c) {
            a = [a, b, c];
            b = [];
            for (c = 0; 3 > c; ++c) {
                var d = a[c], e = _.Gc(d), d = _.Hc(d), f = b[c] = [];
                f[0] = Math.cos(e) * Math.cos(d);
                f[1] = Math.cos(e) * Math.sin(d);
                f[2] = Math.sin(e)
            }
            return 0 < b[0][0] * b[1][1] * b[2][2] + b[1][0] * b[2][1] * b[0][2] + b[2][0] * b[0][1] * b[1][2] - b[0][0] * b[2][1] * b[1][2] - b[1][0] * b[0][1] * b[2][2] - b[2][0] * b[1][1] * b[0][2] ?
                1 : -1
        }
    };
    var Zw = {
        decodePath: function (a) {
            for (var b = _.w(a), c = Array(Math.floor(a.length / 2)), d = 0, e = 0, f = 0, g = 0; d < b; ++g) {
                var h = 1, l = 0, n;
                do n = a.charCodeAt(d++) - 63 - 1, h += n << l, l += 5; while (31 <= n);
                e += h & 1 ? ~(h >> 1) : h >> 1;
                h = 1;
                l = 0;
                do n = a.charCodeAt(d++) - 63 - 1, h += n << l, l += 5; while (31 <= n);
                f += h & 1 ? ~(h >> 1) : h >> 1;
                c[g] = new _.C(1E-5 * e, 1E-5 * f, !0)
            }
            c.length = g;
            return c
        }, encodePath: function (a) {
            a instanceof _.wd && (a = a.getArray());
            return Zw.Hm(a, function (a) {
                return [Math.round(1E5 * a.lat()), Math.round(1E5 * a.lng())]
            })
        }, Hm: function (a, b) {
            for (var c = [],
                     d = [0, 0], e, f = 0, g = _.w(a); f < g; ++f)e = b ? b(a[f]) : a[f], Zw.vh(e[0] - d[0], c), Zw.vh(e[1] - d[1], c), d = e;
            return c.join("")
        }, vh: function (a, b) {
            return Zw.Im(0 > a ? ~(a << 1) : a << 1, b)
        }, Im: function (a, b) {
            for (; 32 <= a;)b.push(String.fromCharCode((32 | a & 31) + 63)), a >>= 5;
            b.push(String.fromCharCode(a + 63));
            return b
        }
    };
    _.Ub.google.maps.geometry = {encoding: Zw, spherical: Yw, poly: Xw};
    _.k = Ww.prototype;
    _.k.decodePath = Zw.decodePath;
    _.k.encodePath = Zw.encodePath;
    _.k.computeDistanceBetween = Yw.computeDistanceBetween;
    _.k.interpolate = Yw.interpolate;
    _.k.computeHeading = Yw.computeHeading;
    _.k.computeOffset = Yw.computeOffset;
    _.k.computeOffsetOrigin = Yw.computeOffsetOrigin;
    _.Xc("geometry", new Ww);
});
