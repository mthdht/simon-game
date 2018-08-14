<template>
    <div class="">
        <div class="controls w3-blue-gray w3-center w3-padding-24">
            <button class="w3-button w3-round-xxlarge w3-large w3-green w3-hover-blue w3-margin-right"><b>{{ difficulty }}</b></button>
            <button class="w3-button w3-round-xxlarge w3-large w3-green w3-hover-blue"><b>Restart</b></button>
        </div>

        <div class="board w3-padding-24">
            <p style="width: 100%" class="w3-center"><b><span class="w3-margin">Niveau: 1</span> <span class="w3-margin">Score: {{ score }}</span></b></p>
            <color-button
                v-for="(color, index) in colors"
                :key="index + 1"
                :color="color"
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
                colors: colors,
                score: 0,
                level: 1,
                difficulty: "Facile"
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