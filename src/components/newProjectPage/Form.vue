<template>
    <section class="new-projects__container">
        <div class="container text-center pt-3 pb-1">
            <form>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" placeholder="Краткое наименование проекта">
                </div>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" placeholder="Полное наименование">
                </div>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" placeholder="Краткое описание">
                </div>
                <div class="form-group mb-4">
                    <textarea class="form-control" rows="16" placeholder="Подробное описание"></textarea>
                </div>
                <TokensQuantity/>
                <div class="sections-project__container pb-5">
                    <button type="submit" class="font-weight-bold btn__sections-project">Разделы проекта</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import TokensQuantity from "./TokensQuantity";
    export default {
        name: "Form",
        components: {TokensQuantity}
    }
</script>

<style scoped>

</style>
