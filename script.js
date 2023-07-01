const textLeft = document.querySelector(".left-container__text");
const textRight = document.querySelector(".right-container__text");
const btnEncrypt = document.querySelector(".btn__encrypt");
const btnDecrypt = document.querySelector(".btn__decrypt");
const btnCopy = document.querySelector(".right-container__copy");
const initialView = document.querySelectorAll(".initial-view");
const middleView = document.querySelectorAll(".middle-view");
const finalView = document.querySelectorAll(".final-view");

switchVisual();

textLeft.addEventListener("input", switchVisual);

btnEncrypt.addEventListener("click", () => {
  const inputText = textLeft.value;
  if (checkText(inputText)) {
    const toEncrypt = encrypting(inputText);
    textRight.value = toEncrypt;
    textLeft.value = "";
    switchVisual();
  } else {
    alert("Solo se permiten letras minúsculas y sin acentos.");
    window.location.reload();
  }
});

btnDecrypt.addEventListener("click", () => {
  const inputText = textLeft.value;
  if (checkText(inputText)) {
    const toDecrypt = decrypting(inputText);
    textRight.value = toDecrypt;
    textLeft.value = "";
    switchVisual();
  } else {
    alert("Solo se permiten letras minúsculas y sin acentos.");
    window.location.reload();
  }
});

btnCopy.addEventListener("click", () => {
  const copyText = textRight.value;
  navigator.clipboard.writeText(copyText);
  alert("El texto ha sido copiado");
});

function switchVisual() {
  const contentLeft = textLeft.value.trim();
  const contentRight = textRight.value.trim();
  const cR = contentLeft.length > 0;

  if (contentRight.length === 0) {
    //textRight.classList.contains("display-none") devuelve Boleano
    finalView.forEach((dataDisplay) => {
      dataDisplay.classList.add("display-none");
    });
    initialView.forEach((dataDisplay) => {
      dataDisplay.classList.toggle("display-none", cR);
    });
    middleView.forEach((dataDisplay) => {
      dataDisplay.classList.toggle("display-none", !cR);
    });
  } else {
    finalView.forEach((dataDisplay) => {
      dataDisplay.classList.remove("display-none");
    });
    initialView.forEach((dataDisplay) => {
      dataDisplay.classList.add("display-none");
    });
    middleView.forEach((dataDisplay) => {
      dataDisplay.classList.add("display-none");
    });
  }
}

function checkText(input) {
  if (!input == 0 && input.match(/^[a-z0-9/ /ñ:;,.¿?¡!]+$/)) {
    return true;
  }
}

/* La expresión regular /^[a - záéíóúñü\s\W]+$/ 
permite validar que el texto contenga solo caracteres en minúsculas, la letra "ñ", caracteres especiales y espacios.
La i después del último / permite que la validación sea insensible a mayúsculas y minúsculas. */

function encrypting(inputText) {
  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  inputText = inputText.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (inputText.includes(matrizCodigo[i][0])) {
      inputText = inputText.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }
  }
  return inputText;
}

function decrypting(inputText) {
  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  inputText = inputText.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (inputText.includes(matrizCodigo[i][1])) {
      inputText = inputText.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
    }
  }
  return inputText;
}
