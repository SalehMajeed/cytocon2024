// const {encryptEas}=require('./components/encryptEas');
// const {decryptEas}=require('./components/decryptEas');

// const getepayPortal = (data, config) => {  
//   const JsonData = JSON.stringify(data);
//   var ciphertext = encryptEas(
//     JsonData,
//     config["GetepayKey"],
//     config["GetepayIV"]
//   );
//   var newCipher = ciphertext.toUpperCase();
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var raw = JSON.stringify({
//     mid: data.mid,
//     terminalId: data.terminalId,
//     req: newCipher,
//   });

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch(config["GetepayUrl"], requestOptions)
//     .then((response) => response.text())
//     .then((result) => {      
//       var resultobj = JSON.parse(result);
//       var responseurl = resultobj.response; 
//       var dataitem = decryptEas(
//         responseurl,
//         config["GetepayKey"],
//         config["GetepayIV"]
//       );
      
//       // Parse the decrypted data
//       const parsedData = JSON.parse(dataitem);

//       // Extract and return the payment URL
//       const paymentUrl = parsedData.paymentUrl;
//       console.log('Payment URL:', paymentUrl);
//       return paymentUrl;
      
//     })
//     .catch((error) => console.log("error", error));
// };


// module.exports= getepayPortal;



