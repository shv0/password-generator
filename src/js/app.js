const checkboxes = document.querySelectorAll('.checkbox input');
const range = document.querySelector('#length');
const rangeNumber = document.querySelector('.length_number');
const passwordResult = document.querySelector('.password');
const push = document.querySelector('.message');


class PasswordGenerator {

    onUpdate() {
        let config = [];
        // Check checkboxes
        checkboxes.forEach((el) => {
            config.push(el.checked)
        })
    
        let lengthPassword = range.value;
        rangeNumber.textContent = lengthPassword;

        passwordResult.textContent = this.generatePassword(...config, lengthPassword);
    }

    generatePassword(isUpperCase, isLowerCase, isHasNumbers, isHasSymbols, passwordLength) {

        const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", ".", "`", "~", "|", "<", ">", "=", "-", "_"];
        const lowerLetters = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
        const upperLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const tempArr = [];
        let password = '';

        if(isUpperCase) tempArr.push(upperLetters);
        if(isLowerCase) tempArr.push(lowerLetters);
        if(isHasNumbers) tempArr.push(numbers);
        if(isHasSymbols) tempArr.push(symbols);

        console.log(tempArr);

        if(tempArr.length === 0) {
            this.pushMessage('Please, add at least one option');
        } else {
            for(let i = 0; i < passwordLength; i++) {
                password += this.getRandomFromArray(tempArr[this.getRandomNumber(0,tempArr.length - 1)]);
            }
        }
        
        return password
        
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomFromArray(arr) {
        return arr.at(this.getRandomNumber(0, arr.length - 1));
    }

    pushMessage(message) {
        push.textContent = message;
        setTimeout(() => {
            push.textContent = '';
        }, 3000);
    }

    copyPasswordOnClick() {
        navigator.clipboard
            .writeText(passwordResult.textContent)
            .then(() => {
                this.pushMessage('Copied!');
            })
            .catch((err) => {
                console.log("Something went wrong", err);
            });
    }

}


const newPassword = new PasswordGenerator();
newPassword.onUpdate();

document.querySelector(".options_password").addEventListener("change", () => newPassword.onUpdate());
document.querySelector(".update_button").addEventListener("click", () => newPassword.onUpdate());
document.querySelector(".copy_icon").addEventListener("click", () => newPassword.copyPasswordOnClick());



