

function loadData(url) {
    var loadData = {
        createMenuItemHtml: function (menu) {
            if (menu.hasSub && menu.children) {
                var html = '<li><a><i class="'+menu.logo+'"></i><span class="title">'+menu.title+'</span></a><ul>';
                for (let i=0; i<menu.children.length; i++) {
                    html += this.createMenuItemHtml(menu.children[i]);
                }
                html += '</ul></li>';
                return html;
            } else {
                return '<li><a href="#'+menu.title+'" class="smooth"><i class="'+menu.logo+'"></i><span className="title">'+menu.title+'</span></a></li>';
            }
        },
        createBodyItemHtml: function (menu) {
            if (menu.hasSub) {
                var html = '';
                for (let subIndex in menu.children) {
                    let subMenu = menu.children[subIndex];
                    html += this.createBodyItemHtml(subMenu);
                }
                return html;
            } else {
                let header = '<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="'+menu.title+'"></i>'+menu.title+'</h4>';
                let body = $.map(menu.children, function (item) {
                    return '<div class="col-sm-3"><div class="xe-widget xe-conversations box2 label-info" onclick="window.open(\''+item.link+'\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="'+item.link+'"><div class="xe-comment-entry"><a class="xe-user-img"><img data-src="'+item.logo+'" class="lozad img-circle" width="40"></a><div class="xe-comment"><a href="#" class="xe-user-name overflowClip_1"><strong>'+item.title+'</strong></a><p class="overflowClip_2">'+item.desc+'</p></div></div></div></div>';
                });
                return header + '<div class="row">' + body.join('') + '</div><br>';
            }
        },
        render: function (url) {
            var data = [];
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON',
                async: false,
                success: function (res) {
                    data = res;
                }
            });
            this.clean();

            console.log(data);
            var menuHtml = '';
            let menu;
            for (let index in data) {
                menu = data[index];
                menuHtml += loadData.createMenuItemHtml(menu);
            }
            $("#main-menu").html(menuHtml)
            $("#main-menu li:first").addClass("active")

            let itemHtml = '';
            for (let index in data) {
                menu = data[index];
                if (menu.children) {
                    itemHtml += loadData.createBodyItemHtml(menu);
                }
            }
            $("#main-content-item").html(itemHtml);
        },
        clean: function () {
            $("#main-menu").html('');
            $("#main-content-item").html('');
        }
    }

    loadData.render(url);
}

