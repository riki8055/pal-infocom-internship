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

// Task #3 & 4
$(function () {
  let itemsArray = [];

  $("form").submit(function (e) {
    e.preventDefault();

    let inputValue = $("#itemInput").val();
    itemsArray.push(inputValue);
    renderList();

    $("#itemInput").val("");
  });

  //   Remove last
  $("#removeLastItemBtn").click(function () {
    itemsArray.pop();
    renderList();
  });

  // Render function
  function renderList() {
    $(".items").empty(); // Clear current list

    itemsArray.forEach(function (item) {
      $(".items").append($("<li>").text(item));
    });
  }
});
// End of Task #3 & 4

// Task #5
$(function () {
  const maxChars = 140;

  $("#textInput").keyup(function () {
    const currentLen = $(this).val().length;
    const remaining = maxChars - currentLen;

    $("#counter").text(remaining + " characters remaining");
  });
  //   End of Task #5

  //   Task #6
  $(function () {
    $("h4").click(function () {
      $(".accordion p").slideUp(); // slide up all paras

      $(this).next("p").slideDown(); // slide down clicked heading's para
    });
  });
  //   End of Task #6
});
