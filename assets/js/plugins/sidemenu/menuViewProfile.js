const MENU_VIEWPROFILE = $(`
  <div id="mvp" class="menu-viewprofile">
    <div class="avatar">
      <img id="mvp-avatar" class="avatar__image" src="/assets/images/default_avatar.png" alt="your avatar" />
    </div>
    <ul class="detail">
      <li class="detail__item" data-item="name">
        <em class="micon">check_circle</em>
        <div>
          <h4>Nama Lengkap</h4>
          <p class="info">-</p>
        </div>
      </li>
      <li class="detail__item" data-item="email">
        <em class="micon">check_circle</em>
        <div>
          <h4>Alamat Email</h4>
          <p class="info">-</p>
        </div>
      </li>
      <li class="detail__item" data-item="gender">
        <em class="micon">check_circle</em>
        <div>
          <h4>Jenis Kelamin</h4>
          <p class="info">-</p>
        </div>
      </li>
      <li class="detail__item" data-item="phone">
        <em class="micon">check_circle</em>
        <div>
          <h4>Nomor Ponsel</h4>
          <p class="info">-</p>
        </div>
      </li>
    </ul>
    <div class="disclaimer">
      <p>
        Informasi berikut <strong>hanya dapat dilihat</strong>
        oleh Anda dan tidak akan dipublikasikan
      </p>
    </div>
    <div class="action">
      <button id="mvp-edit" class="action__edit">Ubah</button>
    </div>
  </div>
`);

const ELS_MENUVIEWPROFILE = {
  THE_MENU: () => $("#mvp"),
  IMAGE_USER: () => $("#mvp-avatar"),
  FIELD_USERNAME: () => $(".detail__item[data-item*=name]"),
  FIELD_USEREMAIL: () => $(".detail__item[data-item*=email]"),
  FIELD_USERGENDER: () => $(".detail__item[data-item*=gender]"),
  FIELD_USERPHONE: () => $(".detail__item[data-item*=phone]"),
  BUTTON_EDIT: () => $("#mvp-edit"),
};

function _showMenuViewprofile() {
  $sm_setTitle("Profil Saya");
  _appendViewprofile();
  _fillDetails();
  _toggleViewprofile();
}
function _hideMenuViewprofile() {
  _toggleViewprofile();
  setTimeout(() => {
    _removeViewprofile();
  }, 200);
}
function _appendViewprofile() {
  const container = $sm_getContainer();
  container.append(MENU_VIEWPROFILE);
  _regiterViewprofile();
}
function _removeViewprofile() {
  const container = $sm_getContainer();
  container.find("#mvp")?.remove();
}
function _toggleViewprofile() {
  const { THE_MENU } = ELS_MENUVIEWPROFILE;
  const isShown = THE_MENU().hasClass("show");

  if (isShown) return THE_MENU().removeClass("show");
  THE_MENU().addClass("show");
}
function _fillDetails() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.name) {
    const { FIELD_USERNAME } = ELS_MENUVIEWPROFILE;
    FIELD_USERNAME().addClass("done");
    FIELD_USERNAME().find(".info").text(user.name);
  }
  if (user.email) {
    const { FIELD_USEREMAIL } = ELS_MENUVIEWPROFILE;
    FIELD_USEREMAIL().addClass("done");
    FIELD_USEREMAIL().find(".info").text(user.email);
  }
  if (user.gender) {
    const { FIELD_USERGENDER } = ELS_MENUVIEWPROFILE;
    FIELD_USERGENDER().addClass("done");
    FIELD_USERGENDER().find(".info").text(user.gender);
  }
  if (user.phone) {
    const { FIELD_USERPHONE } = ELS_MENUVIEWPROFILE;
    FIELD_USERPHONE().addClass("done");
    FIELD_USERPHONE().find(".info").text(user.phone);
  }
}
function _regiterViewprofile() {
  const { BUTTON_EDIT } = ELS_MENUVIEWPROFILE;

  BUTTON_EDIT().on("click", () => {
    $alert("info", "Feature coming soon!");
  });
}

function $mvp_show() {
  const { FIELD_USERNAME } = ELS_MENUVIEWPROFILE;
  _showMenuViewprofile();
  setTimeout(() => {
    FIELD_USERNAME();
  }, 1000);
}
function $mvp_hide() {
  _hideMenuViewprofile();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
}
