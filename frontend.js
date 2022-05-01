function render_ktx_to_elem(ktx, elem) {
  katex.render(ktx, $(elem).get(0), {throwOnError: false});
}

function render_ktx_in_elem(elem) {
  let jelem = $(elem);

  if (jelem.children().length === 0 && jelem.hasClass("ktx")) {
    // Render KaTeX in self
    let ktx = jelem.data("ktx");

    render_ktx_to_elem(ktx, jelem.get(0));
  }
  else {
    // Render KaTeX in children
    jelem.children().each(
      function () {
        render_ktx_in_elem(this);
      }
    );
  }
}

function set_inputs(mode) {
  let cmds = mode.split("-");

  rm_all_in_elem(".input-box", "#in");

  for (let c of cmds) {
    let num = c.charAt(0);
    let typ = c.charAt(1);

    // Get div to copy using template
    let to_copy = input_type_to_template(typ).eq(0);

    if (to_copy === null) continue;

    for (let i = 0; i < num; ++i) {
      $(to_copy.html()).insertBefore("#in-msg");
    }
  }

  render_ktx_in_elem("#in");

  if (mode === "2p-1m") {
    $("#in-msg").text("Leave the one missing coordinate blank.");
    $("#in-msg").css("display", "inline");
  }
  else {
    $("#in-msg").text("");
    $("#in-msg").css("display", "none");
  }
}
