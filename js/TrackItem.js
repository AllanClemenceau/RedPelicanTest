var $ = require('jquery');
var React = require('react');

function TrackItem(props) {
    var rows = props.trackList.map(function(item) {
        return (
            <ul>
                <li id={item.id} key={item.id}>{item.name}</li>
            </ul>
        );
    });

    if (rows.length == 0) {
        rows = <ul className="no-result"><li>Merci de sélectionner un album</li></ul>;
    }

    return (
        <div>{rows}</div>
    );
}

module.exports = TrackItem;
