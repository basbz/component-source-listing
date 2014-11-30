define(['react'], function (React) {

  var SourceListHeader = React.createClass({
    render: function () {
      return (
        <div className="source_list_header">
          <div className="source_list_name">{this.props.name}</div>
        </div>
      );
    }
  });

  var Spinner = React.createClass({
    render: function () {
      return (
        <div className="source_list_loading">
          <img src="modules/left/images/animated_loading.gif"/>
        </div>
      );
    }
  });

  var AlbumListItem = React.createClass({
    render: function () {
      var title, icon_style = {
        background: "transparent url('"+ this.props.thumbnail_url + "') no-repeat top left"
      };

      title = (this.props.numberOfImages + " image" + (this.props.numberOfImages === 1 ? '' : 's'));

      return (
        <li className="source_item">
          <a href="#" unselectable="on" title={title}>
            <div className="source_icon" style={icon_style}><div/></div>
            <div className="source_info"/>
            <div className="source_name" unselectable="on">{this.props.name}</div>
          </a>
        </li>
      );
    }
  });

  var AlbumListing = React.createClass({
    listAlbums: function () {
      return this.props.albums.map(AlbumListItem);
    },

    render: function () {
      var content;

      if(this.props.albums) {
        content = this.listAlbums();
      } else {
        content = (<Spinner/>);
      }

      return (
        <div style={{bottom: (100 - this.props.division) + '%'}} className="source_list upper-halve">
          <SourceListHeader name="ALBUMS"/>
          <ul className="source_list_content">
           {content}
          </ul>
        </div>
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
