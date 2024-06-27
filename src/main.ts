import "./style.css";
import "./typescript.svg";

class TypeWriter {
  constructor(txtElement: Element, words: string, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = wait;
    this.type();
    this.isDeleting = false;
  }
  txtElement: Element;
  words: string;
  txt: string;
  wordIndex: number;
  wait: number;
  isDeleting: boolean;
  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  if (!txtElement) return;
  const wordAttr = txtElement.getAttribute("data-words");
  if (!wordAttr) return;
  const words = JSON.parse(wordAttr);
  const wait = txtElement.getAttribute("data-wait") || "3000";

  new TypeWriter(txtElement, words, parseInt(wait));
}
