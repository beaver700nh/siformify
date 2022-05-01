var mode = null;

function handle_mode() {
  let selected = $("#mode").find(":selected");

  return {
    input:  selected.data("in"),
    output: selected.data("out"),
  };
}

$(document).ready(
  function () {
    $("#set").click(
      function () {
        if (mode === null) {
          $("#in").css("justify-content", "flex-start");
        }

        mode = handle_mode();

        set_inputs(mode.input);
      }
    );

    $("#go").click(
      function () {
        if (mode === null) {
          highlight_elem("#in", 1000);
          return;
        }

        let ktx = calculate_ktx(mode);
        render_ktx_to_elem(ktx, "#dst");

        highlight_elem("#out", 1000);

        $("#out-msg").css("display", "none");
      }
    );
  }
);
