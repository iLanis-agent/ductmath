// Duct Math engine: the straight sections a duct run takes, the hangers along it, the tape and rolls for the joints, and the cost. Exact integers, half-up on display only. Named constant: 12 inches in a foot. Every other number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _RUN = "the duct run must be from 1 to 100000 ft with no decimal places";
var _SEC = "the section length must be from 1 to 50 ft with no decimal places";
var _GAP = "the hanger gap must be from 1 to 100 ft with no decimal places";
var _NJ = "the joint count must be from 1 to 100000 with no decimal places";
var _TI = "the tape a joint must be from 1 to 1000 inches with no decimal places";
var _RL = "the roll length must be from 1 to 1000 ft with no decimal places";
var _NSC = "the section count must be from 1 to 100000 with no decimal places";
var _NRL = "the roll count must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function sectionsTruth(run, sec) {
  var r = _i(run, _RUN, 6, 1, 100000), s = _i(sec, _SEC, 2, 1, 50);
  var n = Math.floor((r + s - 1) / s), left = n * s - r;
  return "The " + r + " ft of duct run in " + s + " ft sections takes " + _pl(n, " section", " sections") + ", leaving " + left + " ft.";
}
function hangersTruth(run, gap) {
  var r = _i(run, _RUN, 6, 1, 100000), g = _i(gap, _GAP, 3, 1, 100);
  var n = Math.floor((r + g - 1) / g) + 1;
  return "The " + r + " ft of duct run with hangers " + g + " ft apart takes " + _pl(n, " hanger", " hangers") + ".";
}
function tapeTruth(joints, inches, roll) {
  var j = _i(joints, _NJ, 6, 1, 100000), t = _i(inches, _TI, 4, 1, 1000), r = _i(roll, _RL, 4, 1, 1000);
  var tot = j * t, ft = Math.floor((tot + 11) / 12), k = Math.floor((ft + r - 1) / r), left = k * r - ft;
  return "The " + _pl(j, " joint", " joints") + " at " + t + " inches of tape each take " + tot + " inches, " + ft + " ft, and in " + r + " ft rolls that is " + _pl(k, " roll", " rolls") + ", leaving " + left + " ft.";
}
function costTruth(sections, sprice, rolls, rprice) {
  var n = _i(sections, _NSC, 6, 1, 100000), p = _p(sprice, _PRICE, 5, 2, 1, 1000000), k = _i(rolls, _NRL, 6, 1, 100000), q = _p(rprice, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(n, " section", " sections") + " at $" + _dec(p, 2) + " and " + _pl(k, " roll", " rolls") + " at $" + _dec(q, 2) + " cost $" + _money(n * p + k * q) + ", sections $" + _money(n * p) + " and rolls $" + _money(k * q) + ".";
}
