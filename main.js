function loadQuestion1Answers(){

}

function loadQuestion2Answers(){
    fetch("http://5e176f0c505bb50014720c13.mockapi.io/api/notebook/xxxx").then((result) => {
        return result.json()
    }).then(res => {
        let lables = [];
        let values = [];
        let arr = res.paragraphs[0].results.msg[1].data.split('\n')
        arr.forEach(element => {
           let vals = element.split('	');
           if(vals[0] !== '' && vals[0] !== 'neighbourhood_group'){
            lables.push(vals[0]);
            values.push(parseFloat(vals[1]));
           }
        });
        drawBarChart(lables,values,'chart_q2')
    })
}

function drawBarChart(lables, values, element){
    var ctx = document.getElementById(element);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lables,
            datasets: [{
                label: 'Neighbourhood Group',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}











