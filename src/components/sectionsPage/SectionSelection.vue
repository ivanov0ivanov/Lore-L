<template>
    <section class="sections__container">
        <div class="container text-center p-0 pt-4 pb-1">
            <form>
                <div class="check-sections mb-4 d-flex justify-content-between">
                    <div class="align-self-center">Всего разделов проекта:</div>
                    <div>
                        <button type="button" class="btn_check-sections btn-minus rounded-circle m-2" @click.prevent="onDelete">-</button>
                        <span>{{this.$store.state.defaultSections.length}}</span>
                        <button type="button" class="btn_check-sections btn-plus rounded-circle m-2" @click.prevent="onAdd">+</button>
                    </div>
                </div>
                <table class="table table-bordered mb-5">
                    <thead>
                    <tr class="text-white">
                        <th scope="col">#</th>
                        <th scope="col">Раздел</th>
                        <th scope="col">Доля</th>
                        <th scope="col">Число токенов</th>
                    </tr>
                    </thead>
                    <tbody>
                        <TableItem v-for="(item, index) of items" :key="item.id" :item="item" :index="index"/>
                    </tbody>
                </table>
                <TokensQuantity/>
                <div class="first-section__container pt-5 pb-2 d-flex justify-content-center">
                    <router-link to="/idea" class="text-decoration-none btn__first-section">Первый раздел проекта ({{this.items[0].section}})</router-link>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import TokensQuantity from "../newProjectPage/TokensQuantity";
    import TableItem from "./TableItem";
    import { mapActions } from 'vuex';
    // import {mapGetters} from 'vuex';
    import {mapState} from 'vuex';

    export default {
        name: "SectionSelection",
        components: {TableItem, TokensQuantity},
        // computed: mapGetters ({
        //     items: 'getDefaultSections'
        // }),

        computed: {
            ...mapState({
                items: 'defaultSections'
            })
        },
        methods: {
            ...mapActions({
                deleteSection: 'deleteSection',
                addSection: 'addSection',
            }),

            onAdd(){
                this.addSection(this.items[this.items.length-1].id);
            },

            onDelete() {
                if(this.items.some(elem => elem.done === true)){
                    if(confirm('Вы уверены что хотите удалить это?')) {
                        this.deleteSection()
                    }
                } else {
                    alert('Выберите раздел')
                }
            }
        }
    }
</script>
