
// $("#myForm").on("submit", function(event){
//   var qrcode = new QRCode("genratedQRCODE");
//   qrcode.makeCode($("#qrcode").val());
//   //prevent refresh
//   event.preventDefault();
// });


$( function() {
  $.ajaxSetup({
      async: false
      });
  var database =  [];
  $.getJSON( "drug.json", function( data ) {  
  data.forEach( function(drug) {
    database.push(drug.name);
    });
  });
  $( "#searchForDrug" ).autocomplete({
    source: database,
    delay: 600
  });
  var data = {};
  $("#dataForm").on("submit", function(event){
    data.name = $("#fullName").val();
    data.dateOfBirth = $("#dob").val();
    data.gender = $("input[name='gender']:checked").val();
    data.searchForDrug = $("#searchForDrug").val();
    data.drugName = $("#drugName").val();
    data.drugDescription = $("#drugDescription").val();
    data.drugInstruction = $("#instruction").val();
    console.log(data.searchForDrug);
     $.ajaxSetup({
      async: false
      });
    $.getJSON( "drug.json", function( el ) {  
      el.forEach( function(drug) {
         if(drug.name === data.searchForDrug || drug.name == data.drugName){
           data.drugInfoUrl = drug.url;
         }
        });
    });
    //the qrcode will be display on that id name
    var qrcode = new QRCode("generatedQRCode");
    qrcode.makeCode(JSON.stringify(data));
    //display data next to qrcode
    // $("#generatedQRCode").append(JSON.stringify(data));
    event.preventDefault();
  });
});













