/**
 * Created by Humbert Humbert on 4/17/2017.
 */
angular
    .module('vaApp')
    .controller('aboutCtrl', aboutCtrl)

function aboutCtrl() {
    var vm = this;
    vm.msg = "ABOUT"
}