var map = {};

var last;
var timer;
var total = $('#questionCountLable').text().replace('of','').trim();

var go = function(){

	// have completed the last question
	if(last > total){
		// stop timer
		stop();
		
		// click complete
		$('.icon-grade-exam').click();
		return;
	}

	let q = $('.qText').next().text();
	if(!map[q]){
		map[q] = {};
	}

	let selection = undefined;

	// loop answers
	$('.x-form-check-wrap').each(function(index, answerWrapper){
		let answer = $(answerWrapper).find('.x-form-cb-label').text();	
		if(map[q][answer] === true){
			selection = $(answerWrapper).find('.x-form-radio');
			return false;
		}else{
			map[q][answer] = false;
		}
	});

	if(!selection){
		// loop answers again and select the 1th answer
		$('.x-form-check-wrap').each(function(index, answerWrapper){
			let answer = $(answerWrapper).find('.x-form-cb-label').text();	
			map[q][answer] = true;
			selection = $(answerWrapper).find('.x-form-radio');
			return false;
		});
	}

	$(selection).click();
	last++;
}

var start = function(){
	last = 0;
	timer = self.setInterval("go()",1000);
}

var stop = function(){
	window.clearInterval(timer);
}

var retake = function() {
	// reset incorrect questions
	$('.icon-incorrect').each(function(index, incorrectImage){
		let incorrectQ = $(incorrectImage).next().text();
		for(q in map){
			if(incorrectQ.indexOf(q) > -1){
				console.log('reset - ' + q);
				map[q] = undefined;
			}
		}
	});
	
	// retake the exam
	$('.icon-retakeexam-32').click();
	
	start();
}

// start taking exam - start();
// retake - retake();


