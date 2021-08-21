(this["webpackJsonpmovie-house"] = this["webpackJsonpmovie-house"] || []).push([
  [0],
  {
    37: function (e, t, c) {},
    63: function (e, t, c) {
      "use strict";
      c.r(t);
      var n = c(2),
        r = c.n(n),
        a = c(30),
        s = c.n(a),
        l = (c(37), c(18)),
        o = c(3),
        i = c(1),
        u = function () {
          return Object(i.jsxs)("div", {
            className: "w-full pt-4",
            children: [
              Object(i.jsx)("h1", {
                className:
                  "w-max mx-auto mb-1 text-blue-800 text-2xl font-bold",
                children: "Movie House",
              }),
              Object(i.jsx)("p", {
                className: "w-max mx-auto text-blue-600",
                children: "by ianlcz",
              }),
            ],
          });
        },
        d = c(9),
        x = c.n(d),
        j = c(14),
        m = c(12),
        b = c(31),
        h = c(10),
        f = c.n(h),
        p = function () {
          var e = Object(n.useState)([]),
            t = Object(m.a)(e, 2),
            c = t[0],
            r = t[1],
            a = Object(n.useState)(""),
            s = Object(m.a)(a, 2),
            l = s[0],
            o = s[1];
          return (
            Object(n.useEffect)(
              function () {
                (function () {
                  var e = Object(j.a)(
                    x.a.mark(function e() {
                      var t;
                      return x.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                f.a
                                  .get("https://localhost:5000")
                                  .then(function (e) {
                                    return e.data;
                                  })
                                  .catch(function (e) {
                                    return console.error(e.message);
                                  })
                              );
                            case 2:
                              (t = e.sent),
                                "" !== l
                                  ? (console.log("1"),
                                    r(
                                      t.filter(function (e) {
                                        return e.title
                                          .toLowerCase()
                                          .includes(l.toLowerCase());
                                      })
                                    ))
                                  : (console.log("2"), r(t));
                            case 4:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })()();
              },
              [l]
            ),
            Object(i.jsxs)("div", {
              className: "flex flex-col w-full",
              children: [
                Object(i.jsx)("input", {
                  type: "text",
                  value: l,
                  onChange: function (e) {
                    return o(e.target.value);
                  },
                  placeholder: "Rechercher un film",
                  className:
                    "w-1/4 mx-auto mt-6 mb-8 pl-6 h-12 border border-blue-500 text-blue-600 font-medium rounded-full placeholder-blue-400",
                }),
                c
                  ? Object(i.jsx)("ul", {
                      className: "w-1/3 mx-auto",
                      children: c.map(function (e) {
                        return Object(i.jsx)(
                          "li",
                          {
                            children: Object(i.jsxs)("a", {
                              href: "/movie/".concat(e.title.toLowerCase()),
                              className: "flex flex-row mb-2",
                              children: [
                                Object(i.jsx)("p", {
                                  className:
                                    "flex items-center justify-center w-16 h-6 mr-4 shadow-inner bg-gradient-to-br from-blue-800 to-blue-500 text-white text-center text-sm font-semibold rounded-xl",
                                  children: e.ref,
                                }),
                                Object(i.jsx)("p", {
                                  className: "text-blue-700 font-light",
                                  children: e.title,
                                }),
                              ],
                            }),
                          },
                          e._id
                        );
                      }),
                    })
                  : Object(i.jsxs)("div", {
                      className: "flex items-center w-max mx-auto mt-60",
                      children: [
                        Object(i.jsx)(b.a, {
                          className: "w-6 mr-2 h-6 text-blue-800",
                        }),
                        Object(i.jsx)("p", {
                          className: "text-blue-600 text-sm font-semibold",
                          children: "Nous n'avons pas trouv\xe9 de films !",
                        }),
                      ],
                    }),
              ],
            })
          );
        },
        O = function () {
          return Object(i.jsxs)("div", {
            className: "bg-blue-50 min-h-screen",
            children: [Object(i.jsx)(u, {}), Object(i.jsx)(p, {})],
          });
        },
        g = c(15),
        v = function (e) {
          if ("number" === typeof e)
            return ""
              .concat(parseInt(e / 60), " h ")
              .concat(
                0 === Math.round(60 * (e / 60 - parseInt(e / 60)))
                  ? ""
                  : Math.round(60 * (e / 60 - parseInt(e / 60))) < 10
                  ? "0" +
                    Math.round((60 * (e / 60 - parseInt(e / 60))).toFixed(1))
                  : Math.round((60 * (e / 60 - parseInt(e / 60))).toFixed(1))
              );
          throw new Error("Your time is not of Number type !");
        },
        w = function (e) {
          return null === e || isNaN(e)
            ? 0
            : String(e).length >= 10
            ? "".concat(Math.round(e / 1e9), " Mrds")
            : String(e).length >= 7
            ? "".concat(
                (e / 1e6).toFixed(
                  (e / 1e6 - (e / 1e6).toFixed(0)).toFixed(1) < 0.1 ? 0 : 1
                ),
                " M"
              )
            : String(e).length >= 4
            ? "".concat(
                (e / 1e3).toFixed(
                  (e / 1e3 - (e / 1e3).toFixed(0)).toFixed(1) < 0.1 ? 0 : 1
                ),
                " k"
              )
            : e;
        },
        N = function (e) {
          var t = e.data,
            c = t.cover,
            n = t.title,
            r = e.children;
          return Object(i.jsxs)("section", {
            className: "w-full h-auto mx-auto z-0 relative",
            children: [
              c
                ? Object(i.jsx)("img", {
                    src: c,
                    className: "w-full h-full object-cover z-0 absolute",
                    alt: "Couverture du film : ".concat(n),
                  })
                : void 0,
              Object(i.jsx)("div", {
                className:
                  "top-0 left-0 w-full h-full px-8 py-6 text-white bg-blue-900 ".concat(
                    c ? "bg-opacity-70" : void 0,
                    " z-10 relative"
                  ),
                children: r,
              }),
            ],
          });
        },
        y = function (e) {
          var t = e.children;
          return Object(i.jsxs)("div", {
            className: "flex flex-row w-max mx-auto items-center",
            children: [
              Object(i.jsx)(g.c, { size: 17 }),
              Object(i.jsx)("p", {
                className: "font-light ml-1.5 text-sm",
                children: v(t),
              }),
            ],
          });
        },
        F = function (e) {
          var t = e.children,
            c = t.detail,
            n = c.ref,
            r = c.backdrop_path,
            a = c.title,
            s = c.tagline,
            l = c.genres,
            o = c.runtime,
            u = c.poster_path,
            d = c.vote_average,
            x = c.budget,
            j = c.revenue,
            m = c.release_date,
            b = t.directors;
          return 0 !== b.length
            ? Object(i.jsx)(N, {
                data: {
                  cover: "https://image.tmdb.org/t/p/original/".concat(r),
                  title: a,
                },
                children: Object(i.jsxs)("div", {
                  className:
                    "flex flex-row mt-4 mb-14 items-center justify-evenly",
                  children: [
                    Object(i.jsx)("img", {
                      src: "https://image.tmdb.org/t/p/original/".concat(u),
                      alt: "Affiche du film : ".concat(a),
                      className: "w-40 rounded-lg shadow-lg",
                    }),
                    Object(i.jsxs)("div", {
                      className: "flex flex-col w-1/2",
                      children: [
                        Object(i.jsx)("p", {
                          className:
                            "w-16 mx-auto mb-2 px-2 py-0.5 text-xs text-center font-semibold rounded-full bg-gradient-to-tr from-blue-800 to-blue-500",
                          children: n,
                        }),
                        Object(i.jsxs)("div", {
                          className:
                            "flex flex-row w-max mx-auto mb-2 items-center",
                          children: [
                            Object(i.jsx)("h1", {
                              className: "text-4xl font-semibold",
                              children: a,
                            }),
                            Object(i.jsxs)("span", {
                              className: "ml-2 text-2xl font-light",
                              children: ["(", new Date(m).getFullYear(), ")"],
                            }),
                          ],
                        }),
                        Object(i.jsx)("div", {
                          className: "flex flex-row w-max mx-auto",
                          children:
                            l &&
                            Object(i.jsxs)(i.Fragment, {
                              children: [
                                Object(i.jsx)("ul", {
                                  className: "flex flex-row",
                                  children: l.map(function (e, t) {
                                    return Object(i.jsx)(
                                      "li",
                                      {
                                        className: "ml-1 ".concat(
                                          t === l.length - 1
                                            ? "truncate"
                                            : void 0
                                        ),
                                        children: Object(i.jsxs)("p", {
                                          children: [
                                            e.name,
                                            t === l.length - 1 ? void 0 : ", ",
                                          ],
                                        }),
                                      },
                                      e.name
                                    );
                                  }),
                                }),
                                Object(i.jsxs)(i.Fragment, {
                                  children: [
                                    Object(i.jsx)("p", {
                                      className: "mx-2",
                                      children: "\u2022",
                                    }),
                                    Object(i.jsx)(y, { children: o }),
                                  ],
                                }),
                              ],
                            }),
                        }),
                        Object(i.jsxs)("div", {
                          className: "my-4",
                          children: [
                            Object(i.jsx)("p", {
                              className:
                                "font-medium text-blue-100 text-center mb-2",
                              children: "Un film de",
                            }),
                            Object(i.jsx)("ul", {
                              className: "flex flex-row justify-evenly",
                              children: b.map(function (e) {
                                return Object(i.jsxs)(
                                  "li",
                                  {
                                    className: "flex flex-row items-center",
                                    children: [
                                      e.profile_path
                                        ? Object(i.jsx)("img", {
                                            src: "https://image.tmdb.org/t/p/original/".concat(
                                              e.profile_path
                                            ),
                                            alt: "Profil de : ".concat(e.name),
                                            className:
                                              "mr-2 rounded-full w-8 h-8 object-cover shadow",
                                          })
                                        : void 0,
                                      Object(i.jsx)("p", {
                                        className: "text-sm",
                                        children: e.name,
                                      }),
                                    ],
                                  },
                                  e.id
                                );
                              }),
                            }),
                          ],
                        }),
                        s
                          ? Object(i.jsx)("p", {
                              className: "mb-4 text-sm italic text-center",
                              children: s,
                            })
                          : void 0,
                        Object(i.jsxs)("table", {
                          className:
                            "w-1/2 mx-auto bg-blue-100 bg-opacity-95 rounded-full",
                          children: [
                            Object(i.jsx)("thead", {
                              children: Object(i.jsxs)("tr", {
                                className: "text-base text-blue-800",
                                children: [
                                  Object(i.jsx)("th", { children: "Score" }),
                                  x
                                    ? Object(i.jsx)("th", {
                                        children: "Budget",
                                      })
                                    : void 0,
                                  j
                                    ? Object(i.jsx)("th", {
                                        children: "Recette",
                                      })
                                    : void 0,
                                ],
                              }),
                            }),
                            Object(i.jsx)("tbody", {
                              children: Object(i.jsxs)("tr", {
                                className: "text-sm text-blue-600",
                                children: [
                                  Object(i.jsx)("td", {
                                    className: "text-center",
                                    children: "".concat(10 * d, "%"),
                                  }),
                                  x
                                    ? Object(i.jsx)("td", {
                                        className: "text-center",
                                        children: w(x),
                                      })
                                    : void 0,
                                  j
                                    ? Object(i.jsxs)("td", {
                                        className:
                                          "flex flex-row w-max mx-auto",
                                        children: [
                                          Object(i.jsx)("p", {
                                            children: w(j),
                                          }),
                                          x > 0
                                            ? Object(i.jsxs)("div", {
                                                className:
                                                  "flex flex-row ml-2 items-center ".concat(
                                                    Math.round(
                                                      100 * (j / x - 1)
                                                    ) < 50
                                                      ? "text-red-600"
                                                      : "text-blue-600"
                                                  ),
                                                children: [
                                                  Math.round(
                                                    100 * (j / x - 1)
                                                  ) < 50
                                                    ? Object(i.jsx)(g.a, {})
                                                    : Object(i.jsx)(g.b, {}),
                                                  Object(i.jsx)("p", {
                                                    className: "ml-0.5 text-xs",
                                                    children: "".concat(
                                                      Math.round(
                                                        100 * (j / x - 1)
                                                      ),
                                                      "%"
                                                    ),
                                                  }),
                                                ],
                                              })
                                            : void 0,
                                        ],
                                      })
                                    : void 0,
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              })
            : null;
        },
        _ = function () {
          return Object(i.jsx)("div", {
            className: "bg-blue-50 h-screen -mt-10 rounded-2xl z-10 relative",
            children: Object(i.jsx)("p", {}),
          });
        },
        M = function () {
          var e = Object(o.f)().title,
            t = Object(n.useState)({}),
            c = Object(m.a)(t, 2),
            r = c[0],
            a = c[1],
            s = Object(n.useState)([]),
            l = Object(m.a)(s, 2),
            u = l[0],
            d = l[1],
            b = Object(n.useState)([]),
            h = Object(m.a)(b, 2),
            p = h[0],
            O = h[1],
            g = "aeeca3eb934c595a32cbd53a16f76f64",
            v = (function () {
              var t = Object(j.a)(
                x.a.mark(function t() {
                  var c;
                  return x.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2),
                            f.a
                              .get("https://localhost:5000")
                              .then(function (e) {
                                return e.data;
                              })
                              .catch(function (e) {
                                return console.error(e.message);
                              })
                          );
                        case 2:
                          return (
                            (c = t.sent),
                            t.abrupt(
                              "return",
                              c.filter(function (t) {
                                return t.title === decodeURI(e);
                              })[0]
                            )
                          );
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              );
              return function () {
                return t.apply(this, arguments);
              };
            })();
          return (
            Object(n.useEffect)(
              function () {
                (function () {
                  var e = Object(j.a)(
                    x.a.mark(function e() {
                      var t, c, n, r, s;
                      return x.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), v();
                            case 2:
                              return (
                                (t = e.sent),
                                (e.next = 5),
                                f.a
                                  .get(
                                    "https://api.themoviedb.org/3/search/movie?query="
                                      .concat(t.title, "&api_key=")
                                      .concat(
                                        g,
                                        "&language=fr-FR&primary_release_year="
                                      )
                                      .concat(t.year)
                                  )
                                  .then(function (e) {
                                    return e.data.results;
                                  })
                                  .catch(function (e) {
                                    return console.error(e.message);
                                  })
                              );
                            case 5:
                              return (
                                (c = e.sent),
                                (n = c.filter(function (e) {
                                  return (
                                    e.original_title.toLowerCase() ===
                                      t.title.toLowerCase() ||
                                    e.title.toLowerCase() ===
                                      t.title.toLowerCase()
                                  );
                                })[0].id),
                                (e.next = 9),
                                f.a
                                  .get(
                                    "https://api.themoviedb.org/3/movie/"
                                      .concat(n, "?api_key=")
                                      .concat(g, "&language=fr-FR")
                                  )
                                  .then(function (e) {
                                    return e.data;
                                  })
                                  .catch(function (e) {
                                    return console.error(e.message);
                                  })
                              );
                            case 9:
                              return (
                                ((r = e.sent).ref = t.ref),
                                a(r),
                                (e.next = 14),
                                f.a
                                  .get(
                                    "https://api.themoviedb.org/3/movie/"
                                      .concat(n, "/credits?api_key=")
                                      .concat(g, "&language=fr-FR")
                                  )
                                  .then(function (e) {
                                    return e.data.crew;
                                  })
                                  .catch(function (e) {
                                    return console.error(e.message);
                                  })
                              );
                            case 14:
                              return (
                                (s = e.sent),
                                d(
                                  s.filter(function (e) {
                                    return "Director" === e.job;
                                  })
                                ),
                                (e.t0 = O),
                                (e.next = 19),
                                f.a
                                  .get(
                                    "https://api.themoviedb.org/3/movie/"
                                      .concat(n, "/credits?api_key=")
                                      .concat(g, "&language=fr-FR")
                                  )
                                  .then(function (e) {
                                    return e.data.cast;
                                  })
                                  .catch(function (e) {
                                    return console.error(e.message);
                                  })
                              );
                            case 19:
                              (e.t1 = e.sent), (0, e.t0)(e.t1);
                            case 21:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })()();
              },
              [e]
            ),
            console.log(r, p),
            Object(i.jsxs)(i.Fragment, {
              children: [
                Object(i.jsx)(F, { children: { detail: r, directors: u } }),
                Object(i.jsx)(_, {}),
              ],
            })
          );
        },
        k = function () {
          return Object(i.jsx)(l.a, {
            children: Object(i.jsxs)(o.c, {
              children: [
                Object(i.jsx)(o.a, {
                  exact: !0,
                  path: "/",
                  children: Object(i.jsx)(O, {}),
                }),
                Object(i.jsx)(o.a, {
                  path: "/movie/:title",
                  children: Object(i.jsx)(M, {}),
                }),
              ],
            }),
          });
        };
      s.a.render(
        Object(i.jsx)(r.a.StrictMode, { children: Object(i.jsx)(k, {}) }),
        document.getElementById("root")
      );
    },
  },
  [[63, 1, 2]],
]);
//# sourceMappingURL=main.ae241a9b.chunk.js.map
