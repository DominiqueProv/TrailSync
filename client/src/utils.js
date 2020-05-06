// const modifyString = (part, whole) => {
//   const indexOfPart = whole.toLowerCase().indexOf(part);
//   const part1 = whole.slice(0,indexOfPart)
//   const part2 = whole.slice(indexOfPart+part.length)
//   const modification = [part1, part2]
//   return modification;
// }
const modifyString = (part, whole) => {
  const indexOfPart = whole.toLowerCase().indexOf(part.toLowerCase());
  const part1 = whole.substring(0, indexOfPart);
  const part2 = whole.substring(indexOfPart, indexOfPart + part.length);
  const part3 = whole.substring(indexOfPart + part.length);
  const modification = [part1, part2, part3];
  return modification;
};
// need to add the image tp be sent back
export const typeaheadSuggestion = (input, totalOptions) => {
  const suggestions1 = [];
  console.log(totalOptions);
  totalOptions.forEach((option) => {
    console.log("<<<<<", option.properties.Toponyme1);

    if (option.properties.Toponyme1.toLowerCase().includes(input.toLowerCase()))
      suggestions1.push({
        id: option._id,
        name: option.properties.Toponyme1,
      });
    console.log("<<<<<", suggestions1);
  });
  // const suggestions2 = [];
  // suggestions1.forEach((suggestion) =>
  //   suggestions2.push({
  //     id: suggestion.id,
  //     parts: modifyString(input, suggestion.name), //returns an array with 2 indexes: 1-everything in the 'name' string BEFORE the input.
  //     // 2 -everything in the 'name' string AFTER the input.
  //   })
  // );
  return suggestions1;
};

// const modifyPriceArr = (priceArr) => {
//   return priceArr.map((priceItem) => ({
//     priceNumber: priceItem.price.slice(1) * 100, // eliminates the '$', and multiplies by 100 to get rid of the decimal point.
//     quantity: priceItem.quantity,
//   }));
// };

// export const totalAmount = (items, itemsId) => {
//   const priceArr = itemsId.map((id) => ({
//     price: items[id].price,
//     quantity: items[id].quantity,
//   }));
//   if (priceArr.length) {
//     const modifiedPriceArr = modifyPriceArr(priceArr);
//     const totalSum = modifiedPriceArr.reduce(
//       (temporarySum, priceItem) =>
//         temporarySum + priceItem.priceNumber * priceItem.quantity,
//       0
//     ); // calculates the sum, multiplying each price in the quantity
//     return (totalSum / 100).toFixed(2); // need to divide by 100, because we multiplied by 100
//   } else return -1; // if there is a problem, returns -1
// };

// export const validateString = (string) => {
//   if (typeof string === "string" && string.length > 0) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const validateEmail = (email) => {
//   // taken from: https://www.w3resource.com/javascript/form/email-validation.php
//   // checks: 'LL..LL@LL..LL.LLL.LLLL.LL
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const validateAddress = (address) => {
//   if (/^(\w+ ?\b(\w+)?\b[0-9]+)|(^[0-9]+ ?\b\w+ ?\b(\w+)?)/.test(address)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const validatePostalCode = (postalCode) => {
//   if (/^[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/.test(postalCode)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const validateOnlyDigits = (string) => {
//   if (/^[0-9]+$/.test(string)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const validateOnlyLetters = (string) => {
//   if (/^[A-Za-z]+$/.test(string)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const validateCreditCard = (string) => {
//   //card info taken from https://www.w3resource.com/javascript/form/credit-card-validation.php
//   if (/^[0-9]+$/.test(string)) {
//     // if(/^(?:3[47][0-9]{13})$/.test(string) || // american Express
//     // /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(string) || // Visa
//     // /^(?:5[1-5][0-9]{14})$/.test(string) || //MasterCard
//     // /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/.test(string) || //discover
//     // /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(string) || //diners Club
//     // /^(?:(?:2131|1800|35\d{3})\d{11})$/.test(string) // JCB Card // what is this?
//     // )
//     return true;
//   } else {
//     return false;
//   }
// };
