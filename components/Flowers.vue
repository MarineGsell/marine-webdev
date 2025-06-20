<script setup>
    const flowers = ref([])

    const totalFlowers = 50
    const colors = ['#ffc6c7', '#ffd4b3', '#b3d9ff', '#dda0dd']
    for (let i = 0; i < totalFlowers; i++) {
        flowers.value.push({
            color: colors[Math.floor(Math.random() * colors.length)]
        })
    }
</script>
<template>
    <section class="flowers">
        <div class="flowers__bg">
        <SvgFleur
            v-for="(flower, i) in flowers" 
            :key="i"
            :style="{ color: flower.color }"
            class="flowers__bg__item"
        />
        </div>
        <div class="flowers__quote">
            <p class="flowers__quote__text">
                Transformer les idées en expériences web
            </p>
        </div>
  </section>
</template>
<style lang="scss" scoped>
.flowers {
    position: relative;
    min-height: 400px;
    height: calc(100vh - 72px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    &__bg {
        position: absolute;
        inset: 0;
        opacity: 0.6; 
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(5, 1fr);
        @include responsive-tablette {
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(10, 1fr);
        }
        &__item {
            width: 80%;  
            height: 80%;
            align-self: center;
            justify-self: center; 
            transition: all 0.8s ease;
            &:hover {
                transform: rotateZ(180deg)
            }
        }
    }
    &__quote {
        position: relative;
        width: 40%;
        z-index: 10;
        text-align: center;
        background: $white;
        padding: $padding-card;
        &__text {
            @include font-subtitle;
        }
    }
}
</style>