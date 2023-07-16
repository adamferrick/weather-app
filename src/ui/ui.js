export default class Ui {
  #form;
  #input;

  constructor(formSel, inputSel, weatherCb) {
    this.#form = document.querySelector(formSel);
    this.#input = document.querySelector(inputSel);

    this.#form.onsubmit = async (e) => {
      e.preventDefault();
      const data = await weatherCb(this.#input.value);
      console.log(data);
    };
  }
}
