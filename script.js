var progressBars = "";
function newVal(Old, Btn) {
  return parseInt(Math.max(parseInt(Btn, 0) + parseInt(Old, 0), 0));
}
function newPercent(Old, Btn) {
  return parseInt((newVal(Old, Btn) * 100) / progressBars.limit);
}
function updatePB(Btn) {
  var sP = document.getElementById("selectProgess");
  var selectedPB = sP.options[sP.selectedIndex].value;
  var Old = document.getElementById("percent-" + selectedPB).title;
  document.getElementById("percent-" + selectedPB).title =
    "" + newVal(Old, Btn);
  Btn = newPercent(Old, Btn);
  pBar = document.getElementById(selectedPB);
  if (Btn > 100) {
    pBar.style = "background-color: red; width:" + 100 + "%";
  } else if (Btn > 0) {
    pBar.style = Btn + "%";
  } else {
    pBar.style = Btn + "%";
  }
  document.getElementById("percent-" + selectedPB).innerHTML = Btn + "%";
}

function P_response() {
  var btnSelect = "";
  var n = progressBars.buttons.length;
  for (var i = 0; i < n; i++) {
    btnSelect +=
      "<button class='btncontrols' onclick='updatePB(" +
      progressBars.buttons[i] +
      "," +
      progressBars.limit +
      ")' value='" +
      progressBars.buttons[i] +
      "'>" +
      progressBars.buttons[i] +
      "</button>";
  }

  document.getElementById("btnControl").innerHTML = btnSelect;

  var PBselector = "<select id='selectProgess'>";
  var progressUI = "";

  g = progressBars.bars.length;
  for (var i = 1; i <= n; i++) {
    PBselector =
      PBselector +
      "<option value='progress" +
      i +
      "'>#progress" +
      i +
      "</option>";
    iPercent = newPercent(0, progressBars.bars[i - 1]);
    progressUI =
      progressUI +
      "<div class='pbborder'><div id='progress" +
      i +
      "' class='pbcontainer pbinner' style='width:" +
      iPercent +
      "%'></div><div class='percent' title='" +
      progressBars.bars[i - 1] +
      i +
      "'>" +
      iPercent +
      "%</div></div>";
  }
  PBselector = PBselector + "</select>";

  document.getElementById("barctrls").innerHTML = PBselector;
  document.getElementById("pb").innerHTML = progressUI;
}

fetch("http://pb-api.herokuapp.com/bars")
  .then(function (response) {
    if (response.status !== 200) {
      console.log("Error Status Code: " + response.status);
      return;
    }
    response.json().then(function (data) {
      progressBars = data;
      console.log(progressBars);
      P_response();
    });
  })
  .catch(function (err) {
    console.log("ERROR", err);
  });
