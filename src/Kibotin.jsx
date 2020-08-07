import React, {useState} from 'react';
import axios from "axios";
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextArea
} from "@elastic/eui";
import {STAB_TYPE} from './constants/STAB_TYPE';
import {SWITCH_TYPE} from './constants/SWITCH_TYPE';
import {
  CornerRadius,
  Download,
  Footer,
  KerfInput,
  Result,
  StabCutoutSelector,
  SwitchCutoutSelector
} from './components';
import { toast } from 'react-toastify';

export const Kibotin = () => {
  const [kerf, setKerf] = useState(0);
  const [layout, setLayout] = useState("");
  const [stabType, setStabType] = useState(STAB_TYPE.CHERRY_COSTAR.value);
  const [switchType, setSwitchType] = useState(SWITCH_TYPE.CLASSIC_MX.value);
  const [cornerRadius, setCornerRadius] = useState(null);
  const [outputId, setOutputId] = useState(null);

  const generate = () => {
    if (!layout) {
      toast.warn("Layout's RAW value should not be empty.", {
        position: 'top-center',
        hideProgressBar: true
      });
      return false;
    }
    const payload = {
      layout: window.jsonl.parse("[" + layout + "]"),
      "switch-type": switchType,
      "stab-type": stabType,
      "fillet": cornerRadius,
      kerf
    };

    axios
      .post("/api/generate", payload)
      .then(result => {
        setOutputId(result.data.id)
      })
      .catch(error => {
        console.error(error);
        toast.error("An error occured: " + error, {
          position: 'top-center'
        })
      })
  };

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
                        onChange={(event) => setLayout(event.target.value)}
                      />
                    </EuiFormRow>
                    <SwitchCutoutSelector switchType={switchType} onChange={value => setSwitchType(value)}/>
                    <StabCutoutSelector stabType={stabType} onChange={value => setStabType(value)}/>
                    <KerfInput onChange={value => setKerf(value)}/>
                    <CornerRadius onChange={value => setCornerRadius(value)}/>
                    <EuiSpacer />
                    <EuiFormRow>
                      <EuiButton fill onClick={generate}>
                        Generate
                      </EuiButton>
                    </EuiFormRow>
                  </EuiForm>
                </EuiFlexItem>
                <EuiFlexItem>
                  {outputId && outputId.length > 0 ? (
                    <div>
                      <Download outputId={outputId}/>
                      <Result outputId={outputId}/>
                    </div>
                  ) : (
                    <p>Generated SVG will be shown here.</p>
                  )}
                  <EuiSpacer />
                </EuiFlexItem>
              </EuiFlexGroup>
              <Footer/>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  )
};
