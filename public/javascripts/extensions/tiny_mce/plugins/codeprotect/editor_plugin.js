/*
  
  * Original Author: Tijmen Schep, Holland, 9-10-2005
  * modified by “flydesign.nl”, author of the first tinymce_filter extension 
    for Radiant (http://code.google.com/p/radiant-tinymce-extension/).
  * onBeforeSetContent Regexp orignally taken from Phil Haack’s blog
  * updated it to the latest TinyMCE API and fixed by Daniele Gozzi
  * Matching-regex fixed by Andrew Buntine/Tricycle Developments
  * Updated to not mangle namespaced Radius-tags by Gerrit Kaiser/Tricycle Developments
  
*/

(function() {
  tinymce.create('tinymce.plugins.CodeProtectPlugin', {
    init: function(ed, url) {
        ed.onGetContent.add(function(ed,o) {
          var regex = new RegExp('<hr rel="([^"]*)?"( class="mceItemRadiantCode")? title="(.*?)" />', 'g');
          var m = o.content.match(regex);
          if (!(m == null)) {
          for (i=0; i<m.length; i++) {
            var match = unescape(m[i].replace(regex, '$1'));
            o.content = o.content.replace(m[i], match);
          }
        }
      });
      ed.onBeforeSetContent.add(function(ed, o) {
        var m = o.content.match(/<\/?r:\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g);
        var content = o.content;
        if (!(m == null)) {
          for (i=0; i < m.length; i++) {
            var title = m[i].replace(/"/g, "'");
            var match = escape(m[i]);
            var regex = new RegExp('(' + m[i] + ')', 'i');
            content = content.replace(regex, '<hr rel="' + match + '" class="mceItemRadiantCode" title="' + title + '" />');
          }
        }
        o.content = content;
      });
    }
  });

  // Register plugin
  tinymce.PluginManager.add('codeprotect', tinymce.plugins.CodeProtectPlugin);
})();
