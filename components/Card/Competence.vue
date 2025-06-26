<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="card">
        <h3 class="card__title">{{ title }}</h3>
        <div class="card__content">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    @include card($white);
    @include flex(column, start, start, $gap-third-desktop);
    @include responsive-tablette {
        @include flex(column, start, start, $gap-third-tablette);        
    }
    @include responsive-mobile {
        @include flex(column, start, start, $gap-third-mobile);        
    }
    &__title {
        width: 100%;
        text-align: center;
        @include font-h3($text-color);
    }
    &__content {
        width: 100%;
        @include flex(column, center, start, $gap-list)
    }
}
</style>