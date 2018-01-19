$(function(){
    const NUMBER_CATS = 5;

    var model = {
        cats : [],
        currentCat: null,
        init: function() {
                for (let i = 0; i<NUMBER_CATS; i++){
                    let elem = new Object()
                    elem.index = i;
                    elem.name = 'cat'+i;
                    elem.clickCount = 0;
                    elem.photo = 'pictures/cat_picture'+i+'.jpg';
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
        getCurrentCat: function(){
            return model.currentCat;
        },
        setCurrentCat: function(catIndex) {
            //save previous changes made on currentCat
            model.cats[model.currentCat.index] = model.currentCat
            let selectedCat = model.cats[catIndex];
            model.currentCat = selectedCat;
            return selectedCat;
        },
        updateCounterCurrentCat: function() {
            model.currentCat.clickCount += 1
            return (model.currentCat.clickCount);
        },
        getCats: function(){
            return (model.cats)
        }
    };

    var viewButton = {
        displayButtons : function() {
            for (let i=0; i< NUMBER_CATS; i++){
                let str = `<button id='button${i}'>${octopus.getCats[i].name}</button>`;
                let $input = $(str);
                $input.appendTo($("#catlist"));
            }
        },
        bindButtonToCat: function(idNumber) {
            $("#button"+idNumber).click(function(){
                viewCat.renderCat(idNumber);
            })
        },
        bindButtonsToCat: function(){
            for(let i=0; i< NUMBER_CATS; i++)
                this.bindButtonToCat(i);
        },
        init: function() {
            this.displayButtons();
            this.bindButtonsToCat();
        }
    }

    var viewCat = {
        cats : $(".cat"),
        renderCat: function(idNumber) {
            $( ".cat" ).remove();
            let str = `<div class="cat" id="cat`+ idNumber + `" >
            <span class="counter">${octopus.getCounter(idNumber)}</span><span> clicks</span>`;
            $("div").last().after(str);
            let catIdIdentifier= '#cat'+idNumber;
            let identifier = catIdIdentifier+" "+"span:nth-child(2)";
            $(identifier).after("<br>");
            $(identifier).next().after(`<img class="clicker" src="pictures/cat_picture${idNumber}.jpeg">
            </div>`);
            let newCounter = this.clickOnCat(idNumber);          

        },

        clickOnCat: function(idNumber){
            $("img").click(function(){
                // alert("Handler for img called "+idNumber);
                octopus.updateCounter(idNumber);
                let newCounter = octopus.getCounter(idNumber);
                $(".counter").text(newCounter);
                return(newCounter);
            });

        },        
        init: function() {
            this.renderCat(0);       
        }
    };

    octopus.init();
    
});

