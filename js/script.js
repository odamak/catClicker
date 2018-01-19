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
            currentCat = this.cats[0];
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
        updateCounterCurrentCat: function () {
            model.currentCat.clickCount += 1
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
                $("#button" + i).click(function () {
                    octopus.setCurrentCat(i);
                })
            }
        }
    }

    var viewCat = {
        render: function () {
            let currentCat = octopus.getCurrentCat();
            $("#cat-name").text(currentCat.name);
            $("#cat-count").text(currentCat.clickCount);
            $("#cat-img").attr("src",currentCat.photo);
        },

        init: function () {
            let cats = octopus.getCats();
            $("#cat-name").text(cats[0].name);
            $("#cat-count").text(cats[0].clickCount);
            $("#cat-img").attr("src",cats[0].photo);
        }
    };

    octopus.init();

});

