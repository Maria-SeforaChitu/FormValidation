const banner = document.querySelector(".banner");
const bannerMessage = document.querySelector(".banner-message");

function closeBanner() {
  banner.style.display = "none";
}
closeBanner();

const firstName = document.querySelector("[data-checked-element=firstName]");
const lastName = document.querySelector("[data-checked-element=lastName]");
const message = document.querySelector("[data-checked-element=message]");
const genders = document.querySelectorAll("[data-checked-element=gender]");

firstName.addEventListener("input", inputEventHandler);
lastName.addEventListener("input", inputEventHandler);
message.addEventListener("input", inputEventHandler);
for (var i = 0; i < genders.length; i++) {
  genders[i].addEventListener("click", inputEventHandler);
}

function inputEventHandler(e) {
  const target = e.target;
  const checkedElement = target.dataset.checkedElement;

  switch (checkedElement) {
    case "firstName":
    case "lastName":
    case "message":
      console.log(
        checkedElement + " has class list before event: " + target.classList
      );

      validateInputText(target);

      console.log(
        checkedElement + " has class list after event: " + target.classList
      );

      break;
    case "gender":
      console.log(
        checkedElement +
          " parent has class list before event: " +
          target.parentElement.classList
      );

      validateInputRadios(genders);

      console.log(
        checkedElement +
          " parent has class list after event: " +
          target.parentElement.classList
      );
      break;
  }
}

function validateInputText(inputText) {
  inputText.classList.remove("valid", "invalid");

  if (inputText.value.trim() == "") {
    inputText.classList.add("invalid");
    return false;
  } else {
    inputText.classList.add("valid");
    return true;
  }
}

function validateInputRadios(inputRadios) {
  let checked = findCheckedInputRadio(inputRadios) == null ? false : true;

  for (var i = 0; i < inputRadios.length; i++) {
    if (checked == true) {
      inputRadios[i].parentElement.classList.remove("invalid");
    } else {
      inputRadios[i].parentElement.classList.add("invalid");
    }
  }

  return checked;
}

function findCheckedInputRadio(inputRadios) {
  for (var i = 0; i < inputRadios.length; i++) {
    if (inputRadios[i].checked == true) {
      return inputRadios[i];
    }
  }

  return null;
}

const contactForm = document.querySelector("[data-contact-form]");
contactForm.addEventListener("submit", submitHandler);

function submitHandler(e) {
  e.preventDefault();

  let formValidation = validateInputText(firstName);
  formValidation &= validateInputText(lastName);
  formValidation &= validateInputText(message);
  formValidation &= validateInputRadios(genders);

  if (formValidation == true) {
    // display top banner
    console.log(
      "Contact form submitted successfully with the following information:"
    );
    console.log("   => First name: " + firstName.value.trim());
    console.log("   => Last name: " + lastName.value.trim());
    let genderParent = findCheckedInputRadio(genders).parentElement;
    console.log(
      "   => Gender: " + (genderParent.innerText || genderParent.textContent)
    );
    console.log("   => Message: " + message.value.trim());

    bannerMessage.textContent =
      "Thank you for contacting us, " +
      firstName.value.trim() +
      " " +
      lastName.value.trim();
    banner.style.display = "flex";

    // Not ideal to use reset here, it's just to clear the form fields faster.
    contactForm.reset();
  } else {
    console.log("Contact form was not submitted due to invalid information.");
    closeBanner();
  }
}
