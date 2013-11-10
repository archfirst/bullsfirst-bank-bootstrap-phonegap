/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/widgets/transaction-table/TransactionTableWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/framework/Message',
        'app/widgets/transaction-table/TransactionView',
        'keel/BaseView',
        'keel/MessageBus',
        'text!app/widgets/transaction-table/TransactionTableTemplate.html',
        'iscroll',
        'jquery',
        'debounce'
    ],
    function(Message, TransactionView, BaseView, MessageBus, TransactionTableTemplate, Scroller, $) {
        'use strict';

        return BaseView.extend({
            className: 'transaction-table-widget',

            template: {
                name: 'TransactionTableTemplate',
                source: TransactionTableTemplate
            },

            elements: ['tableBodyWrapper', 'tableBody'],

            initialize: function() {
                this.listenTo(this.collection, 'reset', function() {
                    this.render();
                    this.fitTable();
                });

                var self = this;
                $(window).resize($.debounce(300, function() {
                    self.fitTable();
                }));
            },

            postRender: function() {
                // Setup iScroll
                this.scroller = new Scroller(this.tableBodyWrapperElement[0], {'hideScrollbar': true});

                this.collection.each(function(transaction) {
                    this.renderTransaction(transaction);
                }, this);
            },

            renderTransaction: function(transaction) {

                var view = this.addChild({
                    id: transaction.id,
                    viewClass: TransactionView,
                    parentElement: this.tableBodyElement,
                    options: {
                        model: transaction
                    }
                });

                return view;
            },

            fitTable: function() {
                var winHeight = $(window).height();
                var headerHeight = 50;
                var tableHeaderHeight = 30;
                var fixedSectionsHeight = headerHeight + tableHeaderHeight;
                this.tableBodyWrapperElement.height(winHeight - fixedSectionsHeight);

                // Refresh the scroller
                var scroller = this.scroller;
                setTimeout(function() {
                    scroller.refresh();
                }, 0);
            }
        });
    }
);