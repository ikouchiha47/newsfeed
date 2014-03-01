/* 
jslint browser : true;
*/
'use strict';
google.load("feeds", "1");
var channel = "", url = "", originalurl = "", select, themer, t;

function setChannel(dom) {
	channel = dom;
	if (channel == "ndtv") {
		url = "http://feeds.feedburner.com/NDTV-LatestNews?format=xml";
		originalurl = "http://www.ndtv.com/";
	}

	if (channel == "bbc") {
		url = "http://feeds.bbci.co.uk/news/politics/rss.xml";
		originalurl = "http://www.bbc.com";
	}
	if (channel == "teleWorld") {
		url = "http://www.telegraph.co.uk/news/worldnews/rss";
		originalurl = "http://www.telegraph.co.uk/";

	}
	if (channel == "tech") {
		url = "http://feeds.feedburner.com/Techcrunch";
		originalurl = "http://www.techcrunch.com";

	}
	if (channel == "sports") {
		url = "http://www.telegraph.co.uk/sport/rss";
		originalurl = "http://www.telegraph.co.uk/";

	}
	if (channel == "cricket") {
		url = "http://feeds.feedburner.com/NDTV-Cricket";
		originalurl = "http://www.ndtv.com/";

	}
	if (channel == "review") {
		url = "http://www.telegraph.co.uk/comment/columnists/rss";
		originalurl = "http://www.telegraph.co.uk/";

	}
	if (channel == "indiatv") {
		url = "http://www.indiatvnews.com/rssfeed/topstory_news.xml";
		originalurl = "http://www.indiatvnews.com";

		//http://www.indiatvnews.com/rssfeed/india_news.xml
	}
	if (channel == "ectimes") {
		url = "http://economictimes.indiatimes.com/News/rssfeeds/1715249553.cms";
		originalurl = "http://economictimes.indiatimes.com";

	}
	if (channel == "ectimesEcom") {
		url = "http://economictimes.indiatimes.com/rssfeeds/1373380680.cms";
		originalurl = "http://economictimes.indiatimes.com";

	}
	if (channel == "ectimesInfo") {
		url = "http://economictimes.indiatimes.com/rssfeeds/1373380680.cms";
		originalurl = "http://economictimes.indiatimes.com";

	}
	if (channel == "ectimesNation") {
		url = "http://economictimes.indiatimes.com/rssfeeds/1052732854.cms";
		originalurl = "http://economictimes.indiatimes.com";

	}
	if (channel == "mcontrol") {
		//url = "http://economictimes.indiatimes.com/rssfeeds/1373380680.cms";
		url = "http://www.moneycontrol.com/rss/latestnews.xml";
		originalurl = "http://www.moneycontrol.com";
		//originalurl = "economictimes.indiatimes.com";

	}
	if (channel == "mcontrolGlobe") {
		url = "http://www.moneycontrol.com/rss/internationalmarkets.xml";
		originalurl = "http://www.moneycontrol.com";

	}

	if (channel == "movies") {
		url = "http://www.telegraph.co.uk/culture/film/rss";
		originalurl = "http://www.telegraph.co.uk/";

	}
	if (channel == "bolly") {
		url = "http://entertainment.oneindia.in/rss/entertainment-bollywood-fb.xml";
		originalurl = "http://entertainment.oneindia.in";

	}
	localStorage.setItem('nchannel', channel);
}

function delayMade(date) {
	var datenow, datepast, delta;
	datenow = new Date().getTime();
	datepast = new Date(date).getTime();
	delta = Math.abs(datenow - datepast);
	delta /= 1000;
	return {
        days : Math.floor(delta / 86400),
        hours : Math.floor(delta / 3600) % 24,
        minutes : Math.floor(delta / 60) % 60,
        seconds : delta % 60
	};
}

function beautifyDelay(delay) {
	var result = '', temp = '';
	if (delay.days > 0) {
		temp = delay.days + "d";
        result += temp;
	}
	if (delay.days <= 0 && delay.hours > 0) {
		temp = Math.round(delay.hours) + "h";
		result += temp;
	}
	if (delay.days <= 0 && delay.hours <= 0 && delay.minutes > 0) {
		temp = Math.round(delay.minutes) + "M";
		result += temp;
	}

	if (delay.days <= 0 && delay.hours <= 0 && delay.minutes <= 0 && delay.seconds > 0) {
		temp = Math.round(delay.seconds) + "s";
		result += temp;
	}
	result += " ago";
	return result;
}


function feedLoaded(result) {
	if (!result.error) {

		var container, entry, output, delay, author, redirect, i;
		container = document.getElementById("content");
		redirect = document.getElementById('mainsite');
		container.innerHTML = '';
		redirect.innerHTML = '';
		output = '';

		for (i = 0; i < result.feed.entries.length; i += 1) {
			entry = result.feed.entries[i];
			delay = beautifyDelay(delayMade(entry.publishedDate));
			author = (entry.author !='') ? ("by "+ entry.author) : '';
			output += "<h3><a href='" + entry.link + "' data-transition ='slidedown'>" + entry.title + "</a> </h3>";
			output += entry.contentSnippet + "<h4> - " + author + " " + delay + " </h4> <hr/>";
		}
		container.innerHTML += output;
		redirect.setAttribute("href", originalurl);
		redirect.innerHTML += document.getElementById(channel).innerHTML;
	}
}

function OnLoad() {
	var feed = new google.feeds.Feed(url);
	feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
	feed.includeHistoricalEntries();
	feed.setNumEntries(15);
	feed.load(feedLoaded);
	
}

function initiate(self) {
	if(self.hasAttribute('id')) {
        setChannel(self.id);
        //console.log(self.id);
    } else {
        setChannel(self);
        //console.log(self);
    }   
    google.load("feeds", "1", {"callback" : OnLoad});
}

$.mobile.changeTheme = function (theme) {
	var themes = " a c d e";
	function setTheme(csselector,themeclass,theme) {
		$(csselector).removeClass(themes.split(" ").join(" " + themeclass + "-"))
		.addClass(themeclass + "-" + theme)
		.attr('data-theme',theme);
	}
	setTheme("[data-role='page']", "ui-body", theme);
}

function handleClick(i) {
	
	select[i].onclick = function () {
		initiate(select[i]);
	};
}

function handleTheme(i) {
	themer[i].onclick = function () {
		$.mobile.changeTheme(themer[i].id);
	}
}

function updateContents(){
	var elem = document.getElementById(localStorage.getItem('nchannel'));
	initiate(elem);
	setInterval(6000,updateContents);
}
$(document).bind('pagecontainershow', function(e, data) {
	var i;
	if ($.mobile.activePage.attr('id') == "mainpage") {
		localStorage.clear();
	    select = document.getElementsByClassName('news');
	    for (i = 0; i < select.length; i += 1) {
	        handleClick(i);
	    	}
		}
		if ($.mobile.activePage.attr('id') == "displaypage") {
			updateContents();
		}
		if($.mobile.activePage.attr('id') == "themepage") {
			themer = document.getElementsByClassName('themes');
			for(i = 0; i < themer.length; i += 1) {
				handleTheme(i);
			}

		}
});
