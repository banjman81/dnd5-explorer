async function loadEquipmentCategories(){
    const rawData = await fetch(`https://www.dnd5eapi.co/api/equipment-categories/`)
    const data = await rawData.json()
    console.log(data.results)
    for(const category of data.results){
        if ($('#item-list').children().length === 1){
            $('#item-list').append($(`
                <option selected value="/api/equipment-categories/armor">Armor</option>
            `))
            showEquipment("/api/equipment-categories/armor")
        }
        else if(category.name != "Armor"){
            $('#item-list').append($(`
                <option value="${category.url}">${category.name}</option>
            `))
        }
        
    }
}

loadEquipmentCategories()
async function showEquipment(param){
    $('.row-display').children().remove()
    const rawData = await fetch(`https://www.dnd5eapi.co${param}`)
    const data = await rawData.json()
    for(const item of data.equipment){
        let check = item.url.split('/')[2]
        if(check === 'equipment'){
            const rawItemData = await fetch(`https://www.dnd5eapi.co/api/equipment/${item.index}`)
            const itemData = await rawItemData.json()
            if(itemData.cost.quantity == 0){
                itemData.cost.quantity = 1
            }
            $('.row-display').append($(`
                <tr>
                    <td scope="row" class="item-name">${itemData.name}</td>
                    <td>${itemData.cost.quantity} ${itemData.cost.unit}</td>
                    <td><button class="btn btn-danger">BUY</button></td>
            `))
        }
    }
}
// showEquipment('weapon')

$('.filter-btn').on('click',function(){
    // console.log()
    showEquipment($('#item-list').val())
})

$('.btn-danger').on('click', function(){
    console.log($(this))
})

$('.search-btn').on('click', function(){
    console.log($('#search').val())
    $('.item-name').children().each(function(index){
        console.log($(this), index)
    })
})