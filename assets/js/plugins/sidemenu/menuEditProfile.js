const MENU_EDITPROFILE = $(`
<h1>EDIT PROFILE</h1>
`);

$(document).on("DOMContentLoaded", () => {
  _showMenuEditprofile();
});

function _showMenuEditprofile() {
  const container = $sm_getContainer();
  container.append(MENU_EDITPROFILE);
  $sm_setTitle("Edit Profil");
}

function $showMenuEditprofile() {
  _showMenuEditprofile();
}
