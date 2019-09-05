/* User will see a list of categories when they click on a category the app will:*/
// 1. grab the name of the category
// 2. hide all the other categories and show the close section link from the navigation
// 3 selected link becomes the title i.e. turns bold
// 4. navigation list shrinks
// 5 the category section gets populated 
//  5.1 all translations are stored on arrays
// 	5.2 select the correct array
//  5.3 loop throu array
//  5.4 build the table and print all the translations
// 6 the section slides up from the bottom


// when the close category is closed then:
//  1 hide category section
//  2 empty section
//  3 expand navigation list
//  4 hide close button and show the rest of categories
//  5 remove the bold style from the previous opened section

// EMOJIS FROM: https://www.fileformat.info/info/emoji/browsertest.htm

/***************************************
UI Elements and controllers
***************************************/
var hdr = document.querySelector('.header');
var title = document.querySelector('h1');
var cat = document.getElementById('navigation');
var backToMenuBtn = document.querySelector('.back-to-menu');
var translationContainer = document.querySelector('.translations');
var catTitle = document.querySelector('#cat-title');
var categoryTitleTxt = document.querySelector('.title-name');
var catContent = document.querySelector('#cat-content');
var catDataTable = document.querySelector('.cat-data');



/***************************************
UI EVENT LISTENERS
***************************************/

// Navigation event listeners
cat.addEventListener('click', function(el){
	var catName = el.target.hash;
	var catNameStr = el.target.innerText;
	// remove h1 title
	animateCSS('h1', 'bounceOutUp');
	// remove menu
	animateCSS('#navigation', 'bounceOutDown', function(){
		hdr.style.display = 'none';
		translationContainer.style.display = 'block';				
		// call trasnlation container and pass category array name by removing the # from the string and call it as variable. cool!
		showCategory(window[catName.replace('#','')], catNameStr);
		window.scrollTo(0, 0);
	});
});

// back to menu btn
backToMenuBtn.addEventListener('click', function(e){
	e.preventDefault();
	// 1 hide cat title and content
	animateCSS('#cat-title', 'bounceOutUp');
	animateCSS('#cat-content', 'bounceOutDown', function(){
		translationContainer.style.display = 'none';
		hdr.style.display = 'block';
		animateCSS('h1', 'bounceInDown');
		animateCSS('#navigation', 'bounceInUp');
	});
	// lets clear the translations table so is empty when it goes to a new category
	catDataTable.innerHTML = '';
})



/***************************************
CALL BACK FUNCTIONS
***************************************/
// animate css add remove animations
function animateCSS(element, animationName, callback) {
	const node = document.querySelector(element)
	node.classList.add('animated', animationName)

	function handleAnimationEnd() {
		node.classList.remove('animated', animationName)
		node.removeEventListener('animationend', handleAnimationEnd)

		if (typeof callback === 'function') callback()
	}

	node.addEventListener('animationend', handleAnimationEnd)
}

function showCategory(arr,catName){		
	// bring container up
	animateCSS('#cat-title', 'bounceInDown');
	animateCSS('#cat-content', 'bounceInUp');

	// populate category title
	categoryTitleTxt.innerText = catName;

	// loop through array and create rows
	for (var i = 0; i < arr.length; i++) {
		var tableTr = document.createElement('tr');
		var wordTd = document.createElement('td');
		var jpTd = document.createElement('td');
		var jpChar = document.createElement('span');
		var emojiTd = document.createElement('td');
		var emojiSpan = document.createElement('span');	

		// add clases
		jpChar.classList.add('jp');
		// for colors we will use a simple colored circle instead of emoji
		if (catName == 'Colores') {
			emojiSpan.classList.add('emoji', 'emoji-circle', arr[i][0]); //color name	
		} else {
			emojiSpan.classList.add('emoji');
		}

		var word = document.createTextNode(arr[i][0]);
		var romanji = document.createTextNode(arr[i][1]);
		var hiragana = document.createTextNode(arr[i][2]);

		if (catName !== 'Frases'){		
				var emoji = document.createTextNode(arr[i][3]);
		
				// spanish word and add to td then to row
				wordTd.appendChild(word);
				tableTr.appendChild(wordTd);
				// romanji word then add it to td, then hiragana added to span then span to td then td to tr
				jpTd.appendChild(romanji);
				jpChar.appendChild(hiragana);
				jpTd.appendChild(jpChar);
				tableTr.appendChild(jpTd);
		
				// emoji td
				emojiSpan.appendChild(emoji);
				emojiTd.appendChild(emojiSpan);
				tableTr.appendChild(emojiTd);		
		} else {
			var regSpan = document.createElement('span');
			regSpan.appendChild(word);
			wordTd.appendChild(regSpan);
			wordTd.appendChild(romanji);
			jpChar.appendChild(hiragana);			
			wordTd.appendChild(jpChar);
			tableTr.appendChild(wordTd);
		}

		
		catDataTable.appendChild(tableTr);
	}
}

