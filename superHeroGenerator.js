// mytoken
// 3481609088744549

// site

// random
// https://superheroapi.com/api/access-token/character-id


// search
// https://superheroapi.com/api.php/3481609088744549/search/${name}


// HTML elements
let container = document.querySelector('[container]')
console.log(container);
const randomBtn = document.querySelector('[randomBtn]')
const searchBtn = document.querySelector('[searchBtn]')
console.log(randomBtn);

let input = document.querySelector('input')

const myToken = 3481609088744549;



const randomNumber = () => {

    let randomNo = Math.floor(Math.random() * 731) + 1
    return randomNo
}

console.log(randomNumber());

randomBtn.onclick = function () {

    fetch(`https://superheroapi.com/api.php/${myToken}/${randomNumber()}`)
        .then(response => response.json())
        .then(output => {
            console.log(output);
            console.log(output.image.url);
            console.log(output.name);
            generateSuperHero(output)
        })
}

searchBtn.addEventListener('click', () => {
    searchFuncton()
})
const searchFuncton = () => {

    let inputValue = input.value

    if (!inputValue) {
        alert("error,you didn't enter Anything")
        return;
    }
    fetch(`https://superheroapi.com/api.php/${myToken}/search/${inputValue}`)
        .then(response => response.json())
        .then(output => {
            console.log(output);
            generateSuperHero(output.results[0])
        })

    input.value = ""
}


const statsSymbol = {
    intelligence: "🧠",
    strength: "💪🏿",
    speed: "💨",
    durability: "🛡️",
    power: "🔋",
    combat: "⚔️"
}

const generateSuperHero = (jsonReponse) => {
    container.innerHTML = `<h1>${jsonReponse.name}</h1><img src = ${jsonReponse.image.url}  width='400px' height ='400px'>`

    // console.log(jsonReponse.powerstats);

    const stats = jsonReponse.powerstats

    let convertToArray = Object.keys(stats)
    let mapArray = convertToArray.map(stat => {
        return `<h3>${statsSymbol[stat]}${stat.charAt(0).toLocaleUpperCase() + stat.slice(1, stat.length)}: ${stats[stat]}</h3>`
    })

    // console.log(convertToArray);

    container.innerHTML += mapArray.join('')
}





window.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        searchFuncton()
    }
})

