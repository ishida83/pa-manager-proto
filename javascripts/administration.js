jQuery.noConflict();

function adminCtrl($scope) {
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

        $scope.role.data.push({
            "name": (i === 1) ? "Administrator" : "Guest" + (i - 1),
            "users": i,
            "description": "Description" + i,
            "status": "Available",
            "time": (new Date()).toLocaleString()
        });

        $scope.role.auth = [
            "Cluster", "Node", "Service", "Log",
            "Schema", "Administration", "Account"
        ];
    }
};

jQuery(function ($) {

    var popupUserModal = function () {
        $("#role-selection")
            .children("i").removeClass("fa-chevron-down")
            .end()
            .next().hide();
        $("#userModal").modal();
    };

    var popupRoleModal = function () {
        $("#authority-selection")
            .children("i").removeClass("fa-chevron-down")
            .end()
            .next().hide();
        $("#roleModal").modal();
    };

    var showMultiSelection = function (el) {
        var sign = el.children("i");

        if (!sign.hasClass("fa-chevron-down")) {
            el.children("i").addClass("fa-chevron-down")
            el.next().slideDown();
        }
    };

    $('#adminTab a:first').tab('show');

    $("#createUserBtn").on("click", function () {
        popupUserModal();
    });

    $("#createRoleBtn").on("click", function () {
        popupRoleModal();
    });

    $("#role-selection, #authority-selection").on("click", function () {
        showMultiSelection($(this));
    });

    $(".list-group-item input:checkbox").on("click", function () {
        $(this).parent("li").toggleClass("selected");
    });

    $(".user-pane table.table tr").on("click", "a.btn", function (e) {
        var op = $(this).data("op");

        switch (op) {
            case "update":
                popupUserModal();
                break;

            case "delete":
                var deleteInfo = "Are you sure you want to <strong class='text-danger'>DELETE</strong> this user?";

                $("#confirmModal .modal-body").html(deleteInfo);
                $("#confirmModal").modal();
                break;

            default:
                // detail functionality
                break;
        }
        e.stopPropagation();
    });

    $(".role-pane table.table tr").on("click", "a.btn", function (e) {
        var op = $(this).data("op");

        switch (op) {
            case "update":
                popupRoleModal();
                break;

            case "delete":
                var deleteInfo = "Are you sure you want to <strong class='text-danger'>DELETE</strong> this role?";

                $("#confirmModal .modal-body").html(deleteInfo);
                $("#confirmModal").modal();
                break;

            default:
                break;
        }
        e.stopPropagation();
    });
});