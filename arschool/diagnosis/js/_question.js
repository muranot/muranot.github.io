/**
 * 質問のページで最初に呼ばれる処理
 *
 */
function initQ(){
	// 最初に、質問数が何問か設定する
	// Ars.setQuestionCount(2);

	// 最初の質問を表示する
	gotoQ1();
}


/**
 * 質問1 を表示する
 * 画像で選択する場合
 */
function gotoQ1(){
	// 質問の番号を設定する（質問1だったら1, 質問2だったら2）
	var qnum = 1;

	// 質問の見出しを設定する
	var title = "どの食べ物が好き？";

	// 画像を選ぶ場合は、選択肢のファイル名を配列にする
	var choices = [
		"img/q1-1.jpg",
		"img/q1-2.jpg",
		"img/q1-3.jpg",
		"img/q1-4.jpg"
	];

	// 画像の質問を表示するときの決まりごと
	Ars.showImageQ(qnum, title, choices);
}


/**
 * 質問で選択肢を選んだときの処理
 * @param qnum 答えた質問番号（何問目か）
 * @param answer 選んだ選択肢の番号
 */
function selectAnswer(qnum, answer){
	// 質問の回答を保存する
	Ars.saveAnswer(qnum, answer);

	// 1問目の回答後は次の質問（2問目）に行く
	if(qnum == 1){
		gotoQ2();
	}
	// 2問目の回答後は診断結果に行く
	else if(qnum == 2){
		gotoResult();
	}

}

/**
 * 質問2 を表示する
 */
function gotoQ2(){
	// 質問の番号を設定する（質問1だったら1, 質問2だったら2）
	var qnum = 2;

	// 質問の見出しを設定する
	var title = "好きな通勤電車は？";

	// 文章を選ぶ場合は、選択肢の文章を配列にする
	var choices = [
		"やっぱり、ぐるぐる回って楽しい山手線！",
		"まっすぐ東西に伸びる、中野も通る中央線！",
		"池袋から新宿まで、ぐるっと遠回りの丸ノ内線"
	];

	// 文章の質問を表示するときの決まりごと
	Ars.showTextQ(qnum, title, choices);
}


/**
 * 全質問が終わり、診断結果ページへ移動する
 */
function gotoResult() {
	// 今まで答えた回答を取得
	var answers = Ars.getAnswers();

	// 診断結果を取得（診断結果が何番か）
	var result = getResult(answers);

	// ページを移動する
	location.href = "result.html?r="+result;
}


/**
 * 戻るボタンをクリックしたときの処理
 * 質問番号 qnum に合わせて、前の質問を表示する
 * @param qnum 現在の質問番号
 */
function clickBackButton(qnum){
	console.log(qnum);
	if(qnum == 2){
		gotoQ1();
	}
}


/**
 * 診断結果を判定して返す
 *
 * @param answers 今まで選択した結果
 * @returns {string}
 */
function getResult(answers) {
	//質問1, 質問2の回答は下記で取れる。
	var q1 = answers.q1;
	var q2 = answers.q2;

	//(下記は、サンプルのうち、1つ1つ条件分岐して結果を出す方法)

	var result = ""; //結果

	if(q1 == 0){
		if(q2 == 0){
			result = '1';
		}
		else if(q2 == 1){
			result = '2';
		}
		else if(q2 == 2){
			result = '3';
		}

	}else if(q1 == 1){
		if(q2 == 0){
			result = '4';
		}
		else if(q2 == 1){
			result = '1';
		}
		else if(q2 == 2){
			result = '2';
		}
	}else if(q1 == 2){
		if(q2 == 0){
			result = '3';
		}
		else if(q2 == 1){
			result = '4';
		}
		else if(q2 == 2){
			result = '1';
		}
	}else if(q1 == 3){
		if(q2 == 0){
			result = '2';
		}
		else if(q2 == 1){
			result = '3';
		}
		else if(q2 == 2){
			result = '4';
		}
	}

	return result;
}