import { physicalMode, virtualMode } from "./prices.js";

$(document).ready(function () {
  const professionType = $("#profession");
  const pathologyMemberOptionDiv = $("#pathology-member-option-div");
  const pathologyMemberTextDiv = $("#pathology-member-text-div");
  const cytotechnologistOptionDiv = $("#cytotechnologist-member-option-div");
  const cytotechnologistTextDiv = $("#cytotechnologist-member-text-div");
  const appearanceMode = $("#appearance-mode");
  const physicalConferenceDiv = $("#physical-conference-type-div");
  const virtualConferenceDiv = $("#virtual-conference-type-div");
  const physicalWorkshopDiv = $("#physical-workshop-div");
  const accompanyingPersonDiv = $("#accompanying-person-div");
  const totalPriceDiv = $("#total-price-div");

  function hideAllProfessionDiv() {
    pathologyMemberOptionDiv
      .find("option:first")
      .prop("selected", true)
      .change();
    pathologyMemberOptionDiv.hide();
    pathologyMemberTextDiv.hide();
    cytotechnologistOptionDiv
      .find("option:first")
      .prop("selected", true)
      .change();
    cytotechnologistOptionDiv.hide();
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
    }
  }

  function handlePathologyTextChane(e) {
    e.preventDefault();
    updateValidText(e);
  }

  function handleCytotechnologistOptionChange(e) {
    e.preventDefault();
    const isMember = e.target.value;
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
          if(!(currentConferenceType in physicalMode)){
            return
          }
        currentAmount =
          physicalMode[currentConferenceType][currentProfessionSelected] +
          physicalMode[currentConferenceType].AccompanyingPerPerson *
            currentAccompanying;
        break;
      case "virtualMode":
        currentConferenceType = $("#virtual-conference-type").val();
        if(!(currentConferenceType in virtualMode)){
          return
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
      accompanyingPersonDiv.show();
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
