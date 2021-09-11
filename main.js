$(document).ready(function () {

    let todoList = {

        render: function () {

            this.show(); 
            this.addItem();
            this.clickItem();
            this.removeItem();

        },

        show: function () {
            if (localStorage.key('todo')) {
                let list = localStorage.getItem('todo');
                list = JSON.parse(list);
                list.forEach(element => {
                    if (element.status === 1) {
                        $(".list-group").append('<li class="list-group-item">' + element.content + '<span class="close">×</span></li>');
                    } else {
                        $(".list-group").append('<li class="list-group-item item-done">' + element.content + '<span class="close">×</span></li>');
                    }

                });
            }
        },
        change: function () {

            if ($('#exampleInput').val() !== '') {

                $(".list-group").append('<li class="list-group-item">' + $('#exampleInput').val() + '<span class="close">×</span></li>');
                $('#exampleInput').val('');
                this.changeLocalStorageItem();
            } else {
                $('#error').show().delay(2000).fadeOut('slow');
            }

        },
        changeLocalStorageItem: function () {
            tasks = [];
            $(".list-group-item").each(function (index) {
                if ($(this).hasClass('item-done')) {
                    tasks.push({
                        content: $(this)[0].firstChild.nodeValue,
                        status: 0
                    });
                } else {
                    tasks.push({
                        content: $(this)[0].firstChild.nodeValue,
                        status: 1
                    });
                }
            });
            localStorage.removeItem('todo');
            localStorage.setItem('todo', JSON.stringify(tasks));

        },
        clickItem: function () {
            let thisObj = this;
            $('ul.list-group').on('click', 'li', function (e) {
                let target = $(event.target);
                if (target.is("span")) {
                    $(this).remove();
                } else {
                    $(this).toggleClass('item-done');
                }
                thisObj.changeLocalStorageItem();

            })
        },
        addItem: function () {
            let thisObj = this;
            $("#adding").click(function () {
                let b = 100;
                thisObj.change();
            });

            $('#exampleInput').keypress(function (event) {

                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    event.preventDefault();
                    thisObj.change();

                }
            });

        },

        removeItem: function () {
            $("#removing").click(function () {
                $(".list-group").empty();
                localStorage.removeItem('todo');
            });

        }

    }
    todoList.render();

});