<template>
  <tr>
        <th scope="row">
            <div v-bind:class="{bgHover:item.done}" @click.prevent="checkOnToggleDone">{{index + 1}}</div>
        </th>
        <td>
            <div v-bind:class="{bgHover:item.done}" class="d-flex justify-content-between" @click.prevent="checkOnToggleDone">
                <span>
                    <input v-if="!item.special" type="checkbox" :checked="item.done" @change="toggleDone(item.id)" class="form-check-input d-none">
                    <label v-if="!isEdit" class="form-check-label">{{item.section}}</label>
                    <input v-else type="text" class="border-0 bg-light pl-1 pr-1" @keyup.enter="onSave" @keyup.esc="onCancel" v-model="newSection">
                </span>
                <span v-if="!item.special">
                    <font-awesome-icon v-if="!isEdit" icon="pen" @click.prevent="switchToEdit"/>
                    <font-awesome-icon v-else icon="save" @click.prevent="onSave"/>
                </span>

            </div>
        </td>
        <td>
            <div v-bind:class="{bgHover:item.done}">
                <span>
                    <label v-if="!isEdit" class="form-check-label">{{item.share}}%</label>
                    <input v-else style="width: 25px" class="border-0 bg-light text-center" @keyup.enter="onSave" type="number" @keyup.esc="onCancel" v-model="newShare">
                </span>
            </div>
        </td>
        <td>
            <div v-bind:class="{bgHover:item.done}">
                <span>
                    <label class="form-check-label">{{(item.tokens).toLocaleString('ru')}}</label>
                </span>
            </div>
        </td>
    </tr>
</template>

<script>
    import { mapActions } from 'vuex';
    import {mapState} from "vuex";
    import {mapGetters} from "vuex";
    export default {
        name: "TableItem",
        data() {
            return {
                newSection: '',
                newShare: '',
                isEdit: false,
                tokenAmount: '',
                shareAmount: ''
            }
        },

        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        computed: {
            ...mapGetters({
                tokensCounter: "getTokensCounter",
            }),

            ...mapState({
                defaultSections: "defaultSections"
            })
        },

        mounted() {
            this.recountData();
        },

        methods: {
            ...mapActions({
                editSections: 'editSections',
                toggleDone: 'toggleDone',
                recountSpecialPart: "recountSpecialPart"
            }),

            recountData() {
                this.defaultSections.forEach(item => {
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

            checkOnToggleDone(){
                if(!this.item.special) this.toggleDone(this.item.id)
            },

            cleanData() {
                this.newSection = '';
                this.newShare = '';
                this.tokenAmount = '';
                this.shareAmount = '';
            },

            onEdit() {
                if (!this.isEdit) {
                     this.switchToEdit();
                } else {
                    this.onSave();
                }
            },

            switchToEdit() {
                this.newSection = this.item.section;
                this.newShare = this.item.share;
                this.isEdit = true;
            },
            onCancel() {
                this.isEdit = false;
                this.cleanData();
            },
            onSave() {
                this.defaultSections = this.defaultSections.map(item => {
                    if(item.special === true) {

                        if (item.share >= 0 && item.share >= this.newShare) {
                                this.isEdit = false;
                                this.editSections({
                                    id: this.item.id,
                                    section: this.newSection,
                                    share: this.newShare,
                                    tokens: this.$store.state.tokensCounter.totalTokens / 100 * this.newShare
                                });
                                this.cleanData();
                                this.recountData();

                        } else {
                            alert('Особая часть не должна быть равной 0')
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped lang="sass">
    .fa-pen, .fa-save
         display: none
         color: #FB07D2
         align-self: center
         position: absolute
         right: 3px
</style>
