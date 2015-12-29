var $ = require('jquery');
var TrackItem = require('./TrackItem');
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
                this.setState({
                    trackList: data.items
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    trackChange: function(e){
        $('#album-content > div > ul.selected').removeClass('selected');
        //console.log('https://api.spotify.com/v1/albums/' + e.target.id + '/tracks');
        this.setState({
            url: 'https://api.spotify.com/v1/albums/' + e.target.id + '/tracks'
        }, this.loadTracksFromServer);
        $(e.target).parent().addClass('selected');
    },

    getInitialState: function() {
        return {
            trackList: []
        };
    },

    render: function() {
        rows = [];
        {this.state.trackList.map(function(item) {
            rows.push(<TrackItem item={item} />);
        })}
        React.render(<div>{rows}</div>, $('#track-content')[0]);
        return (
            <ul>
                <li key={this.props.item.id} id={this.props.item.id} onClick={this.trackChange}>{this.props.item.name}</li>
            </ul>
        );
    }
});

module.exports = AlbumItem;