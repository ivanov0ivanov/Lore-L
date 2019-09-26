<template>
    <li>
        <div v-bind:class="{'justify-content-end': item.section === state_dSections[0].section, 'justify-content-between': item.section !== state_dSections[0].section}"
             class="d-flex btn_controls">

            <div v-if="item.section !== state_dSections[0].section" class="btn_previous__container">
                <button type="button" class="btn__previous-section d-flex align-items-center p-3 m-1" @click="backSection">
                <span>
                    <font-awesome-icon icon="arrow-left"/>
                </span>
                <span class="pl-2 text-left">
                    {{$t("sectionList.section")}} {{this.$store.state.query}}<br>({{state_dSections[this.$store.state.query - 1].section}})
                </span>
                </button>
            </div>

            <div v-if="item.section !== state_dSections[state_dSections.length-1].section" class="btn_next__container align-self-center">
                <button type="button" class="btn__next-section d-flex align-items-center p-3 m-1" @click="nextSection">

                <span class="pr-2 text-left">
                    {{$t("sectionList.section")}} {{this.$store.state.query + 2}}<br>({{state_dSections[this.$store.state.query + 1].section}})
                </span>
                <span>
                    <font-awesome-icon icon="arrow-right"/>
                </span>
                </button>
            </div>
            <div v-else class="btn_finish__container align-self-center">
                <button type="button" data-toggle="modal" data-target="#finishModal" class="btn__finish-section d-flex align-items-center p-3 m-1">
                <span class="pr-2 text-left">
                    {{$t("sectionList.finishEdit")}}
                </span>
                </button>
                <ModalWindowFinishEdit/>
            </div>
        </div>
        <div class="chapter"><img src="/img/layout-2/idea.png" alt=""></div>
        <div class="editable">
            <div>
                <font-awesome-icon v-if="!isEdit" icon="pen" @click.prevent="switchToEdit"/>
                <font-awesome-icon v-else icon="save" @click.prevent="onSave"/>
            </div>
            <h2>
            <span>
                 <label v-if="!isEdit || item.special" class="form-check-label">Раздел «{{item.section}}»</label>
                 <input v-else type="text" class="border-0 bg-light pl-1 pr-1 text-center" @keyup.enter="onSave"
                        @keyup.esc="onCancel" v-model="newSection">
            </span>
            </h2>
            <p>
             <span>
                 <label v-if="!isEdit" class="form-check-label">{{item.description}}</label>
                 <textarea v-else type="text" class="border-0 bg-light pl-1 pr-1 text-center w-100"
                           style="height: 150px"
                           @keyup.enter="onSave" @keyup.esc="onCancel" v-model="newDescription" placeholder="Добавьте описание">
                 </textarea>

            </span>
            </p>
            <br>
            <p><a href="#" class="link-details">{{$t('sectionList.details')}}</a></p>
        </div>
        <div class="pie-chart">
            <div class="workarea">
                <div id="chartdiv"></div>
            </div>
            <dl class="right">
                <dt><b>{{item.tokens/1000000}}</b>{{$t("sectionList.mln")}}</dt>
                <dd>{{$t("sectionList.shareinTokens1")}}<br>{{$t("sectionList.shareinTokens2")}}</dd>
            </dl>
            <dl>
                <dt><b>{{item.share}}%</b></dt>
                <dd>{{$t("sectionList.shareshareinProject1")}}<br>{{$t("sectionList.shareshareinProject2")}}</dd>
            </dl>
            <div v-if="!item.special" class="text-center">
                <h4>{{$t("sectionList.checkShare")}}</h4>
                <div class="btn-group">
                    <button type="button" class="btn" @click="incdec(1)">+1</button>
                    <button type="button" class="btn" @click="incdec(-1)">-1</button>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn" @click="incdec(5)">+5</button>
                    <button type="button" class="btn" @click="incdec(-5)">-5</button>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn" @click="incdec(10)">+10</button>
                    <button type="button" class="btn" @click="incdec(-10)">-10</button>
                </div>
            </div>
            <transition name="fade">
                <a href="#" class="help" v-show="showHelp" @click.prevent="showHelpMessage = !showHelpMessage">
                    <img src="/img/layout-2/help.png" alt="help"><br>
                    <span>{{$t("sectionList.help")}}?</span>
                    <em v-show="showHelpMessage"><i class="arrow-right"></i>I help you!</em>
                </a>
            </transition>
        </div>
        <button type="button" class="btn btn-list" @click="submit">{{$t("sectionList.sectionasList")}} ({{item.tasksList.length}})</button>
        <div class="task-list" v-show="showTaskList">
            <SectionTasks :sectionsId="item.id"/>
        </div>
    </li>
