<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <div class="info">
        <div class="info__icon">
             <slot />
        </div>
        <div class="info__content">
            <h3 class="info__content__title">{{ title }}</h3>
            <p class="info__content__text">{{ text }}</p> 
        </div>
    </div>
</template>
<style lang="scss" scoped>
.info {
    @include flex(row, center, center, $gap-third-desktop);
    @include responsive-tablette {
        @include flex(row, center, center, $gap-third-tablette);
    }
    @include responsive-mobile {
        @include flex(row, center, center, $gap-third-mobile);
    }
    &__icon {
        color: $white;
        padding: 8px;
        background-color: $main-color;
        border-radius: 50px;
        @include box(center);
    }
    &__content {
        @include flex(column, center, start, $gap-list);
        @include responsive-mobile {
            @include flex(column, center, start, $gap-list-mobile);
        }
        &__title {
            @include font-h3($text-color);
        }
        &__text {
            @include font-p($text-color);
        }
    }
}
</style>