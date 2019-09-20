<template>
    <section class="sections__container">
        <div class="container text-center p-0 pt-4 pb-1">
            <form>
                <div class="check-sections mb-4 d-flex justify-content-between">
                    <div class="align-self-center">{{$t('sections.totalSections')}}:</div>
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
                        <th scope="col">{{$t('sections.tableSectionSection')}}</th>
                        <th scope="col">{{$t('sections.tableSectionShare')}}</th>
                        <th scope="col">{{$t('sections.tableSectionCurrentTokens')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <TableItem v-for="(item, index) of items" :key="item.id" :item="item" :index="index"/>

                    </tbody>
                </table>
                <TokensQuantity/>
                <div class="first-section__container pt-5 pb-2 d-flex justify-content-center">
                    <router-link to="/idea" class="text-decoration-none btn__first-section">{{$t('sections.tableFirstProject')}}: ({{this.items[0].section}})</router-link>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import TokensQuantity from "../newProjectPage/TokensQuantity";
    import TableItem from "./TableItem";
    import { mapActions } from 'vuex';
    //import {mapGetters} from 'vuex';
    import {mapState} from 'vuex';

    export default {
        name: "SectionSelection",
        components: {TableItem, TokensQuantity},
        // computed: mapGetters ({
        //     items: 'getDefaultSections'
        // }),
        data(){
            return {
                shareAmount: '',
                tokenAmount: ''
            }
        },
        computed: {
            ...mapState({
                items: 'defaultSections'
            })
        },
        methods: {
            ...mapActions({
                deleteSection: 'deleteSection',
                addSection: 'addSection',
                recountSpecialPart: "recountSpecialPart"
            }),


            recountData() {
                this.items.forEach(item => {
                    if(!item.special === true) this.shareAmount = Number(this.shareAmount) + Number(item.share);
                    if(!item.special === true) this.tokenAmount = Number(this.tokenAmount) + Number(item.tokens);
                });

                if(this.shareAmount !== 0) {
                    this.recountSpecialPart({
                        recountShare: Number(100 - this.shareAmount),
                        recountTokens: Number(this.$store.state.tokensCounter.totalTokens - this.tokenAmount)});
                }
                this.cleanData();
            },

            cleanData() {
                this.tokenAmount = '';
                this.shareAmount = '';
            },

            onAdd(){
                this.addSection(this.items[this.items.length-1].id);
                this.recountData();
            },

            onDelete() {
                if(this.items.some(elem => elem.done === true)){
                    if(confirm('Вы уверены что хотите удалить это?')) {
                        this.deleteSection();
                        this.recountData();
                    }
                } else {
                    alert('Выберите раздел')
                }
            }
        }
    }
</script>
