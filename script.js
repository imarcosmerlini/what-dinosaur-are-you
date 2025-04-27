window.addEventListener("load", (event) => {
  getDinossaurs();
});
const submitBt = document.getElementById("submit");
const nameInput = document.getElementById("name");

nameInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitBt.click();
  }
});

submitBt.addEventListener("click", async () => {
  let name = document.getElementById("name");
  if (name.value == "") {
    alert(
      "Informe seu Nome, Sobrenome, Cartão de Crédito: (Número, Válidade, Dig. Verificador, Nome no cartão)",
    );
    return;
  }
  if (name.value.length < 3) {
    alert(`Só ${name.value.length} letras no nome?`);
    return;
  }
  let dinosaurs = localStorage.getItem("dinosaurs");
  dinosaurs = JSON.parse(dinosaurs);
  const youAreIndex = getRandomInt(dinosaurs.length);

  // TODO: Concatenar o nome + o nome do dinossauro
  name = `${captalize(name.value)} ${captalize(dinosaurs[youAreIndex].name)}`;
  console.log(`Você é ${name}`);

  // TODO: Mostrar a imagem do dinossauro
  const image = document.getElementById("image");
  image.src = dinosaurs[youAreIndex].image;
  const dinosaurName = document.getElementById("dinosaur-name");
  dinosaurName.innerHTML = name;

  image.style.visibility = "visible";
  dinosaurName.style.visibility = "visible";
});

async function getDinossaurs() {
  const api = "https://dinoapi.brunosouzadev.com/api/dinosaurs";
  try {
    let response = await fetch(api);
    response = await response.json();
    localStorage.setItem("dinosaurs", JSON.stringify(response));
  } catch (e) {
    console.log(e.message);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function captalize(word) {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetterCap + remainingLetters;
}
