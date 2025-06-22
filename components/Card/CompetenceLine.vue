<script setup>
const props = defineProps({
    competence: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required:true
    }
})
const stars = [1, 2, 3, 4, 5]

// 🔍 DÉBOGAGE : Ajoutez ces lignes
// console.log('Compétence:', props.competence)
// console.log('Rate reçu:', props.rate)
// console.log('Type de rate:', typeof props.rate)
</script>
<template>
    <div class="line">
        <p class="line__text">{{ competence }}</p>
        <div class="line__rate">
            <SvgStar 
                v-for="(star, index) in stars"
                :key="index"
                :class=" index < rate ? 'line__rate__star--active' : 'line__rate__star--inactive' "
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.line {
    width: 100%;
    @include flex(row, space-between, center, 0);
    @include responsive-tablette {
        @include flex(row, space-between, center, 0)
    }
    @include responsive-mobile {
        @include flex(row, space-between, center, 0)
    }
    &__text {
        @include font-p($text-color)
    }
    &__rate {
        @include flex(row, center, center, 4px);
        &__star--active {
            color: $main-color;
        }
        &__star--inactive {
            color: $bg-color;
        }
    }
}
</style>