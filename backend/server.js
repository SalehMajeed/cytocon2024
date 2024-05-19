const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { openConnection } = require("./database/connection.js");
const { encryptEas } = require("./Getepay_pg_node/components/encryptEas");
const { decryptEas } = require("./Getepay_pg_node/components/decryptEas");
const fetch = require("node-fetch");
const { generateDate } = require("./util.js");
const { v4: uuidv4 } = require("uuid");
const port = 8080;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(bodyParser.json());
// app.use(express.urlencoded());

const getepayPortal = (data, config) => {
  return new Promise((resolve, reject) => {
    const JsonData = JSON.stringify(data);
    var ciphertext = encryptEas(
      JsonData,
      config["GetepayKey"],
      config["GetepayIV"]
    );
    var newCipher = ciphertext.toUpperCase();
    var myHeaders = {
      "Content-Type": "application/json",
    };
    var raw = JSON.stringify({
      mid: data.mid,
      terminalId: data.terminalId,
      req: newCipher,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(config["GetepayUrl"], requestOptions)
      .then((response) => response.text())
      .then((result) => {
        var resultobj = JSON.parse(result);
        var responseurl = resultobj.response;
        var dataitem = decryptEas(
          responseurl,
          config["GetepayKey"],
          config["GetepayIV"]
        );
        const parsedData = JSON.parse(dataitem);
        const paymentUrl = parsedData.paymentUrl;
        resolve(paymentUrl);
      })
      .catch((error) => reject(error));
  });
};

app.get("/", async (req, res) => {
  try {
    const currentDate = generateDate(req);
    const data = {
      mid: "108",
      amount: "1.00",
      merchantTransactionId: process.env.MERCHANT_ID,
      transactionDate: currentDate,
      terminalId: process.env.TERMINAL_ID,
      udf1: "7665730788",
      udf2: "saleh.majeed8@gmail.com",
      udf3: "saleh",
      udf4: "",
      udf5: "",
      udf6: "",
      udf7: "",
      udf8: "",
      udf9: "",
      udf10: "",
      ru: "https://pay1.getepay.in:8443/getepayPortal/pg/pgPaymentResponse",
      callbackUrl: process.env.CALLBACK_URL,
      currency: "INR",
      paymentMode: "ALL",
      bankId: "",
      txnType: "single",
      productType: "IPG",
      txnNote: "Test Txn",
      vpa: process.env.VPA,
    };

    const config = {
      GetepayMid: 108,
      GeepayTerminalId: process.env.VPA,
      GetepayKey: process.env.GET_E_PAY_KEY,
      GetepayIV: process.env.GET_E_PAY_IV,
      GetepayUrl:
        "https://pay1.getepay.in:8443/getepayPortal/pg/generateInvoice",
    };

    const paymentUrl = await getepayPortal(data, config);
    res.redirect(paymentUrl);
    // res.send({
    //   data: data,
    //   config: config,
    //   getepayPortal: res.paymentUrl,
    // });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register-user", async (req, res) => {
  try {
    conn = await openConnection();
    const transactionId = uuidv4();
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
      transactionId,
    ];

    const [result] = await conn.execute(query, values);
    res.send(result);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
