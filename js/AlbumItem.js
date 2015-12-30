var $ = require('jquery');
var React = require('react');

var AlbumItem = React.createClass({
    trackChange: function(e){
        this.props.setSelectedAlbum(e.target.id);
        this.props.loadDataFromServer('https://api.spotify.com/v1/albums/' + e.target.id + '/tracks', 'tracks');
    },

    render: function() {
        rows = [];
        {this.props.albumList.map(function(item) {
            currentClass = "";
            if (this.props.selectedAlbum == item.id)
            {
                currentClass = "selected";
            }

            rows.push(
                <ul className={currentClass}>
                    <li id={item.id} key={item.id} onClick={this.trackChange}>{item.name}</li>
                </ul>
            )
        }.bind(this))}

        return (
            <div>{rows}</div>
        );
    }
});

module.exports = AlbumItem;