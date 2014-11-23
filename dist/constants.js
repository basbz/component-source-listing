define(function () {
  return [
    'ALBUM_INDEX_LOADED',
  ].reduce(function (acc, key) {
    acc[key] = key;

    return acc;
  }, {});
});
