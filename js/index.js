$(function () {
    $(window).scroll(function () {
        var $topBar = $("#top-bar");
        var $scrollTop = $(document).scrollTop();
        if ($scrollTop > 0) {
            $topBar.addClass("fixed");
            $(".left").show();
            $(".logo span").addClass("hide");
        } else {
            $topBar.removeClass("fixed");
            $(".left").hide();
            $(".logo span").removeClass("hide");
        }
    });

    /*导航下拉菜单*/
    var timer = null;
    $(".tongren-drop").hover(function () {
        $(".tongren").stop().slideDown().siblings().hide();
    }, function () {
        timer = setTimeout(function () {
            $(".tongren").stop().slideUp();
        }, 200)
    });
    $(".tongren").hover(function () {
        clearTimeout(timer);
        $(this).css("display", "block")
    }, function () {
        $(this).stop().slideUp();
    });

    $(".official-drop").hover(function () {
        $(".qudao").stop().slideDown().siblings().hide();
    }, function () {
        timer = setTimeout(function () {
            $(".qudao").stop().slideUp();
        }, 200)
    });
    $(".qudao").hover(function () {
        clearTimeout(timer);
        $(this).css("display", "block")
    }, function () {
        $(this).stop().slideUp();
    });

    $(".qingming,.shenle,.slogon,.logo").addClass("animate");
    /*.animate一定要放后面*/

    var yuhun = function () {
        /*御魂副本下面的文字随星期变化*/
        var oData = new Date();
        var oDay = oData.getDay() - 1;
        oDay < 0 && (oDay = 6);
        var $con = $(".yuhun-data span").eq(oDay).html();
        $(".curData").html($con);
        /*御魂副本*/
        var $launch = $(".launch");
        $(".icon7").hover(function () {
            $launch.stop().slideDown();
        }, function () {
            $launch.stop().slideUp();
        });
    };
    yuhun();

    /*折叠下载栏*/
    $(".close-download").click(function () {
        $("#download-wrap").addClass("fold").children(".download-box").hide().siblings().show()
    });
    $(".fold-box").click(function () {
        $("#download-wrap").removeClass("fold").children(".download-box").show().siblings().hide()
    });

    $(".news-tabs li").mouseover(function () {
        $(this).children("em").addClass("active")
            .parent().siblings().children("em").removeClass("active");
        var index = $(this).index();
        $(".news-list-wrap").stop().animate({"left": index * -500}, 500)
    });
    /*平安之旅-式神*/
    var shishen = function () {
        var str = "";
        var iNow = 0;
        var $next = $(".next");
        var $prev = $(".prev");
        /*初始化*/
        create(data);
        $(".shishen-list").html(str).css("width", 138 * data.length);
        hover();
        iNow === 0 && $prev.hide();
        /*点击选项卡*/
        $(".shishen-tabs li").click(function () {
            var level = $(this).text();
            $(".shishen-list").css("left", 0);
            iNow = 0;

            $(this).addClass("current").siblings().removeClass("current");

            getData(level);
            hover();

            var len = $(".shishen-list ul").length;
            var page = Math.ceil(len / 6);
            if (page === 1) {
                $next.hide();
                $prev.hide();
            } else {
                $next.show();
                $prev.show();
            }
            iNow === 0 && $prev.hide();

        });

        $next.click(function () {
            $prev.show();
            var len = $(".shishen-list ul").length;
            var page = Math.ceil(len / 6);
            iNow === page - 2 && $(this).hide();
            iNow < page - 1 && iNow++;
            $(".shishen-list").stop().animate({"left": -828 * iNow});

        });
        $prev.click(function () {
            $next.show();
            iNow === 1 ? $(this).hide() : $(this).show();
            iNow > 0 && iNow--;
            $(".shishen-list").stop().animate({"left": -828 * iNow});
        });

        function hover() {
            $(".shishen-list a").hover(function () {
                $(this).find("span").addClass("shadow").siblings("em").show();
            }, function () {
                $(this).find("span").removeClass("shadow").siblings("em").hide();
            });
        }

        function isNew(n) {
            if (n && n != null) {
                return "<i class='icon-new'></i>";
            }
            return "";
        }

        function create(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (i % 2 == 0) {
                    str += "<ul><li><a href='http://yys.163.com/shishen/" + arr[i].id + ".html' target='_blank'><span></span><em>" + arr[i].name + "</em><img src='https://yys.res.netease.com/pc/gw/20160929201016/data/shishen/" + arr[i].id + ".png'>" + isNew(arr[i].isNew) + "</a></li>"
                } else {
                    str += "<li><a href='http://yys.163.com/shishen/" + arr[i].id + ".html' target='_blank'><span></span><em>" + arr[i].name + "</em><img src='https://yys.res.netease.com/pc/gw/20160929201016/data/shishen/" + arr[i].id + ".png'>" + isNew(arr[i].isNew) + "</a></li></ul>"
                }
            }
        }

        function getData(n) {
            str = "";
            var container = [];
            if (n === "全部") {
                container = data;
            } else {
                for (var i = 0; i < data.length; i++) {
                    data[i].level == n && container.push(data[i]);
                }
            }
            create(container);

            $(".shishen-list").html(str).css("width", 138 * container.length);

        }
    };
    shishen();

    /*平安之旅-主角*/
    $(".top-box a").click(function () {
        var index = $(".top-box a").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".bottom-box").children().eq(index).show().siblings().hide();

    });
    $(".left-tabs li").click(function () {
        var index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $(".zhujue-wrap").eq(index).addClass("show").siblings().removeClass("show");
    });

    /*攻略部分*/
    $(".dot-nav span").mouseover(function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass();
        $(".img-box").stop().animate({"left": index * -368})
    });
    $(".top-tabs a:not(:first)").mouseover(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".top-tabs a").mouseover(function () {
        var index = $(".top-tabs a").index(this);
        $(".strategy-list").stop().animate({"left": index * -835})
    });
    /*同人部分*/
    $(".tongren-tabs li a").mouseover(function () {
        var index = $(this).parent().index();
        $(this).addClass("on").parent().siblings().find("a").removeClass("on");
        $(".tongren-list").stop().animate({"left": index * -1220})
    });
    /*返回顶部*/
    $(".back-top").click(function () {
        $("body,html").animate({scrollTop: 0}, 500);
    });
});
