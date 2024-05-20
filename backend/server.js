const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { openConnection } = require("./database/connection.js");
const { generatePaymentUrl } = require("./util.js");
const port = 8080;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  try {
    const result = await generatePaymentUrl(req);
    res.redirect(result.paymentUrl);
    console.log(result);
  } catch (err) {
    console.log(err.Error);
  }
});

app.post("/register-user", async (req, res) => {
  let conn = null;
  try {
    conn = await openConnection();
    const { transactionID, paymentUrl } = await generatePaymentUrl(req);
    const data = req.body;
    const query = `
      INSERT INTO registrations (
          title, firstName, lastName, email, countryCode, contactNumber,
          medicalRegistrationNumber, medicalBoard, designation, hospitalInstituteClinicName,
          profession, pathologyMember, cytotechnologistMember, appearanceMode,
          physicalConferenceType, physicalWorkshop, virtualConferenceType, accompanyingPerson, transactionId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
      data.title,
      data.firstName,
      data.lastName,
      data.email,
      data.countryCode,
      data.contactNumber,
      data.medicalRegistrationNumber,
      data.medicalBoard,
      data.designation,
      data.hospitalInstituteClinicName,
      data.profession,
      data["pathology-member"],
      data["cytotechnologist-member"],
      data["appearance-mode"],
      data["physical-conference-type"],
      data["physical-workshop"],
      data["virtual-conference-type"],
      parseInt(data["accompanying-person"]),
      transactionID,
    ];

    await conn.execute(query, values);
    res.redirect(paymentUrl);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  } finally {
    if (conn) {
      await conn.end();
    }
  }
});

app.post("/update-transaction", async (req, res) => {
  let conn = null;
  try {
    conn = await openConnection();
    const transactionId = req.body.transactionId;
    const query = `UPDATE registrations SET paid = TRUE WHERE transactionId = ?`;
    await conn.execute(query, [transactionId]);
    res.send("Payment has been successfully done");
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Error updating data");
  } finally {
    if (conn) {
      await conn.end();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
