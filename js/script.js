$(function () {
    const NUMBER_CATS = 5;

    var model = {
        cats: [],
        currentCat: null,
        init: function () {
            for (let i = 0; i < NUMBER_CATS; i++) {
                let elem = new Object()
                elem.index = i;
                elem.name = 'cat' + i;
                elem.clickCount = 0;
                elem.photo = 'pictures/cat_picture' + i + '.jpeg';
                this.cats.push(elem);
            }
            this.currentCat = this.cats[0];
            return this.cats;
        }
    };

    var octopus = {
        init: function () {
            model.init();
            viewButton.init();
            viewCat.init();
        },
        getCurrentCat: function () {
            return model.currentCat;
        },
        setCurrentCat: function (catIndex) {
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
        updateCounterCurrentCatAndRender: function () {
            model.currentCat.clickCount += 1;
            viewCat.render();
            return (model.currentCat.clickCount);
        },
        getCats: function () {
            return (model.cats)
        }
    };

    var viewButton = {
        init: function () {
            let cats = octopus.getCats();
            for (let i = 0; i < NUMBER_CATS; i++) {
                let buttonHtml = `<button id='button${i}'>${cats[i].name}</button>`;
                $(buttonHtml).appendTo($("#catButtons"));
                //use of closure here, although while testing, I found out not necessary
                //it's just cleaner
                $("#button" + i).on( "click", (function(iCopy) {
                    return function() {
                        octopus.setCurrentCat(iCopy);
                    };
                })(i));
                
            }
        }
    }

    var viewCat = {
        catName: null,
        catCount: null,
        catImage: null, 
        render: function () {
            let currentCat = octopus.getCurrentCat();
            this.catName.text(currentCat.name);
            this.catCount.text(`${currentCat.clickCount} clicks`);
            this.catImage.attr("src",currentCat.photo);
            this.catImage.off().on( "click", function() {
                    octopus.updateCounterCurrentCatAndRender();
                });
        },

        init: function () {
            let cats = octopus.getCats();
            let currentCat = octopus.getCurrentCat();
            this.catName = $("#cat-name");
            this.catCount = $("#cat-count")
            this.catImage = $("#cat-img")
            this.render();
        }
    };

    octopus.init();

});

