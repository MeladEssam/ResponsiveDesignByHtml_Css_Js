// images array
let imageArr = ["1.webp", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let setIntervalId;
//select the root element
//the root element
let rootElement = document.styleSheets[3].cssRules[0];
//settings box
let settingsBox = document.querySelector(".settings-box");
//settings toggle
let settingsToggleElement = document.querySelector(".settings-toggle");
//colors lis
let colorLis = document.querySelectorAll(".colors-list li");
// select landing page
let landingPage = document.querySelector(".landing-page");
let yesBtn = document.querySelector(".option-box span.yes");
let noBtn = document.querySelector(".option-box span.no");

//header Links
let headerLinks = document.querySelectorAll(".header-area .links li a");

//check main color in local storage
if (localStorage.getItem("mainColor")) {
  rootElement.style.setProperty(
    "--main-color",
    localStorage.getItem("mainColor")
  );

  // add active class for active li and remove it from others
  colorLis.forEach((li) => {
    if (li.dataset.color === localStorage.getItem("mainColor")) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

//check background in local storage

if (localStorage.getItem("bgUrl")) {
  landingPage.style.backgroundImage = localStorage.getItem("bgUrl");
}
if (localStorage.getItem("activeLink")) {
  headerLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === localStorage.getItem("activeLink")) {
      link.classList.add("active");
    }
  });
}
//check Random BG in local storage
if (localStorage.getItem("RandomBackGround")) {
  //random is equal to yes run setinterval method
  if (localStorage.getItem("RandomBackGround") === "yes") {
    setIntervalId = setInterval(changeBackGround, 5000);
  }
} else {
  setIntervalId = setInterval(changeBackGround, 5000);
}
//when click on settings toggle
settingsToggleElement.onclick = function () {
  settingsBox.classList.toggle("opend");
};

// settings box change colors options
colorLis.forEach((li) => {
  li.onclick = function (event) {
    // //remove the active class from all lis and add it to clicked li
    handleActiveClass(colorLis, event);
    //set main color by the datacolor of clicked li
    rootElement.style.setProperty("--main-color", this.dataset.color);

    //save the color into local storage
    localStorage.setItem("mainColor", this.dataset.color);
  };
});

///function that change bg randomly
function changeBackGround() {
  let index = Math.floor(Math.random() * imageArr.length);
  landingPage.style.backgroundImage = `url("imgs/${imageArr[index]}")`;
  localStorage.setItem("bgUrl", `url("imgs/${imageArr[index]}")`);
}

//change background options
yesBtn.onclick = function () {
  //run setInterval method
  setIntervalId = setInterval(changeBackGround, 5000);
  // set yes in local storage
  localStorage.setItem("RandomBackGround", "yes");
};

noBtn.onclick = function () {
  //stop the setInterval method
  clearInterval(setIntervalId);
  //set no to local storage
  localStorage.setItem("RandomBackGround", "no");
};

//scrolling to skills section
let skillsSection = document.querySelector(".my-skills");
let allSkillsProgress = document.querySelectorAll(
  ".my-skills .skill-box .skill-progress span"
);
console.log(allSkillsProgress);
window.onscroll = function () {
  //section height
  let sectionHeight = skillsSection.offsetHeight;
  //section top
  let sectionTop = skillsSection.offsetTop;
  //window height
  let windowHeight = window.innerHeight;
  if (window.scrollY + 100 >= sectionTop + sectionHeight - windowHeight) {
    allSkillsProgress.forEach((progress) => {
      progress.style.width = progress.dataset.progress;
    });
  } else {
    allSkillsProgress.forEach((progress) => {
      progress.style.width = 0;
    });
  }
};

// gallery section

let galleryImages = document.querySelectorAll(".gallery img");
console.log(galleryImages);
galleryImages.forEach((image) => {
  image.addEventListener("click", function (event) {
    //create overlay element
    let ovrlayElement = document.createElement("div");
    //add class for overlay
    ovrlayElement.className = "popup-overlay";
    //append the overlay element to body
    document.body.appendChild(ovrlayElement);
    //create popup div element
    let popupElement = document.createElement("div");
    //set an class top popup
    popupElement.className = "popup-box";
    if (image.alt !== "") {
      let imageHeading = document.createElement("h3");

      imageHeading.append(document.createTextNode(image.alt));
      popupElement.append(imageHeading);
    }
    //create image element
    let imageElement = document.createElement("img");
    imageElement.className = "popup-image";
    imageElement.src = image.src;
    //append the image to the popup
    popupElement.appendChild(imageElement);
    //append the popup to the body
    document.body.append(popupElement);

    //create close btn
    let closeButton = document.createElement("span");
    //add class top close btn
    closeButton.className = "close-popup-btn";
    //create Close text
    let closeText = document.createTextNode("Close");
    //append close text to close btn
    closeButton.append(closeText);

    //append close btn to popup
    popupElement.append(closeButton);
  });
});

document.addEventListener("click", function (event) {
  if (event.target.className === "close-popup-btn") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// if (!event.target.classList.contains("popub-box")) {
//   document.querySelector(".popup-box").remove();
//   document.querySelector(".popup-overlay").remove();
// }
// document.addEventListener("click", function (event) {
//   if (document.querySelector(".popup-box") != null) {
//     document.querySelector(".popup-box").onclick = function (e) {
//       e.stopPropagation();
//       console.log("this is popup box");
//     };

//     if (event.target !== document.querySelector(".popup-box")) {
//       document.querySelector(".popup-box").remove();
//       document.querySelector(".popup-overlay").remove();
//     }
//   }
// });

//scroll to the section when click the section name that exist in the header

headerLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); //to prevent default behavior when click on the link

    localStorage.setItem("activeLink", link.dataset.section);
    //handl active class
    handleActiveClass(headerLinks, e);

    document.querySelector(link.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//function that handle active class

function handleActiveClass(elements, event) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}

//reset options
document.querySelector(".reset-options").onclick = function () {
  //clear local storage
  localStorage.clear();
  //reload window
  window.location.reload();
};

//when focus on the input
let formInputs = document.querySelectorAll("input[type='text']");
formInputs.forEach((inp) => {
  inp.addEventListener("focus", function () {
    inp.placeholder = "";
  });
});

let textArea = document.querySelector("#text-area");
textArea.onfocus = function () {
  textArea.placeholder = "";
};

//toggle menu

let toggleMenuBtn = document.querySelector(".header-area .toggle-menu");
let UlList = document.querySelector(".header-area .links");
// console.log((UlList.style.display = "block"));

// console.log(toggleMenuBtn);
toggleMenuBtn.onclick = function (e) {
  e.stopPropagation();
  UlList.classList.toggle("open-menu");
};
UlList.onclick = function (e) {
  e.stopPropagation();
};

//when click at any where close the menu

document.addEventListener("click", function (event) {
  if (document.querySelector(".open-menu") != null) {
    if (
      !event.target.classList.contains("open-menu") &&
      !event.target.classList.contains("toggle-menu")
    ) {
      UlList.classList.toggle("open-menu");
    }
  }
});

let inputPlaceHolder = ["Username", "phone number", "E-mail", "Subject"];

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("blur", function (e) {
    if (this.value === "") {
      this.placeholder = inputPlaceHolder[i];
    }
  });
}
textArea.onblur = function () {
  if (textArea.value == "") {
    textArea.placeholder = "Write Your Message";
  }
};

let submitButton = document.querySelector("#submit");
// swal("Enter Valid Username !");

// submitButton.onclick = function (event) {
//   event.preventDefault();
//   formValidation();
// };

//  let theEmailField = document.querySelector('input[name="email"]';

//   theEmailField.onkeyup=function(){
//     formValidation()
//   }

// formInputs.forEach(input=>formValidation(input))

let submitFlag = false;
submitButton.onclick = function (event) {
  if (submitFlag === false) {
    event.preventDefault();
  }
};

formInputs.forEach((input) => {
  input.onkeyup = function (e) {
    if (input.name === "username") {
      if (input.value === "") {
        input.previousElementSibling.textContent = "username is required";
        submitFlag = false;
      } else {
        input.previousElementSibling.textContent = "";
        submitFlag = true;
      }
    } else if (input.name === "phone") {
      if (input.value === "") {
        submitFlag = false;
        input.previousElementSibling.textContent = "phone number is required";
      } else {
        if (input.value.length !== 11) {
          input.previousElementSibling.textContent =
            "phone number must be 11 digit";
          submitFlag = false;
        } else {
          input.previousElementSibling.textContent = "";
          submitFlag = true;
        }
      }
    } else if (input.name === "email") {
      if (input.value === "") {
        input.previousElementSibling.textContent = "email is required";
        submitFlag = false;
      } else {
        //validate email

        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(input.value)) {
          input.previousElementSibling.textContent = "";
          submitFlag = true;
        } else {
          input.previousElementSibling.textContent = "invalid email address";
          submitFlag = false;
        }
      }
    } else if (input.name === "subject") {
      if (input.value === "") {
        submitFlag = false;
        input.previousElementSibling.textContent = "subject is required";
      } else {
        input.previousElementSibling.textContent = "";
        submitFlag = true;
      }
    }
  };
});

