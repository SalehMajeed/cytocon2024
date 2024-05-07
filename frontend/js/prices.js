const physicalMode = {
  Conference: {
    PathologyConsultantYes: 8000,
    PathologyConsultantNo: 8500,
    Resident: 5500,
    InternationalConsultant: 9500,
    CytotechnologistYes: 4500,
    CytotechnologistNo: 5000,
    AccompanyingPerPerson: 4500,
  },
  CMEConference: {
    PathologyConsultantYes: 9800,
    PathologyConsultantNo: 10700,
    Resident: 6900,
    InternationalConsultant: 12700,
    CytotechnologistYes: 5500,
    CytotechnologistNo: 6200,
    AccompanyingPerPerson: 5500,
  },
  ConferenceWorkshop: {
    PathologyConsultantYes: 10600,
    PathologyConsultantNo: 11500,
    Resident: 7700,
    InternationalConsultant: 13000,
    CytotechnologistYes: 6500,
    CytotechnologistNo: 7200,
    AccompanyingPerPerson: 6000,
  },
  CMEConferenceWorkshop: {
    PathologyConsultantYes: 12400,
    PathologyConsultantNo: 13700,
    Resident: 9100,
    InternationalConsultant: 16200,
    CytotechnologistYes: 7500,
    CytotechnologistNo: 8400,
    AccompanyingPerPerson: 7000,
  },
};

const virtualMode = {
  CME: {
    PathologyConsultantYes: 2000,
    PathologyConsultantNo: 2200,
    Resident: 1500,
    InternationalConsultant: 2500,
    CytotechnologistYes: 1300,
    CytotechnologistNo: 1400,
  },
  Conference: {
    PathologyConsultantYes: 6000,
    PathologyConsultantNo: 8500,
    Resident: 4500,
    InternationalConsultant: 7500,
    CytotechnologistYes: 3500,
    CytotechnologistNo: 3700,
  },
  CMEConference: {
    PathologyConsultantYes: 8000,
    PathologyConsultantNo: 8700,
    Resident: 6000,
    InternationalConsultant: 10000,
    CytotechnologistYes: 4800,
    CytotechnologistNo: 5100,
  },
};

export { physicalMode, virtualMode };
