
$(function () {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }


    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    
    $("#btnIngresar").click(function () {


        var usuario = $("#usuario").val();
        var clave = $("#password").val();
        if (usuario == "" || clave == "")
        {
            $("#aviso").text("Campos incompletos");
        } else
        {

            $.ajax({
                url: '/',
                type: 'POST',
                data: {'usuario': usuario, 'clave': clave},
                dataType: "json",
                success: function (data)
                {
                    console.log(data)
                    console.log(data.respuesta);
                    if (data.respuesta == "existe")
                    {
                        $("#aviso").text("Exito");
                        window.location = "/Proyeccion/Docente/";
                    } else
                    {
                        $("#aviso").text("Usuario o clave erronea");
                    }

                }
            });
        }
    });
});