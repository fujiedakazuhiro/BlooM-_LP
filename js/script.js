// jQuery("セレクタ").メソッド("パラメーター") 基本構文
// jQuery("セレクタ").アニメーション名() アニメーションの指示
// jQuery("セレクタ").on("イベント名",function(){}) イベント構文

// TwentyTwenty 初期化用関数（改善版）
function initTwentyTwenty() {
  if (typeof jQuery === "undefined" || typeof jQuery.fn.twentytwenty === "undefined") {
    console.error("jQuery or TwentyTwenty plugin is not loaded");
    return;
  }

  jQuery(".twentytwenty-container").each(function () {
    const $container = jQuery(this);

    // 既存の初期化をクリア
    if ($container.hasClass("twentytwenty-container")) {
      $container.find(".twentytwenty-overlay, .twentytwenty-handle, .twentytwenty-before-label, .twentytwenty-after-label").remove();
      $container.removeClass("twentytwenty-container");
    }

    // 再度クラスを追加
    $container.addClass("twentytwenty-container");

    // 画像のスタイルをリセット
    $container.find("img").each(function () {
      jQuery(this).css({
        position: "",
        clip: "",
        "clip-path": "",
        "max-width": "100%",
        display: "block",
      });
    });

    // 画像が読み込まれるまで待つ
    const images = $container.find("img");
    let loadedCount = 0;
    const totalImages = images.length;

    images.each(function () {
      if (this.complete) {
        loadedCount++;
      } else {
        jQuery(this).on("load", function () {
          loadedCount++;
          if (loadedCount === totalImages) {
            initializeTwentyTwenty($container);
          }
        });
      }
    });

    if (loadedCount === totalImages) {
      initializeTwentyTwenty($container);
    }
  });
}

function initializeTwentyTwenty($container) {
  try {
    $container.twentytwenty({
      default_offset_pct: 0.5,
      orientation: "horizontal",
      before_label: "Before",
      after_label: "After",
      no_overlay: false,
      move_slider_on_hover: false,
      move_with_handle_only: true,
      click_to_move: false,
    });
    console.log("TwentyTwenty initialized successfully");
  } catch (error) {
    console.error("TwentyTwenty initialization error:", error);
  }
}

// Swiper初期化
jQuery(document).ready(function () {
  // すべてのリソースが読み込まれるまで待つ
  jQuery(window).on("load", function () {
    console.log("Window loaded, initializing Swiper...");

    const worksSwiper = new Swiper(".works__swiper", {
      speed: 1000,
      effect: "slide",
      allowTouchMove: true,
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 30,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,

      pagination: {
        el: ".works__swiper-pagination",
        clickable: true,
        type: "bullets",
      },

      navigation: {
        prevEl: ".works__swiper-button-prev",
        nextEl: ".works__swiper-button-next",
      },

      breakpoints: {
        375: {
          slidesPerView: 1.0,
          spaceBetween: 20,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 1.2,
          spaceBetween: 40,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 1.2,
          spaceBetween: 60,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 1.35,
          spaceBetween: 81,
          centeredSlides: true,
        },
      },

      on: {
        init: function () {
          console.log("Swiper initialized");
          // 初期化直後に実行
          setTimeout(function () {
            initTwentyTwenty();
          }, 600);
        },
        slideChange: function () {
          console.log("Slide changed");
        },
        slideChangeTransitionEnd: function () {
          console.log("Transition ended, reinitializing TwentyTwenty");
          // トランジション完了後に再初期化
          setTimeout(function () {
            initTwentyTwenty();
          }, 100);
        },
      },
    });
  });
});

// // TwentyTwenty 初期化用関数
// function initTwentyTwenty() {
//   $(".twentytwenty-container").each(function () {
//     const $container = $(this);

//     // 二重初期化防止
//     if ($container.data("twentytwenty-initialized")) return;

//     $container.twentytwenty({
//       default_offset_pct: 0.5,
//     });

//     $container.data("twentytwenty-initialized", true);
//   });
// }

// // DOM 読み込み時
// $(window).on("load", function () {
//   initTwentyTwenty();
// });

// //worksセクションのスライダー
// document.addEventListener("DOMContentLoaded", function () {
//   const worksSwiper = new Swiper(".works__swiper", {
//     //swiperの名前
//     //切り替えのモーション
//     speed: 1000, //表示切り替えのスピード
//     effect: "slide", //切り替えのmotion (※1)
//     allowTouchMove: true, // スワイプで表示の切り替えを有効に

//     //最後→最初に戻るループ再生を有効に
//     loop: true,

//     //表示について
//     centeredSlides: true, //中央寄せにする
//     slidesPerView: "auto",
//     spaceBetween: 30,

//     //ページネーション
//     pagination: {
//       el: ".works__swiper-pagination", //paginationのclass
//       clickable: true, //クリックでの切り替えを有効に
//       type: "bullets", //paginationのタイプ (※2)
//     },
//     //ナビゲーション
//     navigation: {
//       prevEl: ".works__swiper-button-prev", //戻るボタンのclass
//       nextEl: ".works__swiper-button-next", //進むボタンのclass
//     },

//     //ブレイクポイントによって変える
//     breakpoints: {
//       375: {
//         slidesPerView: 1.0,
//         spaceBetween: 20,
//         centeredSlides: true, //中央寄せにする
//       },
//       768: {
//         slidesPerView: 1.2,
//         spaceBetween: 40,
//         centeredSlides: true, //中央寄せにする
//       },
//       900: {
//         slidesPerView: 1.2,
//         spaceBetween: 60,
//         centeredSlides: true, //中央寄せにする
//       },
//       1200: {
//         slidesPerView: 1.35,
//         spaceBetween: 81,
//         centeredSlides: true, //中央寄せにする
//       },
//     },

//     // ここが重要
//     on: {
//       slideChange: function () {
//         initTwentyTwenty();
//       },
//     },
//   });
// });
