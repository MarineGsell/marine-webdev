<script setup>
// Layout
definePageMeta({
    layout: "dash",
    middleware: ['authenticated']
})
</script>
<template>
    <main class="dashboard">
        <div class="dashboard__content">
            <DashboardHeader />
            <DashboardCompetencesMain />
            <DashboardOpinionsMain />
            <DashboardWorksMain />
        </div>
    </main>
</template>
<style lang="scss" scoped>
.dashboard {
    min-height: 100vh;
    background-color: $bg-color;
    padding-top: 72px;
    padding-bottom: $gap-main-desktop;
    &__content {
        width: 100%;
        @include padding-div;
        @include flex(column, center, center, 0);
    }
}
</style>