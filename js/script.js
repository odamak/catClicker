const NUMBER_CATS = 5;

$(function(){

    var model = {
        cats : [],
        init: function() {
                for (let i = 0; i<NUMBER_CATS; i++){
                    let elem = new Object()
                    elem.name = 'cat'+i;
                    elem.clickCount = 0;
                    elem.photo = 'pictures/cat_picture'+i+'.jpg';
                    console.log("elem"+i+" "+elem.name+elem.clickCount);
                    this.cats.push(elem);
                }
                return this.cats;
        }
    };


    var octopus = {
        init: function() {
            model.init();
            viewButton.init();
            viewCat.init();
        },
        getCounter: function(numberCat) {
            console.log ("model.cats[numberCat] "+model.cats[numberCat])
            return model.cats[numberCat].clickCount;
        },
        updateCounter: function(numberCat) {
            model.cats[numberCat].clickCount += 1
            return (model.cats[numberCat].clickCount);
        }
    };

    var viewButton = {
        displayButtons : function() {
            for (let i=0; i< NUMBER_CATS; i++){
                let str = '<button id=\'button'+i+'\'>cat '+i+'</button>';
                let $input = $(str);
                $input.appendTo($("#catlist"));
            }
        },
        bindButtonToCat: function(idNumber) {
	        $("#button"+idNumber).click(function(){
		        viewCat.hideAllCats();
		        $("#cat"+idNumber).show();
	        })
        },
        init: function() {
            this.displayButtons();
            for (var i=0; i< NUMBER_CATS; i++){
	        this.bindButtonToCat(i);
            }
        }
    }

    var viewCat = {
        cats : $(".cat"),
        hideAllCats: function() {
            for (var i=0; i<NUMBER_CATS; i++){
		    $(this.cats[i]).hide();
	        }
        },
        //debug to find problem
        bindCounterToCat: function (idNumber){
            let catId = 'cat' + idNumber;
            $('#' + catId + ' > span').value(octopus.getCounter(idNumber));
        },
        init: function() {
                this.renderCats();
                for (var i=0; i<NUMBER_CATS; i++){
	            this.bindCounterToCat(i);
                }
                this.hideAllCats();
                $("#cat1").show();       
        },
        renderCats: function(){
            for (let i=NUMBER_CATS-1; i>=0; i-- ){
                let str = `<div class="cat" id="cat`+ i + `" >
                <span class="counter">${octopus.getCounter(i)} clicks</span>`;
                $('#catlist').after(str);
                let catIdIdentifier= '#cat'+i;
                let identifier = catIdIdentifier+" "+"span";
                $(identifier).after("<br>");
                console.log("identifier.next() is ="+($(identifier).next()));
                $(identifier).next().after(`<img class="clicker" src="pictures/cat_picture${i}.jpeg">
                </div>`);
            }
        }
    };

    octopus.init();
});