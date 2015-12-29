var $ = require('jquery');
var React = require('react');

var AlbumItem = React.createClass({
    loadTracksFromServer: function() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                data.items.sort(function(itemA, itemB) {
                    if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
                        return 1;
                    }

                    if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
                        return -1;
                    }

                    return 0;
                });
                this.props.onClickAlbum(data.items);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    trackChange: function(e){
        this.state.selectedAlbum = e.target.id;
        this.setState({
            url: 'https://api.spotify.com/v1/albums/' + e.target.id + '/tracks'
        }, this.loadTracksFromServer);
    },

    getInitialState: function() {
        return {
            trackList: []
        };
    },

    render: function() {
        rows = [];
        {this.props.artistList.map(function(item) {
            currentClass = "";
            if (this.state.selectedAlbum == item.id)
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