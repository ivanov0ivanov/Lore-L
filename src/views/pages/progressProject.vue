<template>
<main class="bg-1__progress-project left-corner">
    <header>
        <TopHeader/>
    </header>
    <ProgressPageSections/>
</main>
</template>

<script>
    import TopHeader from "../../components/TopHeader";
    import ProgressPageSections from "../../components/progressProjectPage/ProgressPage-sections";
    export default {
        name: "progressProject",
        components: {ProgressPageSections, TopHeader}
    }
</script>

<style scoped lang="sass">
    main
        max-width: 375px
        height: 50rem
        margin: 0 auto
</style>
