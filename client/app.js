// var app = angular.module('app',[]);
//
// app.controller("IndexController", ['$scope','$http', function($scope,$http){
//   $scope.cat = {};
//   $scope.cats =[];
//
//   var fetchCats = function(){
//     return $http.get('/cats').then( function(response){
//       if(response.status !== 200){
//
//       }
//       $scope.cat = {};
//       $scope.cats = response.data;
//       return response.data;
//     })
//   };
//   $scope.add = function(cat){
//     return $http.post('/add',cat).then(fetchCats);
//   };
//
//   fetchCats();
// }]);
$(document).ready(function(){
    displayDBcats();
    $('#name').on('keyup', function(){
      var workingName = $('#name').val();
      $('.typing').text(workingName);
    });

    $("#catForm").on("submit", function(event){
      event.preventDefault();

      var values = {};

      //This strips the form and creates an object with the info in it
      $.each($("#catForm").serializeArray(), function(i, field){
        values[field.name] = field.value;
      });
      appendACat(values);
      $.ajax({
        type: "POST",
        url: "/addCat",
        data: values,
        success: function(){
          //this clears out the form
          $("#catForm").find("input[type=text]").val("");
        }
      });
      });

});


function displayDBcats(){
  $.ajax({
    type: "GET",
    url: "/cats",
    success: function(data){
      var allCats = data;
      for(var i=0; i<allCats.length; i++){
        appendACat(allCats[i]);
      }
    }
  });
}


function appendACat(cat){
  $('.cats').append('<h2>'+ cat.name+'</h2>');
}
