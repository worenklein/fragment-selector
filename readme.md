jQuery Fragment Selector

This extension hijacks the html fragment to 
allow it to target a general-purpose jQuery selector rather than just an
<a name> or a DOM identifier.

This is implemented in the spirit of http://simonstl.com/articles/cssFragID.html

The extension is only enabled when the fragment starts with #css(_JQUERY_SELECTOR_)

For example, using jQFS, he following is possible:  "point to the seventh row in the first table on the page":
   http://en.wikipedia.org/wiki/List_of_job_scheduler_software#css(tr:nth-of-type(7))
   
   
Additional Features:  
  The extension features an expanded version of 
  jQuery's :contains selector, :containsExactly  (which is case sensitive):
     "point to the first table cell whose text consists solely of the word "Flux"
     http://en.wikipedia.org/wiki/List_of_job_scheduler_software#css(td:containsExactly('Flux'))
     

     
Extension detection:

You may detect this extension via this asynchronous technique:
	function detectExtension(extensionId, callback) {
	  var img;
	  img = new Image();
	  img.onload = function() {
		callback(true);
	  };
	  img.onerror = function() {
		callback(false);
	  };
	  img.src = "chrome-extension://" + extensionId + "/test.png";
	}

a la http://stackoverflow.com/questions/6293498/check-whether-user-has-a-chrome-extension-installed#answer-27930310