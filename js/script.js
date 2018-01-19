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
                currentCat = this.cats[0];
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
            //get the new selected cat and update value of currentCat
            let selectedCat = model.cats[catIndex];
            model.currentCat = selectedCat;
            //rerender the viewCat section of page using new value of currentCat
            viewCat.render();
            //return the new value of currentCat
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
        init: function() {
            let cats = octopus.getCats();
            for (let i=0; i< NUMBER_CATS; i++){
                let $button = `<button id='button${i}'>${cats[i].name}</button>`;
                $button.appendTo($("#catButtons"));
            }
        },
        render: function(idNumber) {
            $("#button"+idNumber).click(function(){
                octopus.setCurrentCat(idNumber);
            })
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

