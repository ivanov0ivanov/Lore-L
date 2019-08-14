<template>
  <div class="container">
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper">
        <div class="wrapper-idea">
          <router-link to="/" class="link-back"><i class="icon-left-open-big"></i></router-link>
          <div class="chapter"><img src="/img/layout-2/idea.png" alt=""></div>
          <div class="editable">
            <i :class="{'icon-pencil':!editable,'icon-floppy':editable}" data-action="edit" @click="edit"></i>
            <h2>{{storage.h||'Раздел &laquo;Идея&raquo;'}}</h2>
            <p>{{storage.p||'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.'}}</p>
            <br>
            <p><a href="#" class="link-details">Подробнее</a></p>
          </div>
          <div class="pie-chart">
            <div class="workarea">
              <div id="chartarea"></div>
            </div>
            <dl class="right">
              <dt><b>{{tokensAtDivvy*divvy/1000}}</b>тыс.</dt>
              <dd>Доля<br>в токенах</dd>
            </dl>
            <dl>
              <dt><b>{{divvy}}%</b></dt>
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
              <a href="#" class="help" v-show="showHelp" @click.prevent="showHelpMessage=!showHelpMessage">
                <img src="/img/layout-2/help.png" alt=""><br>
                <span>Помочь?</span>
                <em v-show="showHelpMessage"><i class="arrow-right"></i>Текст текст текст текст текст текст текст текст.</em>
              </a>
            </transition>
          </div>
          <button type="button" class="btn btn-list" @click="submit">Список задач ({{taskList.length}})</button>
          <div class="task-list" v-show="showTaskList">
            <ul>
              <li v-for="(item,key) in taskList" :key="key">{{item.title}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'idea',
  data: function() {
    return {
      storage: {h:this.$store.state.Storage.ideaStorageH||'', p:this.$store.state.Storage.ideaStorageP||''},
      chart: null,
      editable: false,
      showHelp: false,
      showHelpMessage: false,
      delayShowHelp: 7000,
      hndHelp: 0,
      tokensAtDivvy: 15000,
      divvy: this.$store.state.Storage.ideaDivvy?Number(this.$store.state.Storage.ideaDivvy):5,
      taskList: [],
      showTaskList: false
    }
  },
  created: function(){
    var t = this, script = document.createElement('script');
    t.getTaskList();
    script.id = 'scriptAmCharts';
    script.src = 'js/amcharts.min.js';
    script.async = true;
    script.onload = function(){
      var i, a = {
        dataProvider: [{value:t.tokensAtDivvy*t.divvy},{value:t.tokensAtDivvy*100-t.tokensAtDivvy*t.divvy}],
        valueField: 'value',
        colors: ['#9f82ed','#f07fa9'],
        gradientType: 'radial',
        gradientRatio: [0,-0.1],
        outlineColor: 'transparent',
        outlineAlpha: 0.8,
        outlineThickness: 2,
        balloonText: '<span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span>',
        depth3D: 14,
        angle: 55,
        startAngle: 270,
        labelsEnabled: false,
        marginTop: 0,
        marginBottom: 0
      }
      t.chart = new AmCharts.AmPieChart();
      for (i in a) t.chart[i] = a[i];
      t.chart.write('chartarea');
    }
    document.head.appendChild(script);
  },
  mounted: function() {
    var t = this;
    t.hndHelp = setTimeout(t.help,t.delayShowHelp);
  },
  beforeDestroy: function() {
    var t = this;
    if (t.chart) t.chart.clear();
    document.getElementById('scriptAmCharts').parentNode.removeChild(document.getElementById('scriptAmCharts'));
  },
  methods: {
    incdec: function(v) {
      var t = this;
      clearTimeout(t.hndHelp);
      t.showHelp = false;
      t.divvy += v;
      if (t.divvy<1) t.divvy = 1;
      if (t.divvy>50) t.divvy = 50;
      t.chart.dataProvider = [{value:t.tokensAtDivvy*t.divvy},{value:t.tokensAtDivvy*100-t.tokensAtDivvy*t.divvy}];
      t.chart.validateData();
      t.$store.state.Storage.ideaDivvy=t.divvy;
      t.hndHelp=setTimeout(t.help,t.delayShowHelp);
    },
    edit: function(e) {
      var t = this, h = e.target.parentNode.getElementsByTagName('h2')[0], p = e.target.parentNode.getElementsByTagName('p')[0], range;
      clearTimeout(t.hndHelp);
      t.showHelp = false;
      if(h.getAttribute('contenteditable')){
        h.removeAttribute('contenteditable');
        p.removeAttribute('contenteditable');
        t.editable = false;
        if (window.getSelection) window.getSelection().removeAllRanges();
        if(h.innerText.replace(/\s+/g,'')=='')h.innerText=t.storage.h;
        if(p.innerText.replace(/\s+/g,'')=='')p.innerText=t.storage.p;
        if(t.storage.h!=h.innerText||t.storage.p!=p.innerText){
          t.$store.state.Storage.ideaStorageH=h.innerText;
          t.$store.state.Storage.ideaStorageP=p.innerText;
          t.$axios.post('',{header:h.innerText,text:p.innerText}).then(function(resp){
            if (resp) t.$console.log('saved');
          });
        }
        t.hndHelp = setTimeout(t.help,t.delayShowHelp);
      } else {
        t.storage.h = h.innerText;
        h.setAttribute('contenteditable',true);
        t.storage.p = p.innerText;
        p.setAttribute('contenteditable',true);
        t.editable = true;
        if (document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(h);
          range.select();
        } else if (window.getSelection) {
          var selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents(h);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    },
    submit: function() {
      var t = this;
      clearTimeout(t.hndHelp);
      t.showHelp = false;
      t.showTaskList = !t.showTaskList;
      if(t.showTaskList){
        t.$axios.post('',{}).then(function(resp){
          if (resp) t.$console.log('submited');
        });
      } else t.hndHelp=setTimeout(t.help,t.delayShowHelp);
    },
    getTaskList: function() {
      var t = this;
      t.$axios.get('').then(function(resp){
        if (resp) t.$console.log('loaded');
        t.taskList.push({title:'123'});
        t.taskList.push({title:'34786'});
      });
    },
    help: function() {
      this.showHelpMessage = false;
      this.showHelp = true;
    }
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/idea.css" scoped></style>
