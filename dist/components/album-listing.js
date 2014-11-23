/** @jsx React.DOM */
define(['react'], function (React) {

  var SourceListHeader = React.createClass({displayName: 'SourceListHeader',
    render: function () {
      return (
        React.DOM.div({className: "source_list_header"}, 
          React.DOM.div({className: "source_list_name"}, this.props.name)
        )
      );
    }
  });

  var Spinner = React.createClass({displayName: 'Spinner',
    render: function () {
      return (
        React.DOM.div({className: "source_list_loading"}, 
          React.DOM.img({src: "modules/left/images/animated_loading.gif"})
        )
      );
    }
  });

  var AlbumListItem = React.createClass({displayName: 'AlbumListItem',
    render: function () {
      var title, icon_style = {
        background: "transparent url('"+ this.props.thumbnail_url + "') no-repeat top left"
      };

      title = (this.props.numberOfImages + " image" + (this.props.numberOfImages === 1 ? '' : 's'));

      return (
        React.DOM.li({className: "source_item"}, 
          React.DOM.a({href: "#", unselectable: "on", title: title}, 
            React.DOM.div({className: "source_icon", style: icon_style}, React.DOM.div(null)), 
            React.DOM.div({className: "source_info"}), 
            React.DOM.div({className: "source_name", unselectable: "on"}, this.props.name)
          )
        )
      );
    }
  });

  var AlbumListing = React.createClass({displayName: 'AlbumListing',
    listAlbums: function () {
      return this.props.albums.map(AlbumListItem);
    },

    render: function () {
      var content;

      if(this.props.albums) {
        content = this.listAlbums();
      } else {
        content = (Spinner(null));
      }

      return (
        React.DOM.div({className: "source_list upper-halve"}, 
          SourceListHeader({name: "ALBUMS"}), 
          React.DOM.ul({className: "source_list_content"}, 
           content
          )
        )
      );
    }
  });

  return {
    mount: function (el) {
      React.renderComponent(AlbumListing({}), el);

      return {
        render: function (props) {
          React.renderComponent(AlbumListing(props), el);
        }
      };
    }
  };
});
