<template>
    <div class="">
        <div class="controls w3-blue-gray w3-center w3-padding-24">
            <button class="w3-button w3-round-xxlarge w3-large w3-green w3-hover-blue w3-margin-right"><b>{{ difficultyName }}</b></button>
            <button class="w3-button w3-round-xxlarge w3-large w3-green w3-hover-blue" @click="begin"><b>Start</b></button>
        </div>

        <div class="board w3-padding-24">
            <p style="width: 100%" class="w3-center"><b><span class="w3-margin">Niveau: {{ level }}</span> <span class="w3-margin">Score: {{ score }}</span></b></p>
            <color-button
                v-for="(color, index) in colors"
                :key="index + 1"
                :color="color"
                :difficulty-class="difficultyClass"
                :button-locked-class="buttonLockedClass"
            />
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
                buttonLocked: true
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
                return this.buttonLocked ? "locked" : ""
            }
        },

        methods: {
            getColors: function (difficulty) {
                return colors.slice(0, difficulty)
            },

            begin: function () {
                this.makeSequence(this.level);
                this.showSequence();
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
                console.log(this.sequence);
            },

            showSequence: function () {
                let i = 0;
                let interval = setInterval(() => {
                    let button = document.getElementsByClassName("button-container")[this.sequence[i][1]];
                    button.classList.toggle("w3-opacity");
                    setTimeout(() => {
                        button.classList.toggle("w3-opacity");
                    }, 700);
                    i++;
                    if (i === this.level + 3) {
                        clearInterval(interval);
                        this.level++;
                    }
                }, 1400)
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