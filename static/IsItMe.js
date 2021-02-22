$(document).ready(function () {
    $(document).on("click", "#seeresult", function () {
        if(document.getElementById("studyUpImg").files[0] == undefined){
	        alert("Please select an image 1.");
	        return;
	    }
	    if(document.getElementById("unkownUpImg").files[0] == undefined){
	        alert("Please select an image 2.");
	        return;
	    }
        SeeResult();
    });

    $(document).on("change", "#studyUpImg", function () {
        const reader = new FileReader();
        const file = document.getElementById("studyUpImg").files[0];
        reader.addEventListener("load", function () {
            $("#img1").attr('src', reader.result);
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    $(document).on("change", "#unkownUpImg", function () {
        const reader = new FileReader();
        const file = document.getElementById("unkownUpImg").files[0];
        reader.addEventListener("load", function () {
            $("#img2").attr('src', reader.result);
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    $(document).on("click", "#uploadimg1", function () {
        $("#studyUpImg").click();
    });

    $(document).on("click", "#uploadimg2", function () {
        $("#unkownUpImg").click();
    });

    $(document).on("click", "#reset", function () {
        location.reload();
    });
});

function SeeResult(){
    $("#result").html("Loading...");
    $("#result").css("color", "#4285F4");
    $("#result").show();
    var formData = new FormData();
	formData.append("study_img", document.getElementById("studyUpImg").files[0]);
	formData.append("unkown_img", document.getElementById("unkownUpImg").files[0]);
	$.ajax({
        url: '/IsItMe',
        data: formData,
        enctype: 'multipart/form-data',
        type: "post",
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            if(data.Name == "success"){
                if(data.Value == "yes"){
                    $(".userimg").css("box-shadow","0px 0px 15px green");
                    $("#result").html("It's you! Distance:"+data.Distance);
                    $("#result").css("color", "#0F9D58");
                    $("#result").show();
                }
                if(data.Value == "no"){
                    $(".userimg").css("box-shadow","0px 0px 15px #DB4437");
                    $("#result").html("It's not you! Distance:"+data.Distance);
                    $("#result").css("color", "#DB4437");
                    $("#result").show();
                }
            }else{
                alert(data.Value)
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error(s) encountered while uploading image." + thrownError.toString());
        }
    });
}