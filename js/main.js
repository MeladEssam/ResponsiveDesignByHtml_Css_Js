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
