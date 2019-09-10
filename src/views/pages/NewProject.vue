<template>
    <main class="bg-1__new-projects left-corner">
        <header>
            <TopHeader/>
        </header>
        <Form/>
    </main>
</template>

<script>
    import TopHeader from "../../components/TopHeader";
    import Form from "../../components/newProjectPage/Form";

    export default {
        name: "NewProject",
        components: {Form, TopHeader}
    }
</script>

<style scoped lang="sass">
    main
        max-width: 375px
        margin: 0 auto
</style>
