/**
 * @author Gerrit Kaiser, Tricycle Developments <gerrit@trike.com.au>
 * @copyright Copyright © 2008, Tricycle Developments, All rights reserved.
 */

(function() {
	tinymce.create('tinymce.plugins.RadiantLinkingPlugin', {
	  getInfo : function() {
			return {
				longname : 'Radiant Linking Integration',
				author : 'Gerrit Kaiser, Tricycle Developments',
				authorurl : 'http://tricycledevelopments.com',
				infourl : 'http://github.com/tricycle/radiant-tinymce_filter/tree/',
				version : '0.1'
			};
		},
		
		init : function(ed, url) {
			this.editor = ed;

			// Register commands
			ed.addCommand('mceRadiantLinkDialog', function() {
				var se = ed.selection;

				// No selection and not in link
				if (se.isCollapsed() && !ed.dom.getParent(se.getNode(), 'A'))
					return;
        RadiantLinkingPopup.show();
			});

			// Register buttons
			ed.addButton('internalLink', {
				title : 'advlink.link_desc',
				cmd : 'mceRadiantLinkDialog'
			});

			ed.addShortcut('ctrl+k', 'advlink.advlink_desc', 'mceRadiantLinkDialog');
      
      // Disable button unless an A element is selected
			ed.onNodeChange.add(function(ed, cm, n, co) {
				cm.setDisabled('link', co && n.nodeName != 'A');
				cm.setActive('link', n.nodeName == 'A' && !n.name);
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('radiant_linking', tinymce.plugins.RadiantLinkingPlugin);
})();

var RadiantLinkingPopup = {
  id : 'tinymce-linking-popup',
  show : function() {
    // this element comes form the partial wysiwyg/_link_dialog.html.erb
    // the partial is inserted in tinymce_filter_extension.rb
    var element = $(this.id);
    center(element); // radiant function from admin.js
    element.show();
  },
  
  close : function() {
    $(this.id).up('.popup').hide();
  },
  
  insertLink : function(href) {
    var ed = tinymce.EditorManager.activeEditor;
    var presentLink = ed.dom.getParent(ed.selection.getNode(), 'A');
    
    // TODO: deal with link being present
    // perhaps highlight the link with the right href in the popup
    ed.execCommand("mceBeginUndoLevel");
    if (presentLink == null) {
      ed.execCommand('CreateLink', false, href, {skip_undo: true});
    } else {
      e.href = href;
    };
    ed.execCommand("mceEndUndoLevel");
    this.close();
  }
};

//HACK: We create our own subclass just so we can override the hardcoded URL used
var MiniSiteMap = Class.create(SiteMap, {
  getBranch: function(row) {
    var id = this.extractPageId(row), level = this.extractLevel(row),
        spinner = $('busy-' + id);
        
    new Ajax.Updater(
      row,
      '../admin/pagetree/children/' + id + '/' + level,
      {
        insertion: "after",
        onLoading:  function() { spinner.show(); this.updating = true;  }.bind(this),
        onComplete: function() { spinner.fade(); this.updating = false; }.bind(this),
        method: 'get'
      }
    );
  }
});

document.observe('dom:loaded', function() {
  // attach Ajax-pagetree behaviour
  when('table.index', function(table){
    if(table.identify() == 'wysiwyg-site-map')  new MiniSiteMap(table);
  });
  
  $$('#tinymce-linking-popup .tabs a').each(function(tab) {
    tab.observe('click', function(e) {
      e.stop();
      var removeHere = function(elem) {elem.removeClassName('here');};
      var paneId = this.attributes['href'].value; // this.href gives an absolute URL, not the actual value
      var tabs = this.up('.tabs');
      this.addClassName('here');
      this.siblings().each(removeHere);
      tabs.adjacent('.pane').each(removeHere);
      tabs.adjacent(paneId).each(function(pane) {pane.addClassName('here');});
    });
  }); 
  
  $$('#tinymce-linking-popup #internal-link-pane a').each(function(link) {
    link.observe('click', function(e) {
      e.stop();
      RadiantLinkingPopup.insertLink(this.title);
    });
  });
  
  $$('#tinymce-linking-popup #external-link-pane form').each(function(form) {
    form.observe('submit', function(e) {
      e.stop();
      form
      RadiantLinkingPopup.insertLink();
    });
  }); 
  
});
