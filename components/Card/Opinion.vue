<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    opinion: {
        type: String, 
        required: true
    }
})
</script>
<template>
    <div class="card">
        <slot>
            <SvgPerson class="card__icon"/>
        </slot>
        <div class="card__person">
            <h3 class="card__person__name">{{ name }}</h3>
            <p class="card__person__job">{{ job }}</p>
        </div>
        <p class="card__opinion">{{ opinion }}</p>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    @include card($bg-color);
    @include flex (column, start, center, $gap-third-desktop);
    @include responsive-tablette {
        @include flex (column, start, center, $gap-third-tablette);
    }
    @include responsive-mobile {
        @include flex (column, start, center, $gap-third-mobile);
    }
    &__icon {
        color: $main-color;
        @include picture
    }
    &__person {
        width: 100%;
        @include flex(column, center, start, $gap-list);
        &__name {
            width: 100%;
            text-align: center;
            @include font-h3
        }
        &__job {
            width: 100%;
            text-align: center;
            @include font-subtitle2
        }
    }
    &__opinion {
        text-align: justify;
        @include font-p($text-color)
    }
}
</style>