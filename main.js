let inputfirst = document.querySelector(".inputfrom");
let inputsecond = document.querySelector(".inputto");

let leftButton = document.querySelectorAll(".valuleft");
let rightButton = document.querySelectorAll(".valuright");

let leftText = document.querySelector(".left-text");
let rightText = document.querySelector(".right-text");   

let LEFTCurrency = "RUB";
let RIGHTCurrency = "USD";

leftCurrency();

leftButton.forEach((item)=>{
    item.addEventListener("click", (e)=>{
        leftButton.forEach((item) =>{
            item.classList.remove("checked");
        });
        LEFTCurrency = e.target.innerHTML;
        leftCurrency();
        rightCurrency();

        e.target.classList.add("checked");
    });
});

rightButton.forEach((item)=>{
    item.addEventListener("click", (e) =>{
        rightButton.forEach((item)=>{
            item.classList.remove("checked");
        });
            RIGHTCurrency = e.target.innerHTML;
            leftCurrency();
            rightCurrency();

            e.target.classList.add("checked");
    });
});

function leftCurrency() {
    fetch(
        `https://api.exchangerate.host/latest?base=${LEFTCurrency}&symbols=${RIGHTCurrency}`
    )
    .then((res) => res.json())
    .then((data) => {
        leftText.innerHTML = `1 ${LEFTCurrency} = ${data.rates[RIGHTCurrency].toFixed(4)} ${RIGHTCurrency}`;
        if(isNaN(inputfirst.value)) {
            inputsecond.value = "";
            
        }
        else {
            inputsecond.value= (inputfirst.value * data.rates[RIGHTCurrency]).toFixed(2);
        }

        inputfirst.addEventListener("keyup", (e)=>{
            inputfirst.value = e.target.value;
            inputfirst.value = inputfirst.value.split(",").join(".");
            if(isNaN(inputfirst.value)) {
                inputsecond.value = "";
            }
            else {
                inputsecond.value= (inputfirst.value * data.rates[RIGHTCurrency]).toFixed(2);
            }

        });
    });
}

function rightCurrency () {
    fetch(
        `https://api.exchangerate.host/latest?base=${RIGHTCurrency}&symbols=${LEFTCurrency}`
    )
    .then((res)=> res.json())
    .then((data) => {
    rightText.innerHTML = `1 ${RIGHTCurrency} = ${data.rates[LEFTCurrency].toFixed(4)} ${LEFTCurrency}`;

    inputsecond.addEventListener("keyup", (e)=>{
        inputsecond.value = e.target.value;
        inputsecond.value=inputsecond.value.split(",").join(".");

        if(isNaN(inputsecond.value)){
            inputfirst.value="";
        }
        else{
            inputfirst.value = (inputsecond.value * data.rates[LEFTCurrency]).toFixed(2); 
        }
    });
    });
}

fetch(
    `https://api.exchangerate.host/latest?base=${RIGHTCurrency}&symbols=${LEFTCurrency}`
)
.then((res) => res.json())
.then((data) =>{
    leftText.innerHTML = `1${RIGHTCurrency} = ${data.rates[LEFTCurrency]} ${LEFTCurrency}`;
    if(isNaN(inputsecond.value)) {
        inputfirst.value = "";
    }
    else{
        inputfirst.value = (inputsecond.value * data.rates[LEFTCurrency]).toFixed(2);
    }

    inputsecond.addEventListener("keyup", (e) =>{
        inputsecond.value= e.target.value;
        inputsecond.value= inputsecond.value.split(",").join(".");

        if(isNaN(inputsecond.value)) {
            inputfirst.value = "";
        }
        else{
            inputfirst.value = (inputsecond.value * data.rates[LEFTCurrency]).toFixed(2);
        }
    });
});