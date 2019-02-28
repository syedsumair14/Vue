new Vue({
el: "#app",
data: {
    playerHeath: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
},
methods: {
    startGame: function() {
        this.gameIsRunning = true;
        this.playerHeath = 100;
        this.monsterHealth = 100;
        this.turns = [];
    },
    attack: function() {
        var damage = this.calculateDamage(3, 10)
        this.monsterHealth -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: 'Player Hits Monster for' + ' ' + damage
        });
        if(this.winCheck()){
            return;
        }
        damage = this.calculateDamage(5, 12);
        this.playerHeath -= damage;
        this.turns.unshift({
            isPlayer: false,
            text: 'Monster Hits Player for' + ' ' + damage
        });
        this.winCheck();
    },
    specialAttack: function(){
        damage = this.calculateDamage(8, 15);
        this.monsterHealth -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: 'Player Hits Hard Monster for' + ' ' + damage
        });
        if(this.winCheck()){
            return;
        }
        damage = this.calculateDamage(5, 12);
        this.playerHeath -= damage;
        this.turns.unshift({
            isPlayer: false,
            text: 'Monster Hits Player for' + ' ' + damage
        });
        this.winCheck();
    },
    heal: function(){
        if(this.playerHeath <= 100){
            this.playerHeath += 10;
        }else{
            this.playerHeath = 100;
        }
        this.playerHeath -= this.calculateDamage(5, 12); 
    },
    giveUp: function(){
        this.gameIsRunning = false;
    },
    calculateDamage: function(min, max){
        return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    winCheck: function(){
        if(this.monsterHealth<=0){
            if(confirm("You Won! Restart?")){
                this.startGame();
            }else{
                this.gameIsRunning = false;
            }
            return true;
        } else if(this.playerHeath<=0){
            if(confirm("You Lost! Restart?")){
                this.startGame();
            }else{
                this.gameIsRunning = false;
            }
            return true;
        }
        return false;
    }
}
})