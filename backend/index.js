const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { openConnection } = require("./database/connection.js");
const moment = require("moment-timezone");
const { generatePaymentUrl, decryptPaymentStatus } = require("./util.js");
const priceObj = require("./prices.js");
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/greet-me", (req, res) => {
  res.send("Hello boy");
});

app.post("/register-user", async (req, res) => {
  let conn = null;
  try {
    const {
      title,
      firstName,
      lastName,
      email,
      countryCode,
      contactNumber,
      medicalRegistrationNumber,
      medicalBoard,
      designation,
      hospitalInstituteClinicName,
      profession,
      "pathology-member": pathologyMember,
      "pathology-number": pathologyNumber,
      "cytotechnologist-member": cytotechnologistMember,
      "cytotechnologist-number": cytotechnologistNumber,
      "appearance-mode": appearanceMode,
      "physical-conference-type": physicalConferenceType,
      "physical-workshop": physicalWorkshop,
      "virtual-conference-type": virtualConferenceType,
      "accompanying-person": accompanyingPerson,
    } = req.body;
    let currentAmount = null;
    let haveIACNumber = "";

    conn = await openConnection();
    const queryFields = [
      "title",
      "firstName",
      "lastName",
      "email",
      "countryCode",
      "contactNumber",
      "medicalRegistrationNumber",
      "medicalBoard",
      "designation",
      "hospitalInstituteClinicName",
      "profession",
      "appearanceMode",
      "accompanyingPerson",
    ];
    const queryValues = [
      title,
      firstName,
      lastName,
      email,
      countryCode,
      contactNumber,
      medicalRegistrationNumber,
      medicalBoard,
      designation,
      hospitalInstituteClinicName,
      profession,
      appearanceMode,
      accompanyingPerson,
    ];

    if (
      profession === "PathologyConsultant" ||
      profession === "Cytotechnologist"
    ) {
      if (pathologyMember === "Yes" || cytotechnologistMember === "Yes") {
        const iacMemberNumber = pathologyNumber || cytotechnologistNumber;
        queryFields.push("IACMemberNumber");
        queryValues.push(iacMemberNumber);
        haveIACNumber = "Yes";
      } else {
        haveIACNumber = "No";
      }
    }

    if (appearanceMode === "physicalMode") {
      queryFields.push("physicalConferenceType");
      queryValues.push(physicalConferenceType);

      if (physicalConferenceType.toLowerCase().includes("workshop")) {
        queryFields.push("physicalWorkshop");
        queryValues.push(physicalWorkshop);
      }
      currentAmount =
        priceObj[appearanceMode][physicalConferenceType][
          profession + haveIACNumber
        ] +
        priceObj[appearanceMode][physicalConferenceType].AccompanyingPerPerson *
          accompanyingPerson;
    } else {
      queryFields.push("virtualConferenceType");
      queryValues.push(virtualConferenceType);
      currentAmount =
        priceObj[appearanceMode][virtualConferenceType][
          profession + haveIACNumber
        ];
    }

    if (currentAmount === null) {
      throw new Error("Provide Valid Information");
    }

    const requestData = {
      currentAmount,
      contactNumber,
      name: `${firstName} ${lastName}`,
      email
    }

    const { transactionID, paymentUrl } = await generatePaymentUrl(req, requestData);
    const paymentDate = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    queryFields.push('paymentDate');
    queryValues.push(paymentDate);

    queryFields.push("transactionId");
    queryValues.push(transactionID);

    queryFields.push("payment");
    queryValues.push(currentAmount);

    const query = `
    INSERT INTO registrations (${queryFields.join(", ")})
    VALUES (${queryValues.map((_, i) => `$${i + 1}`).join(", ")})
    `;

    await conn.none(query, queryValues);
    res.redirect(paymentUrl);
    // res.status(201).send("Done");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
});

app.post("/update-transaction", async (req, res) => {
  let conn = null;
  try {
    conn = await openConnection();
    console.log("from update transaction", req.body);
    if (!req.body.response) {
      throw new Error("empty response");
    }
    const data = await decryptPaymentStatus(req.body.response);
    console.log(data);
    const query = `UPDATE registrations SET paid = TRUE WHERE transactionId = $1`;
    await conn.none(query, [transactionId]);
    res.send("Payment has been successfully done");
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Error updating data");
  }
});

app.post("/get-users", async (req, res) => {
  let conn = null;
  try {
    conn = await openConnection();
    const query = `SELECT * FROM registrations`;
    const data = await conn.any(query);
    res.status(200).send(data);
  } catch (err) {
    console.error("Error while fetching users", err);
    res.status(500).send("Error while fetching users");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
