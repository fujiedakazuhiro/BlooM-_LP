// jQuery("セレクタ").メソッド("パラメーター") 基本構文
// jQuery("セレクタ").アニメーション名() アニメーションの指示
// jQuery("セレクタ").on("イベント名",function(){}) イベント構文

// TwentyTwenty 初期化用関数（シンプルかつ安全な再初期化）
function initTwentyTwenty() {
  // プラグインのロード状態をチェック
  if (typeof jQuery === "undefined" || typeof jQuery.fn.twentytwenty === "undefined") {
    console.error("jQuery または TwentyTwenty プラグインが読み込まれていません。");
    return;
  }

  // すべてのビフォーアフターコンテナに対して処理を実行
  jQuery(".twentytwenty-container").each(function () {
    const $container = jQuery(this);

    // 既存のTwentyTwenty要素を全て削除してリセット（再初期化の準備）
    $container.find(".twentytwenty-overlay, .twentytwenty-handle, .twentytwenty-before-label, .twentytwenty-after-label").remove();

    // TwentyTwentyを再適用
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
  });
}

// Swiper初期化の実行タイミングを window.load に変更 (最重要修正箇所)
// 全てのCSS、画像、外部JS（TwentyTwenty含む）が完全に読み込まれるのを待ってから処理を開始します。
jQuery(window).on("load", function () {
  console.log("Window loaded, starting Swiper and TwentyTwenty initialization.");

  const worksSwiper = new Swiper(".works__swiper", {
    speed: 1000,
    effect: "slide",
    allowTouchMove: true,
    allowTouchMove: false,
    simulateTouch: false,
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    // TwentyTwentyのDOM変更をSwiperに通知するための設定
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
        console.log("Swiper initialized, starting initial TwentyTwenty setup.");
        // Swiper初期化後、DOM計算完了を待ってからTwentyTwentyを初期化
        setTimeout(function () {
          initTwentyTwenty();
          // TwentyTwentyにサイズ変更を強制的に通知
          jQuery(window).trigger("resize");
        }, 300); // 念のため遅延時間を長めに設定
      },
      slideChangeTransitionEnd: function () {
        console.log("Transition ended, reinitializing TwentyTwenty and triggering resize.");
        // スライド切り替え完了後、TwentyTwentyを再初期化
        initTwentyTwenty();
        // 必ずリサイズをトリガーし、正確なサイズを再計算させる
        jQuery(window).trigger("resize");
      },
    },
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
