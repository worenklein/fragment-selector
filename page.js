		// Copyright (c) 2015 Withered Withers. All rights reserved.
		// Scrolls to a jQuery Selector
		// with an enhanced :contains() selector called :containsExactly()

extension = {
	
	init : function(){
		 "use strict";
		 var activationPrefix = "#css(";
		 var delayMS = 600;  /* let the page settle down.   */
		 /* see http://simonstl.com/articles/cssFragID.html */
	         var re= /^#css\((.+)\)/;			
		
		function addContainsExactly(){
			// Define a custom JQ selector, ":containsExactly", which actually trims the text and compares it to the search string.

			$.expr[':'].containsExactly = function(
				objNode,
				intStackIndex,
				arrProperties,
				arrNodeStack
				){
					var searchString = arrProperties[3];
					var $this = $( objNode );
					return $this.text().trim() == searchString;
			}
		}
		
		function scrollToTarget(){
			console.log('scrollToTarget');
			var fragment = window.location.hash;
			if(! fragment.startsWith(activationPrefix)){
				return;		/* target page functions not invoked*/
			}

			var animated = false;

			var matchResult = fragment.match(re);
			if ( ! matchResult && matchResult.length>1){
				return;
			}
			var searchString = matchResult[1];

			 /* ensure fragment can't create DOM by aborting if we detect any  <'s 
			   The threat model here is someone passing in <img onerror='alert(1)' src=/>     
				to execute arbitrary javascript.	

				http://bugs.jquery.com/ticket/9521
				http://bugs.jquery.com/ticket/11290
				
				
				Going to sacrifice the ability to have a selector with a < anywhere in it 
				in the interest of paranoia for now.  In theory recent jQuery only 
				creates DOM on a leading <, but erring on the side of paranoia for now.
				
				Once jQuery provides an actual API that promises NOT to create DOM, we can relax this.
			 */
			if( searchString.match(/</)){
				console.log("aborting due to suspicous searchString ["+searchString+"]");
				return;
			}
		    
			var $target =$(searchString);
			/* console.log($target); */
			if( animated) {
			   var offset = $target.offset();
			   $('html, body').animate({scrollTop: offset.top - 20,
						    scrollLeft: offset.let - 20});
			}
			else{
			  if( $target.length ){
				$target[0].scrollIntoView();
			  }
			}
			
		}

		/* finish setup */
 		addContainsExactly();

		/* target page actions here */
		$(window).bind('hashchange',scrollToTarget);
		
		/* give the page time to settle down and run other setup which might affect the scroll height */
		$(window).load(function(){
		   setTimeout(function(){
				scrollToTarget();
				},delayMS);
		});
	}
};

extension.init();