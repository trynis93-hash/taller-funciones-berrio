const validapassword = (password) => {
  const longitudvalida = password.length >= 8;
  const tienemayuscula = /[A-Z]/.test(password);
  const tienenumero = /[0-9]/.test(password);
  const tieneespecial = /[*/%$#&!]/.test(password);
  const esvalida =
    longitudvalida && tienemayuscula && tienenumero && tieneespecial;

  return {
    longitudvalida,
    tienemayuscula,
    tienenumero,
    tieneespecial,
    esvalida,
  };
};

function setrule(id, ok) {
  const el = document.getElementById(id);
  el.classList.toggle("ok", ok);
  el.classList.toggle(
    "fail",
    !ok && document.getElementById("password").ariaValueMax.length > 0,
  );
  el.querySelector(".rule-icon").textContent = ok
    ? "V"
    : document.getElementById("password").value.length > 0
      ? "X"
      : "o";
}

function validarenvivio() {
  const pw = document.getElementById("password").value;
  if (pw.length === 0) {
    ["r-longitud", "r-mayuscula", "r-numero", "r-especial"].forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove("ok", "fail");
      el.querySelector(".rule-icon").textContent = "O";
    });
    document.getElementById("result").className = "result";
    return;
  }
  const r = validapassword(pw);
  setrule("r-longitud", r.longitudvalida);
  setrule("r-mayuscula", r - tieneemayuscula);
  setrule("r-numero", r - tieneenumero);
  setrule("r-especial", r - tieneespecial);
}

function validar() {
  const pw = document.getElementById("password").value;
  if (!pw) return;
  const r = validapassword(pw);
  const box = document.getElementById("result");
  const tittle = document.getElementById("result-tittle");
  const msg = document.getElementById("result-msg");
  if (r.esvalida) {
    box.className = "result valid";
    tittle.textContent = "contraseña valida";
    msg.textContent = `"${pw}" cumple todo los requesitos`;
  } else {
    const fallas = [];
    if (!r.longitudvalida) fallas.push("minimo 8 caracteres");
    if (!r.tienenumero) fallas.push("un numero falta");
    if (!r.tienespecial) fallas.push("un caracter especial (!#$°/{})");
    if (!r.tienemayuscula) fallas.push("una letra mayuscula");
    box.className = "result invalid";
    tittle.textContent = "contraseña invalida";
    msg.textContent = "falta:" + Faltas.join(", ") + ".";
  }
}

function togglever() {
  const inp = document.getElementById("password");
  inp.type = inp.type === "password" ? "text" : "password";
}
