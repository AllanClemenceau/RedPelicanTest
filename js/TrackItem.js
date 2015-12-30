var $ = require('jquery');
var React = require('react');

var TrackItem = React.createClass({
    render: function() {
        rows = [];
        {this.props.trackList.map(function(item) {
            rows.push(
                <ul>
                    <li id={item.id} key={item.id}>{item.name}</li>
                </ul>
            )
        })}

        return (
            <div>{rows}</div>
        );
    }
});

module.exports = TrackItem;