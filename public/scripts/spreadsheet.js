var EventBus = {
  topics: {},

  subscribe: function(topic, listener) {
    // create the topic if not yet created
    if(!this.topics[topic]) this.topics[topic] = [];

    // add the listener
    this.topics[topic].push(listener);
  },

  publish: function(topic, data) {
    // return if the topic doesn't exist, or there are no listeners
    if(!this.topics[topic] || this.topics[topic].length < 1) return;

    // send the event to all listeners
    this.topics[topic].forEach(function(listener) {
      listener(data || {});
    });
  }
};

var HeaderRow = React.createClass({
  render: function() {
    var cells = this.props.cells,
      columns = [], i;

    for (i = 0; i < cells.length; i = i + 1) {
      columns.push(<HeaderCell key={cells[i]} value={cells[i]}/>);
    }
    return(
      <tr>{columns}</tr>
    );
  }
});

var HeaderCell = React.createClass({
  render: function() {
    return(
      <th>{this.props.value}</th>
    );
  }
});

var DataRow = React.createClass({
  render: function() {
    var cells = this.props.cells,
      columns = [], i, coordinates;

    for (i = 0; i < cells.length; i = i + 1) {
      var key = 'row_' + this.props.rowId +'_cell_' + i;
      coordinates = [this.props.rowId, i]
      columns.push(<DataCell value={cells[i]}
                                           coordinates={coordinates}
                                           key={key} />);
    }
    return(
      <tr>{columns}</tr>
    );
  }
});

var DataCell = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      changedValue: this.props.value
    };
  },
  handleDoubleClick: function(){
    this.setState({editing: true});
  },
  handleOnBlur: function() {
    this.setState({editing: false});
  },
  handleChange: function(e){
    this.setState({changedValue: e.target.value})
  },
  render: function() {
    var cellContent;

    if (this.state.editing) {
      cellContent = (
        <input defaultValue={this.state.changedValue}
                  onBlur={this.handleOnBlur}
                  onChange={this.handleChange} />
      )
    }
    else {
      cellContent = (
        <span>
         {this.state.changedValue}
        </span>
      )
    }

    return(
      <td onDoubleClick={this.handleDoubleClick}>
        <div>
          {cellContent}
        </div>
      </td>
    );
  }
});

var SpreadSheet = React.createClass({
  getInitialState: function() {
    return {data: this.props.data.rows};
  },
  render: function() {
    var rows = [], i,
      data = this.state.data;

    rows.push(<HeaderRow cells={this.props.data.header}/>);

    for (i = 0; i < data.length; i = i + 1) {
      var key = 'row_' + i;
      rows.push(<DataRow key={key}
                                      rowId={i}
                                      cells={data[i]}/>);
    }

    return(
      <table className="table table-bordered table-striped">
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});


var data = {
  header: ['Name', 'Age', 'Color'],
  rows: [
    ['Will', '19', 'Blue'],
    ['Phil', '33', 'Red'],
    ['Carl', '12', 'Green'],
    ['Jeff', '59', 'Orange']
  ]
}


ReactDOM.render(
  <SpreadSheet data={data} />,
  document.getElementById('content')
);
