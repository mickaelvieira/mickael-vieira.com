const parts = [
  "\u006d",
  "\u0061",
  "\u0069",
  "\u006c",
  "\u0074",
  "\u006f",
  "\u003a",
  "\u0063",
  "\u006f",
  "\u006e",
  "\u0074",
  "\u0061",
  "\u0063",
  "\u0074",
  "\u0040",
  "\u006d",
  "\u0069",
  "\u0063",
  "\u006b",
  "\u0061",
  "\u0065",
  "\u006c",
  "\u002d",
  "\u0076",
  "\u0069",
  "\u0065",
  "\u0069",
  "\u0072",
  "\u0061",
  "\u002e",
  "\u0063",
  "\u006f",
  "\u006d"
];

export default function(window) {
  const doc = window.document;
  const handler = function() {
    doc.removeEventListener("mousemove", handler);

    const link = document.querySelector(".link-icon-contact");
    if (link) {
      link.href = parts.join("");
    }
  };

  if (document.querySelector) {
    doc.addEventListener("mousemove", handler);
  }
}
