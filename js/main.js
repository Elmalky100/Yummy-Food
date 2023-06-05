///<reference path="../typings/globals/jquery/index.d.ts" />



let searchContainer = document.getElementById("searchContainer")
let rowData = document.getElementById("rowData");
input1 = document.querySelector(".input1")
input2 = document.querySelector(".input2")
let data = document.getElementById("data");
let details = document.getElementById("details");


$(document).ready(function () {
    $(".loading-screen").fadeOut(500)
})

$(".side-nav-menu .open-close-icon").click(function () {
    let left = $(".side-nav-menu").css("left")
    if (left == "0px") {
        closeSideNav()
        $(".links li").animate({ top: 300 }, 500)
    }
    else {
        $(".side-nav-menu").animate({ left: `0px` }, 500)
        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
        }
    }
})

function closeSideNav() {
    let width = $(".nav-tab").outerWidth(true)
    $(".side-nav-menu").animate({ left: `-${width}px` }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({ top: 300 }, 500)
}
closeSideNav()
$(".links li").click(function () {
    closeSideNav()
})


async function Meals() {
    $(".inner-loading-screen").fadeIn(300)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await res.json()
    displayMeals(data.meals)
    $(".inner-loading-screen").fadeOut(300)
}
Meals()

function displayMeals(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-lg-3 col-md-4 col-sm-6  meal " >
                <div class=" position-relative overflow-hidden rounded-2 cursor-pointer mealclick" onclick="getMealDetails(${arr[i].idMeal})" idmeal="${arr[i].idMeal}">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="image" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
         </div> 
        `
    }
    rowData.innerHTML = temp

}

async function getMealDetails(id) {
    $(".inner-loading-screen").fadeIn(300)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await res.json()
    console.log(data.meals[0])
    displayMealDetails(data.meals[0])
    $(".inner-loading-screen").fadeOut(300)
}


function displayMealDetails(meal) {
    let data = document.getElementById("data");
    data.classList.add("d-none");
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tagsStr = ``
    if (meal.strTags != null) {
        let tags = meal.strTags.split(",")
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
    }

    let temp = `<div class="row py-5 g-4 " id="mealDetails" >
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}"
            alt="image">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
        </ul>
    
        <a target="_blank" href="${meal.strSource}"
            class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}"
            class="btn btn-danger">Youtube</a>
    </div>
        </div>`;
    document.getElementById("mealDetails").innerHTML = temp;
    let details = document.getElementById("details");
    details.classList.replace("d-none", "d-block");

}


//__________________________________________________________________________searh
let search = document.querySelector(".li1")
function searchinput() {
    search.addEventListener("click", function () {
        searchContainer.classList.remove("d-none")
        data.classList.add("d-none")
        details.classList.add("d-none")
        content1.classList.add("d-none")
        Category1.classList.add("d-none")
        ingredient1.classList.add("d-none")
        area1.classList.add("d-none")
    })
}
searchinput()





async function searchByName(x) {
    $(".inner-loading-screen").fadeIn(300)
    details.classList.add("d-none")
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    let data = await res.json()
    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

document.querySelector(".input1").addEventListener("keyup", e => {
    let x = e.target.value
    searchByName(x)
    data.classList.remove("d-none")
})


async function searchByFirstName(x) {
    $(".inner-loading-screen").fadeIn(300)
    x == "" ? x = "a" : "";
    details.classList.add("d-none")
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
    let data = await res.json()
    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

document.querySelector(".input2").addEventListener("keyup", e => {
    let x = e.target.value
    searchByFirstName(x)
    data.classList.remove("d-none")
})



function clearInput1() {
    input2.value = ""
    data.classList.add("d-none")
    details.classList.add("d-none")
}
function clearInput2() {
    input1.value = ""
    data.classList.add("d-none")
    details.classList.add("d-none")
}



// ______________________________________________________________category

let Category1 = document.getElementById("Category1")
let Category = document.querySelector(".li2")

    Category.addEventListener("click", function () {
        searchContainer.classList.add("d-none")
        content1.classList.add("d-none")
        details.classList.add("d-none")
        data.classList.remove("d-none")
        ingredient1.classList.add("d-none")
        area1.classList.add("d-none")

        getCategories()
    })

async function getCategories() {
    $(".inner-loading-screen").fadeIn(300)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await res.json()
    console.log(data.categories)
    displayCategories(data.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp += `
            <div class="col-lg-3 col-md-4 col-sm-6" id="category2" onclick="getCategoryMeals('${arr[i].strCategory}')">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer ">
                        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
            </div>
            `
    }
    rowData.innerHTML = temp
}

async function getCategoryMeals(category) {
    $(".inner-loading-screen").fadeIn(300)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await res.json()
    console.log(data.meals)
    displayMeals(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

// ______________________________________________________area


let area1 = document.getElementById("areacountry")
let area2 = document.querySelector(".li3")
area2.addEventListener("click", function () {
    searchContainer.classList.add("d-none")
    content1.classList.add("d-none")
    details.classList.add("d-none")
    data.classList.remove("d-none")
    ingredient1.classList.add("d-none")
    Category1.classList.add("d-none")
    getArea()
})

async function getArea() {
    $(".inner-loading-screen").fadeIn(300)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await res.json()
    console.log(data.meals)
    displayArea(data.meals)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
            <div class="col-lg-3 col-md-4 col-sm-6" onclick="getAreaMeals('${arr[i].strArea}')">
                    <div class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${arr[i].strArea}</h3>
                    </div>
            </div>
            `
    }
    rowData.innerHTML = temp
}


