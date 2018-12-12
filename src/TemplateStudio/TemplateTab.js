/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Dropdown } from 'semantic-ui-react';
import saveAs from 'file-saver';
require("@babel/core");
require("@babel/polyfill");

class ExportButton extends Button {
    constructor(props) {
        super(props);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.downloadCta = this.downloadCta.bind(this);
    }
    handleStatusChange(status) {
        this.props.handleStatusChange(status);
    }
    async downloadCta(clause) {
        if (clause !== null) {
            const template = clause.getTemplate();
            const name = template.getMetadata().getName();
            const cta = await template.toArchive('ergo');
            var blob = new Blob([cta], {type: "application/zip"});
            saveAs(blob, name + '.cta');
            this.handleStatusChange('saved');
        } else {
            console.log("CLAUSE MISSING!");
        }
    }
    render() {
        return (<Button size='mini' color='blue' onClick={() => this.downloadCta(this.props.clause)}>
                  <Icon name="download"/> Export</Button>); }
}

class ResetButton extends Button {
    constructor(props) {
        super(props);
        this.handleResetChange = this.handleResetChange.bind(this);
    }
    handleResetChange() {
        this.props.handleResetChange();
    }
    render() {
        return (<Button size='mini' basic color='blue' onClick={this.handleResetChange}>
                  <Icon name="redo" flipped="horizontally"/> Reset</Button>); }
}

export { ExportButton, ResetButton };