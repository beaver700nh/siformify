function highlight_elem(elem, dur) {
  let jelem = $(elem);

  let orig_color = jelem.css("border-color");

  jelem.css("border-color", "yellow");

  setTimeout(
    function () {
      jelem.css("border-color", orig_color);
    },
    dur
  );
}

function rm_all_in_elem(sel, elem) {
  $(elem).find(sel).remove();
}

function input_type_to_template(typ) {
  switch (typ) {
  case "p": return $("#tmp-point");
  case "m": return $("#tmp-slope");
  case "e": return $("#tmp-sif");
  }

  return null;
}

function error_msg_ktx(msg) {
  return `\\small\\textcolor{red}{\\textsf{${msg}}}`;
}

function get_ktx_from_num(num) {
  let repr = $("#repr").val();

  if (repr === "frac") {
    if (num.d === 1) {
      return `${num.s * num.n}`;
    }
    else {
      let sign = num.s < 0 ? "-" : "";

      return `${sign}\\frac{${num.n}}{${num.d}}`;
    }
  }
  else if (repr === "decm") {
    let decm = math.number(num);

    return `${+decm.toFixed(7)}`;
  }

  return "\\text{ERR}";
}

function get_input_box(idx) {
  return $("#in").children("div").eq(idx);
}

function get_input_elem(box, idx) {
  return box.find("input").eq(idx);
}

function get_input_val(box, idx) {
  let val = get_input_elem(box, idx).val();

  if (val === "") {
    return null;
  }

  return math.fraction(val);
}

function get_point_val(box) {
  let
    x = get_input_val(box, 0),
    y = get_input_val(box, 1);

  if (x === null || y === null) {
    return null;
  }

  return {x: x, y: y};
}

function get_slope_val(box) {
  return get_input_val(box, 0);
}
