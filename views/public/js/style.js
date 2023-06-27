//Js for image preview before upload start

$("#profileImage").click(function(e) {
    $("#imageUpload").click();
});

var readURL = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.avatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


$(".file-upload").on('change', function() {
    readURL(this);
});


//Js for image preview before upload end

//Js for table on admin start

$(document).ready(function() {
    $('#tably').DataTable({
        "ordering": false // false to disable sorting (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');
});

//Js for table on admin end