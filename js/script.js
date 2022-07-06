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




            //키보드를 통해서 fullpage slider를 제어
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
            }); //...키보드 이벤트 종료




            //모바일 환경하에서 터치기반(touch 이벤트) 
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




            //PC 환경하에서는 마우스기반(mouse 이벤트) 
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
                console.log("마우스다운");
                console.log(evt);
                console.log(evt.clientY);
                $m_down = evt.clientY;
            });
            $(".box").on("mouseup", function(evt){
                console.log("마우스업");
                console.log(evt);
                console.log(evt.clientY);
                $m_up = evt.clientY;
                mousemove();
            });
        }

    } //resizeEvt 함수종료

    resizeEvt();
    $(window).resize(function(){
        resizeEvt();
    });




    /* hover 적용하여 영문 -> 한글 -> 영문 */
    $(".box_2 .wrap .text_part").hover(function(){
        $(this).addClass("active");
    }, function(){
        $(this).removeClass("active");
    });
    



    /* mouseover() 이벤트 */
    $(".mousemove_evt").mousemove(function(event){ //참고: $("body") 변경 => 화면 전체 마우스 포인터 변경
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

 /* work 부분 slide */

Vue.component("work-el", {
    data : () => {
        return {
            work : [
                {workImg: "b&o.png", name: "B&O", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/b-o-play"},
                {workImg: "sejong_hospital.png", name: "SEJONG HOSPITAL", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/sejong_hospital"},
                {workImg: "wedding.png", name: "WEDDING", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/wedding"},
                {workImg: "cakecious.png", name: "CAKECIOUS", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Goggle Map 연동", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/cakecious"},
                {workImg: "cashmere.png", name: "CASHMERE", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Goggle Map 연동", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/cashmere2022"},
                {workImg: "investplan.png", name: "INVESTPLAN", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Main page 와 5개의 Sub page로 구성", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/investplan"},
                {workImg: "kuliner.png", name: "KULINER", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Goggle Map 연동", explain2: "wow js 사용", version: "PC version", address: "https://ybzmlove.github.io/kuliner"},
                {workImg: "filmmaker.png", name: "FILMMAKER", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Vue js 사용하여 단일페이지 구성", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/filmmaker"},
                {workImg: "Movie-Battle-of-Jangsari.png", name: "BATTLE OF JANGSARI", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "ajax 사용-Sub Menu이동시 불필요한 로딩 제거", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/Movie_Battle-of-Jangsari"},                
                {workImg: "weatherApp.png", name: "WEATHER APP", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "ajax사용- Open Weather Map의 날씨정보 API연동", explain2: "위치 정보를 위도, 경도로 확인하여 날씨 조회", version: "PC version", address: "https://ybzmlove.github.io/weather"},
                {workImg: "musicBox.png", name: "MUSIC BOX", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "", version: "PC version", address: "https://ybzmlove.github.io/musicBox"},
                {workImg: "origin.png", name: "ORIGIN", skills: "HTML, CSS", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "Grid 사용", version: "PC version", address: "https://ybzmlove.github.io/origin"},                
                {workImg: "adAge.png", name: "AD AGE", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "Hash사용-Sub page&Detail page 재활용", version: "PC version", address: "https://ybzmlove.github.io/Ad_Age"},
                {workImg: "nationalGeographic.png", name: "National Geographic", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Responsive Web Publishing", explain2: "Vue js의 router 사용-Main page 와 5개의 Sub page로 구성 ", version: "PC version", address: "https://ybzmlove.github.io/National-Geographic2022"},           
                {workImg: "mijin_portfolio.png", name: "MIJIN'S PORTFOLIO", skills: "HTML, CSS, jQuery, Javascript", publish: "Publishing 100%", explain1: "Fullpage vertical 방식 사용", explain2: "Gmail연동-메일보내기", version: "PC version", address: "https://ybzmlove.github.io/mijin_portfolio"},
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
