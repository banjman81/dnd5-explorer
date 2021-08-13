let playerCreated = false
// 
// 
// 
// 
let playerName = ''
let playerClass = ''
let playerRace = ''
let playerAlignment = ''
let playerSTR = 0
let playerDEX = 0
let playerCON = 0
let playerINT = 0
let playerWIS = 0
let playerCHA = 0
const regex = /[a-zA-z]/

let counter = 1

$('.submit-char').on('click', function(){
    $('.alert').remove()
    let rollCounter = 0
    console.log
    if(counter === 5 && localStorage.getItem('rollCheck') < 1 ){
        console.log('here')
        console.log(counter)
        console.log(rollCounter)
    }
    else{
        if(counter === 1){
            if(regex.test($('#playerName').val()) === false){
                $('.alert-box').append($(`
                <div class="alert alert-danger" role="alert">
                    <strong>Error!</strong> Please enter a valid name.
                </div>
                `))
            }
            else if(regex.test($('#playerName').val()) === true){
                playerName = $('#playerName').val()
                $('.primary-selector').children().remove()
                $('.alert-box').remove()
                $('.primary-selector').append($(`
                    <h2>Pick your class</h2>
                    <select class="custom-select class-menu">
                    </select>
                `))
                addOptions('classes', 'class')
            counter++
            }
            
        }
        else if(counter === 2){
            console.log($('.custom-select :selected').val())
            playerClass = $('.custom-select :selected').val()
            $('.primary-selector').children().remove()
            $('.alert-box').remove()
            $('.primary-selector').append($(`
                <h2>Pick your class</h2>
                <select class="custom-select race-menu">
                </select>
            `))
            addOptions('races', 'race')
            counter++
        }
        
        else if(counter === 3){
            console.log($('.custom-select :selected').val())
            playerAlignment = $('.custom-select :selected').val()
            $('.primary-selector').children().remove()
            $('.alert-box').remove()
            $('.primary-selector').append($(`
                <h2>Pick your class</h2>
                <select class="custom-select alignment-menu">
                </select>
            `))
            addOptions('alignments', 'alignment')
            counter++
        }
        else if(counter === 4){
            console.log($('.custom-select :selected').val())
            playerAlignment = $('.custom-select :selected').val()
            $('.primary-selector').children().remove()
            $('.alert-box').remove()
            $('.primary-selector').append($(`
                <h2>Roll for your stats</h2>
                <button class="roll-it">Roll</button>
                <p>You get 3 rolls, keep the most recent roll.</p>
                <div class="roll-results"><div>
            `))
            counter++
        }
        else if(counter === 5){
            localStorage.removeItem('rollCheck')
            console.log($('.custom-select :selected').val())
            playerAlignment = $('.custom-select :selected').val()
            $('.primary-selector').children().remove()
            $('.alert-box').remove()
            $('.primary-selector').append($(`
                <h2>Stats Placement</h2>
                <h4>choose 3 attributes ${localStorage.getItem('stats')}</h4>
                <div class="attr-list"></div>
            `))
            attributes()
            $('.submit-char').text('Finish')
            counter++
        }
        else if(counter === 6){
            if($('.red').length < 6){
                alert('Use all your points')
            }
            else{
                playerCreated === true
                $('.primary-selector').children().remove()
                $('.alert-box').remove()
                $('.submit-char').remove()
                $('.primary-selector').append($(`
                <div class="char-display">
                    <h2>${playerName}<h2>
                    <div class="character-info">
                        <div class="character-sub-info">
                        <table class="stats-table">
                            <tbody>
                                <tr>
                                    <th>STR</th>
                                    <td>${playerSTR}</td>
                                </tr>
                                <tr>
                                    <th>DEX</th>
                                    <td>${playerDEX}</td>
                                </tr>
                                <tr>
                                    <th>CON</th>
                                    <td>${playerCON}</td>
                                </tr>
                                <tr>
                                    <th>INT</th>
                                    <td>${playerINT}</td>
                                </tr>
                                <tr>
                                    <th>WIS</th>
                                    <td>${playerWIS}</td>
                                </tr>
                                <tr>
                                    <th>CHA</th>
                                    <td>${playerCHA}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        </div>
                        <div><img src="asset/backgrounds/character-holder.jpg" alt="char"></img></div>
                        <div class="character-sub-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Race</th>
                                        <td>${playerSTR}</td>
                                    </tr>
                                    <tr>
                                        <th>Class</th>
                                        <td>${playerDEX}</td>
                                    </tr>
                                    <tr>
                                        <th>Alignment</th>
                                        <td>${playerCON}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        `))
            }
        }
    }

    $('.roll-it').on('click', function(){
        if(rollCounter < 3){
            const array = [getRandomInt(13,18), getRandomInt(13,18), getRandomInt(13,18), getRandomInt(13,18), getRandomInt(13,18), getRandomInt(13,18)]
            array.sort(function(a,b){
                return b-a
            })
            $(".roll-results").children().remove()
            $(".roll-results").append($(`
                <h4>${array[0]}-${array[1]}-${array[2]}-${array[3]}-${array[4]}-${array[5]}</h4>
            `))
            rollCounter++
            console.log(rollCounter, 'this rollcounter')
            localStorage.setItem('stats', array)
        }
        localStorage.setItem('rollCheck', rollCounter)
        
    })
})



async function addOptions(param, option){
    const rawData = await fetch(`${mainKey}/${param}`)
    const items = await rawData.json()
        // console.log(items.results)
        for(let i = 0; i <items.results.length; i++){
            const item = items.results[i]
            if(i === 0){
                $(`.${option}-menu`).append($(`
                    <option selected value="${item.name}">${item.name}</option>
                
                `))
            }
            else{
                $(`.${option}-menu`).append($(`<option value="${item.name}">${item.name}</option>`))
            }
        }
}
async function attributes(){
    const rawAttr =await fetch(`https://www.dnd5eapi.co/api/ability-scores`)
    const abilities = await rawAttr.json()
    for( let a of abilities.results){
        const rawAblt =await fetch(`https://www.dnd5eapi.co/api/ability-scores/${a.index}`)
        const ability = await rawAblt.json()
        $('.attr-list').append($(`
            <h3 class="stat-trigger" id="${ability.name}">${ability.name}</h3>
                <span class="stat-info">${ability.desc}</span>
        `))
    // console.log(ability)
    }
}

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min)+min+1);
}

$('.primary-selector').on('click', 'h3', function(){
    let statArr = localStorage.getItem('stats').split(',')
    if($('.red').length < 6){
        console.log($(this).attr('id'))
        $(`#${$(this).attr('id')}`).addClass('red')
        $(this).text(`${$(this).text()} + ${statArr[$('.red').length - 1]}`)
        console.log(typeof Number(statArr[$('.red').length - 1]))
        if($(this).attr('id') === 'STR'){
            playerSTR = Number(statArr[$('.red').length - 1])
        }
        else if($(this).attr('id') === 'DEX'){
            playerDEX = Number(statArr[$('.red').length - 1])
        }
        else if($(this).attr('id') === 'CON'){
            playerCON = Number(statArr[$('.red').length - 1])
        }
        else if($(this).attr('id') === 'INT'){
            playerINT = Number(statArr[$('.red').length - 1])
        }
        else if($(this).attr('id') === 'WIS'){
            playerWIS = Number(statArr[$('.red').length - 1])
        }
        else if($(this).attr('id') === 'CHA'){
            playerCHA = Number(statArr[$('.red').length - 1])
        }
    }
})

$('.done').on('click', function(){
    console.log('done')
})
