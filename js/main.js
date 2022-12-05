
//Enviar formulário por email

(function(){
      emailjs.init("");
})();

function enviaEmail(event){

    event.preventDefault();
    let arr = [];
    $.each($("input[name='modalidade']:checked"), function(){
    arr.push($(this).val());
    });
    let modalidade = arr.join(", ");

    let fullName = document.getElementById('nome').value;
    let phone = document.getElementById("phone").value;
    let empresa = document.getElementById("empresa").value;
    let preco = document.getElementById("preco").value;
    let visibilidade =  document.getElementById('visibilidade').value;

    let templateParams = {
        to_name: "Formulário",
        from_name: fullName,
        phone: phone,
        empresa:empresa,
        preco: preco,
        modalidade:modalidade,
        visibilidade:visibilidade,
    }

    emailjs.send("","", templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
};

//Bolinhas das etapas do formulário
const progressBar = document.getElementById("progress-bar");
const progressNext = document.getElementById("progress-next");
const progressPrev = document.getElementById("progress-prev");
const steps = document.querySelectorAll(".step");
const formularios = document.querySelectorAll(".formulario");
const audios = document.querySelectorAll("audios");
let active = 1;
let formStepsNum = 0;

progressNext.addEventListener("click", () => {
  active++;
  formStepsNum++;
  let active1 = active-1;
  if (active > steps.length) {
    active = steps.length;
  } 
  updateProgress();
  document.querySelector("#audio"+active).load();
  document.querySelector("#audio"+active).play();
  document.querySelector("#audio"+active1).pause();
});

progressPrev.addEventListener("click", () => {
  active--;
  formStepsNum--;
  let active1 = active+1;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
  document.querySelector("#audio"+active).load();
  document.querySelector("#audio"+active).play();
  document.querySelector("#audio"+active1).pause();
});

const updateProgress = () => {
  steps.forEach((step, i) => {
    if (i < active) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });


formularios.forEach((formStep) => {
        formStep.classList.contains("form-step-active") && formStep.classList.remove("form-step-active");
      });
    
    formularios[formStepsNum].classList.add("form-step-active");

  if (active === 1) {
    progressPrev.style.visibility = "hidden";
    document.getElementById('button').style.display = "none";
  } else if (active === steps.length) {
    progressNext.style.visibility = "hidden";
    document.getElementById('button').style.display = "flex";
  } else {
    progressPrev.style.visibility = "visible";
    progressNext.style.visibility = "visible";
    document.getElementById('button').style.display = "none";
  }

};

//Validação-----------
//Número de celular----
const tel = document.getElementById('phone') // Seletor do campo de telefone

tel.addEventListener('keypress', (e) => mascaraTelefone(e.target.value)) // Dispara quando digitado no campo
tel.addEventListener('change', (e) => mascaraTelefone(e.target.value)) // Dispara quando autocompletado o campo

const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    tel.value = valor // Insere o(s) valor(es) no campo
}

//Preço------
jQuery(function() {
    
  jQuery(".custom4").maskMoney({
prefix:'R$ ', 
thousands:'.', 
decimal:','
})

});


//formulário---

document.getElementById("button").addEventListener('click', ()=>{
  let fullName = document.getElementById('nome').value;
    let phone = document.getElementById("phone").value;
    let empresa = document.getElementById("empresa").value;
    let preco = document.getElementById("preco").value;
    let visibilidade =  document.getElementById('visibilidade').value;

  if( fullName == ""){
    return false
  }
  if( phone == ""){
    return false
  }
  if( empresa == ""){
    return false
  }
  if( preco == ""){
    return false
  }
  if( visibilidade == ""){
    return false
  }
  return (enviaEmail());

})
