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
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;
var DrScriptHighlightRules = require("./drscript_highlight_rules").DrScriptHighlightRules;


var tagMap = lang.createMap({
    script      : 'script',
    handler     : 'script',
    method      : 'script',
    setter      : 'script'
});


var DrHighlightRules = function() {
    XmlHighlightRules.call(this);


    this.addRules({
        attributes: [{
            include : "tag_whitespace"
        }, {
            token : "entity.other.attribute-name.xml",
            regex : "[-_a-zA-Z0-9:]+"
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "=",
            push : [{
                include: "tag_whitespace"
            }, {
                token : "string.unquoted.attribute-value.html",
                regex : "[^<>='\"`\\s]+",
                next : "pop"
            }, {
                token : "empty",
                regex : "",
                next : "pop"
            }]
        }, {
            include : "attribute_value"
        }],
        tag: [{
            token : function(start, tag) {
                var group = tagMap[tag];
                return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
                    "meta.tag" + (group ? "." + group : "") + ".tag-name.xml"];
            },
            regex : "(</?)([-_a-zA-Z0-9:]+)",
            next: "tag_stuff"
        }],
        tag_stuff: [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
        ],
    });

    this.embedTagRules(DrScriptHighlightRules, "drscript-", "script");
    this.embedTagRules(DrScriptHighlightRules, "drscript-", "handler");
    this.embedTagRules(DrScriptHighlightRules, "drscript-", "method");
    this.embedTagRules(DrScriptHighlightRules, "drscript-", "setter");

    if (this.constructor === DrHighlightRules)
        this.normalizeRules();
};



oop.inherits(DrHighlightRules, XmlHighlightRules);

exports.DrHighlightRules = DrHighlightRules;
});
