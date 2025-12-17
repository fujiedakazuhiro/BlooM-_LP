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
  jQuery("html").removeClass("no-scroll");
});

//ドロワーメニュー2の中のリンクをクリックした時にドロワーメニューを非表示にする
jQuery('#js-drawer-content--2 a[href^="#"]').on("click", function (e) {
  // e.preventDefault();

  jQuery("#js-drawer-button--1").removeClass("is-checked");
  jQuery("#js-drawer-button--2").removeClass("is-checked");
  jQuery("#js-drawer-content--1").removeClass("is-checked");
  jQuery("#js-drawer-content--2").removeClass("is-checked");
  jQuery("html").removeClass("no-scroll");
});

//スムーススクロール
// jQuery('a[href^="#"]').on("click", function (e) {
//   e.preventDefault();
//   const speed = 600;
//   const id = jQuery(this).attr("href");
//   const target = jQuery("#" == id ? "html" : id);
//   const position = jQuery(target).offset().top;
//   jQuery("html,body").animate(
//     {
//       scrollTop: position,
//     },
//     speed,
//     "swing" //swing or linear
//   );
// });

//スムーススクロール
// ドロワーメニュー内のリンクをクリックした際に上部に余白を設ける
// 固定ヘッダーの高さ
const HEADER_HEIGHT = 100; // 100pxに設定

jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();

  const speed = 600;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);

  let position = jQuery(target).offset().top; // ターゲット要素の上端位置を取得

  // -----------------------------------------------------------------
  // 【⭐修正点⭐】ドロワーリンク（.drawer__link）の場合のみオフセットを適用
  // -----------------------------------------------------------------
  // クリックされたリンクがドロワーリンクのクラスを持っているか確認
  if (jQuery(this).hasClass("drawer__link")) {
    // セクションへのリンクの場合、ヘッダーの高さ分を差し引く
    position -= HEADER_HEIGHT;
  }
  // ※ トップへ戻るボタン（href="#top" や href="#" のリンク）の場合、
  //    この if 文に入らないため、position はそのまま (0 または target の位置) になります。
  // -----------------------------------------------------------------

  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing"
  );
});

//galleryスライダーの自動再生
const gallerySwiper = new Swiper("#js-gallery-swiper", {
  // Optional parameters
  slidesPerView: "auto",
  // loopSlides: 10,
  // spaceBetween: 10,
  loop: true,
  speed: 5000,

  // 一旦ストップ
  autoplay: {
    delay: 0,
    pauseOnMouseEnter: false,
    disableOnInteraction: false,
  },

  breakpoints: {
    375: {
      slidesPerView: 1.519,
      spaceBetween: 20,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 40,
      centeredSlides: true,
    },
    900: {
      slidesPerView: 1.4,
      spaceBetween: 60,
      centeredSlides: true,
    },
    1200: {
      slidesPerView: 3.2,
      spaceBetween: 40,
      centeredSlides: true,
    },
    1400: {
      slidesPerView: 3.038,
      spaceBetween: 40,
      centeredSlides: true,
    },
    1600: {
      slidesPerView: 3.3,
      spaceBetween: 40,
      centeredSlides: true,
    },
    // 1700: {
    //   slidesPerView: 1.5,
    //   spaceBetween: 81,
    //   centeredSlides: true,
    // },
  },
});