</template>

<script>
    import {mapActions} from 'vuex';
    import {mapState} from "vuex";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import SectionTasks from "../../views/pages/SectionTasks";
    import ModalWindowFinishEdit from "./ModalWindowFinishEdit";

    export default {
        name: 'SectionList',
        components: {ModalWindowFinishEdit, SectionTasks},
        data() {
            return {
                storage: {
                    h: this.$store.state.Storage.ideaStorageH || '',
                    p: this.$store.state.Storage.ideaStorageP || ''
                },
                // chart: null,
                showHelp: false,
                showHelpMessage: false,
                delayShowHelp: 7000,
                hndHelp: 0,
                // tokensAtDivvy: 15000,
                // taskList: [],
                showTaskList: false,

                state_dSections: this.$store.state.defaultSections,
                isEdit: false,
                newSection: '',
                newDescription: '',
                newShare: '',
                newTokens: '',
                query: 0,
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
        mounted() {
            this.hndHelp = setTimeout(this.help, this.delayShowHelp); //tips
            this.renderChart();
            this.recountData();

        },
        beforeDestroy() { // for amcharts
            if (this.chart) {
                this.chart.dispose();
            }
        },
        watch: {
            query(value) {
                this.setQuery({newQuery: value});
            }
        },

        computed: {
            ...mapState({
                defaultSections: "defaultSections"
            })
        },

        methods: {
            ...mapActions({
                editSections: 'editSections',
                setQuery: 'setQuery',
                recountSpecialPart: "recountSpecialPart",
                recountEditSection: 'recountEditSection'
            }),

            renderChart () {
                function am4themes_myTheme(target) {
                    if (target instanceof am4core.ColorSet) {
                        target.list = [
                            am4core.color("#9f82ed"),
                            am4core.color("#f07fa9")
                        ];
                    }
                }
                am4core.useTheme(am4themes_myTheme);
                am4core.useTheme(am4themes_animated);

                const chart = am4core.create("chartdiv", am4charts.PieChart3D);

                chart.data = [
                    {"value": this.item.tokens * this.item.share},
                    {"value": this.item.tokens * 100 - this.item.tokens * this.item.share}
                ];

                const pieSeries = chart.series.push(new am4charts.PieSeries3D());
                pieSeries.dataFields.value = "value";
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;
                pieSeries.ticks.template.tooltipText = "{categoryX}\n[bold]{valueY}[/]";
                pieSeries.radius = 130;
                pieSeries.angle = 55;
                pieSeries.startAngle = 270;
            },

            backSection(){
                this.query = this.query - 1;
            },

            nextSection(){
                this.query =  this.query + 1;
            },

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

            cleanData() {
                this.newSection = '';
                this.newDescription = '';
                this.newShare = '';
                this.tokenAmount = '';
                this.shareAmount = '';
            },
            switchToEdit() {
                this.newSection = this.item.section;
                this.newDescription = this.item.description;
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
                    description: this.newDescription,
                    nShare: this.newShare,
                    tokens: this.$store.state.tokensCounter.totalTokens / 100 * this.newShare
                });
                this.recountData();
                this.cleanData();
            },

            incdec(val) {
                clearTimeout(this.hndHelp); //tips
                this.showHelp = false; //tips
                this.newShare = Number(this.item.share) + val;
                const noZero = this.$t('alerts.specialPart.nozero');
                const badValue = this.$t('alerts.specialPart.badValue');
                this.recountEditSection({
                    id: this.item.id,
                    nShare: this.newShare,
                    tokens: this.$store.state.tokensCounter.totalTokens / 100 * this.newShare,
                    noZero: noZero,
                    badValue: badValue
                });
                this.cleanData();
                this.recountData();
                this.hndHelp = setTimeout(this.help, this.delayShowHelp);
            },

            submit() { //tasks list
                clearTimeout(this.hndHelp);
                this.showHelp = false;
                this.showTaskList = !this.showTaskList;
            },

            help() {
                this.showHelpMessage = false;
                this.showHelp = true;
            }
        }
    }
</script>
<style scoped lang="sass">
    .fa-pen, .fa-save
        position: relative
        margin: 12px -20px 0 -55px
        font-size: 1.4em
        text-shadow: 0 0 7px #fff
        cursor: pointer
        float: right
        color: #e648cd
        background: rgba(255, 255, 255, .75)

    .wrapper-idea .pie-chart dt b
        font-size: 1.6em !important
</style>
<style src="../../assets/css/idea.css" scoped></style>
