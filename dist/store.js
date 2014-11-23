define([
  'rsvp',
  'app-core/dispatch',
  'source-listing/constants',
  'app/spy-service',
  'source-listing/components/album-listing',
  'source-listing/components/list-divider'
], function (RSVP, Dispatch, Constants, SpyService, AlbumListing, ListDivider) {
  var actions = {}, $ = jQuery, albums = [],
      AlbumStore, albumListing;

  function mount () {
    var $sourceListsContainer = $("#source_lists_container"), 
        $divider = $('<div/>'),
        $album_listing = $('<div/>');


    $sourceListsContainer.append($album_listing);
    $sourceListsContainer.append($divider);

    albumListing = AlbumListing.mount($album_listing[0]);
    ListDivider.mount($divider[0]);
    AlbumStore.fetchIndex();
  }

  actions[Constants.ALBUM_INDEX_LOADED] = function (payload) {
    albumListing.render(payload);
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
    fetchIndex: function () {
      $.get('/api/albums?per_page=10', function (doc, res) {
        if(res === 'success') {
          var albums = [];

          $(doc).find('album').each(function () {
            albums.push(extract_album_data($(this)));
          });

          Dispatch.viewAction(Constants.ALBUM_INDEX_LOADED, {albums: albums});
        }
      });
    }
  };

 Dispatch.register(actions);
});
