//HACK: We create our own subclass just so we can override the hardcoded URL used

var WysiwygSiteMap = Class.create(SiteMap, {
  getBranch: function(row) {
    var id = this.extractPageId(row), level = this.extractLevel(row),
        spinner = $('busy-' + id);
        
    new Ajax.Updater(
      row,
      '../admin/pagetree/children/' + id + '/' + level,
      {
        insertion: "after",
        onLoading:  function() { spinner.show(); this.updating = true  }.bind(this),
        onComplete: function() { spinner.fade(); this.updating = false }.bind(this),
        method: 'get'
      }
    );
  }
});

document.observe('dom:loaded', function() {
  when('table.index', function(table){
    if(table.identify() == 'wysiwyg-site-map') {
      new WysiwygSiteMap(table);
    }
  });
});
