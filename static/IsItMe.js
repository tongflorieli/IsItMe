$(document).ready(function () {
    $(document).on("click", "#upload", function () {
        UploadImg();
    });
});

function UploadImg(){
    var formData = new FormData();
	formData.append("imgfile", document.getElementById("upImage").files[0]);
	$.ajax({
        url: '/UploadImage',
        data: formData,
        enctype: 'multipart/form-data',
        type: "post",
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error(s) encountered while uploading image." + thrownError.toString());
        }
    });
}