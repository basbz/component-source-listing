define([
  'react',
  'vb-core/nodash',
  'source-listing/draggable',
  'source-listing/actions'
], function (React, __, Draggable, Actions) {
  var Divider = React.createClass({
    render: function () {
      return (
        <div style={{top: this.props.division + '%'}} onMouseDown={this.props.onMouseDown} className='source_list_divider'>
          <img src='modules/left/images/splitter.png' unselectable='on'/>
        </div>
      );
    }
  });

  return {
    mount: function (el, getArea) {
      var _props, draggable, _area;

      _props = {
        drag: {
          onStart: function () {
            _area = getArea();
          },

          onDrag: function (e) {
            Actions.divideListing(((e.clientY - _area.top) / _area.height) * 100);
          }
        }
      };


      draggable = Draggable(_props.drag);
      _props.onMouseDown = draggable.onMouseDown;

      function render (props) {
        return React.renderComponent(Divider(__.extend(_props, props)), el);
      }

      return {
        render: render
      };
    }
  };
});
