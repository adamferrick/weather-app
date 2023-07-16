export default class Ui {
  #elements;

  constructor(weatherCb, selectors) {
    // create a new object of elements from the passed object of selectors
    this.#elements = Object.fromEntries(
      Object.entries(selectors).map(([k, v]) => [k, document.querySelector(v)]),
    );

    this.#elements.form.onsubmit = async (e) => {
      e.preventDefault();
      const data = await weatherCb(this.#elements.input.value);
      console.log(data);
    };
  }
}
