export const enToAr = {
    Fajr: "الفجر",
    Shuruq: "الشروق",
    Zuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
};

export function createHTMLTag(options, attributes, styles) {
    const element = document.createElement(options.tag);
    if (options.innerText) {
      element.innerText = options.innerText;
    }
    if (options.innerHTML) {
      element.innerHTML = options.innerHTML;
    }
    if (options.parent) {
      options.parent.append(element);
    }
    if (attributes) {
      for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
  
    if (styles) {
      Object.assign(element.style, styles);
    }
    return element;
}
