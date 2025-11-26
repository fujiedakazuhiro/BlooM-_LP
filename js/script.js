// jQuery("セレクタ").メソッド("パラメーター") 基本構文
// jQuery("セレクタ").アニメーション名() アニメーションの指示
// jQuery("セレクタ").on("イベント名",function(){}) イベント構文

//worksセクションのスライダー
document.addEventListener("DOMContentLoaded", function () {
  const worksSwiper = new Swiper(".works__swiper", {
    //swiperの名前
    //切り替えのモーション
    speed: 1000, //表示切り替えのスピード
    effect: "slide", //切り替えのmotion (※1)
    allowTouchMove: true, // スワイプで表示の切り替えを有効に

    //最後→最初に戻るループ再生を有効に
    loop: true,

    //表示について
    centeredSlides: true, //中央寄せにする
    slidesPerView: "auto",
    spaceBetween: 30,

    //ページネーション
    pagination: {
      el: ".works__swiper-pagination", //paginationのclass
      clickable: true, //クリックでの切り替えを有効に
      type: "bullets", //paginationのタイプ (※2)
    },
    //ナビゲーション
    navigation: {
      prevEl: ".works__swiper-button-prev", //戻るボタンのclass
      nextEl: ".works__swiper-button-next", //進むボタンのclass
    },

    //ブレイクポイントによって変える
    breakpoints: {
      375: {
        slidesPerView: 1.0,
        spaceBetween: 20,
        centeredSlides: true, //中央寄せにする
      },
      768: {
        slidesPerView: 1.2,
        spaceBetween: 40,
        centeredSlides: true, //中央寄せにする
      },
      900: {
        slidesPerView: 1.2,
        spaceBetween: 60,
        centeredSlides: true, //中央寄せにする
      },
      1200: {
        slidesPerView: 1.35,
        spaceBetween: 81,
        centeredSlides: true, //中央寄せにする
      },
    },
  });
});
