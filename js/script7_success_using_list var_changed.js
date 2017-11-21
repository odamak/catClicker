//define variables
var catSelector;
var catOption;
var catArea;
var catPhotoArea;
var catProps;
var catName;
var catNames = ['Lucy','Suzy','Fatty', 'Dusty', 'Mimi'];
var catPhotosSrc = new Array (5);
var catPhotoSrc;
var catPhoto;
var numberClicks = new Array (5);
var numberClick;

// creating a function "insert after" which will be used later
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//function to remove
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

//initializing numberClicks to 0
for (var i = 0; i< 5; i++){
    numberClicks[i] = 0;
}

//initializing catPhotos
for (var i=0; i<5; i++){
    j = i+1;
    catPhotosSrc[i]='images/cat'+j+'.jpg';
}

//creating the cat selector
catSelector = document.createElement('div');
catSelector.setAttribute('id','catSelector')
//document.body.appendChild(catSelector);
insertAfter(document.getElementById('startDiv'), catSelector);

for (var i = 0; i < catNames.length; i++) {

    // This is the cats we're on...
    catName = catNames[i];

    // We're creating option in selector for each cat
    catOption = document.createElement('div');
    catOption.setAttribute('id','catOption'+i);
    catOption.textContent = catName;

    catSelector.appendChild(catOption);
}

//creating catArea (place where to display props of selected cat)
catArea = document.createElement('div');
catArea.setAttribute('id','catArea');
insertAfter(catSelector, catArea);
//document.body.insertBefore(catArea, document.getElementById('endDiv'));

//initializing catArea with first cat on the list
catPhotoArea = document.createElement('div');
catPhotoArea.setAttribute('id','catPhotoArea');
catArea.appendChild(catPhotoArea);

catPhoto = document.createElement('img');
//catPhoto.setAttribute('src','images/init.png');
catPhotoArea.appendChild(catPhoto);


catProps = document.createElement('div');
catProps.setAttribute('id','catProps');
//catProps.textContent = catNames[0] + ' '+ numberClicks[0] + '!!!'
catProps.textContent = 'Please click on a name'
catArea.appendChild(catProps);


console.log("numberClick before first loop " + numberClick )

// Let's loop over the cats in our array
for (var i = 0; i < catNames.length; i++) {

    catPhotoSrc = catPhotosSrc[i];
    catName = catNames[i];
    numberClick = numberClicks[i];
    catOption = document.getElementById('catOption'+i);

    //and when we click, create a div for `cat`
    catOption.addEventListener('click', (function(iCopy, catPhotoSrcCopy, catNameCopy, numberClickCopy) {
        return function() {

            document.getElementById('catPhotoArea').remove();


            catPhotoArea = document.createElement('div');
            catPhotoArea.setAttribute('id','catPhotoArea');
            catArea.appendChild(catPhotoArea);

            catPhoto = document.createElement('img');
            catPhoto.setAttribute('src',catPhotoSrcCopy);
            catPhotoArea.appendChild(catPhoto);

            document.getElementById('catProps').remove();
            catProps = document.createElement('div');
            catProps.setAttribute('id','catProps');
            catProps.textContent = catNameCopy + ' '+ numberClickCopy;
            catArea.appendChild(catProps);

            catPhoto.addEventListener('click', (function(){
                return function(){
                    document.getElementById('catProps').remove();

                    catProps = document.createElement('div');
                    catProps.setAttribute('id','catProps');
                    numberClickCopy++;
                    catProps.textContent = catNameCopy + ' '+ numberClickCopy;
                    catArea.appendChild(catProps);
                }

            })());

        };
    })(i, catPhotoSrc, catName, numberClick));

    console.log("end iteration " +i);

};