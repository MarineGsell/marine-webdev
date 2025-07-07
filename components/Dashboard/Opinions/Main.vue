<script setup>
// Data
const { data: opinions } = await useFetch('/api/opinions?isValidated=false', {key: 'opinions'})

// Modale
const modale = ref(false)
const currentOpinionId = ref(null)
const openModale = (id) => {
    currentOpinionId.value = id
    modale.value = true
}
const closeModale = () => {
    modale.value = false
}

// Validation de l'avis
const validateOpinion = async (opinionId) => {
    if (confirm('Êtes-vous sûr de vouloir valider cet avis ?')) {
        $fetch(`/api/opinions/${opinionId}`, {
            method: 'PATCH',
            body: { isValidated: true }
        })
        .then(async () => {
            await refreshNuxtData()
            alert('Avis validé avec succès')
        })
        .catch((e) => alert(e))
    }
}

// Suppression de l'avis
const deleteOpinion = async (opinionId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
        $fetch(`/api/opinions/${opinionId}`, {
            method: 'DELETE'
        })
        .then(async () => {
            await refreshNuxtData()
            alert('Avis supprimé avec succès')
        })
        .catch((e) => alert(e))
    }
}

</script>
<template>
    <section class="opinions" id="opinionsDash">
        <h2 class="opinions__title">Témoignages à valider</h2>
        <div v-if="opinions && opinions.length > 0" class="opinions__cards">
            <CardOpinion 
                v-for="opinion in opinions" 
                :key="opinion.id" 
                :firstName="opinion.firstName" 
                :lastName="opinion.lastName"
                :job="opinion.job" 
                :company="opinion.company"
                :to="opinion.link"
                :opinion="opinion.opinion" 
                :admin="true"
                :opinionId="opinion.id"
                class="opinions__cards__card"
                @validateOpinion="validateOpinion"
                @deleteOpinion="deleteOpinion"
                @patchOpinion="openModale(opinion.id)"
            >
                <NuxtImg 
                    v-if="opinion.imgSrc" 
                    :src="opinion.imgSrc" 
                    :alt="`Photo de ${opinion.firstName} ${opinion.lastName}`"
                    class="opinions__cards__card__picture" 
                />
            </CardOpinion>
        </div>
        <p v-else class="opinions__text">Vous n'avez aucun témoignage à valider</p>
        <DashboardOpinionsModale 
            v-if="modale" 
            :opinionId="currentOpinionId" 
            @close="closeModale"
        />
        <p>Debug: {{ opinions }}</p>
    </section>
</template>
<style lang="scss" scoped>
.opinions {
    padding-top: $gap-main-desktop;
    @include flex(column, center, center, $gap-second-desktop);
    &__title {
        @include font-h2($text-color);
    }
    &__cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $gap-third-desktop;
        @include responsive-tablette {
            grid-template-columns: repeat(2, 1fr);
            gap: $gap-third-tablette;
        }
        @include responsive-mobile {
            grid-template-columns: repeat(1, 1fr);
            gap: $gap-third-mobile;
        }
        &__card {
            width: 100%;
            &__picture {
                @include picture;
            }
        }
    }
    &__text {
        @include font-p($text-color)
    }
}
</style>