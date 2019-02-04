// let allTheFoods = "";
fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    // The function below, is the same as above.:
    // .then(function(Foodresponse){
    //     return Foodresponse.json()
    // })
    .then(parsedFoods => {
        // console.table(parsedFoods);
        let allTheFoods = "";
        // allTheFoods = parsedFoods;
        // for(let i = 0; i < parsedFoods.length; i++) {
        //     console.log("This is a food", parsedFoods[i]);
        // }
        // The function below, is the same as above.:
        parsedFoods.forEach(singleFood => {
            // console.log(singleFood);
            // let allTheProducts = "";
            fetch(`https://world.openfoodfacts.org/api/v0/product/${singleFood.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    singleFood.countryOfOrigin = productInfo.product.countries;
                    singleFood.calories = `${productInfo.product.nutriments.energy} ${productInfo.product.nutriments.energy_unit}`
                    for (let i = 0; i < productInfo.product.ingredients.length; i++) {
                    singleFood.ingredients += `, ${productInfo.product.ingredients[i].text}`;
                    console.log(singleFood.name, productInfo.product.ingredients[i].text);
                    }
                    allTheFoods = foodFactory(singleFood);
                    document.querySelector("#foodList").innerHTML += allTheFoods;
                })
            })
        })
// Function returns string template: Template is the HTML representation for food item(s)
        const foodFactory = singleFood => {
            // console.log(singleFood);
            let singleFoodHTML = `
            <div>
            <h3>${singleFood.name}</h3>
            <h4>${singleFood.ethnicity} ${singleFood.category}</h4>
            `
            if (singleFood.ingredients) {
                singleFoodHTML += `<p>${singleFood.ingredients}</p>`
            }
            if (singleFood.countryOfOrigin) {
                singleFoodHTML += `<p>${singleFood.countryOfOrigin}`

            }
            if (singleFood.calories) {
                singleFoodHTML += `<p>${singleFood.calories}`

            // The "if" is only necessary, IF you are missing barcodes! (so it doesn't try to pull something that is not there)!

            }
            // Function to Replace "_" characters with spaces!
            function removeUnderscore() {
            var singleFoodHTMLRemoveUndefined = singleFoodHTML.replace(/_|undefined, /g, "");
            // The above code does the same as what is listed below:
            // var singleFoodHTMLRemoveUndefined = singleFoodHTML.replace((/_/g, "").replace(/undefined, /g, '');
            singleFoodHTML = singleFoodHTMLRemoveUndefined;
            }
            removeUnderscore();
            return singleFoodHTML;
        }

        // for (let i = 0; i < productInfo.product.ingredients.length; i++) {
        //     console.log(singleFood.ingredients);
        // }
        // // allTheProducts += `${singleFood.ingredients}`;
        // // console.log(allTheProducts);        
        // allTheFoods += `<div><b>${singleFood.name}</b><br>${singleFood.ethnicity} ${singleFood.category}: ${singleFood.ingredients}</div>`
        // document.querySelector("#foodList").innerHTML = allTheFoods;


// const foodListSum = singlefood();

// function printFoodList(foodListSum) {
//     document.getElementById('foodList').innerHTML = foodListSum;
//     console.log(foodListSum);
// }

// These functions do the same thing:
// Example #1
    // function returnSum(num1, num2){
    //     return num1 + num2;
    // }
// Example #2
    // const returnSumWithFatArrow = (num1, num2) => num1 + num2;


// [Normal] writing "Hello, world" to console:
    // console.log("Hello, world");