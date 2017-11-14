var Tpl = {};
//画像の各選択肢
Tpl.imageChoice = [
	'<li data-answer="{answer}" class="trg-q" data-qnum="{qnum}">',
	'<img src="{image}" class="choice-image">',
	'</li>'
].join("\n");


//テキストの各選択肢
Tpl.textChoice = [
	'<li data-answer="{answer}" class="trg-q" data-qnum="{qnum}">',
	'{label}',
	'</li>'
].join("\n");


var Ars = {};

//設問数
// Ars.questionCount = 0;

// ユーザーが選んだ回答を格納
Ars.userAnswers = {};

// Ars.setQuestionCount = function(count){
// 	// FIXME int型バリデーション
// 	Ars.questionCount = parseInt(count);
// };

/**
 * 文章で選ぶ質問を表示する
 * @param qnum 質問番号
 * @param title 質問の見出し
 * @param choices 質問の選択肢
 */
Ars.showTextQ = function(qnum, title, choices){
	//タイトルを変更する
	$('#question-title').html(title);

	//選択肢のクラス変更
	$('#ul-select').removeClass('image');
	$('#ul-select').addClass('text');

	// 選択肢のHTMLを作成する
	var choicesHtml = "";
	for(var i=0; i<choices.length; i++){
		var html = Tpl.textChoice;

		var label = choices[i];
		//FIXME label が undefinedのときに警告してあげる

		// 文字列置換していく
		html = html.replace("{answer}", i);
		html = html.replace("{qnum}", qnum);
		html = html.replace("{label}", label);

		choicesHtml += html;
		choicesHtml += "\n";

	}

	//選択肢を表示する
	$('#ul-select').html(choicesHtml);

};


/**
 * 画像で選ぶ質問を表示する
 * @param qnum 質問番号
 * @param title 質問の見出し
 * @param choices 質問の選択肢
 */
Ars.showImageQ = function(qnum, title, choices){
	//タイトルを変更する
	$('#question-title').html(title);

	//選択肢のクラス変更
	$('#ul-select').removeClass('text');
	$('#ul-select').addClass('image');

	// 選択肢のHTMLを作成する
	var choicesHtml = "";
	for(var i=0; i<choices.length; i++){
		var html = Tpl.imageChoice;

		var image = choices[i];
		//FIXME label が undefinedのときに警告してあげる

		// 文字列置換していく
		html = html.replace("{answer}", i);
		html = html.replace("{qnum}", qnum);
		html = html.replace("{image}", image);

		choicesHtml += html;
		choicesHtml += "\n";

	}

	//選択肢を表示する
	$('#ul-select').html(choicesHtml);

};


/**
 * 診断結果を表示する
 * @param title
 * @param image
 * @param text
 */
Ars.showResult = function(title, image, text){
	//タイトルをセット
	$('#result-title').html(title);

	// 画像をセット
	$('#result-image img').attr('src', image);

	//診断結果のテキストをセット
	$('#result-text').html(text);
};


/**
 * 各質問の回答を保存する
 * @param qnum 質問番号
 * @param answer 選択した選択肢番号
 */
Ars.saveAnswer = function(qnum, answer){
	var question = "q" + qnum;
	Ars.userAnswers[question] = answer;
};


/**
 * 各質問の回答結果を取得する
 * @returns {{}|*}
 */
Ars.getAnswers = function(){
	return Ars.userAnswers;
};


/**
 * 前の質問に戻るボタンを表示する
 * 表示時は、data-to属性に、現在の質問番号をセット
 * @param qnum 表示している質問番号
 */
Ars.showBackButton = function(qnum){
	console.log('Ars.showBackButton');
	//戻るボタン表示
	$('#back-button').attr('data-to', qnum);
	$('#nav-left').show();
};

/**
 * 前の質問に戻るボタンを非表示にする
 */
Ars.hideBackButton = function(){
	$('#nav-left').hide();
};

/**
 * URLパラメータから値を取得する
 * @param target
 * @returns {*}
 */
Ars.getUrlVars = function(target){
	var vars = {};
	var param = location.search.substring(1).split('&');
	for(var i = 0; i < param.length; i++) {
		var keySearch = param[i].search(/=/);
		var key = '';
		if(keySearch != -1) key = param[i].slice(0, keySearch);
		var val = param[i].slice(param[i].indexOf('=', 0) + 1);
		if(key != '') vars[key] = decodeURI(val);
	}

	if(target != null){
		return vars[target];
	}else{
		return vars;
	}
};


/**
 * 診断結果を取得し返す
 * 当処理ではGETパラメータのrの値を返す
 * @returns {*}
 */
Ars.getResult = function(){
	return Ars.getUrlVars('r');
};

/**
 * 質問ページの初期処理
 * イベントバインドなどの初期化処理を行う
 */
Ars.initQ = function(){

	/*
	 * 質問の選択肢（回答時）のクリックイベント
	 * 質問番号と回答を、開発者定義の回答関数に渡す
	 */
	$(document).on('click', '.trg-q', function(){
		var qnum = $(this).attr('data-qnum');
		var answer = $(this).attr('data-answer');

		qnum = parseInt(qnum);
		answer = parseInt(answer);

		selectAnswer(qnum, answer);

	});

	//documentにバインドする必要ないが、選択肢へのバインドと揃えて分かりやすくするため
	$(document).on('click', '#back-button', function(){
		var qnum = $(this).attr('data-to');
		qnum = parseInt(qnum);
		clickBackButton(qnum);
	});

	initQ();

};


/**
 * 診断結果ページの初期処理
 */
Ars.initR = function(){
	initR();
};
