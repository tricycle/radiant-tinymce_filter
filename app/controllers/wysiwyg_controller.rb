class WysiwygController < Admin::PageController
  include WysiwygHelper
  
  def pagetree
    find_homepage
    render :partial => 'pagetree'
  end
end
