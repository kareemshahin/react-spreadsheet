var DataRow = React.createClass({
  render: function() {
    var cells = this.props.cells,
      columns = [], i;

    for (i = 0; i < cells.length; i = i + 1) {
      var key = 'cell_' + i;
      columns.push(<DataCell value={cells[i]} key={key} />);
    }
    return(
      <tr>
        {columns}
      </tr>
    );
  }
});

var DataCell = React.createClass({
  render: function() {
    return(
      <td>{this.props.value}</td>
    );
  }
});

var SpreadSheet = React.createClass({
  render: function() {
    var rows = [], i,
      data = this.props.data;

    for (i = 0; i < data.length; i = i + 1) {
      var key = 'row_' + i;
      rows.push(<DataRow key={key} cells={data[i]}/>);
    }

    return(
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});


var data = [
  ['Name', 'Age', 'Color'],
  ['Will', '19', 'Blue'],
  ['Phil', '33', 'Red'],
  ['Carl', '12', 'Green'],
  ['Jeff', '59', 'Orange'],
]


ReactDOM.render(
  <SpreadSheet data={data} />,
  document.getElementById('content')
);
