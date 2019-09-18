<template>
    <section class="new-projects__container">
        <div class="container text-center pt-3 pb-1">
            <form>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" v-bind:placeholder="$t('newproject.shortname')">
                </div>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" v-bind:placeholder="$t('newproject.fullname')">
                </div>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" v-bind:placeholder="$t('newproject.shortdescr')">
                </div>
                <div class="form-group mb-4">
                    <textarea class="form-control" rows="16" v-bind:placeholder="$t('newproject.detaileddescr')"></textarea>
                </div>
                <TokensQuantity/>
                <div class="sections-project__container pb-5">
                    <router-link to="/sections" class="text-decoration-none font-weight-bold btn__sections-project">{{$t("newproject.sections")}}</router-link>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import TokensQuantity from "./TokensQuantity";
    export default {
        name: "Form",
        components: {TokensQuantity},
        data(){
            return {
            }
        }
    }
</script>

<style scoped>

</style>
