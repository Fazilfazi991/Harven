const { PdfReader } = require("pdfreader");
const fs = require('fs');

let text = "";

new PdfReader().parseFileItems("HARVEN-Profile.pdf", (err, item) => {
  if (err) console.error("error:", err);
  else if (!item) {
     fs.writeFileSync("pdf_text.txt", text);
     console.log("Done");
  }
  else if (item.text) text += item.text + " ";
});
