//declaring divs and the selector
var catSelectorDiv; //div of selector
var selectBoxCat; //selector
var catOption; //selected element
var catArea;
var catInstructionArea;
var catPhotoArea;
var catPhoto;
var catProps;

//declaring tables and element of tables
var catNames = ['Lucy','Suzy','Fatty', 'Dusty', 'Mimi'];
var catName;
var catNamesIndex = new Array (5);
var numberClicks = new Array (5);
var numberClick;
var catPhotosSrc = new Array(5);
var catPhotoSrc;

//variable to know if function get called first time
var firstCall = true;

//variable to save number of click of image in case user don't make a choice
//and simply use the first selected cat (without selecting)
var numberClicksFirstCat = 0;



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

//initializing catNamesIndex to retrieve index from name
for (var i=0; i< catNames.length; i++){
    var j = catNames[i];
    catNamesIndex[j]=i;
}


//creating the cat selector div
catSelectorDiv = document.createElement('div');
catSelectorDiv.setAttribute('id','catSelector')
insertAfter(document.getElementById('startDiv'), catSelectorDiv);


//creating the cat selector itself
selectBoxCat = document.createElement('select');
selectBoxCat.setAttribute('id','selectBoxCat');
catSelectorDiv.appendChild(selectBoxCat);

//creating the cat options for the cat selector
for (var i=0; i< catNames.length; i++){
    selectBoxCat.options[i] = new Option(catNames[i], catNames[i]);
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

//creating catArea (place where to display props of selected cat)
catArea = document.createElement('div');
catArea.setAttribute('id','catArea');
insertAfter(catSelectorDiv, catArea);

//creating catInstructionArea
catInstructionArea = document.createElement('div');
catInstructionArea.setAttribute('id','catInstructionArea');
//catProps.textContent = catNames[0] + ' '+ numberClicks[0] + '!!!'
catInstructionArea.textContent = 'Please select a name and then click on the photo'
catArea.appendChild(catInstructionArea);

//initializing catArea with first cat on the list
catPhotoArea = document.createElement('div');
catPhotoArea.setAttribute('id','catPhotoArea');
catArea.appendChild(catPhotoArea);

catPhoto = document.createElement('img');
catPhoto.setAttribute('src',catPhotosSrc[0]);
catPhotoArea.appendChild(catPhoto);

catProps = document.createElement('div');
catProps.setAttribute('id','catProps');
catProps.textContent = catNames[0] + ' '+ numberClicks[0];
catArea.appendChild(catProps);

catName = catNames[0];
numberClick = numberClicks[0];

//defining action in case user start clicking on photo without changing cat
catPhoto.addEventListener('click', (function(){
        return function(){
            document.getElementById('catProps').remove();

            catProps = document.createElement('div');
            catProps.setAttribute('id','catProps');
            numberClick++;
            numberClicksFirstCat= numberClick;
            catProps.textContent = catName + ' '+ numberClick;
            catArea.appendChild(catProps);
        }

    })());



//toggleSelect executed when user click option
function toggleSelect(catOption){

    //init variables of selected cat
    var i = catNamesIndex[catOption]
    numberClick = numberClicks[i];

    //save the numberOfClicks clicked without choosing an option
    if (firstCall) {
        numberClicks[0] = numberClicksFirstCat;
        firstCall = false;
        if (i==0) {
            numberClick = numberClicksFirstCat;
        }
        else {
            numberClick = numberClicks[i];
        }
    }

    catPhotoSrc = catPhotosSrc[i];
    catName = catOption; //or catName = catNames[i];


    console.log("i value ",i);

    //setting catPhotoArea with image of selected cat
    document.getElementById('catPhotoArea').remove();
    catPhotoArea = document.createElement('div');
    catPhotoArea.setAttribute('id','catPhotoArea');
    catArea.appendChild(catPhotoArea);

    catPhoto = document.createElement('img');
    catPhoto.setAttribute('src',catPhotoSrc);
    catPhotoArea.appendChild(catPhoto);

    document.getElementById('catProps').remove();
    catProps = document.createElement('div');
    catProps.setAttribute('id','catProps');
    catProps.textContent = catName + ' '+ numberClick;
    catArea.appendChild(catProps);

    catPhoto.addEventListener('click', (function(){
        return function(){
            document.getElementById('catProps').remove();

            catProps = document.createElement('div');
            catProps.setAttribute('id','catProps');
            numberClick++;
            numberClicks[i]= numberClick;
            catProps.textContent = catName + ' '+ numberClick;
            catArea.appendChild(catProps);
        }

    })());

};



//main program where onclick function will get called
    selectBoxCat.onclick = function(){
        toggleSelect(this.options[this.selectedIndex].text);
        //the argument passed to toggleSelect will be substituted
        //with the variable "catOption" on the definition of toggleSelect above
        //to simplify
    };