textArea.onkeyup = function () {
  if (textArea.value !== "") {
    textArea.previousElementSibling.textContent = "";
  } else {
    textArea.previousElementSibling.textContent = "your message is required";
  }
};

// let userInput = document.querySelector('input[name="username"]');
// userInput.onkeyup = function () {
//   if (userInput.value !== "") {
//     userInput.previousElementSibling.textContent = "";
//   } else {
//     userInput.previousElementSibling.textContent = "username is required";
//   }
// };

// let mailInput = document.querySelector('input[name="username"]');
// mailInput.onkeyup = function () {
//   if (mailInput.value !== "") {
//     mailInput.previousElementSibling.textContent = "";
//   } else {
//     mailInput.previousElementSibling.textContent = "email is required";
//   }
// };
// let phoneInput = document.querySelector('input[name="phone"]');
// phoneInput.onkeyup = function () {
//   if (phoneInput.value !== "") {
//     phoneInput.previousElementSibling.textContent = "";
//   } else {
//     phoneInput.previousElementSibling.textContent = "email is required";
//   }
// };

// let subjectInput = document.querySelector('input[name="subject"]');
// subjectInput.onkeyup = function () {
//   if (subjectInput.value !== "") {
//     subjectInput.previousElementSibling.textContent = "";
//   } else {
//     subjectInput.previousElementSibling.textContent = "subject is required";
//   }
// };

