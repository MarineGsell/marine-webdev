<script setup>
import { DashboardModale } from '#components'

// Modale
const modale = ref(false)
const currentCompetenceId = ref(null)
const openModale = (id) => {
    currentCompetenceId.value = id
    modale.value = true
}
const closeModale = () => {
    modale.value = false
}

// Data
const { data: competences } = await useFetch('/api/competences', {key: 'competences'})
const backend = computed(() => {
    return competences.value?.filter(competence => competence.categorie === "Backend")
})
const frontend = computed(() => {
    return competences.value?.filter(competence => competence.categorie === "Frontend")
})
const outils = computed(() => {
    return competences.value?.filter(competence => competence.categorie === "Outils")
})

// Formulaire d'ajout de compétence
const competencesForm = reactive({
    title: '',
    categorie: '',
    rate:''
})

async function addCompetence() {
    $fetch('/api/competences', {
        method: 'POST',
        body: competencesForm
    })
    .then(async () => {
        await refreshNuxtData()
        alert('Compétence ajoutée avec succès')
        competencesForm.title = ''
        competencesForm.categorie = ''
        competencesForm.rate = ''
    })
    .catch((e) => alert(e))
}

// Suppression de compétence
const deleteCompetence = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
        $fetch(`/api/competences/${id}`, {
            method: 'DELETE'
        })
        .then(async () => {
            await refreshNuxtData()
            alert('Compétence supprimée avec succès')
        })
        .catch((e) => alert(e))
    }
}

</script>
<template>
    <section class="competences" id="competencesDash">
        <h2 class="competences__title">Compétences</h2>
        <div class="competences__cards">
                <CardCompetence
                    class="competences__cards__card"
                    title="Frontend"
                >
                    <CardCompetenceLine 
                        v-for="competence in frontend"
                        :competence="competence.title"
                        :rate="competence.rate"
                        :admin="true"
                        :id="competence.id"
                        @open="openModale"
                        @delete="deleteCompetence(competence.id)"
                    />
                </CardCompetence>
                <CardCompetence
                    class="competences__cards__card"
                    title="Backend"
                >
                    <CardCompetenceLine 
                        v-for="competence in backend"
                        :competence="competence.title"
                        :rate="competence.rate"
                        :admin="true"
                        :id="competence.id"
                        @open="openModale"
                        @delete="deleteCompetence(competence.id)"
                    />
                </CardCompetence>
                <CardCompetence
                    class="competences__cards__card"
                    title="Outils"
                >
                    <CardCompetenceLine 
                        v-for="competence in outils"
                        :competence="competence.title"
                        :rate="competence.rate"
                        :admin="true"
                        :id="competence.id"
                        @open="openModale"
                        @delete="deleteCompetence(competence.id)"
                    />
                </CardCompetence>
        </div>
        <DashboardModale 
            v-if="modale"
            :competenceId="currentCompetenceId"
            @close="closeModale()"
        />
        <form class="competences__form" @submit.prevent="addCompetence">
            <div class="competences__form__column">
                <div class="competences__form__column__field">
                    <label class="competences__form__column__field__label">Nom de la compétence</label>
                    <input 
                        type="text" 
                        v-model="competencesForm.title"
                        class="competences__form__column__field__input"
                        placeholder="Ex: HTML, CSS, JavaScript..."
                    >
                </div>
                <div class="competences__form__column__field">
                    <label class="competences__form__column__field__label">Catégorie</label>
                    <select class="competences__form__column__field__select" v-model="competencesForm.categorie">
                        <option value="">Choisir une catégorie</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Outils">Outils</option>
                    </select>
                </div>
                <div class="competences__form__column__field">
                    <label class="competences__form__column__field__label">Niveau</label>
                    <input 
                        type="number" 
                        v-model="competencesForm.rate"
                        class="competences__form__column__field__input"
                        min="1"
                        max="5"
                    >
                </div>
            </div>
            <ButtonsMain type="submit">Ajouter la compétence</ButtonsMain>
        </form>
    </section>
</template>
<style lang="scss" scoped>
.competences {
    width: 100%;
    padding-top: $gap-main-desktop;
    @include flex(column, center, center, $gap-second-desktop);
    &__title {
        @include font-h2($text-color);
    }
    &__cards {
        width: 70%;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: $gap-third-desktop;
        @include responsive-tablette {
            gap: $gap-third-tablette;
        }
        @include responsive-mobile {
            gap: $gap-third-mobile;
            width: 90%;
        }
    }
    &__form {
        width: 70%;
        @include flex(column, center, center, $gap-third-desktop);
        @include responsive-tablette {
            gap: $gap-third-tablette;
        }
        @include responsive-mobile {
            gap: $gap-third-mobile;
            width: 90%;
        }
        &__column {
            width: 100%;
            @include flex(column, center, center, $gap-third-desktop);
            &__field {
                width: 100%;;
                @include flex(column, center, start, 8px);
                &__label {
                    @include font-p($text-color);
                }
                &__input {
                    width: 100%;
                    @include input($white);
                }
                &__select {
                    width: 100%;
                    @include input($white);
                }
            }
        }
    }
}
</style>