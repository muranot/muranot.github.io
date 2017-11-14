/**
 * 診断結果ページで使うJavaScript
 */

/**
 * 診断結果ページで最初に呼ばれる処理
 */
function initR(){
	// 診断結果を表示する
	showResult();
}


/**
 * 診断結果を表示する処理
 */
function showResult() {
	//今までの回答から、診断結果を取得
	var result = Ars.getUrlVars('r');
	var title, image, text;

	//結果が1だった場合
	if(result == '1'){
		title = 'あなたは西武線です！';
		image = 'img/result-sample01.jpg';
		text = '池袋や新宿から、秩父までいける西武線は、黄色い電車や青い電車があります。';

	}
	//結果が2だった場合
	else if(result == '2'){
		title = 'あなたは新幹線です！';
		image = 'img/result-sample02.jpg';
		text = '日本で一番速い電車、新幹線はみんなの人気者です！';
	}
	//結果が3だった場合
	else if(result == '3'){
		title = 'あなたはスーパーハイデッカーです！';
		image = 'img/result-sample03.jpg';
		text = '超レア！たまーに新宿駅から河口湖まで行きます。';
	}
	else if(result == '4'){
		title = 'あなたはケーブルカーです！';
		image = 'img/result-sample04.jpg';
		text = '登山でよく見ますね。急な坂道をぐんぐん登ります！';
	}

	//結果を画面に表示する
	Ars.showResult(title, image, text);
}
