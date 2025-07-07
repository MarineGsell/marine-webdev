<script setup>
import { id } from 'zod/v4/locales'

const props = defineProps({
    competence: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required:true
    },
    id: {
        type: [String, Number],
        default: null
    },
    admin: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['open', 'delete'])
const handleOpen = () => {
    emit('open', props.id)
}
const handleDelete = () => {
    emit('delete', props.id)
}

const stars = [1, 2, 3, 4, 5]

</script>
<template>
    <div class="line">
        <div class="line__left">
            <p class="line__left__text">{{ competence }}</p>
            <div class="line__left__rate">
                <SvgStar 
                    v-for="(star, index) in stars"
                    :key="index"
                    :class=" index < rate ? 'line__left__rate__star--active' : 'line__left__rate__star--inactive' "
                />
            </div>
        </div>
        <div v-if="admin" class="line__admin">
            <ButtonsLittle @click="handleOpen">Modifier</ButtonsLittle>
            <ButtonsLittle @click="handleDelete">Supprimer</ButtonsLittle>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.line {
    width: 100%;
    @include flex(row, center, center, $gap-third-desktop);
    @include responsive-tablette {
        @include flex(row, center, center, $gap-third-tablette);
    }
    @include responsive-mobile {
        @include flex(row, center, center, $gap-third-mobile);
    }
    &__left {
        width: 100%;
        @include flex(row, space-between, center, 0);
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
    &__admin {
        @include flex(row, center, center, 4px);
        @include responsive-tablette {
            @include flex(column, center, center, 4px)
        }
        @include responsive-mobile {
            @include flex(column, center, center, 4px)
        }
    }
}
</style>