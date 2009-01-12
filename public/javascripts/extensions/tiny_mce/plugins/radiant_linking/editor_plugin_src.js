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
			ed.addCommand('radiantLink', function() {
				var se = ed.selection;

				// No selection and not in link
				if (se.isCollapsed() && !ed.dom.getParent(se.getNode(), 'A'))
					return;
        
        // this element comes form the partial wysiwyg/_link_dialog.html.erb
        // the partial is inserted in tinymce_filter_extension.rb
        var element = $('tinymce-linking-popup');
        center(element);
        element.show();
			});

			// Register buttons
			ed.addButton('link', {
				title : 'advlink.link_desc',
				cmd : 'radiantLink'
			});

			ed.addShortcut('ctrl+k', 'advlink.advlink_desc', 'radiantLink');

			ed.onNodeChange.add(function(ed, cm, n, co) {
				cm.setDisabled('link', co && n.nodeName != 'A');
				cm.setActive('link', n.nodeName == 'A' && !n.name);
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('radiant_linking', tinymce.plugins.RadiantLinkingPlugin);
})();