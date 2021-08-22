let mobName = ''
let mobHp = 0
let mobArmor = 0
let mobAttack = 0
let mobValue = 0
let playerHp = 0
let playerAttack = 0
let playerChance = 0
let playerArmor = 0

async function loadEnemy(n){
    const rawData = await fetch('asset/enemy.json');
    const data = await rawData.json();
    console.log(data[n]);
    mobName = data[n].name
    mobHp = data[n].hp
    mobArmor = data[n].armor
    mobAttack = data[n].attack
    mobValue = data[n].value
    $('.mob-info').append($(`
    <img class="mob-img" src='${data[n].image}'></img>
    <table>
        <tbody>
            <tr>
                <th>Name</th>
                <td>${data[n].name}</td>
            </tr>
            <tr>
                <th>HP</th>
                <td class= "mob-hp">${data[n].hp}</td>
            </tr>
            <tr>
                <th>armor</th>
                <td>${data[n].armor}</td>
            </tr>
            <tr>
                <th>attack</th>
                <td>${data[n].attack}</td>
            </tr>
        </tbody>
    </table>
    `))
}
function loadPlayer(){
    // Character logic
    playerHp = 20 + Math.floor(playerCON/3)
    playerAttack = Math.floor((playerSTR+playerWIS+playerINT)/9)
    playerChance = Math.floor(playerDEX/3)
    playerArmor = 14
    $('.player-info').append($(`
    <table>
        <tbody>
            <tr>
                <th>Name</th>
                <td>${playerName}</td>
            </tr>
            <tr>
                <th>HP</th>
                <td class="player-hp">${playerHp}</td>
            </tr>
            <tr>
                <th>armor</th>
                <td>${playerArmor}</td>
            </tr>
            <tr>
                <th>attack</th>
                <td>1d6+${playerAttack}</td>
            </tr>
        </tbody>
    </table>
    `))

}
if(localStorage.getItem('playerCreated') == "true"){
    loadPlayer()
}
loadEnemy(getRandomNum(0, 3))

$('.attack').on('click', function(){
    const hit = getRandomNum(1 ,20)
    const mobHit = getRandomNum(1,20)
    let playerDamage = getRandomNum(1,6) + playerAttack
    let mobDamage = mobAttack
    if(hit+playerChance >= mobArmor){
        console.log(hit, 'hit')
        if(hit == 20){
            $('.combat-log').append($(`
                <div class="player-atk-log">
                    <p>Your attck(${hit + playerChance}) hits ${mobName} critically for ${playerDamage*2}</p>
                </div>
            `))
            mobHp -= playerDamage*2

        }
        else{
                $('.combat-log').append($(`
                <div class="player-atk-log">
                    <p>Your attck(${hit + playerChance}) hit ${mobName} for ${playerDamage}</p>
                </div>
            `))
            mobHp -= playerDamage
        }
        
        $('.mob-hp').text(mobHp)
        if(mobHp < 1){
            $('.quest-display').children().remove()
            $('.attack').remove()
            $('.quest-display').append($(`
                <img  class ="m-pass" src="https://c.tenor.com/dX6HCWiwMGoAAAAM/clapping-hands-pepe-the-frog.gif">
            `))
            playerWallet += mobValue
            localStorage.setItem('wallet', playerWallet)
            console.log(playerWallet)
            return
        }
    }
    else{
        console.log(hit, 'miss')
        $('.combat-log').append($(`
            <div class="player-atk-log">
                <p>Your attack(${hit}) missed.</p>
            </div>
        `))

    }
    mobAction(mobHit, mobDamage)
    if($('.combat-log').children().length > 9){
        $('.combat-log').children()[0].remove()
        $('.combat-log').children()[0].remove()
    }
})

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function mobAction(a, b){
    if(a >= playerArmor){
        console.log(a, 'Mhit')
        $('.combat-log').append($(`
            <div class="mob-atk-log">
                <p>${mobName}'s attck(${a}) hits you for ${b}</p>
            </div>
        `))
        playerHp -= b
        $('.player-hp').text(playerHp)
        if(playerHp < 1){
            $('.quest-display').children().remove()
            $('.attack').remove()
            $('.quest-display').append($(`
                <img  class ="m-fail" src="https://i.ytimg.com/vi/KydaSVnyoNY/maxresdefault.jpg">
            `))
            playerWallet -= 20
            localStorage.setItem('wallet', playerWallet)
            console.log(playerWallet)
            return
        }
    }
    else{
        console.log(a, 'Mmiss')

        $('.combat-log').append($(`
            <div class="mob-atk-log">
                <p>${mobName}'s attck(${a}) missed.</p>
            </div>
        `))

    }
}


