// top level code

function debug(fn) {
  try {
    fn();
  } catch (e) {
    alert(e.message);
  }
}