// textArea.onkeyup = function () {
//   if (textArea.value !== "") {
//     textArea.previousElementSibling.textContent = "";
//   } else {
//     textArea.previousElementSibling.textContent = "your message is required";
//   }
// };

// function formValidation() {
//   for (let i = 0; i < formInputs.length; i++) {
//     if (formInputs[i].value === "") {
//       formInputs[
//         i
//       ].previousElementSibling.textContent = `${inputPlaceHolder[i]} is required`;
//     } else if (formInputs[i].name === "phone") {
//       if (formInputs[i].value.length !== 11) {
//         formInputs[
//           i
//         ].previousElementSibling.textContent = `phone number must be 11 digit`;
//       } else {
//         formInputs[i].previousElementSibling.textContent = ``;
//       }
//     } else if (formInputs[i].name === "email") {
//       let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
//       if (emailRegex.test(formInputs[i].value)) {
//         formInputs[i].previousElementSibling.textContent = ``;
//       } else {
//         formInputs[
//           i
//         ].previousElementSibling.textContent = `invalid email address`;
//       }
//     } else {
//       formInputs[i].previousElementSibling.textContent = ``;
//     }

//     if (textArea.value === "") {
//       textArea.previousElementSibling.textContent = `your msg is required`;
//     } else {
//       textArea.previousElementSibling.textContent = ``;
//     }
//   }
// }
// submitButton.onclick = function (event) {
//   let flag = false;
//   for (let i = 0; i < formInputs.length; i++) {
//     if (formInputs[i].value === "") {
//       flag = true;
//     }
//   }

//   if (textArea.value === "") {
//     flag = true;
//   }

//   if (flag === true) {
//     event.preventDefault();
//     swal(`All Fields Are Required `);
//   } else {
//     event.preventDefault();
//     swal(`Successfully Operation `);
//   }

//   let phoneNumber = document.querySelector('input[name="phone"]');

//   console.log(phoneNumber.value.length);
//   if (phoneNumber.value.length != 11) {
//     event.preventDefault();
//     phoneNumber.value = "";
//     phoneNumber.placeholder = "phone number must 11 digit";

//   }
//   //check email address pattern
//   let theEmailField = document.querySelector('input[name="email"]');
//   let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
//   let regxFlag = emailRegex.test(theEmailField.value);
//   console.log(theEmailField.value);

//   console.log(regxFlag);
//   if (regxFlag === true) {
//     swal(`Email  Matched `);
//     event.preventDefault();
//   } else {
//     swal(`Email Not Matched `);
//   }

//   // let theEmailField=document.querySelector("name='username'")

//   // for (let i = 0; i < formInputs.length; i++) {
//   //   formInputs[i].value = "";
//   // }
//   // textArea.value = "";
// };

// const emailRegex = /^\w+@\w+\.[a-zA-Z]{2,}$/;
// let flag = emailRegex.test("meladgmail.com");
// let flag = emailRegex.test("meladgmail.com");
// console.log(flag);
// console.log(theEmailField);
// let theEmailField = document.querySelector('input[name="username"]');
// console.log(theEmailField.value);
// console.log(flag);
