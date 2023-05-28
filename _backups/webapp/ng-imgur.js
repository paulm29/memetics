(function ($angular) {
    const app = $angular.module("ngImgur", []);

    app.constant("imgurOptions", {
        UPLOAD_URL: "https://api.imgur.com/3/image",
        UPLOAD_METHOD: "POST",
        API_KEY: ""
    });

    /**
     * @service Imgur
     * @author Adam Timberlake <adam.timberlake@gmail.com>
     * @link https://github.com/Wildhoney/ngImgur
     */
    app.service("imgur", ["$window", "$http", "$q", "imgurOptions", function ImgurService($window, $http, $q, imgurOptions) {
        const service = {};

        service.setAPIKey = function setAPIKey(apiKey) {
            imgurOptions.API_KEY = apiKey;
        };

        service.upload = function upload(imageData) { // @param imageData {String}
            if (!imgurOptions.API_KEY) {
                throw "ngImgur: You must define your API key in `imgurOptions.API_KEY`.";
            }

            if (!$angular.isArray(imageData)) {
                // Single image has been supplied so upload and return the promise immediately.
                return this.send(imageData);
            }

            const defer = $q.defer(), promises = [];

            // Otherwise we"re dealing with an array of images.
            $angular.forEach(imageData, function forEach(imageModel) {
                // Attempt to send the image and keep a track of the promise it returns.
                promises.push(service.send(imageModel));
            });

            // Once all the promises have been resolved then we can resolve our promise.
            $q.all(promises).then(function then(resultModels) {
                defer.resolve(resultModels);
            });

            return defer.promise;
        };

        service.send = function send(imageData) {
            const reader = new $window.FileReader();
            const defer = $q.defer(); // Begin reading the file as Base64.

            reader.onload = function onload(event) {
                // Strip the image type from the base64 data.
                const base64Data = event.target.result.split(",")[1];
                const headerModel = {Authorization: imgurOptions.API_KEY};
                const dataModel = {image: base64Data};

                $http({
                    url: imgurOptions.UPLOAD_URL,
                    method: imgurOptions.UPLOAD_METHOD,
                    headers: headerModel,
                    data: dataModel
                }).then(
                    function successCallback(response) {
                        defer.resolve(response.data.data);
                    }, function errorCallback(response) {
                        defer.reject();
                    });
            };

            reader.readAsDataURL(imageData);
            return defer.promise;
        };

        return service;
    }]);
})(window.angular);