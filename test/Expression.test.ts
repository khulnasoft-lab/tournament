import * as tmpl from '@flowease/riot-tmpl';

import { Tournament } from '../src/index';
import { isDifferent } from '../src/Differ';
import { FunctionEvaluator } from '../src/FunctionEvaluator';
import { baseFixtures } from './ExpressionFixtures/base';
import { testExpressionsWithEvaluator } from './utils';

tmpl.brackets.set('{{ }}');
const evaluator = new Tournament(() => {});

describe('Expression', () => {
	describe('Test all expression transform fixtures', () => {
		for (const t of baseFixtures) {
			if (t.expression.trimEnd() === '=') {
				continue;
			}
			test(t.expression, () => {
				const expr = t.expression.slice(1);
				const [tournStr] = evaluator.getExpressionCode(expr);
				const tmplStr = tmpl.tmpl.getStr(expr);
				expect(isDifferent(tmplStr, tournStr)).toEqual(false);
			});
		}
	});

	describe('Test all expression evaluation fixtures', () => {
		testExpressionsWithEvaluator(FunctionEvaluator);
	});
});
