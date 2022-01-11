// Client facing scripts here
//! jQuery
/* eslint-env jquery */
/* eslint-env browser */

//event delegation

//~ TRAVERSE THE DOM
$(document).ready(function() {

  $(document).on("click", ".copy", function() {

    //! This changes all copy buttons into a red CAPITALIZED button
    // $(".copy").html("COPY").css({"color": "red"});
    // $(".copy").closest(".copy").css({"color": "red"});

    // We target the parent of the copy button (rowData)
    let parentElement = $(this).parents('.rowData');
    // We find the class with the closest
    let passwordElement = parentElement.find('.password');
    //sends an alert with the passwordElement
    // let copied = passwordElement.val();
    let copied = passwordElement.select();
    // console.log(navigator.clipboard.writeText(copied.val()));
    document.execCommand("copy");
    alert("Copied to clipboard: " + copied.val());


    // console.log(this);


  });


  //which row are we working with?
  //then capture the id

});

//.closest()
//.find()

"input[type='text']";
