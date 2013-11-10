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
 * app/pages/transactions/TransactionsPage
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/pages/transactions/TransactionsPageContent',
        'app/widgets/navbar/NavbarWidget',
        'keel/BaseView',
        'text!app/pages/transactions/TransactionsPageTemplate.html'
    ],
    function(TransactionsPageContent, NavbarWidget, BaseView, TransactionsPageTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'transactions-page',

            template: {
                name: 'TransactionsPageTemplate',
                source: TransactionsPageTemplate
            },

            postRender: function() {
                this.addChildren([
                    {
                        id: 'NavbarWidget',
                        viewClass: NavbarWidget,
                        parentElement: this.$el
                    },
                    {
                        id: 'TransactionsPageContent',
                        viewClass: TransactionsPageContent,
                        parentElement: this.$el
                    }
                ]);
            }
        });
    }
);