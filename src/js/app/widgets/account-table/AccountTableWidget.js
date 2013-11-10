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
 * app/widgets/account-table/AccountTableWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/widgets/account-table/AccountView',
        'keel/BaseView',
        'text!app/widgets/account-table/AccountTableTemplate.html'
    ],
    function(AccountView, BaseView, AccountTableTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'ul',
            className: 'list-group',

            template: {
                name: 'AccountTableTemplate',
                source: AccountTableTemplate
            },

            initialize: function() {
                this.listenTo(this.collection, 'reset', this.render);
            },

            postRender: function() {
                this.collection.each(function(account) {
                    this.renderAccount(account);
                }, this);
            },

            renderAccount: function(account) {

                var view = this.addChild({
                    id: account.id,
                    viewClass: AccountView,
                    parentElement: this.$el,
                    options: {
                        model: account
                    }
                });

                return view;
            }
        });
    }
);