class WysiwygController < Admin::PageController
  def pagetree
    index
    # initialize_parent_region_set
  end
  
private
  def initialize_parent_region_set
    # initialize page controller region set, otherwise region_helper tries
    # to initialize a "wysiwyg" set that doesnt exist
    @template_name ||= File.basename(@first_render).split(".").last
    @region_set = admin.page.send(@template_name)
  end
end
