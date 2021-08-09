let playerCreated = false
let playerName = ''
let playerClass = ''
let playerRace = ''
let playerAlignment = ''

const regex = /[a-zA-z]/

let counter = 1

$('.submit-char').on('click', function(){
    console.log($('#playerName').val())
    $('.alert').remove()
    if(counter === 1){
        if(regex.test($('#playerName').val()) === true){
            playerName = $('#playerName').val()
            $('.primary-selector').children().remove()
            $('.alert-box').remove()
            $('.primary-selector').append($(`
                <h2>Pick your class</h2>
                <select class="custom-select class-menu">
                </select>
            `))
            addOptions('classes', 'class')

        }
        else{
            $('.alert-box').append($(`
            <div class="alert alert-danger" role="alert">
                <strong>Error!</strong> Please enter a valid name.
            </div>
            `))
        }
        counter++
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
})

async function addOptions(param, option){
    const rawData = await fetch(`${mainKey}/${param}`)
    const items = await rawData.json()
        console.log(items.results)
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

// async function infoCard(param, loc){
//     const rawData = await fetch(`${mainKey}/${loc}/${param}`)
//     const classes = await rawData.json()
// }
