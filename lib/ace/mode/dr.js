// The MIT License (MIT)
//
// Copyright ( c ) 2014 Teem2 LLC
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE. -->
//
// Dreem mode is a combination of XML and script (javascript or coffeescript)

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var XmlMode = require("./xml").Mode;
var DrScriptMode = require("./drscript").Mode;
var DrHighlightRules = require("./dr_highlight_rules").DrHighlightRules;
var DrBehaviour = require("./behaviour/xml").XmlBehaviour;
var DrFoldMode = require("./folding/xml").FoldMode;

var Mode = function() {
    this.HighlightRules = DrHighlightRules;
    this.$behaviour = new DrBehaviour();
    this.foldingRules = new DrFoldMode();

    this.createModeDelegates({
        "drscript-": DrScriptMode
    });
};

oop.inherits(Mode, XmlMode);

(function() {

    this.blockComment = {start: "<!--", end: "-->"};

    this.$id = "ace/mode/dr";
}).call(Mode.prototype);

exports.Mode = Mode;
});
