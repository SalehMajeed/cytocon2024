const physicalMode = {
  Conference: {
    PathologyConsultantIACMember: 8000,
    PathologyConsultantNonIACMember: 8500,
    Resident: 5500,
    InternationalConsultant: 9500,
    CytotechnologistIACMember: 4500,
    CytotechnologistNonIACMember: 5000,
    AccompanyingPerPerson: 4500,
  },
  CMEConference: {
    PathologyConsultantIACMember: 9800,
    PathologyConsultantNonIACMember: 10700,
    Resident: 6900,
    InternationalConsultant: 12700,
    CytotechnologistIACMember: 5500,
    CytotechnologistNonIACMember: 6200,
    AccompanyingPerPerson: 5500,
  },
  ConferenceWorkshop: {
    PathologyConsultantIACMember: 10600,
    PathologyConsultantNonIACMember: 11500,
    Resident: 7700,
    InternationalConsultant: 13000,
    CytotechnologistIACMember: 6500,
    CytotechnologistNonIACMember: 7200,
    AccompanyingPerPerson: 6000,
  },
  CMEConferenceWorkshop: {
    PathologyConsultantIACMember: 12400,
    PathologyConsultantNonIACMember: 13700,
    Resident: 9100,
    InternationalConsultant: 16200,
    CytotechnologistIACMember: 7500,
    CytotechnologistNonIACMember: 8400,
    AccompanyingPerPerson: 7000,
  },
};

const virtualMode = {
  Conference: {
    PathologyConsultantIACMember: 6000,
    PathologyConsultantNonIACMember: 8500,
    Resident: 4500,
    InternationalConsultant: 7500,
    CytotechnologistIACMember: 3500,
    CytotechnologistNonIACMember: 3700,
  },
  CMEConference: {
    PathologyConsultantIACMember: 8000,
    PathologyConsultantNonIACMember: 8700,
    Resident: 6000,
    InternationalConsultant: 10000,
    CytotechnologistIACMember: 4800,
    CytotechnologistNonIACMember: 5100,
  },
};

export { physicalMode, virtualMode };
