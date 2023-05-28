import _ from "underscore";

angular.module("memetics").controller("BulkUploadController", BulkUploadController);
BulkUploadController.$inject = ["$state", "$stateParams", "profile", "alertService", "session"];

function BulkUploadController($state, $stateParams, profile, alertService, session) {
    const ctrl = _.extend(this, {
        $onInit,
        folderNameAsTag: true,
        upload,
        uploadComplete
    });

    function $onInit() {
        if (session.user.id !== profile.id) {
            window.alert("Not authorised");
            $state.go("profile.providerView", {profileId: $stateParams.profileId});
        }
    }

    function upload($flow) {
        const folderIndex = $flow.files.length - 1; // use last as may upload from different folders without clearing $flow.files via cancel all
        const path = $flow.files[folderIndex].relativePath;

        if(ctrl.folderNameAsTag) {
            const end = path.indexOf("/");
            let tag = "";
            if (end > 0) {
                tag = path.substring(0, end);
            }

            _.each($flow.files, function (f) {
                if (tag !== "") {
                    f.uniqueIdentifier = tag;
                }
            });
        } else {
            _.each($flow.files, function (f) {
                f.uniqueIdentifier = "unprocessed";
            });
        }

        $flow.upload();
    }

    function uploadComplete() {
        window.alert("Upload complete");
        alertService.success("Upload complete"); // TODO - no idea why this isn't working
    }
}