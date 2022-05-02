function get_sif_ktx_from_s_and_i(s, i) {
  let s_ktx = get_ktx_from_num(s);
  let i_ktx = get_ktx_from_num(math.abs(i));

  let i_ktx_signed   = math.smaller(i, 0) ? `-${i_ktx}` : `+${i_ktx}`;
  let i_ktx_implicit = math.smaller(i, 0) ? `-${i_ktx}` :  `${i_ktx}`;

  let s_part = (
    math.equal(s, 0)  ? "" :
    math.equal(s, 1)  ? "x" :
    math.equal(s, -1) ? "-x" :
    `${s_ktx}x`
  );

  let i_part = math.equal(i, 0) ? "" : i_ktx_signed;

  let rhs = (
    s_part === "" ?                  // no slope
      i_part === "" ? "0" :          // ... nor y-int;       form: y = 0
      i_ktx_implicit :               // ... only y-int; form: y = b (trim leading +)
    `${s_part}${i_part}`           // has slope;           form: y = mx + b or y = mx
  );

  return `y=${rhs}`;
}

function calculate_yint_from_point_and_slope(p, s) {
  // y = mx + b
  // y - mx = b
  // b = y - mx
  return math.subtract(p.y, math.multiply(s, p.x));
}

function calculate_eqn_from_2p() {
  let p1 = get_point_val(get_input_box(0));
  let p2 = get_point_val(get_input_box(1));

  if (p1 === null || p2 === null) {
    return error_msg_ktx("Error: You forgot a box or two.");
  }

  let rise = math.subtract(p2.y, p1.y);
  let run  = math.subtract(p2.x, p1.x);

  if (math.equal(run, 0)) {
    return error_msg_ktx("Error: This is a vertical line (not a function).");
  }

  let s = math.divide(rise, run);
  let i = calculate_yint_from_point_and_slope(p1, s);

  return get_sif_ktx_from_s_and_i(s, i);
}

function calculate_eqn_from_1p_1m() {
  let p = get_point_val(get_input_box(0));

  if (p === null) {
    return error_msg_ktx("Error: You must specify both point coordinates.");
  }

  let s = get_slope_val(get_input_box(1));

  if (s === null) {
    return error_msg_ktx("Error: You must specify the slope.");
  }

  let i = calculate_yint_from_point_and_slope(p, s);

  return get_sif_ktx_from_s_and_i(s, i);
}

function calculate_crd_from_2p_1m() {
  let s = get_slope_val(get_input_box(2));

  if (s === null) {
    return error_msg_ktx("Error: You must specify the slope.");
  }

  let p1x = get_input_val(get_input_box(0), 0);
  let p1y = get_input_val(get_input_box(0), 1);
  let p2x = get_input_val(get_input_box(1), 0);
  let p2y = get_input_val(get_input_box(1), 1);

  let missing = [p1x, p1y, p2x, p2y].filter(n => n === null).length;

  if (missing === 0) {
    return error_msg_ktx("Error: You already have the missing coordinate!");
  }

  if (missing > 1) {
    return error_msg_ktx("Error: Too many missing coordinates.");
  }

  let solved = null, which = null;
  
  switch (null) {
  case p1x: solved = math.add(p2x, math.divide  (math.subtract(p2y, p1y), math.subtract(0, s))); which = "x_1"; break;
  case p2x: solved = math.add(p1x, math.divide  (math.subtract(p2y, p1y),                   s)); which = "x_2"; break;
  case p1y: solved = math.add(p2y, math.multiply(math.subtract(p2x, p1x), math.subtract(0, s))); which = "y_1"; break;
  case p2y: solved = math.add(p1y, math.multiply(math.subtract(p2x, p1x),                   s)); which = "y_2"; break;
  }

  if (solved === null || which === null) {
    return error_msg_ktx("Error: The program reached an impossible state!");
  }

  solved = get_ktx_from_num(solved);

  return `${which}=${solved}`;
}

function calculate_xic_from_1e() {
  /*
   * X-Intercept: f(x) = mx + b = 0
   *
   * mx = -b
   * x = -b / m
   */

  let m = get_input_val(get_input_box(0), 0);
  let b = get_input_val(get_input_box(0), 1);

  if (m === null || b === null) {
    return error_msg_ktx("Error: You must specify both slope and y-intercept.");
  }

  let x = get_ktx_from_num(math.divide(math.subtract(0, b), m));

  return `y=0\\space\\text{when}\\space x=${x}`;
}

function calculate_ktx(mode) {
  if (mode.input === "2p" && mode.output === "eqn") {
    return calculate_eqn_from_2p();
  }
  else if (mode.input === "1p-1m" && mode.output === "eqn") {
    return calculate_eqn_from_1p_1m();
  }
  else if (mode.input === "2p-1m" && mode.output === "crd") {
    return calculate_crd_from_2p_1m();
  }
  else if (mode.input === "1e" && mode.output === "xic") {
    return calculate_xic_from_1e();
  }
  else {
    return error_msg_ktx(`Error: unable to calculate ${mode.output} from ${mode.input}.`);
  }
}
