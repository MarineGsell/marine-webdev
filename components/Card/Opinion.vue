<script setup>
const props = defineProps({
    opinionId: {
        type: [String, Number],
        default: null
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    opinion: {
        type: String, 
        required: true
    },
    to: {
        type: String,
        default: ""
    },
    admin: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(['validateOpinion', 'deleteOpinion', 'patchOpinion'])
const handleValidate = () => {
    emit('validateOpinion', props.opinionId)
}
const handleDelete = () => {
    emit('deleteOpinion', props.opinionId)
}
const handlePatch = (opinionsForm) => {
    emit('patchOpinion', opinionsForm)
}
</script>
<template>
    <div class="card">
        <slot>
            <SvgPerson class="card__icon">
            </SvgPerson>
        </slot>
        <div class="card__person">
            <h3 class="card__person__name">
                <a
                    v-if="to !== ''"
                    :href="to" 
                    :aria-label="`Page Linkedin de ${firstName} ${lastName}`"
                    :title="`Page Linkedin de ${firstName} ${lastName}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="card__person__name__link"
                >            
                    {{ firstName }} {{ lastName }}
                </a>
                <p v-else >{{ firstName }} {{ lastName }}</p>
            </h3>        
            <p class="card__person__job">{{ job }} chez {{ company }} </p>
        </div>
        <p class="card__opinion">{{ opinion }}</p>
        <div class="card__buttons" v-if="admin">
            <ButtonsLittle @click="handleValidate">Valider</ButtonsLittle>
            <ButtonsLittle @click="handlePatch">Modifier</ButtonsLittle>
            <ButtonsLittle @click="handleDelete">Supprimer</ButtonsLittle>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    @include card($white);
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
            cursor: pointer;
            @include font-h3($text-color);
            &__link {
                display: block;
                width: 100%;
                text-decoration: none;
                pointer-events: auto;
                color: $text-color;
                &:hover {
                    color: $main-color;
                }
            }
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
    &__buttons {
        width: 100%;
        @include flex(row, center, center, $gap-list);
        @include responsive-tablette {
            @include flex(column, center, center, $gap-list);
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-list);
        }
    }
}
</style>