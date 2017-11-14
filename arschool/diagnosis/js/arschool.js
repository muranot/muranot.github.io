class Ars {
	constructor() {
		this.userAnswers = {};
// 		this.imageChoiceTpl = `
// <li data-answer="{answer}" class="trg-q" data-qnum="{qnum}">
// 	<img src="{image}" class="choice-image">
// </li>
// `;
//
// 		this.textChoiceTpl = `
// <li data-answer="{answer}" class="trg-q" data-qnum="{qnum}">
// 	{label}
// </li>
// `;

	}


	/**
	 * 文章で選ぶ質問を表示する
	 * @param qnum 質問番号
	 * @param title 質問の見出し
	 * @param choices 質問の選択肢
	 */
	showTextQ(qnum, title, choices){
		//タイトルを変更する
		$('#question-title').html(title);

		//選択肢のクラス変更
		const $ulSelect = $('#ul-select');
		$ulSelect.removeClass('image');
		$ulSelect.addClass('text');

		// 選択肢のHTMLを作成する
		let choicesHtml = "";
		for(let i=0; i<choices.length; i++){
			// let html = this.textChoiceTpl;

			let label = choices[i];
			let html = `
<li data-answer="${i}" class="trg-q" data-qnum="${qnum}">
	${label}
</li>
`;
			//FIXME label が undefinedのときに警告してあげる

			// 文字列置換していく
			// html = html.replace("{answer}", i);
			// html = html.replace("{qnum}", qnum);
			// html = html.replace("{label}", label);

			choicesHtml += html;
			choicesHtml += "\n";

		}

		//選択肢を表示する
		$ulSelect.html(choicesHtml);

	}


	/**
	* 画像で選ぶ質問を表示する
	* @param qnum 質問番号
	* @param title 質問の見出し
	* @param choices 質問の選択肢
	*/
	showImageQ (qnum, title, choices){
		//タイトルを変更する
		$('#question-title').html(title);

		//選択肢のクラス変更
		const $ulSelect = $('#ul-select');
		$ulSelect.removeClass('text');
		$ulSelect.addClass('image');

		// 選択肢のHTMLを作成する
		let choicesHtml = "";
		for(let i=0; i<choices.length; i++){
			// let html = Tpl.imageChoice;
			// let html = this.imageChoiceTpl;
			let image = choices[i];
			let html = `
<li data-answer="${i}" class="trg-q" data-qnum="${qnum}">
	<img src="${image}" class="choice-image">
</li>
`;



			//FIXME label が undefinedのときに警告してあげる

			// 文字列置換していく
			// html = html.replace("{answer}", i);
			// html = html.replace("{qnum}", qnum);
			// html = html.replace("{image}", image);

			choicesHtml += html;
			choicesHtml += "\n";

		}

		//選択肢を表示する
		$ulSelect.html(choicesHtml);

	}

	/**
	 * 診断結果を表示する
	 * @param title
	 * @param image
	 * @param text
	 */
	showResult(title, image, text){
		//タイトルをセット
		$('#result-title').html(title);

		// 画像をセット
		$('#result-image').find('img').attr('src', image);

		//診断結果のテキストをセット
		$('#result-text').html(text);
	}

	/**
	 * 各質問の回答を保存する
	 * @param qnum 質問番号
	 * @param answer 選択した選択肢番号
	 */
	saveAnswer(qnum, answer){
		let question = "q" + qnum;
		this.userAnswers[question] = answer;
	}


	/**
	 * 各質問の回答結果を取得する
	 * @returns {{}|*}
	 */
	getAnswers(){
		return this.userAnswers;
	}


	/**
	 * 前の質問に戻るボタンを表示する
	 * 表示時は、data-to属性に、現在の質問番号をセット
	 * @param qnum 表示している質問番号
	 */
	showBackButton(qnum){
		//戻るボタン表示
		$('#back-button').attr('data-to', qnum);
		$('#nav-left').show();
	}

	/**
	 * 前の質問に戻るボタンを非表示にする
	 */
	hideBackButton(){
		$('#nav-left').hide();
	}

	/**
	 * URLパラメータから値を取得する
	 * @param target
	 * @returns {*}
	 */
	getUrlVars(target){
		let vars = {};
		let param = location.search.substring(1).split('&');
		for(let i = 0; i < param.length; i++) {
			let keySearch = param[i].search(/=/);
			let key = '';
			if(keySearch != -1) key = param[i].slice(0, keySearch);
			let val = param[i].slice(param[i].indexOf('=', 0) + 1);
			if(key != '') vars[key] = decodeURI(val);
		}

		if(target != null){
			return vars[target];
		}else{
			return vars;
		}
	}


	/**
	 * 診断結果を取得し返す
	 * 当処理ではGETパラメータのrの値を返す
	 * @returns {*}
	 */
	getResult(){
		return this.getUrlVars('r');
	}

	/**
	 * 質問ページの初期処理
	 * イベントバインドなどの初期化処理を行う
	 */
	initQ(){

		/*
		 * 質問の選択肢（回答時）のクリックイベント
		 * 質問番号と回答を、開発者定義の回答関数に渡す
		 */
		$(document).on('click', '.trg-q', function(){
			let qnum = $(this).attr('data-qnum');
			let answer = $(this).attr('data-answer');

			qnum = parseInt(qnum);
			answer = parseInt(answer);

			selectAnswer(qnum, answer);

		});

		//documentにバインドする必要ないが、選択肢へのバインドと揃えて分かりやすくするため
		$(document).on('click', '#back-button', function(){
			let qnum = $(this).attr('data-to');
			qnum = parseInt(qnum);
			clickBackButton(qnum);
		});

		initQ();

	}


	/**
	 * 診断結果ページの初期処理
	 */
	initR(){
		initR();
	}

}

