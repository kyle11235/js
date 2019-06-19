// answer map
var map = {};
var timer;
var total = Number.parseInt($('#questionCountLable').text().replace('of','').trim());
var interval = 200;
var completed = false;

var go = function(){

    console.log('running...');

	let q = $('.qText').next().text();
	if(!map[q]){
		map[q] = {};
	}

	let selection = undefined;

	// loop answers, select known answer from last test result
	$('.x-form-check-wrap').each(function(index, answerWrapper){
		let answer = $(answerWrapper).find('.x-form-cb-label').text();	
		if(map[q][answer] === true){
			// can only handle radio
			selection = $(answerWrapper).find('.x-form-radio');
			return false;
		}else{
			// init all answers to false
			map[q][answer] = false;
		}
	});

	// loop answers again and select the 1th answer
	if(!exist(selection)){
		$('.x-form-check-wrap').each(function(index, answerWrapper){
			let answer = $(answerWrapper).find('.x-form-cb-label').text();	
			map[q][answer] = true;
			selection = $(answerWrapper).find('.x-form-radio');
			if(!exist(selection)){
				selection = $(answerWrapper).find('.x-form-checkbox');
			}
			return false;
		});
	}

	if(selection.get()[0].checked){
		$('.x-tbar-page-next').click(); // reported dom error is normal system builtin error		  
	}else{
		// slect unchecked radio auto go to next
		$(selection).click();
	}

	// submit answers
	let current = Number.parseInt($('.pageNumberText').val());
	console.log('current=' + current);
	if(current  === total){	
		// use completed to solve last one is not handled issue
		if(completed){
			// stop timer
			stop();

			// click complete
			$('.icon-grade-exam').click();
		}
		completed = true;
		return;
	}

}

var exist = function(selection){
	if(selection && selection.get().length > 0){
		return true;
	}
	return false;
}

// start from current page
var start = function(_interval){
	completed = false;
	if(_interval){
		interval = _interval;
	}
	timer = self.setInterval("go()",interval);
}

var stop = function(){
	window.clearInterval(timer);
}

// filter out incorrect answers
var filterAnswer = function(){
	$('.icon-incorrect').each(function(index, incorrectImage){
		let incorrectQ = $(incorrectImage).next().text();
		for(q in map){
			if(incorrectQ.indexOf(q) > -1){
				console.log('reset - ' + q);
				map[q] = undefined;
			}
		}
	});
}

// retake the exam
var retake = function(_interval) {
	filterAnswer();
	// retake the exam
	$('.icon-retakeexam-32').click();
	start(_interval);
}

// print correct answers
var print = function(){
	filterAnswer();
	console.log(JSON.stringify(map));
}

// usage
// start() -> retake()

// share result
// print()
