import { SETUP, COLORS } from "./literals.js";
import { createColorPicker } from "./utils.js";
import { colorPickerListener } from "./listeners.js";

export async function init() {
  const responses = new Promise((resolve, reject) => {
    // CREATE INITIAL FORM
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = SETUP;
    const form = tmpContainer.childNodes[0];

    // APPEND INITIAL FORM TO DOM
    document.querySelector("body").appendChild(form);

    // Inititalize the ColorPickerListener
    const pickerListener = colorPickerListener();

    // Set up a ColorPicker for each player
    const picker1 = createColorPicker("picker1", "red");
    pickerListener.bind(this.player1)(picker1);
    document.getElementById("p1Setup").appendChild(picker1);
    const picker2 = createColorPicker("picker2", "blue");
    pickerListener.bind(this.player2)(picker2);
    document.getElementById("p2Setup").appendChild(picker2);

    // Attach Listener to the submit button
    document.getElementById("submit").addEventListener("click", () => {
      // GET CANVAS AND INITIALIZE
      const canvas = document.getElementById("testCanvas");
      this.ctx = canvas.getContext("2d");

      //CREATE PLAYERS
      this.player1.name = document.getElementById("name_1").value;
      this.player2.name = document.getElementById("name_2").value;
      document.getElementById("player1").textContent = this.player1.name;
      document.getElementById("player2").textContent = this.player2.name;
      console.log(this.player1);
      console.log(this.player2);
      form.parentNode.removeChild(form);
      this.ctx.fillStyle = COLORS[this.player1.color];
      this.ctx.fillRect(this.player1.x_pos, this.player1.y_pos, 5, 5);
      this.ctx.fillStyle = COLORS[this.player2.color];
      this.ctx.fillRect(this.player2.x_pos, this.player2.y_pos, 5, 5);
      resolve(this.ctx);
    });
  });
  return responses;
}
