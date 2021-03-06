$(document).ready(function(){


    function resizeEvt(){
        const $win_width = $(window).width();
        if ($win_width >= 768){

            var elm = ".box";  
            $(elm).each(function(index){  
                $(this).on("mousewheel DOMMouseScroll", function(e){
                    e.preventDefault();            
                    console.log(event.wheelDelta);  
                    console.log(event.detail);  

                    var delta = 0;

                    if(event.wheelDelta){               
                        delta = event.wheelDelta / 120;

                        if(window.opera){ 
                            delta = -delta;  
                        }
                    }else if(event.detail){               
                        delta = -event.detail / 3;                
                    }
                    console.log(delta);  

                    var moveTo = $(window).scrollTop();  
                    var elmIndex = $(elm).eq(index);  
                    console.log(elmIndex);  

                    if(delta < 0){
                        try{
                            if($(elmIndex).next() != undefined){  
                                moveTo = $(elmIndex).next().offset().top;  

                                $(elm).removeClass("active");
                                $(elmIndex).next().addClass("active");

                                var $cur_index = $(".box.active").index();
                                console.log($cur_index);
                                $("header li").removeClass("active")
                                $("header li").eq($cur_index).addClass("active");
                            }
                        }catch(error){

                        }

                    }else if(delta > 0){
                        try{
                            if($(elmIndex).prev() != undefined){
                                moveTo = $(elmIndex).prev().offset().top;  

                                $(elm).removeClass("active");
                                $(elmIndex).prev().addClass("active");

                                var $cur_index = $(".box.active").index();
                                console.log($cur_index);
                                $("header li").removeClass("active")
                                $("header li").eq($cur_index).addClass("active");
                            }
                        }catch(error){
                    
                        }
                    }
                    $("html, body").stop().animate({scrollTop : moveTo + "px"}, 200);
                });
            });

            
            $("header li").click(function(){
                var $index = $(this).index();

                $("header li").removeClass("active");
                $(this).addClass("active");

                $(".box").removeClass("active");
                $(".box").eq($index).addClass("active");

                $("html, body").stop().animate({scrollTop : $(".box").eq($index).offset().top}, 1000);

                return false;
            });




            //???????????? ????????? fullpage slider??? ??????
            var key_num = 0;

            $(document).on("keydown", function(evt){       
                console.log(evt.keyCode);  
                key_num = evt.keyCode;

                var $target = $(".box.active").index();
                console.log($target); 

                if(key_num == 40 || key_num == 34){  
                    if($target == $(".box").length - 1){  
                    }else{
                        $("html, body").stop().animate({scrollTop : $(".box").eq($target + 1).offset().top}, 200);  
                        $(".box").removeClass("active"); 
                        $(".box").eq($target + 1).addClass("active");  
                        $("header li").removeClass("active");  
                        $("header li").eq($target + 1).addClass("active"); 
                    }
                }else if(key_num == 38 || key_num == 33){  
                    if($target == 0){

                    }else{
                        $("html, body").stop().animate({scrollTop : $(".box").eq($target - 1).offset().top}, 200);
                        $(".box").removeClass("active");
                        $(".box").eq($target - 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target - 1).addClass("active");
                    }
                }else if(key_num == 36){ 
                    $("html, body").stop().animate({scrollTop : $(".box").first().offset().top}, 200);
                    $(".box").removeClass("active");
                    $(".box").first().addClass("active");
                    $("header li").removeClass("active");
                    $("header li").first().addClass("active");
                }else if(key_num == 35){ 
                    $("html, body").stop().animate({scrollTop : $(".box").last().offset().top}, 200);
                    $(".box").removeClass("active");
                    $(".box").last().addClass("active");
                    $("header li").removeClass("active");
                    $("header li").last().addClass("active");
                }
            }); //...????????? ????????? ??????




            //????????? ??????????????? ????????????(touch ?????????) 
            var $t_start;  
            var $t_end;  
            var $t_move;  

            function prev(){
                var $target = $(".box.active").index();
                if($target != 0){  
                    $("html, body").stop().animate({scrollTop : $(".box").eq($target - 1).offset().top}, 500, function(){
                        $(".box").removeClass("active");
                        $(".box").eq($target - 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target - 1).addClass("active");
                    });
                }
            }

            function next(){
                var $target = $(".box.active").index();
                if($target != $(".box").length - 1){  
                    $("html, body").stop().animate({scrollTop : $(".box").eq($target + 1).offset().top}, 500, function(){
                        $(".box").removeClass("active");
                        $(".box").eq($target + 1).addClass("active");
                        $("header li").removeClass("active");
                        $("header li").eq($target + 1).addClass("active");
                    });
                }
            }

            function touchmove(evt){
                console.log(evt);
                $t_move = $t_start - $t_end;
                console.log($t_move);
                
                if($t_move > 10){  
                    next();
                }else if($t_move < -10){  
                    prev();
                }
            }

            $(".box").on("touchstart", function(evt){
                console.log(evt.changedTouches[0].clientY);
                $t_start = evt.changedTouches[0].clientY;
            });
            $(".box").on("touchend", function(evt){
                console.log(evt.changedTouches[0].clientY);
                $t_end = evt.changedTouches[0].clientY;

                touchmove();
            });




            //PC ?????????????????? ???????????????(mouse ?????????) 
            var $m_down; 
            var $m_up; 
            var $m_move;

            function mousemove(){
                $m_move = $m_down - $m_up;
                console.log($m_move);    
                    
                if ($m_move > 100){
                    next();
                }else if ($m_move < -100){
                    prev();
                }
            }

            $(".box").on("mousedown", function(evt){
                console.log("???????????????");
                console.log(evt);
                console.log(evt.clientY);
                $m_down = evt.clientY;
            });
            $(".box").on("mouseup", function(evt){
                console.log("????????????");
                console.log(evt);
                console.log(evt.clientY);
                $m_up = evt.clientY;
                mousemove();
            });
        }

    } //resizeEvt ????????????

    resizeEvt();
    $(window).resize(function(){
        resizeEvt();
    });




    /* hover ???????????? ?????? -> ?????? -> ?????? */
    $(".box_2 .wrap .text_part").hover(function(){
        $(this).addClass("active");
    }, function(){
        $(this).removeClass("active");
    });
    



    /* mouseover() ????????? */
    $(".mousemove_evt").mousemove(function(event){ //??????: $("body") ?????? => ?????? ?????? ????????? ????????? ??????
        //console.log(event);
        var c_x = event.clientX;
        var c_y = event.clientY;
        console.log(c_x);
        console.log(c_y);
 
        $(".trace_circle").css({"left": c_x + "px", "top": c_y + "px"});
    });
    $(".mousemove_evt span, .mousemove_evt p, .mousemove_evt .cont").hover(function(){
        $(".trace_circle").addClass("active");
    }, function(){
        $(".trace_circle").removeClass("active");
    });



    /* circle bar */
    var startCount = 0;

    $(".circle_bar .box_").each(function(index){
        var sel_count = $(this).find(".count").attr("data-limit");
        console.log(sel_count);

        $(this).find("circle:eq(1)").css("stroke-dashoffset", `calc(440 - 440 * ${sel_count} / 100)`);

        var counter = setInterval(function(){
            if (startCount < sel_count){
                startCount++;
                console.log(startCount);
                $(".box_").eq(index).find(".count").text(startCount);
            }else if(startCount == sel_count){ 
                $(".box_").eq(index).find(".count").text(sel_count);
            }else{
                clearInterval(counter);
            }
        }, 50);
    });   
    


    /* email popup */
    $(".email_part").click(function(){
        $(".dark").addClass("on");
        $(".email").addClass("on");
        $(".github").removeClass("on");
        return false;   
    });
    $(".close").click(function(){
        $(".dark").removeClass("on");
        $(".email").removeClass("on");
        return false;       
    });

    /* github popup */
    $(".github_part").click(function(){
        $(".dark").addClass("on");
        $(".github").addClass("on");
        $(".email").removeClass("on");
        return false;   
    });
    $(".close, .dark").click(function(){
        $(".dark").removeClass("on");
        $(".github").removeClass("on");
        $(".email").removeClass("on");
        return false;       
    });


    $(".box_4 .slide_frame").slick({
        infinite : true,
        fade : true,
        dots : true,
    });
});

 /* work ?????? slide */

