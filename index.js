const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let finished = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            display.textContent = "";
            finished = false;
        } else if (value === "CE") {
            if (!finished) {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput;
            }
        } else if (finished) {
            return;
        } else if (value === "=") {
            try {
                if (currentInput.includes("/0")) {
                    display.textContent = "Error: division by 0";
                    currentInput = "";
                } else {
                    currentInput = eval(currentInput).toString();
                    display.textContent = currentInput;
                }
                finished = true;
            } catch {
                display.textContent = "Error";
                currentInput = "";
                finished = true;
            }
        } else {
            const operators = ["+", "-", "*", "/"];
            const lastChar = currentInput.slice(-1);

            if (operators.includes(value) && operators.includes(lastChar)) {
                return;
            }

            if (lastChar === "0" && !operators.includes(value) && currentInput.length === 1) {
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        }
    });
});
