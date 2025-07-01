<script setup>
</script>
<template>
    <button 
        class="button" 
    >
        <slot></slot>
    </button>
</template>
<style lang="scss" scoped>
.button {
    background-color: $main-color;
    color: $text-color-second;
    border-radius: 8px;
    border: none;
    padding: $padding-button-little;
    transition: $transition;
    cursor: pointer;
    @include font-p-message ($text-color-second);
    &:hover {
        background-color: $second-color;
        transform: scale(1.02);
    }
    &:focus {
        outline: $main-color;
    }
}
</style>

