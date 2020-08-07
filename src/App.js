import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiRange,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextArea
} from "@elastic/eui";
import axios from "axios";
import download from "downloadjs";

import "@elastic/eui/dist/eui_theme_light.css";

import switch1 from "./assets/switch_type_classic.png";
import switch2 from "./assets/switch_type_mx_alps.png";
import switch3 from "./assets/switch_type_mx.png";
import switch4 from "./assets/switch_type_alps.png";

class App extends React.Component {
  state = {
    useKerf: false,
    layout: "",
    stabType: 1,
    switchType: 1,
    stabOptions: [
      { text: "Cherry + Costar Stabilizer", value: 1 },
      { text: "Cherry Stabilizer", value: 2 },
      { text: "Costar Stabilizer", value: 3 },
      { text: "Alps Stabilizer", value: 4 }
    ]
  };
  onCheckedChange = e => {
    let obj = {};
    obj[e.target.name] = e.target.checked;
    console.log(obj);
    this.setState(obj);
  };
  onValueChange = e => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  generate = () => {
    if (this.state.layout === "") {
      alert("Layout's RAW value should not be empty.");
      return;
    }
    let payload = {};
    payload["layout"] = window.jsonl.parse("[" + this.state.layout + "]");
    payload["switch-type"] = this.state.switchType;
    payload["stab-type"] = this.state.stabType;
    if (this.state.useKerf) {
      payload["kerf"] = parseFloat(this.state.kerf);
    }

    axios
      .post("/api/generate", payload)
      .then(result => {
        this.setState({ outputId: result.data.id });
      })
      .catch(err => {
        console.log(err);
        alert("An error occured: " + err);
      });
  };
  render() {
    return (
      <div className="App">
        <EuiPage>
          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <h1>Kibotin</h1>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent>
              <EuiPageContentBody>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiForm component="form">
                      <EuiFormRow
                        label="Layout"
                        helpText="Paste the RAW value from http://www.keyboard-layout-editor.com/, Raw Data"
                      >
                        <EuiTextArea
                          name="layout"
                          onChange={this.onValueChange}
                        />
                      </EuiFormRow>
                      <EuiFormRow
                        label="Switch type"
                        helpText="http://builder-docs.swillkb.com/features/#switch-type"
                      >
                        <div>
                          <div style={{ display: "inline-block", margin: 5 }}>
                            <img
                              className={
                                this.state.switchType === 1
                                  ? "selection selected"
                                  : "selection"
                              }
                              src={switch1}
                              onClick={() => {
                                this.setState({ switchType: 1 });
                              }}
                              width="60"
                            />
                            <p style={{ fontSize: 10 }}>Classic MX Cutout</p>
                          </div>
                          <div style={{ display: "inline-block", margin: 5 }}>
                            <img
                              className={
                                this.state.switchType === 2
                                  ? "selection selected"
                                  : "selection"
                              }
                              src={switch2}
                              onClick={() => {
                                this.setState({ switchType: 2 });
                              }}
                              width="60"
                            />
                            <p style={{ fontSize: 10 }}>MX + Alps Cutout</p>
                          </div>
                          <div style={{ display: "inline-block", margin: 5 }}>
                            <img
                              className={
                                this.state.switchType === 3
                                  ? "selection selected"
                                  : "selection"
                              }
                              src={switch3}
                              onClick={() => {
                                this.setState({ switchType: 3 });
                              }}
                              width="60"
                            />
                            <p style={{ fontSize: 10 }}>MX Openable Cutout</p>
                          </div>
                          <div style={{ display: "inline-block", margin: 5 }}>
                            <img
                              className={
                                this.state.switchType === 4
                                  ? "selection selected"
                                  : "selection"
                              }
                              src={switch4}
                              onClick={() => {
                                this.setState({ switchType: 4 });
                              }}
                              width="60"
                            />
                            <p style={{ fontSize: 10 }}>Alps Cutout</p>
                          </div>
                        </div>
                      </EuiFormRow>
                      <EuiFormRow
                        label="Stabilizer type"
                        labelAppend={
                          <EuiText size="xs">
                            <EuiLink href="http://builder-docs.swillkb.com/features/#stabilizer-type">
                              Help
                            </EuiLink>
                          </EuiText>
                        }
                      >
                        <EuiSelect
                          name="stabType"
                          options={this.state.stabOptions}
                          value={this.state.stabType}
                          onChange={this.onValueChange}
                        />
                      </EuiFormRow>
                      <EuiFormRow
                        label="Kerf"
                        helpText="Use dot as decimal separator"
                      >
                        <div>
                          <EuiSwitch
                            label="Set kerf value"
                            name="useKerf"
                            checked={this.state.useKerf}
                            onChange={e => this.onCheckedChange(e)}
                          />
                          {this.state.useKerf && (
                            <EuiFieldText
                              style={{ marginTop: 5 }}
                              name="kerf"
                              placeholder="Kerf value in millimeter"
                              onChange={e => this.onValueChange(e)}
                            />
                          )}
                        </div>
                      </EuiFormRow>
                      <EuiSpacer />
                      <EuiFormRow>
                        <EuiButton fill onClick={this.generate}>
                          Generate
                        </EuiButton>
                      </EuiFormRow>
                    </EuiForm>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    {this.state.outputId && this.state.outputId.length > 0 ? (
                      <div>
                        <div>
                          <EuiButton
                            style={{ margin: 10 }}
                            fill
                            onClick={() => {
                              download(
                                "/outputs/output_" +
                                  this.state.outputId +
                                  "_switch.svg"
                              );
                            }}
                          >
                            SVG
                          </EuiButton>
                          <EuiButton
                            style={{ margin: 10 }}
                            fill
                            onClick={() => {
                              download(
                                "/outputs/output_" +
                                  this.state.outputId +
                                  "_switch.dxf"
                              );
                            }}
                          >
                            DXF
                          </EuiButton>
                          <EuiButton
                            style={{ margin: 10 }}
                            fill
                            onClick={() => {
                              download(
                                "/outputs/output_" +
                                  this.state.outputId +
                                  "_switch.eps"
                              );
                            }}
                          >
                            EPS
                          </EuiButton>
                        </div>
                        <img
                          style={{ width: "100%" }}
                          src={
                            "/outputs/output_" +
                            this.state.outputId +
                            "_switch.svg"
                          }
                        />
                      </div>
                    ) : (
                      <p>Generated SVG will be shown here.</p>
                    )}
                    <EuiSpacer />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <span>
                  Powered by <a href="https://github.com/swill/kad">kad</a>.
                  Source code is available on{" "}
                  <a href="https://github.com/herpiko/kibotin">GitHub</a>.
                </span>
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </div>
    );
  }
}

export default App;
