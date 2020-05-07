//jshint esversion:6

let select = document.getElementById("numOfServing");
for (let i = 1; i <= 72; i++) {
  let opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i;
  select.appendChild(opt);
}

$("#nutrientResult").hide();

$("#analyze").click(function(){
  Analyze();
});

$("#sampleRecipe").click(function(){
  $("#recipeName").val("Sample Recipe");
  $("#recipeIngredients").val("3 medium carrots\n1 medium sweet potato\n1 tablespoon olive oil\n1/8 teaspoon salt\n 2 tablespoons pure maple syrup");
  $("#numOfServing").val(1);
  Analyze();
});

$("#clear").click(function() {
  $("#recipeIngredients").val("");
  $("#recipeName").val("");
  $("#numOfServing").val(null);
  $("#servingSize").val("");
  $("#nutrientResult").hide();
});

function Analyze() {
  let arrayOfLines = $("#recipeIngredients")
    .val()
    .split("\n");
  let numOfServing = $("#numOfServing").val();
  let recipeName = $("#recipeName").val();
  let jsonObj = {
    title: recipeName,
    ingr: arrayOfLines,
    yield: numOfServing
  };
  let jsonobj = JSON.stringify(jsonObj);
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://api.edamam.com/api/nutrition-details?app_id=4426de42&app_key=345b8cfd43f0f84956e187cdfeacb13d"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    let jsonResponse = xhr.response;
    let responseObj = JSON.parse(jsonResponse);
    console.log(responseObj);
    if (responseObj.error) {
      alert("Low quality input");
    }
    else {
      $("#nutrientResult").show();
      $("#serving").html(responseObj.yield);
      $(".calories").html(((responseObj.calories)/responseObj.yield).toFixed(2));
      $("#totalFat").html((responseObj.totalNutrients.FAT.quantity/responseObj.yield).toFixed(2));
      $("#total-fat").html((responseObj.totalDaily.FAT.quantity/responseObj.yield).toFixed(2));
      $("#saturatedFat").html(((
        responseObj.totalNutrients.FASAT.quantity
      )/responseObj.yield).toFixed(2));
      $("#saturated-fat").html(((
        responseObj.totalDaily.FASAT.quantity
      )/responseObj.yield).toFixed(2));
      $("#cholestrol").html(((
        responseObj.totalNutrients.CHOLE.quantity
      )/responseObj.yield).toFixed(2));
      $("#cholestrol-1").html(((
        responseObj.totalDaily.CHOLE.quantity
      )/responseObj.yield).toFixed(2));
      $("#sodium").html(((responseObj.totalNutrients.NA.quantity)/responseObj.yield).toFixed(2));
      $("#sodium-1").html(((responseObj.totalDaily.NA.quantity)/responseObj.yield).toFixed(2));
      $("#totalCarbs").html(((
        responseObj.totalNutrients.CHOCDF.quantity
      )/responseObj.yield).toFixed(2));
      $("#total-carbs").html(((
        responseObj.totalDaily.CHOCDF.quantity
      )/responseObj.yield).toFixed(2));
      $("#dietaryFiber").html(((
        responseObj.totalNutrients.FIBTG.quantity
      )/responseObj.yield).toFixed(2));
      $("#dietary-fiber").html(((
        responseObj.totalDaily.FIBTG.quantity
      )/responseObj.yield).toFixed(2));
      $("#totalSugar").html(((
        responseObj.totalNutrients.SUGAR.quantity
      )/responseObj.yield).toFixed(2));
      $("#protein").html(((
        responseObj.totalNutrients.PROCNT.quantity
      )/responseObj.yield).toFixed(2));
      $("#calcium").html(((
        responseObj.totalNutrients.CA.quantity
      )/responseObj.yield).toFixed(2));
      $("#calcium-1").html(((
        responseObj.totalDaily.CA.quantity
      )/responseObj.yield).toFixed(2));
      $("#pottasium").html(((
        responseObj.totalNutrients.K.quantity
      )/responseObj.yield).toFixed(2));
      $("#pottasium-1").html(((
        responseObj.totalDaily.K.quantity
      )/responseObj.yield).toFixed(2));
      $("#iron").html(((
        responseObj.totalNutrients.FE.quantity
      )/responseObj.yield).toFixed(2));
      $("#iron-1").html(((
        responseObj.totalDaily.FE.quantity
      )/responseObj.yield).toFixed(2));
    }
  };
  xhr.send(jsonobj);
}
