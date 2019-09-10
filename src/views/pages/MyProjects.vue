<template>
    <main class="bg-1__my-projects left-corner">
        <header>
            <TopHeader/>
        </header>
        <MyProjectsSection1/>
        <MyProjectsSection2/>
        <MyProjectsSection3/>
        <MyProjectsSection4/>
    </main>
</template>

<script>
    import TopHeader from "../../components/TopHeader";
    import MyProjectsSection1 from "../../components/myProjectsPage/MyProjects-section1";
    import MyProjectsSection2 from "../../components/myProjectsPage/MyProjects-section2";
    import MyProjectsSection3 from "../../components/myProjectsPage/MyProjects-section3";
    import MyProjectsSection4 from "../../components/myProjectsPage/MyProjects-section4";

    export default {
        name: "MyProjects",
        components: {MyProjectsSection4, MyProjectsSection3, MyProjectsSection2, MyProjectsSection1, TopHeader}
    }
</script>

<style scoped lang="sass">
    main
        max-width: 375px
        height: 50rem
        margin: 0 auto

</style>
