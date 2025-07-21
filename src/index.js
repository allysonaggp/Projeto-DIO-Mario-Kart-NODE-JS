// jogadores
const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}

const player2 = {
    nome: "Browser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
}

// Função de pausa
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// função sortear dados
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// sortear bloco 
async function getRandonBlock() {
    setTimeout(function () {
    }, 3000);

    let random = Math.random()
    let result
    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result
}

// função texto rolar dados com atributos
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}



// função da corrida 
async function playRacingEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} 🏁`)

        // sortear bloco
        let block = await getRandonBlock()
        console.log(`Bloco: ${block}`)

        // rolar dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "RETA") {

            totalTestSkill1 = diceResult1 + character1.velocidade

            totalTestSkill2 = diceResult2 + character2.velocidade

            await logRollResult(character1.nome, "VELOCIDADE", diceResult1, character1.velocidade)
            await logRollResult(character2.nome, "VELOCIDADE", diceResult2, character2.velocidade)

            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`\n${character1.nome} marcou um ponto!`);
                character1.pontos++;

            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`\n${character2.nome} marcou um ponto!`);
                character2.pontos++
            }
            console.log('_________________________________________________\n')
            await delay(2000);

            
        }


        if (block === "CURVA") {

            totalTestSkill1 = diceResult1 + character1.manobrabMANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.manobrabilidade

            await logRollResult(character1.nome, "MANOBRABILIDADE", diceResult1, character1.manobrabilidade)
            await logRollResult(character2.nome, "MANOBRABILIDADE", diceResult2, character2.manobrabilidade)

            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`\n${character1.nome} marcou um ponto!`);
                character1.pontos++;

            } else if (totalTestSkill2 > totalTestSkill1)
                console.log(`\n${character2.nome} marcou um ponto!`);
            character2.pontos++

            console.log('_________________________________________________\n')
            await delay(2000);
        }


        if (block === "CONFRONTO") {

            let powerResult1 = diceResult1 + character1.poder
            let powerResult2 = diceResult2 + character2.poder

            await logRollResult(character1.nome, "PODER", diceResult1, character1.poder)
            await logRollResult(character2.nome, "PODER", diceResult2, character2.poder)

            if (powerResult1 > powerResult2 && character2.pontos > 0)
                console.log(`\n${character1.nome} venceu o confornto! ${character2.nome} perdeu 1 ponto 🐢`)
            character2.pontos--;

            if (powerResult2 > powerResult1 && character1.pontos > 0)
                console.log(`\n${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto 🐢`)
            character1.pontos--;

            console.log('_________________________________________________\n')
            await delay(2000);


        }
    }
}

async function declareWinner(character1, character2) {
    console.log("🏁 Resultado final: 🏁")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

    if (character1.pontos > character2.pontos)
        console.log(`\n🏁 ${character1.nome} Venceu a corrida! Parabéns! 🏆`)

    else if (character2.pontos > character1.pontos)
        console.log(`\n🏁 ${character2.nome} Venceu a corrida! Parabéns! 🏆`)

    else console.log("\n A corrida terminou em empate")
}


// função principal 
(async function main() {
    console.log(`🏁 ... Corrida entre ${player1.nome} e ${player2.nome} começando ... 🏁\n`)

    await playRacingEngine(player1, player2);
    await declareWinner(player1, player2)

})()
