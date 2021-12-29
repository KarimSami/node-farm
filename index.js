const fs = require("fs");
const http = require("http");
const { URL, URLSearchParams } = require("url");
const { replaceTemplate } = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  const url = new URL(req.url, baseURL);
  const pathname = url.pathname;
  const reqProductId = +new URLSearchParams(url.searchParams).get("id");

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    const productCards = productData.map((product) =>
      replaceTemplate(templateCard, product)
    );

    const overviewPage = templateOverview.replace(
      /{%PRODUCT_CARDS%}/g,
      productCards
    );

    res.writeHead("200", {
      "Content-type": "text/html",
    });
    res.end(overviewPage);

    // product page
  } else if (pathname === "/product") {
    const product = productData[reqProductId];
    const productPage = replaceTemplate(templateProduct, product);
    res.writeHead("200", {
      "Content-type": "text/html",
    });
    res.end(productPage);

    // api
  } else if (pathname === "/api") {
    const productData = JSON.parse(data);
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requestss on port 8000");
});
