// Task #1
$(function () {
  $("#hideBtn").click(function () {
    $("#text").hide();
  });

  $("#showBtn").click(function () {
    $("#text").show();
  });
});
// End of Task #1

// Task #2
$(function () {
  $("#toggleColorBtn").click(function () {
    let currentColor = $("#box").css("background-color");

    if (currentColor === "rgb(255, 0, 0)") {
      $("#box").css("background-color", "lightblue");
    } else {
      $("#box").css("background-color", "red");
    }
  });
});
// End of Task #2

// Task #3
$(function () {
  $("form").submit(function (e) {
    e.preventDefault();

    let inputValue = $("#itemInput").val();
    $(".items").append($("<li>").text(inputValue));

    $("#itemInput").val("");
  });
});
// End of Task #3
