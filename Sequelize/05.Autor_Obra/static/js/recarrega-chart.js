// Recarrega o chart ao clicar no tema

function recarrega_chart(cor_label,cor_grid) {
    edital_chart_1.options.legend.labels.fontColor = cor_label;
    edital_chart_1.options.scales.yAxes[0].ticks.fontColor = cor_label;
    edital_chart_1.options.scales.xAxes[0].ticks.fontColor = cor_label;
    edital_chart_1.options.scales.yAxes[0].gridLines.color = cor_grid;
    edital_chart_1.options.scales.xAxes[0].gridLines.color = cor_grid;

    edital_chart_2.options.legend.labels.fontColor = cor_label;
    edital_chart_2.options.scales.yAxes[0].ticks.fontColor = cor_label;
    edital_chart_2.options.scales.xAxes[0].ticks.fontColor = cor_label;
    edital_chart_2.options.scales.yAxes[0].gridLines.color = cor_grid;
    edital_chart_2.options.scales.xAxes[0].gridLines.color = cor_grid;
    
    edital_chart_1.update();
    edital_chart_2.update();
}