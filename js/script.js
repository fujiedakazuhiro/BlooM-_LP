//ドロワーボタン1をクリックした時にドロワーメニューを表示させる
jQuery("#js-drawer-button--1").on("click", function (e) {
  e.preventDefault();

  jQuery("#js-drawer-button--1").toggleClass("is-checked is-fixed");
  jQuery("#js-drawer-content--1").toggleClass("is-checked");
  jQuery("html").toggleClass("no-scroll");
  // jQuery("#js-drawer-button--2").toggleClass("is-closed");
});

//ドロワーボタン2をクリックした時にドロワーメニューを表示させる
jQuery("#js-drawer-button--2").on("click", function (e) {
  e.preventDefault();

  jQuery("#js-drawer-button--1").toggleClass("is-checked is-fixed");
  jQuery("#js-drawer-content--1").toggleClass("is-checked");
  jQuery("html").toggleClass("no-scroll");
});

// 💡 bodyの任意の部分をクリックしたときにドロワーメニューを閉じる処理
jQuery("body").on("click", function (e) {
  // クリックされた要素がドロワーメニューの要素、またはドロワーボタンの要素である場合は、何もしない
  if (
    jQuery(e.target).closest("#js-drawer-content--1").length || // クリックがドロワーメニュー内
    jQuery(e.target).closest("#js-drawer-button--1").length || // クリックがボタン1
    jQuery(e.target).closest("#js-drawer-button--2").length // クリックがボタン2
    // jQuery(e.target).closest("html").length //htmlにスクロールしない
  ) {
    return; // 処理を終了
  }

  // それ以外（ドロワー外）がクリックされ、かつドロワーが開いている場合
  if (jQuery("#js-drawer-content--1").hasClass("is-checked")) {
    // ドロワーを閉じるために必要なクラスを全て外す (removeClass)
    // 重要な点: ここは toggleClass ではなく removeClass を使います。
    jQuery("#js-drawer-button--1").removeClass("is-checked is-fixed");
    jQuery("#js-drawer-content--1").removeClass("is-checked");
    jQuery("#js-drawer-button--2").removeClass("is-checked");
    jQuery("html").removeClass("no-scroll");
  }
});

//ドロワーメニュー1の中のリンクをクリックした時にドロワーメニューを非表示にする
jQuery('#js-drawer-content--1 a[href^="#"]').on("click", function (e) {
  // e.preventDefault();

  jQuery("#js-drawer-button--1").removeClass("is-checked is-fixed");
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

document.addEventListener("DOMContentLoaded", function () {
  const fixedButton = document.querySelector(".to-top-button");

  // デバイスごとのスクロールしきい値（ピクセル）を設定
  const MOBILE_THRESHOLD = 600; // スマホでの表示トリガー（例: 500px）
  const PC_THRESHOLD = 2000; // PCでの表示トリガー（例: 800px - FVが長い場合を想定）

  // ブレイクポイントを設定 (例: 768px以上をPCとみなす)
  const BREAKPOINT = 1200;

  // スクロール位置を監視する関数
  function handleScroll() {
    // 現在のスクロール量を取得
    const scrollY = window.scrollY || window.pageYOffset;
    const windowWidth = window.innerWidth;
    let currentThreshold;

    // 現在の画面幅に応じて、使用するしきい値を決定
    if (windowWidth >= BREAKPOINT) {
      // PC幅の場合
      currentThreshold = PC_THRESHOLD;
    } else {
      // スマホ幅の場合
      currentThreshold = MOBILE_THRESHOLD;
    }

    // スクロール量が設定値を超えたかどうかを判定
    if (scrollY >= currentThreshold) {
      // 判定条件を満たしたら、表示用クラスを付与
      fixedButton.classList.add("is-active");
    } else {
      // 判定条件を満たさなかったら、表示用クラスを削除
      fixedButton.classList.remove("is-active");
    }
  }

  // スクロールイベントに監視関数を登録
  window.addEventListener("scroll", handleScroll);

  // リサイズイベントにも監視関数を登録（画面幅が変わり、しきい値が変更される可能性があるため）
  window.addEventListener("resize", handleScroll);

  // ページ読み込み時の初期位置でもボタンの表示/非表示をチェック
  handleScroll();
});

// スクロール時のアニメーション
document.addEventListener("DOMContentLoaded", function () {
  const topLink = document.querySelector(".to-top__arrow");

  if (topLink) {
    topLink.addEventListener("click", function (event) {
      event.preventDefault();

      // ターゲット（最上部）のY座標は 0 です
      const targetY = 0;
      // 現在のスクロール位置
      const startY = window.pageYOffset;
      // スクロール距離
      const distance = Math.abs(targetY - startY);
      // アニメーションにかける時間 (例: 500ミリ秒 = 0.5秒)
      const duration = 500;

      let startTime = null;

      // requestAnimationFrameを使ったアニメーションループ
      function animationStep(currentTime) {
        if (startTime === null) {
          startTime = currentTime;
        }

        // 経過時間
        const elapsedTime = currentTime - startTime;

        // 進行度 (0から1.0まで)
        let progress = elapsedTime / duration;

        // 1.0を超えないように制御
        if (progress > 1) {
          progress = 1;
        }

        // **等速（リニア）**のイージング関数を適用 (progressの値をそのまま使用)
        const easing = progress;

        // 現在のスクロール位置を計算
        const newY = startY + (targetY - startY) * easing;

        // スクロール実行
        window.scrollTo(0, newY);

        // アニメーションが終了していなければ、次のフレームを要求
        if (elapsedTime < duration) {
          window.requestAnimationFrame(animationStep);
        }
      }

      // アニメーション開始
      window.requestAnimationFrame(animationStep);
    });
  }
  // ※ ここに、ボタン表示/非表示のスクロール監視コードが続きます
});

// フワッと表示の実装
// 表示領域に監視対象が入ってきたら、is-in-viewクラスを付与
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    } else {
      // entry.target.classList.remove("is-in-view");
    }
  });
});

