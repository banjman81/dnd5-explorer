const raceList = $('.race-menu')
const classList = $('.class-menu')

const mainKey = "https://www.dnd5eapi.co/api/"

async function onLoad(param){
    const rawData = await fetch(`${mainKey}/${param}`)
    if(param == "classes"){
        const classes = await rawData.json()
        console.log(classes.results)
        for(let i = 0; i <classes.results.length; i++){
            const item = classes.results[i]
            const newClassElement = $(`
                <li class="card">
                    <div class="card-body">
                        <h3 class="card-text">${item.name}</h3>
                    </div>
                    <img class="card-image" src="asset/classes/${item.index}.jpg" alt="Card image">
                    <div class="card-body">
                        <button class="btn btn-primary"><a href=""> More Info on the ${item.name}</a></button>
                    </div>
                </li>
            `)
            classList.append(newClassElement)
            // console.log(newClassElement.html())
        }
    }
    else if(param == "races"){
        const races = await rawData.json()
        console.log(races.results)
        for(let i = 0; i <races.results.length; i++){
            const item = races.results[i]
            const newClassElement = $(`
                <li class="card">
                    <div class="card-body">
                        <h3 class="card-text">${item.name}</h3>
                    </div>
                    <img class="card-image" src="asset/classes/fighter.jpg" alt="Card image">
                    <div class="card-body">
                        <button class="btn btn-primary"><a href=""> More Info on the ${item.name}</a></button>
                    </div>
                </li>
            `)
            raceList.append(newClassElement)
            // console.log(newClassElement.html())
        }
    }
    
}
onLoad('classes')
onLoad('races')