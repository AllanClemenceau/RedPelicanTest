var $ = require('jquery');
var React = require('react');

var TrackItem = React.createClass({
    render: function() {
        return (
            <ul>
                <li key={this.props.item.id} id={this.props.item.id}>{this.props.item.name}</li>
            </ul>
        );
    }
});

module.exports = TrackItem;