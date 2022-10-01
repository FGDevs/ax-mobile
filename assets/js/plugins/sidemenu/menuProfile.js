const MENU_PROFILE = $(`
  <div id="mp" class="menu-profile">
    <div class="user">
      <div class="user__card">
        <img id="mp--image" class="user__avatar" src="assets/images/default_avatar.png" alt="your avatar" />
        <div>
          <p id="mp--name" class="user__name"></p>
          <button id="mp--edit" class="user__edit">Ubah Profil</button>
        </div>
      </div>
      <a id="mp--attendance" class="user__attendance" href="#">Absen Masuk</a>
    </div>
    <div class="menu">
      <p class="menu__title">Informasi Lainnya</p>
      <ul class="menu__list">
        <li>
          <button id="mp--menupassword" class="item">
            <div class="item__wrapper">
              <span class="micon-o">lock</span>
              <p class="item__title">Ganti kata sandi</p>
            </div>
            <div class="item__wrapper">
              <span class="micon-o">chevron_right</span>
            </div>
          </button>
        </li>
        <li>
          <button id="mp--menurating" class="item">
            <div class="item__wrapper">
              <span class="micon-o">star_outline</span>
              <p class="item__title">Beri Reting</p>
            </div>
            <div class="item__wrapper">
              <p id="mp--version" class="item__info">v1.0.0</p>
              <span class="micon-o">chevron_right</span>
            </div>
          </button>
        </li>
        <li>
          <button id="mp--menulogout" class="item">
            <div class="item__wrapper">
              <span class="micon-o">logout</span>
              <p class="item__logout">Keluar</p>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
`);

const ELS_MENUPROFILE = {
  THE_MENU: () => $("#mp"),
  TEXT_USERNAME: () => $("#mp--name"),
  LINK_ATTENDANCE: () => $("#mp--attendance"),
  BUTTON_EDITPROFILE: () => $("#mp--edit"),
  BUTTON_EDITPASSWORD: () => $("#mp--menupassword"),
  BUTTON_GIVERATING: () => $("#mp--menurating"),
  BUTTON_LOGOUT: () => $("#mp--menulogout"),
};

function _registerMenuProfileListener() {
  const {
    BUTTON_EDITPASSWORD,
    BUTTON_GIVERATING,
    BUTTON_EDITPROFILE,
    BUTTON_LOGOUT,
    LINK_ATTENDANCE,
  } = ELS_MENUPROFILE;

  BUTTON_EDITPROFILE().on("click", () => {
    $mp_hide();
    $mvp_show();
    $sm_setBackAction(() => {
      $mvp_hide().then(() => {
        $mp_show();
      });
    });
  });

  BUTTON_LOGOUT().on("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  const comingFeaturesElements = [
    LINK_ATTENDANCE,
    BUTTON_EDITPASSWORD,
    BUTTON_GIVERATING,
  ];

  comingFeaturesElements.forEach((element) => {
    element().on("click", () => {
      $alert("info", "Feature coming soon!");
    });
  });
}

function _showMenuProfile() {
  $sm_setTitle("Profil");
  const { THE_MENU } = ELS_MENUPROFILE;
  const container = $sm_getContainer();
  container.append(MENU_PROFILE);
  _fillMenuProfile();
  THE_MENU().addClass("show");
  _registerMenuProfileListener();
}
function _hideMenuProfile() {
  const { THE_MENU } = ELS_MENUPROFILE;
  THE_MENU().removeClass("show");

  setTimeout(() => {
    const container = $sm_getContainer();
    container.find("#mp").remove();
  }, 200);
}
function _fillMenuProfile() {
  const { TEXT_USERNAME } = ELS_MENUPROFILE;
  const user = JSON.parse(localStorage.getItem("user"));
  TEXT_USERNAME().text(user.name);
}

function $mp_show() {
  _showMenuProfile();
}
function $mp_hide() {
  _hideMenuProfile();
}
