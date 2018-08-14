<template>
    <div class="button-container hard">
        <button class="button w3-btn w3-ripple " :class="colorClass"></button>
    </div>
</template>

<script>
    export default {
        name: "ColorButton",
        props: ['color'],
        computed: {
            colorClass: function () {
                return "w3-" + this.color;
            }
        }
    }
</script>

<style scoped>
    .easy {
        width: 45%;
        padding: 5px;
    }

    .medium {
        width: 45%;
        padding: 5px;
    }

    .hard {
        width: 33.333%;
        padding: 5px;
    }

    .button {
        width: 100%;
        padding-top: 100%;
        border: none;
        cursor: pointer;
    }

    @media (min-width: 550px) {
        .easy {
            width: 200px;
            padding: 5px;
        }

        .medium {
            width: 33.333%;
        }
    }
</style>