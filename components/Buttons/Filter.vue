<script setup>
const props = defineProps({
    category: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['filter']) 

const handleClick = () => {
    emit('filter', props.category)
}
</script>
<template>
    <button 
        class="button" 
        :class="{ 'button--active' : isActive }"
        @click="handleClick"
    >
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
    cursor: pointer;
    @include font-button ($text-color);
    @include responsive-mobile {
        padding: 12px 24px;
    }
    &:hover {
        background-color: $second-color;
        transform: scale(1.02);
    }
    &:focus {
        outline: $main-color;
    }
    &--active {
        background-color: $second-color;
    }
}
</style>

