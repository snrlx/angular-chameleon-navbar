function SelectorManager(){
	function buildSelector(selector, styles){
		var transitionCSS = '-webkit-transition: background-color .5s linear;transition: background-color .5s linear;';
		return '.navbar[chameleon] '+selector+'{'+transitionCSS+styles+'}';
	}

	var backgroundColor = 'background-color:$1;';
	var color = 'color:$2;';

	var selectors = [
	'',
	'.navbar-brand',
	'.dropdown-menu',
	'.dropdown-menu>li>a',
	'.dropdown-header',
	'.navbar-nav>li>a',
	'.navbar-nav>.active>a',
	'.navbar-nav>.active>a:hover', 
	'.navbar-nav>.active>a:focus'
	];

	var cssRules = [
	buildSelector(selectors[0], backgroundColor),
	buildSelector(selectors[1], color),
	buildSelector(selectors[2], backgroundColor),
	buildSelector(selectors[3], color),
	buildSelector(selectors[4], color),
	buildSelector(selectors[5], color),
	buildSelector(selectors[6], backgroundColor+color),
	buildSelector(selectors[7], backgroundColor+color), 
	buildSelector(selectors[8], backgroundColor+color)
	];

	var onlyTransitions = [
	buildSelector(selectors[0]),
	buildSelector(selectors[1]),
	buildSelector(selectors[2]),
	buildSelector(selectors[3]),
	buildSelector(selectors[4]),
	buildSelector(selectors[5]),
	buildSelector(selectors[6]),
	buildSelector(selectors[7]),
	buildSelector(selectors[8]) 
	];


	function replaceColors(string, firstColor, secondColor){
		return string.replace(/\$1/, firstColor).replace(/\$2/, secondColor);
	}

	this.createStyleString = function(mainColor){
		var styleString = "";
		if(angular.isDefined(mainColor)){
			cssRules.forEach(function(rule){
				styleString += replaceColors(rule, mainColor, mainColor)+'\r\n';
			});
		}else{
			onlyTransitions.forEach(function(rule){
				styleString += rule + '\r\n';
			});
		}

		return styleString;
	};
}

var selectorManager = new SelectorManager();

function updateStyle($window, mainColor){
	var styleString = '<style id=\"chameleon-style\">'+selectorManager.createStyleString(mainColor)+'</style>';

	var styleElement = angular.element($window.document.getElementById('chameleon-style'));
	if(styleElement){
		styleElement.remove();
	}
	var head = angular.element($window.document.getElementsByTagName('head')[0]);
	head.append(styleString);
}




angular.module('sxChameleon', [])

.directive('chameleon', function($window, $document) {
	function link(scope, element, attrs) {
		var chameleonValues = JSON.parse(attrs.chameleon);

		if(!angular.isArray(chameleonValues)){
			throw new Error("Chameleon Navbar expects an Array as input.");
		}

		angular.element($window).bind("scroll", function(e) {
			var offsetFromTop = $window.pageYOffset;
			var newBackgroundColor;
			chameleonValues.forEach(function(chameleonValue){
				if(offsetFromTop > chameleonValue.top){
					newBackgroundColor = chameleonValue.color;
				}
			});

			if(angular.isDefined(newBackgroundColor)){
				updateStyle($window, newBackgroundColor);
			}else{
				updateStyle($window);
			}
		});
	}
	return {
		restrict: 'A',
		link: link
	};
});

