var character_name = 0;
var character_info = {};

$(init);

function init(){
	console.log("init");
	$("#search").click(search_character);
}

function search_character(){
	character_name = $("#character_name").val();
	var info_page_url = "http://www.weibo.com/aj/user/card?type=1&name=" + character_name;
	console.log("get: " + info_page_url);
	$.get(info_page_url, function(data){
		parse_character_info(data);
		show_character_info();
	});
}

function show_character_info(){
	$("#character_info").val(JSON.stringify(character_info, null, "\t"));
}

function parse_character_info(data){
	console.log("parse character info");
	//console.log(data);
	var info = JSON.parse(data);
	//var info_div = $(info.data).find("div.name_card dl.name");
	var info_div = $(info.data);
	console.log(info_div);
	character_info.has_v = (info_div.find("dl.name dd p a img.approve").size() > 0);
	character_info.name = info_div.find("dl.name dd p a").first().text();
	character_info.description = info_div.find("dl.info dd").first().text();
	character_info.gender = info_div.find("dl.name dd p.address img").attr("title");
	info_div.find("dl.name dd p.address img").remove();
	character_info.address = trim(info_div.find("dl.name dd p.address").text());
	info_div.find("dl.name div ul.userdata a").remove();
	info_div.find("dl.name div ul.userdata li.W_vline").remove();
	character_info.interest_count = parse_num(info_div.find("dl.name div ul.userdata li").slice(0, 1).text());
	character_info.fan_count = parse_num(info_div.find("dl.name div ul.userdata li").slice(1, 2).text());
	character_info.weibo_count = parse_num(info_div.find("dl.name div ul.userdata li").slice(2, 3).text());
	character_info.uid = info_div.find("dl.name dt a img").attr("uid");
	console.log(character_info);
}

function parse_num(str){
	str = trim(str);
	str = str.replace("\u4e07", '0000');
	return parseInt(str);
}

function trim(str){
	return str.replace(/\s+/g, '');
}