async function getAreaMeals(area) {
    $(".inner-loading-screen").fadeIn(300)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await res.json()
    console.log(data.meals)
    displayMeals(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


// ____________________________________________________________ingredient

let ingredient1 = document.getElementById("Ingredients")
let ingredient2 = document.querySelector(".li4")
ingredient2.addEventListener("click", function () {
    searchContainer.classList.add("d-none")
    content1.classList.add("d-none")
    details.classList.add("d-none")
    data.classList.remove("d-none")
    area1.classList.add("d-none")
    Category1.classList.add("d-none")
    getIngredients()
})

async function getIngredients() {
    $(".inner-loading-screen").fadeIn(300)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await res.json()
    console.log(data.meals)
    displayIngredients(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


function displayIngredients(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp += `
            <div class="col-lg-3 col-md-4 col-sm-6" onclick="getIngredientsMeals('${arr[i].strIngredient}')">
                    <div class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
            </div>
            `
    }

    rowData.innerHTML = temp
}


async function getIngredientsMeals(ingredients) {
    $(".inner-loading-screen").fadeIn(300)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let data = await res.json()
    console.log(data.meals)
    displayMeals(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

// ____________________________________________________________contact

let content1 = document.getElementById("rowData1")
let contact2 = document.querySelector(".li5")
function contactinput() {
    contact2.addEventListener("click", function () {
        content1.classList.remove("d-none")
        data.classList.add("d-none")
        searchContainer.classList.add("d-none")
        details.classList.add("d-none")
        Category1.classList.add("d-none")
    })
}
contactinput()


let submitBtn = document.getElementById("submitBtn")
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput = document.getElementById("phoneInput")
let ageInput = document.getElementById("ageInput")
let passwordInput = document.getElementById("passwordInput")
let repasswordInput = document.getElementById("repasswordInput")


function validation_NameInput() {
    let reg = /^[a-zA-Z ]+$/;
    return reg.test(nameInput.value)


}
nameInput.addEventListener("blur", function () {
    if (validation_NameInput() == true) {
        nameAlert.classList.add('d-none')
    } else {
        nameAlert.innerHTML = ' Special characters and numbers not allowed *for examble ahmed'
        nameAlert.classList.remove('d-none')
    }
})

function validation_EmailInput() {
    let reg = /^[a-zA-Z0-9_-]{3,20}@[a-zA-Z]{3,10}\.[a-zA-z]{2,3}$/
    return reg.test(emailInput.value)

}
emailInput.addEventListener("blur", function () {

    if (validation_EmailInput() == true) {
        emailAlert.classList.add('d-none')
    } else {
        emailAlert.innerHTML = ` Email not valid *forexample  ali@yyy.zzz`
        emailAlert.classList.remove('d-none')
    }
})


function validation_PhoneInput() {
    let reg = /^(010|011|015|012)[0-9]{8}$/
    return reg.test(phoneInput.value)

}
phoneInput.addEventListener("blur", function () {

    if (validation_PhoneInput() == true) {
        phoneAlert.classList.add('d-none')
    } else {
        phoneAlert.innerHTML = `Enter valid Phone Number begain by 010 or 012 or 011 or 015 for example 01228887112`
        phoneAlert.classList.remove('d-none')
    }
})


function validation_AgeInput() {
    let reg = /^([1-7][0-9]|80)$/
    return reg.test(ageInput.value)
}
ageInput.addEventListener("blur", function () {

    if (validation_AgeInput() == true) {
        ageAlert.classList.add('d-none')
    } else {
        ageAlert.innerHTML = ` Enter valid age from 10 to 80`
        ageAlert.classList.remove('d-none')
    }
})

function validation_PasswordInput() {
    let reg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    return reg.test(passwordInput.value)
}
passwordInput.addEventListener("blur", function () {

    if (validation_PasswordInput() == true) {
        passwordAlert.classList.add('d-none')
    } else {
        passwordAlert.innerHTML = `"Enter valid password *Minimum eight characters, at least one letter and one number:*"`
        passwordAlert.classList.remove('d-none')
    }
})


function validation_RepasswordInput() {
    if (passwordInput.value == repasswordInput.value) {
        return true;
    }

    return false;
}
repasswordInput.addEventListener("blur", function () {

    if (validation_RepasswordInput() == true) {
        repasswordAlert.classList.add('d-none')
        if (validation_NameInput() && validation_EmailInput() && validation_AgeInput() && validation_PhoneInput() && validation_PasswordInput() && validation_RepasswordInput()) {
            submitBtn.removeAttribute("disabled")
        }
    } else {
        repasswordAlert.innerHTML = `"Enter valid repassword same the password you has enter `
        repasswordAlert.classList.remove('d-none')
    }
})
