//ヘッダーのfix表示の切り替え
document.addEventListener("DOMContentLoaded", () => {
  const fvSection = document.querySelector(".fv");
  const header = document.querySelector(".fv__header"); // シングルヘッダー

  if (!fvSection || !header) {
    return;
  }

  const FIXED_CLASS = "is-fixed";
  const APPEAR_CLASS = "is-appearing"; // Fixed開始時の準備状態
  const HIDING_CLASS = "is-hiding"; // Fixed解除時の非表示アニメーション状態

  const ANIMATION_DURATION_MS = 400;
  let hideTimer = null;

  // observerCallbackをDOMContentLoadedスコープ内で定義
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      // Fixed解除プロセス (スクロールアップ時: fvSectionがビューポートに入った)
      if (entry.isIntersecting) {
        if (header.classList.contains(FIXED_CLASS)) {
          if (hideTimer) clearTimeout(hideTimer);

          // Fixed状態を維持しながら、非表示アニメーションを開始
          header.classList.add(HIDING_CLASS);
          header.classList.remove(APPEAR_CLASS);

          // アニメーションが完了する時間を待つ
          hideTimer = setTimeout(() => {
            // ★改良ポイント1: Fixed解除のジャンプを見せないために、要素を一時的に非表示にする
            header.style.visibility = "hidden";

            // アニメーション完了後、position: fixed と is-hiding を解除
            header.classList.remove(FIXED_CLASS);
            header.classList.remove(HIDING_CLASS);
            hideTimer = null;

            // ★改良ポイント2: position: absolute に戻った後、次のレンダリングで visibility を元に戻す
            setTimeout(() => {
              header.style.visibility = "visible";
            }, 10);
          }, ANIMATION_DURATION_MS);
        }
      }
      // Fixed開始プロセス (スクロールダウン時: fvSectionがビューポートから出た)
      else {
        // 固定中に、非表示アニメーション中だった場合（アニメーション中断からの再固定）
        if (header.classList.contains(FIXED_CLASS) && header.classList.contains(HIDING_CLASS)) {
          if (hideTimer) clearTimeout(hideTimer);
          hideTimer = null;
          header.classList.remove(HIDING_CLASS);
          header.classList.remove(APPEAR_CLASS);
          return;
        }

        // 既に完全に固定されている場合は終了
        if (header.classList.contains(FIXED_CLASS)) {
          return;
        }

        // --- ここに来るのは、完全に Fixed が外れた状態から Fixed になるとき ---

        // 1. Fixed出現準備：アニメーション開始状態へ
        header.classList.add(APPEAR_CLASS);
        header.classList.remove(HIDING_CLASS);
        header.style.visibility = "visible";

        // 2. リフローを強制し、トランジションの開始を保証する
        header.offsetWidth;

        // 3. Fixedと終了状態のスタイルを適用: トランジションが有効になる
        header.classList.add(FIXED_CLASS);
        header.classList.remove(APPEAR_CLASS);
      }
    });
  };

  // ★ 1. ヘッダーの高さを取得し、rootMarginを動的に設定する関数 (修正済)
  function createObserver() {
    // header要素の現在の高さを正確に取得
    const headerHeight = header.offsetHeight;

    const options = {
      root: null,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0,
    };

    const fvObserver = new IntersectionObserver(observerCallback, options);
    fvObserver.observe(fvSection);

    // ★重要修正点: 生成したインスタンスを window スコープに格納
    window.fvObserverInstance = fvObserver;
  }

  // ★ 2. リサイズ時にも再計算 (修正済)
  window.addEventListener("resize", () => {
    // 既存のObserverがあれば解除（ガベージコレクションのため）
    if (window.fvObserverInstance) {
      window.fvObserverInstance.unobserve(fvSection);
      window.fvObserverInstance = null; // nullにしてメモリを解放
    }
    createObserver();
  });

  // 初期実行
  createObserver();
});

// // // 2つ目のヘッダーがTOPに来たタイミングで上部固定
// // ヘッダー2が浮いたスペースを埋める実装
// // 1. 🚀 要素を取得
// const stickyHeader = document.getElementById("fv__header-2");
// // 🚀 スペーサー要素を取得
// const spacer = document.getElementById("header-spacer");

// // 2. 📐 固定開始位置を格納する変数
// let originalOffset = 0; // fv__header-2 の元の位置
// let headerHeight = 0; // fv__header-2 の高さ（スペーサーに必要）

// /**
//  * 固定開始位置 (originalOffset) とヘッダーの高さ (headerHeight) を計算し、更新する関数
//  */
// function updateOffset() {
//   if (stickyHeader) {
//     // 現在のレイアウトでの正確な位置を取得
//     originalOffset = stickyHeader.offsetTop;
//     // 現在のヘッダーの高さを取得
//     headerHeight = stickyHeader.offsetHeight;

//     // スペーサーの高さも更新（念のため）
//     if (spacer) {
//       spacer.style.height = `${headerHeight}px`;
//     }

//     console.log(`Offset: ${originalOffset}px, Height: ${headerHeight}px`);
//   }
// }

// // --- 3. イベントリスナーの設定 ---

// // A. スクロールイベント: 固定処理の実行
// window.addEventListener("scroll", () => {
//   if (!stickyHeader || !spacer) return;

//   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

//   // 現在の状態をチェック
//   const isSticky = stickyHeader.classList.contains("is-sticky");

//   if (scrollPosition >= originalOffset) {
//     // 固定処理
//     if (!isSticky) {
//       stickyHeader.classList.add("is-sticky");
//       // 固定時にスペーサーを表示し、ヘッダーの高さと同じ高さを設定してスペースを確保

