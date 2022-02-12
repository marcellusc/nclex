(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','../www.google-analytics.com/analytics.js','ga');

window.GATracker = function(){
  var _private = {
    'trackers': {},
    'loggedIn': false,
    'downloadExtensions': {
      pdf: true,
      doc: true,
      docx: true,
      ppt: true,
      pptx: true
    },
    'customURI': "",
    'pageType': "public",
    'getSection': function(){
      var section = "",
          sectionDivs = _private.getElementsByClassName("nav-item",document,true,"DIV");
      for( var i = 0, numSections = sectionDivs.length; i < numSections; i++ ){
        var currentDiv = sectionDivs[i];
        if( currentDiv.className.indexOf("active") > -1 ){
          var titleSpans = currentDiv.getElementsByTagName("SPAN");
          if( titleSpans.length > 0 ){
            try{
              section = titleSpans[0].innerHTML.toLowerCase().replace(/&/g,'and').replace(/amp\;/g,'').replace(/ /g,'_');
            }catch(e){}
          }
        }
      }
      return section;
    },
    'getLevel': function(level){
      var levelTitle = "",
          levelLinks = _private.getElementsByClassName("nested-list--link level-"+level,document,true,"A");
      for( var i = 0, numLinks = levelLinks.length; i < numLinks; i++ ){
        var currentLink = levelLinks[i];
        if( currentLink.className.indexOf("active") > -1 ){
          try{
            levelTitle = currentLink.innerHTML.toLowerCase().replace(/&/g,'and').replace(/amp\;/g,'').replace(/ /g,'_');
            if( currentLink.className.indexOf("icon-lock") > -1 ){
              _private.pageType = "private";
            }
          }catch(e){}
        }
      }
      return levelTitle;
    },
    'getURIFromBreadcrumb': function(){
      var uriParts = [""],
          section = _private.getSection(),
          level1 = _private.getLevel(1),
          level2 = _private.getLevel(2);
      uriParts.push(_private.pageType);
      if( section !== "" ){ uriParts.push(section); };
      if( level1 !== "" ){ uriParts.push(level1); };
      if( level2 !== "" ){ uriParts.push(level2); };
      _private.customURI = uriParts.join('index.html').replace(/\/+/g,'index.html')+".htm";
      if( section === "" ){
        _private.customURI = "/public"+window.location.pathname.toLowerCase()+document.location.search;
      } else {
        _private.customURI += document.location.search;
      }
      return _private.customURI;
    },
    'getElementsByClassName': function(className,root,partial,tagName){
      root = root || document;
      className = className || '';
      partial = partial || false;
      tagName = tagName || "*";
      var elements = root.getElementsByTagName(tagName);
      var retElements = [],
          needle = partial ? new RegExp(className) : new RegExp('^' + className + '$');
      for (var i = 0; i < elements.length; i++) {
        var tempClass = elements[i].className||"";
        if (tempClass.match(needle)) {
          retElements.push(elements[i]);
        }
      }
      return retElements;
    },
    'parseQueryParam': function(queryString, queryParam){
      queryString = (typeof queryString === "string") ? queryString : document.location.search;
      var queryStringMatch = queryString.match(new RegExp(queryParam+"=([^&#]*)","i"));
      if( queryStringMatch !== null ){
        return queryStringMatch[1];
      }
      return "";
    },
    'unobtrusiveBind': function(elem,event,func){
      if( elem ){
        elem["custom"+event] = elem["custom"+event]||[];
        elem["custom"+event].push(func);
        if( !elem["_gaCustom"+event] ){
          elem["old"+event] = elem[event] || function(){};
          elem[event] = (function(event){
            return function(){
              for( var i = 0, numFuncs = this["custom"+event].length; i < numFuncs; i++ ){
                this["custom"+event][i].apply(this);
              }
              var lcLinkHrefParts = (typeof this.href === "string") ? this.href.toLowerCase().match(/\/\/(([^\/]*)\/[^\?\#]*)(|\?[^\#]*)(|\#.*)$/) : null,
                  lcLinkCleanURI = (lcLinkHrefParts !== null) ? lcLinkHrefParts[1] : "",
                  lcLinkHash = (lcLinkHrefParts !== null) ? lcLinkHrefParts[4] : "",
                  cleanPageURI = document.domain.toLowerCase() + window.location.pathname.toLowerCase();
              if( this.tagName && (this.tagName.toUpperCase() === "A" || this.tagName.toUpperCase() === "AREA") &&
                  typeof this.href === "string" && 
                  (lcLinkCleanURI !== cleanPageURI ||
                   lcLinkHash === "") ){
                setTimeout((function(obj, oldevent, href){
                  return function(){
                    oldevent.apply(obj);
                    if( obj.target === "_blank" ){
                      window.open(href);
                    } else {
                      window.location.href = href;
                    }
                  }
                })(this, this["old"+event], this.href),300);
                return false;
              } else {
                return this["old"+event];
              }
            };
          })(event);
          elem["_gaCustom"+event] = true;
        }
      }
    },
    'getCookie': function(c_name){
      var c_value = document.cookie;
      var c_start = c_value.indexOf(" " + c_name + "=");
      if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
      }
      if (c_start == -1) {
        c_value = "";
      } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
      }
      return c_value;
    }
  };
  var _public = {
    'initializeTracker': function(uaCode, prefix){
      if( typeof _private.trackers[prefix] === "undefined" ){
        ga('create', uaCode, {
          'name': prefix+"Tracker",
          'cookieName': prefix+"GA"
        });
        _private.trackers[prefix+"Tracker"] = uaCode;
      }
    },
    'determineLoggedInStatus': function(){
      _private.loggedIn = (_private.getCookie("SSO") !== "");
      return _private.loggedIn;
    },
    'trackPageview': function(){
      if( _private.customURI === "" ){
        _private.getURIFromBreadcrumb();
      }
      var pageInfo = {
            'page': _private.customURI,
            'dimension1': (_private.loggedIn) ? "Logged In" : "Not Logged In"
          },
          videoIdDiv = document.getElementById("video-id"),
          videoIdMatch = (videoIdDiv !== null) ? (videoIdDiv.innerHTML||"").match(/ID=(.*)/) : null,
          videoId = (videoIdMatch !== null) ? videoIdMatch[1]||"" : "";
      for( var tracker in _private.trackers ){
        if( videoId !== "" ){
          ga(tracker+'.set', 'dimension3', videoId);
        }
        ga(tracker+'.send', 'pageview', pageInfo);
      }
    },
    'trackEvent': function(category, action, label, value, noninteractive, custom){
      var eventData = {
        'page': _private.customURI,
        'dimension1': (_private.loggedIn) ? "Logged In" : "Not Logged In"
      };
      if( typeof custom === "object" ){
        for( key in custom ){
          eventData[key] = custom[key];
        }
      }
      if( noninteractive ) {
        eventData.nonInteraction = 1;
      }
      for( var tracker in _private.trackers ){
        ga(tracker+'.send', 'event', category, action, label, value, eventData);
      }
    },
    'tagQAToggles': function(){
      if( typeof jQuery === "function" ){
        jQuery('div.faq div.toggler-root.clear .toggler-trigger.tx-dark-blue').click((function(tracker){
          return function(){
            try{
              var $this = $(this);
              // Capture the title of the element being clicked and determine if see answer or hide answer is clicked
              var title = $this.closest('.sp.border-top.pad_top').children('.tx-dark-blue.tx-bold.sp').text(),
                  action = $this.children('.tx-link').text(),
                  cleanString = function(str){
                    return str.replace(/^\s+|\s+$/g,"");
                  };
              if( action.toLowerCase().indexOf("see answer") > -1 ){
                tracker.trackEvent('QA Toggle', cleanString(title), document.title);
              }
            }catch(e){}
          };
        })(this));
      }
    },
    'tagLinks': function(){
      var links = document.getElementsByTagName("A");
      for( var i = 0, numLinks = links.length; i < numLinks; i++ ){
        var currentLink = links[i],
            lcLinkHref = (typeof currentLink.href === "string") ? currentLink.href.toLowerCase() : "",
            lcLinkHrefParts = lcLinkHref.split('index.html'),
            numParts = lcLinkHrefParts.length,
            linkDomain = (numParts > 0) ? lcLinkHrefParts[2] : "",
            linkCleanUrl = (numParts > 2) ? lcLinkHrefParts.slice(2).join('index.html') : "",
            fileName = (numParts > 0) ? lcLinkHrefParts[numParts-1] : "",
            fileExtension = (fileName.indexOf('.') > -1) ? fileName.split('.')[1] : "";
        if( fileExtension !== "" &&
            _private.downloadExtensions[fileExtension] ){
          _private.unobtrusiveBind(currentLink,"onclick",(function(tracker,fileName,uri){
            return function(){
              tracker.trackEvent('Download', fileName, uri);
            };
          })(this,fileName,_private.customURI));
        }
        if( linkDomain !== document.domain.toLowerCase() ){
          _private.unobtrusiveBind(currentLink,"onclick",(function(tracker,linkUrl,uri){
            return function(){
              tracker.trackEvent('Offsite Link', linkUrl, uri);
            }
          })(this,linkCleanUrl,_private.customURI));
        }
      }
    },
    'tagPassportLinks': function(){
      var links = document.getElementsByTagName("A");
      for( var i = 0, numLinks = links.length; i < numLinks; i++ ){
        var currentLink = links[i],
            lcLinkHref = (typeof currentLink.href === "string") ? currentLink.href.toLowerCase() : "";
        if( lcLinkHref !== "" ){
          var redUrl = _private.parseQueryParam(lcLinkHref,"redurl");
          if( redUrl !== "" ){
            var redUrlParts = redUrl.split('//'),
                externalUrl = (redUrlParts.length > 1) ? redUrlParts[1] : "",
                pageUrl = document.domain.toLowerCase() + window.location.pathname.toLowerCase();
            if( externalUrl !== "" ){
              _private.unobtrusiveBind(currentLink,"onclick",(function(tracker,linkUrl,pageUrl){
                return function(e){
                  tracker.trackEvent('Offsite Link', linkUrl, pageUrl);
                };
              })(this,externalUrl,pageUrl));
            }
          }
        }
      }
    },
    'tagVideos': function(){
      var videos = document.getElementsByTagName("VIDEO");
      for( var i = 0, numVideos = videos.length; i < numVideos; i++ ){
        var currentVideo = videos[i],
            videoTypeSpan = document.getElementById("video-type"),
            videoType = (videoTypeSpan !== null) ? (videoTypeSpan.innerHTML||"").trim().toLowerCase() : "",
            headers = _private.getElementsByClassName("heading_1",document,false,"H1"),
            videoName = (headers.length > 0) ? headers[0].innerHTML.trim().toLowerCase() : "",
            eventName = "";
        videoType = videoType.replace(/other /,'');
        if( videoType === "videos" ){
          var eventLink = document.getElementById("event-name");
          eventName = (eventLink !== null) ? (eventLink.innerHTML||"").trim().toLowerCase() : "";
          videoType = "event videos";
        }
        currentVideo._gaEventName = eventName;
        currentVideo._gaVideoName = videoName;
        currentVideo._gaVideoType = videoType;
        currentVideo._gaMilestones = {
          "25": false,
          "50": false,
          "75": false,
        };
        currentVideo.addEventListener("play",function(){
          if( !this._gaTrackedPlay ){
            var customData = {};
            if( typeof this._gaEventName === "string" &&
                this._gaEventName !== "" ){
              customData.dimension2 = this._gaEventName;
            }
            window.ncsbnGATracker.trackEvent(this._gaVideoType,"play",this._gaVideoName, 0, false, customData);
            this._gaTrackedPlay = true;
          }
        });
        currentVideo.addEventListener("ended",function(){
          if( this._gaTrackedPlay ){
            var customData = {};
            if( typeof this._gaEventName === "string" &&
                this._gaEventName !== "" ){
              customData.dimension2 = this._gaEventName;
            }
            window.ncsbnGATracker.trackEvent(this._gaVideoType,"complete",this._gaVideoName, 0, false, customData);
            this._gaTrackedPlay = false;
            this._gaMilestones = {
              "25": false,
              "50": false,
              "75": false,
            };
          }
        });
        currentVideo.addEventListener("timeupdate",function(){
          for( var milestone in this._gaMilestones ){
            if( !this._gaMilestones[milestone] &&
                (this.currentTime/this.duration)*100 > parseInt(milestone) ){
              var customData = {};
              if( typeof this._gaEventName === "string" &&
                  this._gaEventName !== "" ){
                customData.dimension2 = this._gaEventName;
              }
              window.ncsbnGATracker.trackEvent(this._gaVideoType,milestone+"%",this._gaVideoName, 0, false, customData);
              this._gaMilestones[milestone] = true;
            }
          }
        });
      }
    },
    'executeOnDOMReady': function(func){
      if (document.addEventListener) {
        if ( navigator.userAgent.indexOf('AppleWebKit/index.html') > -1 ) {
          window.trackingTimer = window.setInterval((function(func) {
            return function(){
              if (/loaded|complete/.test(document.readyState)) {
                clearInterval(window.trackingTimer);
                func();
              }
            };
          })(func), 50);
        } else {
          if( document.body ){
            func();
          } else {
            document.addEventListener("DOMContentLoaded", func, false);
          }
        }
      } else {
        window.gaDOMReadyInterval = setInterval((function(func){
          return function(){
            if( document.body ){
              func();
              clearInterval(window.gaDOMReadyInterval);
            }
          };
        })(func), 15);
      }
    }
  };
  
  return _public;
};

window.ncsbnGATracker = new window.GATracker();
window.ncsbnGATracker.initializeTracker('UA-8048950-5','ncsbn');
window.ncsbnGATracker.determineLoggedInStatus();
window.ncsbnGATracker.executeOnDOMReady(function(){
  window.ncsbnGATracker.trackPageview();
  window.ncsbnGATracker.tagLinks();
  window.ncsbnGATracker.tagVideos();
  window.ncsbnGATracker.tagQAToggles();
});