const replaceTemplate = (template, product) => {
  let output = template
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%DESCRIPTION%}/g, product.description)
    .replace(/{%ID%}/g, product.id);

  if (!product.organic) output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

module.exports = { replaceTemplate };
