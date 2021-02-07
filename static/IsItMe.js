$(document).ready(function () {
    $(document).on("click", "#upload", function () {
        UploadImg();
    });
});

function UploadImg(){
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
                alert(data.Value + "      distance:"+data.Distance)
            }else{
                alert(data.Value)
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error(s) encountered while uploading image." + thrownError.toString());
        }
    });
}