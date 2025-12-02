// jQuery("セレクタ").メソッド("パラメーター") 基本構文
// jQuery("セレクタ").アニメーション名() アニメーションの指示
// jQuery("セレクタ").on("イベント名",function(){}) イベント構文

//spでドロワーボタンをクリックした時にドロワーメニューを表示させる
jQuery("#js-drawer-button--1").on("click", function (e) {
  e.preventDefault();

  jQuery("#js-drawer-button--1").toggleClass("is-checked");
  jQuery("#js-drawer-content--1").toggleClass("is-checked");
  jQuery("#js-drawer-button--2").toggleClass("is-closed");
});

//spでドロワーボタンをクリックした時にドロワーメニューを表示させる
jQuery("#js-drawer-button--2").on("click", function (e) {
  e.preventDefault();

  jQuery("#js-drawer-button--2").toggleClass("is-checked");
  jQuery("#js-drawer-content--2").toggleClass("is-checked");
});

//ドロワーメニュー1の中のリンクをクリックした時にドロワーメニューを非表示にする
jQuery('#js-drawer-content--1 a[href^="#"]').on("click", function (e) {
  // e.preventDefault();

  jQuery("#js-drawer-button--1").removeClass("is-checked");
  jQuery("#js-drawer-button--2").removeClass("is-checked");
  jQuery("#js-drawer-content--1").removeClass("is-checked");
  jQuery("#js-drawer-content--2").removeClass("is-checked");
});

//ドロワーメニュー2の中のリンクをクリックした時にドロワーメニューを非表示にする
jQuery('#js-drawer-content--2 a[href^="#"]').on("click", function (e) {
  // e.preventDefault();

  jQuery("#js-drawer-button--1").removeClass("is-checked");
  jQuery("#js-drawer-button--2").removeClass("is-checked");
  jQuery("#js-drawer-content--1").removeClass("is-checked");
  jQuery("#js-drawer-content--2").removeClass("is-checked");
});

//スムーススクロール
jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  const speed = 600;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing" //swing or linear
  );
});

//galleryスライダーの自動再生
const gallerySwiper = new Swiper("#js-gallery-swiper", {
  // Optional parameters
  slidesPerView: "auto",
  // loopSlides: 10,
  // spaceBetween: 10,
  loop: true,
  speed: 3000,

  // 一旦ストップ
  // autoplay: {
  //   delay: 0,
  //   pauseOnMouseEnter: true,
  //   disableOnInteraction: false,
  // },
});

// 2つ目のヘッダーがTOPに来たタイミングで上部固定
// 1. 🚀 要素を取得 (変更なし)
const stickyHeader = document.getElementById("fv__header-2");

// 2. 📐 固定開始位置を格納する変数
let originalOffset = 0;

/**
 * 固定開始位置 (originalOffset) を計算し、更新する関数
 */
function updateOffset() {
  // 要素が存在する場合のみ処理
  if (stickyHeader) {
    // 現在のレイアウトでの正確な位置を取得して更新
    originalOffset = stickyHeader.offsetTop;
    console.log(`Original Offset Updated: ${originalOffset}px`);
  }
}

// --- 3. イベントリスナーの設定 ---

// A. スクロールイベント: 固定処理の実行
window.addEventListener("scroll", () => {
  // 要素が存在しない場合は処理を終了
  if (!stickyHeader) return;

  // 現在のスクロール位置（垂直方向）を取得
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // スクロール位置が固定開始位置を超えたかチェック
  if (scrollPosition >= originalOffset) {
    // クラス名を変更（クラスが存在しないかチェックしてから追加するのがベスト）
    if (!stickyHeader.classList.contains("is-sticky")) {
      stickyHeader.classList.add("is-sticky");
      // コンテンツのズレを防ぐための処理をここに追加
    }
  } else {
    // 固定を解除
    stickyHeader.classList.remove("is-sticky");
  }
});

// B. 初期計算と再計算イベント

// 1. ページ全体の読み込みが完了した時点 (画像などのロード後) で計算
window.addEventListener("load", updateOffset);

// 2. 画面サイズが変更された時点 (スマホの縦横切り替えなど) で再計算
window.addEventListener("resize", updateOffset);

// 3. (念のため) DOMがロードされた時点でも一度計算
document.addEventListener("DOMContentLoaded", updateOffset);

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
        slidesPerView: 1.3,
        spaceBetween: 40,
        centeredSlides: true,
      },
      900: {
        slidesPerView: 1.7,
        spaceBetween: 60,
        centeredSlides: true,
      },
      1200: {
        slidesPerView: 1.34,
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

const reviewSwiper = new Swiper(".review__swiper", {
  //swiperの名前
  //切り替えのモーション
  speed: 1000, //表示切り替えのスピード
  effect: "slide", //切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  //最後→最初に戻るループ再生を有効に
  loop: true,
  //自動スライドについて
  // autoplay: {
  //   delay: 3000, //何秒ごとにスライドを動かすか
  //   stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
  //   disableOnInteraction: true, //ユーザーの操作時に止める
  //   reverseDirection: false, //自動再生を逆向きにする
  // },

  //表示について
  centeredSlides: true, //中央寄せにする
  slidesPerView: "auto",
  spaceBetween: 40,

  // //ページネーション
  // pagination: {
  //   el: ".swiper-pagination", //paginationのclass
  //   clickable: true, //クリックでの切り替えを有効に
  //   type: "bullets" //paginationのタイプ (※2)
  // },
  //ナビゲーション
  navigation: {
    prevEl: ".swiper-button-prev.review__swiper-button-prev", //戻るボタンのclass
    nextEl: ".swiper-button-next.review__swiper-button-next", //進むボタンのclass
  },
  // //スクロールバー
  // scrollbar: { //スクロールバーを表示したいとき
  //   el: ".swiper-scrollbar", //スクロールバーのclass
  //   hide: true, //操作時のときのみ表示
  //   draggable: true //スクロールバーを直接表示できるようにする
  // },

  //ブレイクポイントによって変える
  breakpoints: {
    768: {
      slidesPerView: 1.7,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

/* =================================================== 
※1 effectについて
slide：左から次のスライドが流れてくる
fade：次のスライドがふわっと表示
■ fadeの場合は下記を記述
  fadeEffect: {
    crossFade: true
  },
cube：スライドが立方体になり、3D回転を繰り返す
coverflow：写真やアルバムジャケットをめくるようなアニメーション
flip：平面が回転するようなアニメーション
cards：カードを順番にみていくようなアニメーション
creative：カスタマイズしたアニメーションを使うときに使用します

=======================================================
※2 paginationのタイプ
bullets：スライド枚数と同じ数のドットが表示
fraction：分数で表示（例：1 / 3）
progressbar：スライドの進捗に応じてプログレスバーが伸びる
custom：自由にカスタマイズ

=====================================================*/

// ここからTwentyTwentyのコード(不要)
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
