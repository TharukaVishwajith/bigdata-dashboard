
function loadAnswers() {
    loadQuestion1Answers();
    loadQuestion2Answers();
    loadQuestion3Answers();
    loadQuestion4Answers();
    loadQuestion5Answers();
    loadQuestion6Answers();
    loadQuestion8Answers();
}


function loadQuestion1Answers(){
    fetch("http://5e176f0c505bb50014720c13.mockapi.io/api/notebook/q1").then((result) => {
        return result.json()
    }).then(res => {
        let arr = res.paragraphs[4].results.msg[1].data.split('\n')
        document.getElementById('q1_text').innerHTML = arr[1];
    })
}




function loadQuestion2Answers(){
    fetch("http://5e176f0c505bb50014720c13.mockapi.io/api/notebook/q1").then((result) => {
        return result.json()
    }).then(res => {
        let lables = [];
        let values = [];
        let colors = [];
        let arr = res.paragraphs[5].results.msg[1].data.split('\n')
        arr.forEach(element => {
           let vals = element.split('	');
           if(vals[0] !== '' && vals[0] !== 'neighbourhood_group'){
            lables.push(vals[0]);
            values.push(parseFloat(vals[1]));
            colors.push(generateColor(0.8));
           }
        });
        drawBarChart(lables,values,colors,'chart_q2')
    })
}



function loadQuestion3Answers(){
    fetch("http://5e176f0c505bb50014720c13.mockapi.io/api/notebook/xxxx").then((result) => {
        return result.json()
    }).then(res => {
        let lables = [];
        let values = [];
        let colors = [];
        let arr = res.paragraphs[0].results.msg[1].data.split('\n')
        arr.forEach(element => {
           let vals = element.split('	');
           if(vals[0] !== '' && vals[0] !== 'neighbourhood_group'){
            lables.push(vals[0]);
            values.push(parseFloat(vals[1]));
            colors.push(generateColor(0.8));
           }
        });
        drawBarChart(lables,values,colors,'chart_q3')
    })
}


function loadQuestion4Answers(){
    fetch("http://5e176f0c505bb50014720c13.mockapi.io/api/notebook/xxx1").then((result) => {
        return result.json()
    }).then(res => {
        let arr = res.paragraphs[2].results.msg[1].data.split('\n');
        let data = {};
       data.tbodyData = [];
        arr.forEach(element => {
            let row = [];
           let vals = element.split('	');
           if(vals[0] === "neighbourhood"){
            data.theadData = [vals[0],vals[1]];
           }else if(vals[0] !== ''){
            row.push(vals[0]);
            row.push(parseFloat(vals[1]));
            data.tbodyData.push(row);
           }
        });
        drawTable(data,'table_q4')
    })
}

function loadQuestion5Answers(){
    fetch("http://5e176f0c505bb50014720c13.mockapi.io/api/notebook/q1").then((result) => {
        return result.json()
    }).then(res => {
        let arr = res.paragraphs[3].results.msg[1].data.split('\n');
        let data = {};
       data.tbodyData = [];
        arr.forEach(element => {
            let row = [];
           let vals = element.split('	');
           if(vals[0] === "room_type"){
            data.theadData = vals;
           }else if(vals[0] !== 'null'){
            row.push(vals[0]);
            row.push(parseFloat(vals[1]));
            data.tbodyData.push(vals);
           }
        });
        drawTable(data,'table_q5')
    })
}

function loadQuestion6Answers(){
    fetch("http://localhost:8080/api/notebook/2EYS96D6Y").then((result) => {
        return result.json()
    }).then(res => {
        let arr = res.body.paragraphs[0].results.msg[0].data.split('\n')
        allOwnerCount = parseInt(arr[0]);
        lessThanTwoOwnersCount = parseInt(arr[1]);

        
        var data = {
            datasets: [{
                data: [(allOwnerCount-lessThanTwoOwnersCount)/allOwnerCount * 100,
                     lessThanTwoOwnersCount/allOwnerCount * 100],
                backgroundColor: [
                    "#FF6384",
                    "#63FF84"
                ]
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'more than one property',
                'Less than one property',
            ]
        };
     
        drawPiChart(data,'chart_q6')
    })
}

function loadQuestion8Answers(){
    fetch("http://localhost:8080/api/notebook/2EYS96D6Y").then((result) => {
        return result.json()
    }).then(res => {
        let arr = res.body.paragraphs[1].results.msg[0].data.split('\n');
        let data = {};
       data.tbodyData = [];
        arr.forEach(element => {
            // let row = [];
            let vals = element.split('\t');
           if(vals[0] === "id"){
            data.theadData = vals;
           }else if(vals[0] !== ''){
            // row.push(vals[0]);
            // row.push(parseFloat(vals[1]));
            data.tbodyData.push(vals);
           }
        });
        drawTable(data,'table_q8')
    })
}















function drawBarChart(lables, values,colors, element){
    var ctx = document.getElementById(element);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lables,
            datasets: [{
                label: 'Neighbourhood Group',
                data: values,
                backgroundColor: colors,
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


function drawTable(data , element) {
    var ctx = document.getElementById(element);
    let html = `<table class="table"><thead><tr>`;

    for(let i=0;i<data.theadData.length;i++){
        html += "<th>"+ data.theadData[i]+"</th>" 
    }
    html += `</tr></thead><tbody>`
    for(let i=0;i<data.tbodyData.length;i++){
        let bodyData = data.tbodyData[i];
        html += `<tr>`
        for(let j=0;j<bodyData.length;j++){
            html += "<td>"+bodyData[j] +"</td>"
        }
        html += `</tr>`
    }
    html += `</tbody></table>`
  ctx.innerHTML = html;
}


function drawPiChart(data, element){
    var ctx = document.getElementById(element);
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true
        }
    });
}


function generateColor(a) {
    let r = Math.random()*256|0;
    let g = Math.random()*256|0;
    let b = Math.random()*256|0;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}