//       //一旦block→none
//       spacer.style.display = "none";
//     }
//   } else {
//     // 固定解除処理
//     if (isSticky) {
//       stickyHeader.classList.remove("is-sticky");
//       // 固定解除時にスペーサーを非表示
//       spacer.style.display = "none";
//     }
//   }
// });

// // B. 初期計算と再計算イベント (変更なし)
// window.addEventListener("load", updateOffset);
// window.addEventListener("resize", updateOffset);
// document.addEventListener("DOMContentLoaded", updateOffset);

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
        slidesPerView: 1.2,
        spaceBetween: 60,
        centeredSlides: true,
      },
      1400: {
        slidesPerView: 1.34,
        spaceBetween: 81,
        centeredSlides: true,
      },
      1700: {
        slidesPerView: 1.5,
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
    600: {
      slidesPerView: 1.5,
      spaceBetween: 40,
    },
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

//スクロールするとトップへ戻るボタンが下から表示される
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

//トップへ戻るボタンをクリックすると画面トップに戻る
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

// お悩みセクションのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  const targetElement = document.querySelector(".problem__body");

  if (!targetElement) return;

  // Intersection Observerのオプション
  const options = {
    root: null, // ビューポートをルートとする
    rootMargin: "0px",
    threshold: 0.2, // 要素が20%見えたら発火
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 要素がビューポートに入ったらクラスを追加し、アニメーションを発火
        entry.target.classList.add("is-animated");
        // 一度実行したら監視を終了
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);
  observer.observe(targetElement);
});

// caseセクションのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  const targetElement = document.querySelector(".case__contents");
  const cards = document.querySelectorAll(".case__contents > .case__card"); // 全てのカードを取得
  const delayStep = 500; // 0.50秒 (500ミリ秒)

  if (!targetElement || cards.length === 0) return;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // コンテナが見えたら、時間差で各カードにクラスを付与
        cards.forEach((card, index) => {
          setTimeout(() => {
            // is-visibleクラスを付与することでアニメーションが開始する
            card.classList.add("is-visible");
          }, index * delayStep); // index * 150ms で時間差を設定
        });

        // 監視を終了
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);
  observer.observe(targetElement);
});

// featureセクションのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  // 監視対象の要素（カード全体を囲むコンテナ）
  const targetContainer = document.querySelector(".feature__cards");

  // 子要素（カード）全てを取得
  const cards = document.querySelectorAll(".feature__cards > .feature__card");

  // 時間差の設定 (0.50秒)
  const delayStep = 500;

  if (!targetContainer || cards.length === 0) return;

  // Intersection Observerの設定
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // 要素が20%見えたら発火
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // コンテナが見えたら、時間差で各カードにクラスを付与
        cards.forEach((card, index) => {
          setTimeout(() => {
            // is-visibleクラスを付与することでアニメーションが開始する
            card.classList.add("is-visible");
          }, index * delayStep); // index * 150ms で時間差を設定
        });

        // 一度実行したら監視を終了
        observer.unobserve(entry.target);
      }
    });
  };

  // 監視を開始
  const observer = new IntersectionObserver(observerCallback, options);
  observer.observe(targetContainer);
});

// serviceセクションのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  // 監視対象のセクションとその子要素のセレクタを定義
  const containerSelector = ".service__area-cards";
  const itemSelector = ".service__area-card";
  const triggerClass = "is-area-visible";

  const targetContainer = document.querySelector(containerSelector);
  const items = document.querySelectorAll(`${containerSelector} > ${itemSelector}`);

  const delayStep = 500; // 0.50秒ごとの時間差

  if (!targetContainer || items.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // コンテナが見えたら、時間差で各アイテムにクラスを付与
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add(triggerClass);
            }, index * delayStep);
          });

          // 監視を終了
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    }
  );

  observer.observe(targetContainer);
});

// priceセクションのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  // 監視対象のセクションとその子要素のセレクタを定義
  const containerSelector = ".price__cards";
  const itemSelector = ".price__card";
  const triggerClass = "is-price-visible";

  const targetContainer = document.querySelector(containerSelector);
  const items = document.querySelectorAll(`${containerSelector} > ${itemSelector}`);

  const delayStep = 500; // 0.50秒ごとの時間差

  if (!targetContainer || items.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // コンテナが見えたら、時間差で各アイテムにクラスを付与
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add(triggerClass);
            }, index * delayStep);
          });

          // 監視を終了
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    }
  );

  observer.observe(targetContainer);
});

