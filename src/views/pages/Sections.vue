<template>
<main class="bg-1__sections left-corner">
    <header>
        <TopHeader/>
    </header>
    <SectionSelection/>
</main>
</template>

<script>
    import TopHeader from "../../components/TopHeader";
    import SectionSelection from "../../components/sectionsPage/SectionSelection";
    export default {
        name: "Sections",
        components: {SectionSelection, TopHeader}
    }
</script>

<style scoped lang="sass">
    main
        max-width: 375px
        height: 50rem
        margin: 0 auto
</style>
