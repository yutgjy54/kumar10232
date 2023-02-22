/*
 * To use, simply replace the "sheetId" value in the
 * URL below with your own unique Google document ID
 * 
 * ---->  The Google document's sharing must be set to public <------
 * 
 */
// -----> CHANGE THIS <-----
let sheetId = '1Pmt07Lulv3GrHZ83_U7Ob3Y6sJPLgj1boTLTRJA-v30';

google.charts.load('current', {
    packages: ['table']
});
var visualization;
var cssClassNames = {
    'headerRow': 'cssHeaderRow',
    'tableRow': 'cssTableRow',
    'oddTableRow': 'cssOddTableRow',
    'selectedTableRow': 'cssSelectedTableRow',
    'hoverTableRow': 'cssHoverTableRow',
    'headerCell': 'cssHeaderCell',
    'tableCell': 'cssTableCell',
    'rowNumberCell': 'cssRowNumberCell'
};

function drawVisualization() {
    var query = new google.visualization.Query(`https://spreadsheets.google.com/tq?key=${sheetId}&output=html&gid=0&usp=sharing`);
    query.setQuery(`SELECT * `);
    query.send(handleQueryResponse);    
}

function handleQueryResponse(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();

    let column = data['bf']
    let row = data['Wf']
    let cL = column.length
    // console.log(column.length)
    // console.log(row.length)
    let table = document.getElementById('table')
    let tb1 = document.createElement('table')
    tb1.style.width = '100px';
    tb1.className = "table table-striped"

    for (var j = 0; j < row.length; j++) {
        try {

            for (var k = 0; k < column.length; k++) {

                try {
                    let a = column[k].label
                    let b = row[j]['c'][k]['v']
                    if (b!=null) {
                        const tr = tb1.insertRow();
                        const td1 = tr.insertCell();
                        const td2 = tr.insertCell();
                        td1.appendChild(document.createTextNode(column[k].label))
                        td2.appendChild(document.createTextNode(row[j]['c'][k]['v']))
                    }


                    // console.log(j +" "+ k)
                    // console.log(column[k].label+" : "+ row[j]['c'][k]['v'])

                } catch (e) {console.log(e)}

            };

        } catch (e) {
            console.log(e)
        }

    };

    document.body.appendChild(tb1);

}
google.setOnLoadCallback(drawVisualization);