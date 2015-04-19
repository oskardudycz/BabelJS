import * as Excalibur from "Excalibur";
import * as lvm from "LinkViewModel";
import * as llvm from "LinksListViewModel";

$(document).ready(function() {
    Excalibur.Bind(new llvm.LinksListViewModel([ new lvm.LinkViewModel('link1','author1'), new lvm.LinkViewModel('link2','author2') ]));
});