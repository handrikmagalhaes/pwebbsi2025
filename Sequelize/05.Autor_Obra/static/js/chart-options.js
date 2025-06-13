// Opcoes comuns aos graficos.

var options = {
    responsive: true,
    legend: { display: false },
    scales: {
        xAxes: [{
            gridLines: {
                color: cor_grid
            },
            ticks: {
                fontColor: cor_label
            }
        }],
        yAxes: [{
            gridLines: {
                color: cor_grid
            },
            ticks: {
                fontColor: cor_label
            }
        }]
    }
};
