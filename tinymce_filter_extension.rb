require_dependency 'application'

class TinymceFilterExtension < Radiant::Extension
  version "1.0"
  description "Provides a TinyMCE filter for the Radiant CMS."
  url "http://code.google.com/p/radiant-tinymce-extension/"
  
  define_routes do |map|
    map.connect '/admin/pagetree', :controller => 'wysiwyg', :action => 'pagetree'
    map.connect '/admin/pagetree/children/:id/:level', :controller => 'wysiwyg', :action => 'children'
  end
  
  def activate
    # Load the filter
    TinyMceFilter    
    
    # Add the appropriate stylesheets to the javascripts array in the page and snippet controller
    include_js = lambda do
      before_filter :add_tinymce_javascripts, :only => [:edit, :new]
      private
      def add_tinymce_javascripts
        @javascripts << 'extensions/tiny_mce/tiny_mce' << 'extensions/tiny_mce/tiny_mce_settings' << 'extensions/tiny_mce/tinymce_filter'
      end
    end
    if defined?(Admin::PagesController) && defined(Admin::PagesController)
      Admin::PagesController.class_eval &include_js
      Admin::SnippetsController.class_eval &include_js
    else
      Admin::PageController.class_eval &include_js
      Admin::SnippetController.class_eval &include_js
    end
  end
  
  def deactivate
  end
end
