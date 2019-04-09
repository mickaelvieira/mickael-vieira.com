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

export default () => {
  if (!document.querySelector || !document.addEventListener) {
    return;
  }

  const link = document.querySelector(".link-icon-contact");

  if (!link) {
    return;
  }

  const make = () => {
    link.href = parts.join("");
    document.removeEventListener("mousemove", make);
  };

  document.addEventListener("mousemove", make);
};
