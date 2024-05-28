import { physicalMode, virtualMode } from "./prices.js";
import countryCodeData from "./country-code.js";

$(document).ready(function () {
  const form = $("#submitForm");
  const countryCode = $("#countryCode");
  const professionType = $("#profession");
  const pathologyMemberOptionDiv = $("#pathology-member-option-div");
  const pathologyMemberTextDiv = $("#pathology-member-text-div");
  const pathologyMemberTextDivInput = $("#pathology-number");
  const cytotechnologistOptionDiv = $("#cytotechnologist-member-option-div");
  const cytotechnologistTextDiv = $("#cytotechnologist-member-text-div");
  const cytotechnologistTextDivInput = $("#cytotechnologist-number");
  const appearanceMode = $("#appearance-mode");
  const physicalConferenceDiv = $("#physical-conference-type-div");
  const virtualConferenceDiv = $("#virtual-conference-type-div");
  const physicalWorkshopDiv = $("#physical-workshop-div");
  const accompanyingPersonDiv = $("#accompanying-person-div");
  const totalPriceDiv = $("#total-price-div");

  try {
    form.submit(handleSubmit);

    function handleSubmit(e) {
      e.preventDefault();
      const formDataArray = form.serializeArray();
      const formDataObject = {};
      formDataArray.forEach((item) => {
        formDataObject[item.name] = item.value;
      });
      const formDataJSON = JSON.stringify(formDataObject);
      console.log(formDataJSON);
      $.ajax({
        type: "GET",
        url: "http://ec2-3-25-196-254.ap-southeast-2.compute.amazonaws.com:8080/",
        // contentType: "application/json",
        // data: formDataJSON,
        success: function (response) {
          console.log("Form submitted successfully:", response);
          alert("Form submitted successfully");
        },
        error: function (error) {
          console.error("Error submitting form:", error);
        },
      });
    }
  } catch (err) {
    console.log(err);
  }

  function createInput(inputAttributes) {
    const inputElement = `<input type="text" id="${inputAttributes.id}" name="${inputAttributes.name}" required/>`;
    $(`#${inputAttributes.target}`).append(inputElement);
  }

  function appendCountryCode() {
    countryCodeData.sort((a, b) => (a.isoCode > b.isoCode ? 1 : -1));
    countryCodeData.forEach((eachCountry) => {
      const currentCountryOption = $("<option />");
      currentCountryOption.attr({
        value: `${eachCountry.dialCode}`,
      });
      currentCountryOption.text(
        `${eachCountry.isoCode} ${eachCountry.dialCode}`
      );
      countryCode.append(currentCountryOption);
    });
  }

  function hideAllProfessionDiv() {
    pathologyMemberOptionDiv
      .find("option:first")
      .prop("selected", true)
      .change();
    pathologyMemberOptionDiv.hide();
    pathologyMemberTextDivInput.remove();
    pathologyMemberTextDiv.hide();
    cytotechnologistOptionDiv
      .find("option:first")
      .prop("selected", true)
      .change();
    cytotechnologistOptionDiv.hide();
    cytotechnologistTextDivInput.remove();
    cytotechnologistTextDiv.hide();
  }

  function handleProfessionTypeChange(e) {
    e.preventDefault();
    const selectedProfession = e.target.value;
    switch (selectedProfession) {
      case "PathologyConsultant":
        hideAllProfessionDiv();
        pathologyMemberOptionDiv.show();
        break;
      case "Resident":
        hideAllProfessionDiv();
        break;
      case "InternationalConsultant":
        hideAllProfessionDiv();
        break;
      case "Cytotechnologist":
        hideAllProfessionDiv();
        cytotechnologistOptionDiv.show();
        break;
      default:
        hideAllProfessionDiv();
    }
    calculateTotalAmount();
  }

  function toggleDiv(isMember, div) {
    if (isMember === "Yes") {
      div.show();
    } else {
      div.hide();
    }
    calculateTotalAmount();
  }

  function handlePathologyOptionChange(e) {
    e.preventDefault();
    const isMember = e.target.value;
    if (isMember === "Yes") {
      createInput({
        id: "pathology-number",
        name: "pathology-number",
        target: "pathology-member-text-div",
      });
    } else {
      $("#pathology-number").remove();
    }
    toggleDiv(isMember, pathologyMemberTextDiv);
  }

  function updateValidText(e) {
    const targetEle = $(e.target);
    const previousValue = targetEle.val();
    const pressedKey = e.originalEvent.key;
    if (pressedKey.trim() === "") {
      return;
    }
    const currentValue = Number(pressedKey);
    if (!Number.isNaN(currentValue)) {
      targetEle.val(previousValue + currentValue);
    } else if (pressedKey === "Backspace") {
      targetEle.val(previousValue.slice(0, previousValue.length - 1));
    }
  }

  function handlePathologyTextChane(e) {
    e.preventDefault();
    updateValidText(e);
  }

  function handleCytotechnologistOptionChange(e) {
    e.preventDefault();
    const isMember = e.target.value;
    if (isMember === "Yes") {
      createInput({
        id: "cytotechnologist-number",
        name: "cytotechnologist-number",
        target: "cytotechnologist-member-text-div",
      });
    } else {
      $("#cytotechnologist-number").remove();
    }
    toggleDiv(isMember, cytotechnologistTextDiv);
  }

  function handleCytotechnologistTextChane(e) {
    e.preventDefault();
    updateValidText(e);
  }

  function hideAllAppearanceMode() {
    physicalConferenceDiv.find("option:first").prop("selected", true).change();
    physicalConferenceDiv.hide();
    virtualConferenceDiv.find("option:first").prop("selected", true).change();
    virtualConferenceDiv.hide();
  }

  function handleAppearanceModeChange(e) {
    e.preventDefault();
    const selectedAppearance = e.target.value;
    switch (selectedAppearance) {
      case "physicalMode":
        hideAllAppearanceMode();
        physicalConferenceDiv.show();
        break;
      case "virtualMode":
        hideAllAppearanceMode();
        virtualConferenceDiv.show();
        break;
      default:
        hideAllAppearanceMode();
    }
    calculateTotalAmount();
  }

  function calculateTotalAmount() {
    const currentAppearance = appearanceMode.val();
    const currentProfession = professionType.val();
    let currentProfessionSelected = null;
    let isMember = null;
    let memberIdentity = null;

    switch (currentProfession) {
      case "PathologyConsultant":
        isMember = $("#pathology-member").val();
        memberIdentity = $("#pathology-number").val();
        currentProfessionSelected = `${currentProfession}${isMember}`;
        break;
      case "Cytotechnologist":
        isMember = $("#cytotechnologist-member").val();
        memberIdentity = $("#cytotechnologist-number").val();
        currentProfessionSelected = `${currentProfession}${isMember}`;
        break;
      default:
        currentProfessionSelected = currentProfession;
    }

    let currentConferenceType = null;
    let currentAmount = 0;

    switch (currentAppearance) {
      case "physicalMode":
        currentConferenceType = $("#physical-conference-type").val();
        const currentAccompanying = accompanyingPersonDiv
          .find("input:first")
          .val();
        if (!(currentConferenceType in physicalMode)) {
          return;
        }
        currentAmount =
          physicalMode[currentConferenceType][currentProfessionSelected] +
          physicalMode[currentConferenceType].AccompanyingPerPerson *
            currentAccompanying;
        break;
      case "virtualMode":
        currentConferenceType = $("#virtual-conference-type").val();
        if (!(currentConferenceType in virtualMode)) {
          return;
        }
        currentAmount =
          virtualMode[currentConferenceType][currentProfessionSelected];
        break;
      default:
        currentConferenceType = null;
    }
    totalPriceDiv.find("input:first").val(currentAmount || 0);
  }

  function toggleAccompanyingAndPrice(shouldShow) {
    if (shouldShow) {
      if (appearanceMode.val() === "physicalMode") {
        accompanyingPersonDiv.show();
      }
      totalPriceDiv.show();
      calculateTotalAmount();
    } else {
      accompanyingPersonDiv.find("input:first").val(0);
      accompanyingPersonDiv.hide();
      totalPriceDiv.hide();
      physicalWorkshopDiv.find("option:first").prop("selected", true).change();
      physicalWorkshopDiv.hide();
    }
  }

  function handleConferenceChange(e) {
    e.preventDefault();
    const selectedConference = e.target.value;
    switch (selectedConference) {
      case "CME":
        toggleAccompanyingAndPrice(true);
        physicalWorkshopDiv
          .find("option:first")
          .prop("selected", true)
          .change();
        physicalWorkshopDiv.hide();
      case "Conference":
        toggleAccompanyingAndPrice(true);
        physicalWorkshopDiv
          .find("option:first")
          .prop("selected", true)
          .change();
        physicalWorkshopDiv.hide();
        break;
      case "CMEConference":
        toggleAccompanyingAndPrice(true);
        physicalWorkshopDiv
          .find("option:first")
          .prop("selected", true)
          .change();
        physicalWorkshopDiv.hide();
        break;
      case "ConferenceWorkshop":
        toggleAccompanyingAndPrice(true);
        physicalWorkshopDiv
          .find("option:first")
          .prop("selected", true)
          .change();
        physicalWorkshopDiv.hide();
        physicalWorkshopDiv.show();
        break;
      case "CMEConferenceWorkshop":
        toggleAccompanyingAndPrice(true);
        physicalWorkshopDiv
          .find("option:first")
          .prop("selected", true)
          .change();
        physicalWorkshopDiv.hide();
        physicalWorkshopDiv.show();
        break;
      default:
        toggleAccompanyingAndPrice(false);
    }
  }

  appendCountryCode();

  professionType.change(handleProfessionTypeChange);
  pathologyMemberOptionDiv.change(handlePathologyOptionChange);
  pathologyMemberTextDiv.on("keydown", handlePathologyTextChane);
  cytotechnologistOptionDiv.change(handleCytotechnologistOptionChange);
  cytotechnologistTextDiv.on("keydown", handleCytotechnologistTextChane);
  appearanceMode.change(handleAppearanceModeChange);
  physicalConferenceDiv.change(handleConferenceChange);
  virtualConferenceDiv.change(handleConferenceChange);
  accompanyingPersonDiv.focusout(calculateTotalAmount);
});