// 施工実績の200件突破の吹き出しのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  // 監視対象となる要素: .feature-achievement__image
  const target = document.querySelector(".feature-achievement__image");

  // 対象要素が存在しない場合は処理を終了
  if (!target) {
    return;
  }

  // Intersection Observer API を使用して要素の表示を監視
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // 要素が画面内に表示された（交差した）とき
        if (entry.isIntersecting) {
          // 親要素に 'is-visible' クラスを追加し、CSSアニメーションをトリガー
          entry.target.classList.add("is-visible");

          // アニメーションは一度きりなので、監視を停止
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // オプション: 要素が10%以上表示されたら発火
      threshold: 0.1,
    }
  );

  // 監視を開始
  observer.observe(target);
});

// 一旦、ダブルヘッダー方式採用のため、停止中
// ヘッダー(class="fv__header")がfvセクションのスクロール完了後に上部固定
// document.addEventListener("DOMContentLoaded", () => {
//   const fvSection = document.querySelector(".fv");
//   const header = document.querySelector(".fv__header");

//   if (!fvSection || !header) {
//     return;
//   }

//   const FIXED_CLASS = "is-fixed";
//   const APPEAR_CLASS = "is-appearing";
//   const HIDING_CLASS = "is-hiding";

//   const ANIMATION_DURATION_MS = 400;
//   // RENDER_DELAY_MS は不要になります

//   let hideTimer = null;

//   const options = {
//     root: null,
//     rootMargin: "0px 0px 0px 0px",
//     threshold: 0, // 0に設定されているため、fvSectionの端がビューポートに入ると発火します
//   };

//   const observerCallback = (entries) => {
//     entries.forEach((entry) => {
//       // Fixed解除プロセス (スクロールアップ時: fvSectionがビューポートに入った)
//       if (entry.isIntersecting) {
//         if (header.classList.contains(FIXED_CLASS)) {
//           // 1. Fixed解除待機中の既存タイマーをキャンセル (もしあれば)
//           if (hideTimer) clearTimeout(hideTimer);

//           // 2. Fixed状態を維持しながら、非表示アニメーションを開始
//           // FIXED_CLASSを維持したまま、is-hidingを付与 (SCSSで opacity: 0, transform: -20px になる)
//           header.classList.add(HIDING_CLASS);
//           header.classList.remove(APPEAR_CLASS); //念のため

//           // 3. アニメーションが完了する時間を待って、Fixed状態を解除
//           hideTimer = setTimeout(() => {
//             // アニメーション完了後、position: fixed と is-hiding を解除
//             header.classList.remove(FIXED_CLASS);
//             header.classList.remove(HIDING_CLASS); // これがないと absolute に戻っても opacity: 0 のまま
//             hideTimer = null; // タイマーIDをリセット
//           }, ANIMATION_DURATION_MS);
//         }
//       }
//       // Fixed開始プロセス (スクロールダウン時: fvSectionがビューポートから出た)
//       else {
//         // Fixed解除アニメーション中にスクロールダウンされた場合 (中断)
//         if (header.classList.contains(FIXED_CLASS) && header.classList.contains(HIDING_CLASS)) {
//           // 1. Fixed解除待機中のタイマーを即座にキャンセル
//           if (hideTimer) clearTimeout(hideTimer);
//           hideTimer = null;

//           // 2. Hidingクラスを解除し、すぐに再出現アニメーションを実行
//           header.classList.remove(HIDING_CLASS);
//           // APPEAR_CLASS は次に Fixed が付与される時に処理されるので、ここでは不要
//         }

//         // 既に固定されている場合は処理を終了
//         if (header.classList.contains(FIXED_CLASS)) {
//           return;
//         }

//         // --- ここに来るのは、完全に Fixed が外れた状態から Fixed になるとき ---

//         // 1. Fixed出現準備：アニメーション開始状態へ (transition: none が適用された状態)
//         header.classList.add(APPEAR_CLASS);
//         header.classList.remove(HIDING_CLASS);

//         // 2. リフローを強制: これによりブラウザは APPEAR_CLASS のスタイルを適用したレンダリングを行います。
//         // これがトランジションの「開始フレーム」となります。
//         header.offsetWidth; // 強制リフロー（この行に意味はありませんが、トランジション開始に必須）

//         // 3. Fixedと終了状態のスタイルを適用: トランジションが有効になる
//         header.classList.add(FIXED_CLASS);
//         header.classList.remove(APPEAR_CLASS); // FIXED_CLASSに transition: 0.4s が適用されているため、これでアニメーション開始
//       }
//     });
//   };

//   const fvObserver = new IntersectionObserver(observerCallback, options);
//   fvObserver.observe(fvSection);
// });
