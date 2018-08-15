<template>
    <div class="">
        <div class="controls w3-blue-gray w3-center w3-padding-24">
            <button class="w3-button w3-round-xxlarge w3-large w3-green w3-hover-blue w3-margin-right" @click="showModal"><b>{{ difficultyName }}</b></button>
            <button class="w3-button w3-round-xxlarge w3-large w3-green w3-hover-blue" :class="startLockedClass" @click="begin"><b>Start</b></button>

            <div id="confirm-change-difficulty" class="w3-modal">
                <div class="w3-modal-content w3-padding-24">
                    <div class="w3-container">
                        <p class="w3-panel w3-text-dark-gray w3-large">
                            Attention, en changeant de difficulté, ton score repassera à zero et le level à 1!!
                        </p>
                        <button class="w3-button w3-green w3-hover-opacity w3-margin-right" @click="changeDifficulty">Continuer</button>
                        <button class="w3-button w3-red" onclick="document.getElementById('confirm-change-difficulty').style.display='none'">Annuler</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="board w3-padding-24">
            <p style="width: 100%" class="w3-center"><b><span class="w3-margin">Niveau: {{ level }}</span> <span class="w3-margin">Score: {{ score }}</span></b></p>
            <color-button
                v-for="(color, index) in colors"
                :key="index + 1"
                :color="color"
                :index="index"
                :difficulty-class="difficultyClass"
                :button-locked-class="buttonLockedClass"
                @button-pressed="handleColorButton"
            />
            <p style="width: 100%;" class="w3-center"><b>{{ indication }}</b></p>
        </div>
    </div>
</template>

<script>
    import ColorButton from './ColorButton.vue'

    const colors = ["red", "blue", "green", "yellow", "purple", "lime", "pink", "blue-gray", "orange"];
    export default {
        name: "Board",
        components: {
            ColorButton
        },
        data: function () {
            return {
                colors: this.getColors(4),
                score: 0,
                level: 1,
                difficulty: 4,
                sequence: [],
                userSequence: [],
                buttonLocked: true,
                startLocked: false,
                indication: "Appui sur START pour commencer !!!"
            }
        },

        computed: {
            difficultyName: function () {
                return this.difficulty === 4 ? "Facile" : this.difficulty === 6 ? "Moyen": "Difficile";
            },
            difficultyClass: function () {
                return this.difficulty === 4 ? "easy" : this.difficulty === 6 ? "medium": "hard";
            },
            buttonLockedClass: function () {
                return this.buttonLocked ? "locked" : "";
            },
            startLockedClass: function () {
                return this.startLocked ? "locked" : "";
            }
        },

        methods: {
            getColors: function (difficulty) {
                return colors.slice(0, difficulty)
            },

            begin: function () {
                if (!this.startLocked) {
                    this.buttonLocked = true;
                    this.startLocked = true;
                    this.indication = "Regarde bien la sequence !!!";
                    this.makeSequence(this.level);
                    this.showSequence();
                }
            },

            makeSequence: function (level) {
                if (this.sequence == false) {
                    for (let i = 0; i < level + 3; i++) {
                        let random = Math.floor(Math.random() * this.difficulty);
                        this.sequence.push([this.colors[random], random]);
                    }
                } else {
                    let random = Math.floor(Math.random() * this.difficulty);
                    this.sequence.push([this.colors[random], random]);
                }
            },

            showSequence: function () {
                let i = 0;
                let interval = setInterval(() => {
                    let button = document.getElementsByClassName("button-container")[this.sequence[i][1]];
                    button.classList.toggle("w3-opacity");
                    button.classList.toggle("w3-card");
                    setTimeout(() => {
                        button.classList.toggle("w3-opacity");
                        button.classList.toggle("w3-card");
                    }, 700);
                    i++;
                    if (i === this.level + 3) {
                        clearInterval(interval);
                        this.buttonLocked = false;
                        this.indication = "A toi de jouer !!!"
                    }
                }, 1400)
            },

            handleColorButton: function (event, color, index) {
                if (!this.buttonLocked && this.sequence.length > this.userSequence.length) {
                    this.userSequence.push([color, index]);

                    if (this.sequence.length === this.userSequence.length) {
                        this.compareSequences();
                    }
                }
            },

            compareSequences: function () {
                if (this.sequence.toString() == this.userSequence.toString()) {
                    this.level++;
                    this.userSequence = [];
                    this.indication = "Felicitation !! tu es au niveau " + this.level + ", appuie sur START pour continuer!";
                    this.score += (this.level + 3) * this.difficulty;
                    this.buttonLocked = true;
                    this.startLocked = false;
                } else {
                    this.indication = "Perdu, ton score: " + this.score + ". Recommence en appuyant sur START !!!";
                    this.reset();
                }

            },

            reset: function () {
                this.sequence = [];
                this.level = 1;
                this.userSequence = [];
                this.score = 0;
                this.buttonLocked = true;
                this.startLocked = false;
            },

            showModal: function () {
                document.getElementById('confirm-change-difficulty').style.display='block'
            },

            changeDifficulty: function () {
                document.getElementById('confirm-change-difficulty').style.display='none'
                this.difficulty = this.difficulty === 4 ? 6 : this.difficulty === 6 ? 9 : 4;
                this.colors = this.getColors(this.difficulty);
                this.reset();
            }
        }
    }
</script>

<style scoped>
    .board {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: auto;
    }

    .locked {
        cursor: not-allowed;
    }

    @media (min-width: 550px) {
        .board {
            width: 550px;
        }
    }

    @media (min-width: 768px) {

    }

    @media (min-width: 992px) {

    }

</style>