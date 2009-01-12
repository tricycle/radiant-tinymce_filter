module WysiwygHelper
  def radiant_popup(id, &content)
    close_link = link_to_function 'Close', "$(this).up('.popup').hide()", :class => 'close-link'
    inner_html = block_given? ? capture(&content) : ''
    container = content_tag :div, [inner_html, close_link, "\n"].join, :id => id, :class => 'popup', :style => 'display: none'
    concat container, content.binding
  end
end
