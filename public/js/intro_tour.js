jtour = function(){
  var tlength = -1;
  var currentStep = -1;
  var introJstep ;
  function iniTour(length){
    tlength = length ; 
  }

  function _step(flag){
    if(flag == 1){
      currentStep++;
    }
    else if(flag == 0){
      currentStep = 0 ;
    }
    else if(flag == -1){
      currentStep-- ;
    }
    return currentStep ; 
  }

  function ini_Steps(introstep){
    introJstep = introstep;
  }

  function curr_Step(){
    return currentStep ;
  }

  function _nextStep(){
    _step(1);
    if(currentStep >= tlength){
      _exitIntro();
    }
    else{
      var nextStep = introJstep[currentStep];
      console.log(nextStep);
      _showElement(nextStep);
    }
  }

   function _prevStep(){
    _step(-1);
    if(currentStep == 0){
      _exitIntro();
    }
    else{
      var nextStep = introJstep[currentStep];
      _showElement(nextStep);
    }
  }


  function _showElement(nextStep){
    var  oldHelperLayer = document.querySelector('.introjs-helperLayer'),
         elementPosition = _getOffset(document.getElementById(nextStep.element));
         console.log(elementPosition);

     if (oldHelperLayer != null) {
      var oldtooltipLayer      = oldHelperLayer.querySelector('.introjs-tooltiptext'),
          oldArrowLayer        = oldHelperLayer.querySelector('.introjs-arrow'),
          oldtooltipContainer  = oldHelperLayer.querySelector('.introjs-tooltip'),
          skipTooltipButton    = oldHelperLayer.querySelector('.introjs-skipbutton'),
          prevTooltipButton    = oldHelperLayer.querySelector('.introjs-prevbutton'),
          nextTooltipButton    = oldHelperLayer.querySelector('.introjs-nextbutton');

      //hide the tooltip
      oldtooltipContainer.style.opacity = 0;
      _setHelperLayerPosition(oldHelperLayer, nextStep.element);

      var oldShowElement = document.querySelector('.introjs-showElement');
      oldShowElement.className = oldShowElement.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
      //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation
     setTimeout(function() { 
        //set current tooltip text
        oldtooltipLayer.innerHTML = nextStep.intro;
        //set the tooltip position
        _placeTooltip(document.getElementById(nextStep.element), oldtooltipContainer, oldArrowLayer,nextStep);
        //show the tooltip
        oldtooltipContainer.style.opacity = 1;
    }, 350);
     //  window.clearTimeout(timerId);
    }
    if (currentStep == 0 && tlength > 1) {
      prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-disabled';
      nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      skipTooltipButton.innerHTML = this._options.skipLabel;
    } else if (tlength - 1 == currentStep || tlength == 1) {
      skipTooltipButton.innerHTML = 'Done';
      prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-disabled';
    } else {
      prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      skipTooltipButton.innerHTML = 'Skip';
    }
    document.getElementById(nextStep.element).className += ' introjs-showElement introjs-relativePosition';
  }
  
  function _setHelperLayerPosition(helperLayer,eid) {
    if (helperLayer) {
      //prevent error when `this._currentStep` in undefined
      if (!document.getElementById(eid)) return;

      var currentElement  = document.getElementById(eid),
          elementPosition = _getOffset(currentElement),
          widthHeightPadding = 10;

      //set new position to helper layer
      helperLayer.setAttribute('style', 'width: ' + (elementPosition.width  + widthHeightPadding)  + 'px; ' +
                                        'height:' + (elementPosition.height + widthHeightPadding)  + 'px; ' +
                                        'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                        'left: '  + (elementPosition.left   - 5)   + 'px;');

      if (tlength - 1 == currentStep){
        helperLayer.setAttribute('style', 'width: ' + (elementPosition.width  + widthHeightPadding)  + 'px; ' +
                                        'height:' + (elementPosition.height + widthHeightPadding)  + 'px; ' +
                                        'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                        'left: '  + (elementPosition.left   - 5)   + 'px;'+
                                        'background-color: inherit;');
      }
    }
  }

function _placeTooltip(targetElement, tooltipLayer, arrowLayer,nextStep) {
    var tooltipCssClass = '',
        currentStepObj,
        tooltipOffset,
        targetElementOffset;

    //reset the old style
    tooltipLayer.style.top        = null;
    tooltipLayer.style.right      = null;
    tooltipLayer.style.bottom     = null;
    tooltipLayer.style.left       = null;
    tooltipLayer.style.marginLeft = null;
    tooltipLayer.style.marginTop  = null;

    arrowLayer.style.display = 'inherit';

    //prevent error when `this._currentStep` is undefined
    if (!nextStep) return;

    //if we have a custom css class for each step
    currentStepObj = nextStep;
    if (typeof (currentStepObj.tooltipClass) === 'string') {
      tooltipCssClass = currentStepObj.tooltipClass;
    } else {
      tooltipCssClass = '';
    }

    tooltipLayer.className = ('introjs-tooltip ' + tooltipCssClass).replace(/^\s+|\s+$/g, '');

    //custom css class for tooltip boxes
    var tooltipCssClass = '';

    currentTooltipPosition = nextStep.position;
    var targetElement = document.getElementById(nextStep.element);
    switch (currentTooltipPosition) {
      case 'top':
        tooltipLayer.style.left = '15px';
        tooltipLayer.style.top = '-' + (_getOffset(tooltipLayer).height + 10) + 'px';
        arrowLayer.className = 'introjs-arrow bottom';
        break;
      case 'right':
        tooltipLayer.style.left = (_getOffset(targetElement).width + 20) + 'px';
        arrowLayer.className = 'introjs-arrow left';
        break;
      case 'left':
        tooltipLayer.style.right = (_getOffset(targetElement).width + 20) + 'px';
        arrowLayer.className = 'introjs-arrow right';
        break;
      case 'floating':
        arrowLayer.style.display = 'none';

        //we have to adjust the top and left of layer manually for intro items without element
        tooltipOffset = _getOffset(tooltipLayer);

        tooltipLayer.style.left   = '50%';
        tooltipLayer.style.top    = '50%';
        tooltipLayer.style.marginLeft = '-' + (tooltipOffset.width / 2)  + 'px';
        tooltipLayer.style.marginTop  = '-' + (tooltipOffset.height / 2) + 'px';


        break;
      case 'bottom-right-aligned':
        arrowLayer.className      = 'introjs-arrow top-right';
        tooltipLayer.style.right  = '0px';
        tooltipLayer.style.bottom = '-' + (_getOffset(tooltipLayer).height + 10) + 'px';
        break;
      case 'bottom-middle-aligned':
        targetElementOffset = _getOffset(targetElement);
        tooltipOffset       = _getOffset(tooltipLayer);

        arrowLayer.className      = 'introjs-arrow top-middle';
        tooltipLayer.style.left   = (targetElementOffset.width / 2 - tooltipOffset.width / 2) + 'px';
        tooltipLayer.style.bottom = '-' + (tooltipOffset.height + 10) + 'px';
        break;
      case 'bottom-left-aligned':
      // Bottom-left-aligned is the same as the default bottom
      case 'bottom':
      // Bottom going to follow the default behavior
      default:
        tooltipLayer.style.bottom = '-' + (_getOffset(tooltipLayer).height + 10) + 'px';
        arrowLayer.className = 'introjs-arrow top';
        break;
    }
  }


 function _getOffset(element) {
    var elementPosition = {};

    //set width
    elementPosition.width = element.offsetWidth;

    //set height
    elementPosition.height = element.offsetHeight;

    //calculate element top and left
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft;
      _y += element.offsetTop;
      element = element.offsetParent;
    }
    //set top
    elementPosition.top = _y;
    //set left
    elementPosition.left = _x;

    return elementPosition;
  }

function _exitIntro() {
  var overlayLayer = document.getElementById("introjs_head").querySelector('.introjs-overlay');

                //return if intro already completed or skipped
                if (overlayLayer == null) {
                  return;
                }

                //for fade-out animation
                overlayLayer.style.opacity = 0;
                setTimeout(function () {
                  if (overlayLayer.parentNode) {
                    overlayLayer.parentNode.removeChild(overlayLayer);
                  }
                }, 500);

                //remove all helper layers
                var helperLayer = document.getElementById("introjs_head").querySelector('.introjs-helperLayer');
                if (helperLayer) {
                  helperLayer.parentNode.removeChild(helperLayer);
                }

                //remove `introjs-showElement` class from the element
                var showElement = document.querySelector('.introjs-showElement');
                if (showElement) {
                  showElement.className = showElement.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''); // This is a manual trim.
                }
    //set the step to -1
   currentStep = -1;
  }
  return {
    _nextStep :_nextStep,
    _setHelperLayerPosition : _setHelperLayerPosition,
    _getOffset : _getOffset,
    _exitIntro : _exitIntro,
    _placeTooltip : _placeTooltip,
    _showElement : _showElement,
    ini_Steps : ini_Steps,
    _step : _step,
    iniTour : iniTour,
    _prevStep : _prevStep,
    curr_Step : curr_Step
  }
}(); 