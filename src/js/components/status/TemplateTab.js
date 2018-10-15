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
import { Icon, Label, Dropdown } from 'semantic-ui-react';
import saveAs from 'file-saver';
require("babel-core/register");
require("babel-polyfill");

class DownloadButton extends Dropdown {
    constructor(props) {
        super(props);
        this.downloadCta = this.downloadCta.bind(this);
    }
    async downloadCta(clause) {
        if (clause !== null) {
            const template = clause.getTemplate();
            const name = template.getMetadata().getName();
            const cta = await template.toArchive();
            var blob = new Blob([cta], {type: "application/zip"});
            saveAs(blob, name);
        } else {
            console.log("CLAUSE MISSING!");
        }
    }
    render() { return (<Dropdown.Item onClick={() => this.downloadCta(this.props.clause)}>Download</Dropdown.Item>); }
}

class UploadButton extends Dropdown {
    constructor(props) {
        super(props);
        this.uploadCta = this.uploadCta.bind(this);
    }
    async uploadCta(clause) {
        console.log("Upload TBD!");
    }
    render() { return <Dropdown.Item onClick={() => this.uploadCta(this.props.clause)}>Upload</Dropdown.Item>; }
}

class NewButton extends Dropdown {
    constructor(props) {
        super(props);
        this.newCta = this.newCta.bind(this);
    }
    async newCta(clause) {
        console.log("New TBD!");
    }
    render() { return <Dropdown.Item onClick={() => this.newCta(this.props.clause)}>New</Dropdown.Item>; }
}

export { UploadButton, DownloadButton, NewButton };
