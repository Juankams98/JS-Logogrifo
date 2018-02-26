var palabras = [];
var letras = [];
var aux;
var puerta = true;
$(document).ready(inicio());


function inicio() {
    $("#cartel").hide(1000);
    $.get("logogrifo.json", function(data, status, xhr) {
        palabras = data.sort(function() { return Math.random() - 0.5 });

        for (let i = 10; i > 3; i--) {
            for (let j = 0; j < palabras.length; j++) {

                if (palabras[j].palabra.length == i) {
                    for (let k = 0; k < palabras[j].palabra.length; k++) {
                        if (letras.indexOf(palabras[j].palabra[k]) === -1) {
                            letras.push(palabras[j].palabra[k]);
                        }
                        aux = aux + ("<td class='centrar'>" + letras.indexOf(palabras[j].palabra[k]) + "</td>");
                    }
                    $("#palabras").append("<tr>" + aux + "</tr>");
                    aux = "";
                    // $("#palabras").append("<br>");
                    for (let l = 0; l < i; l++) {
                        aux = aux + ("<td class='centrar'><input class='" + palabras[j].palabra[l] + " " + letras.indexOf(palabras[j].palabra[l]) + "' maxlength='1' input type='text' onchange='principal(this)'> </td>");
                    }
                    $("#palabras").append("<tr>" + aux + "</tr>");
                    aux = "";
                    // $("#palabras").append("<br>");
                    $("#palabras").append("<tr> <td colspan='" + i + "'>" + palabras[j].definicion + "||" + palabras[j].palabra + "</td> </tr>");
                    break;
                }
            }
        }
    });

}

function principal(input) {
    $(input).val($(input).val().toUpperCase());
    if ($(input).hasClass($(input).val())) {
        $("." + $(input).val()).val($(input).val());
        $("." + $(input).val()).css("color", "green");
        $("." + $(input).val()).css("border-color", "green");
        $("." + $(input).val()).prop('disabled', true);
    } else {
        $(input).css("border-color", "red");
        $(input).css("color", "red");
    }
    puerta = true;
    for (let i = 0; i < $("input").length; i++) {
        if ($(`input:eq(${i})`).css("color") != "rgb(0, 128, 0)") {
            puerta = false;
        }
    }
    if (puerta) {
        $("#cartel").show(1000);
    }
}

function reiniciar() {
    $("#palabras").empty()
    inicio();
}

function matamosca() {
    $("#mosca").attr("class", "moscastop");
    // $("#mosca").attr("top", $("#mosca").position().top);
    // $("#mosca").attr("right", $("#mosca").position().right);
    $("#mosca").hide();
    setTimeout(() => {
        $("#mosca").show(1000);
    }, Math.floor((Math.random() * 20000) + 10000));
}