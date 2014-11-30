define([
  'vb-core/nodash',
  'rsvp',
  'app-core/dispatch',
  'source-listing/constants',
  'app/spy-service',
  'source-listing/components/album-listing',
  'source-listing/components/list-divider'
], function (__, RSVP, Dispatch, Constants, SpyService, AlbumListing, ListDivider) {
  var actions = {}, $ = jQuery, refresh = function () {},
      AlbumStore;

  function mount () {
    var $sourceListsContainer = $("#source_lists_container"), 
        $divider = $('<div/>'),
        $album_listing = $('<div/>');

    var albumListing, listDivider, props = {division: 50};


    $sourceListsContainer.append($album_listing);
    $sourceListsContainer.append($divider);

    albumListing = AlbumListing.mount($album_listing[0]);
    listDivider = ListDivider.mount($divider[0], function () {
      var area = $sourceListsContainer.offset();

      area.height = $sourceListsContainer.height();

      return area;
    });

    refresh = function (payload) {
      props = __.extend(props, payload);
      albumListing.render(props);
      listDivider.render(props);
    };

    AlbumStore.fetchIndex();
    refresh();
  }

  actions[Constants.ALBUM_INDEX_LOADED] = function (payload) {
    refresh(payload);
  };

  actions[Constants.DIVIDE_LISTING] = function (payload) {
    refresh(payload);
  };

  SpyService.on("createdVBClass:left").peek(function(instance) {
    instance.initDataSources = function () {
      mount();
    };
  });

  function extract_album_data ($album) {
    return ['name', 'url', 'thumbnail_url'].reduce(function (acc, key) {
      acc[key] = $album.find(key).text();

      return acc;
    }, {
      id: $album.attr('id'),
      numberOfImages: Number($album.attr('image_count')) || 0
    });
  }



  //$.ajax({
    //url: 'api/albums/6',
    //type: 'PUT',
    //data: {
      //album: {name: 'BAS'}
    //}
  //});
  //
 AlbumStore = {
   state: 'NOT_REQUESTED',

   albums: [],

   fetchIndex: function () {
     if(this.state ===  'NOT_REQUESTED')
       $.get('/api/albums?per_page=10', function (doc, res) {
       if(res === 'success') {
         this.state = 'REQUESTED';

          var albums = [];

          $(doc).find('album').each(function () {
            albums.push(extract_album_data($(this)));
          });

          this.albums = albums;

          Dispatch.viewAction(Constants.ALBUM_INDEX_LOADED, {albums: albums});
        }
      }.bind(this));

      return this.albums;
    }
  };

 Dispatch.register(actions);
});