// 監視対象を登録するためのコード
// js-in-viewクラスを付与すると監視対象に登録される
const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
  intersectionObserver.observe(inViewItem);
});

document.addEventListener("DOMContentLoaded", () => {
  const fvTarget = document.querySelector(".js-fv-target");

  if (!fvTarget) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // 要素が画面に入ってきた（交差した）ら
        if (entry.isIntersecting) {
          // アニメーション対象の全ての子要素を取得し、クラスを付与
          const chars = entry.target.querySelectorAll(".animate-char");
          chars.forEach((char) => {
            char.classList.add("is-visible");
          });

          // 一度アニメーションを開始したら監視を終了
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // 画面に入ってきたと判定するしきい値
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  // 監視を開始
  observer.observe(fvTarget);
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

// jQuery(function ($) {
//   // --- セレクタの定義 ---
//   const $body = $("body");
//   const $html = $("html"); // <html>要素
//   const $drawerContent = $("#js-drawer-content--1");
//   const $drawerButton1 = $("#js-drawer-button--1");
//   const $drawerButton2 = $("#js-drawer-button--2");
//   const $allDrawerButtons = $drawerButton1.add($drawerButton2);
//   const $drawerLinks = $drawerContent.find("a");

//   // 開閉状態を示す共通クラス
//   const CHECKED_CLASS = "is-checked";
//   const NO_SCROLL_CLASS = "is-no-scroll";

//   let scrollPosition = 0; // スクロール位置を保持する変数

//   /**
//    * ドロワーメニューの開閉状態を切り替える共通関数
//    * @param {boolean} forceOpen - true: 開く, false: 閉じる, undefined: トグル
//    */
//   function toggleDrawer(forceOpen) {
//     const isOpening = $drawerContent.hasClass(CHECKED_CLASS);
//     const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpening;

//     // 1. 各要素の状態を同期して操作
//     $drawerContent.toggleClass(CHECKED_CLASS, shouldOpen);
//     $drawerButton1.toggleClass(CHECKED_CLASS, shouldOpen);
//     $drawerButton2.toggleClass(CHECKED_CLASS, shouldOpen);

//     if (shouldOpen) {
//       // 🔷 開く時：現在のスクロール位置を記録し、その位置を基準に固定する
//       scrollPosition = $(window).scrollTop(); // 現在のスクロール位置を記録 (例: 500px)

//       // bodyを上方向にずらすことで、見た目を固定する
//       // (例: top: -500px; とすることで、500pxスクロールした位置が画面のトップに来る)
//       $body.css("top", -scrollPosition + "px");

//       $body.addClass(NO_SCROLL_CLASS);
//       $html.addClass(NO_SCROLL_CLASS);
//     } else {
//       // 🔷 閉じる時：固定を解除し、元のスクロール位置に戻す
//       $body.removeClass(NO_SCROLL_CLASS);
//       $html.removeClass(NO_SCROLL_CLASS);

//       $body.css("top", ""); // bodyのtopプロパティをリセット
//       // クラス解除後に、記録したスクロール位置に戻す
//       $(window).scrollTop(scrollPosition);
//     }
//   }

//   // --- イベントハンドラ ---

//   // 1. ドロワーボタン1と2をクリックした時の処理（共通）
//   $allDrawerButtons.on("click", function (e) {
//     e.preventDefault();
//     const clickedButton = $(this); // クリックされたボタンを特定

//     // 1-1. 共通の開閉処理を実行 (ドロワーを開閉し、スクロールをロック/解除する)
//     toggleDrawer();

//     // ドロワーの開閉状態をチェック (toggleDrawer実行後なので、CHECKED_CLASSがあるなら開いている)
//     const isDrawerOpen = $drawerContent.hasClass(CHECKED_CLASS);

//     // 1-2. ✨ ボタン2がクリックされた場合にのみ、ボタン1に is-fixed クラスを付与/削除
//     if (clickedButton.is($drawerButton2)) {
//       // ドロワーが開いている状態に合わせて、ボタン1に 'is-fixed' クラスを付与/削除
//       $drawerButton1.toggleClass("is-fixed", isDrawerOpen);
//     }
//   });

//   // 2. メニュー外クリックで閉じる処理
//   $body.on("click", function (e) {
//     if (!$drawerContent.hasClass(CHECKED_CLASS)) {
//       return;
//     }
//     const $target = $(e.target);
//     if (!$target.closest($allDrawerButtons).length && !$target.closest($drawerContent).length) {
//       toggleDrawer(false);
//     }
//   });

//   // 3. ドロワーメニュー内のリンクをクリックした時の閉じる処理
//   $drawerLinks.on("click", function (e) {
//     const href = $(this).attr("href");
//     if (href === "" || href.startsWith("#")) {
//       // ページ内リンクで遷移する場合、閉じる処理を実行
//       toggleDrawer(false);
//     }
//   });
// });