Vue.component("work-el", {
    data : () => {
        return {
            work : [
                {workImg: "b&o.png", name: "B&O", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/b-o-play"},
                {workImg: "sejong_hospital.png", name: "SEJONG HOSPITAL", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/sejong_hospital"},
                {workImg: "wedding.png", name: "WEDDING", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/wedding"},
                {workImg: "cakecious.png", name: "CAKECIOUS", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Goggle Map ??????", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/cakecious"},
                {workImg: "cashmere.png", name: "CASHMERE", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Goggle Map ??????", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/cashmere2022"},
                {workImg: "investplan.png", name: "INVESTPLAN", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Main page ??? 5?????? Sub page??? ??????", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/investplan"},
                {workImg: "kuliner.png", name: "KULINER", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Goggle Map ??????", explain2: "wow js ??????", version: "PC version", address: "https://ybzmlove.github.io/kuliner"},
                {workImg: "filmmaker.png", name: "FILMMAKER", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Vue js ???????????? ??????????????? ??????", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/filmmaker"},
                {workImg: "Movie-Battle-of-Jangsari.png", name: "BATTLE OF JANGSARI", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "ajax ??????-Sub Menu????????? ???????????? ?????? ??????", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/Movie_Battle-of-Jangsari"},                
                {workImg: "weatherApp.png", name: "WEATHER APP", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "ajax??????- Open Weather Map??? ???????????? API??????", explain2: "?????? ????????? ??????, ????????? ???????????? ?????? ??????", version: "PC version", address: "https://ybzmlove.github.io/weather"},
                {workImg: "musicBox.png", name: "MUSIC BOX", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/musicBox"},
                {workImg: "origin.png", name: "ORIGIN", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "Grid ??????", version: "PC version", address: "https://ybzmlove.github.io/origin"},                
                {workImg: "adAge.png", name: "AD AGE", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "Hash??????-Sub page&Detail page ?????????", version: "PC version", address: "https://ybzmlove.github.io/Ad_Age"},
                {workImg: "nationalGeographic.png", name: "National Geographic", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "Vue js??? router ??????-Main page ??? 5?????? Sub page??? ??????", version: "PC version", address: "https://ybzmlove.github.io/National-Geographic2022"},           
                {workImg: "mijin_portfolio.png", name: "MIJIN'S PORTFOLIO", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Fullpage vertical ?????? ??????", explain2: "Gmail??????-???????????????", version: "PC version", address: "https://ybzmlove.github.io/mijin_portfolio2022"},
            ],
        }
    }, 
    template : `
    <div class="slide_frame">
        <div v-for="list in work" class="slide">
            <div class="content">
                <div class="left">
                    <div class="img_part">
                        <img src="./img/macbook.png" alt="">
                        <div class="incase">
                            <div class="portview" :style="'background-image: url(./img/'+list.workImg+')'"></div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="text_part">
                        <h1>{{list.name}}</h1>
                        <h4>{{list.skills}}<h4>                      
                        <div class="explain">
                            <span>{{list.explain1}}</span>
                            <span>{{list.explain2}}</span>
                        </div>
                        <h5>{{list.version}}</h5>
                        <div class="btn_part">
                            <a :href="list.address" target="_blank">VIEW</a>
                        </div> 
                    </div>                                           
                </div>
            </div>    
        </div>                
    </div>
    `
});

new Vue({
    el : ".box_4"
});







//????????? ???????????? ??????
//2??? ????????? ?????? (????????? article)
//["??????(Design, Publishing, Develop, App)", ?????????", "?????????", ["????????????1", "????????????", "????????????3", ...], "??????", "?????????????????????"]

const portArr = [
    ["Publishing", "b&o.png", "B&O", ["html5.png", "css-3.png"], "B&O Website Renewal", "https://ybzmlove.github.io/b-o-play", "", ""],
    ["Publishing", "sejong_hospital.png", "SEJONG HOSPOTAL", ["html5.png", "css-3.png"], "Sejong Hospital Website Renewal", "https://ybzmlove.github.io/sejong_hospital", "", ""],
    ["Publishing", "wedding.png", "THE AISLE WEDDING", ["html5.png", "css-3.png"], "Wedding Website Renewal", "https://ybzmlove.github.io/wedding", "", ""],
    ["Publishing", "cakecious.png", "CAKECIOUS", ["html5.png", "css-3.png"], "Cakecious Website Renewal", "https://ybzmlove.github.io/cakecious", "Goggle Map ??????", ""],
    ["Publishing", "cashmere.png", "CASHMERE", ["html5.png", "css-3.png"], "Cashmere Website Renewal", "https://ybzmlove.github.io/cashmere2022", "Goggle Map ??????", ""],
    ["Publishing", "investplan.png", "INVESTPLAN", ["html5.png", "css-3.png"], "Investplan Website Renewal", "https://ybzmlove.github.io/investplan", "Main page ??? 5?????? Sub page??? ??????", ""],
    ["Publishing", "kuliner.png", "KULINER", ["html5.png", "css-3.png"], "Kuliner Restaurant Website Production", "https://ybzmlove.github.io/kuliner", "Goggle Map ??????", "wow js ??????"],
    ["Publishing", "filmmaker.png", "FILMMAKER", ["html5.png", "css-3.png", "js.png", "vue.png"], "Filmmaker Website Renewal", "https://ybzmlove.github.io/filmmaker", "Vue?????? - ??????????????? ??????", ""],
    ["Publishing", "Movie-Battle-of-Jangsari.png", "BATTLE OF JANGSARI", ["html5.png", "css-3.png", "js.png", "vue.png"], "Movie Battle of Jangsari Website Production", "https://ybzmlove.github.io/Movie_Battle-of-Jangsari", "ajax ?????? - Sub Menu????????? ???????????? ?????? ??????", ""],
    ["Develop", "weatherApp.png", "WEATHER APP", ["html5.png", "css-3.png", "js.png"], "Weather App Production", "https://ybzmlove.github.io/weather", "ajax ??????- Open Weather Map??? ???????????? API ??????", "?????? ????????? ??????, ????????? ???????????? ?????? ??????"],
    ["Publishing", "musicBox.png", "MUSIC BOX", ["html5.png", "css-3.png", "js.png"], "Music Box Website Production", "https://ybzmlove.github.io/musicBox", "Responsive Web Publishing", ""],
    ["Publishing", "origin.png", "ORIGIN", ["html5.png", "css-3.png"], "Origin Website Production", "https://ybzmlove.github.io/origin", "Responsive Web Publishing", "Grid ?????? - ????????? ??????"],
    ["Publishing", "adAge.png", "adAge", ["html5.png", "css-3.png", "js.png"], "adAge Website Renewal", "https://ybzmlove.github.io/Ad_Age", "Responsive Web Publishing", "Hash ?????? - Sub page&Detail page ?????????"],
    ["SPA", "nationalGeographic.png", "NATIONAL GEOGRAPHIC", ["html5.png", "css-3.png", "js.png", "vue.png"], "National Geographic Website Renewal", "https://ybzmlove.github.io/National-Geographic2022", "Responsive Web Publishing", "router ?????? - Main page ??? 5?????? Sub page??? ??????"],
    ["Develop", "mijin_portfolio.png", "MIJIN'S PORTFOLIO", ["html5.png", "css-3.png", "js.png", "vue.png"], "MIJIN'S PORTFOLIO Website Production", "https://ybzmlove.github.io/mijin_portfolio2022", "Fullpage vertical ?????? ??????", "Gmail ?????? - ???????????????"]
];



let circling = document.querySelector("#circling");
let articleBox = ``;
let iconList = ``; 

portArr.forEach((v, i, a) => {
    iconList = ``; //forEach????????? ?????????
    for (m of v[3]){
        iconList += `<li><img src="./img/${m}" alt=""></li>`;
    }
    console.log(`${i}?????? ${iconList}`);

    articleBox += `
    <article class="surface1" style="--i:${i+1}">
        <h1>${v[0]}</h1>
        <div class="inner">
            <div class="space">
                <div class="web_img" style="background-image: url(./img/${v[1]})"></div>
                <div class="web_info">
                    <div class="top">
                        <h3>${v[2]}</h3>
                        <ul>
                            ${iconList}
                        </ul>
                    </div>
                    <div class="bottom">
                        <p>${v[4]}</p>
                        <p>${v[6]}</p>
                        <p>${v[7]}</p>
                        <div class="detail_btn">
                            <a href="${v[5]}" target="_blank">Detail More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `;
});

circling.innerHTML = articleBox;



//???????????? ?????? ?????? ????????????
const articles = circling.querySelectorAll("article");
for(v of articles){
    console.log(v);

    v.addEventListener("mouseenter", () => {
        circling.style.animationPlayState = "paused";
    });

    v.addEventListener("mouseleave", () => {
        circling.style.animationPlayState = "running";
    });
}



//????????? ?????? ????????? ?????? ????????????
const ctrlBtn = document.querySelector(".controlBtn");
ctrlBtn.addEventListener("click", () => {
    const $play = ctrlBtn.classList.contains("play");
    if (!$play){
        ctrlBtn.classList.add("play");
        circling.style.animationPlayState = "paused";
        ctrlBtn.querySelector("img").setAttribute("src", "./img/play.svg");
    }else{
        ctrlBtn.classList.remove("play");
        circling.style.animationPlayState = "running";
        ctrlBtn.querySelector("img").setAttribute("src", "./img/pause.svg");
    }
});






