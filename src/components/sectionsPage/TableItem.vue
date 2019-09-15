<template>
    <tr>
        <th scope="row">
            <div v-bind:class="{bgHover:item.done}" @click.prevent="toggleDone(item.id)">{{index + 1}}</div>
        </th>
        <td>
            <div v-bind:class="{bgHover:item.done}" class="d-flex justify-content-between" @click.prevent="toggleDone(item.id)">
                <span>
                    <input type="checkbox" :checked="item.done" @change="toggleDone(item.id)" class="form-check-input d-none">
                    <label v-if="!isEdit" class="form-check-label">{{item.section}}</label>
                    <input v-else type="text" class="border-0 bg-light pl-1 pr-1" @keyup.enter="onSave" @keyup.esc="onCancel" v-model="newSection">
                </span>
                <font-awesome-icon v-if="!isEdit" icon="pen" @click.prevent="switchToEdit"/>
                <font-awesome-icon v-else icon="save" @click.prevent="onSave"/>
            </div>
        </td>
        <td>
            <div v-bind:class="{bgHover:item.done}">
                <span>
                    <label v-if="!isEdit" class="form-check-label">{{item.share}}%</label>
                    <input v-else style="width: 15px" class="border-0 bg-light text-center" @keyup.enter="onSave" type="text" @keyup.esc="onCancel" v-model="newShare">
                </span>
            </div>
        </td>
        <td>
            <div v-bind:class="{bgHover:item.done}">
                <span>
                    <label v-if="!isEdit" class="form-check-label">{{item.tokens}}</label>
                    <input v-else style="width: 100%" class="border-0 pl-3 pr-1 text-center bg-light" @keyup.enter="onSave" type="number" @keyup.esc="onCancel" v-model="newTokens">
                </span>
            </div>
        </td>
    </tr>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "TableItem",
        data() {
            return {
                newSection: '',
                newShare: '',
                newTokens: '',
                isEdit: false
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

        methods: {
            ...mapActions({
                editSections: 'editSections',
                toggleDone: 'toggleDone'
            }),

            cleanData(){
                this.newSection = '';
                this.newShare = '';
                this.newTokens = '';
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
                this.newTokens = this.item.tokens;
                this.isEdit = true;
            },
            onCancel() {
                this.isEdit = false;
                this.cleanData();
            },
            onSave() {
                this.isEdit = false;
                this.editSections({
                    id: this.item.id,
                    section: this.newSection,
                    share: this.newShare,
                    tokens: this.newTokens
                });
                this.cleanData();
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
