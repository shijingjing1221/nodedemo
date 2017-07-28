/*global angular*/

angular.module('nodedemoApp').factory('UtilService', function ($location, $anchorScroll,) {
    'use strict';
  //Usage: UtilService.scroll2Id("elementId");
    function scroll2Id(id){
        $location.hash(id);
        $anchorScroll();
    }

    return {
        scroll2Id: scroll2Id
    };
});
