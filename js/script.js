$(function () {
    const NUMBER_CATS = 5;

    var model = {
        cats: [],
        currentCat: null,
        adminMode: false,
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
            ViewAdmin.init();
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
            if (octopus.isAdminVisible()) ViewAdmin.render();
            return (model.currentCat.clickCount);
        },
        updateCurrentCatWithNewValuesAndSaveAndRender: function(name, click, url) {
            model.currentCat.name = name;
            model.currentCat.clickCount = click;
            model.currentCat.photo = url;
            let index = model.currentCat[index];
            //update cat in array and rerender view
            octopus.setCurrentCat(index);

        },
        getCats: function () {
            return (model.cats)
        },
        isAdminVisible: function() {
            return (model.adminMode);
        },
        setAdminVisible: function () {
            model.adminMode = true;
        },
        renderAdminForm: function () {
            ViewAdmin.render();
        },
        hideAdmin: function() {
            model.adminMode = false;
            viewAdmin.hideForm();
        },
        testFunction: function() {
            console.log("test call from admin to octopus");
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

    var ViewAdmin = {
        init: function () {
            this.adminDiv = $("#admin");
            this.adminButton = $('#adminButton');
            this.adminButton.on( "click", function() {
                console.log(octopus.isAdminVisible);
                if (!octopus.isAdminVisible()) {
                    console.log("admin button click");
                    octopus.renderAdminForm();
                }
            });


        },
        render: function() {
            let currentCat = octopus.getCurrentCat();
            let nameCat = currentCat.name;
            let imgUrl = currentCat.photo;
            let clicks = currentCat.clickCount;
            let form = 
            `<form id="adminFormInserted">
            Name: <input id="getCatName" type="text" name="name" value="${nameCat}">
            <br>
            Img URL: <input id="getCatUrl" type="text" name="imgUrl" value="${imgUrl}">
            <br>
            #clicks: <input id="getCatClicks" type="text" name="clicks" value="${clicks}">
            <br>
            <button id="saveButton">Save</button>
            <button id="cancelButton">Cancel</button>
            </form>`
            if (octopus.isAdminVisible()) octopus.hideAdmin();
            octopus.setAdminVisible();
            $(form).appendTo($("#adminForm"))
            let saveButton = $('#saveButton');
            let cancelButton = $('#cancelButton');
            //get value of form
            let getCatName = $("#getCatName").val();
            let getCatUrl = $("#getCatUrl").val();
            let getCatClicks = $("#getCatClicks").val();
            saveButton.off().on("click", function(){
                octopus.updateCurrentCatWithNewValuesAndSaveAndRender(getCatName,getCatClicks,getCatUrl);
            });
            cancelButton.off().on("click", function(){
                octopus.hideAdmin();
            })


        },
        hideForm: function(){
            let formInserted = $("#adminFormInserted");
            formInserted.remove();
        }
    }

    octopus.init();

});

