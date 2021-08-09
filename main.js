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
            
            if(i === 0){
                classList.append($(`<option selected value="${item.name}">${item.name}</option>`))
            }
            else{
                classList.append($(`<option value="${item.name}">${item.name}</option>`))
            }
        }
    }
    else if(param == "races"){
        const races = await rawData.json()
        console.log(races.results)
        for(let i = 0; i <races.results.length; i++){
            const item = races.results[i]
            // const newClassElement = $(`
            //     <li class="card">
            //         <div class="card-body">
            //             <h3 class="card-text">${item.name}</h3>
            //         </div>
            //         <img class="card-image" src="asset/classes/fighter.jpg" alt="Card image">
            //         <div class="card-body">
            //             <button class="btn btn-primary"><a href=""> More Info on the ${item.name}</a></button>
            //         </div>
            //     </li>
            // `)
            if(i === 0){
                raceList.append($(`<option selected value="${item.name}">${item.name}</option>`))
            }
            else{
                raceList.append($(`<option value="${item.name}">${item.name}</option>`))
            }
            
        }
    }
    else if(param == "alignments"){
        const alignments = await rawData.json()
        console.log(alignments.results)
        for(let i = 0; i <alignments.results.length; i++){
            const item = alignments.results[i]
            if(i === 0){
                $('.alignment-menu').append($(`<option selected value="${item.name}">${item.name}</option>`))
            }
            else{
                $('.alignment-menu').append($(`<option value="${item.name}">${item.name}</option>`))
            }
        }
    }
    
}
onLoad('classes')
onLoad('races')
onLoad('alignments')