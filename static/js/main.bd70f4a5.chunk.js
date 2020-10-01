(this["webpackJsonpcovid19-tracker"]=this["webpackJsonpcovid19-tracker"]||[]).push([[0],{61:function(e,t,a){e.exports=a.p+"static/media/globe.1a59560a.jpg"},66:function(e,t,a){e.exports={ldsRoller:"Spinner_ldsRoller__1PjlX"}},80:function(e,t,a){e.exports=a(92)},85:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),c=a.n(o),l=(a(85),a(5)),s=a(93),i=a(153),u=a(20),d=a(21),m=a(14),p=a(22),b=a(142),h=a(143),f=a(144),v=a(4),y=a(13),g=a(32),C="Recovered",O="Deaths",j=a(61),E=a.n(j),w=function(){return fetch("https://disease.sh/v3/covid-19/countries?yesterday=true").then((function(e){return e.json()})).then((function(e){var t,a={},n=Object(g.a)(e);try{for(n.s();!(t=n.n()).done;){var r,o=t.value,c=o.country;if(!k.includes(c))a[c]=(r={},Object(l.a)(r,"Cases",o.cases),Object(l.a)(r,"New Cases",o.todayCases),Object(l.a)(r,O,o.deaths),Object(l.a)(r,"New Deaths",o.todayDeaths),Object(l.a)(r,C,o.recovered),Object(l.a)(r,"New Recovered",o.todayRecovered),Object(l.a)(r,"flag",o.countryInfo.flag),r)}}catch(s){n.e(s)}finally{n.f()}return a})).then((function(e){return fetch("https://disease.sh/v3/covid-19/all?yesterday=true").then((function(e){return e.json()})).then((function(t){var a,n=(a={},Object(l.a)(a,"Cases",t.cases),Object(l.a)(a,"New Cases",t.todayDeaths),Object(l.a)(a,O,t.deaths),Object(l.a)(a,"New Deaths",t.todayDeaths),Object(l.a)(a,C,t.recovered),Object(l.a)(a,"New Recovered",t.todayRecovered),Object(l.a)(a,"flag",E.a),a);return Object(y.a)(Object(l.a)({},"Worldwide",n),e)}))}))},k=["MS Zaandam","Diamond Princess"],x=a(137),S=a(26),D=a.n(S),T=a(53),N=a(52),R=a(54),A=Object(x.a)((function(e){return{root:{width:"100%",padding:"1em",boxSizing:"border-box",position:"relative",textAlign:"center"},highlight:{position:"absolute",display:"block",width:"80%",top:"1%",left:"50%",transform:"translateX(-50%)",height:"5px",backgroundColor:function(e){var t;return(t={},Object(l.a)(t,"Cases",T.a.A200),Object(l.a)(t,O,N.a.A200),Object(l.a)(t,C,R.a.A200),t)[e.countType]}}}}),{name:"CountBox"}),I=function(e){var t,a=A(e);switch(e.countType){case"Cases":t="New cases";break;case O:t="New deaths";break;case C:t="New recovered";break;default:t="Unknown"}return r.a.createElement("div",{className:a.root},r.a.createElement("div",{className:a.highlight}),r.a.createElement(s.a,{variant:"body1"},t),r.a.createElement(s.a,{variant:"h5"},D()(e.newCount).format("0.[00]a")),r.a.createElement(s.a,{variant:"body1",color:"textSecondary"},D()(e.totalCount).format("0.[00]a")," total"))},M=a(66),B=a.n(M),H=function(e){return r.a.createElement("div",{className:B.a.ldsRoller},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))},z=a(154),G=a(155),P=Object(x.a)({option:{fontSize:"1rem"},root:{padding:"6px 2px"}},{name:"Select"});function W(e){var t=P(e);return r.a.createElement(G.a,{options:e.options,classes:{option:t.option,root:t.root},value:e.value,disableClearable:!0,autoHighlight:!0,onChange:e.onSelect,getOptionLabel:function(e){return e},renderOption:function(e){return r.a.createElement("span",null,e)},renderInput:function(t){return r.a.createElement(z.a,Object.assign({},t,{label:e.label,size:"small",variant:"outlined",inputProps:Object(y.a)(Object(y.a)({},t.inputProps),{},{autoComplete:"off",readOnly:e.readOnly})}))}})}var F=Object(x.a)({root:{width:"300px"}},{name:"CountrySelect"});function Y(e){var t=F(e);return r.a.createElement(W,Object.assign({},e,{classes:{root:t.root},options:e.countries,readOnly:!1,label:"Country"}))}var _,L=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={selectedCountry:null,data:null,loadComplete:!1},e.countrySelectHandler=function(t,a){e.setState({selectedCountry:a})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;w().then((function(t){e.setState({data:t,loadComplete:!0,selectedCountry:"Worldwide"})}))}},{key:"render",value:function(){var e;if(this.state.loadComplete){var t=r.a.createElement("div",{style:{margin:"8px"}},r.a.createElement(Y,{countries:Object.keys(this.state.data),onSelect:this.countrySelectHandler,value:this.state.selectedCountry,classes:{root:this.props.classes.countrySelect}})),a=this.state.data[this.state.selectedCountry];e=r.a.createElement(r.a.Fragment,null,t,r.a.createElement(b.a,{container:!0},r.a.createElement(b.a,{item:!0,xs:12,sm:4},r.a.createElement(I,{countType:"Cases",newCount:a["New Cases"],totalCount:a.Cases})),r.a.createElement(b.a,{item:!0,xs:12,sm:4},r.a.createElement(I,{countType:O,newCount:a["New Deaths"],totalCount:a[O]})),r.a.createElement(b.a,{item:!0,xs:12,sm:4},r.a.createElement(I,{countType:C,newCount:a["New Recovered"],totalCount:a[C]}))))}else e=r.a.createElement(H,null);return r.a.createElement(h.a,null,r.a.createElement(f.a,null,r.a.createElement(s.a,{variant:"h4",align:"center"},"Cases Overview"),e))}}]),a}(n.Component),q=Object(v.a)((function(e){return{countrySelect:Object(l.a)({},e.breakpoints.down("sm"),{width:"100%"})}}),{name:"OverviewContainer"})(L),J=a(29),K=a(69),U=a.n(K),V=a(50),X=a.n(V),Z=(_={},Object(l.a)(_,"Cases",{borderColor:T.a.A100,backgroundColor:T.a[200],labelText:"cases"}),Object(l.a)(_,O,{borderColor:N.a.A100,backgroundColor:N.a[200],labelText:"deaths"}),Object(l.a)(_,C,{borderColor:R.a.A100,backgroundColor:R.a[200],labelText:"recoveries"}),_),$={type:"line",data:{},options:{hover:{intersect:!0},tooltips:{mode:"nearest",axis:"x",intersect:!1,displayColors:!1,callbacks:{label:null,title:function(e,t){return X()(t.labels[e[0].index]).format("MMM DD, YYYY")}}},legend:{display:!1},scales:{xAxes:[{display:!0,afterBuildTicks:function(e,t){return t.map((function(e,t){return" ".concat(X()(e).format("MMM DD")," ")}))},ticks:{maxRotation:0,fontSize:11}}],yAxes:[{afterDataLimits:function(e){e.min<0&&(e.min=0)},afterTickToLabelConversion:function(e){for(var t in e.ticks)e.ticks[t]=D()(e.ticks[t]).format("0,0")},ticks:{precision:0,fontSize:11}}]}}},Q=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(e){var n;Object(u.a)(this,a),(n=t.call(this)).canvasRef=r.a.createRef(),n.chart=null,n.propsDataToChartData=function(){return{labels:Object.keys(n.props.data),datasets:[{label:Z[n.props.countType].labelText,backgroundColor:Z[n.props.countType].backgroundColor,borderColor:Z[n.props.countType].borderColor,data:Object.values(n.props.data)}]}};return $.options.tooltips.callbacks.label=function(e,t){return D()(t.datasets[e.datasetIndex].data[e.index]).format("0,0")+" "+Z[n.props.countType].labelText},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){$.data=this.propsDataToChartData(),this.chart=new U.a(this.canvasRef.current.getContext("2d"),$)}},{key:"componentDidUpdate",value:function(){this.chart.data=this.propsDataToChartData(),this.chart.update()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("canvas",{ref:this.canvasRef}))}}]),a}(n.Component),ee=Object(x.a)({root:{width:"150px"}},{name:"CountTypeSelect"});function te(e){var t=ee(e);return r.a.createElement(W,Object.assign({},e,{classes:{root:t.root},options:["Cases",O,C],readOnly:!0,label:"Type"}))}var ae=Object(x.a)({root:{width:"130px"}},{name:"DurationSelect"});function ne(e){var t=ae(e);return r.a.createElement(W,Object.assign({},e,{classes:{root:t.root},options:["1 week","2 weeks","1 month","All"],readOnly:!0,label:"Duration"}))}var re,oe=a(70),ce=(re={},Object(l.a)(re,"1 month",30),Object(l.a)(re,"All","all"),Object(l.a)(re,"1 week",7),re),le=function(e){for(var t={},a=null,n=0,r=Object.entries(e);n<r.length;n++){var o=Object(J.a)(r[n],2),c=o[0],l=o[1];null!==a&&(t[ie(c)]=l-a),a=l}return t},se=function(e,t){for(var a=0,n=Object.keys(e);a<n.length;a++){var r=n[a];e[r]+=t[r]}},ie=function(e){var t=Object(oe.a)(/^([0-9]?[0-9])\/([0-9]?[0-9])\/([0-9][0-9])$/,{month:1,day:2,year:3}),a=e.match(t),n="20".concat(a.groups.year),r=1===a.groups.month.length?"0".concat(a.groups.month):a.groups.month,o=1===a.groups.day.length?"0".concat(a.groups.day):a.groups.day;return"".concat(n,"-").concat(r,"-").concat(o)},ue=["MS Zaandam","Diamond Princess"],de=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={selectedCountry:null,selectedCountType:null,selectedDuration:null,data:null,selectedData:null,loadComplete:!1},e.countTypeSelectHandler=function(t,a){e.setState({selectedCountType:a}),e.updateSelectedData()},e.countrySelectHandler=function(t,a){e.setState({selectedCountry:a}),e.updateSelectedData()},e.durationSelectHandler=function(t,a){e.setState({selectedDuration:a}),e.updateSelectedData()},e.updateSelectedData=function(){e.setState((function(e){var t,a=e.selectedDuration,n=e.data,r=e.selectedCountry,o=e.selectedCountType;switch(a){case"1 week":t=Object.entries(n[r][o]).slice(-7);break;case"2 weeks":t=Object.entries(n[r][o]).slice(-14);break;case"1 month":t=Object.entries(n[r][o]).slice(-30);break;case"All":t=Object.entries(n[r][o]).slice();break;default:t=[]}var c,l={},s=Object(g.a)(t);try{for(s.s();!(c=s.n()).done;){var i=Object(J.a)(c.value,2),u=i[0],d=i[1];l[u]=d}}catch(m){s.e(m)}finally{s.f()}return Object(y.a)(Object(y.a)({},e),{},{selectedData:l})}))},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e,t=this;(e="All",fetch("https://disease.sh/v3/covid-19/historical?lastdays=".concat(ce[e])).then((function(e){return e.json()})).then((function(e){var t,a={},n=Object(g.a)(e);try{for(n.s();!(t=n.n()).done;){var r,o=t.value,c=o.country;ue.includes(c)||(a[c]?(se(a[c].Cases,le(o.timeline.cases)),se(a[c][O],le(o.timeline.deaths)),se(a[c][C],le(o.timeline.recovered))):a[c]=(r={},Object(l.a)(r,"Cases",le(o.timeline.cases)),Object(l.a)(r,O,le(o.timeline.deaths)),Object(l.a)(r,C,le(o.timeline.recovered)),r))}}catch(s){n.e(s)}finally{n.f()}return a})).then((function(t){return fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=".concat(ce[e])).then((function(e){return e.json()})).then((function(e){var a,n=(a={},Object(l.a)(a,"Cases",le(e.cases)),Object(l.a)(a,O,le(e.deaths)),Object(l.a)(a,C,le(e.recovered)),a);return Object(y.a)(Object(l.a)({},"Worldwide",n),t)}))}))).then((function(e){t.setState({data:e,loadComplete:!0,selectedCountry:"Worldwide",selectedCountType:"Cases",selectedDuration:"1 month"}),t.updateSelectedData()}))}},{key:"render",value:function(){var e;return e=this.state.selectedData?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:this.props.classes.selectBar},r.a.createElement(Y,{countries:Object.keys(this.state.data),onSelect:this.countrySelectHandler,value:this.state.selectedCountry,classes:{root:this.props.classes.countrySelect}}),r.a.createElement(te,{value:this.state.selectedCountType,onSelect:this.countTypeSelectHandler,classes:{root:this.props.classes.countTypeSelect}}),r.a.createElement(ne,{onSelect:this.durationSelectHandler,value:this.state.selectedDuration,classes:{root:this.props.classes.durationSelect}})),r.a.createElement(Q,{countType:this.state.selectedCountType,data:this.state.selectedData})):r.a.createElement(H,null),r.a.createElement(h.a,null,r.a.createElement(f.a,null,r.a.createElement(s.a,{variant:"h4",align:"center"},"Daily Changes"),e))}}]),a}(n.Component),me=Object(v.a)((function(e){return{selectBar:{display:"flex",flexWrap:"wrap",margin:"8px"},countTypeSelect:Object(l.a)({},e.breakpoints.down("sm"),{width:"100%"}),countrySelect:Object(l.a)({},e.breakpoints.down("sm"),{width:"100%"}),durationSelect:Object(l.a)({},e.breakpoints.down("sm"),{width:"100%"})}}),{name:"ChartContainer"})(de),pe=a(71),be=a(149),he=a(150),fe=a(147),ve=a(148),ye=a(145),ge=a(146),Ce=a(157),Oe=a(73);function je(e,t,a){return t[a]<e[a]?-1:t[a]>e[a]?1:0}function Ee(e){var t,a=e.classes,n=e.order,o=e.orderBy,c=e.onRequestSort,s=e.selectedColumns,i=["country"].concat(Object(pe.a)(s)),u=(t={},Object(l.a)(t,"Cases","Cases"),Object(l.a)(t,O,"Deaths"),Object(l.a)(t,C,"Recovered"),Object(l.a)(t,"New Cases","New Cases"),Object(l.a)(t,"New Deaths","New Deaths"),Object(l.a)(t,"New Recovered","New Recovered"),Object(l.a)(t,"country","Country"),t),d=i.map((function(e){return{column:e,label:u[e],numeric:"country"!==e,disablePadding:!1}}));return r.a.createElement(ye.a,null,r.a.createElement(ge.a,null,d.map((function(e){return r.a.createElement(fe.a,{key:e.column,align:e.numeric?"right":"left",padding:e.disablePadding?"none":"default",sortDirection:o===e.column&&n},r.a.createElement(Ce.a,{active:o===e.column,direction:o===e.column?n:"asc",onClick:(t=e.column,function(e){c(e,t)})},e.label,o===e.column?r.a.createElement("span",{className:a.visuallyHidden},"desc"===n?"sorted descending":"sorted ascending"):null));var t}))))}var we=Object(x.a)((function(e){return{root:{width:"100%"},container:{height:"100%"},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}),{name:"CountryCountTable"});function ke(e){var t=e.rows,a=e.selectedColumns,n=e.defaultOrderBy,o=we(e),c=r.a.useState("desc"),l=Object(J.a)(c,2),s=l[0],i=l[1],u=r.a.useState(n),d=Object(J.a)(u,2),m=d[0],p=d[1];return r.a.createElement(Oe.a,{className:o.root},r.a.createElement(ve.a,{className:o.container},r.a.createElement(be.a,{stickyHeader:!0,className:o.table,"aria-labelledby":"tableTitle",size:"small","aria-label":"country count table"},r.a.createElement(Ee,{classes:o,order:s,orderBy:m,onRequestSort:function(e,t){i(m===t&&"asc"===s?"desc":"asc"),p(t)},selectedColumns:a}),r.a.createElement(he.a,null,function(e,t){var a=e.map((function(e,t){return[e,t]}));return a.sort((function(e,a){var n=t(e[0],a[0]);return 0!==n?n:e[1]-a[1]})),a.map((function(e){return e[0]}))}(t,function(e,t){return"desc"===e?function(e,a){return je(e,a,t)}:function(e,a){return-je(e,a,t)}}(s,m)).map((function(e){var t=r.a.createElement(fe.a,{component:"th",scope:"row",padding:"default"},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{src:e.flag,alt:"flag",width:"20px",style:{verticalAlign:"middle",marginRight:"5px"}}),e.country)),n=a.map((function(t){return r.a.createElement(fe.a,{align:"right",key:t},D()(e[t]).format("0,0"))}));return r.a.createElement(ge.a,{hover:!0,role:"checkbox",tabIndex:-1,key:e.country},t,n)}))))))}var xe=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={data:null,loadComplete:!1},e.convertDataToRows=function(){return Object.keys(e.state.data).map((function(t){return Object(y.a)({country:t},e.state.data[t])}))},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;w().then((function(t){return e.setState({data:t,loadComplete:!0})}))}},{key:"render",value:function(){var e,t=this.props.classes;return e=this.state.loadComplete?r.a.createElement(ke,{selectedColumns:[["Cases"],[O],[C]],defaultOrderBy:"Cases",rows:this.convertDataToRows(),classes:{root:t.tableRoot}}):r.a.createElement(H,null),r.a.createElement(h.a,{className:t.root},r.a.createElement(f.a,{className:t.cardContent},r.a.createElement("div",{className:t.titleFlexItem},r.a.createElement(s.a,{variant:"h4",align:"center"},"Cases by Country")),r.a.createElement("div",{className:t.tableFlexItem},e)))}}]),a}(n.Component),Se=Object(v.a)((function(e){return{root:{height:"100%"},cardContent:{display:"flex",flexDirection:"column",alignItems:"stretch",boxSizing:"border-box",height:"100%"},titleFlexItem:{flex:"0 0 auto",flexBasis:"auto"},tableFlexItem:{flex:"1 0 auto",paddingTop:e.spacing(2)},tableRoot:{minHeight:"100%",height:"0"}}}),{name:"TableContainer"})(xe),De=a(151),Te=a(152),Ne=Object(x.a)((function(e){return{gridContainer:{display:"grid",gridTemplateColumns:"repeat(12, 1fr)",gridGap:"13px",padding:"0.6rem",maxWidth:e.breakpoints.values.lg,margin:"0 auto"},overviewGridItem:Object(l.a)({gridColumn:"1/8",gridRow:"2/3"},e.breakpoints.down("sm"),{gridColumn:"1/13"}),chartGridItem:Object(l.a)({gridColumn:"1/8",gridRow:"3/4"},e.breakpoints.down("sm"),{gridColumn:"1/13"}),listGridItem:Object(l.a)({gridColumn:"8 /13",gridRow:"2/4"},e.breakpoints.down("sm"),{gridColumn:"1/13",gridRow:"4/5",height:"500px"}),appBar:{gridColumn:"1 /13",gridRow:"1/2"},footer:Object(l.a)({gridColumn:"1/13",gridRow:"4/5"},e.breakpoints.down("sm"),{gridRow:"5/6"}),"@global":{".MuiTableCell-sizeSmall":{padding:"6px 10px 6px 6px"}}}}));var Re=function(){var e=Ne();return r.a.createElement(r.a.Fragment,null,r.a.createElement(De.a,{position:"static",style:{backgroundColor:"#524a4a"}},r.a.createElement(Te.a,null,r.a.createElement(s.a,{variant:"h4",style:{flexGrow:1,textAlign:"center",letterSpacing:"3px"}},r.a.createElement("i",{className:"fas fa-virus"})," COVID-19 TRACKER"))),r.a.createElement("div",{className:e.gridContainer},r.a.createElement("div",{className:e.appBar}),r.a.createElement("div",{className:e.overviewGridItem},r.a.createElement(q,null)),r.a.createElement("div",{className:e.chartGridItem},r.a.createElement(me,null)),r.a.createElement("div",{className:e.listGridItem},r.a.createElement(Se,null)),r.a.createElement("div",{className:e.footer},r.a.createElement(s.a,{color:"textSecondary",align:"center",variant:"body2"},"COVID-19 TRACKER is powered by React"," ",r.a.createElement("i",{className:"fab fa-react"})," and the open data API from"," ",r.a.createElement(i.a,{href:"https://disease.sh/",target:"_blank"},"disease.sh")," "))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[80,1,2]]]);
//# sourceMappingURL=main.bd70f4a5.chunk.js.map