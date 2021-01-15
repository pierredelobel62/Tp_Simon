var app = new Vue({
    el: '#myapp',
    data: {
        gameLaunched: false,
        level: null,
        countdown: null,
        buttons: [
            { name: "red", active: false, sound: new Audio("sounds/red.ogg") },
            { name: "yellow", active: false, sound: new Audio("sounds/yellow.ogg") },
            { name: "purple", active: false, sound: new Audio("sounds/green.ogg") },
            { name: "blue", active: false, sound: new Audio("sounds/blue.ogg") }
        ],
        combinaisonJeu: [],
        combinaisonJoueur: []
    },
    methods: {
        launchGame: function () {
            this.level = 1;
            this.countdown = 5;
            this.gameLaunched = true;
            const that = this;
            var interval = setInterval(function () {
                that.countdown--;
                if (that.countdown == 0) {
                    clearInterval(interval);
                    that.countdown--;
                    that.getRandomColor();
                }
            }, 1000);
        },
        clickButton: function (button) {
            this.playButton(button);
            this.combinaisonJoueur.push(button);
            this.checkPattern();
        },
        playButton: function (button) {
            button.active = true;
            button.sound.play();
            setTimeout(() => {
                button.active = false;
            }, 500);
        },
        getRandomColor: function () {
            const that = this;
            const rand = Math.floor(Math.random() * 4);
            that.combinaisonJeu.push(that.buttons[rand]);

            that.combinaisonJeu.forEach((button, index) => {
                setTimeout(() => {
                    this.playButton(button);
                }, 1000 * (index + 1));
            })


        },
        checkPattern: function () {
            right = true;
            this.combinaisonJoueur.forEach((key, value) => {
                if (key != this.combinaisonJeu[value]) {
                    right = false;
                }
            });

            if (!right) {
                alert('Vous avez perdu ! Retour au niveau 1');
                this.level = 1;
                this.combinaisonJeu = [];
                this.combinaisonJoueur = [];
                setTimeout(() => {
                    this.getRandomColor();
                }, 2000);
            } else if (this.combinaisonJeu.length == this.combinaisonJoueur.length) {
                this.level++;
                this.combinaisonJoueur = [];
                setTimeout(() => {
                    this.getRandomColor();
                }, 2000);
            }
        }
    },
})