jQuery.noConflict();

function tableCtrl($scope) {
    $scope.user = {};
    $scope.user.data = [];

    $scope.role = {};
    $scope.role.data = [];

    $scope.permission = {};
    $scope.permission.data = [];

    for (var i = 1; i <= 10; i++) {
        $scope.user.data.push({
            "name": "Username" + i,
            "mail": "Username" + i + "@example.com",
            "role": (i === 1) ? "Administrator" : "Guest",
            "status": Math.random() < 0.5 ? "Active" : "Locked",
            "time": (i === 1) ? "Now": (new Date()).toLocaleString()
        });
    }
};

jQuery(function ($) {
    $('#adminTab a:first').tab('show');

    $("#createUserBtn").on("click", function () {
        $("#userModal").modal();
        $("#role-selection")
            .children("i").removeClass("fa-chevron-down")
            .end()
            .next().hide();
    });

    $("#role-selection").on("click", function () {
        var sign = $(this).children("i");

        if (!sign.hasClass("fa-chevron-down")) {
            $(this).children("i").addClass("fa-chevron-down")
            $(this).next().slideDown();
        }
    });

    $("table.table").on("click", "a.btn", function (e) {
       if ($(this).data("op") === "update") {
           $("#userModal").modal();
       } else {
           $("#confirmModal .modal-body")
               .html("Are you sure you want to <strong class='text-danger'>delete</strong> this user?");
           $("#confirmModal").modal();

       }
    });
});