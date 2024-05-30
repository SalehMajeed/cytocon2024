const fetch = require("node-fetch");
const { encryptEas } = require("./Getepay_pg_node/components/encryptEas");
const { decryptEas } = require("./Getepay_pg_node/components/decryptEas");
const { DateTime } = require("luxon");
const moment = require("moment-timezone");

function generateDate(req) {
  const userLocale = req.headers["accept-language"];
  const userTimeZone = moment.tz.guess(userLocale);
  const dt = DateTime.now().setZone(userTimeZone);
  const formattedDate = dt.toFormat("EEE LLL dd HH:mm:ss 'IST' yyyy");
  return formattedDate;
}

function getepayPortal(data, config) {
  return new Promise(async (resolve, reject) => {
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
    try {
      const requestUrl = await fetch(config["GetepayUrl"], requestOptions);
      const result = await requestUrl.text();

      const resultobj = JSON.parse(result);
      const responseurl = resultobj.response;
      const dataitem = decryptEas(
        responseurl,
        config["GetepayKey"],
        config["GetepayIV"]
      );
      const parsedData = JSON.parse(dataitem);
      resolve(parsedData);
    } catch (err) {
      reject(err);
    }
  });
}

async function generatePaymentUrl(req, requestData) {
  try {
    const { currentAmount, contactNumber, name, email } = requestData;
    const currentDate = generateDate(req);
    const data = {
      mid: process.env.MID,
      amount: currentAmount,
      merchantTransactionId: process.env.MERCHANT_ID,
      transactionDate: currentDate,
      terminalId: process.env.TERMINAL_ID,
      udf1: contactNumber,
      udf2: name,
      udf3: email,
      udf4: "",
      udf5: "",
      udf6: "",
      udf7: "",
      udf8: "",
      udf9: "",
      udf10: "",
      ru: process.env.RU_URL,
      callbackUrl: process.env.CALLBACK_URL,
      currency: process.env.CURRENCY_TYPE,
      paymentMode: process.env.PAYMENT_MODE,
      bankId: "",
      txnType: "single",
      productType: "IPG",
      txnNote: "Test Txn",
      vpa: process.env.VPA,
    };

    const config = {
      GetepayMid: process.env.MID,
      GeepayTerminalId: process.env.VPA,
      GetepayKey: process.env.GET_E_PAY_KEY,
      GetepayIV: process.env.GET_E_PAY_IV,
      GetepayUrl: process.env.GET_E_PAY_URL,
    };

    const { paymentId: transactionID, paymentUrl } = await getepayPortal(
      data,
      config
    );
    return { transactionID, paymentUrl };
  } catch (err) {
    return err.message;
  }
}

module.exports = { generateDate, generatePaymentUrl };
