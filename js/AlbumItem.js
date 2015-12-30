var $ = require('jquery');
var React = require('react');

var AlbumItem = React.createClass({
    trackChange: function(e){
        this.props.setSelectedAlbum(e.target.id);

        var url = 'https://api.spotify.com/v1/albums/' + e.target.id + '/tracks';
        if (e.target.id == '') {
            url = '';
        }

        this.props.loadDataFromServer(url, 'tracks');
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

        if (rows.length == 0) {
            rows = <ul className="no-result"><li>Merci de sélectionner un artiste</li></ul>;
        }

        return (
            <div>{rows}</div>
        );
    }
});

module.exports = AlbumItem;