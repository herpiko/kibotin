import React, {useCallback, useState} from 'react';
import axios from "axios";
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiSpacer,
  EuiText,
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
import {Footer} from './components/Footer';
import {Result} from './components/Result';
import {Download} from './components/Download';
import {SwitchCutoutSelector} from './components/SwitchCutoutSelector';
import {StabCutoutSelector} from './components/StabCutoutSelector';
import {KerfInput} from './components/KerfInput';

export const Kibotin = () => {
  const [kerf, setKerf] = useState(0);
  const [layout, setLayout] = useState("");
  const [stabType, setStabType] = useState(STAB_TYPE.CHERRY_COSTAR.value);
  const [switchType, setSwitchType] = useState(SWITCH_TYPE.CLASSIC_MX.value);
  const [payload, setPayload] = useState({});
  const [outputId, setOutputId] = useState(null);

  const generate = () => {
    if (!layout) {
      alert("Layout's RAW value should not be empty.");
      return false;
    }
    const payload = {
      layout: window.jsonl.parse("[" + layout + "]"),
      "switch-type": switchType,
      "stab-type": stabType,
      kerf
    };

    axios
      .post("/api/generate", payload)
      .then(result => {
        setOutputId(result.data.id)
      })
      .catch(error => {
        console.error(error);
        alert("An error occured: " + error)
      })
  };
  useCallback(() => {
    setPayload({
      ...payload,
      layout: [layout],
      "switch-type": switchType,
      "stab-type": stabType,
      kerf
    })
  }, [payload, setPayload, layout, switchType, stabType, kerf]);

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
                    <EuiFormRow
                      label="Switch type"
                      helpText="http://builder-docs.swillkb.com/features/#switch-type"
                    >
                      <SwitchCutoutSelector switchType={switchType} onChange={value => setSwitchType(value)}/>
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
                      <StabCutoutSelector stabType={stabType} onChange={value => setStabType(value)}/>
                    </EuiFormRow>
                    <EuiFormRow
                      label="Kerf"
                      helpText="Use dot as decimal separator"
                    >
                      <KerfInput onChange={value => setKerf(value)}/>
                    </EuiFormRow>
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
