<script setup>
import { DashboardWorksModale } from '#components'

// Data
const { data: works } = await useFetch('/api/works')

// Modale
const modale = ref(false)
const currentWorkId = ref(null)
const openModale = (id) => {
    currentWorkId.value = id
    modale.value = true
}
const closeModale = () => {
    modale.value = false
}

// Suppression de compétence
const deleteWork = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        $fetch(`/api/works/${id}`, {
            method: 'DELETE'
        })
        .then(async () => {
            await refreshNuxtData()
            alert('Projet supprimé avec succès')
        })
        .catch((e) => alert(e))
    }
}

</script>
<template>
    <section class="works" id="worksDash">
        <h2 class="works__title">Rajouter un projet</h2>
        <div class="works__cards">
            <DashboardWorksCard 
                v-for="work in works" 
                :key="work.id" 
                :imgSrc="work.imgSrc" 
                :imgAlt="work.imgAlt" 
                :title="work.title" 
                :repo="work.repo" 
                :link="work.link"
                :content="work.description"
                :admin="true"
                :idCard="work.id"
                @open="openModale(work.id)"
                @delete="deleteWork(work.id)"
            />
        </div>
        <DashboardWorksForm />
        <DashboardWorksModale 
            v-if="modale"
            :workId="currentWorkId"
            @close="closeModale()"
        />
    </section>
</template>
<style lang="scss" scoped>
.works {
    padding-top: $gap-main-desktop;
    width: 100%;
    @include flex(column, center, center, $gap-second-desktop);
    &__title {
        @include font-h2($text-color);
    }
    &__cards {
        width: 100%;
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
    }

}
</style>