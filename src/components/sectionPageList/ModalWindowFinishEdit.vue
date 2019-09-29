<template>
    <div class="modal fade" id="finishModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{$t("modalFinishEdit.title")}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered mb-5">
                        <thead>
                        <tr class="text-white">
                            <th scope="col">#</th>
                            <th scope="col">{{$t('sections.tableSectionSection')}}</th>
                            <th scope="col">{{$t('sections.tableSectionShare')}}</th>
                            <th scope="col">{{$t('sections.tableSectionCurrentTokens')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <TableItem v-for="(item, index) of items" :key="item.id" :item="item" :index="index"/>
                            <SpecialPart/>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <router-link to="/sections" type="button" class="btn btn-secondary flex-grow-1" data-dismiss="modal">{{$t("modalFinishEdit.edit")}}</router-link>
                    <router-link to="/progressProject" type="button" data-dismiss="modal" class="btn btn-primary flex-grow-1">{{$t("modalFinishEdit.ok")}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TableItem from "../sectionsPage/TableItem";
    import {mapState} from 'vuex';
    import SpecialPart from "../sectionsPage/SpecialPart";
    export default {
        name: "ModalWindowFinishEdit",
        components: {SpecialPart, TableItem},

        computed: {
            ...mapState({
                items: 'defaultSections'
            })
        }
    }
</script>

<style scoped lang="sass">
.modal-content
    background-color: #8A8AED !important
    width: 110% !important
</style>
