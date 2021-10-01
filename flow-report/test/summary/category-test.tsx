/**
 * @license Copyright 2021 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import {FunctionComponent} from 'preact';
import {render} from '@testing-library/preact';

import {SummaryTooltip} from '../../src/summary/category';
import {Util} from '../../../report/renderer/util';
import {flowResult} from '../sample-flow';
import {I18nProvider} from '../../src/i18n/i18n';
import {FlowResultContext} from '../../src/util';

let wrapper: FunctionComponent;

beforeEach(() => {
  wrapper = ({children}) => (
    <FlowResultContext.Provider value={flowResult}>
      <I18nProvider>
        {children}
      </I18nProvider>
    </FlowResultContext.Provider>
  );
});

describe('SummaryTooltip', () => {
  it('renders tooltip with rating', async () => {
    // Snapshot SEO
    const reportResult = Util.prepareReportResult(flowResult.steps[2].lhr);
    const category = reportResult.categories['seo'];

    const root = render(
      <SummaryTooltip category={category} gatherMode={reportResult.gatherMode}/>,
      {wrapper}
    );

    const rating = root.getByTestId('SummaryTooltip__rating');
    expect(rating.classList).toContain('SummaryTooltip__rating--average');

    expect(root.getByText('9 audits passed / 11 audits run')).toBeTruthy();
  });

  it('renders tooltip without rating', async () => {
    // Snapshot performance
    const reportResult = Util.prepareReportResult(flowResult.steps[2].lhr);
    const category = reportResult.categories['performance'];

    const root = render(
      <SummaryTooltip category={category} gatherMode={reportResult.gatherMode}/>,
      {wrapper}
    );

    expect(() => root.getByTestId('SummaryTooltip__rating')).toThrow();
    expect(root.getByText('2 audits passed / 4 audits run')).toBeTruthy();
  });

  it('renders scored category tooltip with score', async () => {
    // Navigation performance
    const reportResult = Util.prepareReportResult(flowResult.steps[0].lhr);
    const category = reportResult.categories['performance'];

    const root = render(
      <SummaryTooltip category={category} gatherMode={reportResult.gatherMode}/>,
      {wrapper}

    );

    const rating = root.getByTestId('SummaryTooltip__rating');
    expect(rating.classList).toContain('SummaryTooltip__rating--pass');
    expect(rating.textContent).toEqual('Good · 94');

    expect(root.getByText('41 audits passed / 58 audits run')).toBeTruthy();
  });
});
