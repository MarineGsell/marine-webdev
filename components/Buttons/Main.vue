<script setup>
const props = defineProps ({
    to: {
        type: [String, Object],
    },
    type: {
        type: String,
        default: ''
    }
});
</script>
<template>
    <NuxtLink v-if="type === ''" class="button" :to="to">
        <slot></slot>
    </NuxtLink>
    <button v-else :type="type" class="button">
        <slot></slot>
    </button>
</template>
<style lang="scss" scoped>
.button {
    background-color: $main-color;
    color: $text-color;
    border-radius: 50px;
    border: none;
    padding: $padding-button;
    transition: $transition;
    text-decoration: none;
    cursor: pointer;
    @include font-button ($text-color);
    @include responsive-mobile {
        padding: 12px 24px;
    }
    &:hover {
        background-color: $second-color;
        transform: translateY(-4px) translateX(-2px);
        box-shadow: 2px 5px 0 0 $main-color;
    }
    &:focus {
        outline: $main-color;
    }
}

    
</style>