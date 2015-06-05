/**
 *
 * API of Google Publisher Tag - Website
 * By: NextMedia Interactive Ltd.
 * Version: 1.3
 * Last modified date: 2012-09-13
 *
 **/

(function() {
	var useSSL = 'https:' == document.location.protocol;
	var src = ( useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
	document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
})();

if( typeof (gpt) === "undefined") {
	var gpt = {
		
		createAdSlot : function(adUnit, sizeArray, divId, extras) {

			var adSlot = googletag.defineSlot(adUnit, sizeArray, divId);
			adSlot.addService(googletag.pubads());
			
			var previewId = this.getUrlParam('dfppreview');
			if( typeof (previewId ) != 'undefined' && previewId != '') {
				adSlot.setTargeting('dfppreview', previewId);
			}

			for(var key in extras) {
				if(extras.hasOwnProperty(key)) {
					adSlot.setTargeting(key, extras[key]);
				}
			}
			return adSlot;
		}, 
		
		generateVideoAdTag : function(adUnit, sizeString, extras) {
			var size;
			switch (sizeString) {
				case 'Preroll':
					size = '640x360';
					break;
				default:
					if(sizeString.indexOf('x') != -1) {
						size = sizeString;
					} else {
						size = '640x360';
					}
					break;
			}

			adSlot = 'http://pubads.g.doubleclick.net/gampad/ads?';
			adSlot += 'sz=' + size + '&';
			adSlot += 'iu=' + encodeURIComponent(adUnit) + '&';
			adSlot += 'ciu_szs=' + '&';
			adSlot += 'impl=s&';
			adSlot += 'gdfp_req=1&';
			adSlot += 'env=vp&';
			adSlot += 'output=xml_vast2&';
			adSlot += 'unviewed_position_start=1&';
			adSlot += 'url=[referrer_url]&';
			adSlot += 'correlator=[timestamp]';
			
			var previewId = this.getUrlParam('dfppreview'); 
			if( (typeof (previewId) != 'undefined' && previewId != '') || ( extras != null && typeof (extras) != 'undefined' ) ) {
				adSlot += '&cust_params=';
				if( typeof (previewId ) != 'undefined' && previewId != '') {
					adSlot += encodeURIComponent('dfppreview=' + previewId + '&');
				} 
				
				for(var key in extras) {
					if(extras.hasOwnProperty(key)) {
						adSlot += encodeURIComponent(key + '=' + extras[key] + '&');
					}
				}
				
			} 
			return adSlot;
		},
		
		enableServices : function() {
			googletag.pubads().collapseEmptyDivs();
			googletag.pubads().enableSyncRendering();
			googletag.pubads().enableSingleRequest();
			googletag.enableServices();
		},
		getUrlParam : function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if(results == null)
				return "";
			else
				return results[1];
		}
	}

}