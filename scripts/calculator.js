const RecipesCaloriesPerOneGram = [1.85, 1.61];
function containNumbers(text) {
    for (i = 0; i < text.length; i++) {
        if (text[i] > '0' && text[i] < '9') {
            return true;
        }
    }
    return false;
}

function formatTime(value) {
    let hours = parseInt(value);
    let minutes = (value - hours) * 60;
    minutes = parseInt(minutes);
    return hours + ":" + minutes;
}
function validateForm() {
    event.preventDefault();
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    const genderElements = document.getElementsByName("gender");
    let gender = null;
    const genderError = document.getElementById("genderError");
    const height = document.getElementById("height");
    const heightError = document.getElementById("heightError");
    const weight = document.getElementById("weight");
    const weightError = document.getElementById("weightError");
    const age = document.getElementById("age");
    const ageError = document.getElementById("ageError");
    const recipe = document.getElementById("recipe");
    const recipeError = document.getElementById("recipeError");
    const portion = document.getElementById("portion");
    const portionError = document.getElementById("portionError");
    nameError.innerHTML = '';
    genderError.innerHTML = '';
    heightError.innerHTML = '';
    weightError.innerHTML = '';
    ageError.innerHTML = '';
    recipeError.innerHTML = '';
    portionError.innerHTML = '';
    let isError = false;
    for (i = 0; i < genderElements.length; i++) {
        if (genderElements[i].checked) {
            gender = genderElements[i].value;
            break;
        }
    }
    if (name.value == '' || containNumbers(name.value) || name.value.length < 3) {
        nameError.innerHTML = "Error,Name Can't be Empty or Numbers or it's length < 3"
        isError = true;
    }
    if (gender == null) {
        genderError.innerHTML = "Error, You Must Select a Gender";
        isError = true;
    }
    if (parseFloat(height.value) < 1.5 || parseFloat(height.value) > 2.0 || height.value == '') {
        heightError.innerHTML = "Error, Height Must be Between [1.5,2.0](M)";
        isError = true;
    }
    if (parseFloat(weight.value) < 30.0 || parseFloat(weight.value) > 120.0 || weight.value == '') {
        weightError.innerHTML = "Error, Weight Must be Between [30,120](KG)";
        isError = true;
    }
    if (parseInt(age.value) <= 0 || parseInt(age.value) > 100 || age.value == '') {
        ageError.innerHTML = "Error, Age Must be Between [1,100]";
        isError = true;
    }
    if (recipe.selectedIndex == 0) {
        recipeError.innerHTML = "Error, You Must Select Reecipe";
        isError = true;
    }
    if (parseFloat(portion.value) <= 0 || parseFloat(portion.value) > 3000.0 || portion.value == '') {
        portionError.innerHTML = "Error, Portion Must be Between [0.1,3000](GRAM)";
        isError = true;
    }
    if (isError) return;
    const RunRatio = 3.5;
    const ConsumedCalaories = RecipesCaloriesPerOneGram[recipe.selectedIndex - 1] * parseFloat(portion.value);
    const DeltaWeight = ConsumedCalaories / 7700;
    const newWeight = parseFloat(weight.value) + DeltaWeight;
    let newBMR;
    if (gender == 'male') {
        newBMR = 10 * newWeight + 6.25 * parseFloat(height.value) - 5 * parseInt(age.value) + 5;
    } else {
        newBMR = 10 * newWeight + 6.25 * parseFloat(height.value) - 5 * parseInt(age.value) - 12;
    }

    const BurnPerHour = RunRatio * parseFloat(weight.value);
    const TimeToBurn = ConsumedCalaories / BurnPerHour;
    document.getElementById("consumedcalo").innerHTML = "Consumed Calories : " + "<strong>" + ConsumedCalaories + "</strong>";
    document.getElementById("expweight").innerHTML = "Expected Weight : " + "<strong>" + newWeight + "</strong>";
    document.getElementById("bmr").innerHTML = "BMR : " + "<strong>" + newBMR + "</strong>";
    document.getElementById("timeburn").innerHTML = "Time to Burn : " + "<strong>" + formatTime(TimeToBurn) + "</strong>";
}