$(document).ready(function() {
  let $generatePassword;
  $(".copy").on("click", function() {

    //! This changes all copy buttons into a red CAPITALIZED button
    // We target the parent of the copy button (rowData)
    let parentElement = $(this).parents('.rowData');
    // We find the class with the closest
    let passwordElement = parentElement.find('.password');
    //sends an alert with the passwordElement
    let copied = passwordElement.select();
    document.execCommand(".copy");
    alert("Copied to clipboard: " + copied.val());
    // fillAlertError("Copied to clipboard:");

  });

  $(document).on("click", ".edit_password", function(event) {
    // event.preventDefault();
    const password = $(this).closest("tr").find("input.password").val();
    const url = $(this).data("url");
    const accountId = $(this).closest("tr").find(".account_id").html();
    $.post(url, { id: accountId, password: password })
      .then(() =>
        alert("success"));
  });

  $(document).on("click", ".password_delete", function(event) {
    // event.preventDefault();
    // const password = $(this).closest("tr").find("input.password").val();
    const url = $(this).data("url");
    const accountId = $(this).closest("tr").find(".account_id").html();
    $.post(url, { id: accountId})
      .then(() =>
        alert("success"));
  });

  $(document).on("click", ".password_delete", function(event) {
    // event.preventDefault();
    // const password = $(this).closest("tr").find("input.password").val();
    const url = $(this).data("url");
    const accountId = $(this).closest("tr").find(".account_id").html();
    $.post(url, { id: accountId})
      .then(() =>
        alert("success"));
    $(this).closest("tr").hide("input.password");
  });



  const characterAmountRange = document.getElementById('characterAmountRange');
  const characterAmountNumber = document.getElementById('characterAmountNumber');
  const includeLowercaseElement = document.getElementById('includeLowercase');
  const includeUppercaseElement = document.getElementById('includeUppercase');
  const includeNumbersElement = document.getElementById('includeNumbers');
  const includeSymbolsElement = document.getElementById('includeSymbols');
  const form = document.getElementById('passwordGeneratorForm');
  const passwordDisplay = document.getElementById('passwordDisplay');



  $("#save").click(function(event) {
    event.preventDefault();
    const category = $("#category").val();
    const username = $("#username").val();
    const url = $("#url").val();
    const created_at = $("#created_at").val();
    if (!url || !category || !username || !created_at) {
      alert("empty field");
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/accounts/new',
      data: { category, username, url, created_at, password: $generatePassword },
      success: function(data) {
        // alert("it worked!");
        window.location = "/users/accounts";
      },
      error: function(xhr, type, exception) {
        // if ajax fails display error alert
        alert("it didn't work");
      }
    });


  });

  $("#generate_password").click(function(event) {

    event.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeLowercase = includeLowercaseElement.checked;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    passwordDisplay.innerText = password;
  });

  const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
  const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
  const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
  const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
  ).concat(
    arrayFromLowToHigh(91, 96)
  ).concat(
    arrayFromLowToHigh(123, 126)
  );


  characterAmountNumber.addEventListener('input', syncCharacterAmount);
  characterAmountRange.addEventListener('input', syncCharacterAmount);
  function generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = [];
    if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    $generatePassword = passwordCharacters.join('');
    return passwordCharacters.join('');
  }

  function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
  }




});
