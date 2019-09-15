<template>
    <li>
        <div v-bind:class="{'justify-content-end': item.section === state_dSections[0].section, 'justify-content-between': item.section !== state_dSections[0].section}"
             class="d-flex btn_controls">

            <div v-if="item.section !== state_dSections[0].section" class="btn_previous__container">
                <button type="button" class="btn__previous-section d-flex align-items-center p-3" @click="backSection">
                <span>
                    <font-awesome-icon icon="arrow-left"/>
                </span>
                <span class="pl-2 text-left">
                    Раздел {{item.id - 1}}<br>({{state_dSections[item.id - 2].section}})
                </span>
                </button>
            </div>

            <div v-if="item.section !== state_dSections[state_dSections.length-1].section" class="btn_next__container">
                <button type="button" class="btn__next-section d-flex align-items-center p-3" @click="nextSection">

                <span class="pr-2 text-left">
                    Раздел {{item.id + 1}}<br>({{state_dSections[item.id].section}})
                </span>
                    <span>
                    <font-awesome-icon icon="arrow-right"/>
                </span>
                </button>
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
                 <label v-if="!isEdit" class="form-check-label">Раздел «{{item.section}}»</label>
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
            <p><a href="#" class="link-details">Подробнее</a></p>
        </div>
        <div class="pie-chart">
            <!--            <div class="workarea">-->
            <!--                <div id="chartarea" ref="chartdiv"></div>-->
            <!--            </div>-->
            <div ref="chartdiv"></div>

            <dl class="right">
                <dt><b>{{item.tokens/1000000}}</b>млн.</dt>
                <dd>Доля<br>в токенах</dd>
            </dl>
            <dl>
                <dt><b>{{item.share}}%</b></dt>
                <dd>Доля раздела<br>в проекте</dd>
            </dl>
            <div class="text-center">
                <h4>Изменить долю</h4>
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
                    <span>Помочь?</span>
                    <em v-show="showHelpMessage"><i class="arrow-right"></i>Текст текст текст текст текст текст текст
                        текст.</em>
                </a>
            </transition>
        </div>
        <button type="button" class="btn btn-list" @click="submit">Список задач ({{taskList.length}})</button>
<!--        <div class="task-list" v-show="showTaskList">-->
<!--            <ul>-->
<!--                <li v-for="(item,key) in taskList" :key="key">{{item.title}}</li>-->
<!--            </ul>-->
<!--        </div>-->
    </li>
</template>

<script>
    import {mapActions} from 'vuex';
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";

    am4core.useTheme(am4themes_animated);

    export default {
        name: 'SectionList',
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
                taskList: [],
                showTaskList: false,

                state_dSections: this.$store.state.defaultSections,
                isEdit: false,
                newSection: '',
                newDescription: '',
                newShare: '',
                newTokens: '',
                query: 0
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
            this.hndHelp = setTimeout(this.help, this.delayShowHelp); //Помогалка!

            let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0;

            chart.legend = new am4charts.Legend();

            chart.data = [
                {
                    country: "Доля раздела в проекте",
                    litres: this.item.share
                },
                {
                    country: "Доля в токенах",
                    litres: this.item.tokens
                }
            ];

            let series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "litres";
            series.dataFields.category = "country";

        },

        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }

//             const t = this,
//                 script = document.createElement('script');
//             t.getTaskList(); //tasks
//
//             script.id = 'scriptAmCharts';
//             script.src = 'js/amcharts.min.js';
//             script.async = true;
//
//             script.onload = function(){
//                 var i, a = {
//                     dataProvider: [{value: t.item.tokens * t.item.id},{value: t.item.tokens * 100 - t.item.tokens * t.item.id}],
//                     valueField: 'value',
//                     colors: ['#9f82ed', '#f07fa9'],
//                     gradientType: 'radial',
//                     gradientRatio: [0,-0.1],
//                     outlineColor: 'transparent',
//                     outlineAlpha: 0.8,
//                     outlineThickness: 2,
//                     balloonText: '<span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span>',
//                     depth3D: 14,
//                     angle: 55,
//                     startAngle: 270,
//                     labelsEnabled: false,
//                     marginTop: 0,
//                     marginBottom: 0
//                 };
//
//                 t.chart = new AmCharts.AmPieChart();
//                 for (i in a) t.chart[i] = a[i];
//                 t.chart.write('chartarea');
//             };
//
//             document.head.appendChild(script);
        },
        // beforeDestroy: function() {
        //   const t = this;
        //   if (t.chart) t.chart.clear();
        //   document.getElementById('scriptAmCharts').parentNode.removeChild(document.getElementById('scriptAmCharts'));
        // },
        watch: {
            query(value) {
                this.setQuery({newQuery: value});
            }
        },
        methods: {
            ...mapActions({
                editSections: 'editSections',
                recountShare: 'recountShare',
                setQuery: 'setQuery'
            }),

            backSection(){
                this.query = this.query - 1;
                //this.setQuery({newQuery: this.query})

            },

            nextSection(){
                this.query =  this.query + 1;
                //this.setQuery({newQuery: this.query})
            },

            cleanData() {
                this.newSection = '';
                this.newDescription = '';
                this.newShare = '';
                this.newTokens = '';
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
                    share: this.newShare,
                    tokens: this.newTokens
                });
                this.cleanData();
            },
            incdec(val) {
                clearTimeout(this.hndHelp); //tips
                this.showHelp = false; //tips

                this.recountShare({id: this.item.id, share: val}); //action ..считаем токены в мутац.

                // this.chart.dataProvider = [ //for CHARTS
                //     {value:this.tokensAtDivvy*this.divvy},
                //     {value:this.tokensAtDivvy * 100 - this.tokensAtDivvy * this.divvy}
                //     ];

                this.chart.validateData();
                this.hndHelp = setTimeout(this.help, this.delayShowHelp);
            },

            submit() { //tasks list
                clearTimeout(this.hndHelp);
                this.showHelp = false;
                this.showTaskList = !this.showTaskList;
                if (this.showTaskList) {
                    this.$axios.post('', {}).then(function (resp) {
                        if (resp) this.$console.log('submited');
                    });
                } else this.hndHelp = setTimeout(this.help, this.delayShowHelp);
            },

            getTaskList() { //tasks list
                this.$axios.get('').then(function (resp) {
                    if (resp) this.$console.log('loaded');
                    this.taskList.push({title: '123'});
                    this.taskList.push({title: '34786'});
                });
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
</style>
<style src="../../assets/css/idea.css" scoped></style>
